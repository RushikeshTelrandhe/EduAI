"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, GraduationCap, UserCheck, Building2, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Access personalized learning paths, AI-powered study tools, and track your progress",
      icon: GraduationCap,
      features: ["Smart flashcards", "Progress tracking", "AI study assistant", "Interactive quizzes"],
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: "professor",
      title: "Professor",
      description: "Create engaging content, track student performance, and leverage AI for grading",
      icon: UserCheck,
      features: ["AI-powered test creation", "Student analytics", "Automated grading", "Content management"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: "institution",
      title: "Institution Admin",
      description: "Comprehensive analytics, academic integrity tools, and platform-wide insights",
      icon: Building2,
      features: ["Usage analytics", "Integrity monitoring", "AI integration settings", "User management"],
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ]

  const handleContinue = async () => {
    if (!selectedRole) return

    setIsLoading(true)
    // TODO: Update user role and redirect to appropriate dashboard
    setTimeout(() => {
      setIsLoading(false)
      // Redirect based on role
      window.location.href = `/${selectedRole}/dashboard`
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className="text-3xl font-serif font-bold text-foreground">EduAI</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Choose Your Role</h1>
          <p className="text-lg text-muted-foreground">
            Select how you'll be using EduAI to get a personalized experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id

            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isSelected ? "ring-2 ring-primary shadow-lg" : ""
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${role.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className={`w-8 h-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-xl font-serif">{role.title}</CardTitle>
                  <CardDescription className="text-sm">{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {role.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${role.color.replace("text-", "bg-")}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" onClick={handleContinue} disabled={!selectedRole || isLoading} className="px-8">
            {isLoading ? "Setting up..." : "Continue"}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
