// // server file

const express = require('express')
const app = express()
const port = 3000;

const cors = require('cors');

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

app.use(cors());

// // create an apiRouter
// const apiRouter = express.Router();

app.use(express.json());

// apiRouter.use(cors());

const {fetchAllAuthors} = require('../db/authors');

app.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});

// // const {createDatabase} = require('../db/index.js')

// // client.connect();

// app.listen();

app.get('/api/health', async (request, response, next) => {
    try {
        // console.log('here')
        // createDatabase();
        response.send('All good!')
    } catch (error) {
        console.log('there was an error in server health: ', error)
        throw error;
    }
});

app.get('/author/allauthors', async (request, response, next) => {
    try {
        console.log('yes here')
        const authors = await fetchAllAuthors();
        return authors;
    } catch (error) {
        console.log('there was an error at server author/allauthors: ', error);
        throw error;
    }
})

app.post('/submitnewstory', async (request, response, next) => {
    try {
        const {story} = request.body.story;
        const newStory = await newStory(story)
        if (newStory) {
            response.send(newStory).status(200);
        } else {
            response.send().status(500);
        }
    } catch (error) {
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
})
// module.exports = apiRouter;