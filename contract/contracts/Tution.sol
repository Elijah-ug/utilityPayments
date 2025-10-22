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
        uint256 autoPayments;
        uint256 debts;
        address client;
        address school;
        uint128 payerId;
        bool hasAutoPayments;
        bool isOnPlatform;
        bytes32 studentName;
        bytes32 studentClass;
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
        uint256 start;
        uint256 end;
        address school;
        uint128 termId;
        bool hasStarted;
        bool hasEnded;
    }
    mapping(address => School) public school;
    mapping(address => Payer) public payer;
    mapping(address => Receipt) public receipt;
    mapping(uint128 => AcademicTerm) public academicTerm;
    mapping(uint128 => address) public payerById;
    mapping(address => uint128) public idByPayer;   // address -> id (0 = unset)
    uint32 public newSchoolId;
    uint128 public termIdBySchool;
    uint32 public percentageFee;
    uint256 public paymentsMade;
    uint128 public payerIds;

    bytes32 constant BEGIN_TERM = keccak256("beginTerm");
    bytes32 constant END_TERM = keccak256("endTerm");

    // address[] public autoPayers;

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
        payerIds = 1;
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
        require(!newSchool.isActive, "Innactive");
        newSchool.isActive = true;
    }

    // client deposit
    function clientDeposit(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Invalid deposit");
        Payer storage newPayer = payer[msg.sender];
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        newPayer.balance += _amount;
        newPayer.client = msg.sender;
        newPayer.isOnPlatform = true;
        
        if (idByPayer[msg.sender] == 0) {
        uint128 id = payerIds;
        payerById[id] = msg.sender;
        idByPayer[msg.sender] = id;
        newPayer.payerId = id;
        payerIds += 1;
    } else {
        // keep payer.payerId in sync
        newPayer.payerId = idByPayer[msg.sender];
    }

    }

    // ====== shcool triggers ====
    // academic term/semister update
    function AcademicTermUpdate(uint256 _tution, uint256 _start, uint256 _end) external onlySchool {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Inactive");

        uint128 termIndex = termIdBySchool;
        academicTerm[termIndex] = AcademicTerm({
            tution: _tution,
            start: _start,
            end: _end,
            school: msg.sender,
            termId: termIndex,
            hasStarted: false,
            hasEnded: false
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

        require(newPayer.balance >= _amount, "Little balance");
        require(_school != address(0), "Invalid schoolAddr");
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        require(newSchool.tution > 0, "Outdated Term");
        require(newPayer.termPayments <= newSchool.tution, "You're cleared!");

        bool isInRange = (newPayer.termPayments + _amount) <= newSchool.tution;
        bool isFlatPay = (newPayer.termPayments + _amount) == newSchool.tution;

        require(isInRange, "Reduce amount");
        newPayer.termPayments += _amount;
        paymentsMade += _amount;
        newPayer.balance -= _amount;
        newSchool.balance += _amount;
        newPayer.school = _school;
        newPayer.debts = newSchool.tution - newPayer.termPayments;
        uint256 remaining = newSchool.tution - newPayer.termPayments;
        receipt[msg.sender] = Receipt({
            time: block.timestamp,
            amount: _amount,
            balance: remaining,
            payer: msg.sender,
            school: _school,
            cleared: isFlatPay,
            student: _student,
            class: _class
        });
    }

    function paymentAutomation(
        address _school,
        uint256 _amount,
        bytes32 _student,
        bytes32 _class
    ) external {
        require(_school != address(0), "Invalid school address");
        School storage newSchool = school[_school];
        Payer storage autoPayer = payer[msg.sender];
        require(_amount > 0, "Invalid amount");
        require(_amount >= newSchool.tution, "amount != school tution");
        require(autoPayer.balance >= newSchool.tution, "Low balance");

        autoPayer.hasAutoPayments = true;
        autoPayer.autoPayments += _amount;
        autoPayer.studentName = _student;
        autoPayer.studentClass = _class;
        autoPayer.school = _school;

        // bool exists = false;
        // for (uint256 i = 0; i < payerIds; i++) {
        //     if (autoPayers[i] == msg.sender) {
        //         exists = true;
        //         break;
        //     }
        // }
        // if (!exists) {
        //     autoPayers.push(msg.sender);
        // }
    }

    // withdraw
    function schoolWithdrawal(uint256 _amount) external onlySchool nonReentrant {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        require(newSchool.balance >= _amount, "Much amount");
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
    function cancelAutoPayments() external {
        Payer storage newPayer = payer[msg.sender];
        require(newPayer.hasAutoPayments, "No autopayments found");
        newPayer.hasAutoPayments = false;
        // uint256 len = autoPayers.length;
        // for (uint256 i = 0; i < len; i++) {
        //     if (autoPayers[i] == msg.sender) {
        //         autoPayers[i] = autoPayers[len - 1];
        //         autoPayers.pop();
        //         break;
        //     }
        // }
    }

    // automation
    function checkUpkeep(
        bytes calldata
    ) external view override returns (bool upkeepNeeded, bytes memory performData) {
        for (uint128 i = 0; i < termIdBySchool; i++) {
            AcademicTerm storage newTerm = academicTerm[i];

            // skip uninitialized terms
            if (newTerm.school == address(0) || newTerm.tution == 0) {
                continue;
            }
            // begin term
            if (newTerm.start <= block.timestamp && !newTerm.hasStarted) {
                upkeepNeeded = true;
                performData = abi.encode(uint128(i), BEGIN_TERM);
                return (upkeepNeeded, performData);
            }
            // end term
            if (newTerm.end <= block.timestamp && newTerm.hasStarted && !newTerm.hasEnded) {
                upkeepNeeded = true;
                performData = abi.encode(uint128(i), END_TERM);
                return (upkeepNeeded, performData);
            }
        }
        upkeepNeeded = false;
        performData = "";
    }

    function performUpkeep(bytes calldata performData) external override {
        (uint128 termIndex, bytes32 action) = abi.decode(performData, (uint128, bytes32));

        AcademicTerm storage t = academicTerm[termIndex];
        // skip if term not present
        if (t.school == address(0) || t.tution == 0) {
            return;
        }
        School storage skul = school[t.school];
        if (skul.school == address(0) || !skul.isRegistered || !skul.isActive) {
            return;
        }

        if (action == BEGIN_TERM) {
            t.hasStarted = true;
        } else if (action == END_TERM) {
            t.hasEnded = true;
            t.tution = 0;
            t.hasStarted = false;
            t.start = 0;
            t.end = 0;
        }
        // school validation
        if (skul.school == address(0) || !skul.isRegistered || !skul.isActive) {
            return;
        }

        for (uint128 i = 1; i < payerIds; i++) {
            address addr = payerById[i];
            if(addr == address(0)) continue;
            
            Payer storage autoPayer = payer[addr];

            if (
                action == BEGIN_TERM &&
                skul.school == autoPayer.school &&
                autoPayer.hasAutoPayments &&
                autoPayer.termPayments < skul.tution &&
                autoPayer.balance >= skul.tution &&
                autoPayer.autoPayments >= skul.tution
            ) {
                uint256 tution = skul.tution;

                autoPayer.balance -= tution;
                autoPayer.autoPayments -= tution;
                autoPayer.termPayments += tution;
                skul.balance += tution;
                paymentsMade += tution;

                bool cleared = (autoPayer.termPayments >= skul.tution);
                uint256 remaining = cleared ? 0 : (skul.tution - autoPayer.termPayments);
                receipt[autoPayer.client] = Receipt({
                    time: block.timestamp,
                    amount: tution,
                    balance: remaining,
                    payer: autoPayer.client,
                    school: skul.school,
                    cleared: cleared,
                    student: autoPayer.studentName,
                    class: autoPayer.studentClass
                });
                if (cleared) {
                    autoPayer.termPayments = 0;
                }
            }
            if (action == END_TERM) {
                if (autoPayer.termPayments < skul.tution && autoPayer.school == skul.school) {
                    autoPayer.debts = skul.tution - autoPayer.termPayments;
                    autoPayer.termPayments = 0;
                }
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

    function getacademicTerm(address _schoolAddr) external view returns (AcademicTerm memory) {
        for (uint32 i; i < termIdBySchool; i++) {
            AcademicTerm memory newTerm = academicTerm[i];
            if (newTerm.school == _schoolAddr) {
                return newTerm;
            }
        }
        revert("No matching term found");
    }
}
