const { transactionService } = require('../service');

module.exports = {
    getTransactions: async (req, res) => {
        try {
            const data = await transactionService.getTransactions();

            res.json(data);
        } catch (e) {
            res.status(400).json(e.message);
        }
    },
};
