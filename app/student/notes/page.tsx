"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Plus, Search, Star, Edit, Trash2, BookOpen, Brain, Calendar, Tag } from "lucide-react"
import { StudentLayout } from "@/components/student/student-layout"

// Mock data for notes
const mockNotes = [
  {
    id: 1,
    title: "Calculus Integration Techniques",
    content: "Key integration methods: substitution, integration by parts, partial fractions...",
    course: "Advanced Mathematics",
    module: "Introduction to Calculus",
    tags: ["integration", "calculus", "math"],
    createdAt: "2025-01-15",
    updatedAt: "2025-01-16",
    isFavorite: true,
    aiSummary: "This note covers three main integration techniques with examples and practice problems.",
  },
  {
    id: 2,
    title: "Data Structure Comparison",
    content: "Arrays vs Linked Lists: Arrays provide O(1) access but O(n) insertion...",
    course: "Computer Science",
    module: "Data Structures Fundamentals",
    tags: ["data-structures", "arrays", "linked-lists"],
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
    isFavorite: false,
    aiSummary: "Comparative analysis of arrays and linked lists with time complexity considerations.",
  },
  {
    id: 3,
    title: "Physics Lab - Pendulum Motion",
    content: "Observed period T = 2π√(L/g) for simple pendulum. Measured values...",
    course: "Physics",
    module: "Classical Mechanics",
    tags: ["physics", "lab", "pendulum", "motion"],
    createdAt: "2025-01-13",
    updatedAt: "2025-01-15",
    isFavorite: true,
    aiSummary: "Lab report documenting pendulum motion experiments and theoretical validation.",
  },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [isCreating, setIsCreating] = useState(false)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    tags: "",
  })

  const courses = ["all", ...Array.from(new Set(mockNotes.map((note) => note.course)))]

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCourse = selectedCourse === "all" || note.course === selectedCourse

    return matchesSearch && matchesCourse
  })

  const handleCreateNote = () => {
    // TODO: Implement note creation logic
    console.log("Creating note:", newNote)
    setIsCreating(false)
    setNewNote({ title: "", content: "", tags: "" })
  }

  const toggleFavorite = (noteId: number) => {
    // TODO: Implement favorite toggle logic
    console.log("Toggling favorite for note:", noteId)
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">My Notes</h1>
            <p className="text-muted-foreground">Organize and review your study notes with AI-powered summaries</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background text-foreground"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course === "all" ? "All Courses" : course}
              </option>
            ))}
          </select>
        </div>

        {/* Create Note Modal */}
        {isCreating && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Note</CardTitle>
              <CardDescription>Add a new study note with AI-powered organization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title</label>
                <Input
                  placeholder="Enter note title..."
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Content</label>
                <Textarea
                  placeholder="Write your notes here..."
                  value={newNote.content}
                  onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                  rows={6}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Tags (comma-separated)</label>
                <Input
                  placeholder="calculus, integration, math..."
                  value={newNote.tags}
                  onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateNote}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Note
                </Button>
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredNotes.map((note) => (
              <Card key={note.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => toggleFavorite(note.id)} className="p-1">
                          <Star
                            className={`w-4 h-4 ${note.isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {note.course}
                        </span>
                        <span>{note.module}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {note.updatedAt}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm line-clamp-3">{note.content}</p>

                  {/* AI Summary */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">AI Summary</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{note.aiSummary}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            {filteredNotes
              .filter((note) => note.isFavorite)
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                    </div>
                    <CardDescription>
                      {note.course} • {note.module}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            {filteredNotes
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .slice(0, 5)
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>
                      Updated {note.updatedAt} • {note.course}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm line-clamp-2">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notes found</h3>
              <p className="text-muted-foreground mb-4">
                Create your first note to get started with organized studying
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
