
// author functions
const {client} = require('./index');
const {logEverything} = require('./errors');

const createAuthor = async (values) => {
    try {
        await client.query(`
            INSERT INTO authors (first_name, last_name, email, public_role, internal_role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
            ;
        `, [values.first_name, values.last_name, values.email, values.public_role, values.internal_role])
    } catch (error) {
        //logEverything(error);
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
        logEverything(error);
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
        logEverything(error);
        console.log("there was an error fetching an author:", error);
        throw error;
    };
};

const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
    {first_name: "marcus", last_name: "moritz", email: "marcus@thetooth.com", public_role: "editor", internal_role: 1},
    {first_name: "john", last_name: "laconte", email: "john@thetooth.com", public_role: "writer", internal_role: 2},
    {first_name: "ross", last_name: "leonhart", email: "ross@thetooth.com", public_role: "assistant editor", internal_role: 1},
    {first_name: "jaron", last_name: "jaron", email: "jaron@thetooth.com", public_role: "intern", internal_role: 3},
    {first_name: "scott", last_name: "miller", email: "scott@thetooth.com", public_role: "business writer", internal_role: 2},
    {first_name: "ricky", last_name: "martinez", email: "ricky@thetooth.com", public_role: "music writer", internal_role: 2}
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