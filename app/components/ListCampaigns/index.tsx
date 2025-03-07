import { Badge, ResourceItem, ResourceList, Text } from '@shopify/polaris'
import type { ResourceCampaignType } from 'app/types/campaign'
import type { ResourceListProps } from '@shopify/polaris'
import { useState } from 'react'
import { DeleteIcon } from '@shopify/polaris-icons'

interface ListCampaignsPropsType {
  campaigns: ResourceCampaignType[]
}

export default function Index({ campaigns }: ListCampaignsPropsType) {
  const [selectedItems, setSelectedItems] = useState<ResourceListProps['selectedItems']>([])
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC')

  const bulkActions = [
    {
      content: 'Active campaigns',
      onAction: () => console.log('Active selected'),
    },
    {
      icon: DeleteIcon,
      destructive: true,
      content: 'Delete',
      onAction: () => console.log('Delecte selected'),
    }
  ]

  return (
    <ResourceList
      selectedItems={selectedItems}
      onSelectionChange={setSelectedItems}
      bulkActions={bulkActions}
      sortValue={sortValue}
      sortOptions={[
        { label: 'Newest update', value: 'DATE_MODIFIED_DESC' },
        { label: 'Oldest update', value: 'DATE_MODIFIED_ASC' },
      ]}
      onSortChange={(selected) => {
        setSortValue(selected)
      }}
      pagination={{
        hasNext: true,
        onNext: () => {
          console.log('Next')
        },
        onPrevious: () => {
          console.log('Previous')
        }
      }}
      resourceName={{singular: 'campaign', plural: 'campaigns'}}
      items={campaigns}
      renderItem={(item) => {
        const {id, url, name, status} = item

        return (
          <ResourceItem
            id={id}
            url={url}
            accessibilityLabel={`View details for ${name}`}
          >
            <Text variant='bodyMd' fontWeight='bold' as='h3'>
              {name}
            </Text>
            <Badge tone={status === "Active" ? "success" : "info"}>
              {status}
            </Badge>
          </ResourceItem>
        )
      }}
    />
  )
}