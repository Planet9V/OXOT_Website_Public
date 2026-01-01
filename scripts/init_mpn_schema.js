const { Client } = require('pg');

const config = {
    user: 'postgres',
    password: 'postgres',
    host: '172.30.253.47',
    port: 5432,
    database: 'oxot_mpn'
};

async function initSchema() {
    const client = new Client(config);
    try {
        await client.connect();
        console.log('Connected to oxot_mpn.');

        // 1. Presets Table
        await client.query(`
            CREATE TABLE IF NOT EXISTS presets (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name TEXT NOT NULL,
                description TEXT,
                adjustments JSONB NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                version INTEGER DEFAULT 1
            );
        `);
        console.log('Table "presets" ensured.');

        // 2. Composition Rules Table (AI Memory)
        await client.query(`
            CREATE TABLE IF NOT EXISTS composition_rules (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                trait TEXT NOT NULL,
                musical_mapping JSONB NOT NULL,
                confidence_score FLOAT DEFAULT 0.5,
                source_model TEXT
            );
        `);
        console.log('Table "composition_rules" ensured.');

    } catch (err) {
        console.error('Error initializing schema:', err);
    } finally {
        await client.end();
    }
}

initSchema();
