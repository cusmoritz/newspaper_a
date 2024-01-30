
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
        console.log('there was an error submitting a new story: ', error);
        throw error;
    }
}


const returnAllStorys = async () => {
    try {
        const allStorys = await client.query(`
        SELECT * FROM storys
        ORDER BY original_create_date DESC
        ;
        `);
        console.log('all storys db: ', allStorys);
        return allStorys;
    } catch (error) {
        console.log('there was an error fetching all storys: ', error);
        throw error;
    }
};

const returnStoryFromDate = async (date) => {
    try {
        const storyFromDate = await client.query(`
            SELECT * FROM storys
            WHERE original_create_date = $1
            ;
        `, [date]);
        return storyFromDate;
    } catch (error) {
        console.log('there was an error fetching storys by date: ', error);
        throw error;
    }
}

module.exports = {
    createNewStory,
    returnAllStorys,
    returnStoryFromDate,
    
}