const {Web3} = require('web3');

// Ethereum node URL
const provider = new Web3.providers.HttpProvider('https://go.getblock.io/0c7b4bcabe47451da043deb873a255db');

// ABI of the TetherWallet contract
const abi = require('./TetherABI.json');
// Address of the TetherWallet contract
const contractAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';

// Instantiate contract
const web3 = new Web3(provider);
const contract = new web3.eth.Contract(abi, contractAddress);
const accounts = web3.eth.accounts.create();
const random_address = accounts.address;



async function depositTokens(amount, fromAddress, toAddress) {
    const balance = await contract.methods.getBalance(toAddress).call();

    if (balance + amount > balance) {
        throw new Error('Insufficient balance to complete transaction');
    }

    // Send transaction
    await contract.methods.deposit(amount, toAddress).send({ from: fromAddress });
    console.log('Deposited tokens to', toAddress);
}

// Example: Withdraw tokens
// Example: Withdraw tokens
async function withdrawTokens(amount, fromAddress) {
    // Get balance of sender's address
    const balance = await contract.methods.getBalance(fromAddress).call();

    // Check if balance is sufficient
    if (balance < amount) {
        throw new Error('Insufficient balance to complete transaction');
    }

    // Send transaction
    await contract.methods.withdraw(amount, fromAddress).send({ from: fromAddress });
    console.log('Withdrawn tokens from', fromAddress);
}
// Example usage
depositTokens(10, random_address, '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4');