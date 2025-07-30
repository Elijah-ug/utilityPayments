// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract BaseUtilityUpgradeable is Initializable, OwnableUpgradeable {
    struct Company {
        address companyAddr;
        uint256 balance;
        bool isActive;
        string name;
        string utilityService;
    }
    mapping(address => Company) public companies;
    event CompanyRegistered(address indexed company, string name);
    event CompanyDeactivated(address indexed company);
    // added after dep 1
    Company[] public registerdCompanies;
function initialize() public initializer{
    __Ownable_init(msg.sender);
}
function registerCompany(address _companyAddr, string memory _name, string memory _utilityService) external onlyOwner{
    require(!companies[_companyAddr].isActive, "Company Registered");
    Company memory newCompany = Company(_companyAddr, 0, true, _name, _utilityService);
    companies[_companyAddr] = newCompany;
    registerdCompanies.push(newCompany);
    emit CompanyRegistered(_companyAddr, _name);
}
// deactivation
function deactivateCompany(address _companyAddr) external onlyOwner {
    require(companies[_companyAddr].isActive, "Company Not found");
    companies[_companyAddr].isActive = false;
    emit CompanyDeactivated(_companyAddr);
}
function updateCompany( string memory _name, string memory _utilityService) external{
    require(msg.sender == companies[msg.sender].companyAddr, "Not Recognised");
    companies[msg.sender].name = _name;
    companies[msg.sender].utilityService = _utilityService;
}
function isCompanyActive(address _companyAddr) external view returns(bool){
    return companies[_companyAddr].isActive;
}
function getCompany(address _companyAddr) external view returns (Company memory){
    return companies[_companyAddr];
}
function getRegisteredCompanies() external view returns (Company[] memory){
    return registerdCompanies;
}
}
