import { useState, useEffect } from 'react';

// Types
export interface NewsArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface AIAnalysisResult {
    summary: string;
    confidence: number;
    sources: string[];
}

export interface GlobalIncident {
    lat: number;
    lng: number;
    city: string;
    country: string;
    description: string;
    severity: number; // 0.1 to 1.0
}

export interface EPSSScore {
    cve: string;
    epss: string;
    percentile: string;
    date: string;
}

// API Keys (Injected by Vite)
const NEWS_API_KEY = process.env.NEWSAPI_KEY;
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

// Hook for Live News
export const useLiveNews = (query: string = 'cybersecurity') => {
    const [news, setNews] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            if (!NEWS_API_KEY) {
                console.warn('NewsAPI Key missing');
                setLoading(false);
                return;
            }

            try {
                // Use the proxy path configured in vite.config.ts
                const response = await fetch(`/api/news/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`);

                if (!response.ok) {
                    throw new Error(`NewsAPI Error: ${response.statusText}`);
                }

                const data = await response.json();
                if (data.status === 'ok') {
                    setNews(data.articles);
                } else {
                    throw new Error(data.message || 'Failed to fetch news');
                }
            } catch (err: any) {
                console.error('Error fetching news:', err);
                setError(err.message);
                // Fallback mock data for demo if API fails
                setNews(MOCK_NEWS);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
        const interval = setInterval(fetchNews, 300000); // Refresh every 5 mins
        return () => clearInterval(interval);
    }, [query]);

    return { news, loading, error };
};

// Hook for AI Analysis (Perplexity)
export const useAIAnalysis = (prompt: string) => {
    const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const analyze = async () => {
        if (!PERPLEXITY_API_KEY) {
            console.warn('Perplexity API Key missing');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/perplexity/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'sonar-reasoning-pro', // Using the reasoning model for deep analysis
                    messages: [
                        { role: 'system', content: 'You are AEON, a Tier-1 Cyber Threat Intelligence AI. Provide a concise, high-impact tactical analysis of the following threat. Focus on attribution, impact, and mitigation. Output format: Markdown.' },
                        { role: 'user', content: prompt }
                    ]
                })
            });

            if (!response.ok) {
                throw new Error(`Perplexity Error: ${response.statusText}`);
            }

            const data = await response.json();
            const content = data.choices[0]?.message?.content || 'Analysis failed.';

            setAnalysis({
                summary: content,
                confidence: 0.95, // Mock confidence for now
                sources: [] // Perplexity citations if available
            });

        } catch (err: any) {
            console.error('Error running AI analysis:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { analyze, analysis, loading, error };
};

// Hook for Global Incidents (Perplexity -> GeoJSON)
export const useGlobalIncidents = () => {
    const [incidents, setIncidents] = useState<GlobalIncident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncidents = async () => {
            if (!PERPLEXITY_API_KEY) {
                setIncidents(MOCK_INCIDENTS);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/perplexity/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'sonar-reasoning-pro',
                        messages: [
                            { role: 'system', content: 'You are a Cyber Threat Intelligence Analyst. List 15 recent major cyber incidents, outages, or attacks from the last 7 days. Return ONLY a JSON array with objects containing: city, country, lat (number), lng (number), description (short string), severity (number 0.1-1.0). No markdown, just raw JSON.' },
                            { role: 'user', content: 'List recent cyber incidents.' }
                        ]
                    })
                });

                if (!response.ok) throw new Error('Failed to fetch incidents');

                const data = await response.json();
                const content = data.choices[0]?.message?.content;

                // Clean up markdown code blocks if present
                const jsonStr = content.replace(/```json\n?|\n?```/g, '');
                const parsed = JSON.parse(jsonStr);

                setIncidents(parsed);
            } catch (err) {
                console.error('Error fetching global incidents:', err);
                setIncidents(MOCK_INCIDENTS);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    return { incidents, loading };
};

// Hook for EPSS Scores (FIRST.org)
export const useEPSS = (cveId: string | null) => {
    const [score, setScore] = useState<EPSSScore | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cveId) return;

        const fetchEPSS = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.first.org/data/v1/epss?cve=${cveId}`);
                if (!response.ok) throw new Error('Failed to fetch EPSS');

                const data = await response.json();
                if (data.status === 'OK' && data.data.length > 0) {
                    setScore(data.data[0]);
                }
            } catch (err) {
                console.error('Error fetching EPSS:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEPSS();
    }, [cveId]);

    return { score, loading };
};

// Mock Data Fallback
const MOCK_NEWS: NewsArticle[] = [
    {
        source: { id: 'wired', name: 'Wired' },
        author: 'Andy Greenberg',
        title: 'New Zero-Day in Cisco IOS XE Affects Thousands of Devices',
        description: 'A critical vulnerability allows remote code execution on Cisco networking gear.',
        url: '#',
        urlToImage: null,
        publishedAt: new Date().toISOString(),
        content: null
    },
    {
        source: { id: 'the-verge', name: 'The Verge' },
        author: 'Tom Warren',
        title: 'Microsoft Detects Nation-State Activity Targeting Critical Infrastructure',
        description: 'Volt Typhoon group is actively probing US utility grids.',
        url: '#',
        urlToImage: null,
        publishedAt: new Date(Date.now() - 3600000).toISOString(),
        content: null
    }
];

const MOCK_INCIDENTS: GlobalIncident[] = [
    { city: "Kyiv", country: "Ukraine", lat: 50.4501, lng: 30.5234, description: "DDoS attack on banking sector", severity: 0.8 },
    { city: "Taipei", country: "Taiwan", lat: 25.0330, lng: 121.5654, description: "APT intrusion in semiconductor fab", severity: 0.9 },
    { city: "New York", country: "USA", lat: 40.7128, lng: -74.0060, description: "Financial services ransomware attempt", severity: 0.7 },
    { city: "London", country: "UK", lat: 51.5074, lng: -0.1278, description: "Healthcare data breach", severity: 0.6 },
    { city: "Tel Aviv", country: "Israel", lat: 32.0853, lng: 34.7818, description: "State-sponsored phishing campaign", severity: 0.8 },
    { city: "Mumbai", country: "India", lat: 19.0760, lng: 72.8777, description: "Power grid probe detected", severity: 0.9 },
    { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, description: "Port logistics cyber disruption", severity: 0.7 }
];
