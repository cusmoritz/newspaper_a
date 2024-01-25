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