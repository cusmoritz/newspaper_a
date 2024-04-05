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


const {fetchAllAuthors, fetchStoriesByAuthorId} = require('../db/authors');
const {createNewStory, fetchFrontPage, retreiveTags, fetchStoriesFromTag, fetchAllPrimaryCatagories, fetchSecondaryCatsForPrimary, fetchAllPrimaryAndSecondary, fetchStoriesByPrimaryCatagory, fetchStoriesBySecondaryCatagory} = require('../db/story');
// const { fetchStoriesByAuthorId } = require('../src/api');

server.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});


/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

server.get('/api/story/frontpage', async (request, response, next) => {
    try {
        // const pageNumber = request.params;
        const frontPage = await fetchFrontPage();
        if (frontPage) {
          response.status(200).send(frontPage);
        } else {
          response.status(500).send({Error: "There was a problem fetching the front page"});
        }

    } catch (error) {
        //logEverything(error);
        console.log('there was an error fetching the front page.')
        throw error;
    }
});

server.get('/api/all-catagories', async (request, response, next) => {
  try {
    const primaryCats = await fetchAllPrimaryCatagories()

    for await (let primaryCat of primaryCats) {
      const secondaryArr = await fetchSecondaryCatsForPrimary(primaryCat.primary_catagory_id);
      primaryCat.secondary = secondaryArr;
    }

    if (primaryCats) {
      response.status(200).send(primaryCats);
    } else  {
      response.status(500).send({Error: "There was a problem fetching all primary catagories."});
    }
  } catch (error) {
    console.log('error fetching all catagories');
    throw error;
  }
});

server.get('/api/catagories/:primary/:secondary', async (request, response, next) => {
  try {
    const {primary} = request.params;
    const {secondary} = request.params;
    const secondaryStories = await fetchStoriesBySecondaryCatagory(primary, secondary);
    if (secondaryStories) {
      response.send(secondaryStories).status(200);
    } else {
      response.send({Error: "There was a problem getting stories from this subcatagory"}).status(500);
    }
  } catch (error) {
    console.log('there was a server error fetching stories for subcatagory');
    throw error;
  }
})

server.get('/api/catagories/:catagory', async (request, response, next) => {
  try {
    const {catagory} = request.params;
    const catagoryStorys = await fetchStoriesByPrimaryCatagory(catagory);
    if (catagoryStorys) {
      response.send(catagoryStorys).status(200);
    } else {
      response.send({Error: "There was a problem getting stories from this catagory"}).status(500);
    }
  } catch (error) {
    console.log(`error in server fetching stories for this catagory`);
    throw error;
  }
});

server.get('/api/search/tag/:tag', async (request, response, next) => {
  try {
    const { tag } = request.params;
    const searchResults = await fetchStoriesFromTag(tag);
    if (searchResults) {
      response.send(searchResults).status(200);
    } else {
      response.send({Error: "There was a problem getting stories from this tag search"}).status(500);
    }
  } catch (error) {
    console.log('there was an error getting stories by tag.');
    throw error;
  }
});

server.get('/api/search/author/:authorId', async (request, response, next) => {
  try {
    const { authorId } = request.params;
    console.log('authorId in api', authorId);
    const searchResults = await fetchStoriesByAuthorId(authorId);
    if (searchResults) {
      response.send(searchResults).status(200);
    } else {
      response.send({Error: "There was a problem fetching stories by this author."});
    }
  } catch (error) {
    console.log('there was an error fetching author stories in the api');
    throw error;
  }
})

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
        if (story) {
          const newStory = await createNewStory(story);
          if (newStory) {
            response.send(newStory).status(200);
        } else {
            response.send().status(500);
        }
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