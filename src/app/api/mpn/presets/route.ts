import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
    try {
        const result = await db.query('SELECT * FROM presets ORDER BY created_at DESC');
        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error('Error fetching presets:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, description, adjustments } = body;

        // Simple validation
        if (!name || !adjustments) {
            return NextResponse.json({ error: 'Name and adjustments are required' }, { status: 400 });
        }

        const result = await db.query(
            'INSERT INTO presets (name, description, adjustments) VALUES ($1, $2, $3) RETURNING *',
            [name, description, adjustments]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error('Error creating preset:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
