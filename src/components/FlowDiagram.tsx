'use client'

import React, { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  NodeProps,
  Edge,
  Node,
  ConnectionLineType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const CustomNode = ({ data }: NodeProps<Node<{ label: string; label_top?: string }>>) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-black border-2 border-oxot-red text-white font-mono min-w-[150px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-oxot-blue" />
      <div className="text-[10px] text-grey uppercase tracking-widest mb-1">{data.label_top}</div>
      <div className="font-bold text-sm">{data.label}</div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-oxot-red" />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

interface FlowDiagramProps {
  nodes: Node[];
  edges: Edge[];
}

export default function FlowDiagram({ nodes, edges }: FlowDiagramProps) {
  return (
    <div className="h-[600px] w-full border border-grey/20 rounded-2xl overflow-hidden bg-black/40 backdrop-blur-md">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Background color="#333" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
