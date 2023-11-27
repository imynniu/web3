import "dotenv/config";
import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_ETH);
const main = async () => {
  //1.getBalance() 查询余额
  const balance = await provider.getBalance(`vitalik.eth`);
  console.log(`vitalik 的账户余额为${ethers.formatEther(balance)} ETH`);
  //2. getNetwork() 查询连接到了哪一条链
  const network = await provider.getNetwork();
  console.log(network.toJSON());
  //3.getBlockNumber()查询当前区块高度
  const height = await provider.getBlockNumber();
  console.log(`当前区块高度:${height}`);
  //4.getTransactionCount 查询某个钱包的历史交易次数
  const nonce = await provider.getTransactionCount("vitalik.eth");
  console.log(`该地址的交易次数为 ${nonce}`);
  //5. getFeeData() 查询当前建议的gas设置，返回的数据为bigInt
  const fee = await provider.getFeeData();
  console.log(fee.toJSON());
  //6.getBlock() 查询区块信息,默认为当前区块，可以给出指定区块
  const block = await provider.getBlock();
  console.log(block);
  //getCode() 查询某个合约地址的bytecode,参数为合约地址
  const code = await provider.getCode(
    "0xc778417e063141139fce010982780140aa0cd50b"
  );
  console.log(code);
};
main();
