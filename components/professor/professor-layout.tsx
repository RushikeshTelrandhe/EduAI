"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import {
  Brain,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Menu,
  Home,
  PlusCircle,
  GraduationCap,
  MessageSquare,
  Upload,
  CheckSquare,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigation = [
  { name: "Dashboard", href: "/professor/dashboard", icon: Home },
  { name: "My Classes", href: "/professor/classes", icon: BookOpen },
  { name: "Students", href: "/professor/students", icon: Users },
  { name: "Create Test", href: "/professor/create-test", icon: PlusCircle },
  { name: "Grade Submissions", href: "/professor/grading", icon: CheckSquare },
  { name: "Content Upload", href: "/professor/content", icon: Upload },
  { name: "Analytics", href: "/professor/analytics", icon: BarChart3 },
  { name: "AI Assistant", href: "/professor/chat", icon: MessageSquare },
  { name: "Settings", href: "/professor/settings", icon: Settings },
]

interface ProfessorLayoutProps {
  children: React.ReactNode
}

export function ProfessorLayout({ children }: ProfessorLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 p-6 border-b">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold">EduAI</span>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.name}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card px-6">
          <div className="flex items-center gap-2 py-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold">EduAI</span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-card/95 backdrop-blur px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <ThemeToggle />
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-secondary" />
                </div>
                <span className="text-sm font-medium">Dr. Smith</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
