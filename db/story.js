
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


/////////////// ADMIN FUNCTIONS \\\\\\\\\\\\\\\\\\\\

const createNewStory = async (storyInfo) => {
    try {
        const originalCreateDate = new Date(); 
        const story = await client.query(`
        INSERT INTO storys (story_head, story_deck, story_text, story_author, story_tags, create_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        ;
        `, [storyInfo.head, storyInfo.deck, storyInfo.text, storyInfo.author, storyInfo.tags, originalCreateDate]);
        return story;
    } catch (error) {
        logEverything(error);
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
};

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






module.exports = {
    createNewStory,
    returnAllActiveStorys,
    returnStoryFromDate,
    returnEveryStory,
    
}