"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Code,
  Settings,
  MessageSquare,
  Clock,
  Target,
  Play,
  RotateCcw,
  AlertCircle,
  Mic,
  MicOff,
  Video,
  User,
} from "lucide-react"

const interviewTypes = [
  {
    id: "technical-screening",
    title: "Technical Screening",
    description: "Adaptive multiple-choice questions",
    duration: "30 min",
    difficulty: "Adaptive",
    icon: Brain,
    color: "bg-blue-500",
  },
  {
    id: "live-coding",
    title: "Live Coding Session",
    description: "Real-time HDL coding challenges",
    duration: "45 min",
    difficulty: "Medium-Hard",
    icon: Code,
    color: "bg-green-500",
  },
  {
    id: "circuit-design",
    title: "Circuit Design Challenge",
    description: "Interactive schematic design",
    duration: "60 min",
    difficulty: "Hard",
    icon: Settings,
    color: "bg-purple-500",
  },
  {
    id: "system-architecture",
    title: "System Architecture",
    description: "Whiteboard-style discussions",
    duration: "45 min",
    difficulty: "Medium",
    icon: Target,
    color: "bg-orange-500",
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "AI-powered conversation",
    duration: "30 min",
    difficulty: "Easy-Medium",
    icon: MessageSquare,
    color: "bg-cyan-500",
  },
]

const companies = [
  { name: "Intel", logo: "🔵", openings: 23 },
  { name: "NVIDIA", logo: "🟢", openings: 18 },
  { name: "Apple", logo: "🍎", openings: 15 },
  { name: "Qualcomm", logo: "🔴", openings: 12 },
  { name: "AMD", logo: "🔴", openings: 9 },
  { name: "Broadcom", logo: "🟡", openings: 7 },
]

const mockQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What is the primary advantage of using a differential amplifier configuration?",
    options: ["Higher gain", "Better common-mode rejection", "Lower power consumption", "Simpler design"],
    correct: 1,
    explanation:
      "Differential amplifiers provide excellent common-mode rejection, which helps eliminate noise and interference that appears on both inputs.",
  },
  {
    id: 2,
    type: "coding",
    question: "Write Verilog code for a 4-bit counter with synchronous reset.",
    template: `module counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);

// Your code here

endmodule`,
    solution: `module counter_4bit(
  input clk,
  input reset,
  output reg [3:0] count
);

always @(posedge clk) begin
  if (reset)
    count <= 4'b0000;
  else
    count <= count + 1;
end

endmodule`,
  },
]

export default function AIInterview() {
  const [activeInterview, setActiveInterview] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [interviewProgress, setInterviewProgress] = useState(0)
  const [code, setCode] = useState(mockQuestions[1].template)

  const startInterview = (type: string) => {
    setActiveInterview(type)
    setCurrentQuestion(0)
    setInterviewProgress(0)
  }

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setInterviewProgress(((currentQuestion + 1) / mockQuestions.length) * 100)
    }
  }

  if (activeInterview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-6xl mx-auto py-6 px-4">
          {/* Interview Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">{interviewTypes.find((t) => t.id === activeInterview)?.title}</h1>
              <p className="text-muted-foreground">
                Question {currentQuestion + 1} of {mockQuestions.length}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">25:30</span>
              </div>
              <Button variant="outline" onClick={() => setActiveInterview(null)}>
                End Interview
              </Button>
            </div>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(interviewProgress)}%</span>
            </div>
            <Progress value={interviewProgress} className="h-2" />
          </div>

          {/* Question Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{mockQuestions[currentQuestion].question}</CardTitle>
                </CardHeader>
                <CardContent>
                  {mockQuestions[currentQuestion].type === "multiple-choice" ? (
                    <div className="space-y-3">
                      {mockQuestions[currentQuestion].options?.map((option, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                            selectedAnswer === index ? "bg-primary/10 border-primary" : "hover:bg-muted"
                          }`}
                          onClick={() => setSelectedAnswer(index)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedAnswer === index
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground"
                              }`}
                            >
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <pre className="text-sm font-mono whitespace-pre-wrap">
                          {mockQuestions[currentQuestion].template}
                        </pre>
                      </div>
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="min-h-[200px] font-mono text-sm"
                        placeholder="Write your Verilog code here..."
                      />
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          Compile
                        </Button>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* AI Interviewer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Interviewer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg mb-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      variant={isRecording ? "destructive" : "outline"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Hints */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium">Think about noise immunity</p>
                        <p className="text-muted-foreground">
                          Consider what happens to signals that appear on both inputs.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accuracy</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Speed</span>
                      <span className="text-sm font-medium">Good</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Communication</span>
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </Button>
            <Button onClick={nextQuestion}>{currentQuestion === mockQuestions.length - 1 ? "Finish" : "Next"}</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">AI Interview Platform</h1>
          <p className="text-xl text-muted-foreground">
            Practice technical interviews with AI-powered feedback and real-time analysis
          </p>
        </div>

        <Tabs defaultValue="practice" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="practice">Practice Interviews</TabsTrigger>
            <TabsTrigger value="company-prep">Company Prep</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="practice" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewTypes.map((interview) => {
                const Icon = interview.icon
                return (
                  <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${interview.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{interview.title}</CardTitle>
                          <CardDescription>{interview.duration}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{interview.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">{interview.difficulty}</Badge>
                        <span className="text-sm text-muted-foreground">{interview.duration}</span>
                      </div>
                      <Button className="w-full" onClick={() => startInterview(interview.id)}>
                        Start Interview
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="company-prep" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Company-Specific Preparation</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company) => (
                  <Card key={company.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{company.logo}</div>
                        <div>
                          <CardTitle className="text-lg">{company.name}</CardTitle>
                          <CardDescription>{company.openings} open positions</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm">
                          <div className="font-medium">Focus Areas:</div>
                          <div className="text-muted-foreground">
                            {company.name === "Intel" && "CPU Architecture, Process Technology"}
                            {company.name === "NVIDIA" && "GPU Design, AI Acceleration"}
                            {company.name === "Apple" && "SoC Design, Power Management"}
                            {company.name === "Qualcomm" && "RF Design, Mobile Processors"}
                            {company.name === "AMD" && "CPU/GPU Architecture, HPC"}
                            {company.name === "Broadcom" && "Networking, Wireless"}
                          </div>
                        </div>
                        <Button className="w-full">Start {company.name} Prep</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">Above average</div>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interviews Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">23</div>
                  <div className="text-sm text-muted-foreground">This month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">78%</div>
                  <div className="text-sm text-muted-foreground">Passing interviews</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-2">+12%</div>
                  <div className="text-sm text-muted-foreground">From last month</div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Technical Knowledge</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Problem Solving</span>
                      <span className="text-sm">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Communication</span>
                      <span className="text-sm">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Code Quality</span>
                      <span className="text-sm">88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
