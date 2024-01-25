const {Client} = require('pg');
const { DATABASE_URL = 'postgres://localhost:5432' } = process.env;
// Create a client for connecting to the server.
const client = new Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
});

client.connect();

console.log('client', client)

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
            author_email VARCHAR(200) NOT NULL
        );

        CREATE TABLE IF NOT EXISTS story_images (
            image_id SERIAL PRIMARY KEY,
            image_file VARCHAR(100) NOT NULL
        );


        `, [])
        console.log('Done creating database...')
    } catch (error) {
        console.log('There was an error creating the database.');
        throw error;
    }
};

createDatabase();

module.exports = {
    createDatabase,

}