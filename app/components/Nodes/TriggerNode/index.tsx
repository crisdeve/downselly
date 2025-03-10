import ContainerNode from "../ContainerNode"

export default function TriggerNode({ data }: { data: any }) {
  return (
    <ContainerNode data={data}>
      <>{data.triggerType
        ? `Type: ${data.triggerType}`
        : 'Configure trigger'}
      </>
    </ContainerNode>   
  )
}