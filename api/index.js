// server file

const express = require('express');
const cors = require('cors');
// const path = require('path');

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());

// server.use(express.static(path.join(__dirname, 'build')));
// server.get("*", (req, res) => { 
// res.sendFile(path.join(__dirname, "build", "index.html")) });

const {client} = require('../db/index');
client.connect();

server.listen(port, () => {
  console.log(`listening on port ${port}`);
})

const {fetchAllAuthors} = require('../db/authors');

server.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});

// server.get('/api/health', async (request, response, next) => {
//     try {
//         // console.log('here')
//         // createDatabase();
//         response.send('All good!')
//     } catch (error) {
//         console.log('there was an error in server health: ', error)
//         throw error;
//     }
// });

server.get('/api/author/allauthors', async (request, response, next) => {
    try {
        console.log('yes here')
        const authors = await fetchAllAuthors();
        response.send(authors)
    } catch (error) {
        console.log('there was an error at server author/allauthors: ', error);
        throw error;
    }
});

server.get('/api/story/stats/allstorystats', async (request, response, next) => {
    try {
        const everyStat = await fetchEveryStoryStat();
        response.send(everyStat);
    } catch (error) {
        logEverything(error);
        throw error;
    }
});

server.get('/api/story/stats/:storyId', async (request, response, next) => {
    try {
        
    } catch (error) {
        logEverything(error);
        throw error;
    }
})

// server.post('/story/submitnewstory', async (request, response, next) => {
//     try {
//         const {story} = request.body.story;
//         const newStory = await newStory(story)
//         if (newStory) {
//             response.send(newStory).status(200);
//         } else {
//             response.send().status(500);
//         }
//     } catch (error) {
//         console.log('there was an error submitting a new story: ', error);
//         throw error;
//     }
// })

module.exports = server;