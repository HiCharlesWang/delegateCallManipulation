pragma solidity >= 0.8.0;

import "./erc20mock.sol";

contract logic {
    mapping(address => uint256) public balance;
    using SafeERC20 for IERC20;
    IERC20 public stakingToken;
    address private logic;

    function changeBalance(address _addr, uint256 _amount) external {
        balance[_addr] = _amount;
    }

    function balanceOf(address _addr) external view returns(uint256) {
        return balance[_addr];
    }
}