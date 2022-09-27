const Token = artifacts.require("OwnerToken")

var chai = require("chai");
const BN = web3.utils.BN;
const chainBN = require("chai-bn")(BN);
chai.use(chainBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("Token Test", async (accounts) => {
    const [deployerAccount, recipient, anotherAccount] = accounts;
    it("All tokens should be my account", async () => {
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        let balance = instance.balanceOf(deployerAccount);
        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "the balance was not the same");
        expect(balance).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("Is possible to send between accounts", async () => {
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalSupply = await instance.totalSupply();
        let deployerBalance = instance.balanceOf(deployerAccount);
        let recipientBalance = instance.balanceOf(recipient);

        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "the balance was not the same");
        expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect(recipientBalance).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });

    it("Is not possible to send more tokens than available in total", async () => {
        let instance = await Token.deployed();
        let deployerBalanceBefore = instance.balanceOf(deployerAccount);
        let deployerBalanceAfter = await instance.balanceOf(deployerAccount);

        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "the balance was not the same");
        // expect(deployerBalance).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, new BN(deployerBalanceAfter + 1))).to.eventually.be.rejected;
        expect(deployerBalanceBefore).to.eventually.be.a.bignumber.equal(deployerBalanceAfter);
    });
})