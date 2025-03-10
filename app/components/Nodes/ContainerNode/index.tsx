import { Handle, Position } from '@xyflow/react';

interface ContainerNodeProps {
  children: JSX.Element[] | JSX.Element,
  data: any
}

export default function ContainerNode({ children, data }: ContainerNodeProps) {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <div>
        {children}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}