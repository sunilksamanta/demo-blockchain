const sha256 = require('crypto-js/sha256');
class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = '';
        this.randomDependency = 0;
    }

    calculateHash() {
        return sha256(JSON.stringify(this.transactions) + this.timestamp.toString() + this.previousHash.toString() + this.randomDependency).toString();
    }

    mineBlock(difficulty) {
        let startTime = new Date();
        console.log('Block Mining Started ...\n');
        let count = 0;
        while (this.hash.substr(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.randomDependency++;
            count++;
            this.hash = this.calculateHash();
        }
        console.log('Block Mined! :\nHash: ' + this.hash + '\nIteration: ' + count + '\nETA: ' + (new Date() - startTime) + 'ms\n');
        console.log('----------------------------------------------------------');
    }

}

module.exports = Block;