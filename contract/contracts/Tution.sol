// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Tution is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    IERC20 public stableToken;
    using SafeERC20 for IERC20;
    struct School {
        uint256 balance;
        uint256 tution;
        address school;
        bool isRegistered;
        bool isActive;
        bytes32 name;
    }
    struct Payer {
        uint256 balance;
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
    struct SchoolWithdraw{
        uint256 amount;
        uint256 net;
        address school;
        uint32 fee;
    }
    mapping(address => School) public school;
    mapping(address => Payer) public payer;
    mapping(address => Receipt) public receipt;
    mapping(address => SchoolWithdraw) public schoolWithdraw;
    uint32 public percentageFee;
    uint256[50] private __gap;
    modifier onlySchool() {
        School storage s = school[msg.sender];
        require(s.isRegistered, "Not registered");
        _;
    }

    function initialize(address _tokenUsed) public initializer {
        require(_tokenUsed != address(0), "Invalid address");
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        stableToken = IERC20(_tokenUsed);
    }
function updateTxFee(uint32 _percentage)external onlyOwner{
    require(_percentage < 50, "Much fee");
    percentageFee = _percentage;
}
    // register school
    function registerSchool(address _school, bytes32 _name, uint256 _tution) external onlyOwner {
        school[msg.sender] = School({
            balance: 0,
            tution: _tution,
            school: _school,
            isRegistered: true,
            isActive: true,
            name: _name
        });
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
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        payer[msg.sender].balance += _amount;
    }

    // update tution
    function updateTution(uint256 _tution) external onlySchool {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Inactive");
        newSchool.tution = _tution;
    }

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
        newPayer.balance -= _amount; 
        newSchool.balance += _amount;
        receipt[msg.sender] = Receipt({
            time: block.timestamp,
            amount: _amount,
            balance: newSchool.tution - _amount,
            payer: msg.sender,
            school: _school,
            cleared: _amount >= newSchool.tution ? true : false,
            student: _student,
            class: _class
        });
       
    }

    // withdraw
    function schoolWithdrawal(uint256 _amount) external onlySchool nonReentrant {
        School storage newSchool = school[msg.sender];
        require(newSchool.isRegistered, "Unregistered");
        require(newSchool.isActive, "Innactive");
        require(newSchool.balance > _amount, "Much amount");
        newSchool.balance -= _amount;
         uint256 _fee =  (_amount * percentageFee) / 1000;
         uint256 netWithdraw = _amount - _fee;
        schoolWithdraw[msg.sender] = SchoolWithdraw({
            amount: _amount, net: netWithdraw, school: msg.sender, fee: uint32(_fee)
        });
        stableToken.safeTransfer(msg.sender, netWithdraw);
    }

    // client withdraw
    function clientWithdraw(uint256 _amount) external nonReentrant{
        Payer storage newPayer = payer[msg.sender];
        require(newPayer.balance >= _amount, "Much");
        newPayer.balance -= _amount;
        stableToken.safeTransfer( msg.sender, _amount);
    }

    // view
    function getSchoolInfo(address _school) external onlySchool view returns (School memory) {
return school[_school];
    }

    function getClient() external view returns (Payer memory) {
        return payer[msg.sender];
    }

    function getReceipt(address _user) external view returns(Receipt memory) {
        return receipt[_user];
    }
}
