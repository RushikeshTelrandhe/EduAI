"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, TrendingDown, Users, Clock, Target, AlertTriangle, Brain, Download } from "lucide-react"
import { ProfessorLayout } from "@/components/professor/professor-layout"

// Mock data for analytics
const mockClassPerformance = [
  { class: "MATH 301", avgGrade: 82, students: 45, trend: "up", improvement: 5 },
  { class: "CS 101", avgGrade: 78, students: 67, trend: "down", improvement: -3 },
  { class: "PHYS 201", avgGrade: 85, students: 32, trend: "up", improvement: 2 },
]

const mockStudentInsights = [
  {
    id: 1,
    name: "Alice Johnson",
    class: "MATH 301",
    avgGrade: 92,
    trend: "stable",
    strengths: ["Integration", "Derivatives"],
    weaknesses: ["Word Problems"],
    riskLevel: "low",
  },
  {
    id: 2,
    name: "Bob Smith",
    class: "CS 101",
    avgGrade: 65,
    trend: "declining",
    strengths: ["Basic Syntax"],
    weaknesses: ["Data Structures", "Algorithms"],
    riskLevel: "high",
  },
  {
    id: 3,
    name: "Carol Davis",
    class: "PHYS 201",
    avgGrade: 88,
    trend: "improving",
    strengths: ["Lab Work", "Problem Solving"],
    weaknesses: ["Theoretical Concepts"],
    riskLevel: "low",
  },
]

const mockTopicAnalysis = [
  { topic: "Integration Techniques", avgScore: 75, difficulty: "high", needsReview: true },
  { topic: "Derivatives", avgScore: 88, difficulty: "medium", needsReview: false },
  { topic: "Limits", avgScore: 82, difficulty: "medium", needsReview: false },
  { topic: "Applications", avgScore: 68, difficulty: "high", needsReview: true },
]

export default function AnalyticsPage() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "down":
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <div className="w-4 h-4" />
    }
  }

  return (
    <ProfessorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-muted-foreground">AI-powered insights into student performance and learning patterns</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="math301">MATH 301</SelectItem>
                <SelectItem value="cs101">CS 101</SelectItem>
                <SelectItem value="phys201">PHYS 201</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
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
                <Target className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Overall Avg Grade</p>
                  <p className="text-2xl font-bold">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <div>
                  <p className="text-sm text-muted-foreground">At-Risk Students</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Study Time</p>
                  <p className="text-2xl font-bold">4.2h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="performance">Class Performance</TabsTrigger>
            <TabsTrigger value="students">Student Insights</TabsTrigger>
            <TabsTrigger value="topics">Topic Analysis</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-6">
              {mockClassPerformance.map((cls) => (
                <Card key={cls.class}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {cls.class}
                          {getTrendIcon(cls.trend)}
                        </CardTitle>
                        <CardDescription>{cls.students} students enrolled</CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{cls.avgGrade}%</p>
                        <p className="text-sm text-muted-foreground">
                          {cls.improvement > 0 ? "+" : ""}
                          {cls.improvement}% from last month
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-green-600">{Math.round(cls.students * 0.3)}</p>
                        <p className="text-sm text-muted-foreground">Excellent (90%+)</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-yellow-600">{Math.round(cls.students * 0.5)}</p>
                        <p className="text-sm text-muted-foreground">Good (70-89%)</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-red-600">{Math.round(cls.students * 0.2)}</p>
                        <p className="text-sm text-muted-foreground">Needs Help (&lt;70%)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="grid gap-4">
              {mockStudentInsights.map((student) => (
                <Card key={student.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{student.name}</h3>
                          <Badge variant="outline">{student.class}</Badge>
                          <Badge className={getRiskColor(student.riskLevel)}>{student.riskLevel} risk</Badge>
                          {getTrendIcon(student.trend)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-green-600 mb-1">Strengths:</p>
                            <div className="flex flex-wrap gap-1">
                              {student.strengths.map((strength, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="font-medium text-red-600 mb-1">Areas for Improvement:</p>
                            <div className="flex flex-wrap gap-1">
                              {student.weaknesses.map((weakness, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {weakness}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{student.avgGrade}%</p>
                        <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Performance Analysis</CardTitle>
                <CardDescription>Identify areas where students need additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopicAnalysis.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{topic.topic}</h4>
                          {topic.needsReview && (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                              Needs Review
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Difficulty: {topic.difficulty}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold">{topic.avgScore}%</p>
                        <p className="text-sm text-muted-foreground">Class Average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Learning Pattern Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Students in MATH 301 show 23% better performance when visual aids are used in integration
                        problems.
                      </p>
                      <div className="bg-primary/5 rounded p-2">
                        <p className="text-sm text-primary font-medium">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">
                          Incorporate more graphical representations and step-by-step visual solutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Engagement Optimization</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        CS 101 students are most active during Tuesday and Thursday sessions (85% participation vs 65%
                        average).
                      </p>
                      <div className="bg-secondary/5 rounded p-2">
                        <p className="text-sm text-secondary font-medium">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">
                          Schedule important topics and interactive sessions on high-engagement days.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">Personalized Learning Paths</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        8 students would benefit from prerequisite review in algebra before tackling calculus concepts.
                      </p>
                      <div className="bg-accent/5 rounded p-2">
                        <p className="text-sm text-accent font-medium">Recommendation:</p>
                        <p className="text-sm text-muted-foreground">
                          Create targeted review sessions or assign supplementary algebra practice.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProfessorLayout>
  )
}
