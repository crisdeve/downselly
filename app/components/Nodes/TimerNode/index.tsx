import ContainerNode from "../ContainerNode"

export default function TimerNode({ data }: { data: any }) {
  return (
    <ContainerNode data={data}>
      <>{data.hours}h {data.minutes}m</>
    </ContainerNode>   
  )
}