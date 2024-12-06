const {client} = require('./index');

const fetchPageViewsForOneStoryOneDate = async(storyId, year, month, day) => {
    //console.log('database date;, ', storyId + " , " + year, month, day);

    try {
        const {rows: [views]} = await client.query(`
        SELECT * FROM story_all_views
        WHERE story_id = $1
        AND story_view_year = $2
        AND story_view_month = $3
        AND story_view_day = $4
        ;
        `, [storyId, year, month, day]);
        //console.log('database views', views);
        return views;
    } catch (error) {
        console.log(`there was a database error in fetchPageViewsForOneStoryOneDate fetching views for story id ${storyId}`);
        throw error;
    }
}

const checkViewDateExists = async(storyId, year, month, day) => {
    try {
        const {rows: [data]} = await client.query(`
        SELECT EXISTS (select story_id, story_view_year, story_view_month, story_view_day from story_all_views where story_id = $1 AND story_view_year = $2 AND story_view_month = $3 AND story_view_day = $4);
        `, [storyId, year, month, day]);
        //console.log('data in checkView Date: ', data)
        return data.exists; // bool
    } catch (error) {
        console.log(`there was a database error in checkViewDateExists for story id ${storyId}`);
        throw error;
    }
};

const updatePageView = async(storyId, viewYear, viewMonth, viewDay) => {
    try {
        const {rows: pageViews} = await client.query(`
        UPDATE story_all_views
        SET _${viewHour} = _${viewHour} + 1
        WHERE story_id = $1
        AND story_view_year = $2
        AND story_view_month = $3
        AND story_view_day = $4
        RETURNING *
        ;
    `, [storyId, viewYear, viewMonth, viewDay]);
    //console.log('page views db: ', pageViews);
    return pageViews;
    } catch (error) {
        console.log(`there was a database error in updatePageView for story id ${storyId}`);
        throw error;
    }
};

const addNewViewRow = async (storyId, viewYear, viewMonth, viewDay, viewHour) => {
    try {
        const {rows: [newRow]} = await client.query(`
        INSERT INTO story_all_views (story_id, story_view_year, story_view_month, story_view_day, _${viewHour})
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        ;
    `, [storyId, viewYear, viewMonth, viewDay, viewHour]);
    return newRow;
    } catch (error) {
        console.log(`there was a database error in addNewViewRow for story id ${storyId}`);
        throw error;
    }
}

const addPageView = async (storyId, date) => { // we will remove the date at some point, because pageView shoult always be new Date()
    //console.log('function', date.getHours())
    // const viewDate = new Date();
    // let viewYear = viewDate.getFullYear(); // 2024
    // let viewMonth = viewDate.getMonth() + 1; // 0 to 11
    // let viewDay = viewDate.getDate(); // 1 to 31
    // let viewHour = viewDate.getHours();
    // if (date != undefined || date != null) {
        viewYear = date.getFullYear();
        viewMonth = date.getMonth() + 1;
        viewDay = date.getDate();
        viewHour = date.getHours();
    // }
    try {
        return checkViewDateExists(storyId, viewYear, viewMonth, viewDay).then(function (response) {
            if (response === true) { // already exists, update
                return updatePageView(storyId, viewYear, viewMonth, viewDay);
            } else { // doesn't exist, create row
                return addNewViewRow(storyId, viewYear, viewMonth, viewDay, viewHour);
            }
        })
    } catch (error) {
        console.log(`there was a database error in addPageView for story id ${storyId}`);
        throw error;
    }
};

const createFakeDefaults = async () => {
    try {
        const {rows: data} = await client.query(`
            INSERT INTO story_all_views (story_id, story_view_year, story_view_month, story_view_day)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            ;
        `, [11, 2024, 12, 5]);
        return data;
    } catch (error) {

    }
};

const createFakePageViews = async () => {
    for (let i = 0; i <= 400; i++) {
        let year = 2024;
        let month = 11; // 0 index when creating date, 11 = 12 after Date()
        let day = 7; // also 0 index
        let hour = Math.random() * 23; // 23 hours
        let date = new Date(year, month, day, hour);
        //console.log('fake', date)
        await addPageView(11, date);
    }
};

createFakeDefaults()
createFakePageViews();

module.exports = {
    addPageView,
    fetchPageViewsForOneStoryOneDate,

}