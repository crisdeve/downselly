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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request)

  const response = await admin.graphql(`
    query ShopMetafield($namespace: String!, $key: String!) {
      shop {
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
  
  return json(responseJson)
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>()
  console.log({data, length: data.length})

  return (
    <Page
      title={`Campaigns`}
      primaryAction={
      <Button variant="primary" url="/app/create">
        New campaign
      </Button>}>
      <Card>
        {data.length
          ? <ListCampaigns campaigns={data} />
          : <EmptyCampaigns />
        }
      </Card>
    </Page>
  )
}
