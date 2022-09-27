import { ethers } from "./ethers-5.6.esm.min.js";

document.getElementById("transferButton").addEventListener("click", transfer);
document.getElementById("addToListButton").addEventListener("click", addToList);

const addressesList = new Array;

function addToList() {
    const addressTo = document.getElementById("addressTo").value;
    const amount = document.getElementById("value").value;
    addressesList.push({ addressTo, amount });
    
    document.getElementById("addressTo").value = "";
    document.getElementById("value").value = "";
}

async function transfer() {
    await window.ethereum.enable();

    let tokenContract;
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    console.log(await signer.getAddress());
    
    const tokenAddress = "0x56119ba620e7e05e60D0CE773dA036D5e4b33d00";

    const tokenABI = [
        "function transfer(address to, uint amount) external",
        "function balanceOf(address account) external view returns (uint256)"
    ];

    
    tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
    
    const balance = await tokenContract.balanceOf(await signer.getAddress());

    console.log(ethers.utils.formatEther(balance));
    
    addressesList.forEach(async (element) => {
        console.log(element.amount);
        await tokenContract.transfer(element.addressTo,  ethers.utils.parseUnits(element.amount));
    })
}