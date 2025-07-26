//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ICompanyManager {
    function isCompanyActive(address company) external view returns (bool);
    function getCompany(address company) external view returns (
        address companyAddr,
        uint256 balance,
        bool isActive,
        string memory name,
        string memory utilityService
    );
}

contract LogicUtilityUpgradable is Initializable, OwnableUpgradeable, ReentrancyGuard {
    ICompanyManager public companyManager;
    uint256 public feePercentage;
    uint256 public totalFeesCollected;
    uint256 public totalTransactedAmount;
    // uint256 public withdrawFeePercentage;

     mapping(address => uint256) public companyBalances;
     address public feeCollector;
     struct Receipt{
        address company;
        address payer;
        uint96 amount;
        uint96 platformFee;
        uint96 netPaid;
        uint64 timestamp;
        uint32 id;
     }
     mapping(address => Receipt) public receipt;
     uint32 public receiptCounter;

    event PaymentMode(address indexed payer, address indexed company, uint256 amount);
    event CompanyWithdrawn( address indexed company, uint256 amount);
    event PlatformFeeWithdrawn( address indexed to, uint256 amount);

    function initialize(address _baseUtility) public initializer{
        __Ownable_init(msg.sender);
        companyManager = ICompanyManager(_baseUtility);
    }

    function updateFees(uint256 _fee) external onlyOwner {
        require(_fee < 1000, "High fee");
        feePercentage = _fee;
    }

    // pay utility function
    function payUtility(address _company) external payable{
        require(msg.value > 0, "Invalid Amount");
        require(companyManager.isCompanyActive(_company), "Company Not Found");
        // get company's receiving address
        (address companyAddr, , , , ) = companyManager.getCompany(_company);
        require(companyAddr != address(0), "Address Not Found");
        // calculate platform fee and net amount
       uint256 transactionFee = ( msg.value * feePercentage) / 1000;
       uint256 netReceived = msg.value - transactionFee;
       receipt[msg.sender] = Receipt({
        company: companyAddr,
        payer: msg.sender,
        amount: uint96(msg.value),
        platformFee: uint96(transactionFee),
        netPaid: uint96(netReceived),
        timestamp: uint64(block.timestamp),
        id: uint32(receiptCounter ++)
        });
        // update
        totalFeesCollected += transactionFee;
        // total transactions on platform
        totalTransactedAmount += msg.value;
        // increament company balances
        companyBalances[companyAddr] += netReceived;

        emit PaymentMode(msg.sender, companyAddr, msg.value);
    }

    function withdraw() external nonReentrant{
        (address companyAddr, , , , ) = companyManager.getCompany(msg.sender);
        require(msg.sender == companyAddr, "Not recognised");
        uint256 balance = companyBalances[msg.sender];
        require(balance > 0, "Not enough balance");
        uint256 withdrawFee = (balance * feePercentage) / 1000;
        uint256 finalAmount = balance - withdrawFee;
        payable(msg.sender).transfer(finalAmount);
        companyBalances[msg.sender] = 0;
        totalFeesCollected += withdrawFee;

        emit CompanyWithdrawn(msg.sender, balance);
    }
    function withdrawPlatformFee(uint256 _amount) external onlyOwner nonReentrant {
        require(msg.sender == owner(), "Not Owner");
        payable(msg.sender).transfer(_amount);
        totalFeesCollected -= _amount;

        emit PlatformFeeWithdrawn(msg.sender, _amount);
    }
    function getReceipt() external view returns(Receipt memory){
            return receipt[msg.sender];
    }
    function getCompanyBalance(address _company) external view returns (uint256) {
    return companyBalances[_company];
       }
       function totalPlatformTransactions() external view returns(uint256){
        return totalTransactedAmount;
       }

    receive() external payable{}
}
