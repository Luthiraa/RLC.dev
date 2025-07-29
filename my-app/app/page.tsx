"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Zap,
  Radio,
  Waves,
  Wifi,
  Settings,
  Eye,
  MicroscopeIcon as Microchip,
  HardDrive,
  Code,
  Brain,
  MessageSquare,
  Trophy,
  Users,
  Play,
  ChevronRight,
  Star,
  Target,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"

const categories = [
  {
    id: "pid-control",
    name: "PID/Control Systems",
    icon: Settings,
    description: "Classical and modern control theory, PID tuning, state-space design",
    problems: 156,
    difficulty: { easy: 45, medium: 78, hard: 33 },
    color: "bg-blue-500",
  },
  {
    id: "rf-development",
    name: "RF R&D Development",
    icon: Radio,
    description: "Smith charts, antenna design, microwave circuits, S-parameters",
    problems: 134,
    difficulty: { easy: 38, medium: 67, hard: 29 },
    color: "bg-green-500",
  },
  {
    id: "electromagnetics",
    name: "Electromagnetics",
    icon: Zap,
    description: "Maxwell's equations, transmission lines, EMI/EMC, field theory",
    problems: 142,
    difficulty: { easy: 41, medium: 72, hard: 29 },
    color: "bg-purple-500",
  },
  {
    id: "dsp",
    name: "Digital Signal Processing",
    icon: Waves,
    description: "FFT/DFT, digital filters, sampling theory, real-time DSP",
    problems: 128,
    difficulty: { easy: 42, medium: 58, hard: 28 },
    color: "bg-orange-500",
  },
  {
    id: "iot",
    name: "Internet of Things",
    icon: Wifi,
    description: "Sensor interfacing, wireless protocols, edge computing, IoT security",
    problems: 98,
    difficulty: { easy: 35, medium: 45, hard: 18 },
    color: "bg-cyan-500",
  },
  {
    id: "system-design",
    name: "System Design",
    icon: Target,
    description: "Mixed-signal systems, power distribution, thermal management",
    problems: 87,
    difficulty: { easy: 28, medium: 41, hard: 18 },
    color: "bg-red-500",
  },
  {
    id: "optical",
    name: "Optical Signal Processing",
    icon: Eye,
    description: "Fiber optics, laser control, photodetectors, WDM systems",
    problems: 76,
    difficulty: { easy: 24, medium: 35, hard: 17 },
    color: "bg-yellow-500",
  },
  {
    id: "asic",
    name: "ASIC Design",
    icon: Microchip,
    description: "Digital logic, Verilog/VHDL, timing analysis, physical design",
    problems: 112,
    difficulty: { easy: 32, medium: 56, hard: 24 },
    color: "bg-indigo-500",
  },
  {
    id: "low-level",
    name: "Low-Level Systems",
    icon: HardDrive,
    description: "Embedded processors, memory hierarchy, bus protocols, RTOS",
    problems: 94,
    difficulty: { easy: 31, medium: 44, hard: 19 },
    color: "bg-pink-500",
  },
  {
    id: "firmware",
    name: "Firmware Development",
    icon: Code,
    description: "Bare-metal programming, device drivers, bootloaders, OTA updates",
    problems: 89,
    difficulty: { easy: 29, medium: 42, hard: 18 },
    color: "bg-teal-500",
  },
]

const featuredProblems = [
  {
    id: 1,
    title: "PID Controller Tuning for DC Motor",
    category: "PID/Control Systems",
    difficulty: "Medium",
    acceptance: "67%",
    description: "Design and tune a PID controller for precise speed control of a DC motor with load disturbances.",
    tags: ["Control Theory", "Motor Control", "MATLAB"],
  },
  {
    id: 2,
    title: "Smith Chart Impedance Matching",
    category: "RF R&D Development",
    difficulty: "Hard",
    acceptance: "43%",
    description: "Design a matching network using Smith chart to match a 75Ω load to a 50Ω transmission line.",
    tags: ["RF Design", "Smith Chart", "Impedance Matching"],
  },
  {
    id: 3,
    title: "FFT-based Spectrum Analyzer",
    category: "Digital Signal Processing",
    difficulty: "Medium",
    acceptance: "58%",
    description: "Implement a real-time spectrum analyzer using FFT with windowing and overlap processing.",
    tags: ["FFT", "Real-time", "Spectral Analysis"],
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">HardwareHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/problems" className="text-sm font-medium hover:text-primary">
              Problems
            </Link>
            <Link href="/interview" className="text-sm font-medium hover:text-primary">
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            <Star className="h-3 w-3 mr-1" />
            Trusted by 50,000+ Engineers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Master Hardware Engineering
            <span className="text-primary block">One Problem at a Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The comprehensive learning platform for electrical and hardware engineers. Practice problems, simulate
            circuits, and ace technical interviews with AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/problems">
              <Button size="lg" className="text-lg px-8">
                Start Learning
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">1,200+</div>
              <div className="text-sm text-muted-foreground">Practice Problems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Engineers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Interview Success</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Platform Overview</TabsTrigger>
              <TabsTrigger value="problems">Problem Categories</TabsTrigger>
              <TabsTrigger value="interview">AI Interview</TabsTrigger>
              <TabsTrigger value="simulator">SPICE Simulator</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              {/* Featured Problems */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Featured Problems</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {featuredProblems.map((problem) => (
                    <Link key={problem.id} href={`/problems/${problem.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
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
                            <span className="text-sm text-muted-foreground">{problem.acceptance}</span>
                          </div>
                          <CardTitle className="text-lg">{problem.title}</CardTitle>
                          <CardDescription>{problem.category}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">{problem.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {problem.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Platform Features */}
              <div className="grid md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Brain className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>AI-Powered Learning</CardTitle>
                    <CardDescription>
                      Personalized learning paths with adaptive difficulty and intelligent feedback
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <MessageSquare className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Interactive Simulations</CardTitle>
                    <CardDescription>
                      Full-featured SPICE simulator with real-time collaboration and cloud computing
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <CardTitle>Community Driven</CardTitle>
                    <CardDescription>
                      Connect with engineers worldwide, share solutions, and learn from experts
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="problems" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Problem Categories</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const total = category.difficulty.easy + category.difficulty.medium + category.difficulty.hard
                    return (
                      <Link key={category.id} href={`/problems?category=${category.id}`}>
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg ${category.color}`}>
                                <Icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{category.name}</CardTitle>
                                <CardDescription className="text-sm">{category.problems} problems</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>0/{total}</span>
                              </div>
                              <Progress value={0} className="h-2" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span className="text-green-600">Easy: {category.difficulty.easy}</span>
                                <span className="text-yellow-600">Medium: {category.difficulty.medium}</span>
                                <span className="text-red-600">Hard: {category.difficulty.hard}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interview" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">AI Interview Platform</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-6 w-6 text-primary" />
                        Technical Screening
                      </CardTitle>
                      <CardDescription>Adaptive multiple-choice questions tailored to your skill level</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Automated difficulty adjustment
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Real-time performance analytics
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Comprehensive topic coverage
                        </li>
                      </ul>
                      <Link href="/interview">
                        <Button className="w-full mt-4">Start Technical Screen</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Code className="h-6 w-6 text-primary" />
                        Live Coding Sessions
                      </CardTitle>
                      <CardDescription>Real-time HDL coding with syntax highlighting and compilation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Verilog/VHDL support
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Instant compilation feedback
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Code quality analysis
                        </li>
                      </ul>
                      <Link href="/interview">
                        <Button className="w-full mt-4">Practice Coding</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-6 w-6 text-primary" />
                        Circuit Design Challenges
                      </CardTitle>
                      <CardDescription>
                        Interactive schematic capture with comprehensive component libraries
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Drag-and-drop interface
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Extensive component library
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Automated design verification
                        </li>
                      </ul>
                      <Link href="/interview">
                        <Button className="w-full mt-4">Design Circuits</Button>
                      </Link>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        Performance Analytics
                      </CardTitle>
                      <CardDescription>Detailed feedback with improvement recommendations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Skill assessment reports
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Personalized study plans
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          Progress tracking
                        </li>
                      </ul>
                      <Link href="/interview">
                        <Button className="w-full mt-4">View Analytics</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulator" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">SPICE Circuit Simulator</h2>
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Full-Featured Circuit Simulation</CardTitle>
                        <CardDescription>
                          Professional-grade SPICE simulator with advanced analysis capabilities
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="bg-muted/50 rounded-lg p-8 text-center">
                          <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground mb-4">Interactive circuit schematic would appear here</p>
                          <Link href="/simulator">
                            <Button>Launch Simulator</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Simulation Types</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-green-500" />
                          DC Analysis
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-blue-500" />
                          AC Analysis
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-purple-500" />
                          Transient Analysis
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                          Noise Analysis
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-red-500" />
                          Monte Carlo
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Component Library</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="text-sm">
                          <div className="font-medium">Active Components</div>
                          <div className="text-muted-foreground">MOSFETs, BJTs, Op-Amps</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Passive Components</div>
                          <div className="text-muted-foreground">R, L, C, Transformers</div>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">Sources</div>
                          <div className="text-muted-foreground">DC, AC, Pulse, Custom</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Measurement Tools</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Eye className="h-4 w-4" />
                          Virtual Oscilloscope
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Waves className="h-4 w-4" />
                          Spectrum Analyzer
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Radio className="h-4 w-4" />
                          Network Analyzer
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join the Community</h2>
            <p className="text-xl text-muted-foreground">
              Connect with engineers worldwide and accelerate your learning
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Discussion Forums</CardTitle>
                <CardDescription>Get help, share knowledge, and discuss solutions with the community</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Competitions</CardTitle>
                <CardDescription>Participate in engineering challenges and showcase your skills</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Mentorship</CardTitle>
                <CardDescription>Connect with experienced engineers for guidance and career advice</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">HardwareHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The ultimate learning platform for hardware and electrical engineers.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/problems" className="hover:text-foreground">
                    Problems
                  </Link>
                </li>
                <li>
                  <Link href="/interview" className="hover:text-foreground">
                    AI Interview
                  </Link>
                </li>
                <li>
                  <Link href="/simulator" className="hover:text-foreground">
                    SPICE Simulator
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 HardwareHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
