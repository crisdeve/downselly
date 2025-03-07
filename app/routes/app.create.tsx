import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"
import { useFetcher, useLoaderData } from "@remix-run/react"
import { json } from "@remix-run/node"
import {
  Button,
  Card,
  Page,
  Text,
} from "@shopify/polaris"
import { authenticate } from "../shopify.server"
import campaign from '../utils/shop'

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
    return json([])
  }
  
  return json(arrayValue)
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
  const fetcher = useFetcher<typeof action>()

  /* const shopify = useAppBridge() */
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST"
  const { data } = useLoaderData<typeof loader>()
  console.log(data)

  /* useEffect(() => {
    shopify.toast.show("Product created")
  }, [campaignData, shopify]) */
  
  const generate = () => fetcher.submit({}, { method: "POST" })

  return (
    <Page
      backAction={{content: 'Campaigns', url: '/app/campaigns'}}
      title="Create a campaign"
      primaryAction={
      <Button variant="primary" loading={isLoading} onClick={generate}>
        Create
      </Button>}>
      <Card>
        <Text as="h2" variant="bodyMd">
          Content inside a card
        </Text>
      </Card>
    </Page>
  )
}
