const {client} = require('./index.js');
console.log('client', client);
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

    try {
        if (!sourceObj.source_original_contact_date) {
            sourceObj.source_original_contact_date = Date.now();
        };

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
            source_police_officer
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        ;
        `, [sourceObj.sourceName, sourceObj.sourcePhone, sourceObj.sourceRace, sourceObj.sourceAge, sourceObj.sourceElectedBool, sourceObj.sourceOccupation, sourceObj.sourceOgContactDate, sourceObj.sourceMostRecentContactDate, sourceObj.sourcePoliceBool]);
        console.log('input', input)
        return sources;
    } catch (error) {
        console.log('there was a database error creating a new source.');
        throw error;
    }
};

const getOneSource = (sourceId) => {
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

const getAllSources = () => {
    try {
        const {rows: allSources} = await client.query(`
        SELECT * FROM sources
        ;
        `)
    } catch (error) {
        console.log('there was a database error fetching all sources');
        throw error;
    }
};

const updateSourceContactDate = (sourceId, date) => {
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

const updateSourcePhoneNumber = (sourceId, newPhone) => {
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

const updateSourceOccupation = (sourceId, newOccupation) => {
    try {
        const {rows: updatedSource} = await client.query(`
        UPDATE sources
        SET source_previous_occupation = array_append(source_previous_occupation, $2)
        WHERE source_id = $1
        RETURNING *
        ;

        UPDATE sources.source_occupation
        WHERE source_id = $1
        VALUES ($2)
        RETURNING *
        ;
        `, [sourceId, newOccupation]);
        return updatedSource;
    } catch (error) {
        console.log('there was a database error updating a source occupation');
        throw error;
    }
}

const fakeSources = [
    {sourceName: "Phillip Jones", sourcePhone: "6302548974", sourceRace: 1, sourceAge: 45, sourceElectedBool: true, sourceOccupation: "City Manager", sourceOgContactDate: Date.now() - 8, sourceMostRecentContactDate: Date.now() - 4, sourcePoliceBool: false},
    {sourceName: "Elizabeth Holmes", sourcePhone: "6305986548", sourceRace: 3, sourceAge: 27, sourceElectedBool: false, sourceOccupation: "Resident", sourceOgContactDate: Date.now() - 1, sourceMostRecentContactDate: Date.now(), sourcePoliceBool: false},
    {sourceName: "Hernandez Smith", sourcePhone: "3016598521", sourceRace: 2, sourceAge: 19, sourceElectedBool: false, sourceOccupation: "Student", sourceOgContactDate: Date.now() - 101, sourceMostRecentContactDate: Date.now() - 1, sourcePoliceBool: false},
    {sourceName: "Andrew Seymore-Hoffman", sourcePhone: "805321654", sourceRace: 1, sourceAge: 87, sourceElectedBool: true, sourceOccupation: "Opperations Manager", sourceOgContactDate: Date.now(), sourceMostRecentContactDate: Date.now(), sourcePoliceBool: true},
    {sourceName: "Shaley Madison", sourcePhone: "6309584521", sourceRace: 4, sourceAge: 31, sourceElectedBool: true, sourceOccupation: "County Clerk", sourceOgContactDate: Date.now() - 10, sourceMostRecentContactDate: Date.now() - 10, sourcePoliceBool: false},
    {sourceName: "Diane Huxley", sourcePhone: "9065687453", sourceRace: 1, sourceAge: 25, sourceElectedBool: false, sourceOccupation: "Business Manager", sourceOgContactDate: Date.now() - 4, sourceMostRecentContactDate: Date.now() - 1, sourcePoliceBool: true},

]

const createFakeSources = (sourceArray) => {
    console.log('we are creating sources')
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
    // createFakeSources,
    // fakeSources,
};