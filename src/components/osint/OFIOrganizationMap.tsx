'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Building2, ChevronRight, ChevronDown, Globe, Cpu, Users,
    Leaf, Package, Coffee, Milk, TreePine, Wheat, Network,
    Shield, FileText, Factory, Layers
} from 'lucide-react';

// =============================================================================
// OFI ORGANIZATION STRUCTURE DATA
// Based on the Olam Group Reorganization Structure
// =============================================================================

interface OrgNode {
    id: string;
    name: string;
    type: 'group' | 'division' | 'platform' | 'entity' | 'product';
    icon?: React.ReactNode;
    link?: string;
    children?: OrgNode[];
    color?: string;
}

const ORG_STRUCTURE: OrgNode = {
    id: 'olam-group',
    name: 'Olam Group (Re-organisation)',
    type: 'group',
    icon: <Building2 size={18} />,
    color: '#1e3a5f',
    children: [
        {
            id: 'ofi',
            name: 'ofi (Olam Food Ingredients)',
            type: 'division',
            icon: <Package size={16} />,
            link: '/corporate/osint-report/group-structure',
            color: '#2d5a4a',
            children: [
                {
                    id: 'core-platforms',
                    name: 'Core Platforms',
                    type: 'platform',
                    children: [
                        { id: 'cocoa', name: 'Cocoa', type: 'product', link: '/corporate/osint-report/braincube-analysis', icon: <Package size={14} /> },
                        { id: 'coffee', name: 'Coffee', type: 'product', icon: <Coffee size={14} /> },
                        { id: 'dairy', name: 'Dairy', type: 'product', link: '/corporate/osint-report/dairy-facility-architecture', icon: <Milk size={14} /> },
                        { id: 'nuts', name: 'Nuts', type: 'product', icon: <TreePine size={14} /> },
                        { id: 'spices', name: 'Spices', type: 'product', icon: <Leaf size={14} /> },
                    ]
                },
                {
                    id: 'strategic-entities',
                    name: 'Strategic Entities',
                    type: 'platform',
                    children: [
                        { id: 'fab-solutions', name: 'F&B Solutions', type: 'entity' },
                        { id: 'club-coffee', name: 'Club Coffee', type: 'entity' },
                        { id: 'dezaan', name: 'deZaan', type: 'entity' },
                        { id: 'bt-cocoa', name: 'BT Cocoa', type: 'entity' },
                    ]
                },
                {
                    id: 'digital-innovation',
                    name: 'Digital & Innovation',
                    type: 'platform',
                    link: '/corporate/osint-report/tech-intel',
                    children: [
                        { id: 'braincube', name: 'Braincube IIoT Partnership', type: 'entity', link: '/corporate/osint-report/braincube-third-party-risk' },
                        { id: 'csc', name: 'Customer Solution Centres (CSCs)', type: 'entity', link: '/corporate/osint-report/shanghai-iec62443' },
                        { id: 'brightseed', name: 'AI Potency Research (Brightseed)', type: 'entity', link: '/corporate/osint-report/ai-partnerships' },
                    ]
                },
                {
                    id: 'sustainability',
                    name: 'Sustainability',
                    type: 'platform',
                    children: [
                        { id: 'atsource', name: 'AtSource Platform', type: 'entity' },
                        { id: 'cocoa-compass', name: 'Cocoa Compass', type: 'entity' },
                    ]
                }
            ]
        },
        {
            id: 'olam-agri',
            name: 'Olam Agri',
            type: 'division',
            icon: <Wheat size={16} />,
            color: '#3d6b3d',
            children: [
                {
                    id: 'key-products',
                    name: 'Key Products',
                    type: 'platform',
                    children: [
                        { id: 'grains', name: 'Grains & Oilseeds', type: 'product' },
                        { id: 'rice', name: 'Rice', type: 'product' },
                        { id: 'cotton', name: 'Cotton', type: 'product' },
                        { id: 'wood', name: 'Wood Products', type: 'product' },
                        { id: 'rubber', name: 'Rubber', type: 'product' },
                        { id: 'animal-feed', name: 'Animal Feed & Protein', type: 'product' },
                    ]
                },
                {
                    id: 'strategic-dev',
                    name: 'Strategic Developments',
                    type: 'platform',
                    children: [
                        { id: 'salic', name: 'SALIC Partnership (44.58%)', type: 'entity' },
                    ]
                },
                {
                    id: 'initiatives',
                    name: 'Initiatives',
                    type: 'platform',
                    children: [
                        { id: 'qld-cotton', name: 'Queensland Cotton', type: 'entity' },
                        { id: 'crown-flour', name: 'Crown Flour Mills', type: 'entity' },
                    ]
                }
            ]
        },
        {
            id: 'remaining-group',
            name: 'Remaining Olam Group',
            type: 'division',
            icon: <Layers size={16} />,
            color: '#4a5568',
            children: [
                {
                    id: 'digital-platforms',
                    name: 'Digital Platforms',
                    type: 'platform',
                    children: [
                        { id: 'mindsprint', name: 'Mindsprint (IT/Digital Services)', type: 'entity', link: '/corporate/osint-report/security' },
                        { id: 'nupo', name: 'Nupo Ventures (Venture Studio)', type: 'entity' },
                        { id: 'terrascope', name: 'Terrascope (Decarbonization SaaS)', type: 'entity' },
                        { id: 'jiva', name: 'Jiva (Farmer Services - Closed)', type: 'entity' },
                    ]
                },
                {
                    id: 'continuing-assets',
                    name: 'Continuing Assets',
                    type: 'platform',
                    children: [
                        { id: 'palm-gabon', name: 'Olam Palm Gabon', type: 'entity' },
                        { id: 'ruimsig', name: 'Ruimsig', type: 'entity' },
                        { id: 'arise', name: 'ARISE P&L', type: 'entity' },
                    ]
                }
            ]
        },
        {
            id: 'governance',
            name: 'Group Governance & Operations',
            type: 'division',
            icon: <Shield size={16} />,
            color: '#553c7d',
            children: [
                {
                    id: 'board',
                    name: 'Board Committees',
                    type: 'platform',
                    children: [
                        { id: 'iraf', name: 'Integrated Risk Assurance Framework (IRAF)', type: 'entity' },
                    ]
                },
                {
                    id: 'frameworks',
                    name: 'Frameworks',
                    type: 'platform',
                    children: [
                        { id: 'code-conduct', name: 'Code of Conduct', type: 'entity' },
                        { id: 'light', name: 'Living Income Gap Heuristic Tool (LIGHT)', type: 'entity' },
                    ]
                }
            ]
        }
    ]
};

// =============================================================================
// TREE NODE COMPONENT
// =============================================================================

function TreeNode({ node, depth = 0, isLast = false }: { node: OrgNode; depth?: number; isLast?: boolean }) {
    const [isExpanded, setIsExpanded] = useState(depth < 2);
    const hasChildren = node.children && node.children.length > 0;

    const getNodeStyle = () => {
        switch (node.type) {
            case 'group':
                return 'bg-[#1e3a5f] border-[#1e3a5f] text-white';
            case 'division':
                return `bg-[${node.color || '#2d5a4a'}] border-[${node.color || '#2d5a4a'}] text-white`;
            case 'platform':
                return 'bg-[#2d4a3a] border-[#3d5a4a] text-white';
            case 'entity':
            case 'product':
            default:
                return 'bg-[#3d5a4a] border-[#4d6a5a] text-white hover:bg-[#4d6a5a]';
        }
    };

    const content = (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all cursor-pointer ${getNodeStyle()}`}
            onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
            {hasChildren && (
                <span className="text-white/60">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </span>
            )}
            {node.icon && <span className="opacity-80">{node.icon}</span>}
            <span className="font-medium">{node.name}</span>
            {node.link && (
                <span className="text-oxot-gold text-[10px] ml-1">→</span>
            )}
        </div>
    );

    return (
        <div className="relative">
            {/* Connection Line */}
            {depth > 0 && (
                <div className="absolute left-0 top-0 w-6 h-4 border-l-2 border-b-2 border-white/20 rounded-bl-lg"
                    style={{ left: '-24px', top: '0' }} />
            )}

            {/* Node */}
            <div className="mb-2">
                {node.link ? (
                    <Link href={node.link} className="inline-block">
                        {content}
                    </Link>
                ) : (
                    content
                )}
            </div>

            {/* Children */}
            {hasChildren && isExpanded && (
                <div className="ml-8 pl-4 border-l-2 border-white/10">
                    {node.children!.map((child, i) => (
                        <TreeNode
                            key={child.id}
                            node={child}
                            depth={depth + 1}
                            isLast={i === node.children!.length - 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function OFIOrganizationMap() {
    return (
        <div className="glass-panel p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Network className="text-oxot-gold" size={20} />
                    <h3 className="text-white font-semibold">OFI Corporate Structure Map</h3>
                </div>
                <span className="text-xs text-grey font-mono">Click nodes to expand • Gold arrows indicate linked pages</span>
            </div>

            <div className="overflow-x-auto pb-4">
                <div className="min-w-[600px]">
                    <TreeNode node={ORG_STRUCTURE} />
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#1e3a5f]" />
                        <span className="text-grey">Parent Group</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#2d5a4a]" />
                        <span className="text-grey">Operating Division</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-[#3d5a4a]" />
                        <span className="text-grey">Platform / Entity</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-oxot-gold">→</span>
                        <span className="text-grey">Links to OSINT Module</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
