
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
        //console.log('all storys db: ', activeStorys);
        return activeStorys;
    } catch (error) {
        //logEverything(error);
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
        //logEverything(error);
        console.log('there was an error fetching storys by date: ', error);
        throw error;
    }
};

const addPageView = async (storyId) => {
    console.log('storyid db', storyId)
    try {
        const {rows: [response]} = await client.query(`
            UPDATE storys
            SET page_views = page_views + 1
            WHERE story_id = $1
            RETURNING page_views
            ;
        `, [storyId]);
        console.log('pageView HERE', response.page_views)
        return response.page_views;
    } catch (error) {
        //logEverything(error);
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
};

const updateSourceTableWithStory = async (storyId, sourceId) => {
    try {
        await client.query(`
        UPDATE sources
        SET storys_mentioned = ARRAY_APPEND(storys_mentioned, $1)
        WHERE source_id = $2
        RETURNING *
        ;
        `, [storyId, sourceId]);
        return;
    } catch (error) {
        console.log('there was a database error updating a source table with a story id');
        throw error;
    }
};

const createNewStory = async (storyInfo) => {
    //console.log('story info db', storyInfo)
    // change the footnote words in JSON format for storing
    let jsonFootnotes = JSON.stringify(storyInfo.footnotes);
    storyInfo.footnotes = jsonFootnotes
    try {
        const {rows: story} = await client.query(`
        INSERT INTO storys (story_title, story_subhead, story_led, story_text, story_author, story_slug, breaking_news_flag, breaking_news_banner_headline, footnote_urls, footnote_words, sources_mentioned, image_flag)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
        ;
        `, [storyInfo.title, storyInfo.subhead, storyInfo.led, storyInfo.story, storyInfo.author, storyInfo.slug, storyInfo.breakingFlag, storyInfo.breakingHeadline, storyInfo.footnoteURLs, storyInfo.footnotes, storyInfo.sourcesMentioned, storyInfo.image_flag]);

        // console.log('story after db', story[0])
        storyInfo.tags.forEach((tag) => { // this is ugly
            createTag(story[0].story_id, tag);
        });

        // add story id to appropriate Source
        if (story[0].sources_mentioned.length > 0) {
            for (let i = 0; i < story[0].sources_mentioned.length; i++) {
                await updateSourceTableWithStory(story[0].story_id, story[0].sources_mentioned[i]);
                
            }
        }

        await client.query(`
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

const fetchAllPrimaryCategories = async () => {
    try {
        const {rows: primaryCats} = await client.query(`
        SELECT * FROM primary_categories
        ORDER BY primary_category_id ASC
        ;
        `, []);
        return primaryCats;
    } catch (error) {
        console.log('error fetching primary categories');
        throw error;
    }
};

const fetchSecondaryCatsForPrimary = async(primaryCatId) => {
    try {
        const {rows: secondary} = await client.query(`
        SELECT * FROM secondary_categories
        WHERE secondary_parent_id = $1
        ;
        `, [primaryCatId]);
        return secondary;
    } catch (error) {
        console.log('there was an error fetching secondary categories');
        throw error;
    }
};

const fetchAllPrimaryAndSecondary = async () => {
    try {
        const {rows: everyPrimaryCategory} = await client.query(`
        SELECT * FROM primary_categories
        LEFT JOIN secondary_categories ON secondary_categories.secondary_parent_id = primary_categories.primary_category_id
        ;
        `, []);

        //console.log('every primary db', everyPrimaryCategory)
        return everyPrimaryCategory;
    } catch (error) {
        console.log('there was an error fetching all categories.');
        throw error;
    }
};

const getCatSubCatForStoryMeta = async (storyMainId) => {
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
        //console.log('front page', frontPageStorys)
        // JOIN story_tags ON story_id = story_tags.story_tag_id
        // get categories
        for (let i = 0; i < frontPageStorys.length; i++) {
            const cats = await getCatSubCatForStoryMeta(frontPageStorys[i].story_main_id);
            frontPageStorys[i].category = cats;
            //console.log('cats?', cats)
        }

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

const fetchSingleStoryCatSubCat  = async (primaryId, secondaryId) => {
    try {
        const {rows: primary} = await client.query(`
        SELECT * FROM primary_categories
        WHERE primary_category_id = $1
        ;
        `, [primaryId]);

        const {rows: secondary} = await client.query(`
        SELECT * FROM secondary_categories
        WHERE secondary_category_id = $1
        ;
        `, [secondaryId]);
        const building = {};
        building.primary = primary[0];
        building.secondary = secondary[0];
        //console.log('in fetchSingletoryCatSubCat', primary, secondary)
        return building;
    } catch (error) {
        console.log('there was a database error fetching categories for one story.');
        throw error;
    }
}

const fetchSinglePageStory = async (storyId) => {
    try {
        const {rows: story} = await client.query(`
        SELECT * FROM storys
        JOIN story_meta ON story_meta.story_main_id = storys.story_id
        JOIN authors ON authors.author_id = storys.story_author
        WHERE storys.story_id = $1
        AND original_publish_date <= CURRENT_DATE 
        AND story_active_flag = TRUE
        ;
        `, [storyId]);

        // get tags
        story[0].tags = await retreiveTags(storyId);
        story[0].category = await fetchSingleStoryCatSubCat(story[0].primary_cat, story[0].secondary_cat);
        story[0].sources = await fetchSourcesForOneStory(story[0].sources_mentioned)
        //console.log('story db ', story[0]);
        return story[0];

    } catch (error) {
        console.log('there was a database error fetching that story');
        throw error;
    }
}

const fetchStoriesByPrimaryCategory = async (category) => { 
    //const categorySearch = category.toUpperCase();
    // we make category a int for now

    try {
        // get category
        const {rows: [primaryCategory]} = await client.query(`
        SELECT * FROM primary_categories
        WHERE primary_category_id = $1
        ;
        `, [category]);

        console.log('primary cat all', primaryCategory)
        // get stories for category
        const id = primaryCategory.primary_category_id;
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
        `, [id]);

        console.log('story by prim cat', stories)
        // get tags for story
        for (let i = 0; i < stories.length; i++){
            const response = await fetchSingleStoryCatSubCat(stories[i].primary_cat, stories[i].secondary_cat);
            //console.log('whjat now', whatNow)
            stories[i].primary = response.primary;
            stories[i].secondary = response.secondary;
            //await fetchPrimaryAndSecondaryByStoryId(stories[i].story_id);
            //stories[i].primary_cat_description = primaryCategory.primary_category_name;
            stories[i].tags = await retreiveTags(stories[i].story_id);
        }
         console.log('now what', stories)
        return stories;
    } catch (error) {
        console.log('there was a database error fetching by category');
        throw error;
    }
};

const fetchPrimaryAndSecondaryByStoryId = async (storyId) => {
    console.log('story id', storyId)
    try {
        const {rows: primSec} = await client.query(`
        SELECT * FROM story_meta
        JOIN primary_categories ON primary_categories.primary_category_id = story_meta.story_main_id

        WHERE story_meta.story_main_id = $1

        ;
        `, [storyId]);
        console.log('prim for now', primSec);
    } catch (error) {
        console.log('there was a database error fetching primary and secondary categories by that story Id.');
        throw error;
    }
}

const fetchStoriesBySecondaryCategory = async (primaryCat, secondaryCat) => {
    const primary = primaryCat.toUpperCase();
    const secondary = secondaryCat.toUpperCase();
    try {
        // const {rows: primaryCategory} = await client.query(`
        // SELECT * FROM primary_categories
        // WHERE primary_category_name = $1
        // ;
        // `, [primary]);

        const {rows: secondaryCategory} = await client.query(`
        SELECT * FROM secondary_categories
        /* JOIN primary_categories ON primary_categories.primary_category_id = secondary_categories.secondary_parent_id */
        WHERE secondary_category_name = $1
        ;
        `, [secondary])
        // now we have 1 objects with IDs
        // sec_id   sec_parent  sec_cat_name    prim_cat    prim_cat_name
        // 4	    1	        REGIONAL	    1	        NEWS
        console.log('what we got', secondaryCategory)
        // {
        //     secondary_category_id: 2,
        //     secondary_parent_id: 1,
        //     secondary_category_name: 'CRIME',

        //     primary_category_id: 1,
        //     primary_category_name: 'NEWS'
        //   }



        // fetch stories
        const {rows: stories} = await client.query(`
        SELECT * FROM storys
        JOIN story_meta ON story_meta.story_main_id = storys.story_id
        JOIN authors ON authors.author_id = storys.story_author
        WHERE story_meta.primary_cat = $1
        AND story_meta.secondary_cat = $2 
        AND original_publish_date <= CURRENT_DATE 
        AND story_active_flag = TRUE
        ORDER BY original_publish_date DESC
        LIMIT 10
        ;
        `, [secondaryCategory[0].secondary_parent_id, secondaryCategory[0].secondary_category_id]);

        // get tags
        for (i = 0; i < stories.length; i++) {
            stories[i].tags = await retreiveTags(stories[i].story_id);
        }
        //console.log('stories db', stories);
        return stories;
    } catch (error) {
        console.log('there was a database error fetching stories by secondary category');
        throw error;
    }
};

const createPrimary = async (catText) => {
    const newCategory = catText.toUpperCase();
    const {rows: PrimaryCats} = await client.query(`
        INSERT INTO primary_categories (primary_category_name)
        VALUES ($1)
        RETURNING *
        ;
    `, [newCategory])
    return PrimaryCats;
};

const createSecondary = async (subCat, primary) => {
    const newSubCategory = subCat.toUpperCase();
    const {rows: secondary} = await client.query(`
        INSERT INTO secondary_categories (secondary_category_name, secondary_parent_id)
        VALUES ($1, $2)
        RETURNING *
        ;
    `, [newSubCategory, primary]);
    return secondary;
};



//////////////////////// SOURCE FUNCTIONS //////////////////
const fetchSourcesForOneStory = async (sourceArray) => {
    try {
        //console.log('source array', sourceArray);
        const sourceInfoArray = [];
        for (let i = 0; i < sourceArray.length; i++) {
            const {rows: [source]} = await client.query(`
            SELECT * FROM sources
            WHERE source_id = $1
            ;
            `,[sourceArray[i]]);
            sourceInfoArray.push(source);
        };
        //console.log('source info array', sourceInfoArray)
        return sourceInfoArray;
    } catch (error) {
        console.log('there was a database error fetching sources for that story');
        throw error;
    }
}

const fakePrimaries = ["NEWS", "ELECTIONS", "OPINION", "OUTDOORS", "SPORTS", "ENTERTAINMENT"];

const fakeSecondary = [{name: "Fort Collins", parent: 1}, {name: "Northern Colorado", parent: 1}, {name: "Colorado", parent: 1}, {name: "Nation & World", parent: 1}, {name: "Housing", parent: 1},{name: "Obituaries", parent: 1}, {name: "Crime", parent: 1}, {name: "2023 General", parent: 2}, {name: "2024 General", parent: 2}, {name: "Editorial", parent: 3}, {name: "Letters", parent: 3}, {name: "Columns", parent: 3},  {name: "Hiking", parent: 4}, {name: "Public Lands", parent: 4}, {name: "Camping", parent: 4}, {name: "Backpacking", parent: 4}, {name: "Water", parent: 4}, {name: "Football", parent: 5}, {name: "Hockey", parent: 5}, {name: "Baseball", parent: 5}, {name: "Soccer", parent: 5}, {name: "Events", parent: 6}, {name: "Food", parent: 6}, {name: "Music", parent: 6}];

    // news/fort-collins
    // news/northern-colorado
    // news/colorado
    // news/nation-world
    // news/obituaries
    // news/crime

const fakeStorys = [
    {
        title: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        subhead: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        story: 
          [
            "\"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters. \\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\" +",
            "          \"Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.\\n\""
        ],
        tags: [ 'story', 'first', 'another story', 'a good one' ],
        author: '4',
        led: "Title here and it can be a lot longer that you think it can but that doesn't mean you have to use all one hundred and fifty characters.",
        slug: 'first-story-goes-here',
        primary: 3,
        secondary: 12,
        footnotes: {},
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ], 
        sourcesMentioned: [1,5],
        image_flag: true
      },
      {
        title: "Fearing for his life, Gypsum man kills troublesome bear that had eluded wildlife officials",
        subhead: "The killing was legally justified, according to an investigation by Colorado Parks and Wildlife",
        story: [
            "Bear 935 first appeared in Eagle County last year, when it was [relocated] to near LEDE Reservoir in Gypsum after being identified as a nuisance bear in the Kremmling area.",
            "“It was loitering near town, near residential areas. They attempted hazing. It wasn’t leaving the area. They wanted to get rid of it, get it out of that area, into suitable habitat before it became too comfortable,” said Matt Yamashita, Colorado Parks and Wildlife area wildlife manager.",
            "Bear 935 did not remain in isolation for long.",
            "“It traveled through miles and miles of appropriate habitat to seek refuge near Vail,” [Yamashita] [said].",
            "In Vail, the bear again “started developing bad habits,” Yamashita said. ",
            "The bear showed too much comfort existing near humans, including entering houses.",
            "“Our plan at that time was to, if we caught it, to euthanize it,” Yamashita said. “At that point, it, for our agency, the way we see that is a human health and safety issue.”",
            "Colorado Parks and Wildlife officers set traps for the bear, intending to euthanize it when caught. But the [traps] never caught the bear. “And then it just vanished,” Yamashita said.",
            "In late July, Colorado Parks & Wildlife stopped receiving calls about [Bear 935].",
            "“I don’t know where it went, what it did, how it stayed out of trouble, or why it decided to do that, but it changed its behavior,” Yamashita said.",
            "The next time the bear resurfaced was when it emerged from hibernation in spring 2024. “The first knowledge we have of it was back again in the Vail area, and it was kind of replicating some of the same behaviors,” Yamashita said. “We were trying to keep tabs on it, figuring out where it was going to be, how we could catch up with it, and then it disappeared.”",
            "The next time Bear 935 was seen was about a week later, when it showed up on Scott’s property, after traversing many miles along the Eagle River corridor."
        ],
        tags: ['bears', 'Gypsum', 'wildlife', 'human-wildlife interactions', 'CPW'],
        author: '3',
        led: "Blake Scott was moving water on his family’s property in Gypsum on the evening of Monday, June 10, when he heard his mother screaming.",
        slug: 'man-kills-bear-gypsum',
        primary: 1,
        secondary: 3,
        footnotes: [
            {
                "word": [
                    "hazing"
                ],
                "paragraph": 1
            },
            {
                "word": [
                    "Yamashita"
                ],
                "paragraph": 3
            },
            {
                "word": [
                    "hibernation"
                ],
                "paragraph": 10
            }
        ],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [3,5],
        image_flag: false
      },
      {
        title: "Upvalley Shift e-bike share between Vail, EagleVail, Avon and Edwards to return for third summer",
        subhead: "The Shift Bike program allows residents and guests to rent e-bikes by the minute from Vail to Edwards",
        story: [
            "The Shift Bike program allows individuals to [rent] e-bikes from stations throughout these communities on a pay-as-you-go model. ",
            "The program launched in 2022 between Vail, EagleVail and Avon. In the first summer, the three communities had 90 e-bikes across 15 [stations]. ",
            "The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions. ",
            "Single-occupancy vehicles account for around 40% of the county's emissions, so the idea was that providing an alternative mobility option would reduce the number of these vehicle trips in the region.",
            " The first summer saw a total of 7,393 trips for a total of 21,735.4 miles, with the average ride being 2.94 miles for around 30 minutes.",
            " Ninety percent of the trips were under 60 minutes long. Reportedly, the program was responsible for the reduction of 8.68 metric tons of [greenhouse] gas emissions — the equivalent of 1,000 gallons of gasoline — in [2022]."
        ],
        tags: ['news', 'vail', 'edwards', 'scooters'],
        author: '5',
        led: "The idea was to provide residents and guests with an alternative mobility option, aligning with the county's climate action goals, specifically, the Eagle County Climate Action Collaborative's goal to reduce greenhouse emissions.",
        slug: 'upvalley-shift-e-bike-share-between-vail-eaglevail-avon-and-edwards-to-return-for-third-summer',
        primary: 1,
        secondary: 2,
        footnotes: [
            {
                "word": [
                    "[rent]"
                ],
                "paragraph": 0
            },
            {
                "word": [
                    "[stations]", 
                ],
                "paragraph": 1
            },
            {
                "word": [
                    "[2022]", "[greenhouse]"
                ],
                "paragraph": 5
            }
        ],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [6],
        image_flag: true
      },
      {
        title: "What happened to the lost, barking dog in East Vail?",
        subhead: "After nearly three weeks, search continues for elusive pooch, despite limited leads",
        story: [
            "A dog had been heard barking incessantly high up on one of the hiking trails in East Vail, near the Gore Creek Trail, on the Deluge Lake side. ",
            "It did not seem to respond to whistling or calling, and it would not stop barking. ",
            "As with most cases of missing pets, the issue was quickly taken to the Pets of Eagle County Facebook page. ",
            "Kate Hawthorne and Evelyn Pinney, who run the Eagle County Lost Pets team, started the page to allow people to communicate more easily about missing pets. ",
            "Immediately, rumors abounded: A large brown dog had been spotted running through the campground; the dog belonged to one of the East Vail residents and had escaped; it was coyotes barking, not a dog; the dog's owner was in trouble up the trail, and the dog was trying to draw help.",
            "The Eagle County Lost Pets team considered all of these options. Hawthorne and Pinney launched into communications efforts, trying to discover the identity of the dog's owner, or at least find some background on the dog."
        ],
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '1',
        led: "On Feb. 8, a post appeared in the Eagle County Classifieds Facebook group: Was anyone in East Vail missing a dog?",
        slug: 'what-happened-to-the-barking-dog-in-east-vail',
        primary: 1,
        secondary: 7,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [1,2,3],
        image_flag: true
      },
      {
        title: "Electric Avenue: The '80s MTV Experience comes to Beaver Creek Saturday",
        subhead: "Yacht Rock",
        story: [
            "\"But the band doesn't just rely on technical gadgets. The musicians all have been session players for so many top artists, it'd be a column of alphabet soup to name, but it includes the likes of Lionel Richie, Paul Simon, Emmy Lou Harris, B-52s, Tracy Chapman, Boston, Collective Soul, Boyz II Men and many more. ",
            "As such, they've all contributed to gold and platinum records.",
            " Their talent, and meticulous playing, compel them to recreate the ’80s note by note with every nuance in every sound — every time. ",
            "Electric Avenue began more than 10 years ago as a one-off, with a group of musicians gathering to perform '80s tunes. But as the music world began changing first with Napster and then with Apple iTunes and other downloads, album sales no longer supported musicians like they once did, said lead vocalist and Electric Avenue co-founder Kevin Spencer. ",
            "Pat Benatar was key to supporting Electric Avenue after she heard '80s music before taking the stage and was sure it was the radio, but after three more songs, she realized the band had fooled her ears with their live music. ",
            "So, they decided to continue with the tribute band and do it well — unlike the majority of '80s bands out there that are more concerned with their costumes than the chords, he said.\""
        ],
        tags: ['music', '80s', 'Beaver Creek', 'Avon'],
        author: '2',
        led: "Just like Yacht Rock made soft rock cool and breezy again, Electric Avenue brings the electronic magic of the 1980s back — complete with its personal stash of vintage synthesizers, drum machines and rare signal processors.",
        slug: 'electric-avenue-the-80s-mtv-experience-comes-to-beaver-creek-saturday',
        primary: 6,
        secondary: 24,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [6,1,5],
        image_flag: false
      },
      {
        title: "Transportation authority is an opportunity to build for the future",
        subhead: "Daily Editorial",
        story: [
            "However, as identified by local business owners, economic councils and municipal leaders in 2020, public transit has been failing to meet a lot of the Eagle River Valley’s most pressing needs for a while.",
            " This is why a regional effort sprung up in 2021 to see how a new transportation authority could solve not only a large workforce challenge but bring an improved experience for residents and guests alike. ",
            "This effort combined stakeholders from eight local governments, numerous employers (big and small) across the valley, existing transit agencies in the county, and community organizations — all working toward a singular goal. ",
            "The end result: a ballot question in front of voters this November asking them to form the Eagle Valley Regional Transportation Authority. ",
            "Voters in the towns of Avon, Eagle, Gypsum, Minturn, Red Cliff and Vail as well as the Beaver Creek Metro District and unincorporated parts of Eagle County will individually decide whether or not they want to be a part of the proposed RTA."
        ],
        tags: ['opinion', 'editorial', 'transportation'],
        author: '3',
        led: "Whether you’re a local employee trying to get to work on time (and back home by a reasonable hour), a visitor looking for easy ways to navigate to and from local resorts and businesses, or you’re looking for a more climate-friendly option for transit, public transportation should be a service that makes life easier, not harder.",
        slug: 'our-view-transportation-authority-is-an-opportunity-to-build-for-the-future',
        primary: 1,
        secondary: 1,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [1,2,3,4,5,6],
        image_flag: true
      },
      {
        title: "Court appearance for prominent Vail real estate broker continued",
        subhead: "Stockton appeared Tuesday — his second court appearance — alongside his attorney, Jesse Wiens.",
        story: [
            "Stockton has not yet had a preliminary hearing on the matter or entered a plea; his court appearance on Tuesday was listed as a preliminary demand, where the defendant either demands to have a preliminary hearing or waives the preliminary hearing, and that appearance was continued to March 26.",
            " Stockton, on Tuesday, was granted permission to travel by Judge Inga Causey. ",
            "His March 26 continuation was set for 11 a.m. Stockton, who lives in Vail, received the stalking charge on Dec. 27 as a result of an incident in which he is accused of placing an air tag tracking device in the vehicle of the alleged victim, according to arrest records.",
            " Stockton was booked at the Eagle County Detention Facility on Dec. 27 and was released on Dec. 28 after posting a $2,500 bond."
        ],
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '4',
        led: "Tye Stockton returned to the Eagle County Justice Center on Tuesday for a brief court appearance on an accusation of stalking, a domestic violence charge that the Vail real estate giant received in December.",
        slug: 'court-appearance-for-prominent-vail-real-estate-broker-continued',
        primary: 1,
        secondary: 7,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [6,3,4],
        image_flag: false
      },
      {
        title: "Frisco’s Jay Irwin shares harrowing backcountry experience to inspire adventurers to do good",
        subhead: "Some people’s lives forever change",
        story: [
            "For longtime Summit County resident Jay Irwin, his life was changed by the latter, when he was caught in an avalanche on Vail Pass back in 2008. ",
            "Feautured  as the second speaker in the Friends of the Dillon Ranger District’s adventure speaker series, which Irwin co-founded, Irwin stood in front of dozens of people inside Keystone’s Warren Station on Wednesday, Feb. 28, and told the crowd about how his misadventure in the backcountry gave him an extra chance at life.",
            " In the talk, Irwin detailed the avalanche in extensive detail. ",
            "Alongside his adventure friend Bill Petersen, Irwin traveled to the top of Ptarmigan Hill on Vail Pass in the waning afternoon hours of a late-December day. ",
            "Once reaching their designated drop-in spot, the duo completed a game of rock, paper, scissors to determine who would get the honor of dropping into the velvety layers of fresh snow and who would be tasked with circling back around to the bottom of the route with the snowmobile."
        ],
        tags: ['local', 'missing', 'eagle vail', 'dog', 'vail'],
        author: '2',
        led: "There are many events in life that can shape and change a person. Some people’s lives forever change after getting married or having a child, while others are transformed by a harrowing and traumatic event.",
        slug: 'friscos-jay-irwin-shares-harrowing-backcountry-experience-to-inspire-adventurers-to-do-good',
        primary: 4,
        secondary: 16,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [4,2],
        image_flag: false
      },
      {
        title: '‘Lost Boy’ Marty Koether returns for 60th anniversary of incident',
        subhead: 'Event made him a legend in Vail',
        story: [
            "Koether shared those dreams and more in an emotional trip to the Colorado Snowsports Museum on April 2. ",
            "The visit coincided with the 60-year anniversary of Koether’s fateful night alone on Vail Mountain, in which he slept in a tree well after making a wrong turn into Game Creek Bowl, which had not yet been developed for skiing.",
            "By the summer of 1969, when Game Creek Bowl was being developed, mountain managers had already come up with a name for several of the runs, including Lost Boy.",
            "Koether said he can’t remember exactly when he learned there was a run being named after him and his experience, but it was decades before he became fully aware of how renowned the run was on Vail Mountain.",
            "“I’ve had so many experiences in life beyond the Lost Boy, that this just didn’t seem that monumental to me,” he said, adding that he hoped the statement didn’t come across as egotistical.",
            "“It was just something that happened,” he said of being lost on Vail Mountain. “I lived through it, it was great, and I pretty much just put it in the back closet after that. But now that I’m here, I never realized how many people liked the story.”",
            "Koether was invited to town by John D’Angelo, general manager of The Sebastian, who developed an interest in the Lost Boy story after learning to ski last year.",
            "D’Angelo said the effort to bring Koether to town started with a question.",
            "“I know Riva Ridge, and I know Pepi’s Face — a lot of these have stories behind them. What is the story behind the Lost Boy?” he said.",
            "After learning the story, he found Koether on Facebook and began developing a relationship with him.",
        ],
        tags: [ 'vail', 'skiing', 'incident', 'mountain', 'Marty' ],
        author: 2,
        led: 'For Marty Koether, the namesake for Vail Mountain’s “Lost Boy” run, his dreams from April 1, 1964, are still vivid.',
        slug: 'lost-boy-marty-koether-returns-for-60th-anniversary',
        primary: 4,
        secondary: 13,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [5],
        image_flag: true
      },
      {
        title: 'Ur-Fascism',
        subhead: 'The New York Review of Books',
        story: [
            "I elaborated with rhetorical skill on the subject “Should we die for the glory of Mussolini and the immortal destiny of Italy?” My answer was positive. I was a smart boy.",
            "'I spent two of my early years among the SS, Fascists, Republicans, and partisans shooting at one another, and I learned how to dodge bullets. It was good exercise.",
            "'In April 1945, the partisans took over in Milan. Two days later they arrived in the small town where I was living at the time. It was a moment of joy. The main square was crowded with people singing and waving flags, calling in loud voices for Mimo, the partisan leader of that area. A former maresciallo of the Carabinieri, Mimo joined the supporters of General Badoglio, Mussolini’s successor, and lost a leg during one of the first clashes with Mussolini’s remaining forces. Mimo showed up on the balcony of the city hall, pale, leaning on his crutch, and with one hand tried to calm the crowd. I was waiting for his speech because my whole childhood had been marked by the great historic speeches of Mussolini, whose most significant passages we memorized in school. Silence. Mimo spoke in a hoarse voice, barely audible. He said: “Citizens, friends. After so many painful sacrifices … here we are. Glory to those who have fallen for freedom.” And that was it. He went back inside. The crowd yelled, the partisans raised their guns and fired festive volleys. We kids hurried to pick up the shells, precious items, but I had also learned that freedom of speech means freedom from rhetoric.",
            "'A few days later I saw the first American soldiers. They were African Americans. The first Yankee I met was a black man, Joseph, who introduced me to the marvels of Dick Tracy and Li’l Abner. His comic books were brightly colored and smelled good.",
            "'One of the officers (Major or Captain Muddy) was a guest in the villa of a family whose two daughters were my schoolmates. I met him in their garden where some ladies, surrounding Captain Muddy, talked in tentative French. Captain Muddy knew some French, too. My first image of American liberators was thus — after so many palefaces in black shirts — that of a cultivated black man in a yellow-green uniform saying: “Oui, merci beaucoup, Madame, moi aussi j’aime le champagne …” Unfortunately there was no champagne, but Captain Muddy gave me my first piece of Wrigley’s Spearmint and I started chewing all day long. At night I put my wad in a water glass, so it would be fresh for the next day.",
            "'In May we heard that the war was over. Peace gave me a curious sensation. I had been told that permanent warfare was the normal condition for a young Italian. In the following months I discovered that the Resistance was not only a local phenomenon but a European one. I learned new, exciting words like réseau, maquis, armée secrète, Rote Kapelle, Warsaw ghetto. I saw the first photographs of the Holocaust, thus understanding the meaning before knowing the word. I realized what we were liberated from.",
            " 'In my country today there are people who are wondering if the Resistance had a real military impact on the course of the war. For my generation this question is irrelevant: we immediately understood the moral and psychological meaning of the Resistance. For us it was a point of pride to know that we Europeans did not wait passively for liberation. And for the young Americans who were paying with their blood for our restored freedom it meant something to know that behind the firing lines there were Europeans paying their own debt in advance.",
            "'In my country today there are those who are saying that the myth of the Resistance was a Communist lie. It is true that the Communists exploited the Resistance as if it were their personal property, since they played a prime role in it; but I remember partisans with kerchiefs of different colors. Sticking close to the radio, I spent my nights — the windows closed, the blackout making the small space around the set a lone luminous halo — listening to the messages sent by the Voice of London to the partisans. They were cryptic and poetic at the same time (The sun also rises, The roses will bloom) and most of them were “messaggi per la Franchi.” Somebody whispered to me that Franchi was the leader of the most powerful clandestine network in northwestern Italy, a man of legendary courage. Franchi became my hero. Franchi (whose real name was Edgardo Sogno) was a monarchist, so strongly anti-Communist that after the war he joined very right-wing groups, and was charged with collaborating in a project for a reactionary coup d’état. Who cares? Sogno still remains the dream hero of my childhood. Liberation was a common deed for people of different colors.",
            "'In my country today there are some who say that the War of Liberation was a tragic period of division, and that all we need is national reconciliation. The memory of those terrible years should be repressed, refoulée, verdrängt. But Verdrängung causes neurosis. If reconciliation means compassion and respect for all those who fought their own war in good faith, to forgive does not mean to forget. I can even admit that Eichmann sincerely believed in his mission, but I cannot say, “OK, come back and do it again.” We are here to remember what happened and solemnly say that “They” must not do it again.",
            "'But who are They?'"
        ],
        tags: [ 'fascism', 'anarchy', 'italy', 'Umberto', 'Umberto Eco' ],
        author: 2,
        led: 'In 1942, at the age of ten, I received the First Provincial Award of Ludi Juveniles (a voluntary, compulsory competition for young Italian Fascists — that is, for every young Italian).',
        slug: 'umberto-eco-ur-fascism',
        primary: 3,
        secondary: 12,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [4,6,2],
        image_flag: false
    },
    {
        title: 'Glizzys, Glam, and Gargantuan Gonads',
        subhead: 'Chicago remains unbeaten in its quest for hotdog dominance',
        story: [
            "With 3 million residents and millions more who visit during the course of a year, free hotdogs for everyone sounds like a daunting task. \"I know it sounds like a lot of hotdogs,\" Mayor Doug Dibbenow said. \"But the reality of the situation is that free hotdogs for everyone would drastically increase city revenue, improve food availability for those who don't have a secure meal every day, and make good use of the city's already healthy meat industry.\"",
            "        'How will free hotdogs improve city revenue?",
            "        `\"It's one hotdog, Michael. What could it cost, ten dollars?\" Dibbenow said, smirking as he referenced an oft-used quip from the TV show \"Arrested Development\" which is usually reserved to imply the reach are out of touch with reality and the cost of things.",
            "        `\"But no, for real,\" he said, \"hotdogs aren't that expensive; plus the city spends millions of dollars on other things, so why not give the people something fun for once.\"",
            "        \"What 'other things' the city spends millions of dollars on, Dibbenow listed the police force (which currently costs the city $1.3 billion a year).",
            "        `\"They aren't going to like it, but I'm going to take 10 percent of their annual spend, and instead give it back to the people,\" Dibbenow said.\"",
            "        'Ten percent would yield $130 million dollars a year, for the math-averse. That could potentially buy a lot of hotdogs. Taking the Jewel-Osco price of a ten-pack of Oscar Meyer weiners, $130 million would get you 21,666,666 packages. Twenty-one million packages of hotdogs times ten hotdogs a piece is 216,666,666 million hotdogs. Three-hundred and sixty five days in a year with 216 million hotdogs at your disposal evens out to 593,607 hot dogs per day.\"",
            "        \"Half a million hotdogs for 3 million people, per day? The math just doesn't add up.\"",
            "        `\"The thing is, not everyone wants a hotdog a day,\" the mayor said. \"Sometimes you are full, sometimes you're busy, sometimes you brown-bagged your own lunch in the park. This isn't supposed to be the end-all, be all for everyone. It's for people who maybe can't afford food every day of the week. It's for the British tourists who really want to experience Chicago the [[Chicago]] way.\"`",
            "        'When asked about distribution, the mayor said he already had a plan in place.",
            "        `\"There's people out there right now slingin' dogs,\" he said. \"We are going to hire them, make them full-time city employees, give them health insurance, give them PTO, and ask them to help feed the nation.\"",
            "        'A hotdog on every corner? [[What about vegans | www./example/]]?'",
            "        `\"I didn't even consider vegans,' the mayor said.\"",
            "        'A vegan pack of hotdogs runs a bit higher than an all-beef Frank you see on store shelves.",
            "        `\"But again,\" the mayor continued, \"this isn't supposed to be for everyone. This is supposed to be an additional safety net. It just happens to be in the shape of a hotdog.\"",
            "        \"Glizzy Nation? It's still to early to tell. The mayor's ordinance goes up for vote November 2024, just in time for [[re-election]] season.\""
        ],
        tags: [ 'hotdog', 'glizzy', 'chicago', 'ordinance 482', 'mayor Dibbenow' ],
        author: '7',
        led: "On Monday, the mayor of Chicago said the city was unveiling a new plan for increasing city tourism: 'free hotdogs for everyone.'",
        slug: 'chicago-mayor-hotdogs-for-everyone',
        primary: 1,
        secondary: 4,
        breakingFlag: true,
        breakingHeadline: 'Hotdogs for everyone?',
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [],
        image_flag: false
    },
    {
        title: 'Election Summary Report 2023 Larimer County Coordinated Election',
        subhead: 'Summary for: All Contests, All Districts, All Tabulators, All Counting Groups Official Results. November 7, 2023',
        story: [
            "City of Fort Collins Mayor",
            "Candidate Party Total",
            "Jeni Arndt 34,950",
            "Total Votes 37,861",
            "Total",
            "Patricia K. Babbitt WRITE-IN 2,911",
            "City of Loveland Mayor",
            "Candidate Party Total",
            "Jacki Marsh 14,132",
            "Don Overcash 9,009",
            "Janice Ververs 4,801",
            "Total Votes 27,942",
            "City of Fort Collins City Council - District 2",
            "Candidate Party Total",
            "Eric Hamrick 3,364",
            "Julie Pignataro 4,229",
            "Total Votes 7,593"
        ],
        tags: [ 'elections', '2023', 'mayor', 'general elections', 'election summary' ],
        author: '2',
        led: "Total votes counted in Larimer County is 125,341.'",
        slug: "2023-election-summary",
        primary: 2,
        secondary: 8,
        breakingFlag: false,
        breakingHeadline: null,
        footnotes: [],
        footnoteURLs: [
            "www.google.com",
            "www.facebook.com",
            "www.arstechnica.com"
        ],
        sourcesMentioned: [4],
        image_flag: true
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
    console.log('yup')
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
    fetchAllPrimaryCategories,
    fetchSecondaryCatsForPrimary,
    fetchAllPrimaryAndSecondary,
    fetchStoriesByPrimaryCategory,
    fetchStoriesBySecondaryCategory,
    fetchSinglePageStory,
    addPageView,

}