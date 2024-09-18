const {Client} = require('pg');
const { DATABASE_URL = 'postgres://localhost:5432' } = process.env;
//const {createFakeSources, fakeSources} = require('./sources')
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

        CREATE TABLE IF NOT EXISTS primary_categories (
            primary_category_id SERIAL PRIMARY KEY,
            primary_category_name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS secondary_categories (
            secondary_category_id SERIAL PRIMARY KEY,
            secondary_parent_id INTEGER REFERENCES primary_categories(primary_category_id),
            secondary_category_name TEXT UNIQUE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS storys (
            story_id SERIAL PRIMARY KEY,
            story_title TEXT UNIQUE NOT NULL,
            story_subhead TEXT NOT NULL,
            story_led TEXT NOT NULL,
            story_text TEXT[] NOT NULL,
            story_author INTEGER REFERENCES authors(author_id) NOT NULL,
            story_slug TEXT NOT NULL,
            footnote_urls TEXT[],
            footnote_words JSON,
            story_active_flag BOOLEAN DEFAULT true,
            original_publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
            story_update_author INT,
            most_recent_update DATE,
            image_flag BOOLEAN DEFAULT false,
            page_views INT DEFAULT 0,
            sources_mentioned INT[],
            breaking_news_flag BOOLEAN DEFAULT false,
            breaking_news_banner_headline TEXT DEFAULT NULL
        );  

        CREATE TABLE IF NOT EXISTS image_table (
            image_id SERIAL PRIMARY KEY,
            file_string VARCHAR(300) NOT NULL,
            original_story INT NOT NULL,
            orig_photog INT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS source_ethnicity (
            ethnicity_id SERIAL PRIMARY KEY,
            ethnicity_name VARCHAR(200)
        );

        CREATE TABLE IF NOT EXISTS sources (
            source_id SERIAL PRIMARY KEY,
            source_name VARCHAR(300),
            source_phone_num VARCHAR(10),
            source_race INT, -- REFERENCES source_identity table
            source_age INT,
            source_elected_official BOOLEAN NOT NULL DEFAULT FALSE,
            source_occupation VARCHAR(300),
            source_original_contact_date DATE DEFAULT CURRENT_DATE,
            source_most_recent_contact_date DATE DEFAULT CURRENT_DATE,
            source_police_officer BOOLEAN NOT NULL DEFAULT FALSE,
            source_location VARCHAR NOT NULL,
            source_previous_occupation VARCHAR[],
            storys_mentioned INT[]
        );

        CREATE TABLE IF NOT EXISTS story_meta (
            story_meta_id SERIAL PRIMARY KEY,
            story_main_id INTEGER REFERENCES storys(story_id) NOT NULL,
            story_views INT,
            story_original_author INT NOT NULL,
            story_meta_original_publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
            story_updated_by INT,
            story_update_date DATE,
            primary_cat INTEGER REFERENCES primary_categories(primary_category_id) NOT NULL DEFAULT 0,
            secondary_cat INTEGER REFERENCES secondary_categories(secondary_category_id) DEFAULT NULL
        );

        CREATE TABLE IF NOT EXISTS error_log (
            error_number SERIAL PRIMARY KEY,
            error_date DATE NOT NULL,
            error_text TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS story_tags (
            tag_id SERIAL PRIMARY KEY,
            tag_story_list INTEGER[],
            tag TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS resource_categories (
            resource_cat_id SERIAL PRIMARY KEY,
            resource_name TEXT,
            resource_associate_id INTEGER[]
        );

        CREATE TABLE IF NOT EXISTS resources (
            resource_id SERIAL PRIMARY KEY,
            resource_url TEXT NOT NULL,
            resource_category INTEGER REFERENCES resource_categories(resource_cat_id),
            resource_sub_category INT,
            resource_create_date DATE NOT NULL DEFAULT CURRENT_DATE,
            resource_display_text TEXT,
            admin_bool BOOL DEFAULT FALSE
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
        DROP TABLE IF EXISTS sources;
        DROP TABLE IF EXISTS story_meta;
        DROP TABLE IF EXISTS storys;
        DROP TABLE IF EXISTS authors;

        DROP TABLE IF EXISTS resources;
        DROP TABLE IF EXISTS resource_categories;
        DROP TABLE IF EXISTS secondary_categories;
        DROP TABLE IF EXISTS primary_categories;


        `, [])
        console.log('done destroying db...');
    } catch (error) {
        console.log('there was an error destroying the database: ', error);
        throw error;
    }
}

// const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
// // here for testing
// {firstN: "marcus", lastN: "moritz", email: "marcus@thetooth.com", public_role: "editor", internal_role: 0},
// {firstN: "john", lastN: "laconte", email: "john@thetooth.com", public_role: "writer", internal_role: 2},
// {firstN: "ross", lastN: "leonhart", email: "ross@thetooth.com", public_role: "assistant editor", internal_role: 0},
// {firstN: "jaron", lastN: "jaron", email: "jaron@thetooth.com", public_role: "intern", internal_role: 3},
// {firstN: "scott", lastN: "miller", email: "scott@thetooth.com", public_role: "business writer", internal_role: 2},
// {firstN: "ricky", lastN: "martinez", email: "ricky@thetooth.com", public_role: "music writer", internal_role: 2}
// ];

// const fakeSources = [

// ];

// const fakeSources = [
//     {sourceName: "Phillip Jones", sourcePhone: "6302548974", sourceRace: 1, sourceAge: 45, sourceElectedBool: true, sourceOccupation: "City Manager", sourceOgContactDate: Date.now() - 8, sourceMostRecentContactDate: Date.now() - 4, sourcePoliceBool: false},
//     {sourceName: "Elizabeth Holmes", sourcePhone: "6305986548", sourceRace: 3, sourceAge: 27, sourceElectedBool: false, sourceOccupation: "Resident", sourceOgContactDate: Date.now() - 1, sourceMostRecentContactDate: Date.now(), sourcePoliceBool: false},
//     {sourceName: "Hernandez Smith", sourcePhone: "3016598521", sourceRace: 2, sourceAge: 19, sourceElectedBool: false, sourceOccupation: "Student", sourceOgContactDate: Date.now() - 101, sourceMostRecentContactDate: Date.now() - 1, sourcePoliceBool: false},
//     {sourceName: "Andrew Seymore-Hoffman", sourcePhone: "805321654", sourceRace: 1, sourceAge: 87, sourceElectedBool: true, sourceOccupation: "Opperations Manager", sourceOgContactDate: Date.now(), sourceMostRecentContactDate: Date.now(), sourcePoliceBool: true},
//     {sourceName: "Shaley Madison", sourcePhone: "6309584521", sourceRace: 4, sourceAge: 31, sourceElectedBool: true, sourceOccupation: "County Clerk", sourceOgContactDate: Date.now() - 10, sourceMostRecentContactDate: Date.now() - 10, sourcePoliceBool: false},
//     {sourceName: "Diane Huxley", sourcePhone: "9065687453", sourceRace: 1, sourceAge: 25, sourceElectedBool: false, sourceOccupation: "Business Manager", sourceOgContactDate: Date.now() - 4, sourceMostRecentContactDate: Date.now() - 1, sourcePoliceBool: true},

// ]

destroyDatabase();
createDatabase();
//insertAuthors(authors)
//createFakeSources(fakeSources);

module.exports = {
    client,
}