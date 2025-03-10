import type { PositionType } from "app/context/campaign/types"

function getNodeLabel(type: string) {
  switch (type) {
    case 'selector':
      return 'Input Selector'
    case 'timer':
      return 'Time Input'
    case 'trigger':
      return 'Trigger'
    case 'action':
      return 'Action'
    default:
      return 'Node'
  }
}

export function createNewNode(type: string, position: PositionType) {
  const id = `${type.toLowerCase()}-${Date.now()}`
  const baseNode = {
    id,
    position,
    type: type,
    data: { label: getNodeLabel(type), type }
  }

  switch (type) {
    case 'selector':
      return {
        ...baseNode,
        data: {
          ...baseNode.data,
          options: [],
          selectedOption: null
        },
        style: { background: '#f0f9ff', border: '1px solid #93c5fd' }
      }
    case 'timer':
      return {
        ...baseNode,
        data: {
          ...baseNode.data,
          hours: 0,
          minutes: 0
        },
        style: { background: '#f0fdf4', border: '1px solid #86efac' }
      }
    case 'trigger':
      return {
        ...baseNode,
        data: {
          ...baseNode.data,
          condition: null,
          triggerType: null,
          required: true
        },
        style: { background: '#fff7ed', border: '1px solid #fdba74' }
      }
    case 'action':
      return {
        ...baseNode,
        data: {
          ...baseNode.data,
          actionType: null,
          parameters: {},
          required: true
        },
        style: { background: '#fef2f2', border: '1px solid #fca5a5' }
      }
    default:
      return baseNode
  }
}
