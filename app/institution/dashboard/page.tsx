"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Shield,
  Brain,
  Settings,
  Download,
  Calendar,
  DollarSign,
} from "lucide-react"
import { InstitutionLayout } from "@/components/institution/institution-layout"

// Mock data for institution dashboard
const mockInstitutionStats = {
  totalStudents: 12450,
  totalProfessors: 485,
  activeCourses: 1250,
  platformUsage: 87,
  monthlyGrowth: 12,
  integrityScore: 94,
  aiUsage: 76,
  costSavings: 125000,
}

const mockDepartmentStats = [
  {
    name: "Computer Science",
    students: 2340,
    professors: 85,
    courses: 180,
    avgGrade: 82,
    usage: 92,
    integrityIssues: 3,
  },
  {
    name: "Mathematics",
    students: 1890,
    professors: 65,
    courses: 145,
    avgGrade: 78,
    usage: 88,
    integrityIssues: 1,
  },
  {
    name: "Physics",
    students: 1560,
    professors: 45,
    courses: 120,
    avgGrade: 85,
    usage: 85,
    integrityIssues: 2,
  },
  {
    name: "Engineering",
    students: 3200,
    professors: 120,
    courses: 220,
    avgGrade: 80,
    usage: 90,
    integrityIssues: 5,
  },
]

const mockIntegrityAlerts = [
  {
    id: 1,
    type: "plagiarism",
    student: "Anonymous Student #1247",
    course: "CS 301 - Advanced Algorithms",
    professor: "Dr. Johnson",
    severity: "high",
    description: "Potential code plagiarism detected in assignment submission",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "unusual-pattern",
    student: "Anonymous Student #2891",
    course: "MATH 201 - Calculus II",
    professor: "Dr. Smith",
    severity: "medium",
    description: "Unusual answer pattern in online quiz suggests external assistance",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "time-anomaly",
    student: "Anonymous Student #3456",
    course: "PHYS 101 - General Physics",
    professor: "Dr. Brown",
    severity: "low",
    description: "Suspiciously fast completion time for complex problems",
    timestamp: "1 day ago",
  },
]

const mockAIInsights = [
  {
    id: 1,
    title: "Platform Adoption Opportunity",
    description: "Engineering department shows 15% lower AI tool usage compared to institution average",
    impact: "high",
    recommendation: "Provide targeted training sessions for Engineering faculty",
    metric: "15% usage gap",
  },
  {
    id: 2,
    title: "Academic Performance Correlation",
    description: "Students using AI study tools show 18% better retention rates",
    impact: "medium",
    recommendation: "Promote AI study features to at-risk student populations",
    metric: "18% improvement",
  },
  {
    id: 3,
    title: "Cost Optimization",
    description: "AI-powered grading has reduced manual grading time by 40% institution-wide",
    impact: "high",
    recommendation: "Expand AI grading to remaining departments",
    metric: "$125K saved",
  },
]

export default function InstitutionDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <InstitutionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Institution Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive analytics and management for your educational institution
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-bold">{mockInstitutionStats.totalStudents.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{mockInstitutionStats.monthlyGrowth}% this month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Faculty Members</p>
                  <p className="text-2xl font-bold">{mockInstitutionStats.totalProfessors}</p>
                  <p className="text-xs text-muted-foreground">Across all departments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold">{mockInstitutionStats.activeCourses}</p>
                  <p className="text-xs text-muted-foreground">This semester</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">Cost Savings</p>
                  <p className="text-2xl font-bold">${mockInstitutionStats.costSavings.toLocaleString()}</p>
                  <p className="text-xs text-green-600">From AI automation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Health */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Platform Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Adoption</span>
                  <span>{mockInstitutionStats.platformUsage}%</span>
                </div>
                <Progress value={mockInstitutionStats.platformUsage} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Academic Integrity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Integrity Score</span>
                  <span>{mockInstitutionStats.integrityScore}%</span>
                </div>
                <Progress value={mockInstitutionStats.integrityScore} />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">AI Tool Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>AI Adoption</span>
                  <span>{mockInstitutionStats.aiUsage}%</span>
                </div>
                <Progress value={mockInstitutionStats.aiUsage} />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="integrity">Academic Integrity</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Platform Activity
                </CardTitle>
                <CardDescription>Key metrics and trends across your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">2,340</p>
                    <p className="text-sm text-muted-foreground">Daily Active Users</p>
                    <p className="text-xs text-green-600">+8% from yesterday</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-secondary">156</p>
                    <p className="text-sm text-muted-foreground">Tests Created</p>
                    <p className="text-xs text-muted-foreground">This week</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-accent">4,890</p>
                    <p className="text-sm text-muted-foreground">AI Interactions</p>
                    <p className="text-xs text-blue-600">+23% this month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">98.2%</p>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <Users className="w-6 h-6" />
                    <span>Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <Settings className="w-6 h-6" />
                    <span>AI Settings</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                    <Shield className="w-6 h-6" />
                    <span>Security Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            <div className="grid gap-6">
              {mockDepartmentStats.map((dept) => (
                <Card key={dept.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{dept.name}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{dept.usage}% adoption</Badge>
                        {dept.integrityIssues > 0 && (
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            {dept.integrityIssues} alerts
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                      <div>
                        <p className="text-lg font-semibold text-primary">{dept.students.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Students</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-secondary">{dept.professors}</p>
                        <p className="text-sm text-muted-foreground">Faculty</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-accent">{dept.courses}</p>
                        <p className="text-sm text-muted-foreground">Courses</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-green-600">{dept.avgGrade}%</p>
                        <p className="text-sm text-muted-foreground">Avg Grade</p>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-blue-600">{dept.usage}%</p>
                        <p className="text-sm text-muted-foreground">Platform Usage</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Platform Adoption</span>
                        <span>{dept.usage}%</span>
                      </div>
                      <Progress value={dept.usage} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="integrity" className="space-y-6">
            {/* Integrity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Integrity Score</p>
                      <p className="text-2xl font-bold text-green-600">94%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Active Alerts</p>
                      <p className="text-2xl font-bold text-yellow-600">11</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">Cases Resolved</p>
                      <p className="text-2xl font-bold text-blue-600">47</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Recent Integrity Alerts
                </CardTitle>
                <CardDescription>AI-detected potential academic integrity issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockIntegrityAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.student}</h4>
                          <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {alert.course} • {alert.professor}
                        </p>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                        <Button size="sm">Investigate</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid gap-4">
              {mockAIInsights.map((insight) => (
                <Card key={insight.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Brain className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{insight.title}</h3>
                          <Badge className={getImpactColor(insight.impact)}>{insight.impact} impact</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                        <div className="bg-primary/5 rounded p-3 mb-2">
                          <p className="text-sm text-primary font-medium mb-1">AI Recommendation:</p>
                          <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-medium text-accent">Key Metric: {insight.metric}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                        <Button size="sm">Take Action</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Usage Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>AI Feature Usage</CardTitle>
                <CardDescription>How your institution is leveraging AI capabilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Grading</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Study Recommendations</span>
                        <span>76%</span>
                      </div>
                      <Progress value={76} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Content Generation</span>
                        <span>68%</span>
                      </div>
                      <Progress value={68} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Plagiarism Detection</span>
                        <span>94%</span>
                      </div>
                      <Progress value={94} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Learning Analytics</span>
                        <span>71%</span>
                      </div>
                      <Progress value={71} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>AI Chat Assistant</span>
                        <span>59%</span>
                      </div>
                      <Progress value={59} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstitutionLayout>
  )
}
