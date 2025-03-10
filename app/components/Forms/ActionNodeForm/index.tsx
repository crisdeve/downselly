import { useState } from 'react'
import type { NodeFormProps } from '../types'

const ACTION_TYPES = [
  { value: 'popup', label: 'Show Popup' },
  { value: 'email', label: 'Send Email' },
  { value: 'discount', label: 'Offer Discount' },
  { value: 'redirect', label: 'Page Redirect' }
];

export default function ActionNodeForm ({ node, onUpdate }: NodeFormProps) {
  const [formData, setFormData] = useState({
    actionType: node.data.actionType || '',
    parameters: node.data.parameters || {}
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    
    if (name === 'actionType') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value,
        parameters: {} // Reset parameters when action type changes
      }))
      onUpdate(node.id, { [name]: value, parameters: {} })
    } else {
      // Handle parameters updates
      const updatedParams = { ...formData.parameters, [name]: value }
      setFormData(prev => ({ ...prev, parameters: updatedParams }))
      onUpdate(node.id, { parameters: updatedParams })
    }
  }

  const renderParameterFields = () => {
    switch (formData.actionType) {
      case 'popup':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Popup Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.parameters.title || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Popup Message
              </label>
              <textarea
                name="message"
                value={formData.parameters.message || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 h-24"
              />
            </div>
          </>
        )
      case 'discount':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type
              </label>
              <select
                name="discountType"
                value={formData.parameters.discountType || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select discount type</option>
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value
              </label>
              <input
                type="number"
                name="value"
                value={formData.parameters.value || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </>
        )
      case 'email':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.parameters.subject || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Template
              </label>
              <select
                name="template"
                value={formData.parameters.template || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select template</option>
                <option value="downsell_basic">Basic Downsell</option>
                <option value="downsell_premium">Premium Downsell</option>
              </select>
            </div>
          </>
        )
      case 'redirect':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Redirect URL
            </label>
            <input
              type="text"
              name="url"
              value={formData.parameters.url || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 p-3 rounded-md text-sm border border-yellow-300">
        This node is required to configure your downsell campaign.
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Action Type
        </label>
        <select
          name="actionType"
          value={formData.actionType || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          required
        >
          <option value="">Select action type</option>
          {ACTION_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>
      
      {formData.actionType && (
        <div className="space-y-4 pt-2">
          <h4 className="font-medium text-sm text-gray-700">Configure Parameters</h4>
          {renderParameterFields()}
        </div>
      )}
    </div>
  )
}
