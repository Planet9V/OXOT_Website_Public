"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Square, RotateCcw, Activity, Music, Mic2, FileText,
    BarChart3, Volume2, VolumeX, Shield, Users, Zap, Brain,
    Layers, Cpu, Layout, Info, Waves, Terminal
} from 'lucide-react';
import { NeoRiemannianTonnetz } from './NeoRiemannianTonnetz';

interface MPNMetrics {
    trauma: number;      // Dissonance (R)
    entropy: number;     // Complexity (H)
    baseline: number;    // Stability (B)
    arrhythmia: number;  // Tempo fluctuation (α)
    key: string;         // Musical Key
    tempo: number;       // BPM
    clef: string;        // Context
    health: number;      // 0-10
}

interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly length: number;
    [index: number]: SpeechRecognitionAlternative;
    isFinal: boolean;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface ActorPresence {
    id: string;
    disc: 'D' | 'I' | 'S' | 'C';
    ocean: { o: number; c: number; e: number; a: number; n: number };
    severity: number;
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const DEFAULT_TEXT = `OFFICER: System status report?
ENGINEER: We're seeing some anomalous readings in Sector 7. Nothing critical yet, but the thermal output is fluctuating.
OFFICER: "Fluctuating"? Since when?
ENGINEER: Since 0400. It's... it's like a heartbeat. But irregular.
OFFICER: That's impossible. Review the logs. 
ENGINEER: I tried. The logs are... they're gone.`;

export function MPNEngineDemo() {
    const [inputText, setInputText] = useState(DEFAULT_TEXT);
    const [analyzing, setAnalyzing] = useState(false);
    const [metrics, setMetrics] = useState<MPNMetrics | null>(null);
    const [actors, setActors] = useState<ActorPresence[]>([]);
    const [activeChord, setActiveChord] = useState<string[]>(["C", "E", "G"]);
    const [activeMode, setActiveMode] = useState<'major' | 'minor'>('major');
    const [lastOp, setLastOp] = useState<'R' | 'L' | 'P' | 'PLP' | undefined>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');

    // Audio Refs
    const audioCtx = useRef<AudioContext | null>(null);
    const masterGain = useRef<GainNode | null>(null);
    const delayNode = useRef<DelayNode | null>(null);
    const feedbackGain = useRef<GainNode | null>(null);
    const timerRef = useRef<any>(null);
    const recognitionRef = useRef<any>(null);

    // Initial calculation for metrics
    useEffect(() => {
        if (!metrics) handleAnalyze();
    }, []);

    const getNoteAt = (note: string, interval: number) => NOTES[(NOTES.indexOf(note) + interval) % 12];

    const applyTransformation = (triad: string[], mode: 'major' | 'minor', op: 'R' | 'L' | 'P'): { triad: string[], mode: 'major' | 'minor' } => {
        const [r, t, f] = triad;
        if (op === 'P') {
            return { triad: [r, mode === 'major' ? getNoteAt(t, -1) : getNoteAt(t, 1), f], mode: mode === 'major' ? 'minor' : 'major' };
        }
        if (op === 'R') {
            if (mode === 'major') return { triad: [f, r, getNoteAt(t, 2)], mode: 'minor' }; // Corrected R
            return { triad: [r, f, getNoteAt(t, -2)], mode: 'major' };
        }
        if (op === 'L') {
            if (mode === 'major') return { triad: [t, f, getNoteAt(r, -1)], mode: 'minor' };
            return { triad: [r, getNoteAt(t, 1), f], mode: 'major' };
        }
        return { triad, mode };
    };

    const calculateMetrics = (text: string): { metrics: MPNMetrics, actors: ActorPresence[] } => {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const negativeKeywords = ['fail', 'critical', 'error', 'warning', 'gone', 'impossible', 'anomaly', 'fluctuating', 'danger', 'attack', 'compromised'];
        const traumaCount = words.filter(w => negativeKeywords.some(nk => w.toLowerCase().includes(nk))).length;

        const trauma = Math.min(1, traumaCount / (words.length * 0.05 || 1));
        const entropy = new Set(words.map(w => w.toLowerCase())).size / (words.length || 1);
        const arrhythmia = Math.min(1, (words.length / (text.length || 1)) * 5);
        const baseline = Math.max(0, 1 - (trauma * 0.7 + arrhythmia * 0.3));

        const health = Math.floor((1 - trauma) * 10);
        const clef = trauma > 0.6 ? '♯ War Room' : health > 8 ? '♮ Ops Floor' : '♭ Boardroom';
        const keys = ['C Major', 'G Major', 'A Minor', 'D Minor'];
        const selectedKey = trauma > 0.5 ? keys[2] : keys[0];

        const actorList: ActorPresence[] = [];
        if (text.includes('OFFICER')) actorList.push({ id: 'OFFICER', disc: 'D', ocean: { o: 0.5, c: 0.8, e: 0.9, a: 0.3, n: 0.4 }, severity: trauma });
        if (text.includes('ENGINEER')) actorList.push({ id: 'ENGINEER', disc: 'C', ocean: { o: 0.3, c: 0.9, e: 0.3, a: 0.6, n: 0.7 }, severity: trauma * 0.8 });
        if (actorList.length === 0) actorList.push({ id: 'SYSTEM', disc: 'S', ocean: { o: 0.5, c: 0.5, e: 0.5, a: 0.5, n: 0.2 }, severity: trauma });

        return {
            metrics: { trauma, entropy, baseline, arrhythmia, key: selectedKey, tempo: 70 + trauma * 60, clef, health },
            actors: actorList
        };
    };

    const handleAnalyze = () => {
        setAnalyzing(true);
        setTimeout(() => {
            const { metrics: results, actors: actorRes } = calculateMetrics(inputText);
            setMetrics(results);
            setActors(actorRes);
            setAnalyzing(false);

            let op: 'R' | 'L' | 'P' | 'PLP' | undefined;
            if (results.trauma > 0.8) op = 'PLP';
            else if (results.trauma > 0.4) op = 'P';
            else if (results.baseline > 0.7) op = 'R';
            else op = 'L';
            setLastOp(op);

            if (op && op !== 'PLP') {
                const { triad, mode } = applyTransformation(activeChord, activeMode, op as any);
                setActiveChord(triad);
                setActiveMode(mode);
            } else if (op === 'PLP') {
                setActiveChord(["Db", "F", "Ab"]);
                setActiveMode('major');
            }

            if (isPlaying) stopAudio();
        }, 600);
    };

    // --- SPEECH RECOGNITION ENGINE ---
    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const startRecording = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsRecording(true);
            setInterimTranscript('');
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalOutput = '';
            let interimOutput = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalOutput += event.results[i][0].transcript;
                } else {
                    interimOutput += event.results[i][0].transcript;
                }
            }

            if (finalOutput) {
                setInputText(prev => {
                    const newText = prev + (prev.endsWith('\n') ? '' : '\n') + finalOutput.trim();
                    return newText;
                });
            }
            setInterimTranscript(interimOutput);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            stopRecording();
        };

        recognition.onend = () => {
            setIsRecording(false);
            setInterimTranscript('');
        };

        recognitionRef.current = recognition;
        recognition.start();
    };

    const stopRecording = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        setIsRecording(false);
    };

    // Auto-analyze when text changes from recording
    useEffect(() => {
        if (isRecording && inputText) {
            const { metrics: results, actors: actorRes } = calculateMetrics(inputText);
            setMetrics(results);
            setActors(actorRes);

            // Auto-update transformations without full "Analyze" delay for real-time feel
            let op: 'R' | 'L' | 'P' | 'PLP' | undefined;
            if (results.trauma > 0.8) op = 'PLP';
            else if (results.trauma > 0.4) op = 'P';
            else if (results.baseline > 0.7) op = 'R';
            else op = 'L';
            setLastOp(op);

            if (op && op !== 'PLP') {
                const { triad, mode } = applyTransformation(activeChord, activeMode, op as any);
                setActiveChord(triad);
                setActiveMode(mode);
            }
        }
    }, [inputText]);

    // --- ENHANCED SOUND ENGINE ---
    const initAudio = () => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            masterGain.current = audioCtx.current.createGain();
            masterGain.current.gain.value = 0.3;

            // FX Chain
            delayNode.current = audioCtx.current.createDelay(1.0);
            delayNode.current.delayTime.value = 0.4;
            feedbackGain.current = audioCtx.current.createGain();
            feedbackGain.current.gain.value = 0.2;

            masterGain.current.connect(delayNode.current);
            delayNode.current.connect(feedbackGain.current);
            feedbackGain.current.connect(delayNode.current);
            delayNode.current.connect(audioCtx.current.destination);

            masterGain.current.connect(audioCtx.current.destination);
        }
    };

    const playFMSynth = (freq: number, disc: string, ocean: any, length: number) => {
        if (!audioCtx.current || !masterGain.current) return;

        const carrier = audioCtx.current.createOscillator();
        const modulator = audioCtx.current.createOscillator();
        const modGain = audioCtx.current.createGain();
        const carrierGain = audioCtx.current.createGain();

        // FM Core: Modulator -> modGain -> Carrier Frequency
        modulator.frequency.value = freq * (disc === 'C' ? 2 : 0.5); // Modulation Ratio
        modGain.gain.value = ocean.o * 200 * (1 + ocean.n); // Index

        carrier.frequency.value = freq;
        carrier.type = disc === 'D' ? 'sawtooth' : 'sine';

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);
        carrier.connect(carrierGain);
        carrierGain.connect(masterGain.current);

        // Envelopes
        const now = audioCtx.current.currentTime;
        const attack = 0.05 + (1 - ocean.e) * 0.1;
        const decay = length + ocean.c;

        carrierGain.gain.setValueAtTime(0, now);
        carrierGain.gain.linearRampToValueAtTime(0.1 + ocean.e * 0.1, now + attack);
        carrierGain.gain.exponentialRampToValueAtTime(0.001, now + decay);

        carrier.start(now);
        modulator.start(now);
        carrier.stop(now + decay + 0.5);
        modulator.stop(now + decay + 0.5);
    };

    const playTraumaDrone = (trauma: number) => {
        if (!audioCtx.current || !masterGain.current || trauma < 0.6) return;
        const osc = audioCtx.current.createOscillator();
        const g = audioCtx.current.createGain();
        osc.frequency.value = 40 + trauma * 10; // Low rumble
        osc.type = 'sine';

        const lfo = audioCtx.current.createOscillator();
        const lfoGain = audioCtx.current.createGain();
        lfo.frequency.value = 4 + trauma * 4;
        lfoGain.gain.value = trauma * 5;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        g.gain.setValueAtTime(0, audioCtx.current.currentTime);
        g.gain.linearRampToValueAtTime(0.1, audioCtx.current.currentTime + 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.current.currentTime + 2);

        osc.connect(g);
        g.connect(masterGain.current);
        osc.start();
        lfo.start();
        osc.stop(audioCtx.current.currentTime + 2.5);
        lfo.stop(audioCtx.current.currentTime + 2.5);
    };

    const startAudio = () => {
        initAudio();
        if (audioCtx.current?.state === 'suspended') audioCtx.current.resume();
        setIsPlaying(true);

        const step = () => {
            if (!metrics || !isPlaying) return;
            const speed = (60 / metrics.tempo);

            actors.forEach((actor, i) => {
                const noteName = activeChord[i % activeChord.length];
                const baseFreq = 164.81; // E3 reference
                const semitones = NOTES.indexOf(noteName);
                const freq = baseFreq * Math.pow(2, semitones / 12) * (i > 0 ? 2 : 1);
                playFMSynth(freq, actor.disc, actor.ocean, speed);
            });

            if (metrics.trauma > 0.6) playTraumaDrone(metrics.trauma);
            timerRef.current = setTimeout(step, speed * 1000);
        };
        step();
    };

    const stopAudio = () => {
        setIsPlaying(false);
        if (timerRef.current) clearTimeout(timerRef.current);
    };

    return (
        <div className={`relative w-full bg-black/80 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,1)] transition-all duration-1000 ${metrics?.trauma! > 0.8 && isPlaying ? 'ring-1 ring-red-500/50' : 'ring-1 ring-white/10'}`}>

            {/* Visual HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent z-50" />

            {/* Seldon Crisis Alert */}
            <AnimatePresence>
                {metrics?.trauma! > 0.8 && isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-40 bg-red-900/10 backdrop-blur-[2px] pointer-events-none flex flex-col items-center justify-center"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 0.2, repeat: Infinity }}
                            className="text-red-500 font-mono text-[10px] tracking-[1em] mb-4 uppercase font-black"
                        >
                            CRITICAL DISSONANCE DETECTED
                        </motion.div>
                        <div className="flex gap-2">
                            {[...Array(20)].map((_, i) => (
                                <motion.div key={i} className="w-1 h-32 bg-red-500/20" animate={{ height: [10, 100, 10] }} transition={{ delay: i * 0.05, repeat: Infinity }} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header: Technical Telemetry */}
            <div className="px-10 py-8 border-b border-white/5 flex flex-wrap gap-12 justify-between items-center bg-black/40 relative z-50">
                <div className="flex gap-10 items-center">
                    <div className="relative">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 rounded-full border-2 border-dashed border-teal-500/20 flex items-center justify-center"
                        >
                            <Brain size={20} className="text-teal-400 opacity-50" />
                        </motion.div>
                        <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${isPlaying ? 'bg-teal-500 animate-pulse' : 'bg-gray-700'}`} />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono text-teal-500/60 uppercase tracking-[0.5em] font-black">MPN Core // Neural Layer</span>
                            <span className="bg-teal-500/10 text-teal-400 text-[8px] font-mono px-2 py-0.5 rounded border border-teal-500/20">v7.0.4-STAYABLE</span>
                        </div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                            Symphonic <span className="text-gray-500">Calculus</span>
                        </h2>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden xl:flex flex-col items-end gap-1 font-mono text-[9px]">
                        <span className="text-gray-600 uppercase">Latency: <span className="text-white">0.24ms</span></span>
                        <span className="text-gray-600 uppercase">Polyphony: <span className="text-white">128v</span></span>
                        <span className="text-gray-600 uppercase">Buffer: <span className="text-teal-400">SYNCABLE</span></span>
                    </div>
                    <button
                        onClick={isPlaying ? stopAudio : startAudio}
                        className={`group relative px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] transition-all overflow-hidden ${isPlaying
                            ? 'bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.3)]'
                            : 'bg-white/5 text-teal-400 border border-teal-500/30 hover:bg-teal-500 hover:text-black'
                            }`}
                    >
                        <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-3">
                            {isPlaying ? <Square size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                            {isPlaying ? 'Disconnect' : 'Sync Interface'}
                        </motion.span>
                    </button>
                    <button
                        onClick={toggleRecording}
                        className={`group relative px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all overflow-hidden border ${isRecording
                            ? 'bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.2)]'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:border-teal-500/50 hover:text-teal-400'
                            }`}
                    >
                        <motion.span whileHover={{ scale: 1.1 }} className="flex items-center gap-3">
                            {isRecording ? <Mic2 size={14} className="animate-pulse" /> : <Mic2 size={14} />}
                            {isRecording ? 'Listening...' : 'Live Listen'}
                        </motion.span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 relative z-50">
                {/* Left: Input Console */}
                <div className="lg:col-span-4 p-10 border-r border-white/5 bg-black/20">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-teal-500" />
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Dialectical Shell</span>
                        </div>
                        <button onClick={() => { setInputText(''); setMetrics(null); stopAudio(); }} className="text-[8px] font-mono text-gray-700 hover:text-white uppercase">Flush</button>
                    </div>

                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-b from-teal-500/20 to-transparent rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000" />
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="relative w-full min-h-[480px] bg-black/60 border border-white/5 rounded-2xl p-8 text-sm font-mono text-gray-300 focus:text-white focus:outline-none transition-all resize-none scrollbar-thin scrollbar-thumb-white/5 leading-relaxed"
                            placeholder="Awaiting dialectical vector input..."
                        />
                        <AnimatePresence>
                            {interimTranscript && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-8 left-8 right-8 p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl backdrop-blur-md"
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                        <span className="text-[9px] font-mono text-teal-500 uppercase font-bold tracking-widest">Acoustic Delta</span>
                                    </div>
                                    <p className="text-xs font-mono text-teal-300/80 italic">"{interimTranscript}"</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="mt-8 w-full py-6 bg-teal-500/10 hover:bg-teal-500 border border-teal-500/20 text-teal-400 hover:text-black rounded-2xl text-[11px] font-black uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 group"
                    >
                        {analyzing ? <Waves className="animate-spin" size={18} /> : <Zap size={18} />}
                        {analyzing ? 'Transforming...' : 'Commit Context'}
                    </button>
                </div>

                {/* Right: Visualization & Diagnostics */}
                <div className="lg:col-span-8 p-10 flex flex-col gap-10">

                    {/* Tonnetz Upgraded */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <h4 className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em]">Tonnetz Plane (D(t))</h4>
                                <div className={`text-[9px] font-mono px-2 py-0.5 rounded border ${metrics?.health! < 4 ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-teal-500/20 text-teal-400 border-teal-500/50'}`}>
                                    {metrics?.health! < 4 ? 'MANIFOLD COLLAPSE' : 'LATTICE COHERENT'}
                                </div>
                            </div>
                            <div className="flex gap-1 text-[8px] font-mono">
                                {['R', 'L', 'P', 'PLP'].map(o => (
                                    <span key={o} className={`px-2 py-1 rounded border transition-colors ${lastOp === o ? 'bg-teal-500 text-black border-teal-500' : 'text-gray-700 border-white/5'}`}>{o}</span>
                                ))}
                            </div>
                        </div>
                        <NeoRiemannianTonnetz activeNotes={activeChord} transformation={lastOp as any} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Metrics Panel */}
                        <div className="space-y-8 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                            <h4 className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em] flex items-center gap-2">
                                <Waves size={12} fill="currentColor" /> Neural Metrics
                            </h4>
                            <AnalyticsBar label="Trauma (Real Register)" value={metrics?.trauma || 0} color="from-red-500 to-red-900" glow="shadow-[0_0_15px_rgba(239,68,68,0.3)]" />
                            <AnalyticsBar label="Entropy (Symbolic Noise)" value={metrics?.entropy || 0} color="from-teal-400 to-teal-800" />
                            <AnalyticsBar label="Baseline (Imaginary Sync)" value={metrics?.baseline || 0} color="from-blue-500 to-blue-900" />
                        </div>

                        {/* Actor Panel */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.4em]">Active Voices</h4>
                            <div className="space-y-4">
                                {actors.map(actor => (
                                    <div key={actor.id} className="p-5 bg-white/[0.03] rounded-2xl border border-white/5 flex items-center justify-between group">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 rounded-xl bg-teal-500/5 border border-teal-500/20 flex items-center justify-center text-teal-500 font-black text-xs">
                                                {actor.disc}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-white uppercase tracking-tight">{actor.id}</div>
                                                <div className="text-[8px] text-gray-600 font-mono flex gap-2">
                                                    <span>OCEAN:{Object.values(actor.ocean).map(v => Math.round(v * 9)).join('.')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-6 w-24 bg-black/40 rounded overflow-hidden flex items-end p-1 gap-1">
                                            {[...Array(8)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 bg-teal-500/40"
                                                    animate={isPlaying ? { height: [20, Math.random() * 100, 20] } : { height: '30%' }}
                                                    transition={{ repeat: Infinity, duration: 0.2 + Math.random() }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Technical Footer */}
                    <div className="mt-auto pt-8 border-t border-white/5 flex flex-wrap justify-between items-center text-[9px] font-mono text-gray-700">
                        <div className="flex gap-10">
                            <div className="flex flex-col gap-1">
                                <span className="uppercase tracking-widest">Calculus State</span>
                                <span className="text-white uppercase font-black">{metrics?.health! < 4 ? 'DISSONANT' : 'CONSONANT'}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="uppercase tracking-widest">Lacanian Register</span>
                                <span className="text-teal-400 uppercase font-black">{metrics?.trauma! > 0.6 ? 'The Real' : 'The Symbolic'}</span>
                            </div>
                        </div>
                        <div className="bg-teal-500/5 px-4 py-3 rounded-xl border border-teal-500/10 flex items-center gap-4">
                            <Shield size={14} className="text-teal-500/50" />
                            <div className="flex flex-col">
                                <span className="uppercase text-[8px] mb-0.5">Clinical Immunity Score</span>
                                <span className="text-white font-black text-xs">{metrics?.health || 0} / 10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsBar({ label, value, color, glow }: { label: string, value: number, color: string, glow?: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.2em] font-black text-gray-500">
                <span>{label}</span>
                <span className="text-white">{(value * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5 p-0.5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value * 100}%` }}
                    className={`h-full rounded-full bg-gradient-to-r ${color} ${glow}`}
                />
            </div>
        </div>
    );
}
