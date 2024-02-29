const express = require('express');
const bodyParser = require('body-parser');
const ParentWallet = require('./ParentWallet'); // Import the ParentWallet class

// Create an Express app
const app = express();
const port = 3000;

// Use bodyParser middleware to parse JSON bodies
app.use(bodyParser.json());

// Create a new instance of the ParentWallet class
const parentWallet = new ParentWallet();

// Add child wallets for different cryptocurrencies (you can customize this part based on your implementation)
// Example:
// const bitcoinWallet = new BitcoinWallet();
// const ethereumWallet = new EthereumWallet();
// const polkadotWallet = new PolkadotWallet();
// parentWallet.addChildWallet('Bitcoin', bitcoinWallet);
// parentWallet.addChildWallet('Ethereum', ethereumWallet);
// parentWallet.addChildWallet('Polkadot', polkadotWallet);

// Define API endpoints

// Get balance endpoint
app.get('/api/:currency/balance/:address', async (req, res) => {
    const { currency, address } = req.params;
    try {
        const balance = await parentWallet.getBalance(currency, address);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Deposit endpoint
app.post('/api/:currency/deposit', async (req, res) => {
    const { currency, sender, recipient, amount } = req.body;
    try {
        await parentWallet.deposit(currency, sender, recipient, amount);
        res.json({ message: 'Deposit successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Withdraw endpoint
app.post('/api/:currency/withdraw', async (req, res) => {
    const { currency, sender, recipient, amount } = req.body;
    try {
        await parentWallet.withdraw(currency, sender, recipient, amount);
        res.json({ message: 'Withdrawal successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
