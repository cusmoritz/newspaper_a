
// author functions
const {client} = require('./index');

const createAuthor = async (values) => {
    try {
        await client.query(`
            INSERT INTO authors (author_first, author_last, author_email, author_role)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            ;
        `, [values.first, values.last, values.email, values.role])
    } catch (error) {
        console.log('there was an error creating a new author: ', error);
        throw error;
    }
}

// can fetch any author by any value?
const fetchOneAuthor = async(value) => {
    try {
        const oneAuthor = await client.query(`
            SELECT * FROM authors
            WHERE author_first=$1 OR author_last=$1 OR author_email=$1
            ;
        `, [value]);
        return oneAuthor;
    } catch (error) {
        console.log("there was an error fetching an author:", error);
        throw error;
    }
}

const fetchAllAuthors = async() => {
    try {
        const {rows: allAuthors} = await client.query(`
            SELECT * FROM authors
            ;
        `, []);
        return allAuthors;
    } catch (error) {
        console.log("there was an error fetching an author:", error);
        throw error;
    };
};

const authors = [
    {first: "marcus", last: "moritz", email: "marcus@thetooth.com", role: "editor"},
    {first: "john", last: "laconte", email: "john@thetooth.com", role: "writer"},
    {first: "ross", last: "leonhart", email: "ross@thetooth.com", role: "assistant editor"},
    {first: "jaron", last: "jaron", email: "jaron@thetooth.com", role: "intern"},
    {first: "scott", last: "miller", email: "scott@thetooth.com", role: "business writer"},
    {first: "ricky", last: "martinez", email: "ricky@thetooth.com", role: "music writer"}
]

const insertAuthors = (array) => {
    array.forEach(writer => {
        createAuthor(writer);
        console.log('writer', writer)
    });
}

insertAuthors(authors);

module.exports = {
    fetchAllAuthors,
    fetchOneAuthor,
    createAuthor,
    
}