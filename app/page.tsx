import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BookOpen,
  Users,
  BarChart3,
  Brain,
  CheckCircle,
  ArrowRight,
  GraduationCap,
  UserCheck,
  Building2,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatTrigger } from "@/components/ai-chat/chat-trigger"
import { ResponsiveNav } from "@/components/responsive-nav"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">EduAI</span>
          </div>

          <ResponsiveNav>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#roles" className="text-muted-foreground hover:text-foreground transition-colors">
              For You
            </a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <ThemeToggle />
          </ResponsiveNav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            AI-Powered Learning Platform
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Transform Education with <span className="text-primary">Intelligent Learning</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A unified platform that empowers students, professors, and institutions with AI-driven tools for
            personalized learning, intelligent assessment, and comprehensive analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base md:text-lg px-6 md:px-8" asChild>
              <Link href="/auth/signup">
                Get Started Free
                <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-12 md:py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">
            The Challenge in Modern Education
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8">
            Traditional learning platforms create silos between students, educators, and institutions. Without
            AI-powered insights, personalized learning paths, and comprehensive analytics, educational outcomes suffer
            and potential remains untapped.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Intelligent Features for Every User
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform adapts to your needs, whether you're learning, teaching, or managing educational
              programs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Personalized Learning Paths</CardTitle>
                <CardDescription>
                  AI analyzes your progress and creates customized study plans with prerequisites and recommendations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Brain className="w-10 h-10 text-primary mb-2" />
                <CardTitle>AI-Powered Assessment</CardTitle>
                <CardDescription>
                  Intelligent grading, instant feedback, and adaptive testing that evolves with student performance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Comprehensive Analytics</CardTitle>
                <CardDescription>
                  Deep insights into learning patterns, performance trends, and institutional metrics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Collaborative Learning</CardTitle>
                <CardDescription>
                  Connect students and educators in interactive environments with real-time AI assistance.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <CheckCircle className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Academic Integrity</CardTitle>
                <CardDescription>
                  Advanced AI detection and prevention tools to maintain educational standards and authenticity.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <GraduationCap className="w-10 h-10 text-primary mb-2" />
                <CardTitle>Smart Content Creation</CardTitle>
                <CardDescription>
                  AI-assisted quiz generation, note summarization, and interactive learning materials.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Role-Specific CTAs */}
      <section id="roles" className="py-12 md:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Built for Your Role
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">
              Choose your path and discover how EduAI transforms your educational experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-border hover:shadow-xl transition-all hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-serif">Students</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Personalized learning with AI-powered study recommendations, progress tracking, and interactive
                  quizzes.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Smart flashcards and notes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    Progress tracking
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    AI study assistant
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/auth/signup?role=student">
                    Start Learning
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-serif">Professors</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Create engaging content, track student performance, and leverage AI for grading and insights.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    AI-powered test creation
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    Student analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    Automated grading
                  </li>
                </ul>
                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/auth/signup?role=professor">
                    Start Teaching
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-xl transition-all hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-xl md:text-2xl font-serif">Institutions</CardTitle>
                <CardDescription className="text-sm md:text-base">
                  Comprehensive analytics, academic integrity tools, and platform-wide insights for administrators.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    Usage analytics
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    Integrity monitoring
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    AI integration settings
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                  asChild
                >
                  <Link href="/auth/signup?role=institution">
                    Get Enterprise
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 md:py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground">EduAI</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right text-sm md:text-base">
              © 2025 EduAI. Transforming education with artificial intelligence.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Trigger */}
      <ChatTrigger variant="floating" />
    </div>
  )
}
