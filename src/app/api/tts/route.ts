import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { text } = await req.json()

        const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
        if (!ELEVENLABS_API_KEY) {
            return NextResponse.json({ error: 'ElevenLabs API Key missing' }, { status: 500 })
        }

        // Rachel Voice ID: 21m00Tcm4TlvDq8ikWAM
        const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            body: JSON.stringify({
                text: text,
                model_id: "eleven_monolingual_v1",
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            }),
        })

        if (!response.ok) {
            const errorText = await response.text()
            console.error('ElevenLabs Error:', errorText)
            return NextResponse.json({ error: 'Failed to generate speech' }, { status: response.status })
        }

        const audioBuffer = await response.arrayBuffer()

        return new NextResponse(audioBuffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioBuffer.byteLength.toString(),
            },
        })
    } catch (error) {
        console.error('TTS Route Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
