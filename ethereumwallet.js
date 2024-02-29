require('dotenv').config();
const { Web3 } = require('web3');
const { Contract } = require('web3-eth-contract');

const node = 'https://go.getblock.io/0c7b4bcabe47451da043deb873a255db';
const web3 = new Web3(node);

const accounts = web3.eth.accounts.create();
const random_address = accounts.address;

const contractABI = require('./ContractABI.json');

const contractAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function depositEther(amount, toAddress) {
  try {
    const balance = await web3.eth.getBalance(fromAddress);

    if (web3.utils.fromWei(balance, 'ether') < amount) {
      console.error('Error: Insufficient ether to deposit.');
      return;
    }

    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const accounts = await web3.eth.getAccounts();

    const tx = await contract.methods.deposit(amountInWei, toAddress).send({ from: fromAddress, value: amountInWei });
    console.log('Transaction hash:', tx.transactionHash);
    console.log('Deposited', amount, 'ETH to', toAddress);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function withdrawEther(amount, fromAddress) {
  try {
    const balance = await web3.eth.getBalance(fromAddress);

    if (web3.utils.fromWei(balance, 'ether') < amount) {
      console.error('Error: Insufficient ether to withdraw.');
      return;
    }

    const amountInWei = web3.utils.toWei(amount.toString(), 'ether');

    const tx = await contract.methods.withdraw(amountInWei, fromAddress).send({ from: fromAddress });
    console.log('Transaction hash:', tx.transactionHash);
    console.log('Withdrawn', amount, 'ETH from', fromAddress);
  } catch (error) {
    console.error('Error:', error);
  }
}

const amountToDeposit = 1;
const amountToWithdraw = 0.5;
const fromAddress = '0xC67c60cD6d82Fcb2fC6a9a58eA62F80443E32683';

// Interact with the contract
depositEther(amountToDeposit, random_address);

withdrawEther(amountToWithdraw, fromAddress);
