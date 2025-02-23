// front-end server calls

const {REACT_APP_BASE_URL = 'http://localhost:3001'} = process.env; // wherever the db is hosted
const BASE_URL = REACT_APP_BASE_URL;


/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

export let globalBreakingBoolAPI = false;
export let globalBreakingStoryObj = {};

export const globalBreakingFlip = (breakingBool) => {
    globalBreakingBoolAPI = breakingBool;
    return globalBreakingBoolAPI;
}
// might need to rethink how breaking news would work.
// create story with breaking news,
// flips a flag in the database, so it's not dependant on the story itself?
// then tie the breaking flag to the story? 
// that would fix it being outside the top 10 stories as well

export const fetchTenMostRecent = async (pageNo) => {
    try {
        console.log('pageno api', pageNo)
        const request = await fetch(`${BASE_URL}/api/story/frontpage/${pageNo}`, {
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
        const request = await fetch(`${BASE_URL}/api/all-categories`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allCats = await request.json();
        return allCats;
    } catch (error) {
        console.log('there was an error fetching all categories');
        throw error;
    }
};

export const fetchFrontEndResources = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/resources`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allResources = await request.json();
        return allResources;
    } catch (error) {
        console.log('there was client side server error fetching all resources');
        throw error;
    }
}

export const fetchSinglePageStory = async (storyId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/story/${storyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const story = await request.json();
        // console.log('story front', story)
        return story;
    } catch (error) {
        console.log('there was an error fetching that story.');
        throw error;
    }
}

export const fetchPrimaryCatStories = async (category) => {
    try {
        const request = await fetch(`${BASE_URL}/api/categories/${category}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const categoryStories = await request.json();
        return categoryStories;
    } catch (error) {
        console.log(`there was an error fetching stories with category ${category}`);
        throw error;
    }
};

export const fetchSecondaryCatStories = async (primary, secondary) => {
    try {
        const request = await fetch(`${BASE_URL}/api/categories/${primary}/${secondary}`, {
            method: "GET",
            header: {
                'Content-Type': 'application/json'
            }
        });
        const secondaryStories = await request.json();
        console.log('front here', secondaryStories)
        return secondaryStories;
    } catch (error) {
        console.log('there was an error fetching stories for those categories');
        throw error;
    }
};

export const addPageView = async (storyId) => {
    try {
        await fetch(`${BASE_URL}/api/story/pageview/${storyId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //const searchResults = await request.json();
        return; // there is nothing to return
    } catch (error) {
        console.log('there was a client side error updating pageviews.')
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
        const request = await fetch(`${BASE_URL}/api/search/author/stories/${authorId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const results = await request.json();
        //console.log('client results', results)
        return results;
    } catch (error) {
        console.log('there was an error fetching stories by this author');
        throw error;
    }
}


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

export const getPageViewsForOneStoryOneDay = async (storyId, date) => {
    //console.log('client server', storyId, date)
    try {
        const request = await fetch(`${BASE_URL}/api/admin/page-views/${storyId}/${date}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const results = await request.json();
        return results;
    } catch (error) {
        console.log(`there was a client api error in getAdminPageViews seraching for story id ${storyId}`);
        throw error;
    }
}

export const fetchAllResourcesAdmin = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/all-resources`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const allResources = await request.json();
        return allResources;
    } catch (error) {
        console.log('there was a client side error fetching all admin resources');
        throw error;
    }
};

export const newResourceSubmit = async (newResourceObj) => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/new-resource`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newResourceObj
            })
        })
        let newResource = await request.json();
        return newResource;
    } catch (error) {
        console.log('there was a client side error submitting a new resource');
        throw error;
    }
}

export const sendEditedResource = async (editedResourceObj) => {
    try {
        const posting = await fetch(`${BASE_URL}/api/admin/edit-resource`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                editedResource: editedResourceObj
            })
        });
        const editingConfirm = await posting.json();
        return editingConfirm;
    } catch (error) {
        console.log('there was a client error submitting an edited resource');
        throw error;
    }
}

///////////////////// SEARCH API FUNCTIONS /////////////////////

export const searchStoriesByDate = async (dateString) => {
    try {
        const fetching = await fetch(`${BASE_URL}/api/admin/search/${dateString}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const storiesReturn = await fetching.json();
        return storiesReturn;
    } catch (error) {
        console.log('there was a client side error searching stories');
        throw error;
    }
};

export const searchStoriesByDateRange = async (startDate, endDate) => {
    try {
        const fetching = await fetch(`${BASE_URL}/api/admin/search/range/${startDate}/${endDate}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const returnStories = fetching.json();
        return returnStories;
    } catch (error) {
        console.log('there was a client-side error searching by date range');
        throw error;
    }
}

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

export const submitNewStoryPhotos = async (imageArr) => {
    try {
        console.log('image arry client side: ', imageArr);
        console.log('image as Json : ', JSON.stringify({imageArr}))

        const request = await fetch(`${BASE_URL}/api/admin/images/upload`, {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: JSON.stringify({
                imageArr: imageArr
            })
        });
        if (!request) {
            return error;
        } else {
            const response = request.json();
            return response;
        }
    } catch (error) {
        console.log('there was a client-side error uploading new story images');
        throw error;
    }
}

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

export const fetchOneAuthorById = async(authorId) => {
    try {
        const request = fetch(`${BASE_URL}/api/search/author/:id`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const author = await request.json();
        return author;
    } catch (error) {
        console.log('there was a client error fetching an author by Id');
        throw error;
    }
}

//////////////////////// ADMIN SOURCE FUNCTIONS ///////////////

export const submitNewSource = async (newSource) => {
    console.log('new source', newSource)
    try {
        const request = await fetch(`${BASE_URL}/api/admin/source/newsource`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sourceObj: newSource,
            })
        });
        return request;
    } catch (error) {
        console.log('there was a client error submitting a new source');
        throw error;
    };
};

export const fetchCurrentSources = async () => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/sources/all`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const sources = await request.json();
        return sources;
    } catch (error) {
        console.log('there was a client error fetching current sources');
        throw error;
    }
};

export const getStorysForOneSource = async (sourceId) => {
    try {
        const request = await fetch(`${BASE_URL}/api/admin/sources/related-stories/${sourceId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const relatedStorys = await request.json();

        return relatedStorys;
    } catch (error) {
        console.log('there was a client error fetching stories for that source.');
        throw error;
    }
}




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