"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send, Mic, MicOff, Square, Play, RotateCcw, Activity,
    Music, Volume2, VolumeX, Shield, Brain, Terminal,
    User, Cpu, Sparkles, Database, Ghost
} from 'lucide-react';
import { NeoRiemannianTonnetz } from './NeoRiemannianTonnetz';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    text: string;
    metrics?: MPNMetrics;
    qdrantContext?: any[];
}

interface MPNMetrics {
    trauma: number;
    entropy: number;
    baseline: number;
    arrhythmia: number;
    key: string;
    tempo: number;
    clef: string;
    health: number;
}

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function MPNChatEngine() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', role: 'assistant', text: "Awaiting dialectical input. I am ready to sonify the psychometric delta of our interaction." }
    ]);
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [metrics, setMetrics] = useState<MPNMetrics>({
        trauma: 0.1, entropy: 0.2, baseline: 0.8, arrhythmia: 0.1, key: 'C Major', tempo: 80, clef: '♮ Ops Floor', health: 9
    });
    const [activeChord, setActiveChord] = useState<string[]>(["C", "E", "G"]);
    const [activeMode, setActiveMode] = useState<'major' | 'minor'>('major');
    const [isPlaying, setIsPlaying] = useState(false);

    // Audio Refs
    const audioCtx = useRef<AudioContext | null>(null);
    const masterGain = useRef<GainNode | null>(null);
    const timerRef = useRef<any>(null);
    const recognitionRef = useRef<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, interimTranscript]);

    // --- CALCULUS LOGIC ---
    const calculateMetrics = (text: string): MPNMetrics => {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const negativeKeywords = ['fail', 'critical', 'error', 'warning', 'gone', 'impossible', 'anomaly', 'fluctuating', 'danger', 'attack', 'compromised'];
        const traumaCount = words.filter(w => negativeKeywords.some(nk => w.toLowerCase().includes(nk))).length;

        const trauma = Math.min(1, traumaCount / (words.length * 0.05 || 1));
        const entropy = new Set(words.map(w => w.toLowerCase())).size / (words.length || 1);
        const arrhythmia = Math.min(1, (words.length / (text.length || 1)) * 5);
        const baseline = Math.max(0, 1 - (trauma * 0.7 + arrhythmia * 0.3));
        const health = Math.floor((1 - trauma) * 10);

        return {
            trauma, entropy, baseline, arrhythmia,
            key: trauma > 0.5 ? 'A Minor' : 'C Major',
            tempo: 70 + trauma * 60,
            clef: trauma > 0.6 ? '♯ War Room' : health > 8 ? '♮ Ops Floor' : '♭ Boardroom',
            health
        };
    };

    const updateCalculus = (text: string, isUser: boolean) => {
        const newMetrics = calculateMetrics(text);
        setMetrics(newMetrics);

        // Neo-Riemannian Transformation
        let op: 'R' | 'L' | 'P' = isUser ? 'P' : 'R';
        if (newMetrics.trauma > 0.6) op = 'P';
        else if (newMetrics.entropy > 0.4) op = 'L';

        const getNoteAt = (note: string, interval: number) => NOTES[(NOTES.indexOf(note) + interval) % 12];
        const [r, t, f] = activeChord;

        let nextChord = activeChord;
        let nextMode = activeMode;

        if (op === 'P') {
            nextChord = [r, activeMode === 'major' ? getNoteAt(t, -1) : getNoteAt(t, 1), f];
            nextMode = activeMode === 'major' ? 'minor' : 'major';
        } else if (op === 'R') {
            if (activeMode === 'major') nextChord = [f, r, getNoteAt(t, 2)];
            else nextChord = [r, f, getNoteAt(t, -2)];
            nextMode = activeMode === 'major' ? 'minor' : 'major';
        } else if (op === 'L') {
            if (activeMode === 'major') nextChord = [t, f, getNoteAt(r, -1)];
            else nextChord = [r, getNoteAt(t, 1), f];
            nextMode = activeMode === 'major' ? 'minor' : 'major';
        }

        setActiveChord(nextChord);
        setActiveMode(nextMode);
    };

    // --- CHAT & API ---
    const handleSendMessage = async (textOverride?: string) => {
        const text = textOverride || inputText;
        if (!text.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        updateCalculus(text, true);

        setIsProcessing(true);
        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history: messages.slice(-5).map(m => ({ role: m.role, content: m.text })) })
            });
            const data = await res.json();

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                text: data.response,
                qdrantContext: data.context
            };
            setMessages(prev => [...prev, aiMsg]);
            updateCalculus(data.response, false);

            // Trigger Voice if needed...
            if (data.response) synthesizeSpeech(data.response);

        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    // --- SPEECH & VOICE ---
    const synthesizeSpeech = async (text: string) => {
        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (!response.ok) {
                console.warn('TTS failed:', response.status);
                return;
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            audio.onended = () => URL.revokeObjectURL(audioUrl);
            audio.play().catch(e => console.warn('Audio playback blocked:', e));
        } catch (error) {
            console.error('TTS synthesis error:', error);
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (!SpeechRecognition) return;
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onstart = () => setIsRecording(true);
            recognition.onresult = (event: any) => {
                let interim = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        const final = event.results[i][0].transcript;
                        handleSendMessage(final);
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                setInterimTranscript(interim);
            };
            recognition.onend = () => {
                setIsRecording(false);
                setInterimTranscript('');
            };
            recognitionRef.current = recognition;
            recognition.start();
        }
    };

    // --- AUDIO ENGINE (Simplified) ---
    const startAudio = () => {
        if (!audioCtx.current) {
            audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            masterGain.current = audioCtx.current.createGain();
            masterGain.current.gain.value = 0.2;
            masterGain.current.connect(audioCtx.current.destination);
        }
        if (audioCtx.current.state === 'suspended') audioCtx.current.resume();
        setIsPlaying(true);
    };

    return (
        <div className="flex flex-col h-[800px] bg-black/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-2xl ring-1 ring-white/10 shadow-2xl relative">

            {/* HUD Header */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20">
                        <Brain size={20} className="text-teal-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-black text-white uppercase tracking-tighter">Symphonic Calculus <span className="text-teal-500/40">// Interactive</span></h2>
                        <div className="flex items-center gap-4 text-[9px] font-mono text-gray-500 uppercase">
                            <span className="flex items-center gap-2"><div className={`w-1 h-1 rounded-full ${isPlaying ? 'bg-teal-500 animate-pulse' : 'bg-gray-700'}`} /> Audio Engine</span>
                            <span className="flex items-center gap-2 font-black text-teal-500/60">Key: {metrics.key}</span>
                            <span className="flex items-center gap-2">Tempo: {metrics.tempo.toFixed(0)} BPM</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={isPlaying ? () => setIsPlaying(false) : startAudio} className={`p-3 rounded-xl transition-all ${isPlaying ? 'bg-teal-500 text-black' : 'bg-white/5 text-teal-400 border border-teal-500/20'}`}>
                        {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                    <div className="hidden lg:flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 text-[10px] font-mono">
                        <Database size={12} className="text-teal-500" />
                        <span className="text-gray-400">QDRANT PORT:</span>
                        <span className="text-white">6333</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex min-h-0 bg-black/10">
                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col relative">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-thin scrollbar-thumb-white/5">
                        <AnimatePresence mode="popLayout">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] group relative ${msg.role === 'user' ? 'bg-teal-500/10 border-teal-500/30' : 'bg-white/5 border-white/10'} border rounded-3xl p-6 backdrop-blur-md transition-all hover:ring-1 ring-white/20`}>
                                        <div className="flex items-center gap-3 mb-3 text-[8px] font-mono uppercase tracking-[0.3em] font-black text-gray-500">
                                            {msg.role === 'user' ? (
                                                <><User size={10} className="text-teal-400" /> Dialectical Subject</>
                                            ) : (
                                                <><Sparkles size={10} className="text-teal-400" /> AEON Calculus</>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-300 leading-relaxed font-mono whitespace-pre-wrap">{msg.text}</p>

                                        {msg.qdrantContext && (
                                            <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                                                {msg.qdrantContext.map((ctx, idx) => (
                                                    <div key={idx} className="flex-none bg-black/40 px-3 py-1.5 rounded-lg border border-teal-500/20 text-[9px] font-mono text-teal-300/60 max-w-[150px] truncate">
                                                        #{ctx.payload?.name || 'entity'}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex gap-2">
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" />
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                </div>
                            </div>
                        )}
                        {interimTranscript && (
                            <div className="flex justify-end">
                                <div className="bg-teal-500/5 border border-teal-500/20 rounded-2xl p-4 text-xs font-mono text-teal-400/50 italic">
                                    {interimTranscript}...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Console */}
                    <div className="p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-transparent rounded-2xl blur opacity-0 group-focus-within:opacity-100 transition duration-1000" />
                            <div className="relative flex items-center gap-4 bg-black/60 border border-white/10 rounded-2xl p-2 pr-4 shadow-inner">
                                <button
                                    onClick={toggleRecording}
                                    className={`p-4 rounded-xl transition-all ${isRecording ? 'bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'hover:bg-white/5 text-gray-500'}`}
                                >
                                    <Mic size={20} className={isRecording ? 'text-white' : ''} />
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Input dialectical vector..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-mono text-white placeholder:text-gray-700 py-4"
                                />
                                <button
                                    onClick={() => handleSendMessage()}
                                    disabled={!inputText.trim()}
                                    className="p-4 bg-teal-500 text-black rounded-xl hover:bg-teal-400 transition-all disabled:opacity-30 disabled:hover:bg-teal-500"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Tonnetz & Telemetry */}
                <div className="hidden xl:flex flex-col w-[400px] border-l border-white/5 p-8 bg-black/20 gap-8 overflow-y-auto">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-teal-500/60 uppercase tracking-[0.3em] font-black">
                            <Activity size={12} />
                            Calculus Real-Time
                        </div>
                        <NeoRiemannianTonnetz
                            activeNotes={activeChord}
                            transformation={activeMode === 'major' ? 'R' : 'P'}
                        />
                    </div>

                    <div className="space-y-6 pt-6 border-t border-white/5 text-[10px] font-mono">
                        <MetricBar label="Trauma (R)" value={metrics.trauma} color="from-red-500 to-orange-500" />
                        <MetricBar label="Entropy (H)" value={metrics.entropy} color="from-teal-500 to-blue-500" />
                        <MetricBar label="Arrhythmia (α)" value={metrics.arrhythmia} color="from-yellow-500 to-red-500" />
                        <MetricBar label="Stability (B)" value={metrics.baseline} color="from-green-500 to-teal-500" />
                    </div>

                    <div className="mt-auto bg-teal-500/5 p-4 rounded-2xl border border-teal-500/10 flex flex-col gap-3">
                        <div className="flex justify-between items-center text-[9px] font-black uppercase text-gray-500 tracking-widest">
                            <span>Vantage Voice</span>
                            <span className="text-teal-500">READY</span>
                        </div>
                        <div className="flex gap-2">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="flex-1 h-8 bg-teal-500/20"
                                    animate={isProcessing || isRecording ? { height: [5, 30, 5] } : { height: 10 }}
                                    transition={{ delay: i * 0.05, repeat: Infinity, duration: 1 }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-black text-gray-500">
                <span>{label}</span>
                <span className="text-white">{(value * 100).toFixed(0)}%</span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value * 100}%` }}
                    className={`h-full bg-gradient-to-r ${color}`}
                />
            </div>
        </div>
    );
}
