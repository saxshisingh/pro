// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BinanceCoin {
    string public name = "Binance Coin";
    string public symbol = "BNB";
    uint8 public decimals = 18;
    uint256 public totalSupply;

    mapping(address => uint256) private _balances;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed recipient, uint256 amount);

    constructor(uint256 _initialSupply) {
        _mint(msg.sender, _initialSupply);
    }

    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    function deposit(uint256 amount) external payable {
        require(msg.value == amount, "BNB amount must match sent value");
        _balances[msg.sender] += amount; // No overflow/underflow check for simplicity
        totalSupply += amount; // No overflow check for simplicity
        emit Deposit(msg.sender, amount);
    }

    function withdraw(uint256 amount) external {
        require(_balances[msg.sender] >= amount, "Insufficient balance");
        _balances[msg.sender] -= amount; // No underflow check for simplicity
        totalSupply -= amount; // No underflow check for simplicity
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
    }

    function _mint(address account, uint256 amount) internal {
        _balances[account] += amount; // No overflow check for simplicity
        totalSupply += amount; // No overflow check for simplicity
        emit Deposit(account, amount);
    }

    // Omitted: _burn function for simplicity

    // Omitted: _transfer function for simplicity
}
