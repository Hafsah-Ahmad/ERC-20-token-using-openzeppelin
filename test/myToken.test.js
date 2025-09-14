const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken (OpenZeppelin)", function () {
  let MyToken, token, owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    MyToken = await ethers.getContractFactory("MyToken");
    token = await MyToken.deploy();
    await token.waitForDeployment();
  });

  it("Should have correct name, symbol, and decimals", async function () {
    expect(await token.name()).to.equal("Shitzu");
    expect(await token.symbol()).to.equal("SHIT");
    expect(await token.decimals()).to.equal(18);
  });

  it("Should assign total supply to owner", async function () {
    const totalSupply = await token.totalSupply();
    expect(await token.balanceOf(owner.address)).to.equal(totalSupply);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });

  it("Should approve and transferFrom", async function () {
    await token.approve(addr1.address, 500);
    await token.connect(addr1).transferFrom(owner.address, addr2.address, 500);
    expect(await token.balanceOf(addr2.address)).to.equal(500);
  });

  it("Should burn tokens", async function () {
    await token.burn(1000);
    expect(await token.totalSupply()).to.equal(
      (20000000n * 10n ** 18n) - 1000n
    );
  });

  it("Should pause and block transfers", async function () {
    await token.pause();
    await expect(
      token.transfer(addr1.address, 1000)
    ).to.be.revertedWith("Pausable: paused");
  });

  it("Should freeze and unfreeze accounts", async function () {
    await token.freeze(addr1.address);
    await expect(
      token.connect(addr1).transfer(addr2.address, 1000)
    ).to.be.revertedWith("Sender account is frozen");

    await token.unfreeze(addr1.address);
    await token.transfer(addr1.address, 1000);
    expect(await token.balanceOf(addr1.address)).to.equal(1000);
  });
});
