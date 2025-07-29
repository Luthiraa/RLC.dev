"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageSquare,
  Trophy,
  Users,
  Search,
  Filter,
  Plus,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Star,
  Award,
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  User,
  CheckCircle
} from "lucide-react"
import Link from "next/link"

const discussions = [
  {
    id: 1,
    title: "Best practices for PID controller tuning in noisy environments",
    category: "Control Systems",
    author: "EngineerMike",
    authorLevel: "Expert",
    replies: 23,
    likes: 156,
    timeAgo: "2 hours ago",
    tags: ["PID", "Noise", "Control Theory"],
    solved: true
  },
  {
    id: 2,
    title: "MOSFET selection criteria for high-frequency switching applications",
    category: "Power Electronics",
    author: "PowerDesigner",
    authorLevel: "Senior",
    replies: 15,
    likes: 89,
    timeAgo: "4 hours ago",
    tags: ["MOSFET", "Switching", "High Frequency"],
    solved: false
  },
  {
    id: 3,
    title: "Smith Chart vs Network Analyzer for impedance matching",
    category: "RF Engineering",
    author: "RFGuru",
    authorLevel: "Expert",
    replies: 31,
    likes: 203,
    timeAgo: "1 day ago",
    tags: ["Smith Chart", "Impedance Matching", "RF"],
    solved: true
  }
]

const competitions = [
  {
    id: 1,
    title: "Digital Filter Design Challenge",
    description: "Design an optimal FIR filter for audio signal processing",
    category: "Signal Processing",
    prize: "$2,000",
    participants: 156,
    deadline: "5 days left",
    difficulty: "Advanced",
    status: "active"
  },
  {
    id: 2,
    title: "Low-Power IoT Circuit Design",
    description: "Create the most energy-efficient sensor interface circuit",
    category: "IoT",
    prize: "$1,500",
    participants: 89,
    deadline: "12 days left",
    difficulty: "Intermediate",
    status: "active"
  },
  {
    id: 3,
    title: "RF Antenna Optimization",
    description: "Optimize antenna design for 5G applications",
    category: "RF Engineering",
    prize: "$3,000",
    participants: 234,
    deadline: "Ended",
    difficulty: "Expert",
    status: "completed"
  }
]

const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    title: "Senior RF Engineer at Qualcomm",
    expertise: ["RF Design", "Antenna Theory", "5G Systems"],
    rating: 4.9,
    sessions: 127,
    experience: "15+ years",
    available: true
  },
  {
    id: 2,
    name: "Mark Johnson",
    title: "Principal Engineer at Intel",
    expertise: ["Digital Design", "ASIC", "Verification"],
    rating: 4.8,
    sessions: 203,
    experience: "12+ years",
    available: false
  },
  {
    id: 3,
    name: "Lisa Wang",
    title: "Control Systems Lead at Tesla",
    expertise: ["Control Theory", "Automotive", "Embedded Systems"],
    rating: 4.9,
    sessions: 89,
    experience: "10+ years",
    available: true
  }
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("discussions")
  const [searchQuery, setSearchQuery] = useState("")

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
            <Link href="/simulator" className="text-sm font-medium hover:text-primary">
              SPICE Simulator
            </Link>
            <Link href="/community" className="text-sm font-medium text-primary">
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Engineering Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow engineers, share knowledge, and grow together in the hardware engineering community
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-sm text-muted-foreground">Engineers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">12K+</div>
              <div className="text-sm text-muted-foreground">Discussions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-muted-foreground">Mentors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">50+</div>
              <div className="text-sm text-muted-foreground">Active Competitions</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="competitions">Competitions</TabsTrigger>
            <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="discussions" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Discussion
              </Button>
            </div>

            {/* Discussion List */}
            <div className="space-y-4">
              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          {discussion.solved && (
                            <Badge variant="outline" className="text-green-600">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Solved
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {discussion.author} • {discussion.authorLevel}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {discussion.timeAgo}
                          </span>
                          <Badge variant="secondary">{discussion.category}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {discussion.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            {discussion.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            {discussion.replies} replies
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="competitions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Competitions</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Competition
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {competitions.map((competition) => (
                <Card key={competition.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={competition.status === "active" ? "default" : "secondary"}>
                        {competition.status}
                      </Badge>
                      <Badge variant="outline">{competition.difficulty}</Badge>
                    </div>
                    <CardTitle className="text-xl">{competition.title}</CardTitle>
                    <CardDescription>{competition.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Prize Pool</span>
                        <span className="text-lg font-bold text-green-600">{competition.prize}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Participants</span>
                        <span className="font-medium">{competition.participants}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Deadline</span>
                        <span className="font-medium">{competition.deadline}</span>
                      </div>
                      
                      <Badge variant="secondary" className="w-full justify-center">
                        {competition.category}
                      </Badge>
                      
                      <Button 
                        className="w-full" 
                        disabled={competition.status === "completed"}
                      >
                        {competition.status === "completed" ? "View Results" : "Join Competition"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Find Your Mentor</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect with experienced engineers for personalized guidance and career advice
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{mentor.name}</CardTitle>
                        <CardDescription className="text-sm">{mentor.title}</CardDescription>
                      </div>
                      {mentor.available && (
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-1">
                          {mentor.expertise.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Rating</div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {mentor.rating}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Sessions</div>
                          <div className="font-medium">{mentor.sessions}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="text-muted-foreground">Experience</div>
                        <div className="font-medium">{mentor.experience}</div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        disabled={!mentor.available}
                      >
                        {mentor.available ? "Book Session" : "Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Community Leaderboard</h2>
              <p className="text-muted-foreground">
                Top contributors and problem solvers in our community
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Top Contributors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { rank: 1, name: "Alex Thompson", points: 12450, badge: "Expert" },
                      { rank: 2, name: "Maria Garcia", points: 11200, badge: "Senior" },
                      { rank: 3, name: "David Kim", points: 10800, badge: "Senior" },
                      { rank: 4, name: "Sarah Johnson", points: 9600, badge: "Advanced" },
                      { rank: 5, name: "Mike Chen", points: 8900, badge: "Advanced" },
                    ].map((user) => (
                      <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank === 1 ? "bg-yellow-500 text-white" :
                            user.rank === 2 ? "bg-gray-400 text-white" :
                            user.rank === 3 ? "bg-orange-500 text-white" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {user.rank}
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <Badge variant="outline" className="text-xs">{user.badge}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{user.points.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">1,247</div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold">156</div>
                        <div className="text-xs text-muted-foreground">Rank</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold">23</div>
                        <div className="text-xs text-muted-foreground">Badges</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { icon: Award, name: "Problem Solver", desc: "Solved 50 problems" },
                      { icon: Star, name: "Helpful", desc: "10 solutions accepted" },
                      { icon: TrendingUp, name: "Rising Star", desc: "Top 10% this month" },
                    ].map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <achievement.icon className="h-8 w-8 text-primary" />
                        <div>
                          <div className="font-medium text-sm">{achievement.name}</div>
                          <div className="text-xs text-muted-foreground">{achievement.desc}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
