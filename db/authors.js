
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

const fetchStoriesByAuthorId = async (authorId) => {
    try {
        const {rows: searchResults} = await client.query(`
        SELECT * 
        FROM storys 
        JOIN authors ON storys.story_author = authors.author_id 
        WHERE storys.story_author = $1 AND storys.story_active_flag = TRUE
        ;
        `, [authorId]);
        console.log('search results db', searchResults);
        return searchResults;
    } catch (error) {
        console.log('there was a database error fetching stories by author.');
        throw error;
    }
}

const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
    {first_name: "Marcus", last_name: "Moritz", email: "marcus@thetooth.com", public_role: "Editor", internal_role: 1},
    {first_name: "John", last_name: "LaConte", email: "john@thetooth.com", public_role: "Writer", internal_role: 2},
    {first_name: "Ross", last_name: "Leonhart", email: "ross@thetooth.com", public_role: "Assistant Editor", internal_role: 1},
    {first_name: "Jaron", last_name: "Jaron", email: "jaron@thetooth.com", public_role: "Intern", internal_role: 3},
    {first_name: "Scott", last_name: "Miller", email: "scott@thetooth.com", public_role: "Business Editor", internal_role: 2},
    {first_name: "Ricky", last_name: "Martinez", email: "ricky@thetooth.com", public_role: "Music Writer", internal_role: 2}
]

const insertAuthors = (array) => {
    array.forEach(writer => {
        createAuthor(writer);
        //console.log('writer', writer)
    });
}

insertAuthors(authors);

module.exports = {
    fetchAllAuthors,
    fetchOneAuthor,
    createAuthor,
    fetchStoriesByAuthorId,
}