'use strict';
let Transaction = require('./src/transaction');
let Blockchain = require('./src/blockchain');

let demoChain = new Blockchain();



demoChain.createTransaction(new Transaction('sunil', 'rajdip', 5000, Date.now()));
demoChain.createTransaction(new Transaction('sunil', 'sakabda', 2000, Date.now()));
demoChain.createTransaction(new Transaction('sakabda', 'rajdip', 1000, Date.now()));




// console.log('\nMiner Started');
demoChain.minePendingTransactions('miner');


console.log('\nRajdip\'s Balance: ' + demoChain.getBalanceOfAnAddress('rajdip'));
console.log('\nSunil\'s Balance: ' + demoChain.getBalanceOfAnAddress('sunil'));
console.log('\nSakabda\'s Balance: ' + demoChain.getBalanceOfAnAddress('sakabda'));

// demoChain.minePendingTransactions('another-miner');
// console.log('\nMiner\'s Balance: ' + demoChain.getBalanceOfAnAddress('miner'));

console.log('Is valid? ', demoChain.isValidChain());
console.log(JSON.stringify(demoChain, null, 4));