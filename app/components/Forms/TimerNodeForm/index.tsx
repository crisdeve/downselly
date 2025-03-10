import { useState } from 'react'
import type { NodeFormProps } from '../types'

export default function TimerNodeForm ({ node, onUpdate }: NodeFormProps) {
  const [formData, setFormData] = useState({
    hours: node.data.hours || 0,
    minutes: node.data.minutes || 0
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target
    const numValue = parseInt(value, 10) || 0
    
    setFormData(prev => ({ ...prev, [name]: numValue }))
    onUpdate(node.id, { [name]: numValue })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Evaluation Time
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Hours</label>
            <input
              type="number"
              name="hours"
              min="0"
              value={formData.hours}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Minutes</label>
            <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              value={formData.minutes}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
