const Web3 = require('web3');

// Contract ABI (replace with actual ABI)
const abi = [
    // ABI methods here
];

// Contract address (replace with actual address)
const contractAddress = '0x123...';

// Ethereum provider (replace with your provider)
const providerUrl = 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID';
const web3 = new Web3(providerUrl);

// Wallet private key (replace with your private key)
const privateKey = 'YOUR_PRIVATE_KEY';

// Create wallet instance
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

// Set default account
web3.eth.defaultAccount = account.address;

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

async function getETHPrice() {
    try {
        // Call getETHPrice function on the smart contract
        const ethPrice = await contract.methods.getETHPrice().call();
        console.log('Latest ETH Price:', ethPrice);
    } catch (error) {
        console.error('Failed to get ETH price:', error);
    }
}

// Example usage
deposit(100);
withdraw(50);
getBalance();
