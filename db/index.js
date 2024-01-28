const {Client} = require('pg');
const { DATABASE_URL = 'postgres://localhost:5432' } = process.env;
// Create a client for connecting to the server.
const client = new Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
});

client.connect();

// story metadata:
// original create date
// updated date
// update author

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

const createDatabase = async() => {
    try {
        console.log('Creating database...')
        await client.query(`
        CREATE TABLE IF NOT EXISTS storys (
            story_id SERIAL PRIMARY KEY,
            story_text TEXT NOT NULL,
            story_deck TEXT NOT NULL,
            create_date DATE NOT NULL
        );     

        CREATE TABLE IF NOT EXISTS authors (
            author_id SERIAL PRIMARY KEY,
            author_first VARCHAR(100) NOT NULL,
            author_last VARCHAR(100) NOT NULL,
            author_email VARCHAR(200) NOT NULL,
            author_role VARCHAR(20) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS image_table (
            image_id SERIAL PRIMARY KEY,
            image_file_string VARCHAR(150) NOT NULL
        );
        `, [])
        console.log('Done creating database...')
    } catch (error) {
        console.log('There was an error creating the database.');
        throw error;
    }
};

const destroyDatabase = async () => {
    try {
        console.log('destroying db...');
        await client.query(`
        DROP TABLE IF EXISTS storys;
        DROP TABLE IF EXISTS image_table;
        DROP TABLE IF EXISTS authors;
        `, [])
        console.log('done destroying db...');
    } catch (error) {
        console.log('there was an error destroying the database: ', error);
        throw error;
    }
}

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

destroyDatabase();
createDatabase();
insertAuthors(authors);

module.exports = {
    createAuthor,
}