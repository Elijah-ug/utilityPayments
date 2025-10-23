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
        bool isOnPlatform;
        bytes32 studentName;
        bytes32 studentClass;
    }
    struct AutoPayer {
        uint256 balance;
        uint256 debts;
        address client;
        address school;
        uint128 autoPayerId;
        bool hasAutoPayments;
        bool hasPaid;
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
    mapping(uint128 => AutoPayer) public autoPayers;
    uint32 public newSchoolId;
    uint128 public termIdBySchool;
    uint32 public percentageFee;
    uint256 public paymentsMade;
    uint128 public payerIds;
    uint128 public autoIds;

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

        if (!newPayer.isOnPlatform) {
            uint128 id = payerIds;
            newPayer.payerId = id;
            payerIds += 1;
            newPayer.isOnPlatform = true;
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
        require(_amount > 0, "Invalid amount");
        require(_amount >= newSchool.tution, "amount != school tution");

        uint128 payerId = autoIds;
        autoPayers[payerId] = AutoPayer({
            balance: _amount,
            debts: 0,
            client: msg.sender,
            school: _school,
            autoPayerId: payerId,
            hasAutoPayments: true,
            hasPaid: false,
            studentName: _student,
            studentClass: _class
        });
        autoIds += 1;
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    // cancel auto payments
    function cancelAutoPayments() external {
        for (uint128 i = 0; i < autoIds; i++) {
            AutoPayer storage p = autoPayers[i];
            if (p.hasAutoPayments && p.debts == 0 && p.client == msg.sender) {
                p.hasAutoPayments = false;
            }
        }
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

        for (uint128 i = 0; i < autoIds; i++) {
            AutoPayer storage p = autoPayers[i];
            if (!p.hasAutoPayments && p.balance > 0 && p.client == msg.sender) {
                stableToken.safeTransfer(msg.sender, _amount);
            }
        }
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

        for (uint128 i = 0; i < autoIds; i++) {
            AutoPayer storage autoPayer = autoPayers[i];
            if (
                action == BEGIN_TERM &&
                skul.school == autoPayer.school &&
                autoPayer.balance >= skul.tution &&
                autoPayer.hasAutoPayments &&
                !autoPayer.hasPaid
            ) {
                uint256 tution = skul.tution;

                autoPayer.balance -= tution;
                skul.balance += tution;
                paymentsMade += tution;
                autoPayer.hasPaid = true;

                bool cleared = (autoPayer.balance - tution >= skul.tution);
                if (cleared) {
                    receipt[autoPayer.client] = Receipt({
                        time: block.timestamp,
                        amount: tution,
                        balance: 0,
                        payer: autoPayer.client,
                        school: skul.school,
                        cleared: cleared,
                        student: autoPayer.studentName,
                        class: autoPayer.studentClass
                    });
                }
            }
            if (action == END_TERM && autoPayer.hasPaid) {
                autoPayer.hasPaid = false;
            }
        }
    }

    function getAutoPayer() external view returns (AutoPayer memory) {
        for (uint128 i = 0; i < autoIds; i++) {
            AutoPayer memory p = autoPayers[i];
            if (p.client == msg.sender) {
                return p;
            }
        }
        revert("No auto payer found");
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
        for (uint128 i; i < termIdBySchool; i++) {
            AcademicTerm memory newTerm = academicTerm[i];
            if (newTerm.school == _schoolAddr) {
                return newTerm;
            }
        }
        revert("No matching term found");
    }
}
