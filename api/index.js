// server file

const express = require('express');
const cors = require('cors');

// create an apiRouter
const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.use(cors());

// apiRouter.use((request, response, next) => {
//     console.log('request.method: ', request.method);
//     console.log('request.url: ', request.url);
//     // response.send('Hello!');
//     next();
// });

// const {createDatabase} = require('../db/index.js')

client.connect();

apiRouter.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});