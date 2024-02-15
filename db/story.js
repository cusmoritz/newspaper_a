
// story db functiong

const {client} = require('./index');

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
}


const returnAllActiveStorys = async () => {
    try {
        const activeStorys = await client.query(`
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

const returnEveryStory = async () => {
    try {
        const everyStory = await client.query(`
        SELECT * FROM storys
        ORDER BY original_create_date DESC
        ;
        `, []);
        return everyStory;
    } catch (error) {
        logEverything(error);
        console.log('there was an error fetching every story', error);
        throw error;
    }
}

const returnStoryFromDate = async (date) => {
    try {
        const storyFromDate = await client.query(`
            SELECT * FROM storys
            WHERE original_create_date = $1
            ;
        `, [date]);
        return storyFromDate;
    } catch (error) {
        logEverything(error);
        console.log('there was an error fetching storys by date: ', error);
        throw error;
    }
}

module.exports = {
    createNewStory,
    returnAllActiveStorys,
    returnStoryFromDate,
    returnEveryStory,
    
}