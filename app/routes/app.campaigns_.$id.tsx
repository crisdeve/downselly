import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import {
  Page,
  Text,
  Card,
  Button,
} from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import campaign from '../utils/shop'

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request)
  const newCampaign = campaign.create(null)

  const response = await admin.graphql(`
    mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          value
        }
        userErrors {
          field
          message
          code
        }
      }
    }`,
    {
      variables: {
        metafields: [
          {
            "key": campaign.key,
            "namespace": campaign.namespace,
            "ownerId": "gid://shopify/Shop/85931655516",
            "type": campaign.type,
            "value": newCampaign
          }
        ]
      },
    },
  )

  const responseJson = await response.json()

  return {
    metafields: responseJson!.data!.metafieldsSet!.metafields,
  }
}

export default function Index() {
  const { data } = useLoaderData<typeof loader>()
  const params = useParams()
  console.log(data)

  return (
    <Page
      backAction={{content: 'Campaigns', url: '/app/campaigns'}}
      title={`Camgaign ${params.id}`}
      primaryAction={
      <Button variant="primary">
        Save
      </Button>}>
      <Card>
        <Text as="h2" variant="bodyMd">
          Content inside a card
        </Text>
      </Card>
    </Page>
  )
}
