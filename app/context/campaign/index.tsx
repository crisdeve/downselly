import { createContext, useContext, useReducer, useCallback } from 'react'
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react'
import type { Actions, AddNodeVoid, CloseModalVoid, PositionType, SelectNodeVoid, UpdateNodeDataVoid } from './types'
import {
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';
import { createNewNode } from 'app/utils/nodes';

export interface CurrentCampaignContextType {
  nodes: Node[],
  edges: Edge[],
  selectedNode: any,
  isModalOpen: boolean,
  onNodesChange: OnNodesChange,
  onEdgesChange: OnEdgesChange,
  onConnect: OnConnect,
  addNode: AddNodeVoid,
  selectNode: SelectNodeVoid,
  closeModal: CloseModalVoid,
  updateNodeData: UpdateNodeDataVoid
}

interface DiagramProviderProps {
  children: JSX.Element[] | JSX.Element
}

const FlowDiagramContext = createContext<CurrentCampaignContextType | null>(null)

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  isModalOpen: false
}

function flowReducer(state: any, action: Actions) {
  switch (action.type) {
    case 'SET_NODES':
      return {
        ...state,
        nodes: action.payload
      }
    case 'SET_EDGES':
      return {
        ...state,
        edges: action.payload
      }
    case 'ADD_NODE':
      return {
        ...state,
        nodes: [...state.nodes, action.payload]
      }
    case 'ON_NODES_CHANGE':
      return {
        ...state,
        nodes: applyNodeChanges(action.payload, state.nodes)
      }
    case 'ON_EDGES_CHANGE':
      return {
        ...state,
        edges: applyEdgeChanges(action.payload, state.edges)
      }
    case 'ON_CONNECT':
      return {
        ...state,
        edges: addEdge(action.payload, state.edges)
      }
    case 'SELECT_NODE':
      return {
        ...state,
        selectedNode: action.payload,
        isModalOpen: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
        selectedNode: null
      }
    case 'UPDATE_NODE_DATA':
      return {
        ...state,
        nodes: state.nodes.map((node: any) => 
          node.id === action.payload.id 
            ? { ...node, data: { ...node.data, ...action.payload.data } }
            : node
        )
      }
    default:
      return state
  }
}

export const FlowDiagramProvider = ({ children }: DiagramProviderProps) => {
  const [state, dispatch] = useReducer(flowReducer, initialState)

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => dispatch({ type: 'ON_NODES_CHANGE', payload: changes }),
    [dispatch]
  )

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => dispatch({ type: 'ON_EDGES_CHANGE', payload: changes }),
    [dispatch]
  )

  const onConnect: OnConnect = useCallback(
    (connection) => dispatch({ type: 'ON_CONNECT', payload: connection }),
    [dispatch]
  )

  const addNode: AddNodeVoid = useCallback(
    (nodeType: string, position: PositionType) => {
      const newNode = createNewNode(nodeType, position)
      dispatch({ type: 'ADD_NODE', payload: newNode })
    },
    [dispatch]
  )

  const selectNode: SelectNodeVoid = useCallback(
    (node: any) => dispatch({ type: 'SELECT_NODE', payload: node }),
    [dispatch]
  )

  const closeModal: CloseModalVoid = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  )

  const updateNodeData: UpdateNodeDataVoid = useCallback(
    (id: string, data: any) => dispatch({ type: 'UPDATE_NODE_DATA', payload: { id, data } }),
    [dispatch]
  )

  const value: CurrentCampaignContextType|any = {
    nodes: state.nodes,
    edges: state.edges,
    selectedNode: state.selectedNode,
    isModalOpen: state.isModalOpen,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    selectNode,
    closeModal,
    updateNodeData
  }

  return (
    <FlowDiagramContext.Provider value={value}>
      {children}
    </FlowDiagramContext.Provider>
  )
}

export const useFlowDiagram = () => {
  const context = useContext(FlowDiagramContext)
  
  if (!context) {
    throw new Error('useFlowDiagram must be used within a FlowDiagramProvider')
  }

  return context
}