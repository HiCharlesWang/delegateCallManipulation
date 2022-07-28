const { expect } = require('chai');
const { ethers } = require('hardhat');

describe("Modify storage from staking", () =>{
    beforeEach(async () =>{
        [owner, addr1, _] = await ethers.getSigners();   
        mockFactory = await ethers.getContractFactory('TOKEN');
        mockDeployed = await mockFactory.deploy(owner.address);
        logicFactory = await ethers.getContractFactory('logic');
        logicDeployed = await logicFactory.deploy();
        stakingFactory = await ethers.getContractFactory('staking');
        stakingDeployed = await stakingFactory.deploy(mockDeployed.address, logicDeployed.address);
        await mockDeployed.mint(owner.address, 10000);
    })
    describe("Deposit, manipulate storage, withdraw with another wallet", () =>{
        it("Do all", async()=> {
            await mockDeployed.approve(stakingDeployed.address, 500);
            await stakingDeployed.deposit(500);
            expect(await stakingDeployed.balanceOf(owner.address)).to.equal(500);
            await stakingDeployed.changeBalance(owner.address, 0)
            console.log(await stakingDeployed.balanceOf(owner.address))
            console.log(await stakingDeployed.balanceOf(addr1.address))
            console.log(await logicDeployed.balanceOf(addr1.address))
            // await stakingDeployed.changeBalance(owner.address, 0)
            // expect(await stakingDeployed.balanceOf(owner.address)).to.equal(0)
            // expect(await stakingDeployed.balanceOf(owner.address)).to.equal(500)
            // expect(await stakingDeployed.withdraw(500)).to.be.revertedWith("Not enough token staked");
            // await stakingDeployed.connect(addr1).withdraw(500)
        })
    })
})