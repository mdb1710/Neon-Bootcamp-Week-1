// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");

async function main() {
    const BoomBoxAddress = ''; // !!! paste here your deployed smart contract address !!!
    if (!ethers.isAddress(BoomBoxAddress)) {
        console.log('Invalid BoomBoxAddress');
        return false;
    }
    
    const [owner] = await ethers.getSigners();
    const receiver = ethers.Wallet.createRandom(); // !!! change this to valid address on production !!!
    const BoomBox = await ethers.getContractAt('BoomBox', BoomBoxAddress);

    console.log('Sender balance before transfer', await BoomBox.balanceOf(owner.address));
    console.log('Receiver balance before transfer', await BoomBox.balanceOf(receiver.address));

    let tx = await BoomBox.transfer(receiver, ethers.parseUnits('10', 18));
    await tx.wait(3);

    console.log('Sender balance after transfer', await BoomBox.balanceOf(owner.address));
    console.log('Receiver balance after transfer', await BoomBox.balanceOf(receiver.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});