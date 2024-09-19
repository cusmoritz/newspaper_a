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


const {fetchAllAuthors, fetchStoriesByAuthorId, createAuthor, editAuthorProfile} = require('../db/authors');
const {createNewStory, fetchTenStoriesForFrontPage, retreiveTags, fetchStoriesFromTag, fetchAllPrimaryCategories, fetchSecondaryCatsForPrimary, fetchAllPrimaryAndSecondary, fetchStoriesByPrimaryCategory, fetchStoriesBySecondaryCategory, fetchSinglePageStory, addPageView} = require('../db/story');
const {createNewSource, getOneSource, getAllSources, updateSourceContactDate, updateSourcePhoneNumber, updateSourceOccupation, updateSourceElectedOfficial, getStorysForSingleSource} = require ('../db/sources');
const {createNewResource, fetchAllFrontEndResources, fetchAllAdminResources} = require ('../db/resources');
const { useParams } = require('react-router-dom');

server.use((request, response, next) => {
    console.log('request.method: ', request.method);
    console.log('request.url: ', request.url);
    // response.send('Hello!');
    next();
});


/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

server.get(`/api/story/frontpage/:pageNo`, async (request, response, next) => {
    try {
        const {pageNo} = request.params;
        const frontPage = await fetchTenStoriesForFrontPage(pageNo);
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

server.get('/api/admin/all-resources', async (request, response, next) => {
  try {
    const resources = await fetchAllAdminResources();
    if (resources) {
      response.status(200).send(resources)
    } else {
      response.status(500).send({Error: "There was a database error fetching all admin resources."});
    }
  } catch (error) {
    console.log('there was a server error fetching all admin resources');
    throw error;
  }
})

server.get('/api/resources', async (request, response, next) => {
  try {
    const resources = await fetchAllFrontEndResources();
    if (resources) {
      response.status(200).send(resources);
    } else {
      response.status(500).send({Error: "There was a database problem fetching all resources."});
    }
  } catch (error) {
    console.log('there was a server error fetching all resources');
    throw error;
  }
})

server.get('/api/story/:storyId', async (request, response, next) => {
  const {storyId} = request.params;
  try {
    
    const request = await fetchSinglePageStory(storyId);
    //console.log('server request', request)
    if (request) {
      response.status(200).send(request);
    } else {
      response.status(500).send({Error: "There was an error fetching that story."});
    }
  } catch (error) {
    console.log('there was a server error fetching that story.');
    throw error;
  }
});

server.get('/api/all-categories', async (request, response, next) => {
  try {
    const primaryCats = await fetchAllPrimaryCategories()

    for await (let primaryCat of primaryCats) {
      const secondaryArr = await fetchSecondaryCatsForPrimary(primaryCat.primary_category_id);
      primaryCat.secondary = secondaryArr;
    }

    if (primaryCats) {
      response.status(200).send(primaryCats);
    } else  {
      response.status(500).send({Error: "There was a problem fetching all primary categories."});
    }
  } catch (error) {
    console.log('error fetching all categories');
    throw error;
  }
});

server.get('/api/categories/:primary/:secondary', async (request, response, next) => {
  try {
    const {primary} = request.params;
    const {secondary} = request.params;
    const secondaryStories = await fetchStoriesBySecondaryCategory(primary, secondary);
    if (secondaryStories) {
      response.send(secondaryStories).status(200);
    } else {
      response.send({Error: "There was a problem getting stories from this subcategory"}).status(500);
    }
  } catch (error) {
    console.log('there was a server error fetching stories for subcategory');
    throw error;
  }
})

server.get('/api/categories/:category', async (request, response, next) => {
  try {
    const {category} = request.params;
    console.log('cat in server', category)
    const categoryStorys = await fetchStoriesByPrimaryCategory(category);
    if (categoryStorys) {
      response.send(categoryStorys).status(200);
    } else {
      response.send({Error: "There was a problem getting stories from this category"}).status(500);
    }
  } catch (error) {
    console.log(`error in server fetching stories for this category`);
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

server.put('/api/story/pageview/:storyId', async (request, response, next) => {
    try {
        const {storyId} = request.params;
        console.log('storyid', storyId)
        const viewUpdate = await addPageView(storyId);
        console.log('update server', viewUpdate)
        if (viewUpdate) {
          response.sendStatus(200);
        } else {
            response.send({Error: "Could not update page views"}).status(500);
        };
    } catch (error) {
        //logEverything(error);
        throw error;
    }
})

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

server.post('/api/admin/author/new', async (request, response, next) => {
  try {
    const {author} = request.body;
    if (author) {
      const newAuthor = await createAuthor(author);
      if (newAuthor) {
        response.status(200).send(newAuthor);
      } else {
        response.status(500).send({Error: "There was a database issue creating a new author."});
      }
    }
  } catch (error) {
    console.log('There was a server error creating a new author.');
    throw error;
  }
});

server.put('/api/admin/author/edit', async (request, response, next) => {
  try {
    const {author} = request.body;

    if (author) {
      const authorEdits = await editAuthorProfile(author);
      if (authorEdits) {
        response.status(200).send(authorEdits);
      } else {
        response.status(500).send({Error: "There was a database issue editing an author."});
      }
    }
  } catch (error) {
    console.log('There was a server error editing an author.');
    throw error;
  }
})

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

///////////////////// SOURCE FUNCTIONS ///////////////////////
server.post(`/api/admin/source/newsource`, async (request, response, next) => {
  try {
    const {sourceObj} = request.body;

    if (!sourceObj.sourceMostRecentContactDate) {
      let year = new Date().getFullYear().toString();
      let month = new Date().getMonth().toString();
      let day = new Date().getDate().toString();
      let dateString = `${year}-${month}-${day}`;
      sourceObj.sourceMostRecentContactDate = dateString;
    }
    if (!sourceObj.sourceOgContactDate) {
      let year = new Date().getFullYear().toString();
      let month = new Date().getMonth().toString();
      let day = new Date().getDate().toString();
      let dateString = `${year}-${month}-${day}`;
      sourceObj.sourceOgContactDate = dateString;
    }
    if (sourceObj) {
      const newSourceDb = await createNewSource(sourceObj);
      response.send(newSourceDb).status(200);
    } else {
      response.send().status(500);
    }
  } catch (error) {
    console.log('there was a server error creating a new source');
    throw error;
  }
});

server.get('/api/admin/sources/all', async (request, response, next) => {
  try {
    const currentSources = await getAllSources();
    if (currentSources) {
      // const newSourceDb = await createNewSource(sourceObj);
      response.send(currentSources).status(200);
    } else {
      response.send().status(500);
    }
  } catch (error) {
    console.log('there was a server error fetching all sources');
    throw error;
  }
});

server.get('/api/admin/sources/related-stories/:sourceId', async (request, response, next) => {
  try {
    let {sourceId} = request.params;

    const related = await getStorysForSingleSource(sourceId);
    if (related) {
      response.send(related).status(200);
    } else {
      response.send().status(500);
    }
  } catch (error) {
    console.log('there was a server error fetching stories for that source');
    throw error;
  }
})

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