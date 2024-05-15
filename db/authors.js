
// author functions
const {client} = require('./index');
const {logEverything} = require('./errors');

const createAuthor = async (values) => {
    console.log('author values db', values)
    try {
        const {rows: author} = await client.query(`
            INSERT INTO authors (first_name, last_name, email, public_role, internal_role, twitter_profile, facebook_profile, other_profile, author_blurb)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
            ;
        `, [values.firstName, values.lastName, values.email, values.publicRole, values.internalRole, values.twitterProfile, values.facebookProfile, values.otherProfile, values.authorBlurb]);
        return author;
    } catch (error) {
        //logEverything(error);
        console.log('there was an error creating a new author: ', error);
        throw error;
    }
};

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
    {firstName: "Marcus", lastName: "Moritz", email: "marcus@thetooth.com", publicRole: "Editor", internalRole: 1},
    {firstName: "John", lastName: "LaConte", email: "john@thetooth.com", publicRole: "Writer", internalRole: 2},
    {firstName: "Ross", lastName: "Leonhart", email: "ross@thetooth.com", publicRole: "Assistant Editor", internalRole: 1},
    {firstName: "Jaron", lastName: "Jaron", email: "jaron@thetooth.com", publicRole: "Intern", internalRole: 3},
    {firstName: "Scott", lastName: "Miller", email: "scott@thetooth.com", publicRole: "Business Editor", internalRole: 2},
    {firstName: "Ricky", lastName: "Martinez", email: "ricky@thetooth.com", publicRole: "Music Writer", internalRole: 2}
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