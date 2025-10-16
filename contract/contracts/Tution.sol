// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";

// todos
// 1. clear term payments after the term ad clearance
contract Tution is
    Initializable,
    ReentrancyGuardUpgradeable,
    OwnableUpgradeable,
    AutomationCompatibleInterface
{
    IERC20 public stableToken;
    using SafeERC20 for IERC20;
    struct School {
        uint256 balance;
        uint256 tution;
        address school;
        bool isRegistered;
        bool isActive;
        uint32 schoolId;
        bytes32 name;
    }
    struct Payer {
        uint256 balance;
        uint256 termPayments;
        address client;
    }
    struct Receipt {
        uint256 time;
        uint256 amount;
        uint256 balance;
        address payer;
        address school;
        bool cleared;
        bytes32 student;
        bytes32 class;
    }
    struct AcademicTerm {
        uint256 tution;
        address school;
        uint128 termId;
        bool hasStarted;
        bool hasEnded;
        uint32 start;
        uint32 end;
    }
    mapping(address => School) public school;
    mapping(address => Payer) public payer;
    mapping(address => Receipt) public receipt;
    mapping(uint128 => AcademicTerm) public academicTerm;
    uint32 public newSchoolId;
    uint128 public termIdBySchool;
    uint32 public percentageFee;
    uint256 public paymentsMade;

    bytes32 constant BEGIN_TERM = keccak256("beginTerm");
    bytes32 constant END_TERM = keccak256("endTerm");

    uint256[50] private __gap;
    modifier onlySchool() {
        School storage s = school[msg.sender];
        require(s.isRegistered, "Not registered");
        _;
    }

    function initialize(address _tokenUsed) public initializer {
        require(_tokenUsed != address(0), "Invalid address");
        __ReentrancyGuard_init();
        __Ownable_init(msg.sender);
        stableToken = IERC20(_tokenUsed);
    }

    function updateTxFee(uint32 _percentage) external onlyOwner {
        require(_percentage < 50, "Much fee");
        percentageFee = _percentage;
    }

    // register school
    function registerSchool(address _school, bytes32 _name) external onlyOwner {
        require(!school[_school].isRegistered, "Registered");
        school[_school] = School({
            balance: 0,
            tution: 0,
            school: _school,
            isRegistered: true,
            isActive: true,
            schoolId: newSchoolId,
            name: _name
        });
        newSchoolId += 1;
    }

    // freez company
    function deactivateSchool(address _school) external onlyOwner {
        School storage newSchool = school[_school];
        require(newSchool.isActive, "Innactive");
        newSchool.isActive = false;
    }

    // activate school
    function activateSchool(address _school) external onlyOwner {
        School storage newSchool = school[_school];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        newSchool.isActive = true;
    }

    // client deposit
    function clientDeposit(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Invalid deposit");
        Payer storage newPayer = payer[msg.sender];
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        newPayer.balance += _amount;
        newPayer.client = msg.sender;
    }

    // ====== shcool triggers ====
    // academic term/semister update
    function AcademicTermUpdate(uint256 _tution, uint32 _start, uint32 _end) external onlySchool {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Inactive");
        academicTerm[newSchool.schoolId] = AcademicTerm({
            tution: _tution,
            school: msg.sender,
            termId: termIdBySchool,
            hasStarted: false,
            hasEnded: false,
            start: _start,
            end: _end
        });
        termIdBySchool += 1;
        newSchool.tution = _tution;
    }

    // update term/semister
    // tution payment
    function tutionPayment(
        uint256 _amount,
        address _school,
        bytes32 _student,
        bytes32 _class
    ) external nonReentrant {
        Payer storage newPayer = payer[msg.sender];
        School storage newSchool = school[_school];

        require(newPayer.balance > _amount, "Little balance");
        require(_school != address(0), "Invalid schoolAddr");
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        bool isInRange = (newPayer.termPayments + _amount) <= newSchool.tution;
        bool isFlatPay = (newPayer.termPayments + _amount) == newSchool.tution;

        require(isInRange, "Reduce amount");
        newPayer.termPayments += _amount;
        paymentsMade += _amount;
        newPayer.balance -= _amount;
        newSchool.balance += _amount;
        receipt[msg.sender] = Receipt({
            time: block.timestamp,
            amount: _amount,
            balance: isInRange ? newSchool.tution - _amount : 0
            payer: msg.sender,
            school: _school,
            cleared: isFlatPay,
            student: _student,
            class: _class
        });
        if (isFlatPay) {
            newPayer.termPayments = 0;
        }
    }

    // withdraw
    function schoolWithdrawal(uint256 _amount) external onlySchool nonReentrant {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        require(newSchool.balance > _amount, "Much amount");
        newSchool.balance -= _amount;
        uint256 _fee = (_amount * percentageFee) / 1000;
        uint256 netWithdraw = _amount - _fee;
        stableToken.safeTransfer(msg.sender, netWithdraw);
    }

    // client withdraw
    function clientWithdraw(uint256 _amount) external nonReentrant {
        Payer storage newPayer = payer[msg.sender];
        require(newPayer.balance >= _amount, "Much");
        newPayer.balance -= _amount;
        stableToken.safeTransfer(msg.sender, _amount);
    }

    // reset new term
    function resetStateForNewTerm() internal {}

    // automation
    function checkUpkeep(
        bytes calldata
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        bytes32 checkText;
        bool passCheck;
        for (uint32 i; i < newSchoolId; i++) {
            AcademicTerm storage newTerm = academicTerm[i];
            if (newTerm.start <= block.timestamp && !newTerm.hasStarted) {
                checkText = BEGIN_TERM;
                passCheck = true;
                break;
            }
            if (
                newTerm.start < block.timestamp &&
                newTerm.end <= block.timestamp &&
                newTerm.hasStarted &&
                !newTerm.hasEnded &&
                checkText == BEGIN_TERM
            ) {
                checkText = END_TERM;
                passCheck = true;
                break;
            }
        }
        upkeepNeeded = passCheck;
        performData = abi.encode(checkText);
        return (upkeepNeeded, performData);
    }

    function performUpkeep(bytes calldata performData) external override {
        bytes32 checkText = abi.decode(performData, (bytes32));

        for (uint32 i; i < newSchoolId; i++) {
            AcademicTerm storage newTerm = academicTerm[i];
            if (
                newTerm.start <= block.timestamp && !newTerm.hasStarted && checkText == BEGIN_TERM
            ) {
                newTerm.hasStarted = true;
            }
            if (
                newTerm.start < block.timestamp &&
                newTerm.end <= block.timestamp &&
                newTerm.hasStarted &&
                !newTerm.hasEnded &&
                checkText == END_TERM
            ) {
                newTerm.hasEnded = true;
            }
            if (newTerm.hasEnded && block.timestamp > newTerm.end + 1 hours) {
                newTerm.tution = 0;
                newTerm.hasStarted = false;
                newTerm.hasEnded = false;
                newTerm.start = 0;
                newTerm.end = 0;
            }
        }
    }

    // view functions
    function getSchoolInfo(address _school) external view onlySchool returns (School memory) {
        return school[_school];
    }

    function getClient() external view returns (Payer memory) {
        return payer[msg.sender];
    }

    function getReceipt(address _user) external view returns (Receipt memory) {
        return receipt[_user];
    }

    function getacademicTerm(uint128 _termId) external view returns (AcademicTerm memory) {
        return academicTerm[_termId];
    }
}
