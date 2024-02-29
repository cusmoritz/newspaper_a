
// error functions
const {client} = require('./index');

const logEverything = async (errorObj) => {
    try {
        console.log('client', client)
        const date = Date.now();
        await client.query(`
            INSERT INTO error_log (error_date, error_text)
            VALUES ($1, $2)
            RETURNING *
            ;
        `, [date, errorObj.text]);
        return;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    logEverything,
}