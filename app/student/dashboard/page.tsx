"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Clock, TrendingUp, Play, CheckCircle, Target, Calendar, Award } from "lucide-react"
import { StudentLayout } from "@/components/student/student-layout"

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    progress: 75,
    nextLesson: "Calculus Integration",
    dueDate: "2025-01-20",
    status: "in-progress",
    modules: 12,
    completedModules: 9,
  },
  {
    id: 2,
    title: "Computer Science Fundamentals",
    progress: 45,
    nextLesson: "Data Structures",
    dueDate: "2025-01-25",
    status: "in-progress",
    modules: 15,
    completedModules: 7,
  },
  {
    id: 3,
    title: "Physics Mechanics",
    progress: 90,
    nextLesson: "Final Review",
    dueDate: "2025-01-18",
    status: "almost-complete",
    modules: 10,
    completedModules: 9,
  },
]

const mockRecommendations = [
  {
    id: 1,
    title: "Review Trigonometry",
    reason: "Needed for upcoming Calculus module",
    priority: "high",
    estimatedTime: "30 min",
  },
  {
    id: 2,
    title: "Practice Algorithm Problems",
    reason: "Low performance in recent quiz",
    priority: "medium",
    estimatedTime: "45 min",
  },
  {
    id: 3,
    title: "Complete Physics Lab Report",
    reason: "Due in 2 days",
    priority: "high",
    estimatedTime: "60 min",
  },
]

const mockRecentActivity = [
  {
    id: 1,
    type: "quiz",
    title: "Completed Linear Algebra Quiz",
    score: 85,
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "note",
    title: "Added notes to Calculus Chapter 3",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "flashcard",
    title: "Reviewed 25 Physics flashcards",
    time: "1 day ago",
  },
]

export default function StudentDashboard() {
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
      case "in-progress":
        return "text-primary"
      case "almost-complete":
        return "text-secondary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, Alex!</h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              Level 12 Learner
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                  <p className="text-2xl font-bold">70%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                <div>
                  <p className="text-sm text-muted-foreground">Study Streak</p>
                  <p className="text-2xl font-bold">12 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Hours This Week</p>
                  <p className="text-2xl font-bold">18.5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="recommendations">AI Recommendations</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Continue Learning
                </CardTitle>
                <CardDescription>Pick up where you left off</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex-1 max-w-xs">
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <span className="text-sm text-muted-foreground">{course.progress}%</span>
                      </div>
                    </div>
                    <Button size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Study Recommendations
                </CardTitle>
                <CardDescription>Personalized suggestions to improve your learning</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockRecommendations.slice(0, 2).map((rec) => (
                  <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{rec.title}</h4>
                        <Badge size="sm" className={getPriorityColor(rec.priority)}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.reason}</p>
                      <p className="text-xs text-muted-foreground mt-1">Est. {rec.estimatedTime}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Start
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid gap-6">
              {mockCourses.map((course) => (
                <Card key={course.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{course.title}</CardTitle>
                      <Badge variant="outline" className={getStatusColor(course.status)}>
                        {course.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <CardDescription>
                      {course.completedModules} of {course.modules} modules completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Due: {course.dueDate}
                          </span>
                          <span>Next: {course.nextLesson}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button size="sm">
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid gap-4">
              {mockRecommendations.map((rec) => (
                <Card key={rec.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{rec.title}</h3>
                          <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{rec.reason}</p>
                        <p className="text-xs text-muted-foreground">Estimated time: {rec.estimatedTime}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Later
                        </Button>
                        <Button size="sm">Start Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning activity from the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        {activity.type === "quiz" && <CheckCircle className="w-4 h-4 text-primary" />}
                        {activity.type === "note" && <BookOpen className="w-4 h-4 text-primary" />}
                        {activity.type === "flashcard" && <Brain className="w-4 h-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.title}</p>
                        {activity.score && <p className="text-sm text-muted-foreground">Score: {activity.score}%</p>}
                      </div>
                      <span className="text-sm text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  )
}
