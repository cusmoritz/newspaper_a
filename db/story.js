
// story db functiong

const {client} = require('./index');

/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

const returnAllActiveStorys = async () => {
    try {
        const {rows: activeStorys} = await client.query(`
        SELECT * FROM storys
        WHERE story_active_flag = true
        ORDER BY original_create_date DESC
        ;
        `);
        console.log('all storys db: ', activeStorys);
        return activeStorys;
    } catch (error) {
        logEverything(error);
        console.log('there was an error fetching active storys: ', error);
        throw error;
    }
};

const returnStoryFromDate = async (date) => {
    try {
        const {rows: storyFromDate} = await client.query(`
            SELECT * FROM storys
            WHERE original_create_date = $1 OR 
            ;
        `, [date]);
        return storyFromDate;
    } catch (error) {
        logEverything(error);
        console.log('there was an error fetching storys by date: ', error);
        throw error;
    }
};

const addPageView = async (storyId) => {
    try {
        const {rows: pageView} = await client.query(`
            UPDATE storys
            SET story_views = story_views + 1
            WHERE story_main_id = $1
            ;
        `, [storyId]);
        return pageView;
    } catch (error) {
        logEverything(error);
        throw error;
    }
}


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

const createNewStory = async (storyInfo) => {
    try {
        const originalCreateDate = new Date(); 
        const {rows: story} = await client.query(`
        INSERT INTO storys (story_head, story_deck, story_led, story_text, story_author, story_tags, create_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        ;
        `, [storyInfo.head, storyInfo.deck, storyInfo.led, storyInfo.text, storyInfo.author, storyInfo.tags, originalCreateDate]);

        const {rows: metaInit} = await client.query(`
            INSERT INTO story_meta (story_meta_id, story_original_creator, story_meta_original_publish_date)
            VALUES ($1, $2, $3)
            ;
        `, [story.story_id, story.story_author, story.create_date]);

        return story;
    } catch (error) {
        logEverything(error);
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
};

// const validateSlug = async (slugToCheck) => {
//     try {
//         const {rows: allSlugs} = await client.query(`
//             SELECT story_slug FROM storys
//             WHERE 
//         `, [])
//     } catch (error) {
//         logEverything(error);
//         throw error;
//     }
// }

const returnEveryStoryAdmin = async () => {
    try {
        const {rows: everyStory} = await client.query(`
        SELECT (story_head, story_active_flag, story_author, original_create_date) FROM storys
        ORDER BY original_create_date DESC
        ;
        `, []);
        return everyStory;
    } catch (error) {
        logEverything(error);
        console.log('there was an error fetching every story', error);
        throw error;
    }
};

const oneStoryStats = async (storyId) => { // this is not right on the JOIN
    try {
        const {rows: stats} = await client.query(`
            SELECT * FROM storys
            WHERE story_id = $1
            JOIN story_id ON story_meta.story_id = storys.story_id
            ;
        `, [storyId]);
        return stats;
    } catch (error) {
        logEverything(error);
        throw error;
    }
};

const fetchFrontPage = async () => {
    try {
        const now = new Date();
        const {rows: frontPage} = await clientquery(`
            SELECT (story_id, story_head, storydeck, story_led, story_author, story_tags) FROM storys
            WHERE original_create_date < $1
            ORDER DESC
            LIMIT 10
            ;
        `, [now]);

        return frontPage;

    } catch (error) {
        logEverything(error);
        throw error;
    }

    // for pagination with tags and page number:

    // if (pageNumber === 1) {
    //     const {rows: page} = await client.query(`
    //         SELECT (story_id, story_head, story_deck, story_led, story_author, story_tags) FROM storys
    //         WHERE orignal_create_date < $1
    //         ORDER BY DESC
    //         LIMIT 10
    //         ;
    //     `, [now])
    // } else {
    //     const offset = pageNumber * 10;
    //     const {rows: page} = await client.query(`
    //     SELECT (story_id, story_head, story_deck, story_led, story_author, story_tags) FROM storys
    //     WHERE orignal_create_date < $1
    //     ORDER BY DESC
    //     LIMIT 10 OFFSET $2
    //     ;
    // `, [now, offset])

            // story_id SERIAL PRIMARY KEY,
            // story_head TEXT UNIQUE NOT NULL,
            // story_deck TEXT NOT NULL,
            // story_led TEXT NOT NULL,
            // story_text TEXT NOT NULL,
            // story_author INT NOT NULL,
            // story_tags TEXT,
}



module.exports = {
    createNewStory,
    returnAllActiveStorys,
    returnStoryFromDate,
    returnEveryStoryAdmin,
    fetchFrontPage,
}