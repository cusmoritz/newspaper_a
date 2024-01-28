
// story db functiong

const {client} = require('./index');

const newStory = async (storyInfo) => {
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

module.exports = {
    newStory,
    
}