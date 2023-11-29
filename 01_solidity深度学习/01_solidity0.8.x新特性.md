#### 0.8.0版本新特性

##### 1 安全数学

solidity 0.8有默认的溢出检查：溢出的检查是非常普遍的，所以我们把它作为默认的检查， 以增加代码的可读性，即使它是以**略微增加gas成本为代价**的。

使用`unchecked { ... }`可以让绕过检查，恢复溢出效果。

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.7;
contract uncheck {
    function check() public pure returns(uint){
        uint x = 0 ;//uint为无符号整数，会有溢出的情况
        x= x-1;
        return x;
    }
    function unCheck() public pure returns(uint){
        uint x=0;//uint为无符号整数，会有溢出的情况
        unchecked{ x=x-1 ;}
        return x;
    }
}
```

调用方法1 check()的时候会导致交易的revert

```
CALL
[call]from: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4to: uncheck.check()data: 0x919...840ad
call to uncheck.check errored: Error occured: revert.

revert
	The transaction has been reverted to the initial state.
Note: The called function should be payable if you send value and the value you send should be less than your current balance.
Debug the transaction to get more information.
```

调用方法2unCheck（）的时候可以得到溢出的结果

```solidity
{
	"0": "uint256: 115792089237316195423570985008687907853269984665640564039457584007913129639935"
}
```

##### 2 自定义错误





##### 3 函数在合约之外

##### 4 导入合约

##### 5 create2

