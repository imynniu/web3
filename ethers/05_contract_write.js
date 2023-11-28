import { ethers } from "ethers";
import "dotenv/config";
import { abi as wethAbi } from "./data/WETHABI.js";
const wethAddress = "0xf531B8F309Be94191af87605CfBf600D71C2cFe0";
//1 创建可写合约对象
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(wethAddress, wethAbi, wallet);

//2 钱包账户信息
console.log("钱包账户信息...");
const address = await wallet.getAddress();
let money = await provider.getBalance(address);
money = ethers.formatEther(money);
console.log(`address:${address}\nmoney:${money} ETH`);
//3 查询合约信息
console.log("合约持仓如下...");
const symbol = await contract.symbol();
const balance = await contract.balanceOf(address);
console.log(`合约代币符号：${symbol}`);
console.log(`钱包地址余额：${ethers.formatEther(balance)} ${symbol}`);
//4 进行交互
console.log("与合约进行交互");
console.log("1 调用deposit()函数，存入0.01WETH ...");
let receipt;
if (money > 0.01) {
  receipt = await contract.deposit({
    value: ethers.parseEther("0.01"),
  });
  await receipt.wait();
}
//查询持仓之后的余额
let balance2 = await contract.balanceOf(address);
balance2 = ethers.formatEther(balance2);
let money2 = await provider.getBalance(wallet);
money2 = ethers.formatEther(money2);
console.log(`存储之后的钱包:${money2}`);
console.log(`存储之后的持仓:${balance2}`);
console.log("交易详情：");
// console.log(receipt);
//5 将存储的WETH取回
console.log("将存储的weth全部取回...");
const tx = await contract.withdraw(ethers.parseEther(balance2));
await tx.wait();
const balance3 = ethers.formatEther(await contract.balanceOf(address));
const money3 = ethers.formatEther(await provider.getBalance(address));
console.log(`最终的钱包:${money3}`);
console.log(`最终的的持仓:${balance3}`);
