import type { Node } from '@xyflow/react'
import type { UpdateNodeDataVoid } from 'app/context/campaign/types'

export interface NodeFormProps {
  node: Node,
  onUpdate: UpdateNodeDataVoid
}