
// story db functiong

const {client} = require('./index');

/////////////// FRONT END FUNCTIONS \\\\\\\\\\\\\\\\\\\\

const returnAllActiveStorys = async () => {
    try {
        const {rows: activeStorys} = await client.query(`
        SELECT * FROM storys
        WHERE story_active_flag = true
        ORDER BY original_publish_date DESC
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

const fetchStoriesFromTag = async (tag) => {
    try {
        const {rows: searchResults} = await client.query(`
        SELECT * FROM story_tags 
        JOIN storys ON storys.story_id = story_tags.story_tag_id 
        WHERE story_tags.tag = ($1)
        AND storys.story_active_flag = true 
        ORDER BY original_publish_date DESC
        LIMIT 10
        ;
        `, [tag]);
        return searchResults;
    } catch (error) {
        console.log('there was a database error fetching stories with tags.');
        throw error;
    }
}

const returnStoryFromDate = async (date) => {
    try {

        // SELECT * FROM storys
        // WHERE original_create_date = '2024-03-04'
        // ORDER BY original_create_date DESC
        // LIMIT 10
        // ;
        const {rows: storyFromDate} = await client.query(`
            SELECT * FROM storys
            WHERE original_publish_date = $1 
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

const createTag = async (storyId, tag) => {
    const {rows: tags} = await client.query(`
    INSERT INTO story_tags (story_tag_id, tag)
    VALUES ($1, $2)
    RETURNING *
    ;
    `, [storyId, tag]);
    return tags;
};

const retreiveTags = async (storyId) => {
    const {rows: tags} = await client.query(`
        SELECT (tag)
        FROM story_tags
        WHERE story_tag_id = $1
        ORDER BY tag_id ASC
        ;
    `, [storyId]);
    //console.log('tags get', tags);
    return tags;
}

const createNewStory = async (storyInfo) => {
    try {
        const {rows: story} = await client.query(`
        INSERT INTO storys (story_title, story_subhead, story_led, story_text, story_author, story_slug)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
        ;
        `, [storyInfo.title, storyInfo.subhead, storyInfo.led, storyInfo.story, storyInfo.author, storyInfo.slug]);

        storyInfo.tags.forEach((tag) => { // this is ugly
            createTag(story[0].story_id, tag);
        });

        const {rows: meta} = await client.query(`
        INSERT INTO story_meta (story_main_id, story_original_author, primary_cat, secondary_cat)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        ;
        `, [story[0].story_id, story[0].story_author, storyInfo.primary, storyInfo.secondary]);

        //console.log('story here', story[0])
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
        SELECT (story_head, story_active_flag, story_author, original_publish_date) FROM storys
        ORDER BY original_publish_date DESC
        ;
        `, []);
        return everyStory;
    } catch (error) {
        //logEverything(error);
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
        //logEverything(error);
        throw error;
    }
};

const fetchAllPrimaryCatagories = async () => {
    try {
        const {rows: primaryCats} = await client.query(`
        SELECT * FROM primary_catagories
        ORDER BY primary_catagory_id ASC
        ;
        `, []);
        return primaryCats;
    } catch (error) {
        console.log('error fetching primary catagories');
        throw error;
    }
};

const fetchSecondaryCatsForPrimary = async(primaryCatId) => {
    try {
        const {rows: secondary} = await client.query(`
        SELECT * FROM secondary_catagories
        WHERE secondary_parent_id = $1
        ;
        `, [primaryCatId]);
        return secondary;
    } catch (error) {
        console.log('there was an error fetching secondary catagories');
        throw error;
    }
};

const fetchAllPrimaryAndSecondary = async () => {
    try {
        const {rows: everyPrimaryCatagory} = await client.query(`
        SELECT * FROM primary_catagories
        LEFT JOIN secondary_catagories ON secondary_catagories.secondary_parent_id = primary_catagories.primary_catagory_id
        ;
        `, []);

        console.log('every primary db', everyPrimaryCatagory)
        return everyPrimaryCatagory;
    } catch (error) {
        console.log('there was an error fetching all catagories.');
        throw error;
    }
}

const fetchFrontPage = async () => {
    try {
        
        const {rows: frontPageStorys} = await client.query(`
            SELECT * FROM storys 
            JOIN authors ON storys.story_author = authors.author_id
            JOIN story_meta ON storys.story_id = story_meta.story_main_id
            WHERE original_publish_date <= CURRENT_DATE AND story_active_flag = TRUE
            ORDER BY original_publish_date DESC
            LIMIT 10
            ;
        `, []);
        // JOIN story_tags ON story_id = story_tags.story_tag_id

        for (let i = 0; i < frontPageStorys.length; i++) {
            frontPageStorys[i].tags = [];
            const oneStoryTags = await retreiveTags(frontPageStorys[i].story_id);
            oneStoryTags.forEach((tag) => {
                frontPageStorys[i].tags.push(tag.tag);
            })
        }

        return frontPageStorys;

    } catch (error) {
        //logEverything(error);
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

};

const fetchStoriesByPrimaryCatagory = async (catagory) => { //catagory is a string 'news' etc
    const catagorySearch = catagory.toUpperCase();

    try {
        console.log('catagory', catagorySearch)
        const {rows: primaryCatagory} = await client.query(`
        SELECT * FROM primary_catagories
        WHERE primary_catagory_name = $1
        ;
        `, [catagorySearch]);

        // catagory = primary_catagory_id && primary_catagory_name

        const {rows: stories} = await client.query(`
        SELECT * FROM storys
        JOIN story_meta ON story_meta.story_main_id = storys.story_id
        JOIN authors ON authors.author_id = storys.story_author
        WHERE story_meta.primary_cat = $1 
        AND original_publish_date <= CURRENT_DATE 
        AND story_active_flag = TRUE
        ORDER BY original_publish_date DESC
        LIMIT 10
        ;
        `, [primaryCatagory.primary_catagory_id])

        return stories;
    } catch (error) {
        console.log('there was a database error fetching by catagory');
        throw error;
    }
}

const createPrimary = async (catText) => {
    const newCatagory = catText.toUpperCase();
    const {rows: PrimaryCats} = await client.query(`
        INSERT INTO primary_catagories (primary_catagory_name)
        VALUES ($1)
        RETURNING *
        ;
    `, [newCatagory])
    return PrimaryCats;
};

const createSecondary = async (subCat, primary) => {
    const newSubCatagory = subCat.toUpperCase();
    const {rows: secondary} = await client.query(`
        INSERT INTO secondary_catagories (secondary_catagory_name, secondary_parent_id)
        VALUES ($1, $2)
        RETURNING *
        ;
    `, [newSubCatagory, primary]);
    return secondary;
};

const fakePrimaries = ["NEWS", "OPINION", "COLORADO", "SPORTS", "OUTDOORS", "ENTERTAINMENT"];

const fakeSecondary = [{name: "Colorado", parent: 1}, {name: "Crime", parent: 1}, {name: "Obit", parent: 1}, {name: "Regional", parent: 1}, {name: "NoCo", parent: 3}, {name: "Denver", parent: 3}, {name: "Editorial", parent: 2}, {name: "Letters", parent: 2}, {name: "Columns", parent: 2}, {name: "Events", parent: 6}, {name: "Food", parent: 6}, {name: "Football", parent: 4}, {name: "Hockey", parent: 4}, {name: "Baseball", parent: 4}, {name: "Soccer", parent: 4}, {name: "Hiking", parent: 5}, {name: "Public Lands", parent: 5}, {name: "Camping", parent: 5}, {name: "Backpacking", parent: 5},];

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
        slug: 'first-story-goes-here',
        primary: 1,
        secondary: 1,
      },
      {
        title: "Upvalley Shift e-bike share between Vail, EagleVail, Avon and Edwards to return for third summer",
        subhead: "The Shift Bike program allows residents and guests to rent e-bikes by the minute from Vail to Edwards",
        story: "The Shift Bike program allows individuals to rent e-bikes from stations throughout these communities on a pay-as-you-go model. \n The program launched in 2022 between Vail, EagleVail and Avon. In the first summer, the three communities had 90 e-bikes across 15 stations. \n The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions. Single-occupancy vehicles account for around 40% of the county's emissions, so the idea was that providing an alternative mobility option would reduce the number of these vehicle trips in the region. \n The first summer saw a total of 7,393 trips for a total of 21,735.4 miles, with the average ride being 2.94 miles for around 30 minutes.  \n Ninety percent of the trips were under 60 minutes long. Reportedly, the program was responsible for the reduction of 8.68 metric tons of greenhouse gas emissions — the equivalent of 1,000 gallons of gasoline — in 2022.",
        tags: ['news', 'vail', 'edwards', 'scooters'],
        author: '5',
        led: "The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions.",
        slug: 'upvalley-shift-e-bike-share-between-vail-eaglevail-avon-and-edwards-to-return-for-third-summer',
        primary: 2,
        secondary: 2,
      },
      {
        title: "What happened to the lost, barking dog in East Vail?",
        subhead: "After nearly three weeks, search continues for elusive pooch, despite limited leads",
        story: "A dog had been heard barking incessantly high up on one of the hiking trails in East Vail, near the Gore Creek Trail, on the Deluge Lake side. It did not seem to respond to whistling or calling, and it would not stop barking. \n As with most cases of missing pets, the issue was quickly taken to the Pets of Eagle County Facebook page. Kate Hawthorne and Evelyn Pinney, who run the Eagle County Lost Pets team, started the page to allow people to communicate more easily about missing pets. \n Immediately, rumors abounded: A large brown dog had been spotted running through the campground; the dog belonged to one of the East Vail residents and had escaped; it was coyotes barking, not a dog; the dog's owner was in trouble up the trail, and the dog was trying to draw help. \n The Eagle County Lost Pets team considered all of these options. Hawthorne and Pinney launched into communications efforts, trying to discover the identity of the dog's owner, or at least find some background on the dog.",
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '1',
        led: "On Feb. 8, a post appeared in the Eagle County Classifieds Facebook group: Was anyone in East Vail missing a dog?",
        slug: 'what-happened-to-the-barking-dog-in-east-vail',
        primary: 3,
        secondary: 1,
      },
      {
        title: "Electric Avenue: The '80s MTV Experience comes to Beaver Creek Saturday",
        subhead: "Yacht Rock",
        story: "But the band doesn't just rely on technical gadgets. The musicians all have been session players for so many top artists, it'd be a column of alphabet soup to name, but it includes the likes of Lionel Richie, Paul Simon, Emmy Lou Harris, B-52s, Tracy Chapman, Boston, Collective Soul, Boyz II Men and many more. As such, they've all contributed to gold and platinum records. \n Their talent, and meticulous playing, compel them to recreate the ’80s note by note with every nuance in every sound — every time. \n Electric Avenue began more than 10 years ago as a one-off, with a group of musicians gathering to perform '80s tunes. But as the music world began changing first with Napster and then with Apple iTunes and other downloads, album sales no longer supported musicians like they once did, said lead vocalist and Electric Avenue co-founder Kevin Spencer. Pat Benatar was key to supporting Electric Avenue after she heard '80s music before taking the stage and was sure it was the radio, but after three more songs, she realized the band had fooled her ears with their live music. \n So, they decided to continue with the tribute band and do it well — unlike the majority of '80s bands out there that are more concerned with their costumes than the chords, he said.",
        tags: ['music', '80s', 'Beaver Creek', 'Avon'],
        author: '2',
        led: "Just like Yacht Rock made soft rock cool and breezy again, Electric Avenue brings the electronic magic of the 1980s back — complete with its personal stash of vintage synthesizers, drum machines and rare signal processors.",
        slug: 'electric-avenue-the-80s-mtv-experience-comes-to-beaver-creek-saturday',
        primary: 2,
        secondary: 3,
      },
      {
        title: "Transportation authority is an opportunity to build for the future",
        subhead: "Daily Editorial",
        story: "However, as identified by local business owners, economic councils and municipal leaders in 2020, public transit has been failing to meet a lot of the Eagle River Valley’s most pressing needs for a while. \n This is why a regional effort sprung up in 2021 to see how a new transportation authority could solve not only a large workforce challenge but bring an improved experience for residents and guests alike. This effort combined stakeholders from eight local governments, numerous employers (big and small) across the valley, existing transit agencies in the county, and community organizations — all working toward a singular goal. \n The end result: a ballot question in front of voters this November asking them to form the Eagle Valley Regional Transportation Authority. \n Voters in the towns of Avon, Eagle, Gypsum, Minturn, Red Cliff and Vail as well as the Beaver Creek Metro District and unincorporated parts of Eagle County will individually decide whether or not they want to be a part of the proposed RTA.",
        tags: ['opinion', 'editorial', 'transportation'],
        author: '3',
        led: "Whether you’re a local employee trying to get to work on time (and back home by a reasonable hour), a visitor looking for easy ways to navigate to and from local resorts and businesses, or you’re looking for a more climate-friendly option for transit, public transportation should be a service that makes life easier, not harder.",
        slug: 'our-view-transportation-authority-is-an-opportunity-to-build-for-the-future',
        primary: 1,
        secondary: 1,
      },
      {
        title: "Court appearance for prominent Vail real estate broker continued",
        subhead: "Stockton appeared Tuesday — his second court appearance — alongside his attorney, Jesse Wiens.",
        story: "Stockton has not yet had a preliminary hearing on the matter or entered a plea; his court appearance on Tuesday was listed as a preliminary demand, where the defendant either demands to have a preliminary hearing or waives the preliminary hearing, and that appearance was continued to March 26. \n Stockton, on Tuesday, was granted permission to travel by Judge Inga Causey. His March 26 continuation was set for 11 a.m. Stockton, who lives in Vail, received the stalking charge on Dec. 27 as a result of an incident in which he is accused of placing an air tag tracking device in the vehicle of the alleged victim, according to arrest records. \n Stockton was booked at the Eagle County Detention Facility on Dec. 27 and was released on Dec. 28 after posting a $2,500 bond.",
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '4',
        led: "Tye Stockton returned to the Eagle County Justice Center on Tuesday for a brief court appearance on an accusation of stalking, a domestic violence charge that the Vail real estate giant received in December.",
        slug: 'court-appearance-for-prominent-vail-real-estate-broker-continued',
        primary: 3,
        secondary: 2,
      },
      {
        title: "Frisco’s Jay Irwin shares harrowing backcountry experience to inspire adventurers to do good",
        subhead: "Some people’s lives forever change",
        story: "For longtime Summit County resident Jay Irwin, his life was changed by the latter, when he was caught in an avalanche on Vail Pass back in 2008. Feautured  as the second speaker in the Friends of the Dillon Ranger District’s adventure speaker series, which Irwin co-founded, Irwin stood in front of dozens of people inside Keystone’s Warren Station on Wednesday, Feb. 28, and told the crowd about how his misadventure in the backcountry gave him an extra chance at life. \n In the talk, Irwin detailed the avalanche in extensive detail. Alongside his adventure friend Bill Petersen, Irwin traveled to the top of Ptarmigan Hill on Vail Pass in the waning afternoon hours of a late-December day. \n Once reaching their designated drop-in spot, the duo completed a game of rock, paper, scissors to determine who would get the honor of dropping into the velvety layers of fresh snow and who would be tasked with circling back around to the bottom of the route with the snowmobile.",
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '2',
        led: "There are many events in life that can shape and change a person. Some people’s lives forever change after getting married or having a child, while others are transformed by a harrowing and traumatic event.",
        slug: 'friscos-jay-irwin-shares-harrowing-backcountry-experience-to-inspire-adventurers-to-do-good',
        primary: 2,
        secondary: 2,
      }
]

const insertFakePrimarys = () => {
    fakePrimaries.forEach((cat) => {
        createPrimary(cat);
    })
};

const insertFakeSecondarys = () => {
    fakeSecondary.forEach((subCat) => {
        createSecondary(subCat.name, subCat.parent);
    })
}

insertFakePrimarys();
insertFakeSecondarys();

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
    retreiveTags,
    fetchStoriesFromTag,
    fetchAllPrimaryCatagories,
    fetchSecondaryCatsForPrimary,
    fetchAllPrimaryAndSecondary,
    fetchStoriesByPrimaryCatagory,
}