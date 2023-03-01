const { transactionService } = require('../service');
const {getTransactionsValidator} = require("../validators/transaction");

module.exports = {
    getTransactions: async (req, res) => {
        try {
            const filter = getTransactionsValidator.validate(req.query);

            const transactions = await transactionService.getTransactions(filter);

            res.json(transactions);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
};
