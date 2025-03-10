import { useState } from 'react'
import type { NodeFormProps } from '../types'

const TRIGGER_TYPES = [
  { value: 'abandonment', label: 'Cart Abandonment' },
  { value: 'checkout', label: 'Checkout Started' },
  { value: 'product_view', label: 'Product View' },
  { value: 'collection_view', label: 'Collection View' }
]

export default function TriggerNodeForm ({ node, onUpdate }: NodeFormProps) {
  const [formData, setFormData] = useState({
    triggerType: node.data.triggerType || '',
    condition: node.data.condition || ''
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    onUpdate(node.id, { [name]: value })
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-3 rounded-md text-sm border border-yellow-300">
        This node is required to configure your downsell campaign.
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trigger Type
        </label>
        <select
          name="triggerType"
          value={formData.triggerType || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        >
          <option value="">Select trigger type</option>
          {TRIGGER_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Condition (optional)
        </label>
        <textarea
          name="condition"
          value={formData.condition || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
          placeholder="E.g., Cart value > $50, Product category = 'Shoes'"
        />
      </div>
    </div>
  )
}
