export interface AICompostionParams {
    psychometrics: {
        trauma: number;
        entropy: number;
        cognitiveBias: string;
        rsi: { real: number; symbolic: number; imaginary: number };
    };
    musicalContext: {
        key: string;
        mode: string;
        currentChord: string;
        instrument: string;
    };
    temperature: number;
}

export interface AIMelodyResponse {
    notes: {
        pitch: string; // e.g. "C#4"
        duration: number; // in beats
        velocity: number; // 0-1
    }[];
    reasoning: string;
}

const LM_ENDPOINT = 'http://100.113.4.39:1234/v1/chat/completions';

export class AIMusicClient {
    private static instance: AIMusicClient;
    private isConnected: boolean = false;

    private constructor() { }

    static getInstance(): AIMusicClient {
        if (!AIMusicClient.instance) {
            AIMusicClient.instance = new AIMusicClient();
        }
        return AIMusicClient.instance;
    }

    async checkConnection(): Promise<boolean> {
        try {
            // Simple model list check
            const res = await fetch('http://100.113.4.39:1234/v1/models');
            this.isConnected = res.ok;
            return res.ok;
        } catch (e) {
            this.isConnected = false;
            return false;
        }
    }

    async generateMelody(params: AICompostionParams): Promise<AIMelodyResponse | null> {
        if (!this.isConnected) return null;

        const systemPrompt = `You are a Genius Composer AI. 
        Your task is to generate a short musical phrase (melody) based on the provided PSYCHOMETRIC STATE.
        
        Output Format: JSON only.
        Structure:
        {
            "notes": [ { "pitch": "NoteName+Octave", "duration": float_beats, "velocity": 0.0-1.0 } ],
            "reasoning": "Short explanation of how psychometrics influenced this."
        }
        
        Constraints:
        - High Trauma (>0.8) -> erratic rhythms, dissonance.
        - High Entropy -> random intervals.
        - High Symbolic RSI -> structured, leitmotif-driven.
        `;

        const userPrompt = `
        Psychometrics: ${JSON.stringify(params.psychometrics)}
        Context: ${JSON.stringify(params.musicalContext)}
        Generate a 1-bar melody for ${params.musicalContext.instrument}.
        `;

        try {
            const response = await fetch(LM_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "scrapegoat-music-stage2",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    temperature: params.temperature || 0.7,
                    max_tokens: 500
                })
            });

            if (!response.ok) return null;

            const data = await response.json();
            const content = data.choices[0].message.content;

            // Attempt to parse JSON from content (it might be wrapped in markdown blocks)
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]) as AIMelodyResponse;
            }
            return JSON.parse(content);

        } catch (error) {
            console.error("AI Generation Failed:", error);
            return null;
        }
    }
}
