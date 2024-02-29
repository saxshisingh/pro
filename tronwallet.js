const TronWeb = require('tronweb');

// Connect to a Tron node
const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { 'TRON-PRO-API-KEY': '7f58df47-38bb-46b5-b14b-cfd65b0843db' } // Replace with your API key
});

class TronWallet {
    constructor() {
        this.privateKey = '';
        this.address = '';

        // Generate a new private key and address
        this.generateAccount();
    }

    // Function to generate a new Tron account
    async generateAccount() {
        const account = await tronWeb.createAccount();
        if (account && account.address) {
            this.privateKey = account.privateKey;
            this.address = account.address.base58;
        } else {
            console.error('Error: Failed to generate Tron account');
        }
    }

    // Example function to generate a random Tron address
    async generateRandomAddress() {
        return new Promise((resolve, reject) => {
            // Create a new Tron account (which generates a random private key and address)
            tronWeb.createAccount().then(account => {
                const randomAddress = account.address.base58;
                resolve(randomAddress);
            }).catch(error => {
                reject(error);
            });
        });
    }

    // Example function to deposit TRX to a random Tron address
    async depositTRX(amount) {
        // Generate a random recipient address
        const recipientAddress = await this.generateRandomAddress();

        const tx = await tronWeb.trx.sendTransaction(recipientAddress, amount);
        console.log('Deposit successful. Transaction ID:', tx.txid);
        console.log('TRX sent to recipient address:', recipientAddress);
    }

    // Example function to withdraw TRX from the TRC20 contract
    async withdrawTRX(amount, recipientAddress) {
        const tx = await tronWeb.trx.sendTransaction(recipientAddress, amount);
        console.log('Withdrawal successful. Transaction ID:', tx.txid);
    }
}

// Example usage:
const tronWallet = new TronWallet();

// Replace '1000000' with the amount of TRX you want to deposit or withdraw
const amount = 1000000;

// Deposit TRX to a random Tron address
const recipientAddress = tronWallet.generateRandomAddress();
console.log(recipientAddress);
//tronWallet.depositTRX(amount);
