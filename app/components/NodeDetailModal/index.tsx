import { useFlowDiagram } from 'app/context/campaign'
import SelectorNodeForm from '../Forms/SelectorNodeForm'
import TimerNodeForm from '../Forms/TimerNodeForm'
import TriggerNodeForm from '../Forms/TriggerNodeForm'
import ActionNodeForm from '../Forms/ActionNodeForm'
import { Button, Scrollable, Text } from '@shopify/polaris'
import {XIcon} from '@shopify/polaris-icons';

export default function NodeDetailModal ({ node }: { node: any }) {
  const { closeModal, updateNodeData } = useFlowDiagram()

  const renderFormByNodeType = () => {
    switch (node.type) {
      case 'selector':
        return <SelectorNodeForm node={node} onUpdate={updateNodeData} />
      case 'timer':
        return <TimerNodeForm node={node} onUpdate={updateNodeData} />
      case 'trigger':
        return <TriggerNodeForm node={node} onUpdate={updateNodeData} />
      case 'action':
        return <ActionNodeForm node={node} onUpdate={updateNodeData} />
      default:
        return <div>Unknown node type</div>
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          alignItems: 'center',
          borderBottom: '1px solid #DFE3E8',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
          width: '100%',
        }}
      >
        <Text variant="headingMd" as="h2">
          Edit {node.data.label}
        </Text>
        <Button
          accessibilityLabel="Cancel"
          icon={XIcon}
          onClick={closeModal}
          variant="plain"
        />
      </div>
      
      <Scrollable style={{padding: '1rem', height: '100%'}}>
        {renderFormByNodeType()}
      </Scrollable>
      
      <div
        style={{
          alignItems: 'center',
          borderTop: '1px solid #DFE3E8',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '1rem',
          width: '100%',  
        }}
      >
        <Button onClick={closeModal}>Cancel</Button>
        <Button variant="primary" onClick={closeModal}>
          Done
        </Button>
      </div>
    </div>
  )
}
