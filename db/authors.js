
// author functions
const {client} = require('./index');
const {logEverything} = require('./errors');
//const {retreiveTags} = require('./story');

const createAuthor = async (values) => {
    // console.log('author values db', values)
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

const editAuthorProfile = async (authorObj) => {
    try {
        const {rows: [authorEdits]} = await client.query(`
        UPDATE authors
        SET first_name = $1, last_name = $2, email = $3, public_role = $4, internal_role = $5, twitter_profile = $6, facebook_profile = $7, other_profile = $8, author_blurb = $9
        WHERE author_id = $10
        RETURNING *
        ;
        `, [authorObj.firstName, authorObj.lastName, authorObj.email, authorObj.publicRole, authorObj.internalRole, authorObj.twitterProfile, authorObj.facebookProfile, authorObj.otherProfile, authorObj.authorBlurb, authorObj.authorId]);

        return authorEdits;
    } catch (error) {
        console.log('There was a database error editing an author.');
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

const retreiveStoryTags = async (storyId) => {
    const {rows: tags} = await client.query(`
        SELECT (tag)
        FROM story_tags
        WHERE story_tag_id = $1
        ORDER BY tag_id ASC
        ;
    `, [storyId]);
    //console.log('tags get', tags);
    return tags;
};

const getCatSubCatForStoryAuthorSearch = async (storyMainId) => {
    try {
        const {rows: query} = await client.query(`
        SELECT * FROM story_meta
        JOIN primary_categories ON story_meta.primary_cat = primary_categories.primary_category_id
        JOIN secondary_categories ON story_meta.secondary_cat = secondary_categories.secondary_category_id
        WHERE story_meta.story_main_id = $1
        ;
        `, [storyMainId])
        //console.log('did we do it', query[0]);
        const building = {primary: {id: null, name: null}, secondary: {id: null, name: null}};
        building.primary.id = query[0].primary_category_id;
        building.primary.name = query[0].primary_category_name;
        building.secondary.id = query[0].secondary_category_id;
        building.secondary.name = query[0].secondary_category_name;
        return building;
    } catch (error) {
        console.log('there was a database error fetching categories for this story.');
        throw error;
    }
}

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

        for (i = 0; i < searchResults.length; i++) {
            searchResults[i].tags = await retreiveStoryTags(searchResults[i].story_id);
            console.log('search results i', searchResults[i])
            searchResults[i].category = await getCatSubCatForStoryAuthorSearch(searchResults[i].story_id)
        }
        return searchResults;
    } catch (error) {
        console.log('there was a database error fetching stories by author.');
        throw error;
    }
}

const authors = [ //internal role: 0 = admin, 1 = editor, 2 = writer, 3 = other?
    {firstName: "Marcus", lastName: "Moritz", email: "marcus@thetooth.com", publicRole: "Editor", internalRole: 1, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also th."},
    {firstName: "John", lastName: "LaConte", email: "john@thetooth.com", publicRole: "Writer", internalRole: 2, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."},
    {firstName: "Ross", lastName: "Leonhart", email: "ross@thetooth.com", publicRole: "Assistant Editor", internalRole: 1, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries."},
    {firstName: "Jaron", lastName: "Jaron", email: "jaron@thetooth.com", publicRole: "Intern", internalRole: 3, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "It has survived not only five centuries."},
    {firstName: "Scott", lastName: "Miller", email: "scott@thetooth.com", publicRole: "Business Editor", internalRole: 2, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text."},
    {firstName: "Ricky", lastName: "Martinez", email: "ricky@thetooth.com", publicRole: "Music Writer", internalRole: 2, twitterProfile: "", facebookProfile: "facebook.com/user", otherProfile: "bandcamp.com/band/tooth", authorBlurb: "Lorem Ipsum is simply dummy text. It has survived not only five centuries."},
    {firstName: "Allison", lastName: "Moritz", email: "allison@thetooth.com", publicRole: "Food Writer", internalRole: 2, twitterProfile: "twitter.com/@allisonWrites", facebookProfile: "facebook.com/Allison", otherProfile: null, authorBlurb: "Allison grew up outside of Chicago and uses her natural expertise to write about food and culture."}
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
    editAuthorProfile,

}