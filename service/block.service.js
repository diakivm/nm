const axios = require("axios");
const {Transaction} = require("../db/model");

const initDBWithTransactions = async () => {
    const latestBlockNumber = await getLatestBlockNumber();

    let blockNumber = latestBlockNumber - 1000;
    if (blockNumber < 0) {
        blockNumber = 0;
    }

    while (blockNumber <= latestBlockNumber) {
        const block = await getBlock(blockNumber);

        const transactions = block.transactions.map((tx) => {
            return {
                hash: tx.hash,
                blockNumber,
                from: tx.from,
                to: tx.to,
                value: parseInt(tx.value, 16),
                timestamp: block.timestamp,
            };
        });

        await Transaction.insertMany(transactions);

        console.log(`Initialized ${transactions.length} transactions from block ${blockNumber}`);

        blockNumber++;
    }
}

const getBlock = async (blockNumber) => {
    console.log(blockNumber)
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${process.env.ETHERSCAN_API_KEY}`;

    const response = await axios.get(url);

    return {
        number: parseInt(response.data.result.number, 16),
        timestamp: parseInt(response.data.result.timestamp, 16),
        transactions: response.data.result.transactions,
    };
}

const getLatestBlockNumber = async () => {
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${process.env.ETHERSCAN_API_KEY}`;

    const response = await axios.get(url);

    return parseInt(response.data.result, 16);
}

module.exports = {
    initDBWithTransactions
}
