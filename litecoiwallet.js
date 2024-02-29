const LitecoinCore = require('litecoin-core');

class LitecoinWallet {
    constructor() {
        // Connect to your Litecoin Core node (replace with your own configuration)
        this.client = new LitecoinCore({
            network: 'testnet', // Adjust network as per your requirement (mainnet, testnet, regtest, etc.)
            username: 'yourusername',
            password: 'yourpassword',
            port: 19332, // Adjust port as per your Litecoin Core configuration
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

            // Create a transaction that sends Litecoins to the deposit address
            const transactionId = await this.client.sendToAddress(depositAddress, amount);

            console.log(`Transaction sent! Transaction ID: ${transactionId}`);

            // Return the deposit address so the user knows where to send the Litecoins
            return depositAddress;
        } catch (error) {
            console.error('Error depositing funds:', error);
        }
    }

    async withdraw(recipient, amount) {
        try {
            // Create a transaction that sends Litecoins from the wallet to the recipient address
            const txid = await this.client.sendToAddress(recipient, amount);
            console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
            return txid;
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }
}

// Example usage:
async function testLitecoinWallet() {
    const wallet = new LitecoinWallet();

    // Simulate deposit by sending Litecoins to the generated address
    const depositAmount = 0.05; // Example deposit amount
    const depositAddress = await wallet.deposit(depositAmount);
    console.log(`Please send ${depositAmount} Litecoins to the following address: ${depositAddress}`);

    // Simulate withdrawal
    const recipientAddress = 'recipient_address'; // Replace with recipient's Litecoin address
    const withdrawAmount = 0.03; // Example withdrawal amount
    const txid = await wallet.withdraw(recipientAddress, withdrawAmount);
    console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
}

testLitecoinWallet();
