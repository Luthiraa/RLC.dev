'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
}

interface Component {
  id: string;
  type: 'resistor' | 'capacitor' | 'inductor' | 'voltageSource' | 'currentSource' | 'wire' | 'ground';
  x: number;
  y: number;
  value: number;
  unit: string;
  rotation: number;
  connections?: string[]; // For wires
  endX?: number; // For wires
  endY?: number; // For wires
  nodes?: Node[]; // For component connection points
}

interface SimulationResults {
  nodes: Record<string, number>;
  currents: Record<string, number>;
  voltages: Record<string, number>;
  power: Record<string, number>;
}

interface SpiceSimulatorProps {
  initialComponents?: Component[];
  onSimulationComplete?: (results: SimulationResults) => void;
}

interface SelectionBox {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export const SpiceSimulator: React.FC<SpiceSimulatorProps> = ({
  initialComponents = [],
  onSimulationComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [components, setComponents] = useState<Component[]>(initialComponents);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [editUnit, setEditUnit] = useState('');
  const [isDrawingWire, setIsDrawingWire] = useState(false);
  const [wireStart, setWireStart] = useState<{ x: number; y: number } | null>(null);
  const [componentTypes] = useState([
    { type: 'resistor', label: 'Resistor' },
    { type: 'capacitor', label: 'Capacitor' },
    { type: 'inductor', label: 'Inductor' },
    { type: 'voltageSource', label: 'Voltage Source' },
    { type: 'currentSource', label: 'Current Source' },
    { type: 'wire', label: 'Wire' },
    { type: 'ground', label: 'Ground' },
  ]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(new Set());

  const drawNodes = useCallback((ctx: CanvasRenderingContext2D, component: Component) => {
    ctx.save();
    ctx.fillStyle = '#2563eb';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;

    // Calculate node positions based on component type and rotation
    const nodes = getComponentNodes(component);
    component.nodes = nodes;

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });

    ctx.restore();
  }, []);

  const drawComponent = useCallback((ctx: CanvasRenderingContext2D, component: Component) => {
    ctx.save();
    ctx.translate(component.x, component.y);
    ctx.rotate(component.rotation);

    ctx.strokeStyle = selectedComponent?.id === component.id ? '#2563eb' : '#000';
    ctx.lineWidth = selectedComponent?.id === component.id ? 2 : 1;

    switch (component.type) {
      case 'resistor':
        drawResistor(ctx, component.value, component.unit);
        break;
      case 'capacitor':
        drawCapacitor(ctx, component.value, component.unit);
        break;
      case 'inductor':
        drawInductor(ctx, component.value, component.unit);
        break;
      case 'voltageSource':
        drawVoltageSource(ctx, component.value, component.unit);
        break;
      case 'currentSource':
        drawCurrentSource(ctx, component.value, component.unit);
        break;
      case 'wire':
        drawWire(ctx, component);
        break;
      case 'ground':
        drawGround(ctx);
        break;
    }

    // Draw nodes for all components except wires and grounds
    if (component.type !== 'wire' && component.type !== 'ground') {
      drawNodes(ctx, component);
    }

    ctx.restore();
  }, [selectedComponent, drawNodes]);

  // Move drawComponents definition before its usage
  const drawComponents = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    components.forEach(component => drawComponent(ctx, component));
  }, [components, drawComponent]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to be more compact
    canvas.width = 600;
    canvas.height = 400;

    // Draw grid
    drawGrid(ctx);

    // Draw components
    drawComponents();
  }, [components, drawComponents]);

  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;

    // Draw vertical lines
    for (let x = 0; x < 600; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 400);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = 0; y < 400; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(600, y);
      ctx.stroke();
    }
  };

  const drawResistor = (ctx: CanvasRenderingContext2D, value: number, unit: string) => {
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 10);
    ctx.lineTo(-10, 10);
    ctx.lineTo(10, -10);
    ctx.lineTo(-10, -10);
    ctx.lineTo(10, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Draw value
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, 0, -20);
  };

  const drawCapacitor = (ctx: CanvasRenderingContext2D, value: number, unit: string) => {
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-10, 0);
    ctx.lineTo(-10, -15);
    ctx.lineTo(-10, 15);
    ctx.moveTo(10, -15);
    ctx.lineTo(10, 15);
    ctx.lineTo(10, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Draw value
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, 0, -25);
  };

  const drawInductor = (ctx: CanvasRenderingContext2D, value: number, unit: string) => {
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-10, 0);
    for (let i = 0; i < 3; i++) {
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
    }
    ctx.lineTo(10, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Draw value
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, 0, -25);
  };

  const drawVoltageSource = (ctx: CanvasRenderingContext2D, value: number, unit: string) => {
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-15, 0);
    ctx.moveTo(15, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Draw value
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, 0, -25);
  };

  const drawCurrentSource = (ctx: CanvasRenderingContext2D, value: number, unit: string) => {
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-30, 0);
    ctx.lineTo(-15, 0);
    ctx.moveTo(15, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    // Draw arrow
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(5, -5);
    ctx.lineTo(-5, -5);
    ctx.closePath();
    ctx.fill();

    // Draw value
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${value}${unit}`, 0, -25);
  };

  const drawWire = (ctx: CanvasRenderingContext2D, component: Component) => {
    if (!component.endX || !component.endY) return;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(component.endX - component.x, component.endY - component.y);
    ctx.stroke();

    // Draw nodes at wire endpoints
    ctx.fillStyle = '#2563eb';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;

    // Start node
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // End node
    ctx.beginPath();
    ctx.arc(component.endX - component.x, component.endY - component.y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const drawGround = (ctx: CanvasRenderingContext2D) => {
    ctx.beginPath();
    ctx.moveTo(-15, 0);
    ctx.lineTo(15, 0);
    ctx.moveTo(-10, 10);
    ctx.lineTo(10, 10);
    ctx.moveTo(-5, 20);
    ctx.lineTo(5, 20);
    ctx.stroke();

    // Add a node at the top of the ground symbol
    ctx.fillStyle = '#2563eb';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  };

  const getComponentNodes = (component: Component): Node[] => {
    const nodes: Node[] = [];
    const rotation = component.rotation;

    switch (component.type) {
      case 'resistor':
        nodes.push(
          { x: -30, y: 0 },
          { x: 30, y: 0 }
        );
        break;
      case 'capacitor':
        nodes.push(
          { x: -30, y: 0 },
          { x: 30, y: 0 }
        );
        break;
      case 'inductor':
        nodes.push(
          { x: -30, y: 0 },
          { x: 30, y: 0 }
        );
        break;
      case 'voltageSource':
        nodes.push(
          { x: -30, y: 0 },
          { x: 30, y: 0 }
        );
        break;
      case 'currentSource':
        nodes.push(
          { x: -30, y: 0 },
          { x: 30, y: 0 }
        );
        break;
    }

    // Rotate nodes based on component rotation
    return nodes.map(node => ({
      x: node.x * Math.cos(rotation) - node.y * Math.sin(rotation),
      y: node.x * Math.sin(rotation) + node.y * Math.cos(rotation)
    }));
  };

  const drawSelectionBox = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!selectionBox) return;

    ctx.save();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    const width = selectionBox.endX - selectionBox.startX;
    const height = selectionBox.endY - selectionBox.startY;

    ctx.strokeRect(
      selectionBox.startX,
      selectionBox.startY,
      width,
      height
    );

    ctx.restore();
  }, [selectionBox]);

  const updateSelection = () => {
    if (!selectionBox) return;

    const selected = new Set<string>();
    const left = Math.min(selectionBox.startX, selectionBox.endX);
    const right = Math.max(selectionBox.startX, selectionBox.endX);
    const top = Math.min(selectionBox.startY, selectionBox.endY);
    const bottom = Math.max(selectionBox.startY, selectionBox.endY);

    components.forEach(component => {
      if (component.type !== 'wire') {
        const dx = component.x - left;
        const dy = component.y - top;
        if (dx >= 0 && dx <= right - left && dy >= 0 && dy <= bottom - top) {
          selected.add(component.id);
        }
      } else {
        // Check if wire endpoints are inside selection box
        const startInBox = component.x >= left && component.x <= right &&
                          component.y >= top && component.y <= bottom;
        const endInBox = component.endX! >= left && component.endX! <= right &&
                        component.endY! >= top && component.endY! <= bottom;
        if (startInBox && endInBox) {
          selected.add(component.id);
        }
      }
    });

    setSelectedComponents(selected);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx);

    // Draw components
    components.forEach(component => {
      ctx.save();
      ctx.strokeStyle = selectedComponents.has(component.id) ? '#2563eb' : '#000';
      ctx.lineWidth = selectedComponents.has(component.id) ? 2 : 1;
      drawComponent(ctx, component);
      ctx.restore();
    });

    // Draw selection box
    drawSelectionBox(ctx);
  }, [components, selectedComponents, selectionBox, drawComponent, drawSelectionBox]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawingWire && wireStart) {
      // Find the closest node to the click position
      const closestNode = findClosestNode(x, y);
      if (closestNode) {
        // Complete wire drawing
        const newWire: Component = {
          id: Math.random().toString(36).substr(2, 9),
          type: 'wire',
          x: wireStart.x,
          y: wireStart.y,
          value: 0,
          unit: '',
          rotation: 0,
          endX: closestNode.x,
          endY: closestNode.y,
        };
        setComponents([...components, newWire]);
        setIsDrawingWire(false);
        setWireStart(null);
      }
      return;
    }

    // Check if clicked on a component or node
    const clickedComponent = components.find(component => {
      if (component.type === 'wire') {
        return isPointOnWire(x, y, component);
      }
      const dx = x - component.x;
      const dy = y - component.y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });

    if (clickedComponent) {
      if (e.shiftKey) {
        const newSelection = new Set(selectedComponents);
        if (newSelection.has(clickedComponent.id)) {
          newSelection.delete(clickedComponent.id);
        } else {
          newSelection.add(clickedComponent.id);
        }
        setSelectedComponents(newSelection);
      } else {
        setSelectedComponent(clickedComponent);
        setIsDragging(true);
        setEditValue(clickedComponent.value.toString());
        setEditUnit(clickedComponent.unit);
      }
    } else {
      setIsSelecting(true);
      setSelectionBox({ startX: x, startY: y, endX: x, endY: y });
      setSelectedComponent(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isSelecting && !isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isSelecting && selectionBox) {
      setSelectionBox({
        ...selectionBox,
        endX: x,
        endY: y,
      });
      updateSelection();
    } else if (isDragging && selectedComponent) {
      setComponents(components.map(component =>
        component.id === selectedComponent.id
          ? { ...component, x, y }
          : component
      ));
    }
  };

  const handleMouseUp = () => {
    if (isSelecting) {
      setIsSelecting(false);
      setSelectionBox(null);
    } else if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleDeleteSelected = () => {
    setComponents(components.filter(component => !selectedComponents.has(component.id)));
    setSelectedComponents(new Set());
    setSelectedComponent(null);
  };

  const handleComponentEdit = () => {
    if (!selectedComponent) return;

    setComponents(components.map(component =>
      component.id === selectedComponent.id
        ? {
            ...component,
            value: parseFloat(editValue),
            unit: editUnit,
          }
        : component
    ));
  };

  const handleDeleteComponent = () => {
    if (!selectedComponent) return;

    setComponents(components.filter(component => component.id !== selectedComponent.id));
    setSelectedComponent(null);
  };

  const handleAddComponent = (type: Component['type']) => {
    if (type === 'wire') {
      setIsDrawingWire(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      setWireStart({
        x: rect.width / 2,
        y: rect.height / 2,
      });
      return;
    }

    const newComponent: Component = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 400,
      y: 300,
      value: type === 'ground' ? 0 : 1,
      unit: type === 'voltageSource' ? 'V' : type === 'currentSource' ? 'A' : 'Ω',
      rotation: 0,
    };

    setComponents([...components, newComponent]);
  };

  const handleRotateComponent = () => {
    if (!selectedComponent) return;

    setComponents(components.map(component =>
      component.id === selectedComponent.id
        ? { ...component, rotation: component.rotation + Math.PI / 2 }
        : component
    ));
  };

  const runSimulation = () => {
    // Basic circuit analysis
    const results: SimulationResults = {
      nodes: {},
      currents: {},
      voltages: {},
      power: {},
    };

    // Find all nodes
    const nodes = new Set<string>();
    components.forEach(component => {
      if (component.type !== 'wire') {
        nodes.add(`${component.x},${component.y}`);
      }
    });

    // Calculate voltages and currents
    nodes.forEach(node => {
      const [x, y] = node.split(',').map(Number);
      const connectedComponents = components.filter(comp => {
        if (comp.type === 'wire') {
          return (comp.x === x && comp.y === y) || (comp.endX === x && comp.endY === y);
        }
        return comp.x === x && comp.y === y;
      });

      // Basic voltage calculations
      const voltageSources = connectedComponents.filter(comp => comp.type === 'voltageSource');
      if (voltageSources.length > 0) {
        results.voltages[node] = voltageSources[0].value;
      }

      // Basic current calculations
      const currentSources = connectedComponents.filter(comp => comp.type === 'currentSource');
      if (currentSources.length > 0) {
        results.currents[node] = currentSources[0].value;
      }
    });

    onSimulationComplete?.(results);
  };

  const findClosestNode = (x: number, y: number): Node | null => {
    let closestNode: Node | null = null;
    let minDistance = Infinity;

    components.forEach(component => {
      if (component.nodes) {
        component.nodes.forEach(node => {
          const dx = x - (component.x + node.x);
          const dy = y - (component.y + node.y);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < minDistance && distance < 10) {
            minDistance = distance;
            closestNode = {
              x: component.x + node.x,
              y: component.y + node.y
            };
          }
        });
      }
    });

    return closestNode;
  };

  const isPointOnWire = (x: number, y: number, wire: Component): boolean => {
    if (!wire.endX || !wire.endY) return false;

    const dx = wire.endX - wire.x;
    const dy = wire.endY - wire.y;
    const length = Math.sqrt(dx * dx + dy * dy);

    const t = ((x - wire.x) * dx + (y - wire.y) * dy) / (length * length);
    if (t < 0 || t > 1) return false;

    const projX = wire.x + t * dx;
    const projY = wire.y + t * dy;
    const distance = Math.sqrt(
      Math.pow(x - projX, 2) + Math.pow(y - projY, 2)
    );

    return distance < 5;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Add Components</h3>
          <div className="grid grid-cols-2 gap-2">
            {componentTypes.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => handleAddComponent(type as Component['type'])}
                className={`px-3 py-2 rounded text-white transition-colors text-sm ${
                  type === 'wire' && isDrawingWire
                    ? 'bg-blue-700'
                    : type === 'wire'
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : type === 'ground'
                    ? 'bg-gray-500 hover:bg-gray-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        {(selectedComponent || selectedComponents.size > 0) && (
          <div className="w-full md:w-2/3">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {selectedComponents.size > 0 ? 'Selected Components' : 'Edit Component'}
            </h3>
            <div className="space-y-2">
              {selectedComponent && selectedComponents.size === 0 && (
                <>
                  {selectedComponent.type !== 'wire' && selectedComponent.type !== 'ground' && (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="px-3 py-2 border rounded text-gray-700"
                        placeholder="Value"
                      />
                      <input
                        type="text"
                        value={editUnit}
                        onChange={(e) => setEditUnit(e.target.value)}
                        className="px-3 py-2 border rounded text-gray-700"
                        placeholder="Unit"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={handleComponentEdit}
                      className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleDeleteComponent}
                      className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                    >
                      Delete
                    </button>
                    {selectedComponent.type !== 'wire' && selectedComponent.type !== 'ground' && (
                      <button
                        onClick={handleRotateComponent}
                        className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors text-sm"
                      >
                        Rotate
                      </button>
                    )}
                  </div>
                </>
              )}
              {selectedComponents.size > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleDeleteSelected}
                    className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete Selected ({selectedComponents.size})
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="border rounded cursor-pointer bg-white"
        />
        <button
          onClick={runSimulation}
          className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
        >
          Run Simulation
        </button>
      </div>
    </div>
  );
};

export default SpiceSimulator;