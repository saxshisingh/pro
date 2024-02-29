// Import necessary child wallet classes
const BitcoinWallet = require('./bitcoinWallet');
const EthereumWallet = require('./ethereumwallet');
const PolkadotWallet = require('./polkadotwallet');
const TetherWallet = require('./tetherWallet');
const BinanceCoinWallet = require('./Binancecoinwallet');
const TronWallet = require('./tronwallet').default;
const LitecoinWallet = require('./litecoiwallet');
const DogecoinWallet = require('./dogecoinwallet');
const PolygonWallet = require('./polygonwallet');
const ChainlinkWallet = require('./chainlinkwallet');

// Define the ParentWallet class
class ParentWallet {
    constructor() {
        this.currencies = {}; // Object to store child wallets
    }

    // Method to add a child wallet for a specific cryptocurrency
    addChildWallet(currency, wallet) {
        this.currencies[currency] = wallet;
    }

    // Method to get a child wallet for a specific cryptocurrency
    getChildWallet(currency) {
        return this.currencies[currency];
    }

    async getBalance(currency, address) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.getBalance(address);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }

    async deposit(currency, sender, recipient, amount) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.deposit(sender, recipient, amount);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }

    async withdraw(currency, sender, recipient, amount) {
        const wallet = this.getChildWallet(currency);
        if (wallet) {
            return wallet.withdraw(sender, recipient, amount);
        } else {
            throw new Error(`Wallet for ${currency} not found.`);
        }
    }
}

// Example usage:
async function testParentWallet() {
    // Create a parent wallet
    const parentWallet = new ParentWallet();

    // Create and add child wallets for different cryptocurrencies
    const bitcoinWallet = new BitcoinWallet();
    const ethereumWallet = new EthereumWallet();
    const polkadotWallet = new PolkadotWallet();

    parentWallet.addChildWallet('Bitcoin', bitcoinWallet);
    parentWallet.addChildWallet('Ethereum', ethereumWallet);
    parentWallet.addChildWallet('Polkadot', polkadotWallet);

    const binanceCoinWallet = new BinanceCoinWallet();
    parentWallet.addChildWallet('BinanceCoin',binanceCoinWallet);

    const chainLinkIntegration = new ChainlinkIntegration();
    parentWallet.addChildWallet('ChainLink',chainLinkIntegration);

    const dogecoinWallet = new DogecoinWallet();
    parentWallet.addChildWallet('DogeCoin',dogecoinWallet);

    const liteCoinWallet = new LitecoinWallet();
    parentWallet.addChildWallet('LiteCoin',liteCoinWallet);

    const polygonWallet =new PolygonWallet();
    parentWallet.addChildWallet('Polygon',polygonWallet);

    const tetherWallet = new TetherWallet();
    parentWallet.addChildWallet('Tether',tetherWallet);

    const tronWallet = new TronWallet();
    parentWallet.addChildWallet('Tron',tronWallet);

    // Example usage of the parent wallet
    const bitcoinChildWallet = parentWallet.getChildWallet('Bitcoin');
    console.log('Bitcoin Child Wallet:', bitcoinChildWallet);

    // Perform operations with the child wallets as needed
}

testParentWallet();

