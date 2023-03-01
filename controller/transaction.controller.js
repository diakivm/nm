const { transactionService } = require('../service');
const {getTransactionsValidator} = require("../validators/transaction");
const {errorCodesEnum} = require("../constans");

module.exports = {
    getTransactions: async (req, res) => {
        try {
            const filter = getTransactionsValidator.validate(req.query);
            if(filter.error){
                res.status(errorCodesEnum.UNPROCESSABLE_ENTITY).json({ error: filter.error.message });
            }

            const transactions = await transactionService.getTransactions(filter.value);

            res.json(transactions);
        } catch (err) {
            res.status(errorCodesEnum.BAD_REQUEST).json({ error: err.message });
        }
    },
};
