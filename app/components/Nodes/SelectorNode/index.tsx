import ContainerNode from "../ContainerNode"

export default function SelectorNode({ data }: { data: any }) {
  return (
    <ContainerNode data={data}>
      <>{data.selectedOption
        ? `Option: ${data.selectedOption}`
        : 'No option selected'}
      </>
    </ContainerNode>   
  )
}