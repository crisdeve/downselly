import ContainerNode from "../ContainerNode"

export default function ActionNode({ data }: { data: any }) {
  return (
    <ContainerNode data={data}>
      <>{data.actionType
        ? `Type: ${data.actionType}`
        : 'Configure action'}
      </>
    </ContainerNode>   
  )
}