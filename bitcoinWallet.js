const BitcoinCore = require('bitcoin-core');

class BitcoinWallet {
    constructor() {
        // Connect to your Bitcoin Core node (replace with your own configuration)
        this.client = new BitcoinCore({
            network: 'regtest', // Adjust network as per your requirement (mainnet, testnet, regtest, etc.)
            username: 'yourusername',
            password: 'yourpassword',
            port: 18443, // Adjust port as per your Bitcoin Core configuration
            host: 'localhost',
        });
    }

    async getBalance(address) {
        try {
            const balance = await this.client.getReceivedByAddress(address);
            return balance;
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }

    async generateAddress() {
        try {
            const newAddress = await this.client.getNewAddress();
            return newAddress;
        } catch (error) {
            console.error('Error generating address:', error);
        }
    }

    async deposit(amount) {
        try {
            const depositAddress = await this.generateAddress();
            console.log('Deposit address:', depositAddress);

            // Create a transaction that sends bitcoins to the deposit address
            const transactionId = await this.client.sendToAddress(depositAddress, amount);

            console.log(`Transaction sent! Transaction ID: ${transactionId}`);

            // Return the deposit address so the user knows where to send the bitcoins
            return depositAddress;
        } catch (error) {
            console.error('Error depositing funds:', error);
        }
    }

    async withdraw(recipient, amount) {
        try {
            // Create a transaction that sends bitcoins from the wallet to the recipient address
            const txid = await this.client.sendToAddress(recipient, amount);
            console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
            return txid;
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }
}

// Example usage:
async function testBitcoinWallet() {
    const wallet = new BitcoinWallet();

    // Simulate deposit by sending bitcoins to the generated address
    const depositAmount = 0.05; // Example deposit amount
    const depositAddress = await wallet.deposit(depositAmount);
    console.log(`Please send ${depositAmount} bitcoins to the following address: ${depositAddress}`);

    // Simulate withdrawal
    const recipientAddress = 'recipient_address'; // Replace with recipient's Bitcoin address
    const withdrawAmount = 0.03; // Example withdrawal amount
    const txid = await wallet.withdraw(recipientAddress, withdrawAmount);
    console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
}

testBitcoinWallet();
