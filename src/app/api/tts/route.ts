import { NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
// Rachel voice - clear, professional female voice
const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        if (!ELEVENLABS_API_KEY) {
            console.warn('ElevenLabs API key not configured');
            return NextResponse.json({ error: 'TTS not configured' }, { status: 503 });
        }

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: text.slice(0, 2500), // ElevenLabs has text limits
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75,
                    style: 0.0,
                    use_speaker_boost: true
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('ElevenLabs API error:', errorText);
            return NextResponse.json({ error: 'TTS generation failed' }, { status: response.status });
        }

        // Return the audio as a blob
        const audioBuffer = await response.arrayBuffer();

        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.byteLength.toString(),
            }
        });

    } catch (error: any) {
        console.error('TTS route error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
