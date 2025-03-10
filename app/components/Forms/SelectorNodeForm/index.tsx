import { useState } from 'react';
import type { NodeFormProps } from '../types';

export default function SelectorNodeForm ({ node, onUpdate }: NodeFormProps) {
  const [formData, setFormData] = useState({
    selectedOption: node.data.selectedOption || ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    onUpdate(node.id, { [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Campaign Type
        </label>
        <select
          name="selectedOption"
          value={formData.selectedOption || ''}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="">Select campaign type</option>
          <option value="new">New Customers</option>
          <option value="loyalty">Loyalty Customers</option>
        </select>
      </div>
    </div>
  );
};
