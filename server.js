'use strict';
const sha256 = require('crypto-js/sha256');

class Block {
    constructor(position, data, previousHash = ''){
        this.position = position;
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
    }

    calculateHash(){
        return sha256(JSON.stringify(this.data) + this.position.toString() + this.timestamp.toString() + this.previousHash.toString()).toString();
    }
    
}



class Blockchain {
    constructor(){
        this.chain =[Blockchain.createGenesisBlockForChain()];
    }

    static createGenesisBlockForChain(){
        return new Block(0, {sender_id: null, recipient_id: null, amount: 0}, 0);
    }

    getLastBlockFromChain(){
        return this.chain[this.chain.length - 1];
    }

    addBlockToChain(newBlock){
        newBlock.previousHash = this.getLastBlockFromChain().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isValidChain(){
        for(let i = 1 ; i < this.chain.length ; i++ ){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let demoChain = new Blockchain();
demoChain.addBlockToChain(new Block(1, {sender_id: 1, recipient_id: 2, amount: 10}));
demoChain.addBlockToChain(new Block(2, {sender_id: 1, recipient_id: 3, amount: 100}));
demoChain.addBlockToChain(new Block(3, {sender_id: 2, recipient_id: 3, amount: 50}));
demoChain.addBlockToChain(new Block(4, {sender_id: 3, recipient_id: 4, amount: 30}));

console.log('Is valid? ', demoChain.isValidChain());
console.log(JSON.stringify(demoChain, null, 4));
demoChain.chain[2].data.amount = 10000;
console.log(JSON.stringify(demoChain, null, 4));
console.log('Is valid? ', demoChain.isValidChain());