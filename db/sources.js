const {client} = require('./index.js');

////////////////// SOURCE FUNCTIONS ////////////////

const createNewSource = async (sourceObj) => {
    // source_id SERIAL PRIMARY KEY,
    // source_name VARCHAR(300),
    // source_phone_num INT,
    // source_race INT, -- REFERENCES source_identity table
    // source_age INT,
    // source_elected_official BOOLEAN NOT NULL DEFAULT FALSE,
    // source_occupation VARCHAR(300),
    // source_original_contact_date DATE NOT NULL DEFAULT CURRENT_DATE,
    // source_most_recent_contact_date DATE NOT NULL DEFAULT CURRENT_DATE,
    // source_police_officer BOOLEAN NOT NULL DEFAULT FALSE
    // source_location VARCHAR NOT NULL

    try {
        const {rows: input} = await client.query(`
        INSERT INTO sources (
            source_name, 
            source_phone_num, 
            source_race, 
            source_age, 
            source_elected_official,
            source_occupation,
            source_original_contact_date,
            source_most_recent_contact_date,
            source_police_officer,
            source_location
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
        ;
        `, [sourceObj.sourceName, sourceObj.sourcePhone, sourceObj.sourceRace, sourceObj.sourceAge, sourceObj.sourceElectedBool, sourceObj.sourceOccupation, sourceObj.sourceOgContactDate, sourceObj.sourceMostRecentContactDate, sourceObj.sourcePoliceBool, sourceObj.sourceLocation]);
        //console.log('input', input)
        return input;
    } catch (error) {
        console.log('there was a database error creating a new source.');
        throw error;
    }
};

const getOneSource = async (sourceId) => {
    try {
        const {rows: source} = await client.query(`
            SELECT * FROM sources
            WHERE source_id = $1
            ;
        `, [sourceId]);
        return source;
    } catch (error) {
        console.log('there was a database error fetching one source');
        throw error;
    }
};

const getAllSources = async () => {
    try {
        const {rows: allSources} = await client.query(`
        SELECT * FROM sources
        ;
        `);
        return allSources;
    } catch (error) {
        console.log('there was a database error fetching all sources');
        throw error;
    }
};

const updateSourceContactDate = async (sourceId, date) => {
    try {
        const {rows: updatedSource} = await client.query(`
        UPDATE sources.source_most_recent_contact_date
        WHERE source_id = $1
        VALUES ($2)
        RETURNING *
        ;
        `, [sourceId, date]);
        return updatedSource;
    } catch (error) {
        console.log('there was a database error updating a contact date');
        throw error;
    }
};

const updateSourcePhoneNumber = async (sourceId, newPhone) => {
    try {
        const {rows: updatedSource} = await client.query(`
        UPDATE sources.source_phone_num
        WHERE source_id = $1
        VALUES ($2)
        RETURNING *
        ;
        `, [sourceId, newPhone]);
        return updatedSource;
    } catch (error) {
        console.log('there was a datebase error updating a source phone number');
        throw error;      
    }
};

const updateSourceOccupation = async (sourceId, newOccupation) => {
    try {
        const {rows: updatedSource} = await client.query(`
        UPDATE sources
        SET source_previous_occupation = array_append(source_previous_occupation, $2)
        WHERE source_id = $1
        RETURNING *
        ;

        UPDATE sources
        SET source_occupation = $2
        WHERE source_id = $1
        RETURNING *
        ;
        `, [sourceId, newOccupation]);
        return updatedSource;
    } catch (error) {
        console.log('there was a database error updating a source occupation');
        throw error;
    }
};

const updateSourceElectedOfficial = async (sourceId, bool) => {
    try {
        const {rows: updatedSource} = await client.query(`
        UPDATE sources
        SET source_elected_official = $2
        WHERE source_id = $1
        RETURNING *
        ;
        `, [sourceId, bool]);
        return updatedSource;
    } catch (error) {
        console.log('there was a database error updating a source elected status');
        throw error;
    }
};

const getStorysForSingleSource = async (sourceId) => {
    try {
        const {rows: source} = await client.connect(`
        SELECT * FROM sources
        WHERE source_id = $1
        ;
        `, [sourceId]); // might as well get the source as well

        let related = [];

        for (let i = 0; i < source.length; i++) {
            const {rows: [story]} = await client.query(`
            SELECT * FROM storys
            WHERE story_id = $1
            ;
            `, [source.storys_mentioned[i]]);
            related.push(story)
        }
        console.log('related', related);
    } catch (error) {
        console.log('there was a database error fetching related stories for that source.');
        throw error;
    }
}

const fakeSources = [
    {sourceName: "Phillip Jones", sourcePhone: "6302548974", sourceRace: 1, sourceAge: 45, sourceElectedBool: true, sourceOccupation: "City Manager", sourceOgContactDate: '2001-09-28', sourceMostRecentContactDate: '2024-09-28', sourcePoliceBool: false, sourceLocation: "Oklahoma, MO"},
    {sourceName: "Elizabeth Holmes", sourcePhone: "6305986548", sourceRace: 3, sourceAge: 27, sourceElectedBool: false, sourceOccupation: "Resident", sourceOgContactDate: '2024-05-15', sourceMostRecentContactDate: '2024-06-15', sourcePoliceBool: false, sourceLocation: "Boulder, CO"},
    {sourceName: "Hernandez Smith", sourcePhone: "3016598521", sourceRace: 2, sourceAge: 19, sourceElectedBool: false, sourceOccupation: "Student", sourceOgContactDate: '2024-06-15', sourceMostRecentContactDate: '2024-08-01', sourcePoliceBool: false, sourceLocation: "Anckorage, AK"},
    {sourceName: "Andrew Seymore-Hoffman", sourcePhone: "805321654", sourceRace: 1, sourceAge: 87, sourceElectedBool: true, sourceOccupation: "Opperations Manager", sourceOgContactDate: '2024-08-01', sourceMostRecentContactDate: '2024-07-04', sourcePoliceBool: true, sourceLocation: "Milwaukee, MN"},
    {sourceName: "Shaley Madison", sourcePhone: "6309584521", sourceRace: 4, sourceAge: 31, sourceElectedBool: true, sourceOccupation: "County Clerk", sourceOgContactDate: '2024-07-04', sourceMostRecentContactDate: '2024-07-04', sourcePoliceBool: false, sourceLocation: "Springfield, KY"},
    {sourceName: "Diane Huxley", sourcePhone: "9065687453", sourceRace: 1, sourceAge: 25, sourceElectedBool: false, sourceOccupation: "Business Manager", sourceOgContactDate: '2024-07-04', sourceMostRecentContactDate: '2024-07-04', sourcePoliceBool: true, sourceLocation: "Springfield, IL"}
];

const createFakeSources = (sourceArray) => {
    //console.log('we are creating sources')
    sourceArray.forEach(source => {
        createNewSource(source);
        //console.log('source', source)
    });
};

createFakeSources(fakeSources);

module.exports = {
    createNewSource,
    getOneSource,
    getAllSources,
    updateSourceContactDate,
    updateSourcePhoneNumber,
    updateSourceOccupation,
    updateSourceElectedOfficial,
    getStorysForSingleSource,
    // createFakeSources,
    // fakeSources,
};