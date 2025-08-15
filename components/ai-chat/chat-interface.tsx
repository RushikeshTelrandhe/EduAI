"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, X, Minimize2, Maximize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "text" | "suggestion" | "quiz" | "explanation"
}

interface ChatInterfaceProps {
  userRole?: "student" | "professor" | "institution"
  isMinimized?: boolean
  onToggleMinimize?: () => void
  onClose?: () => void
}

export function ChatInterface({
  userRole = "student",
  isMinimized = false,
  onToggleMinimize,
  onClose,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm your AI learning assistant. I'm here to help you with ${
        userRole === "student"
          ? "studying, understanding concepts, and answering questions"
          : userRole === "professor"
            ? "creating content, analyzing student performance, and educational insights"
            : "platform analytics, institutional insights, and administrative tasks"
      }. How can I assist you today?`,
      role: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const quickSuggestions = {
    student: ["Explain this concept", "Create a quiz", "Study tips", "Summarize notes"],
    professor: ["Generate quiz questions", "Analyze student data", "Create lesson plan", "Grade assistance"],
    institution: ["Platform insights", "Usage analytics", "Performance trends", "Integration help"],
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: "user",
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: generateAIResponse(content, userRole),
          role: "assistant",
          timestamp: new Date(),
          type: "text",
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsLoading(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const generateAIResponse = (input: string, role: string): string => {
    const responses = {
      student: [
        "I'd be happy to help you understand this concept! Let me break it down into simpler terms...",
        "Great question! Here's a step-by-step explanation that should clarify things...",
        "I can see why this might be confusing. Let me provide some examples to illustrate...",
        "That's an excellent topic to explore! Here are the key points you should focus on...",
      ],
      professor: [
        "Based on current educational best practices, I recommend the following approach...",
        "Here's an analysis of the student performance data with actionable insights...",
        "I can help you create engaging content for this topic. Consider these strategies...",
        "For effective assessment, you might want to include these question types...",
      ],
      institution: [
        "The platform analytics show interesting trends in user engagement...",
        "Based on institutional data, here are some recommendations for improvement...",
        "The usage patterns indicate opportunities for optimization in these areas...",
        "Here's a comprehensive overview of the platform performance metrics...",
      ],
    }

    const roleResponses = responses[role as keyof typeof responses] || responses.student
    return roleResponses[Math.floor(Math.random() * roleResponses.length)]
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-72 sm:w-80 shadow-lg border-primary/20 z-40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-sm">AI Assistant</CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground">Click to expand and start chatting</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] sm:h-[600px] shadow-xl border-primary/20 flex flex-col z-40">
      <CardHeader className="pb-2 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm">AI Learning Assistant</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Mode
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={onToggleMinimize}>
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="w-4 h-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-secondary/10">
                      <User className="w-4 h-4 text-secondary" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10">
                    <Bot className="w-4 h-4 text-primary" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Suggestions */}
        <div className="p-3 border-t bg-muted/30">
          <div className="flex flex-wrap gap-2 mb-3">
            {quickSuggestions[userRole].map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs h-7 bg-transparent"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button onClick={() => handleSendMessage(input)} disabled={isLoading || !input.trim()} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
