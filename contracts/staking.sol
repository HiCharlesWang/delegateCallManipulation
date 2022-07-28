pragma solidity >= 0.8.0;

import "./erc20mock.sol";

contract staking{
    mapping(address => uint256) public balance;
    using SafeERC20 for IERC20;
    IERC20 public stakingToken;
    address private logic;

    constructor(IERC20 _token, address _logic) {
        stakingToken = _token;
        logic = _logic;
    }

    function deposit(uint256 _amount) external {
        balance[msg.sender] += _amount;
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint256 _amount) external {
        require(balance[msg.sender] >= _amount, "Not enough token staked");
        balance[msg.sender] -= _amount;
        stakingToken.safeTransfer(msg.sender, _amount);
    }

    function changeBalance(address _addr, uint256 _balance) external {
        logic.delegatecall(abi.encodeWithSignature("changeBalance(address, uint256)", _addr, _balance));
    }

    function balanceOf(address _addr) external view returns(uint256) {
        return balance[_addr];
    }
}