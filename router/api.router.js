const router = require('express').Router();

const transactionRouter = require('./transaction.router');

router.use('/transactions', transactionRouter);

module.exports = router;
