"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, Sparkles } from "lucide-react"
import { useChat } from "./chat-provider"

interface ChatTriggerProps {
  variant?: "default" | "floating"
  className?: string
}

export function ChatTrigger({ variant = "default", className = "" }: ChatTriggerProps) {
  const { openChat, isOpen } = useChat()

  if (variant === "floating") {
    return (
      <Button
        onClick={openChat}
        className={`fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all ${
          isOpen ? "hidden" : ""
        } ${className}`}
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Button onClick={openChat} className={className} variant="outline">
      <Sparkles className="w-4 h-4 mr-2" />
      AI Assistant
    </Button>
  )
}
