const { expect } = require("chai");


describe("ZKLoans", function(){
    async function testProvideFunds(provider) {
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

        return {transactionHash, loansAddr};
    }

    describe("Deployment", function() {
        
        it("Should be able to receive transaction", async function() {
            const provider = ethers.getDefaultProvider();
            let {transactionHash, loansAddr} = await testProvideFunds(provider);   
            expect(await provider.getBalance(loansAddr)).to.be.greaterThan(0);
        });
        it("Should be one loanable fund in the contract", async function(){
            const Loans = await ethers.getContractFactory("ZKLoans");
            const loans = await Loans.deploy();
            expect(await loans.getLoanables()).to.contain("18");
        });
    });
});