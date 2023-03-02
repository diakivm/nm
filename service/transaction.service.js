const axios = require("axios");

const { Transaction } = require("../db/model");

module.exports = {

    getTransactions: async (queryFilters) => {
        const {
            fromAddress,
            toAddress,
            id,
            blockNumber,
            page = 1,
            limit = 10,
        } = queryFilters;

        const filters = {
            ...(fromAddress && { from: fromAddress }),
            ...(toAddress && { to: toAddress }),
            ...(id && { _id: id }),
            ...(blockNumber && { blockNumber })
        };


        const totalCount = await Transaction.find(filters).countDocuments();
        const totalPages = Math.ceil(totalCount / limit);

        const list = await Transaction.find(filters)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec()

        return {
            totalCount,
            totalPages,
            list,
        };
    },

};
