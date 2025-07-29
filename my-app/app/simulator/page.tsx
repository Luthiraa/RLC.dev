"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Zap,
  Plus,
  Minus,
  ZoomIn,
  ZoomOut,
  RotateCw,
  MousePointer,
  Pencil,
  Wire,
  Target,
} from "lucide-react"
import Link from "next/link"

interface Component {
  id: string
  name: string
  symbol: string
  icon: string
  category: string
  value?: string
  unit?: string
}

interface PlacedComponent {
  id: string
  type: string
  x: number
  y: number
  rotation: number
  value: string
  symbol: string
  name: string
  selected: boolean
}

interface Wire {
  id: string
  startX: number
  startY: number
  endX: number
  endY: number
  selected: boolean
}

const components: Component[] = [
  { id: "resistor", name: "Resistor", symbol: "R", icon: "━━━━━", category: "Passive", unit: "Ω" },
  { id: "capacitor", name: "Capacitor", symbol: "C", icon: "━┤├━", category: "Passive", unit: "F" },
  { id: "inductor", name: "Inductor", symbol: "L", icon: "━∩∩∩━", category: "Passive", unit: "H" },
  { id: "voltage_source", name: "Voltage Source", symbol: "V", icon: "━⊕━", category: "Sources", unit: "V" },
  { id: "current_source", name: "Current Source", symbol: "I", icon: "━⊙━", category: "Sources", unit: "A" },
  { id: "diode", name: "Diode", symbol: "D", icon: "━▷|━", category: "Semiconductors" },
  { id: "mosfet_n", name: "NMOS", symbol: "M", icon: "┤├", category: "Semiconductors" },
  { id: "mosfet_p", name: "PMOS", symbol: "M", icon: "┤○├", category: "Semiconductors" },
  { id: "bjt_npn", name: "NPN BJT", symbol: "Q", icon: "┤▷", category: "Semiconductors" },
  { id: "opamp", name: "Op-Amp", symbol: "U", icon: "▷", category: "Active" },
  { id: "ground", name: "Ground", symbol: "GND", icon: "⊥", category: "Sources" },
  { id: "vcc", name: "VCC", symbol: "VCC", icon: "↑", category: "Sources" },
]

const analysisTypes = [
  { id: "dc", name: "DC Analysis", description: "Operating point and DC sweep" },
  { id: "ac", name: "AC Analysis", description: "Frequency response and Bode plots" },
  { id: "tran", name: "Transient Analysis", description: "Time-domain simulation" },
  { id: "noise", name: "Noise Analysis", description: "Noise figure and sources" },
  { id: "monte", name: "Monte Carlo", description: "Statistical analysis with variations" },
]

const circuits = [
  { id: 1, name: "RC Low-Pass Filter", category: "Filters", components: ["R", "C"], complexity: "Basic" },
  { id: 2, name: "Op-Amp Amplifier", category: "Amplifiers", components: ["U", "R", "C"], complexity: "Intermediate" },
  { id: 3, name: "Buck Converter", category: "Power", components: ["L", "C", "D", "M"], complexity: "Advanced" },
  { id: 4, name: "Crystal Oscillator", category: "Oscillators", components: ["R", "C", "L"], complexity: "Intermediate" },
]

export default function SimulatorPage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [analysisType, setAnalysisType] = useState("dc")
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("schematic")
  const [tool, setTool] = useState<"select" | "wire" | "component">("select")
  const [zoom, setZoom] = useState(100)
  
  // Circuit state
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([])
  const [wires, setWires] = useState<Wire[]>([])
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [componentCounter, setComponentCounter] = useState(1)
  
  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentWire, setCurrentWire] = useState<Partial<Wire> | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Grid settings
  const gridSize = 20

  const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize

  const addComponent = useCallback((componentType: string, x: number, y: number) => {
    const component = components.find(c => c.id === componentType)
    if (!component) return

    const newComponent: PlacedComponent = {
      id: `${component.symbol}${componentCounter}`,
      type: componentType,
      x: snapToGrid(x),
      y: snapToGrid(y),
      rotation: 0,
      value: component.unit ? `1${component.unit}` : "",
      symbol: component.symbol,
      name: component.name,
      selected: false
    }

    setPlacedComponents(prev => [...prev, newComponent])
    setComponentCounter(prev => prev + 1)
    setTool("select")
  }, [componentCounter, gridSize])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (tool === "component" && selectedComponent) {
      addComponent(selectedComponent, x, y)
    } else if (tool === "wire") {
      if (!isDrawing) {
        // Start drawing wire
        setIsDrawing(true)
        setCurrentWire({
          id: `wire_${Date.now()}`,
          startX: snapToGrid(x),
          startY: snapToGrid(y),
          endX: snapToGrid(x),
          endY: snapToGrid(y),
          selected: false
        })
      } else {
        // Finish drawing wire
        if (currentWire) {
          const newWire: Wire = {
            ...currentWire as Wire,
            endX: snapToGrid(x),
            endY: snapToGrid(y)
          }
          setWires(prev => [...prev, newWire])
        }
        setIsDrawing(false)
        setCurrentWire(null)
      }
    } else if (tool === "select") {
      // Select component
      const clickedComponent = placedComponents.find(comp => 
        Math.abs(comp.x - x) < 30 && Math.abs(comp.y - y) < 30
      )
      
      if (clickedComponent) {
        setSelectedElements([clickedComponent.id])
        setPlacedComponents(prev => prev.map(comp => ({
          ...comp,
          selected: comp.id === clickedComponent.id
        })))
      } else {
        setSelectedElements([])
        setPlacedComponents(prev => prev.map(comp => ({
          ...comp,
          selected: false
        })))
      }
    }
  }

  const handleCanvasMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (tool === "wire" && isDrawing && currentWire) {
      setCurrentWire(prev => prev ? {
        ...prev,
        endX: snapToGrid(x),
        endY: snapToGrid(y)
      } : null)
    } else if (tool === "select" && isDragging && selectedElements.length > 0) {
      // Drag selected components
      const newX = snapToGrid(x - dragOffset.x)
      const newY = snapToGrid(y - dragOffset.y)
      
      setPlacedComponents(prev => prev.map(comp => 
        selectedElements.includes(comp.id) 
          ? { ...comp, x: newX, y: newY }
          : comp
      ))
    }
  }

  const handleCanvasMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (tool === "select") {
      const clickedComponent = placedComponents.find(comp => 
        Math.abs(comp.x - x) < 30 && Math.abs(comp.y - y) < 30
      )
      
      if (clickedComponent) {
        setIsDragging(true)
        setDragOffset({
          x: x - clickedComponent.x,
          y: y - clickedComponent.y
        })
        setSelectedElements([clickedComponent.id])
        setPlacedComponents(prev => prev.map(comp => ({
          ...comp,
          selected: comp.id === clickedComponent.id
        })))
      }
    }
  }

  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }

  const deleteSelected = () => {
    setPlacedComponents(prev => prev.filter(comp => !selectedElements.includes(comp.id)))
    setWires(prev => prev.filter(wire => !selectedElements.includes(wire.id)))
    setSelectedElements([])
  }

  const rotateSelected = () => {
    setPlacedComponents(prev => prev.map(comp => 
      selectedElements.includes(comp.id) 
        ? { ...comp, rotation: (comp.rotation + 90) % 360 }
        : comp
    ))
  }

  // Drawing function
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 0.5
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw wires
    ctx.strokeStyle = '#2563eb'
    ctx.lineWidth = 2
    wires.forEach(wire => {
      ctx.beginPath()
      ctx.moveTo(wire.startX, wire.startY)
      ctx.lineTo(wire.endX, wire.endY)
      ctx.stroke()

      if (wire.selected) {
        ctx.strokeStyle = '#dc2626'
        ctx.lineWidth = 3
        ctx.stroke()
        ctx.strokeStyle = '#2563eb'
        ctx.lineWidth = 2
      }
    })

    // Draw current wire being drawn
    if (currentWire && isDrawing) {
      ctx.strokeStyle = '#9ca3af'
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(currentWire.startX!, currentWire.startY!)
      ctx.lineTo(currentWire.endX!, currentWire.endY!)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw components
    placedComponents.forEach(comp => {
      ctx.save()
      ctx.translate(comp.x, comp.y)
      ctx.rotate((comp.rotation * Math.PI) / 180)

      // Draw component symbol
      ctx.fillStyle = comp.selected ? '#dc2626' : '#1f2937'
      ctx.font = '16px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // Component background
      const textWidth = ctx.measureText(comp.id).width + 20
      ctx.fillStyle = comp.selected ? '#fef2f2' : '#f9fafb'
      ctx.strokeStyle = comp.selected ? '#dc2626' : '#374151'
      ctx.lineWidth = 2
      ctx.fillRect(-textWidth/2, -15, textWidth, 30)
      ctx.strokeRect(-textWidth/2, -15, textWidth, 30)

      // Component label
      ctx.fillStyle = comp.selected ? '#dc2626' : '#1f2937'
      ctx.fillText(comp.id, 0, 0)

      // Connection points
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(-textWidth/2, 0, 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(textWidth/2, 0, 3, 0, 2 * Math.PI)
      ctx.fill()

      ctx.restore()
    })
  }, [placedComponents, wires, currentWire, isDrawing, selectedElements, gridSize])

  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      drawCanvas()
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [drawCanvas])

  const runSimulation = () => {
    if (placedComponents.length === 0) {
      alert("Please add some components to your circuit first!")
      return
    }

    setIsSimulating(true)
    setSimulationProgress(0)

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

  const clearCircuit = () => {
    setPlacedComponents([])
    setWires([])
    setSelectedElements([])
    setComponentCounter(1)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HardwareHub</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/problems" className="text-sm font-medium hover:text-primary">
              Problems
            </Link>
            <Link href="/interview" className="text-sm font-medium hover:text-primary">
              AI Interview
            </Link>
            <Link href="/simulator" className="text-sm font-medium text-primary">
              SPICE Simulator
            </Link>
            <Link href="/community" className="text-sm font-medium hover:text-primary">
              Community
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto py-6 px-4">
        {/* Toolbar */}
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
          {/* Left Sidebar - Component Library */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Component Library</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {["Passive", "Sources", "Semiconductors", "Active"].map((category) => (
                  <div key={category}>
                    <h4 className="font-medium mb-2 text-sm">{category}</h4>
                    <div className="space-y-1">
                      {components
                        .filter((comp) => comp.category === category)
                        .map((component) => (
                          <Button
                            key={component.id}
                            variant={selectedComponent === component.id ? "default" : "ghost"}
                            size="sm"
                            className="w-full justify-start font-mono text-xs"
                            onClick={() => setSelectedComponent(component.id)}
                          >
                            <span className="mr-2">{component.icon}</span>
                            {component.name}
                          </Button>
                        ))}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2 text-sm">Example Circuits</h4>
                  <div className="space-y-1">
                    {circuits.map((circuit) => (
                      <Button
                        key={circuit.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-xs"
                      >
                        <div className="text-left">
                          <div>{circuit.name}</div>
                          <div className="text-xs text-muted-foreground">{circuit.complexity}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Circuit Design</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="schematic">Schematic</TabsTrigger>
                    <TabsTrigger value="netlist">Netlist</TabsTrigger>
                    <TabsTrigger value="results">Results</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="schematic" className="flex-1 mt-4">
                    <div 
                      ref={containerRef}
                      className="relative border-2 border-muted rounded-lg h-[400px] bg-white overflow-hidden"
                      style={{ backgroundImage: `radial-gradient(circle, #ccc 1px, transparent 1px)`, backgroundSize: `${gridSize}px ${gridSize}px` }}
                    >
                      <canvas
                        ref={canvasRef}
                        width={800}
                        height={400}
                        className="absolute inset-0 cursor-crosshair"
                        onClick={handleCanvasClick}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                      />
                      
                      {/* Toolbar overlay */}
                      <div className="absolute top-2 left-2 flex gap-2">
                        <Button 
                          variant={tool === "select" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setTool("select")}
                        >
                          <MousePointer className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={tool === "wire" ? "default" : "outline"} 
                          size="sm"
                          onClick={() => setTool("wire")}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        {selectedElements.length > 0 && (
                          <>
                            <Button variant="outline" size="sm" onClick={rotateSelected}>
                              <RotateCw className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={deleteSelected}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>

                      {/* Instructions overlay when empty */}
                      {placedComponents.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="text-center text-muted-foreground">
                            <Settings className="h-16 w-16 mx-auto mb-4 opacity-50" />
                            <p className="mb-4">Click on a component in the library, then click here to place it</p>
                            <div className="grid grid-cols-2 gap-2 max-w-xs text-xs">
                              <div>• Select tool to move components</div>
                              <div>• Wire tool to connect components</div>
                              <div>• Right-click for properties</div>
                              <div>• Drag to reposition</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="netlist" className="flex-1 mt-4">
                    <div className="bg-muted/50 rounded-lg p-4 h-[400px] font-mono text-sm">
                      <div className="text-muted-foreground">
                        * SPICE Netlist - Auto-generated from schematic
                        <br />
                        * Circuit: Untitled Circuit
                        <br />
                        <br />
                        .title Untitled Circuit
                        <br />
                        .end
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="results" className="flex-1 mt-4">
                    <div className="h-[400px] flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">
                          Simulation results will appear here after running analysis
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Analysis & Controls */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Simulation Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Simulation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="analysis-type" className="text-sm">Analysis Type</Label>
                    <Select value={analysisType} onValueChange={setAnalysisType}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {analysisTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      {analysisTypes.find(t => t.id === analysisType)?.description}
                    </p>
                  </div>

                  {analysisType === "dc" && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">DC Sweep Source</Label>
                        <Input placeholder="V1" />
                      </div>
                      <div>
                        <Label className="text-sm">Start Voltage</Label>
                        <Input placeholder="0V" />
                      </div>
                      <div>
                        <Label className="text-sm">Stop Voltage</Label>
                        <Input placeholder="5V" />
                      </div>
                    </div>
                  )}

                  {analysisType === "ac" && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Start Frequency</Label>
                        <Input placeholder="1Hz" />
                      </div>
                      <div>
                        <Label className="text-sm">Stop Frequency</Label>
                        <Input placeholder="1MHz" />
                      </div>
                      <div>
                        <Label className="text-sm">Points per Decade</Label>
                        <Input placeholder="100" />
                      </div>
                    </div>
                  )}

                  {analysisType === "tran" && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm">Stop Time</Label>
                        <Input placeholder="1ms" />
                      </div>
                      <div>
                        <Label className="text-sm">Time Step</Label>
                        <Input placeholder="1us" />
                      </div>
                    </div>
                  )}

                  {isSimulating && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Simulating...</span>
                        <span>{simulationProgress}%</span>
                      </div>
                      <Progress value={simulationProgress} />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={runSimulation} 
                      disabled={isSimulating}
                      className="flex-1"
                    >
                      {isSimulating ? (
                        <Square className="h-4 w-4 mr-1" />
                      ) : (
                        <Play className="h-4 w-4 mr-1" />
                      )}
                      {isSimulating ? "Stop" : "Run"}
                    </Button>
                    <Button variant="outline" disabled={isSimulating}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Measurement Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Measurement Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Virtual Oscilloscope
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Waves className="h-4 w-4 mr-2" />
                    Spectrum Analyzer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Radio className="h-4 w-4 mr-2" />
                    Network Analyzer
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Probe Data
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Simulations */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Simulations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { name: "RC Filter Analysis", type: "AC", time: "2 min ago" },
                    { name: "Op-Amp Transient", type: "TRAN", time: "1 hour ago" },
                    { name: "Buck Converter", type: "DC", time: "Yesterday" },
                  ].map((sim, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                      <div>
                        <div className="text-sm font-medium">{sim.name}</div>
                        <div className="text-xs text-muted-foreground">{sim.type} • {sim.time}</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Play className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
