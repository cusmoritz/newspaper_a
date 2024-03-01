
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
        console.log('storyinfo db', storyInfo)
        const {rows: story} = await client.query(`
        INSERT INTO storys (story_title, story_subhead, story_led, story_text, story_author, story_tags, story_slug)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        ;
        `, [storyInfo.title, storyInfo.subhead, storyInfo.led, storyInfo.story, storyInfo.author, storyInfo.tags, storyInfo.slug]);

        // const {rows: metaInit} = await client.query(`
        //     INSERT INTO story_meta (story_meta_id, story_original_creator, story_meta_original_publish_date)
        //     VALUES ($1, $2, $3)
        //     ;
        // `, [story.story_id, story.story_author, story.create_date]);

        return story;
    } catch (error) {
        //logEverything(error);
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
    //         SELECT (story_id, story_title, story_subhead, story_led, story_author, story_tags) FROM storys
    //         WHERE orignal_create_date < $1
    //         ORDER BY DESC
    //         LIMIT 10
    //         ;
    //     `, [now])
    // } else {
    //     const offset = pageNumber * 10;
    //     const {rows: page} = await client.query(`
    //     SELECT (story_id, story_title, story_subhead, story_led, story_author, story_tags) FROM storys
    //     WHERE orignal_create_date < $1
    //     ORDER BY DESC
    //     LIMIT 10 OFFSET $2
    //     ;
    // `, [now, offset])

}

const fakeStorys = [
    {
        title: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        subhead: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        story: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. \n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n" +
          "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\n",
        tags: [ 'story', 'first', 'another story', 'a good one' ],
        author: '4',
        led: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        slug: 'first-story-goes-here'
      },
      {
        title: "Upvalley Shift e-bike share between Vail, EagleVail, Avon and Edwards to return for third summer",
        subhead: "The Shift Bike program allows residents and guests to rent e-bikes by the minute from Vail to Edwards",
        story: "The Shift Bike program allows individuals to rent e-bikes from stations throughout these communities on a pay-as-you-go model. \n The program launched in 2022 between Vail, EagleVail and Avon. In the first summer, the three communities had 90 e-bikes across 15 stations. \n The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions. Single-occupancy vehicles account for around 40% of the county's emissions, so the idea was that providing an alternative mobility option would reduce the number of these vehicle trips in the region. \n The first summer saw a total of 7,393 trips for a total of 21,735.4 miles, with the average ride being 2.94 miles for around 30 minutes.  \n Ninety percent of the trips were under 60 minutes long. Reportedly, the program was responsible for the reduction of 8.68 metric tons of greenhouse gas emissions — the equivalent of 1,000 gallons of gasoline — in 2022.",
        tags: ['news', 'vail', 'edwards', 'scooters'],
        author: '5',
        led: "The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions.",
        slug: 'upvalley-shift-e-bike-share-between-vail-eaglevail-avon-and-edwards-to-return-for-third-summer'
      }
]

const insertFakeStorys = ()=> {
    fakeStorys.forEach((story) => {
        createNewStory(story);
    })
}
insertFakeStorys(fakeStorys);

module.exports = {
    createNewStory,
    returnAllActiveStorys,
    returnStoryFromDate,
    returnEveryStoryAdmin,
    fetchFrontPage,
}