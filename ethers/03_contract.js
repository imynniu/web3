import { ethers } from "ethers";
import "dotenv/config";
import { abi } from "./data/DreadfulzABI.js";
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_ETH);

const contract = new ethers.Contract(
  "0x81Ae0bE3A8044772D04F32398bac1E1B4B215aa8",
  abi,
  provider
);

const main = async () => {
  const symbol = await contract.symbol();
  const owner = await contract.owner();
  const balance = await contract.balanceOf(owner);
  const supply = await contract.supply();
  console.log(`
    代币符号：${symbol}\n
    总供应量：${supply}\n
    代币合约拥有者：${owner}\n
    代币合约拥有者的余额：${balance}\n
    代币总供应量：${supply}\n
    
    `);
};
main();
