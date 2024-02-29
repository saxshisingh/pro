const DogecoinCore = require('dogecoin');

class DogecoinWallet {
    constructor() {
        // Connect to your Dogecoin Core node (replace with your own configuration)
        this.client = new DogecoinCore({
            network: 'testnet', // Adjust network as per your requirement (mainnet, testnet, regtest, etc.)
            username: 'yourusername',
            password: 'yourpassword',
            port: 22555, // Adjust port as per your Dogecoin Core configuration
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

            // Create a transaction that sends Dogecoins to the deposit address
            const transactionId = await this.client.sendToAddress(depositAddress, amount);

            console.log(`Transaction sent! Transaction ID: ${transactionId}`);

            // Return the deposit address so the user knows where to send the Dogecoins
            return depositAddress;
        } catch (error) {
            console.error('Error depositing funds:', error);
        }
    }

    async withdraw(recipient, amount) {
        try {
            // Create a transaction that sends Dogecoins from the wallet to the recipient address
            const txid = await this.client.sendToAddress(recipient, amount);
            console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
            return txid;
        } catch (error) {
            console.error('Error sending transaction:', error);
        }
    }
}

// Example usage:
async function testDogecoinWallet() {
    const wallet = new DogecoinWallet();

    // Simulate deposit by sending Dogecoins to the generated address
    const depositAmount = 0.05; // Example deposit amount
    const depositAddress = await wallet.deposit(depositAmount);
    console.log(`Please send ${depositAmount} Dogecoins to the following address: ${depositAddress}`);

    // Simulate withdrawal
    const recipientAddress = 'recipient_address'; // Replace with recipient's Dogecoin address
    const withdrawAmount = 0.03; // Example withdrawal amount
    const txid = await wallet.withdraw(recipientAddress, withdrawAmount);
    console.log(`Withdrawal transaction sent! Transaction ID: ${txid}`);
}

testDogecoinWallet();
