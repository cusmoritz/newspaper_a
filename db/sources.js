const {client} = require('./index');

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
            sourceObj.source_original_contact_date = new Date.now();
        };

        const {rows: sources} = await client.query(`
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
            RETURNING 
            *
        ;
        `, [sourceObj.sourceName, sourceObj.sourcePhone, sourceObj.sourceRace, sourceObj.sourceAge, sourceObj.sourceElectedBool, sourceObj.sourceOccupation, sourceObj.sourceOgContactDate, sourceObj.sourceMostRecentContactDate, sourceObj.sourcePoliceBool]);
        return sources;
    } catch (error) {
        console.log('there was a database error creating a new source.');
        throw error;
    }

};

const fakeSources = [
    // sourceObj.sourceName, 
    // sourceObj.sourcePhone, 
    // sourceObj.sourceRace, 
    // sourceObj.sourceAge, 
    // sourceObj.sourceElectedBool, 
    // sourceObj.sourceOccupation, 
    // sourceObj.sourceOgContactDate, 
    // sourceObj.sourceMostRecentContactDate, 
    // sourceObj.sourcePoliceBool
    {sourceName: "Phillip Jones", sourcePhone: 6302548974, sourceRace: 1, sourceAge: 45, sourceElectedBool: true, sourceOccupation: "City Manager", sourceOgContactDate: Date.now(), sourceMostRecentContactDate: Date.now(), sourcePoliceBool: false},
    {sourceName: "Elizabeth Holmes", sourcePhone: 6305986548, sourceRace: 3, sourceAge: 27, sourceElectedBool: false, sourceOccupation: "Resident", sourceOgContactDate: setDate(d.getDate() - 1), sourceMostRecentContactDate: Date.now(), sourcePoliceBool: false},
    {sourceName: "Hernandez Smith", sourcePhone: 3016598521, sourceRace: 2, sourceAge: 19, sourceElectedBool: false, sourceOccupation: "Student", sourceOgContactDate: setDate(d.getDate() - 101), sourceMostRecentContactDate: setDate(d.getDate() - 1), sourcePoliceBool: false},
    {sourceName: "Andrew Seymore-Hoffman", sourcePhone: 805321654, sourceRace: 1, sourceAge: 87, sourceElectedBool: true, sourceOccupation: "Opperations Manager", sourceOgContactDate: Date.now(), sourceMostRecentContactDate: Date.now(), sourcePoliceBool: true},
    {sourceName: "Shaley Madison", sourcePhone: 6309584521, sourceRace: 4, sourceAge: 31, sourceElectedBool: true, sourceOccupation: "County Clerk", sourceOgContactDate: Date.now() - 10, sourceMostRecentContactDate: Date.now() - 10, sourcePoliceBool: false},
    {sourceName: "Diane Huxley", sourcePhone: 9065687453, sourceRace: 1, sourceAge: 25, sourceElectedBool: false, sourceOccupation: "Business Manager", sourceOgContactDate: Date.now() - 4, sourceMostRecentContactDate: Date.now() - 1, sourcePoliceBool: true},

]

const createFakeSources = (array) => {
    array.forEach(source => {
        createNewSource(source);
        console.log('source', source)
    });
}

createFakeSources(fakeSources);

module.exports = {
    createNewSource,
}