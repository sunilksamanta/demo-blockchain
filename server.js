'use strict';
const sha256 = require('crypto-js/sha256');

class Block {
    constructor(position, data, previousHash = ''){
        this.position = position;
        this.timestamp = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
        this.randomDependency = 0;
    }

    calculateHash(){
        return sha256(JSON.stringify(this.data) + this.position.toString() + this.timestamp.toString() + this.previousHash.toString() + this.randomDependency).toString();
    }

    mineBlock(difficulty){
        let startTime = new Date();
        console.log('Block Mining Started for ' + this.position + '\n');
        let count = 0;
        while(this.hash.substr(0, difficulty) !== Array(difficulty + 1).join("0")){
            this.randomDependency++;
            count++;
            this.hash = this.calculateHash();
        }
        console.log('Block Mined! :\nHash: ' + this.hash + '\nIteration: ' + count + '\nETA: ' + (new Date() - startTime) + 'ms\n');
        console.log('----------------------------------------------------------');
    }
    
}



class Blockchain {
    constructor(){
        this.chain =[Blockchain.createGenesisBlockForChain()];
        this.difficulty = 5;
    }

    static createGenesisBlockForChain(){
        return new Block(0, {sender_id: null, recipient_id: null, amount: 0}, 0);
    }

    getLastBlockFromChain(){
        return this.chain[this.chain.length - 1];
    }

    addBlockToChain(newBlock){
        newBlock.previousHash = this.getLastBlockFromChain().hash;
        newBlock.mineBlock(this.difficulty);
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