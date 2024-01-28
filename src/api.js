// front-end server calls

const {REACT_APP_BASE_URL = 'http://localhost:3000'} = process.env; // wherever the db is hosted
const BASE_URL = REACT_APP_BASE_URL;

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
}

export const fetchAllAuthors = async () => {
    try {
        console.log('yes')
        const request = await fetch(`${BASE_URL}/api/author/allauthors`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const allAuthors = request.json();
        return allAuthors;
    } catch (error) {
        console.log('there was an error fetching all authors: ', error);
        throw error;
    }
}

export const submitNewStory = async (storyObj) => {
    try {

        const request = await fetch(`${BASE_URL}/api/submitnewstory`, {
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
            return "Successfully submitted."
        }
    } catch (error) {
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
}