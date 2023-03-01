const router = require('express').Router();

const { transactionController } = require('../controller');

router.get('/', transactionController.getTransactions);

module.exports = router;
