import { ContractFactory, ethers } from "ethers";
import "dotenv/config";
import { abi } from "./data/ERC20ABI.js";
import { bytecode } from "./data/bytecodeERC20.js";
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractFctory = new ethers.ContractFactory(abi, bytecode, wallet);
console.log("利用contractFactory部署ERC20合约...");
const contractERC20 = await contractFctory.deploy("Wrapped BTC", "WBTC");
console.log(`合约的地址：${contractERC20.target}`);
console.log(
  `合约的部署交易详情:${await contractERC20.deploymentTransaction()}`
);
console.log("等待部署交易上链...");
await contractERC20.waitForDeployment();
// await contractERC20.deploymentTransaction.wait();
console.log("合约部署成功！！！");
console.log("铸造代币...");
let tx = await contractERC20.mint("999999");
await tx.wait();
console.log("铸造成功！！！");
console.log("给v神发送10000个代币");
tx = await contractERC20.transfer("vitalik.eth", "10000");
await tx.wait();
console.log("发送成功");
console.log("===============查询合约余额================");
console.log(`V神的余额：${await contractERC20.balanceOf("vitalik.eth")}`);
console.log(
  `我的钱包的余额（创建地址）：${await contractERC20.balanceOf(
    "0xAC8135b2cCd8E81A5e9dB7edafB23B6C41c46907"
  )}`
);
console.log(
  `合约地址的余额：${await contractERC20.balanceOf(contractERC20.target)}`
);
