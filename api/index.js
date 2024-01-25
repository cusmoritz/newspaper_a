// server file

const {client} = require('../db/index');
const express = require('express');
const cors = require('cors');

// create an apiRouter
const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.use(cors());

apiRouter.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});

// const {createDatabase} = require('../db/index.js')

client.connect();

apiRouter.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});

apiRouter.get('/health', async (request, response, next) => {
    try {
        // console.log('here')
        // createDatabase();
        response.send('All good!')
    } catch (error) {
        console.log('there was an error in health server', error)
        throw error;
    }
});

module.exports = apiRouter;