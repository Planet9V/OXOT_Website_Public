const { Client } = require('pg');

const config = {
    user: 'postgres',
    password: 'postgres',
    host: '172.30.253.47',
    port: 5432,
    database: 'postgres' // Connect to default DB to create new one
};

async function initDB() {
    const client = new Client(config);
    try {
        await client.connect();

        // Check if DB exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'oxot_mpn'");

        if (res.rowCount === 0) {
            console.log('Database oxot_mpn does not exist. Creating...');
            // Cannot run CREATE DATABASE inside a transaction block, so just run it directly
            await client.query('CREATE DATABASE oxot_mpn');
            console.log('Database oxot_mpn created successfully.');
        } else {
            console.log('Database oxot_mpn already exists.');
        }
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await client.end();
    }
}

initDB();
