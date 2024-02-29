const { ApiPromise, WsProvider, Keyring } = require('@polkadot/api');

class PolkadotWallet {
    constructor() {
        this.api = null;
        this.provider = new WsProvider('wss://rpc.polkadot.io');
        this.keyring = new Keyring({ type: 'sr25519' }); // for creating accounts
    }

    async connect() {
        this.api = await ApiPromise.create({ provider: this.provider });
    }

    async getBalance(accountAddress) {
        try {
            const { data: { free: balance } } = await this.api.query.system.account(accountAddress);
            return balance.toString();
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }

    async deposit(sender, recipient, amount) {
        try {
            const transfer = this.api.tx.balances.transfer(recipient, amount);
            const hash = await transfer.signAndSend(sender);
            console.log('Deposit transfer hash:', hash.toHex());
            return hash.toHex();
        } catch (error) {
            console.error('Error sending deposit transaction:', error);
        }
    }

    async withdraw(sender, recipient, amount) {
        try {
            const transfer = this.api.tx.balances.transfer(recipient, amount);
            const hash = await transfer.signAndSend(sender);
            console.log('Withdrawal transfer hash:', hash.toHex());
            return hash.toHex();
        } catch (error) {
            console.error('Error sending withdrawal transaction:', error);
        }
    }
}

// Example usage:
async function testPolkadotWallet() {
    const wallet = new PolkadotWallet();
    await wallet.connect();

    // Example account addresses
    const sender = wallet.keyring.addFromUri('//Alice', { name: 'Alice' }); // Replace with sender's account
    const recipient = 'recipient_address'; // Replace with recipient's account

    // Get sender's balance
    const balanceBefore = await wallet.getBalance(sender.address);
    console.log(`Sender's balance before deposit: ${balanceBefore}`);

    // Perform deposit
    const depositAmount = 1000000000000; // 1 unit = 10^12 Plancks (lowest denomination)
    await wallet.deposit(sender, recipient, depositAmount);

    // Get sender's balance after deposit
    const balanceAfterDeposit = await wallet.getBalance(sender.address);
    console.log(`Sender's balance after deposit: ${balanceAfterDeposit}`);

    // Perform withdrawal
    const withdrawAmount = 500000000000; // Withdraw 0.5 unit
    await wallet.withdraw(sender, recipient, withdrawAmount);

    // Get sender's balance after withdrawal
    const balanceAfterWithdrawal = await wallet.getBalance(sender.address);
    console.log(`Sender's balance after withdrawal: ${balanceAfterWithdrawal}`);
}

testPolkadotWallet();
