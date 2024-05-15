const {Client} = require('pg');
const { DATABASE_URL = 'postgres://localhost:5432' } = process.env;
// Create a client for connecting to the server.
const client = new Client({
    connectionString: DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined,
});

const createDatabase = async() => {
    try {
        console.log('Creating database...')
        await client.query(`

        CREATE TABLE IF NOT EXISTS authors (
            author_id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            public_role VARCHAR(50) NOT NULL,
            internal_role SMALLINT NOT NULL DEFAULT 3,
            twitter_profile VARCHAR(250),
            facebook_profile VARCHAR(250),
            other_profile VARCHAR(250),
            author_blurb TEXT
        );

        CREATE TABLE IF NOT EXISTS primary_catagories (
            primary_catagory_id SERIAL PRIMARY KEY,
            primary_catagory_name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS secondary_catagories (
            secondary_catagory_id SERIAL PRIMARY KEY,
            secondary_parent_id INTEGER REFERENCES primary_catagories(primary_catagory_id),
            secondary_catagory_name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS storys (
            story_id SERIAL PRIMARY KEY,
            story_title TEXT UNIQUE NOT NULL,
            story_subhead TEXT NOT NULL,
            story_led TEXT NOT NULL,
            story_text TEXT NOT NULL,
            story_author INTEGER REFERENCES authors(author_id) NOT NULL,
            story_slug TEXT NOT NULL,
            story_active_flag BOOLEAN DEFAULT true,
            original_publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
            story_update_author INT,
            most_recent_update DATE,
            image_flag BOOLEAN NOT NULL DEFAULT false,
            page_views INT DEFAULT 0
        );  

        CREATE TABLE IF NOT EXISTS image_table (
            image_id SERIAL PRIMARY KEY,
            file_string VARCHAR(300) NOT NULL,
            original_story INT NOT NULL,
            orig_photog INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS story_meta (
            story_meta_id SERIAL PRIMARY KEY,
            story_main_id INTEGER REFERENCES storys(story_id) NOT NULL,
            story_views INT,
            story_original_author INT NOT NULL,
            story_meta_original_publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
            story_updated_by INT,
            story_update_date DATE,
            primary_cat INTEGER REFERENCES primary_catagories(primary_catagory_id) NOT NULL DEFAULT 0,
            secondary_cat INTEGER REFERENCES secondary_catagories(secondary_catagory_id) DEFAULT NULL
        );

        CREATE TABLE IF NOT EXISTS error_log (
            error_number SERIAL PRIMARY KEY,
            error_date DATE NOT NULL,
            error_text TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS story_tags (
            tag_id SERIAL PRIMARY KEY,
            story_tag_id INTEGER REFERENCES storys(story_id) NOT NULL,
            tag TEXT NOT NULL
        );

        

        `, []);
        console.log('Done creating database...')
    } catch (error) {
        console.log('There was an error creating the database.');
        throw error;
    }
};

// CREATE INDEX IF NOT EXISTS idx_pagination ON storys(original_publish_date) USING btree DESC;

const destroyDatabase = async () => {
    try {
        console.log('destroying db...');
        await client.query(`
        DROP TABLE IF EXISTS story_tags;
        DROP TABLE IF EXISTS image_table;

        DROP TABLE IF EXISTS story_meta;
        DROP TABLE IF EXISTS storys;
        DROP TABLE IF EXISTS authors;
        DROP TABLE IF EXISTS secondary_catagories;
        DROP TABLE IF EXISTS primary_catagories;

        `, [])
        console.log('done destroying db...');
    } catch (error) {
        console.log('there was an error destroying the database: ', error);
        throw error;
    }
}

const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
// here for testing
{firstN: "marcus", lastN: "moritz", email: "marcus@thetooth.com", public_role: "editor", internal_role: 0},
{firstN: "john", lastN: "laconte", email: "john@thetooth.com", public_role: "writer", internal_role: 2},
{firstN: "ross", lastN: "leonhart", email: "ross@thetooth.com", public_role: "assistant editor", internal_role: 0},
{firstN: "jaron", lastN: "jaron", email: "jaron@thetooth.com", public_role: "intern", internal_role: 3},
{firstN: "scott", lastN: "miller", email: "scott@thetooth.com", public_role: "business writer", internal_role: 2},
{firstN: "ricky", lastN: "martinez", email: "ricky@thetooth.com", public_role: "music writer", internal_role: 2}
]

destroyDatabase();
createDatabase();
//insertAuthors(authors);

module.exports = {
    client,
}