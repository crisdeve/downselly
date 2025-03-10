const NODE_TYPES = [
  { type: 'selector', label: 'Input Selector', icon: '📋' },
  { type: 'timer', label: 'Time Input', icon: '⏱️' },
  { type: 'trigger', label: 'Trigger', icon: '🔔' },
  { type: 'action', label: 'Action', icon: '⚡' }
]

export default function NodePanel () {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside>
      <div className="w-64 p-4 bg-gray-50 overflow-y-auto">
        <h3 className="font-medium text-lg mb-4">Node Types</h3>
        <div className="space-y-2">
          {NODE_TYPES.map((nodeType) => (
            <div
              key={nodeType.type}
              className="p-3 bg-white border border-gray-200 rounded-md cursor-move flex items-center gap-2 shadow-sm hover:shadow transition-shadow"
              draggable
              onDragStart={(e) => onDragStart(e, nodeType.type)}
            >
              <span className="text-xl">{nodeType.icon}</span>
              <span>{nodeType.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <h4 className="font-medium mb-2">Instructions</h4>
          <p className="text-sm text-gray-600">
            Drag and drop nodes onto the canvas to build your downsell campaign flow.
            Double-click on nodes to edit their properties.
          </p>
        </div>
      </div>
    </aside>
  )
}
