require('dotenv').config();

const express = require ('express')
const app = express()
app.use(express.json())

app.use(express.urlencoded({extended: true}));

const router = require ('./routes/user')

const bodyParser = require('body-parser');
const path = require('path');
// const cors = require("cors");
// app.use(cors());

// const { requestLoggerMiddleware } = require('./helper/reqLogger');

// const winstonConfig = require('./config/winston-config');

//     let defaultLogger = winstonConfig.defaultLogger;

// app.use(cors({ credentials: true, origin: true }));

// app.use(requestLoggerMiddleware({ logger: console.log }));

// app.use((req, res, next) => {
//     defaultLogger.info('URL: ');
//     defaultLogger.info(req.originalUrl);
//     next();
//   });

// const logger = require('./helper/logger');

// app.use(logger.info);

    require('./loaders/routes')(app);

app.listen(3000, ()=>console.log("Server is running"))