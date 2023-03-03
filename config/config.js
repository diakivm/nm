module.exports = {
    PORT: process.env.PORT || 80,
    MONGO_DB: process.env.MONGO_URL || 'mongodb://localhost:27017',
    CORS_DOMAINS: process.env.CORS_DOMAINS || "",
    ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
    BLOCKS_COUNT_ON_INIT: +process.env.BLOCKS_COUNT_ON_INIT || 100,
    SLEEP_TIME_ON_LOAD_BLOCKS: +process.env.SLEEP_TIME_ON_LOAD_BLOCKS || 3000,
};
