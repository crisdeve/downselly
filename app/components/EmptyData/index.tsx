import { EmptyState } from "@shopify/polaris";

export default function Index() {
  return (
    <EmptyState
      heading="Manage your downsell campaigns"
      action={{
        content: 'Create a campaign',
        url: '/app/create',
      }}
      image="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-download-in-svg-png-gif-file-formats--no-items-added-web-app-page-bucket-state-pack-design-development-illustrations-3016826.png?f=webp">
      <p>Integrate automatic downsells into your Shopify store and turn hesitation into sales. Don't let potential customers slip away! 🚀</p>
    </EmptyState>
  )
}