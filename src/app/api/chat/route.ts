import { NextResponse } from 'next/server';

const QDRANT_URL = 'http://localhost:6333';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function POST(req: Request) {
    try {
        const { message, history } = await req.json();

        // 1. Query Qdrant for semantic context (optional)
        let qdrantContext: any[] = [];
        try {
            const qdrantRes = await fetch(`${QDRANT_URL}/collections/ner11_entities_hierarchical/points/search`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ vector: [], limit: 3, with_payload: true })
            });
            if (qdrantRes.ok) {
                const data = await qdrantRes.json();
                qdrantContext = data.result || [];
            }
        } catch (e) {
            console.error('Qdrant lookup failed:', e);
        }

        // 2. Synthesize AI Response - OpenAI GPT-4o primary, Perplexity fallback
        let aiResponse = "I am processing your input through the Psychometric Calculus.";
        const systemPrompt = 'You are the AEON Psychometric Calculus Engine, a sophisticated AI for analyzing dialogue and sonifying security states. Respond concisely and analytically.';

        // Try OpenAI GPT-4o
        if (OPENAI_API_KEY) {
            try {
                const oaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        model: 'gpt-4o-mini',
                        messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }],
                        max_tokens: 500
                    })
                });
                if (oaiRes.ok) {
                    const data = await oaiRes.json();
                    aiResponse = data.choices[0].message.content || "Analysis complete.";
                } else {
                    console.warn('OpenAI failed:', oaiRes.status, await oaiRes.text());
                }
            } catch (e) {
                console.error('OpenAI call failed:', e);
            }
        }

        // Fallback to Perplexity if OpenRouter didn't work
        if (aiResponse.includes("processing your input") && PERPLEXITY_API_KEY) {
            try {
                const perpRes = await fetch('https://api.perplexity.ai/chat/completions', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`, 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'sonar',
                        messages: [{ role: 'system', content: systemPrompt }, ...history, { role: 'user', content: message }]
                    })
                });
                if (perpRes.ok) {
                    const data = await perpRes.json();
                    aiResponse = (data.choices[0].message.content || "").replace(/\[\d+\]/g, '').trim() || "Analysis complete.";
                }
            } catch (e) {
                console.error('Perplexity fallback failed:', e);
            }
        }

        // 3. (Optional) ElevenLabs Voice Generation
        // In a real production route, we'd return a URL or a Base64 stream.
        // For now, we'll return the text and trigger ElevenLabs client-side or in a follow-up.

        return NextResponse.json({
            response: aiResponse,
            context: qdrantContext,
            metrics: { /* Placeholder for backend calculated metrics if needed */ }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
