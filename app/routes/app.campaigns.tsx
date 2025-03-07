import type { LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import {
  Card,
  Page,
  Button,
} from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import campaign from '../utils/shop'
import { useLoaderData } from "@remix-run/react"
import EmptyCampaigns from '../components/EmptyData'
import ListCampaigns from '../components/ListCampaigns'
import type { ResourceCampaignType } from "app/types/campaign"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request)

  const response = await admin.graphql(`
    query ShopMetafield($namespace: String!, $key: String!) {
      shop {
        id
        data: metafield(namespace: $namespace, key: $key) {
          value
        }
      }
    }`,
    {
      variables: {
        "namespace": campaign.namespace,
        "key": campaign.key
      },
    },
  )

  const responseJson = await response.json()

  const metafieldValue = responseJson.data!.shop!.data!.value;
  const arrayValue = JSON.parse(metafieldValue);

  if (!arrayValue.length) {
    return []
  }

  const resourceCampaign = arrayValue.map((item: ResourceCampaignType) => (
    {
      id: item.id,
      url: `/app/campaigns/${item.id}`,
      name: item.name,
      status: item.status,
    }
  ))
  
  return json(resourceCampaign)
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <Page
      title={`Campaigns`}
      primaryAction={
      <Button variant="primary" url="/app/create">
        New campaign
      </Button>}>
      <Card padding="0">
        {data.length
          ? <ListCampaigns campaigns={data} />
          : <EmptyCampaigns />
        }
      </Card>
    </Page>
  )
}
