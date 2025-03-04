import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useFetcher, useLoaderData } from "@remix-run/react";
import {
  Page,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `query {
      shop {
        id
        name
        currencyCode
        checkoutApiSupported
        taxesIncluded
        resourceLimits {
          maxProductVariants
        }
      }
    }`,
  );

  const responseJson = await response.json();

  console.log(responseJson);

  return json(responseJson);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields {
            key
            namespace
            value
            createdAt
            updatedAt
          }
          userErrors {
            field
            message
            code
          }
        }
      }
    `,
    {
      variables: {
        metafields: [
          {
            "key": "example_key",
            "namespace": "example_namespace",
            "ownerId": "gid://shopify/Shop/85931655516",
            "type": "single_line_text_field",
            "value": "Example Value"
          }
        ]
      },
    },
  );

  const responseJson = await response.json();
  console.log(responseJson)

  return responseJson
};

export default function Index() {
  const fetcher = useFetcher<typeof action>();

  /* const shopify = useAppBridge(); */
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";
  const data = useLoaderData<typeof loader>();
  console.log(data);

  useEffect(() => {
    /* shopify.toast.show("Product created"); */
  }, []);
  
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <Page>
      <TitleBar title="Create a campaign">
        <button variant="primary" onClick={generateProduct}>
          Generate campaign
        </button>
      </TitleBar>
    </Page>
  );
}
