import { memo } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"

type NodeData = {
  label: string
  description: string
  nodeType: "entry" | "process" | "exit"
}

function ProgramNode({ data }: NodeProps<NodeData>) {
  const getNodeColor = () => {
    switch (data.nodeType) {
      case "entry":
        return "bg-green-100 border-green-300"
      case "exit":
        return "bg-red-100 border-red-300"
      default:
        return "bg-blue-100 border-blue-300"
    }
  }

  const getBadgeVariant = () => {
    switch (data.nodeType) {
      case "entry":
        return "bg-green-500 hover:bg-green-500"
      case "exit":
        return "bg-red-500 hover:bg-red-500"
      default:
        return "bg-blue-500 hover:bg-blue-500"
    }
  }

  return (
    <div className="relative">
      <Card className={`w-64 shadow-md ${getNodeColor()}`}>
        <CardHeader className="p-3 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-sm font-medium">{data.label}</CardTitle>
            <Badge className={getBadgeVariant()}>
              {data.nodeType.charAt(0).toUpperCase() + data.nodeType.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-3 pt-2">
          <p className="text-xs text-gray-600">{data.description}</p>
        </CardContent>
      </Card>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />
    </div>
  )
}

export default memo(ProgramNode)

