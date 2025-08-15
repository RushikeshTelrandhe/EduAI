"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Plus, Trash2, Brain, CheckCircle, Wand2, Save, Eye, Settings } from "lucide-react"
import { ProfessorLayout } from "@/components/professor/professor-layout"

interface Question {
  id: string
  type: "multiple-choice" | "short-answer" | "essay" | "true-false"
  question: string
  options?: string[]
  correctAnswer?: string | number
  points: number
  difficulty: "easy" | "medium" | "hard"
  topic: string
}

export default function CreateTestPage() {
  const [testDetails, setTestDetails] = useState({
    title: "",
    description: "",
    class: "",
    duration: 60,
    totalPoints: 0,
    instructions: "",
    allowRetakes: false,
    shuffleQuestions: true,
    showResults: true,
  })

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: "multiple-choice",
    question: "",
    options: ["", "", "", ""],
    points: 1,
    difficulty: "medium",
    topic: "",
  })

  const [aiSuggestions, setAiSuggestions] = useState([
    "What is the derivative of x²?",
    "Explain the concept of limits in calculus",
    "Calculate the integral of sin(x)",
    "Define continuity of a function",
  ])

  const addQuestion = () => {
    if (!currentQuestion.question) return

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type as Question["type"],
      question: currentQuestion.question,
      options: currentQuestion.options,
      correctAnswer: currentQuestion.correctAnswer,
      points: currentQuestion.points || 1,
      difficulty: currentQuestion.difficulty as Question["difficulty"],
      topic: currentQuestion.topic || "",
    }

    setQuestions([...questions, newQuestion])
    setTestDetails((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + newQuestion.points,
    }))

    // Reset current question
    setCurrentQuestion({
      type: "multiple-choice",
      question: "",
      options: ["", "", "", ""],
      points: 1,
      difficulty: "medium",
      topic: "",
    })
  }

  const removeQuestion = (id: string) => {
    const questionToRemove = questions.find((q) => q.id === id)
    if (questionToRemove) {
      setQuestions(questions.filter((q) => q.id !== id))
      setTestDetails((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints - questionToRemove.points,
      }))
    }
  }

  const generateAIQuestions = () => {
    // TODO: Implement AI question generation
    console.log("Generating AI questions for topic:", currentQuestion.topic)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <ProfessorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Create Test</h1>
            <p className="text-muted-foreground">Build AI-powered assessments with intelligent grading</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Test
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList>
            <TabsTrigger value="details">Test Details</TabsTrigger>
            <TabsTrigger value="questions">Questions ({questions.length})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Information</CardTitle>
                <CardDescription>Basic details about your test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Test Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Midterm Exam - Calculus"
                      value={testDetails.title}
                      onChange={(e) => setTestDetails({ ...testDetails, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Select
                      value={testDetails.class}
                      onValueChange={(value) => setTestDetails({ ...testDetails, class: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math301">MATH 301 - Advanced Mathematics</SelectItem>
                        <SelectItem value="cs101">CS 101 - Computer Science Fundamentals</SelectItem>
                        <SelectItem value="phys201">PHYS 201 - Physics Mechanics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of the test content and objectives"
                    value={testDetails.description}
                    onChange={(e) => setTestDetails({ ...testDetails, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={testDetails.duration}
                      onChange={(e) => setTestDetails({ ...testDetails, duration: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Points</Label>
                    <div className="flex items-center h-10 px-3 border rounded-md bg-muted">
                      <span className="text-sm">{testDetails.totalPoints} points</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructions">Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Special instructions for students taking this test"
                    value={testDetails.instructions}
                    onChange={(e) => setTestDetails({ ...testDetails, instructions: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            {/* Add Question Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Question
                </CardTitle>
                <CardDescription>Create a new question or use AI suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={currentQuestion.type}
                      onValueChange={(value) =>
                        setCurrentQuestion({ ...currentQuestion, type: value as Question["type"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                        <SelectItem value="short-answer">Short Answer</SelectItem>
                        <SelectItem value="essay">Essay</SelectItem>
                        <SelectItem value="true-false">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Difficulty</Label>
                    <Select
                      value={currentQuestion.difficulty}
                      onValueChange={(value) =>
                        setCurrentQuestion({ ...currentQuestion, difficulty: value as Question["difficulty"] })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Points</Label>
                    <Input
                      type="number"
                      min="1"
                      value={currentQuestion.points}
                      onChange={(e) =>
                        setCurrentQuestion({ ...currentQuestion, points: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Topic</Label>
                  <Input
                    placeholder="e.g., Integration, Derivatives, Limits"
                    value={currentQuestion.topic}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, topic: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea
                    placeholder="Enter your question here..."
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                  />
                </div>

                {currentQuestion.type === "multiple-choice" && (
                  <div className="space-y-2">
                    <Label>Answer Options</Label>
                    <div className="space-y-2">
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...(currentQuestion.options || [])]
                              newOptions[index] = e.target.value
                              setCurrentQuestion({ ...currentQuestion, options: newOptions })
                            }}
                          />
                          <Button
                            variant={currentQuestion.correctAnswer === index ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: index })}
                          >
                            {currentQuestion.correctAnswer === index ? <CheckCircle className="w-4 h-4" /> : "Correct"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button onClick={addQuestion} disabled={!currentQuestion.question}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                  <Button variant="outline" onClick={generateAIQuestions}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    AI Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI Suggestions */}
            {aiSuggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Question Suggestions
                  </CardTitle>
                  <CardDescription>Click to use these AI-generated questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{suggestion}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentQuestion({ ...currentQuestion, question: suggestion })}
                        >
                          Use
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Questions List */}
            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Questions ({questions.length})</CardTitle>
                  <CardDescription>Review and manage your questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Q{index + 1}</span>
                            <Badge className={getDifficultyColor(question.difficulty)}>{question.difficulty}</Badge>
                            <Badge variant="outline">{question.points} pts</Badge>
                            {question.topic && <Badge variant="outline">{question.topic}</Badge>}
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeQuestion(question.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm mb-2">{question.question}</p>
                        {question.type === "multiple-choice" && question.options && (
                          <div className="space-y-1">
                            {question.options.map((option, optIndex) => (
                              <div
                                key={optIndex}
                                className={`text-xs p-2 rounded ${
                                  question.correctAnswer === optIndex ? "bg-green-100 dark:bg-green-900" : "bg-muted"
                                }`}
                              >
                                {String.fromCharCode(65 + optIndex)}. {option}
                                {question.correctAnswer === optIndex && (
                                  <CheckCircle className="w-3 h-3 inline ml-2 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Test Settings
                </CardTitle>
                <CardDescription>Configure test behavior and student experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Allow Retakes</Label>
                    <p className="text-sm text-muted-foreground">Students can retake this test multiple times</p>
                  </div>
                  <Switch
                    checked={testDetails.allowRetakes}
                    onCheckedChange={(checked) => setTestDetails({ ...testDetails, allowRetakes: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shuffle Questions</Label>
                    <p className="text-sm text-muted-foreground">Randomize question order for each student</p>
                  </div>
                  <Switch
                    checked={testDetails.shuffleQuestions}
                    onCheckedChange={(checked) => setTestDetails({ ...testDetails, shuffleQuestions: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Results Immediately</Label>
                    <p className="text-sm text-muted-foreground">Display scores and feedback after submission</p>
                  </div>
                  <Switch
                    checked={testDetails.showResults}
                    onCheckedChange={(checked) => setTestDetails({ ...testDetails, showResults: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ProfessorLayout>
  )
}
