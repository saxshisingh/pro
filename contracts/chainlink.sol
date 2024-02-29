// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ChainlinkWallet {
    mapping(address => uint256) public balances;
    address public tokenAddress;
    AggregatorV3Interface public priceFeed;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    constructor(address _tokenAddress, address _priceFeedAddress) {
        tokenAddress = _tokenAddress;
        priceFeed = AggregatorV3Interface(_priceFeedAddress);
    }

    function deposit(uint256 _amount) external {
        require(_amount > 0, "Deposit amount must be greater than zero");
        require(IERC20(tokenAddress).transferFrom(msg.sender, address(this), _amount), "Failed to transfer tokens");

        balances[msg.sender] += _amount;
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external {
        require(_amount > 0, "Withdrawal amount must be greater than zero");
        require(balances[msg.sender] >= _amount, "Insufficient balance");

        balances[msg.sender] -= _amount;
        require(IERC20(tokenAddress).transfer(msg.sender, _amount), "Failed to transfer tokens");
        emit Withdrawal(msg.sender, _amount);
    }

    function balanceOf(address _address) external view returns (uint256) {
        return balances[_address];
    }

    
}
