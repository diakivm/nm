const axios = require("axios");

const { Transaction } = require("../db/model");
const { sleep } = require("../helpers");
const { TRANSACTIONS_COUNT_ON_INIT, SLEEP_TIME_ON_LOAD_TRANSACTIONS, ETHERSCAN_API_KEY } = require("../config/config");
const { GET_BY_BLOCK_NUMBER, BLOCK_NUMBER } = require("../constans/etherscan-actions.enum");

const initDBWithBlockTransactions = async () => {

    try {
        const countOfTransactionsInDb = await Transaction.countDocuments();
        if (countOfTransactionsInDb > 0) {
            return;
        }

        const latestBlockNumber = await getLatestBlockNumber();

        let blockNumber = latestBlockNumber - TRANSACTIONS_COUNT_ON_INIT;
        if (blockNumber < 0) {
            blockNumber = 0;
        }

        await setBlocksTransactionsInDB(blockNumber, latestBlockNumber)
    } catch (error) {
        console.error(error)
    }
}

const setBlocksTransactionsInDB = async (blockNumber, latestBlockNumber) => {
    try {
        if (blockNumber > latestBlockNumber) {
            return;
        }

        const block = await getBlockTransactions(`0x${blockNumber.toString(16)}`);

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
        await Transaction.updateMany({ blockNumber: { $lt: blockNumber }}, { $inc: { confirmations: 1 } });

        console.log(`Initialized ${ transactions.length } transactions from block ${ blockNumber }`);
    } catch (error) {
        console.error(error)
    } finally {
        await sleep(SLEEP_TIME_ON_LOAD_TRANSACTIONS);
        return setBlocksTransactionsInDB(++blockNumber, latestBlockNumber)
    }
}

const getLatestBlockNumber = async () => {
    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'proxy',
                action: BLOCK_NUMBER,
                apikey: ETHERSCAN_API_KEY
            }
        });

        return parseInt(response.data.result, 16);
    } catch (error) {
        console.error(error);
    }
}

const getBlockTransactions = async (blockNumber) => {
    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'proxy',
                action: GET_BY_BLOCK_NUMBER,
                tag: blockNumber,
                boolean: true,
                apikey: ETHERSCAN_API_KEY
            }
        });

        return {
            number: parseInt(response.data.result.number, 16),
            timestamp: parseInt(response.data.result.timestamp, 16),
            transactions: response.data.result.transactions,
        };
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    initDBWithBlockTransactions
}
