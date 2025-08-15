"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ChatInterface } from "./chat-interface"

interface ChatContextType {
  isOpen: boolean
  isMinimized: boolean
  userRole: "student" | "professor" | "institution"
  openChat: () => void
  closeChat: () => void
  toggleMinimize: () => void
  setUserRole: (role: "student" | "professor" | "institution") => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [userRole, setUserRole] = useState<"student" | "professor" | "institution">("student")

  const openChat = () => {
    setIsOpen(true)
    setIsMinimized(false)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        userRole,
        openChat,
        closeChat,
        toggleMinimize,
        setUserRole,
      }}
    >
      {children}
      {isOpen && (
        <ChatInterface
          userRole={userRole}
          isMinimized={isMinimized}
          onToggleMinimize={toggleMinimize}
          onClose={closeChat}
        />
      )}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
