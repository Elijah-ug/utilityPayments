// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract Tution is Initializable, ReentrancyGuardUpgradeable, OwnableUpgradeable {
    IERC20 public stableTonen;
    using SafeERC20 for IERC20;
    struct School {
        uint256 balance;
        uint256 tution;
        address school;
        bool isRegistered;
        bytes32 name;
    }
    struct Payer {
        uint256 balance;
        address payer;
    }
    struct Receipt {
        uint128 amount;
        uint128 balance;
        address payer;
        address school;
        uint96 timestamp;
        bool cleared;
        bytes32 student;
        bytes32 class;
    }
    mapping(address => School) public school;
    mapping(address => Payer) public payer;
    mapping(address => Receipt) public receipt;
    modifier onlySchool() {
        require(msg.sender == school[msg.sender].school, "Not a client");
        _;
    }
    function initialize(address _tokenUsed) public initializer {
        require(_tokenUsed != address(0), "Invalid address");
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        stableTonen = IERC20(_tokenUsed);
    }
    // register school
    function registerSchool(uint256 _balance, address _school, bytes32 _name) external onlyOwner {}
    // freez company
    function deactivateSchool(address _school) external onlyOwner {}
    // activate school
    function activateSchool(address _school) external onlyOwner {}
    // client deposit
    function clientDeposit(uint256 _amount) external {}
    // update tution
    function updateTution(uint256 _tution) external onlySchool {}
    // tution payment
    function tutionPayment(
        address _school,
        uint256 _amount,
        bytes32 _student,
        bytes32 _class
    ) external {}
    // withdraw
    function schoolWithdraw(uint256 _amount) external onlySchool {}
    // client withdraw
    function clientWithdraw(uint256 _amount) external {}
    // view
    function getSchoolInfo(address _school) external onlySchool {}
    function getClient(address _client) external {}
    function getReceipt(address _user) external {
        // require(_user == school[msg.sender].school || _user == payer[msg.sender].payer);
    }
}
