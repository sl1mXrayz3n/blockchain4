import { expect } from "chai";
import { ethers } from "hardhat";
import { parseEther } from "ethers";

describe("YourContract", function () {
  let contract: any;
  let owner: any;

  beforeEach(async () => {
    const [deployer] = await ethers.getSigners();

    const YourContract = await ethers.getContractFactory("YourContract");
    contract = await YourContract.deploy();
    await contract.waitForDeployment();

    owner = deployer;
  });

  it("should deploy successfully", async () => {
    expect(contract).to.be.ok;
  });

  it("should allow players to place bets", async () => {
    const betAmount = parseEther("1.0");
    // Вызываем createBet с указанием только суммы ставки
    await expect(
      contract.connect(owner).createBet({ value: betAmount })
    ).to.emit(contract, "BetCreated");
  });
});
