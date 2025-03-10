import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react"
import { Box } from "@shopify/polaris"
import { useFlowDiagram } from "app/context/campaign"

export default function OutputCampaign () {
  const { nodes, edges } = useFlowDiagram()
  const shopify = useAppBridge()

  const generateCampaignConfig = () => {
    // Filter nodes by type
    const selectors = nodes.filter(node => node.type === 'selector')
    const timers = nodes.filter(node => node.type === 'timer')
    const triggers = nodes.filter(node => node.type === 'trigger')
    const actions = nodes.filter(node => node.type === 'action')

    // Construct configuration object
    const config = {
      campaignName: 'New Downsell Campaign',

      campaignType: selectors.find(node => 
        node.data.selectedOption === 'new' || node.data.selectedOption === 'loyalty'
      )?.data.selectedOption || 'new',

      evaluationTime: timers.length > 0 ? {
        hours: timers[0].data.hours || 0,
        minutes: timers[0].data.minutes || 0
      } : { hours: 0, minutes: 0 },

      triggers: triggers.map(node => ({
        id: node.id,
        type: node.data.triggerType,
        condition: node.data.condition
      })),

      actions: actions.map(node => ({
        id: node.id,
        type: node.data.actionType,
        parameters: node.data.parameters
      })),

      flow: edges.map(edge => ({
        source: edge.source,
        target: edge.target
      }))
    }

    return config
  }

  const prettyPrintJson = (obj: any) => {
    return JSON.stringify(obj, null, 2)
  }

  const handleExport = () => {
    const config = generateCampaignConfig()
    const dataStr = "data:text/jsoncharset=utf-8," + encodeURIComponent(JSON.stringify(config))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "downsell-campaign.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <Modal id="modal-output">
      <Code>
        {prettyPrintJson(generateCampaignConfig())}
      </Code>

      <TitleBar title="Campaign Output">
        <button onClick={() => shopify.modal.hide('modal-output')}>Close</button>
        <button variant="primary" onClick={handleExport}>Export Campaign</button>
      </TitleBar>
    </Modal>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <pre>
        <code>
          {children}
        </code>
      </pre>
    </Box>
  );
}
