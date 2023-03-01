const axios = require("axios");

const { Transaction } = require("../db/model");
const { blockService } = require("./index");
const { sleep } = require("../helpers");

module.exports = {

    getTransactions: async () => {
        const url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true&apikey=${process.env.ETHERSCAN_API_KEY}`;

        try {
            const response = await axios.get(url);

            if (response.status === 200) {
                const blockNumber = parseInt(response.data.result.number, 16);

                const block = await blockService.getBlock(blockNumber);

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

                console.log(`Fetched ${transactions.length} transactions from block ${blockNumber}`);
            }
        } catch (error) {
            console.error(error);
        }

        await sleep(1000); // Wait for 1 second
        await this.getTransactions(); // Fetch transactions again
    },

};
