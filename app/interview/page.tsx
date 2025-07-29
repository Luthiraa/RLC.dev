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
  Zap,
  TrendingUp,
  CheckCircle,
  XCircle,
  Calendar
} from "lucide-react"
import Link from "next/link"

const interviewTypes = [
  {
    id: "technical-screening",
    title: "Technical Screening",
    description: "Adaptive multiple-choice questions",
    duration: "30 min",
    difficulty: "Adaptive",
    icon: Brain,
    color: "bg-blue-500",
    features: [
      "Automated difficulty adjustment",
      "Real-time performance analytics", 
      "Comprehensive topic coverage",
      "Instant feedback and explanations"
    ]
  },
  {
    id: "live-coding",
    title: "Live Coding Session",
    description: "Real-time HDL coding challenges",
    duration: "45 min",
    difficulty: "Medium-Hard",
    icon: Code,
    color: "bg-green-500",
    features: [
      "Verilog/VHDL support",
      "Instant compilation feedback",
      "Code quality analysis",
      "Best practices recommendations"
    ]
  },
  {
    id: "circuit-design",
    title: "Circuit Design Challenge",
    description: "Interactive schematic design",
    duration: "60 min",
    difficulty: "Hard",
    icon: Settings,
    color: "bg-purple-500",
    features: [
      "Drag-and-drop interface",
      "Extensive component library",
      "Automated design verification", 
      "Performance optimization tips"
    ]
  },
  {
    id: "behavioral",
    title: "Behavioral Interview",
    description: "AI-powered conversation practice",
    duration: "20 min",
    difficulty: "All Levels",
    icon: MessageSquare,
    color: "bg-orange-500",
    features: [
      "Natural conversation flow",
      "Communication skill assessment",
      "Industry-specific scenarios",
      "Personalized feedback"
    ]
  }
]

const mockInterviews = [
  {
    id: 1,
    company: "Intel Corporation",
    position: "Hardware Design Engineer",
    focus: ["Digital Design", "ASIC", "Verilog"],
    difficulty: "Hard",
    duration: "90 min"
  },
  {
    id: 2,
    company: "NVIDIA",
    position: "GPU Architecture Engineer", 
    focus: ["Computer Architecture", "Performance", "CUDA"],
    difficulty: "Hard",
    duration: "75 min"
  },
  {
    id: 3,
    company: "Apple",
    position: "Mixed-Signal Engineer",
    focus: ["Analog Design", "Power Management", "RF"],
    difficulty: "Medium-Hard", 
    duration: "60 min"
  }
]

export default function InterviewPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isInterviewActive, setIsInterviewActive] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [totalQuestions] = useState(15)

  const startInterview = (type: string) => {
    setSelectedType(type)
    setIsInterviewActive(true)
    setCurrentQuestion(1)
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
            <Link href="/interview" className="text-sm font-medium text-primary">
              AI Interview
            </Link>
            <Link href="/simulator" className="text-sm font-medium hover:text-primary">
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

      <div className="container max-w-7xl mx-auto py-8 px-4">
        {!isInterviewActive ? (
          <>
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Interview Platform</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Practice technical interviews with AI-powered simulations. Get instant feedback and improve your performance.
              </p>
            </div>

            <Tabs defaultValue="practice" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="practice">Practice Interviews</TabsTrigger>
                <TabsTrigger value="mock">Mock Interviews</TabsTrigger>
                <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="practice" className="space-y-8">
                {/* Interview Types */}
                <div>
                  <h2 className="text-2xl font-bold mb-6">Choose Interview Type</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {interviewTypes.map((type) => {
                      const Icon = type.icon
                      return (
                        <Card key={type.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-3 rounded-lg ${type.color}`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{type.title}</CardTitle>
                                <CardDescription>{type.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {type.duration}
                              </div>
                              <div className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {type.difficulty}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2 text-sm mb-6">
                              {type.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <Button 
                              className="w-full"
                              onClick={() => startInterview(type.id)}
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Start {type.title}
                            </Button>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mock" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Company-Specific Mock Interviews</h2>
                  <div className="grid gap-6">
                    {mockInterviews.map((interview) => (
                      <Card key={interview.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold">{interview.company}</h3>
                                <Badge variant="outline">{interview.difficulty}</Badge>
                              </div>
                              <p className="text-lg text-muted-foreground mb-3">{interview.position}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {interview.focus.map((focus) => (
                                  <Badge key={focus} variant="secondary" className="text-xs">
                                    {focus}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-4 w-4" />
                                {interview.duration}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Schedule
                              </Button>
                              <Button>
                                <Play className="h-4 w-4 mr-2" />
                                Start Now
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Performance Analytics</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">24</div>
                        <div className="text-sm text-muted-foreground">Interviews Completed</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">12</div>
                        <div className="text-sm text-muted-foreground">Hours Practiced</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">+15%</div>
                        <div className="text-sm text-muted-foreground">Improvement</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Skill Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { skill: "Digital Design", score: 85 },
                          { skill: "Control Systems", score: 72 },
                          { skill: "RF Engineering", score: 68 },
                          { skill: "Signal Processing", score: 79 },
                        ].map((item) => (
                          <div key={item.skill} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{item.skill}</span>
                              <span className="font-medium">{item.score}%</span>
                            </div>
                            <Progress value={item.score} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Interview Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { type: "Technical Screening", score: 82, status: "passed" },
                          { type: "Live Coding", score: 76, status: "passed" },
                          { type: "Circuit Design", score: 65, status: "needs-improvement" },
                          { type: "Behavioral", score: 88, status: "passed" },
                        ].map((result, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {result.status === "passed" ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <XCircle className="h-5 w-5 text-yellow-600" />
                              )}
                              <span className="font-medium">{result.type}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{result.score}%</div>
                              <div className="text-xs text-muted-foreground capitalize">
                                {result.status.replace('-', ' ')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          /* Active Interview Interface */
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Technical Screening Interview</CardTitle>
                    <CardDescription>Answer the following questions to the best of your ability</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      Question {currentQuestion} of {totalQuestions}
                    </div>
                    <Button variant="outline" onClick={() => setIsInterviewActive(false)}>
                      Exit Interview
                    </Button>
                  </div>
                </div>
                <Progress value={(currentQuestion / totalQuestions) * 100} className="w-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    What is the primary advantage of using a PID controller over a simple proportional controller?
                  </h3>
                  <div className="space-y-3">
                    {[
                      "Better noise immunity",
                      "Eliminates steady-state error and improves transient response", 
                      "Lower power consumption",
                      "Simpler implementation"
                    ].map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
                        <input type="radio" name="answer" value={index} className="w-4 h-4" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                  <Button variant="outline" disabled={currentQuestion === 1}>
                    Previous Question
                  </Button>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">25:30 remaining</span>
                  </div>
                  <Button 
                    onClick={() => setCurrentQuestion(Math.min(currentQuestion + 1, totalQuestions))}
                    disabled={currentQuestion === totalQuestions}
                  >
                    {currentQuestion === totalQuestions ? "Submit Interview" : "Next Question"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
