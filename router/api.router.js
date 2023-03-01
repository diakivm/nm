const router = require('express').Router();

const transactionRouter = require('./transaction.router');

router.use('/transaction', transactionRouter);

module.exports = router;
