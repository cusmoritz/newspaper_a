
// error functions
const {client} = require('./index');

const logEverything = async (errorObj) => {
    try {
        const date = new Date.now();
        await client.query(`
            INSERT INTO error_log (error_date, error_text)
            VALUES ($1, $2)
            RETURNING *
            ;
        `, [date, errorObj.text])
    } catch (error) {
        throw error;
    }
};