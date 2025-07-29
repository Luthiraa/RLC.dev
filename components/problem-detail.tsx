"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Play, Save, Share, ThumbsUp, MessageSquare, Users, CheckCircle, XCircle, Code, BarChart3 } from "lucide-react"

interface ProblemDetailProps {
  problem?: {
    id: number
    title: string
    category: string
    difficulty: "Easy" | "Medium" | "Hard"
    acceptance: string
    description: string
    tags: string[]
    likes: number
    dislikes: number
    submissions: number
    solved: boolean
  }
}

export default function ProblemDetail({
  problem = {
    id: 1,
    title: "PID Controller Tuning for DC Motor",
    category: "PID/Control Systems",
    difficulty: "Medium",
    acceptance: "67%",
    description:
      "Design and tune a PID controller for precise speed control of a DC motor with load disturbances. The motor has the following specifications: Rated voltage: 12V, No-load speed: 3000 RPM, Stall torque: 0.5 Nm, Motor constant: 0.01 Nm/A.",
    tags: ["Control Theory", "Motor Control", "MATLAB", "PID Tuning"],
    likes: 234,
    dislikes: 12,
    submissions: 1847,
    solved: false,
  },
}: ProblemDetailProps) {
  const [activeTab, setActiveTab] = useState("description")
  const [code, setCode] = useState(`% MATLAB Code Template
% Define motor parameters
Km = 0.01;  % Motor constant (Nm/A)
R = 2;      % Resistance (Ohms)
L = 0.001;  % Inductance (H)
J = 0.0001; % Inertia (kg*m^2)
b = 0.0001; % Friction coefficient

% Your PID controller design here
Kp = 0;  % Proportional gain
Ki = 0;  % Integral gain  
Kd = 0;  % Derivative gain

% Implement your solution below`)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto py-6 px-4">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Panel - Problem Description */}
          <div className="flex flex-col">
            <Card className="flex-1">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(problem.difficulty)}>{problem.difficulty}</Badge>
                    <Badge variant="outline">{problem.category}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {problem.submissions}
                    </span>
                    <span>{problem.acceptance}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <button className="flex items-center gap-1 text-green-600 hover:text-green-700">
                    <ThumbsUp className="h-4 w-4" />
                    {problem.likes}
                  </button>
                  <button className="flex items-center gap-1 text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4" />
                    {problem.dislikes}
                  </button>
                  <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
                    <MessageSquare className="h-4 w-4" />
                    Discuss
                  </button>
                  <button className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                    <Share className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                    <TabsTrigger value="hints">Hints</TabsTrigger>
                    <TabsTrigger value="solutions">Solutions</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="mt-4 space-y-4">
                    <div className="prose prose-sm max-w-none">
                      <p>{problem.description}</p>

                      <h3>Requirements:</h3>
                      <ul>
                        <li>Design a PID controller that achieves less than 5% steady-state error</li>
                        <li>Settling time should be less than 2 seconds</li>
                        <li>Maximum overshoot should not exceed 10%</li>
                        <li>System should be stable with load disturbances up to 50% of rated torque</li>
                      </ul>

                      <h3>Deliverables:</h3>
                      <ul>
                        <li>MATLAB/Simulink model of the complete system</li>
                        <li>Step response analysis</li>
                        <li>Bode plot of the closed-loop system</li>
                        <li>Disturbance rejection analysis</li>
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="examples" className="mt-4">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Example 1: Basic PID Implementation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                            <div className="text-green-600">% Input: Step reference of 1000 RPM</div>
                            <div>reference = 1000;</div>
                            <div className="text-green-600">
                              % Expected: Settling time {"<"} 2s, overshoot {"<"} 10%
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Example 2: Disturbance Rejection</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                            <div className="text-green-600">% Input: Load torque disturbance of 0.25 Nm at t=5s</div>
                            <div>disturbance_torque = 0.25;</div>
                            <div className="text-green-600">% Expected: Speed deviation {"<"} 5% of setpoint</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="hints" className="mt-4">
                    <div className="space-y-4">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                              <span className="text-xs font-bold px-2">1</span>
                            </div>
                            <div>
                              <p className="font-medium">Start with the motor transfer function</p>
                              <p className="text-sm text-muted-foreground">
                                Derive the transfer function from motor voltage to speed using the given parameters.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                              <span className="text-xs font-bold px-2">2</span>
                            </div>
                            <div>
                              <p className="font-medium">Use root locus for initial tuning</p>
                              <p className="text-sm text-muted-foreground">
                                Plot the root locus to understand how the poles move with varying Kp.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="bg-blue-100 text-blue-600 rounded-full p-1">
                              <span className="text-xs font-bold px-2">3</span>
                            </div>
                            <div>
                              <p className="font-medium">Consider the Ziegler-Nichols method</p>
                              <p className="text-sm text-muted-foreground">
                                Use this as a starting point, then fine-tune based on performance requirements.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="solutions" className="mt-4">
                    <div className="text-center py-8">
                      <div className="bg-muted/50 rounded-lg p-8">
                        <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Solutions will be available after you submit your answer
                        </p>
                        <Button variant="outline">Submit Solution First</Button>
                      </div>
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
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    MATLAB Editor
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Run
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-0 resize-none focus-visible:ring-0"
                  placeholder="Write your MATLAB code here..."
                />
              </CardContent>
            </Card>

            {/* Test Results */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Test Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Step Response Test</span>
                    <Badge variant="secondary">Not Run</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Disturbance Rejection</span>
                    <Badge variant="secondary">Not Run</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Stability Analysis</span>
                    <Badge variant="secondary">Not Run</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance Metrics</span>
                    <Badge variant="secondary">Not Run</Badge>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span>Overall Progress</span>
                    <span>0/4 tests passed</span>
                  </div>
                  <Progress value={0} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
