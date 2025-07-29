"use client"

import { use, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { 
  Play, 
  Save, 
  Share, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Users, 
  CheckCircle, 
  XCircle, 
  Code, 
  BarChart3,
  ArrowLeft,
  Zap,
  RotateCcw
} from "lucide-react"
import Link from "next/link"

// Mock problem data
const problemData = {
  1: {
    id: 1,
    title: "PID Controller Tuning for DC Motor",
    category: "PID/Control Systems",
    difficulty: "Medium",
    acceptance: "67%",
    description: `Design and tune a PID controller for precise speed control of a DC motor with load disturbances. 

The motor has the following specifications:
- Rated voltage: 12V
- No-load speed: 3000 RPM  
- Stall torque: 0.5 Nm
- Motor constant: 0.01 Nm/A

Your task is to:
1. Model the DC motor transfer function
2. Design a PID controller to achieve:
   - Rise time < 0.2 seconds
   - Overshoot < 5%
   - Steady-state error < 1%
3. Verify performance with load disturbances`,
    tags: ["Control Theory", "Motor Control", "MATLAB", "PID Tuning"],
    likes: 234,
    dislikes: 12,
    submissions: 1847,
    solved: false,
    template: `% MATLAB Code Template
% Define motor parameters
Km = 0.01;  % Motor constant (Nm/A)
R = 2;      % Resistance (Ohms)
L = 0.001;  % Inductance (H)
J = 0.0001; % Inertia (kg*m^2)
b = 0.0001; % Friction coefficient

% Your solution here
% 1. Define the transfer function
% 2. Design PID controller
% 3. Simulate step response`,
  },
  2: {
    id: 2,
    title: "Smith Chart Impedance Matching",
    category: "RF R&D Development",
    difficulty: "Hard",
    acceptance: "43%",
    description: `Design a matching network using Smith chart to match a 75Ω load to a 50Ω transmission line at 2.4 GHz.

Requirements:
- Operating frequency: 2.4 GHz
- Source impedance: 50Ω
- Load impedance: 75Ω
- Maximum VSWR: 1.5:1
- Use LC components only

Deliverables:
1. Smith chart construction showing impedance transformation
2. Component values (L and C)
3. S-parameter analysis
4. Bandwidth analysis`,
    tags: ["RF Design", "Smith Chart", "Impedance Matching"],
    likes: 189,
    dislikes: 23,
    submissions: 892,
    solved: true,
    template: `% MATLAB/RF Toolbox Template
f = 2.4e9;  % Frequency (Hz)
Z0 = 50;    % Source impedance
ZL = 75;    % Load impedance

% Your solution here
% 1. Calculate reflection coefficient
% 2. Plot on Smith chart
% 3. Design matching network
% 4. Verify with S-parameters`,
  }
}

interface ProblemPageProps {
  params: Promise<{ id: string }>
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const { id } = use(params)
  const problem = problemData[parseInt(id) as keyof typeof problemData]

  if (!problem) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
          <Link href="/problems">
            <Button>Back to Problems</Button>
          </Link>
        </div>
      </div>
    )
  }

  const [code, setCode] = useState(problem.template)
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/problems" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Problems</span>
            </Link>
            <div className="h-4 w-px bg-border" />
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">HardwareHub</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-12rem)]">
          {/* Left Panel - Problem Description */}
          <div className="flex flex-col">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        problem.difficulty === "Easy"
                          ? "secondary"
                          : problem.difficulty === "Medium"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {problem.difficulty}
                    </Badge>
                    {problem.solved && (
                      <Badge variant="outline" className="text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Solved
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
                <CardDescription className="text-base">{problem.category}</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                    <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="mt-4 space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {problem.description}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-6">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="h-4 w-4" />
                            {problem.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown className="h-4 w-4" />
                            {problem.dislikes}
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {problem.submissions} submissions
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Acceptance: {problem.acceptance}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="solutions" className="mt-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <Code className="h-12 w-12 mx-auto mb-4" />
                      <p>Solutions will be available after you submit your code</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussions" className="mt-4">
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                      <p>Join the discussion about this problem</p>
                      <Button className="mt-4">Start Discussion</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Code Editor */}
          <div className="flex flex-col">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Code Editor</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Run Tests
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 min-h-[400px] font-mono text-sm resize-none"
                  placeholder="Write your solution here..."
                />
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Test Results</span>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Test Cases Passed</span>
                      <span className="text-muted-foreground">0/5</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">
                      Click "Run Tests" to execute your solution
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button className="flex-1">
                    Submit Solution
                  </Button>
                  <Button variant="outline">
                    Save Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
