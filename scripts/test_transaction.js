
async function createTransaction() {
    const [owner] = await ethers.getSigners();
    const Loans = await ethers.getContractFactory("ZKLoans");
    const loans = await Loans.deploy();
    let mTerm = 18;
    let lowestRate = 234;
    const loansAddr = loans.getAddress();
    const transactionHash = await owner.sendTransaction({
        to: loansAddr,
        value: ethers.parseEther("1.0"),
        data: loans.interface.encodeFunctionData("sendETHtoContract", [mTerm, lowestRate]),
        gasLimit: 30000000,
    });
    const provider = ethers.getDefaultProvider();
    const balance = await provider.getBalance(loansAddr);
    return {transactionHash, balance};
}
(async () => {
try {
    let {txHash, balance} = await createTransaction();
    console.log(`TX Hash: ${txHash}`);
    console.log(`Contract Balance: ${balance}`);
} catch (e) {
    console.log(e);
}

})();
