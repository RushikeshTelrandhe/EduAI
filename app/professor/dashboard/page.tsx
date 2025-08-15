"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, BookOpen, FileText, BarChart3, Plus, TrendingUp, AlertTriangle, Brain } from "lucide-react"
import { ProfessorLayout } from "@/components/professor/professor-layout"

// Mock data for professor dashboard
const mockClasses = [
  {
    id: 1,
    name: "Advanced Mathematics",
    code: "MATH 301",
    students: 45,
    activeAssignments: 3,
    avgGrade: 82,
    recentActivity: "Quiz submitted 2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Computer Science Fundamentals",
    code: "CS 101",
    students: 67,
    activeAssignments: 2,
    avgGrade: 78,
    recentActivity: "Assignment due tomorrow",
    status: "active",
  },
  {
    id: 3,
    name: "Physics Mechanics",
    code: "PHYS 201",
    students: 32,
    activeAssignments: 1,
    avgGrade: 85,
    recentActivity: "Lab report graded",
    status: "active",
  },
]

const mockRecentSubmissions = [
  {
    id: 1,
    student: "Alice Johnson",
    assignment: "Calculus Quiz 3",
    class: "MATH 301",
    submittedAt: "2 hours ago",
    status: "pending",
    aiSuggestion: "Strong understanding of integration techniques",
  },
  {
    id: 2,
    student: "Bob Smith",
    assignment: "Data Structures Project",
    class: "CS 101",
    submittedAt: "5 hours ago",
    status: "graded",
    grade: 88,
    aiSuggestion: "Excellent implementation, minor optimization opportunities",
  },
  {
    id: 3,
    student: "Carol Davis",
    assignment: "Physics Lab Report",
    class: "PHYS 201",
    submittedAt: "1 day ago",
    status: "pending",
    aiSuggestion: "Good experimental design, needs better error analysis",
  },
]

const mockAIInsights = [
  {
    id: 1,
    type: "performance",
    title: "Class Performance Alert",
    message: "MATH 301 students struggling with integration by parts (65% avg)",
    priority: "high",
    suggestion: "Consider additional practice problems or review session",
  },
  {
    id: 2,
    type: "engagement",
    title: "Low Engagement Detected",
    message: "CS 101 participation down 20% this week",
    priority: "medium",
    suggestion: "Interactive coding exercises might boost engagement",
  },
  {
    id: 3,
    type: "content",
    title: "Content Recommendation",
    message: "Students would benefit from visual aids for PHYS 201 momentum concepts",
    priority: "low",
    suggestion: "Add simulation or animation resources",
  },
]

export default function ProfessorDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600"
      case "graded":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <ProfessorLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, Dr. Smith!</h1>
            <p className="text-muted-foreground">Manage your classes and track student progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">144</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Classes</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Pending Grades</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Class Grade</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* My Classes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  My Classes
                </CardTitle>
                <CardDescription>Overview of your active classes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockClasses.map((cls) => (
                  <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{cls.name}</h3>
                        <Badge variant="outline">{cls.code}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{cls.recentActivity}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{cls.students} students</span>
                        <span>{cls.activeAssignments} active assignments</span>
                        <span>Avg: {cls.avgGrade}%</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Class
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Insights
                </CardTitle>
                <CardDescription>AI-powered recommendations for your classes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockAIInsights.slice(0, 2).map((insight) => (
                  <div key={insight.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      {insight.type === "performance" && <AlertTriangle className="w-4 h-4 text-primary" />}
                      {insight.type === "engagement" && <Users className="w-4 h-4 text-primary" />}
                      {insight.type === "content" && <BookOpen className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge size="sm" className={getPriorityColor(insight.priority)}>
                          {insight.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{insight.message}</p>
                      <p className="text-xs text-primary">{insight.suggestion}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid gap-6">
              {mockClasses.map((cls) => (
                <Card key={cls.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {cls.name}
                          <Badge variant="outline">{cls.code}</Badge>
                        </CardTitle>
                        <CardDescription>{cls.students} enrolled students</CardDescription>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-2xl font-bold text-primary">{cls.students}</p>
                          <p className="text-sm text-muted-foreground">Students</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-secondary">{cls.activeAssignments}</p>
                          <p className="text-sm text-muted-foreground">Active Assignments</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-accent">{cls.avgGrade}%</p>
                          <p className="text-sm text-muted-foreground">Average Grade</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1">View Analytics</Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Manage Content
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Create Test
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
                <CardDescription>Latest student submissions requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentSubmissions.map((submission) => (
                    <div key={submission.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{submission.student}</h4>
                          <Badge variant="outline">{submission.class}</Badge>
                          <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{submission.assignment}</p>
                        <p className="text-xs text-muted-foreground mb-2">Submitted {submission.submittedAt}</p>
                        <div className="bg-muted/50 rounded p-2">
                          <div className="flex items-center gap-1 mb-1">
                            <Brain className="w-3 h-3 text-primary" />
                            <span className="text-xs font-medium">AI Suggestion:</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{submission.aiSuggestion}</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {submission.status === "pending" ? (
                          <Button size="sm">Grade Now</Button>
                        ) : (
                          <div className="text-center">
                            <p className="text-lg font-bold text-green-600">{submission.grade}%</p>
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-4">
              {mockAIInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {insight.type === "performance" && <BarChart3 className="w-5 h-5 text-primary" />}
                        {insight.type === "engagement" && <Users className="w-5 h-5 text-primary" />}
                        {insight.type === "content" && <BookOpen className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.message}</p>
                        <div className="bg-primary/5 rounded p-2">
                          <p className="text-sm text-primary font-medium">Suggestion:</p>
                          <p className="text-sm text-muted-foreground">{insight.suggestion}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProfessorLayout>
  )
}
