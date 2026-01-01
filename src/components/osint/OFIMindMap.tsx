'use client';

import React, { useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Position,
    Handle
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';

// =============================================================================
// DATA & TYPES
// =============================================================================

const NODE_DATA = {
    id: 'root', label: 'OFI Strategic Vision', type: 'root',
    children: [
        {
            id: 'ipo', label: 'IPO Preparation', value: '$5.2-10.4M', type: 'category',
            color: '#ef4444', // Red for Critical
            children: [
                { id: 'ipo-1', label: 'IEC 62443 Cert', sub: '$2-4M', type: 'item' },
                { id: 'ipo-2', label: '24/7 SOC', sub: '$3-6M', type: 'item' },
                { id: 'ipo-3', label: 'Cyber Risk Quant', sub: '$150-300K', type: 'item' },
                { id: 'ipo-4', label: 'Board Dashboard', sub: '$50-100K', type: 'item' }
            ]
        },
        {
            id: 'digital', label: 'Digital Transformation', value: '$1.3-2.5M', type: 'category',
            color: '#06b6d4', // Cyan
            children: [
                { id: 'dig-1', label: 'SAP AI -> SCADA', type: 'item' },
                { id: 'dig-2', label: 'Braincube Monitoring', type: 'item' },
                { id: 'dig-3', label: 'Cloud Sec Arch', sub: '$500K-1M', type: 'item' },
                { id: 'dig-4', label: 'Edge Sec', sub: '$300-500K', type: 'item' },
                { id: 'dig-5', label: 'Supplier Risk', sub: '$0.5-1M', type: 'item' }
            ]
        },
        {
            id: 'growth', label: 'Financial Growth', value: '$150-300K', type: 'category',
            color: '#10b981', // Emerald
            children: [
                { id: 'gro-1', label: 'Ransomware Prev', sub: '$150-300K', type: 'item' },
                { id: 'gro-2', label: 'Cust Data Prot', type: 'item' },
                { id: 'gro-3', label: 'Insurance Savings', sub: '$0.5-2M', type: 'item' }
            ]
        },
        {
            id: 'facilities', label: 'Facility Expansion', value: '$1.2-2.4M', type: 'category',
            color: '#f59e0b', // Amber/Gold
            children: [
                { id: 'fac-1', label: 'Greenfield Design', sub: '$0.5-1M', type: 'item' },
                { id: 'fac-2', label: 'OT Std Library', sub: '$200-400K', type: 'item' },
                { id: 'fac-3', label: 'ICS Pre-Testing', sub: '$300-600K', type: 'item' },
                { id: 'fac-4', label: 'Mobile Pen Test', sub: '$200-400K', type: 'item' }
            ]
        },
        {
            id: 'compliance', label: 'Regulatory Compliance', value: '$0.5-1.1M', type: 'category',
            color: '#a855f7', // Purple
            children: [
                { id: 'com-1', label: 'AtSource Integrity', sub: 'URGENT', type: 'item' },
                { id: 'com-2', label: 'Food Safety Test', sub: '$150-300K', type: 'item' },
                { id: 'com-3', label: 'Farmer Privacy', sub: '$100-200K', type: 'item' },
                { id: 'com-4', label: 'Evidence Pkg', sub: '$100-200K', type: 'item' }
            ]
        }
    ]
};

// =============================================================================
// CUSTOM NODES
// =============================================================================

const StrategicNode = ({ data }: { data: any }) => (
    <div className="relative group">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="w-48 h-48 rounded-full border-2 border-cyan-500 bg-black/80 flex items-center justify-center p-4 text-center z-10 relative backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div>
                <div className="text-cyan-400 font-mono text-xs tracking-widest mb-2">TARGET</div>
                <div className="text-white font-bold text-lg leading-tight">{data.label}</div>
            </div>
            <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-3 !h-3" />
        </div>
    </div>
);

const CategoryNode = ({ data }: { data: any }) => (
    <div className="relative group w-64">
        <div className="absolute inset-0 bg-white/5 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <div
            className="rounded-xl border border-white/20 bg-black/90 p-4 relative backdrop-blur-md transition-transform hover:scale-105"
            style={{ borderColor: data.color, boxShadow: `0 0 15px ${data.color}30` }}
        >
            <Handle type="target" position={Position.Left} className="!bg-white !w-2 !h-2" />
            <div className="flex justify-between items-start mb-2">
                <div className="font-mono text-[10px] text-white/60">INITIATIVE</div>
                <div className="font-mono text-[10px] font-bold" style={{ color: data.color }}>{data.value}</div>
            </div>
            <div className="text-white font-bold text-sm">{data.label}</div>
            <Handle type="source" position={Position.Right} className="!bg-white !w-2 !h-2" />
        </div>
    </div>
);

const ItemNode = ({ data }: { data: any }) => (
    <div className="relative group w-56">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3 hover:bg-white/10 transition-colors">
            <Handle type="target" position={Position.Left} className="!bg-white/50 !w-1.5 !h-1.5" />
            <div className="text-white text-xs font-medium">{data.label}</div>
            {data.sub && <div className="text-cyan-400 text-[10px] font-mono mt-1">{data.sub}</div>}
        </div>
    </div>
);

const nodeTypes = {
    root: StrategicNode,
    category: CategoryNode,
    item: ItemNode
};

// =============================================================================
// LAYOUT GENERATION
// =============================================================================

const generateLayout = () => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Root Node
    nodes.push({
        id: 'root',
        type: 'root',
        data: { label: NODE_DATA.label },
        position: { x: 0, y: 0 }
    });

    const categories = NODE_DATA.children;
    const catRadius = 500; // Distance of categories from root

    categories.forEach((cat, i) => {
        // Calculate category position (Radial distribution)
        const angle = (i / categories.length) * 2 * Math.PI - (Math.PI / 2); // Start from top
        const cx = Math.cos(angle) * catRadius;
        const cy = Math.sin(angle) * catRadius;

        nodes.push({
            id: cat.id,
            type: 'category',
            data: { label: cat.label, value: cat.value, color: cat.color },
            position: { x: cx, y: cy }
        });

        edges.push({
            id: `e-root-${cat.id}`,
            source: 'root',
            target: cat.id,
            animated: true,
            style: { stroke: cat.color, strokeWidth: 2 },
        });

        // Items (Linear vertical stack relative to category)
        const items = cat.children;
        const itemSpacing = 80;
        const itemOffsetX = 300; // Distance to the right/left of category

        items.forEach((item, j) => {
            // Determine side based on category position
            const isLeft = cx < 0;
            const ix = cx + (isLeft ? -itemOffsetX : itemOffsetX);
            const iy = cy + ((j - (items.length - 1) / 2) * itemSpacing);

            nodes.push({
                id: item.id,
                type: 'item',
                data: { label: item.label, sub: (item as any).sub },
                position: { x: ix, y: iy }
            });

            edges.push({
                id: `e-${cat.id}-${item.id}`,
                source: cat.id,
                target: item.id,
                style: { stroke: 'rgba(255,255,255,0.2)' },
                type: 'smoothstep'
            });
        });
    });

    return { nodes, edges };
};

// =============================================================================
// COMPONENT
// =============================================================================

export default function OFIMindMap() {
    const { nodes: initialNodes, edges: initialEdges } = generateLayout();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div style={{ width: '100%', height: '100%' }} className="bg-black/95">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
                minZoom={0.1}
                maxZoom={1.5}
                defaultEdgeOptions={{ type: 'smoothstep', animated: true }}
                proOptions={{ hideAttribution: true }}
            >
                <Background color="#111" gap={20} />
                <Controls className="!bg-white/5 !border-white/10 !text-white" />
                <MiniMap
                    nodeColor={(n) => {
                        if (n.type === 'category') return (n.data as any).color;
                        if (n.type === 'root') return '#06b6d4';
                        return '#333';
                    }}
                    maskColor="rgba(0,0,0,0.7)"
                    className="!bg-black/50 !border-white/10"
                />
            </ReactFlow>
        </div>
    );
}
