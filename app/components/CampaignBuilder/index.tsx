import { useNavigate } from "@remix-run/react"
import {
  Badge,
  Button,
  ButtonGroup,
  FullscreenBar,
  Text,
} from "@shopify/polaris"
import { FlowDiagramProvider } from "app/context/campaign";
import NodePanel from "../PanelToSelectTypeNode";
import BuildCampaignCanvas from "../BuildCampaignCanvas";
import OutputCampaign from "../OutputCampaign";
import { ReactFlowProvider } from '@xyflow/react';
import { useAppBridge } from "@shopify/app-bridge-react";
import './index.css'

interface CampaignBuilder {
  fetcher: any,
  data: any,
  title: string
}

export default function CampaignBuilder({ fetcher, data, title }: CampaignBuilder) {
  const navigate = useNavigate()
  const shopify = useAppBridge()

  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST"
  console.log(data)
  
  const handleActionClick = () => {
    navigate('/app/campaigns')
  }

  const generate = () => fetcher.submit({}, { method: "POST" })

  return (
    <div style={{ width: '100%' }}>
      <FullscreenBar onAction={handleActionClick}>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <Badge tone="info">Draft</Badge>

          <div style={{ marginLeft: '1rem', flexGrow: 1 }}>
            <Text variant="headingLg" as="p">
              {title}
            </Text>
          </div>

          <ButtonGroup>
            <Button onClick={() => shopify.modal.show('modal-output')}>Export</Button>
            <Button variant="primary" loading={isLoading} onClick={generate}>
              Save
            </Button>
          </ButtonGroup>
        </div>
      </FullscreenBar>
      
      <ReactFlowProvider>
        <FlowDiagramProvider>
          <div className="flow">
            <NodePanel />
            <BuildCampaignCanvas />
          </div>
          
          <OutputCampaign />
        </FlowDiagramProvider>
      </ReactFlowProvider> 
    </div>
  );
}
