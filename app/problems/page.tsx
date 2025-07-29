"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Search,
  Filter,
  Target,
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

const allProblems = [
  {
    id: 1,
    title: "PID Controller Tuning for DC Motor",
    category: "PID/Control Systems",
    difficulty: "Medium",
    acceptance: "67%",
    tags: ["Control Theory", "Motor Control", "MATLAB"],
    solved: false,
  },
  {
    id: 2,
    title: "Smith Chart Impedance Matching",
    category: "RF R&D Development",
    difficulty: "Hard",
    acceptance: "43%",
    tags: ["RF Design", "Smith Chart", "Impedance Matching"],
    solved: true,
  },
  {
    id: 3,
    title: "FFT-based Spectrum Analyzer",
    category: "Digital Signal Processing",
    difficulty: "Medium",
    acceptance: "58%",
    tags: ["FFT", "Real-time", "Spectral Analysis"],
    solved: false,
  },
  {
    id: 4,
    title: "Bode Plot Analysis for Op-Amp Circuit",
    category: "PID/Control Systems",
    difficulty: "Easy",
    acceptance: "78%",
    tags: ["Bode Plot", "Op-Amp", "Frequency Response"],
    solved: true,
  },
  {
    id: 5,
    title: "MOSFET Characteristics Analysis",
    category: "ASIC Design",
    difficulty: "Medium",
    acceptance: "64%",
    tags: ["MOSFET", "I-V Curves", "Device Physics"],
    solved: false,
  },
]

export default function ProblemsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [difficulty, setDifficulty] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProblems = allProblems.filter(problem => {
    const matchesCategory = selectedCategory === "all" || problem.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesDifficulty = difficulty === "all" || problem.difficulty.toLowerCase() === difficulty.toLowerCase()
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesDifficulty && matchesSearch
  })

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
            <Link href="/problems" className="text-sm font-medium text-primary">
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

      <div className="container max-w-7xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Practice Problems</h1>
          <p className="text-xl text-muted-foreground">
            Master hardware engineering concepts with hands-on problems across 10 specialized domains
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search problems, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={difficulty} onValueChange={setDifficulty}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Categories Overview */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Problem Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              const total = category.difficulty.easy + category.difficulty.medium + category.difficulty.hard
              return (
                <Card 
                  key={category.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
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
              )
            })}
          </div>
        </div>

        {/* Problems List */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Problems ({filteredProblems.length})</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
          
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Link 
                          href={`/problems/${problem.id}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {problem.title}
                        </Link>
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
                            Solved ✓
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-3">{problem.category}</p>
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-2">
                        Acceptance Rate
                      </div>
                      <div className="text-lg font-semibold">{problem.acceptance}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No problems found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCategory("all")
                  setDifficulty("all")
                  setSearchQuery("")
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
