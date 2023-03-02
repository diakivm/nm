const dotenv = require('dotenv');
const experess = require('express');
const cors = require("cors")
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: path.join(process.cwd(), '.env') });

const { MONGO_DB, PORT, CORS_DOMAINS} = require('./config/config');

const app = experess();

_connectDb();

const { apiRouter } = require('./router');
const { blockService } = require("./service");

app.use(fileUpload());
app.use(experess.json());
app.use(experess.urlencoded({ extended: true }));

const domainsFromEnv = CORS_DOMAINS

const whitelist = domainsFromEnv.split(",").map(item => item.trim())

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            code: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(PORT, () => console.log('Server work'));

 function _connectDb() {
    mongoose.connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {

        blockService.initDBWithBlockTransactions()

        const { connection } = mongoose;

        connection.on('error', (err) => console.log(err));
    }).catch((err) => console.log('Error during connect to db', err))
}
