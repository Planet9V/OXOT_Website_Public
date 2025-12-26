'use client';

import React from 'react';
import { ReactFlow, Background, Controls, useNodesState, useEdgesState, MarkerType, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node style presets
const styles = {
    core: {
        background: 'linear-gradient(135deg, #1a1a00 0%, #000 100%)',
        color: '#fbbf24',
        border: '2px solid #fbbf24',
        fontSize: '11px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        fontWeight: 'bold' as const,
        boxShadow: '0 0 30px rgba(251, 191, 36, 0.4)',
        borderRadius: '8px',
        padding: '10px'
    },
    service: {
        background: '#0a0a0a',
        color: '#fff',
        border: '1px solid #fbbf24',
        fontSize: '9px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        borderRadius: '6px',
        width: 120
    },
    outcome: {
        background: '#001a00',
        color: '#22c55e',
        border: '1px solid #22c55e',
        fontSize: '9px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        borderRadius: '6px',
        width: 110
    },
    compliance: {
        background: '#00001a',
        color: '#3b82f6',
        border: '1px solid #3b82f6',
        fontSize: '9px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        borderRadius: '6px',
        width: 100
    },
    input: {
        background: '#1a0a0a',
        color: '#f87171',
        border: '1px solid #991b1b',
        fontSize: '9px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        borderRadius: '6px',
        width: 100
    },
    agent: {
        background: '#0a0a1a',
        color: '#a78bfa',
        border: '1px solid #7c3aed',
        fontSize: '9px',
        fontFamily: 'monospace',
        textTransform: 'uppercase' as const,
        borderRadius: '6px',
        width: 100
    }
};

const initialNodes: Node[] = [
    // === CORE CENTER ===
    { id: 'gold-core', position: { x: 350, y: 200 }, data: { label: '⭐ GOLD TEAM ADVISORY' }, style: { ...styles.core, width: 180 } },

    // === INPUT LAYER (Left) - What customers bring ===
    { id: 'customer-assets', position: { x: 50, y: 80 }, data: { label: '📦 Customer Assets' }, style: styles.input },
    { id: 'risk-landscape', position: { x: 50, y: 160 }, data: { label: '⚠️ Risk Landscape' }, style: styles.input },
    { id: 'compliance-gaps', position: { x: 50, y: 240 }, data: { label: '📋 Compliance Gaps' }, style: styles.input },
    { id: 'legacy-systems', position: { x: 50, y: 320 }, data: { label: '🔧 Legacy OT/ICS' }, style: styles.input },

    // === SERVICE LAYER (Top) ===
    { id: 'svc-iec62443', position: { x: 200, y: 0 }, data: { label: 'IEC 62443 Architecture' }, style: styles.service },
    { id: 'svc-ma', position: { x: 340, y: 0 }, data: { label: 'M&A Due Diligence' }, style: styles.service },
    { id: 'svc-wargame', position: { x: 480, y: 0 }, data: { label: 'Crisis War Gaming' }, style: styles.service },

    // === SERVICE LAYER (Bottom) ===
    { id: 'svc-soc', position: { x: 200, y: 400 }, data: { label: 'SOC Modernization' }, style: styles.service },
    { id: 'svc-executive', position: { x: 340, y: 400 }, data: { label: 'Board Advisory' }, style: styles.service },
    { id: 'svc-transform', position: { x: 480, y: 400 }, data: { label: 'Digital Transform' }, style: styles.service },

    // === AEON AGENTS (Top Right) ===
    { id: 'agent-red', position: { x: 620, y: 80 }, data: { label: '🔴 Agent Red' }, style: styles.agent },
    { id: 'agent-blue', position: { x: 620, y: 160 }, data: { label: '🔵 Agent Blue' }, style: styles.agent },
    { id: 'aeon-core', position: { x: 620, y: 240 }, data: { label: '🧠 AEON Core' }, style: { ...styles.agent, color: '#22d3ee', border: '1px solid #22d3ee' } },

    // === COMPLIANCE ACHIEVEMENTS (Bottom Right) ===
    { id: 'comply-nis2', position: { x: 730, y: 80 }, data: { label: '✓ NIS2 Ready' }, style: styles.compliance },
    { id: 'comply-iec', position: { x: 730, y: 150 }, data: { label: '✓ IEC 62443' }, style: styles.compliance },
    { id: 'comply-zerotrust', position: { x: 730, y: 220 }, data: { label: '✓ Zero Trust' }, style: styles.compliance },

    // === CUSTOMER OUTCOMES (Far Right) ===
    { id: 'outcome-resilience', position: { x: 860, y: 60 }, data: { label: '🛡️ Resilience' }, style: styles.outcome },
    { id: 'outcome-visibility', position: { x: 860, y: 130 }, data: { label: '👁️ Visibility' }, style: styles.outcome },
    { id: 'outcome-response', position: { x: 860, y: 200 }, data: { label: '⚡ Response' }, style: styles.outcome },
    { id: 'outcome-governance', position: { x: 860, y: 270 }, data: { label: '📊 Governance' }, style: styles.outcome },
    { id: 'outcome-confidence', position: { x: 860, y: 340 }, data: { label: '✨ Board Confidence' }, style: { ...styles.outcome, color: '#fbbf24', border: '1px solid #fbbf24' } },
];

const initialEdges: Edge[] = [
    // === INPUT → GOLD TEAM ===
    { id: 'e-in1', source: 'customer-assets', target: 'gold-core', animated: true, style: { stroke: '#f87171', strokeWidth: 1 } },
    { id: 'e-in2', source: 'risk-landscape', target: 'gold-core', animated: true, style: { stroke: '#f87171', strokeWidth: 1 } },
    { id: 'e-in3', source: 'compliance-gaps', target: 'gold-core', animated: true, style: { stroke: '#f87171', strokeWidth: 1 } },
    { id: 'e-in4', source: 'legacy-systems', target: 'gold-core', animated: true, style: { stroke: '#f87171', strokeWidth: 1 } },

    // === GOLD TEAM → SERVICES ===
    { id: 'e-svc1', source: 'gold-core', target: 'svc-iec62443', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-svc2', source: 'gold-core', target: 'svc-ma', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-svc3', source: 'gold-core', target: 'svc-wargame', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-svc4', source: 'gold-core', target: 'svc-soc', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-svc5', source: 'gold-core', target: 'svc-executive', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-svc6', source: 'gold-core', target: 'svc-transform', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },

    // === GOLD TEAM ↔ AEON AGENTS (bidirectional intelligence) ===
    { id: 'e-agent1', source: 'gold-core', target: 'agent-red', animated: true, style: { stroke: '#7c3aed', strokeDasharray: '5,5' }, label: 'Attack Intel', labelStyle: { fill: '#a78bfa', fontSize: 7 } },
    { id: 'e-agent2', source: 'gold-core', target: 'agent-blue', animated: true, style: { stroke: '#7c3aed', strokeDasharray: '5,5' }, label: 'Defense Intel', labelStyle: { fill: '#a78bfa', fontSize: 7 } },
    { id: 'e-agent3', source: 'aeon-core', target: 'gold-core', animated: true, style: { stroke: '#22d3ee', strokeWidth: 2 }, label: 'AI Insights', labelStyle: { fill: '#22d3ee', fontSize: 7 } },

    // === SERVICES → COMPLIANCE ===
    { id: 'e-comp1', source: 'svc-iec62443', target: 'comply-iec', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e-comp2', source: 'svc-transform', target: 'comply-nis2', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },
    { id: 'e-comp3', source: 'svc-soc', target: 'comply-zerotrust', style: { stroke: '#3b82f6' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } },

    // === COMPLIANCE → OUTCOMES ===
    { id: 'e-out1', source: 'comply-iec', target: 'outcome-resilience', style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },
    { id: 'e-out2', source: 'comply-zerotrust', target: 'outcome-visibility', style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },
    { id: 'e-out3', source: 'comply-nis2', target: 'outcome-governance', style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },

    // === AGENTS → OUTCOMES ===
    { id: 'e-ag-out1', source: 'agent-red', target: 'outcome-response', style: { stroke: '#22c55e', strokeDasharray: '3,3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },
    { id: 'e-ag-out2', source: 'agent-blue', target: 'outcome-visibility', style: { stroke: '#22c55e', strokeDasharray: '3,3' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },

    // === SERVICES → OUTCOMES (direct value) ===
    { id: 'e-dir1', source: 'svc-executive', target: 'outcome-confidence', style: { stroke: '#fbbf24', strokeWidth: 2 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#fbbf24' } },
    { id: 'e-dir2', source: 'svc-wargame', target: 'outcome-response', style: { stroke: '#22c55e' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#22c55e' } },
];

export default function GoldTeamGraph() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, , onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div className="w-full h-full min-h-[400px] bg-black/60 rounded-xl border border-yellow-500/20 overflow-hidden">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                attributionPosition="bottom-right"
                colorMode="dark"
                minZoom={0.3}
                maxZoom={1.5}
            >
                <Background color="#333" gap={20} size={1} />
                <Controls showInteractive={false} />
            </ReactFlow>
        </div>
    );
}

