const {Web3} = require('web3');
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'build', 'contracts', 'BinanceCoin.json'), 'utf8'));

const abi = data.abi;

// Contract ABI (replace with actual ABI)

// Contract address (replace with actual address)
const contractAddress = '0x7EF2e0048f5bAeDe046f6BF797943daF4ED8CB47...';

// Binance Smart Chain provider (replace with your provider)
const providerUrl = 'https://go.getblock.io/fd1c6270e2244e9798d92a2afe7e302a';
const web3 = new Web3(providerUrl);

// Wallet private key (replace with your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create wallet instance
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

async function deposit(amount) {
    try {
        // Call deposit function on the smart contract
        const data = contract.methods.deposit(amount).encodeABI();
        const tx = await web3.eth.sendTransaction({
            from: account.address,
            to: contractAddress,
            data: data
        });
        console.log('Deposit successful:', tx.transactionHash);
    } catch (error) {
        console.error('Deposit failed:', error);
    }
}

async function withdraw(amount) {
    try {
        // Call withdraw function on the smart contract
        const data = contract.methods.withdraw(amount).encodeABI();
        const tx = await web3.eth.sendTransaction({
            from: account.address,
            to: contractAddress,
            data: data
        });
        console.log('Withdrawal successful:', tx.transactionHash);
    } catch (error) {
        console.error('Withdrawal failed:', error);
    }
}

async function getBalance() {
    try {
        // Call balanceOf function on the smart contract
        const balance = await contract.methods.balanceOf(account.address).call();
        console.log('Balance:', balance);
    } catch (error) {
        console.error('Failed to get balance:', error);
    }
}

// Example usage
deposit(100);
withdraw(50);
getBalance();
