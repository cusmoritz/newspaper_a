// server file

const express = require('express');
const cors = require('cors');
const path = require('path');

const server = express();
const port = 3001;

server.use(express.json());
server.use(cors());

//server.use(express.static(path.join(__dirname, 'build')));
// server.get("*", (req, res) => { 
// res.sendFile(path.join(__dirname, "build", "index.html")) });

server.use(express.static(path.join(__dirname, "public")));

const {client} = require('../db/index');
client.connect();

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});


const {fetchAllAuthors} = require('../db/authors');
const {createNewStory, fetchPage} = require('../db/story');

server.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});


/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

// server.get('/api/story/frontpage', async (request, response, next) => {
//     try {
//         // const pageNumber = request.params;
//         const frontPage = await fetchFrontPage();

//         if (frontPage) {
//             response.send(frontPage).status(200);
//         } else {
//             response.send({Error: "Problem fetching front page."}).status(500);
//         }
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// });

// server.get('/api/story/pageview/:storyId', async (request, response, next) => {
//     try {
//         const storyId = request.params;
//         const viewUpdate = await addPageView(storyId);
//         if (viewUpdate) {
//             response.send(viewUpdate).status(200);
//         } else {
//             response.send({"Error": "Could not update page views"}).status(500);
//         };
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// })

// server.get('/api/:tag/:pageNumber', async (request, response, next) => {
//     try {
//            const {rows: storyResults} = await fetchStorysForTagAndPage(tag, page);
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// });

// What does the api structure look like?

    // taken from another local news site:
    // /news/:tag (ex. copper-county, /news/regional, /news/sports ...)
    
    // and then pagination? 
    // /news/:tag/:pageNumber /news/:tag/:page2 ... ??

    // "front page" should probably look different, 
    // ex top 10 most recent stories, top 10 most popular?


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

 server.get('/api/admin/author/allauthors', async (request, response, next) => {
     try {
         const authors = await fetchAllAuthors();
         response.send(authors).status(200);
     } catch (error) {
         console.log('there was an error at server author/allauthors: ', error);
         throw error;
     }
 });

// server.get('/api/admin/story/stats/allstorystats', async (request, response, next) => {
//     try {
//         const everyStat = await fetchEveryStoryStat();
//         response.send(everyStat);
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// });

server.post('/api/admin/story/submitnewstory', async (request, response, next) => {
    try {
        const {story} = request.body;
        console.log('story in api', story)
        const newStory = await createNewStory(story)
        if (newStory) {
            response.send(newStory).status(200);
        } else {
            response.send().status(500);
        }
    } catch (error) {
        //logEverything(error);
        throw error;
    }
});

// server.post('/api/admin/story/checkslug', async (request, response, next) => {
//     try {
//         const {checkSlug} = request.body.slug;

//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }    

// })

// server.get('/api/admin/story/everystory', async (request, response, next) => {
//     try {
//         const allStorys = await returnEveryStoryAdmin();
//         response.send(allStorys); 
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// });

// server.get('/api/admin/story/stats/:storyId', async (request, response, next) => {
//     try {
//         const id = request.params;
//         const storyStats = await oneStoryStats(id);
//         response.send(storyStats).status(200);
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// });



server.get('/api/health', async (request, response, next) => {
    try {
        // console.log('here')
        // createDatabase();
        response.send('All good!')
    } catch (error) {
        console.log('there was an error in server health: ', error)
        throw error;
    }
});








module.exports = server;