"use client";

import React, { useEffect, useCallback, useMemo } from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, BackgroundVariant, Position, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Server, Database, Shield, Globe, Cpu, Network, Zap, Lock, Skull } from 'lucide-react';

// Custom Node Component for a "Dark Cyber" look
const CustomNode = ({ data }: { data: { label: string, type: string, status: string } }) => {
    const isCompromised = data.status === 'compromised';
    const isRedLeader = data.type === 'red-leader';

    let Icon = Server;
    if (data.type === 'database') Icon = Database;
    if (data.type === 'firewall') Icon = Shield;
    if (data.type === 'internet') Icon = Globe;
    if (data.type === 'plc') Icon = Cpu;
    if (data.type === 'switch') Icon = Network;
    if (data.type === 'red-leader') Icon = Skull;

    return (
        <div className={`
            relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-500 min-w-[180px]
            ${isRedLeader
                ? 'bg-red-950/90 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)] animate-pulse'
                : isCompromised
                    ? 'bg-red-900/20 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-black/80 border-white/10 hover:border-white/30'}
        `}>
            {/* Handle dots (invisible but needed for edges) */}
            <div className="absolute inset-y-0 -left-1 w-2 bg-transparent" />
            <div className="absolute inset-y-0 -right-1 w-2 bg-transparent" />

            <div className={`
                p-2 rounded-lg border 
                ${isRedLeader ? 'bg-red-500 text-black border-red-400' : isCompromised ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-white/5 text-cyan-400 border-white/10'}
            `}>
                <Icon size={20} />
            </div>

            <div>
                <div className={`text-[10px] font-bold tracking-widest uppercase mb-0.5 ${isRedLeader ? 'text-red-400' : 'text-gray-500'}`}>
                    {data.type}
                </div>
                <div className={`text-xs font-bold font-mono ${isRedLeader ? 'text-white' : 'text-gray-200'}`}>
                    {data.label}
                </div>
            </div>

            {isCompromised && !isRedLeader && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-black text-[8px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                    PWNED
                </div>
            )}
        </div>
    );
};

// Initial Nodes
const INITIAL_NODES = [
    { id: 'cloud', type: 'custom', position: { x: 250, y: -50 }, data: { label: 'AEON_CLOUD_EDGE', type: 'internet', status: 'active' } },
];

interface ThreatModelCanvasProps {
    currentStep: number;
}

export default function ThreatModelCanvas({ currentStep }: ThreatModelCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState<any>(INITIAL_NODES);
    const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

    // We define a scripted sequence of updates proportional to the "Kill Chain Steps" (0-20)
    useEffect(() => {
        // Step 1: Scanner finds Firewall
        if (currentStep === 1) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'fw')) return nds;
                return [...nds, { id: 'fw', type: 'custom', position: { x: 250, y: 100 }, data: { label: 'PERIMETER_FW_01', type: 'firewall', status: 'active' } }];
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e1')) return eds;
                return [...eds, { id: 'e1', source: 'cloud', target: 'fw', animated: true, style: { stroke: '#4b5563' } }];
            });
        }

        // Step 2: Web Server Found
        if (currentStep === 2) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'web')) return nds;
                return [...nds, { id: 'web', type: 'custom', position: { x: 100, y: 250 }, data: { label: 'WEB_APP_SERVER', type: 'server', status: 'active' } }];
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e2')) return eds;
                return [...eds, { id: 'e2', source: 'fw', target: 'web', animated: true, style: { stroke: '#4b5563' } }];
            });
        }

        // Step 8: Breach - Web Server Compromised
        if (currentStep === 8) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'web' && n.data.status === 'compromised')) return nds;
                return nds.map(n => n.id === 'web' || n.id === 'fw' ? { ...n, data: { ...n.data, status: 'compromised' } } : n);
            });
            setEdges((eds) => {
                if (eds.find(e => e.target === 'web' && e.style?.stroke === '#ef4444')) return eds;
                return eds.map(e => e.target === 'web' ? { ...e, style: { stroke: '#ef4444', strokeWidth: 2 }, animated: true } : e);
            });
        }

        // Step 11: RED LEADER INJECTION
        if (currentStep === 11) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'red-leader')) return nds;
                return [...nds, { id: 'red-leader', type: 'custom', position: { x: 450, y: 250 }, data: { label: 'SUBMIND_GHOST_V4', type: 'red-leader', status: 'active' } }];
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e-inject')) return eds;
                return [...eds, {
                    id: 'e-inject', source: 'web', target: 'red-leader', type: 'smoothstep', animated: true,
                    style: { stroke: '#ef4444', strokeWidth: 3, strokeDasharray: '5,5' },
                    label: 'INJECTION_VECTOR', labelStyle: { fill: '#ef4444', fontWeight: 700 }
                }];
            });
        }

        // Step 13: Internal Database & Switch
        if (currentStep === 13) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'db')) return nds;
                return [
                    ...nds,
                    { id: 'db', type: 'custom', position: { x: 0, y: 400 }, data: { label: 'CUSTOMER_DB_PRIMARY', type: 'database', status: 'active' } },
                    { id: 'switch', type: 'custom', position: { x: 300, y: 400 }, data: { label: 'CORE_SWITCH_L3', type: 'switch', status: 'active' } }
                ];
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e3')) return eds;
                return [...eds,
                { id: 'e3', source: 'web', target: 'db', animated: true, style: { stroke: '#4b5563' } },
                { id: 'e4', source: 'web', target: 'switch', animated: true, style: { stroke: '#4b5563' } }
                ];
            });
        }

        // Step 16: Lateral Move -> Switch Compromised
        if (currentStep === 16) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'switch' && n.data.status === 'compromised')) return nds;
                return nds.map(n => n.id === 'switch' ? { ...n, data: { ...n.data, status: 'compromised' } } : n);
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e-lateral')) return eds;
                return [...eds, {
                    id: 'e-lateral', source: 'red-leader', target: 'switch', animated: true,
                    style: { stroke: '#ef4444' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }
                }];
            });
        }

        // Step 17/18: OT Network (PLCs)
        if (currentStep === 17) {
            setNodes((nds) => {
                if (nds.find(n => n.id === 'plc1')) return nds;
                return [
                    ...nds,
                    { id: 'plc1', type: 'custom', position: { x: 150, y: 550 }, data: { label: 'PLC_GENERATOR_01', type: 'plc', status: 'active' } },
                    { id: 'plc2', type: 'custom', position: { x: 450, y: 550 }, data: { label: 'PLC_HVAC_SYSTEM', type: 'plc', status: 'active' } }
                ];
            });
            setEdges((eds) => {
                if (eds.find(e => e.id === 'e5')) return eds;
                return [...eds,
                { id: 'e5', source: 'switch', target: 'plc1', style: { stroke: '#4b5563' } },
                { id: 'e6', source: 'switch', target: 'plc2', style: { stroke: '#4b5563' } }
                ];
            });
        }

        // Step 20: Total Compromise
        if (currentStep >= 19) {
            setNodes((nds) => {
                if (nds.every(n => n.data.status === 'compromised')) return nds;
                return nds.map(n => ({ ...n, data: { ...n.data, status: 'compromised' } }));
            });
            setEdges((eds) => {
                if (eds.every(e => e.style?.stroke === '#ef4444')) return eds;
                return eds.map(e => ({ ...e, style: { stroke: '#ef4444', strokeWidth: 2 }, animated: true }));
            });
        }

        // Reset if loop happens (Step 0)
        if (currentStep === 0) {
            setNodes((nds) => {
                if (nds.length === 1 && nds[0].id === 'cloud') return nds;
                return INITIAL_NODES;
            });
            setEdges((eds) => {
                if (eds.length === 0) return eds;
                return [];
            });
        }
    }, [currentStep, setNodes, setEdges]);

    // Define custom node types
    const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

    return (
        <div className="w-full h-full bg-black/50 rounded-xl overflow-hidden relative group">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                proOptions={{ hideAttribution: true }}
                fitView
                fitViewOptions={{ padding: 0.2, minZoom: 0.5, maxZoom: 1.5 }}
                minZoom={0.5}
                maxZoom={2}
            >
                <Background
                    color="#444"
                    variant={BackgroundVariant.Dots}
                    gap={20}
                    size={1}
                    className="opacity-20"
                />
            </ReactFlow>

            {/* Overlay Title */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h3 className="text-xs font-bold text-red-500 tracking-widest bg-black/80 px-2 py-1 rounded border border-red-500/20">
                    LIVE THREAT TOPOLOGY
                </h3>
            </div>

            {/* Red Leader Status Overlay */}
            {nodes.find(n => n.id === 'red-leader') && (
                <div className="absolute bottom-4 right-4 z-10 pointer-events-none animate-slide-up">
                    <div className="bg-red-950/90 border border-red-500/50 p-3 rounded-lg shadow-2xl flex items-center gap-3">
                        <Skull className="text-red-500 animate-pulse" size={16} />
                        <div>
                            <div className="text-[10px] text-red-400 font-bold tracking-widest">ACTIVE IMPLANT</div>
                            <div className="text-xs text-white font-mono">SUBMIND_GHOST_V4</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
