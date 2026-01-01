const { Client } = require('pg');
const config = { user: 'postgres', password: 'postgres', host: '172.30.253.47', port: 5432, database: 'oxot_mpn' };
async function main() {
    const client = new Client(config);
    try {
        await client.connect();
        // Insert
        const resInsert = await client.query("INSERT INTO presets (name, adjustments) VALUES ($1, $2) RETURNING id", ['Test Preset', { tempo: 120 }]);
        console.log('Inserted ID:', resInsert.rows[0].id);
        // Select
        const resSelect = await client.query("SELECT * FROM presets");
        console.log('Presets count:', resSelect.rowCount);
        // Clean up
        await client.query("DELETE FROM presets WHERE id = $1", [resInsert.rows[0].id]);
        console.log('Test preset deleted.');
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await client.end();
    }
}
main();
