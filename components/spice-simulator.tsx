"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Play,
  Square,
  Save,
  Upload,
  Download,
  Settings,
  Radio,
  Waves,
  Eye,
  BarChart3,
  Grid3X3,
  Move,
  RotateCcw,
  Trash2,
  Copy,
  Share,
} from "lucide-react"

const components = [
  { id: "resistor", name: "Resistor", symbol: "R", icon: "━━━━━", category: "Passive" },
  { id: "capacitor", name: "Capacitor", symbol: "C", icon: "━┤├━", category: "Passive" },
  { id: "inductor", name: "Inductor", symbol: "L", icon: "━∩∩∩━", category: "Passive" },
  { id: "voltage_source", name: "Voltage Source", symbol: "V", icon: "━⊕━", category: "Sources" },
  { id: "current_source", name: "Current Source", symbol: "I", icon: "━⊙━", category: "Sources" },
  { id: "diode", name: "Diode", symbol: "D", icon: "━▷|━", category: "Semiconductors" },
  { id: "mosfet_n", name: "NMOS", symbol: "M", icon: "┤├", category: "Semiconductors" },
  { id: "mosfet_p", name: "PMOS", symbol: "M", icon: "┤○├", category: "Semiconductors" },
  { id: "bjt_npn", name: "NPN BJT", symbol: "Q", icon: "┤▷", category: "Semiconductors" },
  { id: "opamp", name: "Op-Amp", symbol: "U", icon: "▷", category: "Active" },
]

const analysisTypes = [
  { id: "dc", name: "DC Analysis", description: "Operating point and DC sweep" },
  { id: "ac", name: "AC Analysis", description: "Frequency response and Bode plots" },
  { id: "tran", name: "Transient Analysis", description: "Time-domain simulation" },
  { id: "noise", name: "Noise Analysis", description: "Noise figure and sources" },
  { id: "monte", name: "Monte Carlo", description: "Statistical analysis with variations" },
]

export default function SpiceSimulator() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
const [placedComponents, setPlacedComponents] = useState<Array<{
  id: string
  name: string
  symbol: string
  icon: string
  position: { x: number; y: number }
}>>([])
  const canvasRef = useRef<HTMLDivElement>(null)
  const [analysisType, setAnalysisType] = useState("dc")
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)

  const runSimulation = () => {
    setIsSimulating(true)
    setSimulationProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSimulating(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">SPICE Circuit Simulator</h1>
            <p className="text-muted-foreground">Professional circuit simulation and analysis</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          {/* Component Library */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Component Library</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="passive" className="w-full">
                <TabsList className="grid w-full grid-cols-3 text-xs">
                  <TabsTrigger value="passive">Passive</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                </TabsList>

                <TabsContent value="passive" className="p-4 space-y-2">
                  {components
                    .filter((c) => c.category === "Passive" || c.category === "Semiconductors")
                    .map((component) => (
                      <div
  key={component.id}
  draggable={true}
  onDragStart={(e) => {
    e.dataTransfer.setData("component", JSON.stringify(component))
  }}
  className={`p-3 rounded-lg border cursor-pointer hover:bg-muted transition-colors ${
    selectedComponent === component.id ? "bg-primary/10 border-primary" : ""
  }`}
  onClick={() => setSelectedComponent(component.id)}
>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{component.name}</div>
                            <div className="text-xs text-muted-foreground">{component.symbol}</div>
                          </div>
                      <div className="font-mono text-sm">{component.icon}</div>
                    </div>
                  </div>
                ))}
              </TabsContent>

                <TabsContent value="active" className="p-4 space-y-2">
                  {components
                    .filter((c) => c.category === "Active")
                    .map((component) => (
                      <div
                        key={component.id}
                        className={`p-3 rounded-lg border cursor-pointer hover:bg-muted transition-colors ${
                          selectedComponent === component.id ? "bg-primary/10 border-primary" : ""
                        }`}
                        draggable="true"
                        onDragStart={(e) => {
                          e.dataTransfer.setData("component", JSON.stringify(component))
                        }}
                        onClick={() => setSelectedComponent(component.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{component.name}</div>
                            <div className="text-xs text-muted-foreground">{component.symbol}</div>
                          </div>
                          <div className="font-mono text-sm">{component.icon}</div>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="sources" className="p-4 space-y-2">
                  {components
                    .filter((c) => c.category === "Sources")
                    .map((component) => (
                     <div
  key={component.id}
  draggable={true}
  onDragStart={(e) => {
    e.dataTransfer.setData("component", JSON.stringify(component))
  }}
  className={`p-3 rounded-lg border cursor-pointer hover:bg-muted transition-colors ${
    selectedComponent === component.id ? "bg-primary/10 border-primary" : ""
  }`}
  onClick={() => setSelectedComponent(component.id)}
>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-sm">{component.name}</div>
                            <div className="text-xs text-muted-foreground">{component.symbol}</div>
                          </div>
                          <div className="font-mono text-sm">{component.icon}</div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Schematic Canvas */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Schematic Editor</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Move className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div 
                className="h-[500px] bg-muted/20 relative border-2 border-dashed border-muted-foreground/20 rounded-lg m-4"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  const componentData = e.dataTransfer.getData("component")
                  if (componentData && canvasRef.current) {
                    const rawComponent = JSON.parse(componentData)
const rect = canvasRef.current.getBoundingClientRect()
const x = e.clientX - rect.left
const y = e.clientY - rect.top

setPlacedComponents(prev => [
  ...prev,
  {
    id: rawComponent.id,
    name: rawComponent.name,
    symbol: rawComponent.symbol,
    icon: rawComponent.icon,
    position: { x, y },
  },
])
                  }
                }}
                ref={canvasRef}
              >
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #666 1px, transparent 1px),
                      linear-gradient(to bottom, #666 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />

                {/* Placed Components */}
                {placedComponents.map((component, index) => (
                  <div
                    key={`${component.id}-${index}`}
                    className="absolute bg-white border-2 border-blue-500 rounded p-2 shadow-sm"
                    style={{ left: `${component.position.x}px`, top: `${component.position.y}px` }}
                  >
                    <div className="text-xs font-mono">{component.symbol}</div>
                    <div className="text-xs">1kΩ</div>
                  </div>
                ))}
                {/* Sample Circuit Elements */}
                <div className="absolute top-20 left-20 bg-white border-2 border-blue-500 rounded p-2 shadow-sm">
                  <div className="text-xs font-mono">V1</div>
                  <div className="text-xs">12V</div>
                </div>

                <div className="absolute top-20 left-40 bg-white border-2 border-green-500 rounded p-2 shadow-sm">
                  <div className="text-xs font-mono">R1</div>
                  <div className="text-xs">1kΩ</div>
                </div>

                <div className="absolute top-40 left-40 bg-white border-2 border-purple-500 rounded p-2 shadow-sm">
                  <div className="text-xs font-mono">C1</div>
                  <div className="text-xs">100nF</div>
                </div>

                {/* Connection Wires */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="100" y1="40" x2="140" y2="40" stroke="#333" strokeWidth="2" />
                  <line x1="180" y1="40" x2="180" y2="80" stroke="#333" strokeWidth="2" />
                  <line x1="160" y1="100" x2="200" y2="100" stroke="#333" strokeWidth="2" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Settings className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Drag components from the library to build your circuit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis & Controls */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Analysis & Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Analysis Type */}
              <div className="space-y-2">
                <Label>Analysis Type</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypes.map((analysis) => (
                      <SelectItem key={analysis.id} value={analysis.id}>
                        {analysis.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {analysisTypes.find((a) => a.id === analysisType)?.description}
                </p>
              </div>

              {/* Analysis Parameters */}
              {analysisType === "ac" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Start Frequency (Hz)</Label>
                    <Input type="number" defaultValue="1" />
                  </div>
                  <div className="space-y-2">
                    <Label>Stop Frequency (Hz)</Label>
                    <Input type="number" defaultValue="1000000" />
                  </div>
                  <div className="space-y-2">
                    <Label>Points per Decade</Label>
                    <Input type="number" defaultValue="10" />
                  </div>
                </div>
              )}

              {analysisType === "tran" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Stop Time (s)</Label>
                    <Input type="number" defaultValue="0.001" step="0.0001" />
                  </div>
                  <div className="space-y-2">
                    <Label>Time Step (s)</Label>
                    <Input type="number" defaultValue="0.00001" step="0.000001" />
                  </div>
                </div>
              )}

              {analysisType === "monte" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Number of Runs</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div className="space-y-2">
                    <Label>Tolerance (%)</Label>
                    <Slider defaultValue={[5]} max={20} step={1} />
                  </div>
                </div>
              )}

              {/* Simulation Controls */}
              <div className="space-y-3">
                <Button className="w-full" onClick={runSimulation} disabled={isSimulating}>
                  {isSimulating ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Simulating... {simulationProgress}%
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Simulation
                    </>
                  )}
                </Button>

                {isSimulating && (
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${simulationProgress}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Measurement Tools */}
              <div className="space-y-2">
                <Label>Measurement Tools</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Scope
                  </Button>
                  <Button variant="outline" size="sm">
                    <Waves className="h-4 w-4 mr-1" />
                    FFT
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Meter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Radio className="h-4 w-4 mr-1" />
                    Network
                  </Button>
                </div>
              </div>

              {/* Component Properties */}
              {selectedComponent && (
                <div className="space-y-2 pt-4 border-t">
                  <Label>Component Properties</Label>
                  <div className="space-y-2">
                    <div>
                      <Label className="text-xs">Name</Label>
                      <Input size="sm" defaultValue="R1" />
                    </div>
                    <div>
                      <Label className="text-xs">Value</Label>
                      <Input size="sm" defaultValue="1k" />
                    </div>
                    <div>
                      <Label className="text-xs">Tolerance</Label>
                      <Input size="sm" defaultValue="5%" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results Panel */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="plots" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="plots">Plots</TabsTrigger>
                <TabsTrigger value="data">Data</TabsTrigger>
                <TabsTrigger value="netlist">Netlist</TabsTrigger>
                <TabsTrigger value="log">Log</TabsTrigger>
              </TabsList>

              <TabsContent value="plots" className="mt-4">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Run simulation to view plots</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="data" className="mt-4">
                <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-sm">No simulation data available</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="netlist" className="mt-4">
                <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                  <div className="text-green-600">* Generated SPICE Netlist</div>
                  <div>V1 1 0 DC 12</div>
                  <div>R1 1 2 1k</div>
                  <div>C1 2 0 100n</div>
                  <div>.DC V1 0 15 0.1</div>
                  <div>.END</div>
                </div>
              </TabsContent>

              <TabsContent value="log" className="mt-4">
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <div>SPICE Simulator v3.2.1</div>
                  <div>Circuit loaded successfully</div>
                  <div>Ready for simulation...</div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
