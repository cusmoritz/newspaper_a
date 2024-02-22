// front-end server calls

const {REACT_APP_BASE_URL = 'http://localhost:3000'} = process.env; // wherever the db is hosted
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
        const frontPage = request.json();
        return frontPage;
    } catch (error) {
        throw error;
    }
}


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

export const fetchAllAuthors = async () => {
    try {
        console.log('yes')
        console.log('werewrewrew', process.env)
        const request = await fetch(`${BASE_URL}/api/admin/author/allauthors`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        console.log('request', request)
        const allAuthors = request.json();
        return allAuthors;
    } catch (error) {
        console.log('there was an error fetching all authors: ', error);
        throw error;
    }
};

export const submitNewStory = async (storyObj) => {
    try {

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
        cosnt request = await fetch(`${BASE_URL}/api/admin/story/stats/${storyId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (request) {
            const response = request.json();
            return response;
        } else {
            return {error: "Uncesesful fetch for story stats"};
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
        console.log('result 1', response)
        const result = await response.json();
        console.log('result 2', result)
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