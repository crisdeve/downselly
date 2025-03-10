import {
  ReactFlow,
  Background,
  Controls
} from '@xyflow/react'

import '@xyflow/react/dist/style.css';

import { useFlowDiagram } from 'app/context/campaign'
import SelectorNode from '../Nodes/SelectorNode'
import TimerNode from '../Nodes/TimerNode'
import TriggerNode from '../Nodes/TriggerNode'
import ActionNode from '../Nodes/ActionNode'
import NodeDetailModal from '../NodeDetailModal'
import { Sheet } from '@shopify/polaris';

const nodeTypes = {
  selector: SelectorNode,
  timer: TimerNode,
  trigger: TriggerNode,
  action: ActionNode
}

export default function BuildCampaignCanvas () {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect,
    selectNode,
    isModalOpen,
    closeModal,
    selectedNode,
    addNode
  } = useFlowDiagram()

  const onNodeDoubleClick = (_: any, node: any) => {
    selectNode(node)
  }

  const onDrop = (event: any) => {
    event.preventDefault()
    
    const reactFlowContainer = document.querySelector('.react-flow')
    const type = event.dataTransfer.getData('application/reactflow')
    
    if (reactFlowContainer) {
      const reactFlowBounds = reactFlowContainer.getBoundingClientRect()
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      }
      
      addNode(type, position)
    }
  }

  const onDragOver = (event: any) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }

  return (
    <div className="reactflow-wrapper" style={{ height: 'calc(100vh - 56px)', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeDoubleClick={onNodeDoubleClick}
        fitView
        style={{ backgroundColor: "#F7F9FB" }}
      >
        <Background />
        <Controls />
      </ReactFlow>
      

      {isModalOpen && selectedNode && (
        <Sheet
          open={isModalOpen}
          onClose={closeModal}
          accessibilityLabel="Manage sales channels"
        >
          <NodeDetailModal node={selectedNode} />
        </Sheet>
      )}
    </div>
  )
}
