"use client"

import { useState, useCallback } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  MiniMap,
  type NodeChange,
  type EdgeChange,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow"
import "reactflow/dist/style.css"
import ProgramNode from "./program-node"
import { Button } from "@/components/ui/button"
import { Plus, Save } from "lucide-react"

const nodeTypes = {
  programNode: ProgramNode,
}

const initialNodes: Node[] = [
  {
    id: "1",
    type: "programNode",
    position: { x: 250, y: 100 },
    data: {
      label: "Initialize Program",
      description: "Creates initial state for the program",
      nodeType: "entry",
    },
  },
  {
    id: "2",
    type: "programNode",
    position: { x: 100, y: 250 },
    data: {
      label: "Process Transaction",
      description: "Handles token transfers between accounts",
      nodeType: "process",
    },
  },
  {
    id: "3",
    type: "programNode",
    position: { x: 400, y: 250 },
    data: {
      label: "Update State",
      description: "Updates program state based on transaction",
      nodeType: "process",
    },
  },
  {
    id: "4",
    type: "programNode",
    position: { x: 250, y: 400 },
    data: {
      label: "Finalize",
      description: "Completes the transaction and emits events",
      nodeType: "exit",
    },
  },
]

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
]

export default function FlowDiagram() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes)
  const [edges, setEdges] = useState<Edge[]>(initialEdges)

  const onNodesChange = useCallback((changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)), [])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)), [])

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge({ ...connection, animated: true }, eds)),
    [],
  )

  const addNewNode = () => {
    const newNodeId = (nodes.length + 1).toString()
    const newNode: Node = {
      id: newNodeId,
      type: "programNode",
      position: { x: 250, y: 250 },
      data: {
        label: "New Node",
        description: "Description for new node",
        nodeType: "process",
      },
    }
    setNodes([...nodes, newNode])
  }

  const saveFlowDiagram = () => {
    const flowData = { nodes, edges }
    console.log("Saving flow diagram:", flowData)
    // In a real app, you would save this to a database or file
    alert("Flow diagram saved!")
  }

  return (
    <div className="h-full w-full">
      <div className="absolute top-16 right-4 z-10 flex gap-2">
        <Button size="sm" onClick={addNewNode}>
          <Plus className="h-4 w-4 mr-1" /> Add Node
        </Button>
        <Button size="sm" variant="secondary" onClick={saveFlowDiagram}>
          <Save className="h-4 w-4 mr-1" /> Save
        </Button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}

