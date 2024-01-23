pragma solidity ^0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ZKLoans {

    LoanableTx[] private loanables; 
    struct LoanableTx {
        uint256 loanableEth;
        address ownerAddr;
        uint maxTerm;
        uint lowestRate;
    }





    function sendETHtoContract(uint mTerm, uint lRate) public payable {
    //msg.value is the amount of wei that the msg.sender sent with this transaction. 
    //If the transaction doesn't fail, then the contract now has this ETH.
        createLoanable(msg.value, msg.sender, mTerm, lRate);
    }

    function createLoanable(uint256 loanableFunds, address oAddr, uint mTerm, uint lRate ) private {
        loanables.push(LoanableTx({
            loanableEth: loanableFunds,
            ownerAddr: oAddr,
            maxTerm: mTerm,
            lowestRate: lRate
        }));
    }
    
    function getFunds() public view returns (uint256) {
        uint256 funds = 0;
        for(uint i = 0; i < loanables.length; i++) {
            funds += loanables[i].loanableEth;
        }
        return funds;
    }
    

    function getLoan(uint256 loanReq, string memory loanType, uint highestRate) public returns (bool) {
        //Make sure enough loanable funds with a low enough interest rate
        uint256 total = 0;
        for(uint i = 0; i < loanables.length; i++) {
            if(loanables[i].lowestRate < highestRate) {
                total += loanables[i].loanableEth;
            }
        }
        if(total < loanReq) {
            return false;
        }
        //Market Matching, fill lowest interest rates first.
        //TODO: Sorting Algorithm on loanables by lowest interest rate. Then match until order fulfilled. Remove loanables from loanables array. Move to LoanPool?
        for(uint i = 0; i < loanables.length; i++) {

        }
    }
    function getLoanables() public view returns (string memory) {
        string memory loans = "";
        for(uint i = 0; i < loanables.length; i++) {
            loans = string(abi.encodePacked(loans, "Loan: ", Strings.toString(i), "\n"));
            loans = string(abi.encodePacked(loans, "Owner Addr ", Strings.toHexString(uint256(uint160(loanables[i].ownerAddr))), "\n"));
            loans = string(abi.encodePacked(loans, "Loanable Eth ", Strings.toString(loanables[i].loanableEth), "\n"));
            loans = string(abi.encodePacked(loans, "Max Term ", Strings.toString(loanables[i].maxTerm), "\n"));
            loans = string(abi.encodePacked(loans, "Lowest Rate ", Strings.toString(loanables[i].lowestRate), "\n"));
        }
        return loans;
    }
}