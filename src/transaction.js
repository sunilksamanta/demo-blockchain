class Transaction {
    constructor(fromAddress, toAddress, amount, timestamp) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = timestamp;
    }
}

module.exports = Transaction;