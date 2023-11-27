import { ethers } from "ethers";
import "dotenv/config";
const privateKey = process.env.PRIVATE_KEY;
const SepoliaApi = process.env.ALCHEMY_SEPOLIA;
// 1 创建provider对象
const provider = new ethers.JsonRpcProvider(SepoliaApi);

//2 创建钱包（3种方式）
let wallet1 = ethers.Wallet.createRandom();
wallet1 = wallet1.connect(provider);
const wallet2 = new ethers.Wallet(privateKey, provider);
let wallet3 = ethers.Wallet.fromPhrase(wallet1.mnemonic.phrase);
wallet3 = wallet3.connect(provider);
//3 获取地址
const address1 = await wallet1.getAddress();
const address2 = await wallet2.getAddress();
const address3 = await wallet3.getAddress();
console.log(`钱包1 的地址为${address1}`);
console.log(`钱包2 的地址为${address2}`);

console.log(`钱包3 的地址为${address3}`);

//4 获取助记词
const phrase1 = wallet1.mnemonic.phrase;
console.log(`钱包1 的助记词为：${phrase1}`);
// 5 获取私钥
const key = wallet1.privateKey;
console.log(`钱包1的私钥为：${key}`);
//6 查询钱包在链上的交易次数
const txCount1 = await wallet1.getNonce();
const txCount2 = await wallet2.getNonce();
const txCount3 = await wallet3.getNonce();
console.log(`钱包1 在链上的交易次数为：${txCount1}`);
console.log(`钱包2 在链上的交易次数为：${txCount2}`);
console.log(`钱包3 在链上的交易次数为：${txCount3}`);
//7 发送交易
const tx = {
  to: address1,
  value: ethers.parseEther("0.001"),
};

console.log("地址2 向地址1发送0.001 eth");
console.log("发送前余额==========");
console.log(
  `钱包1余额：${ethers.formatEther(await provider.getBalance(address1))} EHT`
);
console.log(
  `钱包2余额：${ethers.formatEther(await provider.getBalance(address2))} EHT`
);

// 发送操作
const receipt = await wallet2.sendTransaction(tx);
await receipt.wait();
console.log(receipt);

console.log("发送后余额==========");
console.log(
  `钱包1余额：${ethers.formatEther(await provider.getBalance(address1))} EHT`
);
console.log(
  `钱包2余额：${ethers.formatEther(await provider.getBalance(address2))} EHT`
);
