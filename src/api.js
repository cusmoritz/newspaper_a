// front-end server calls

const {REACT_APP_BASE_URL = 'http://localhost:3001'} = process.env; // wherever the db is hosted
const BASE_URL = REACT_APP_BASE_URL;


/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

export const fetchFrontPage = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/story/frontpage`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const frontPage = await request.json();
        return frontPage;
    } catch (error) {
        throw error;
    }
};

export const fetchFrontPageCatsSubcats = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/all-catagories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allCats = await request.json();
        return allCats;
    } catch (error) {
        console.log('there was an error fetching all catagories');
        throw error;
    }
};

export const fetchSinglePageStory = async (storyId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/story/${storyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const story = await request.json();
        console.log('story front', story)
        return story;
    } catch (error) {
        console.log('there was an error fetching that story.');
        throw error;
    }
}

export const fetchPrimaryCatStories = async (catagory) => {
    try {
        const request = await fetch(`${BASE_URL}/api/catagories/${catagory}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const catagoryStories = await request.json();
        return catagoryStories;
    } catch (error) {
        console.log(`there was an error fetching stories with catagory ${catagory}`);
        throw error;
    }
};

export const fetchSecondaryCatStories = async (primary, secondary) => {
    try {
        const request = await fetch(`${BASE_URL}/api/catagories/${primary}/${secondary}`, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        });
        const secondaryStories = await request.json();
        console.log('front here', secondaryStories)
        return secondaryStories;
    } catch (error) {
        console.log('there was an error fetching stories for those catagories');
        throw error;
    }
}

export const addPageView = async (storyId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/story/pageview/:storyId`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //const searchResults = await request.json();
        return searchResults;
    } catch (error) {
        throw error;
    }
};

export const fetchStoriesWithTag = async (tag) => {
    try {
        const request = await fetch(`${BASE_URL}/api/search/tag/${tag}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const searchResults = await request.json();
        return searchResults;
    } catch (error) {
        console.log('there was an error fetching stories by tag.');
        throw error;
    }
};

export const fetchStoriesByAuthorId = async (authorId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/search/author/${authorId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const results = request.json();
        return results;
    } catch (error) {
        console.log('there was an error fetching stories by this author');
        throw error;
    }
}


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

export const fetchAllAuthors = async () => {
    try {
        console.log('yup')
        const request = await fetch(`${BASE_URL}/api/admin/author/allauthors`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const allAuthors = await request.json();
        return allAuthors;
    } catch (error) {
        console.log('there was an error fetching all authors: ', error);
        throw error;
    }
};

export const submitNewStory = async (storyObj) => {
    try {
        console.log('story front end', storyObj)

        const request = await fetch(`${BASE_URL}/api/admin/story/submitnewstory`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                story: storyObj
            })
        });
        if (!request) {
            return error;
        } else {
            const response = request.json();
            return response;
        }
    } catch (error) {
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
};

export const submitNewAuthor = async (authorObj) => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/author/new`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: authorObj
            })
        });
        return request;
    } catch (error) {
        console.log('There was an error submitting a new author.');
        throw error;
    }
};

export const editAuthorProfile = async (authorObj) => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/author/edit`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                author: authorObj
            })
        })
        return request;
    } catch (error) {
        console.log('There was an error editing the author.');
        throw error;
    }
}

export const checkSlug = async (slug) => {
    try {
        const checkIt = await fetch(`${BASE_URL}/api/admin/story/checkslug`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slug: slug,
            })
        });
        return checkit;
    } catch (error) {
        throw error;
    }
}

export const fetchAllStoryStatsAdmin = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/story/everystory`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = request.json();
        return response;
    } catch (error) {
        throw error;
    }
}

export const fetchOneStoryStats = async(storyId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/story/stats/${storyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (request) {
            const response = request.json();
            return response;
        } else {
            return {error: "Unsuccesful fetch for story stats"};
        }
    } catch (error) {
        throw error;
    }
};





export const health = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/health`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.log('There was an error in health user', error);
        throw error;
    }
};





// export const fetchEveryStoryStats = async () => {
//     try {
//         const request = await fetch(`${BASE_URL}/api/story/stats/allstorystats`, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         if (request) {
//             return request;
//         } else {
//             return {error: "Unseccessful fetch for all story stats"};
//         }
//     } catch (error) {
//         throw error;
//     }
// }