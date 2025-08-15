"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

interface ResponsiveNavProps {
  children: React.ReactNode
}

export function ResponsiveNav({ children }: ResponsiveNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">{children}</nav>

      {/* Mobile Navigation */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="sm">
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <div className="flex flex-col gap-4 mt-8">
            <a
              href="#features"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Features
            </a>
            <a
              href="#roles"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              For You
            </a>
            <a
              href="#about"
              className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <div className="border-t pt-4 mt-4">
              <Button variant="ghost" className="w-full justify-start text-lg py-3" asChild>
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button className="w-full justify-start text-lg py-3 mt-2" asChild>
                <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
