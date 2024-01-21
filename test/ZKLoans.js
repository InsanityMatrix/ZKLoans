const { expect } = require("chai");


describe("ZKLoans", function(){
    async function testProvideFunds(provider) {
        const owner = new ethers.Wallet("0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd", provider);
        const Loans = await ethers.getContractFactory("ZKLoans");
        const loans = await Loans.deploy();


        let mTerm = 18;
        let lowestRate = 234;
        const loansAddr = await loans.getAddress();
        const transactionHash = await owner.sendTransaction({
            to: loansAddr,
            value: ethers.parseEther("1.0"),
            data: loans.interface.encodeFunctionData("sendETHtoContract", [mTerm, lowestRate]),
            gasLimit: 600000000000000,
        });

        return {transactionHash, loansAddr};
    }

    describe("Deployment", function() {
        it("Should be able to receive transaction", async function() {
            const provider = ethers.getDefaultProvider();
            let transactionHash, loansAddr = await testProvideFunds(provider);
            expect(await provider.getBalance(loansAddr)).to.be.greaterThan(0)
        })
    });
});