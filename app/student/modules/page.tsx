"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BookOpen, Play, CheckCircle, Lock, Clock, Search, ArrowRight, FileText, Video, HelpCircle } from "lucide-react"
import { StudentLayout } from "@/components/student/student-layout"

// Mock data for learning modules
const mockModules = [
  {
    id: 1,
    title: "Introduction to Calculus",
    course: "Advanced Mathematics",
    description: "Learn the fundamentals of differential and integral calculus",
    progress: 100,
    status: "completed",
    duration: "2 hours",
    difficulty: "Beginner",
    prerequisites: [],
    postrequisites: ["Differential Equations", "Multivariable Calculus"],
    topics: ["Limits", "Derivatives", "Integrals", "Applications"],
    resources: {
      videos: 8,
      notes: 12,
      quizzes: 3,
    },
  },
  {
    id: 2,
    title: "Data Structures Fundamentals",
    course: "Computer Science",
    description: "Master arrays, linked lists, stacks, queues, and trees",
    progress: 65,
    status: "in-progress",
    duration: "3 hours",
    difficulty: "Intermediate",
    prerequisites: ["Programming Basics"],
    postrequisites: ["Algorithms", "Database Design"],
    topics: ["Arrays", "Linked Lists", "Stacks", "Queues", "Trees", "Hash Tables"],
    resources: {
      videos: 15,
      notes: 20,
      quizzes: 5,
    },
  },
  {
    id: 3,
    title: "Quantum Mechanics Basics",
    course: "Physics",
    description: "Introduction to quantum theory and wave-particle duality",
    progress: 0,
    status: "locked",
    duration: "4 hours",
    difficulty: "Advanced",
    prerequisites: ["Classical Mechanics", "Wave Physics"],
    postrequisites: ["Quantum Field Theory"],
    topics: ["Wave Functions", "Uncertainty Principle", "Schrödinger Equation"],
    resources: {
      videos: 12,
      notes: 18,
      quizzes: 4,
    },
  },
  {
    id: 4,
    title: "Linear Algebra Applications",
    course: "Advanced Mathematics",
    description: "Apply linear algebra concepts to real-world problems",
    progress: 30,
    status: "available",
    duration: "2.5 hours",
    difficulty: "Intermediate",
    prerequisites: ["Linear Algebra Basics"],
    postrequisites: ["Machine Learning Mathematics"],
    topics: ["Vector Spaces", "Eigenvalues", "Matrix Decomposition"],
    resources: {
      videos: 10,
      notes: 15,
      quizzes: 4,
    },
  },
]

export default function LearningModulesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "available":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "locked":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredModules = mockModules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      module.course.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = selectedDifficulty === "all" || module.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === "all" || module.status === selectedStatus

    return matchesSearch && matchesDifficulty && matchesStatus
  })

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Learning Modules</h1>
          <p className="text-muted-foreground">
            Explore structured learning paths with prerequisites and recommendations
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="locked">Locked</option>
            </select>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className={`${module.status === "locked" ? "opacity-60" : ""}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <Badge className={getStatusColor(module.status)}>
                        {module.status === "in-progress" ? "In Progress" : module.status}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm text-muted-foreground mb-2">{module.course}</CardDescription>
                    <p className="text-sm">{module.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getDifficultyColor(module.difficulty)}>{module.difficulty}</Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {module.duration}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {module.status !== "locked" && (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} />
                  </div>
                )}

                {/* Topics */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {module.resources.videos} videos
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {module.resources.notes} notes
                  </div>
                  <div className="flex items-center gap-1">
                    <HelpCircle className="w-4 h-4" />
                    {module.resources.quizzes} quizzes
                  </div>
                </div>

                {/* Prerequisites and Postrequisites */}
                <div className="space-y-2">
                  {module.prerequisites.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Prerequisites: </span>
                      <span className="text-sm text-muted-foreground">{module.prerequisites.join(", ")}</span>
                    </div>
                  )}
                  {module.postrequisites.length > 0 && (
                    <div>
                      <span className="text-sm font-medium">Unlocks: </span>
                      <span className="text-sm text-muted-foreground">{module.postrequisites.join(", ")}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {module.status === "locked" ? (
                    <Button disabled className="flex-1">
                      <Lock className="w-4 h-4 mr-2" />
                      Locked
                    </Button>
                  ) : module.status === "completed" ? (
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review
                    </Button>
                  ) : (
                    <Button className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      {module.status === "in-progress" ? "Continue" : "Start"}
                    </Button>
                  )}
                  <Button variant="outline">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No modules found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
