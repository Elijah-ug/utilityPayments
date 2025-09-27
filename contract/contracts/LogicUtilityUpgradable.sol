//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface ICompanyManager {
    function getCompany(
        address company
    )
        external
        view
        returns (
            address companyAddr,
            uint256 balance,
            bool isActive,
            string memory name,
            string memory utilityService
        );
}

contract LogicUtilityUpgradable is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    IERC20 public stableToken;
    using SafeERC20 for IERC20;
    ICompanyManager public companyManager;
    uint256 public feePercentage;
    uint256 public totalFeesCollected;
    uint256 public totalTransactedAmount;
    // uint256 public withdrawFeePercentage;

    mapping(address => uint256) public companyBalances;
    address public feeCollector;
    struct Receipt {
        address company;
        address payer;
        uint96 amount;
        uint96 platformFee;
        uint96 netPaid;
        uint32 id;
    }
    mapping(address => Receipt) public receipt;
    uint32 public receiptCounter;
    struct Client {
        address user;
        uint256 balance;
    }
    mapping(address => Client) client;
    event PaymentMode(
        address indexed payer,
        address indexed company,
        uint256 amount
    );
    event CompanyWithdrawn(address indexed company, uint256 amount);
    event PlatformFeeWithdrawn(address indexed to, uint256 amount);

    // new
    function initialize(
        address _baseUtility,
        address _tokenUsed
    ) public initializer {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        companyManager = ICompanyManager(_baseUtility);
        stableToken = IERC20(_tokenUsed);
    }

    function viewImportedCompany(
        address _compAddr
    ) external view returns (address, bool, string memory) {
        try companyManager.getCompany(_compAddr) returns (
            address companyAddr,
            uint256,
            bool isActive,
            string memory name,
            string memory
        ) {
            return (companyAddr, isActive, name);
        } catch {
            revert("Not found or Inactive");
        }
    }

    function updateFees(uint256 _fee) external onlyOwner {
        require(_fee < 1000, "High fee");
        feePercentage = _fee;
    }

    function clientDeposit(uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        stableToken.safeTransferFrom(msg.sender, address(this), _amount);
        client[msg.sender].balance += _amount;
    }

    // pay utility function
    function payUtility(address _company, uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        // get company's receiving address
        (address companyAddr, , bool isActive, , ) = companyManager.getCompany(
            _company
        );
        require(isActive, "Inactive Company");
        // calculate platform fee and net amount
        uint256 transactionFee = (_amount * feePercentage) / 1000;
        uint256 netReceived = _amount - transactionFee;
        stableToken.safeTransferFrom(msg.sender, companyAddr, _amount);
        Receipt memory newReceipt = Receipt({
            company: companyAddr,
            payer: msg.sender,
            amount: uint96(_amount),
            platformFee: uint96(transactionFee),
            netPaid: uint96(netReceived),
            id: uint32(receiptCounter++)
        });
        receipt[msg.sender] = newReceipt;
        // update
        totalFeesCollected += transactionFee;
        // total transactions on platform
        totalTransactedAmount += _amount;
        // increament company balances
        companyBalances[companyAddr] += netReceived;

        emit PaymentMode(msg.sender, companyAddr, _amount);
    }

    function withdraw(uint256 _amount) external nonReentrant {
        (address companyAddr, , , , ) = companyManager.getCompany(msg.sender);
        require(msg.sender == companyAddr, "Not recognised");
        require(companyBalances[msg.sender] > _amount, "Invalid amount");
        uint256 withdrawFee = (_amount * feePercentage) / 1000;
        uint256 finalAmount = _amount - withdrawFee;
        stableToken.safeTransfer(msg.sender, finalAmount);
        companyBalances[msg.sender] -= _amount;
        totalFeesCollected += withdrawFee;

        emit CompanyWithdrawn(msg.sender, _amount);
    }

    function clientWithdraw(uint256 _amount) external nonReentrant {
        Client storage newClient = client[msg.sender];
        require(newClient.user == msg.sender, "Unauthorized");
        require(newClient.balance > _amount, "Invalid amount");
    }

    function withdrawPlatformFee(
        uint256 _amount
    ) external onlyOwner nonReentrant {
        uint256 withdrawFee = (_amount * feePercentage) / 1000;
        uint256 net = _amount - withdrawFee;
        stableToken.safeTransfer(msg.sender, net);
        totalFeesCollected += withdrawFee;

        emit PlatformFeeWithdrawn(msg.sender, _amount);
    }

    function getReceipt(address user) external view returns (Receipt memory) {
        Receipt memory r = receipt[user];
        require(
            msg.sender == r.company || msg.sender == r.payer,
            "Not authorised!"
        );
        return r;
    }

    function getCompanyBalance(
        address _company
    ) external view returns (uint256) {
        return companyBalances[_company];
    }

    function getClient(address _client) external view returns (Client memory) {
        return client[_client];
    }

    function totalPlatformTransactions() external view returns (uint256) {
        return totalTransactedAmount;
    }
    // receive() external payable {}
}
