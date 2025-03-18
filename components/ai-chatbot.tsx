"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar } from "./ui/avatar"
import { Card } from "./ui/card"
import { Bot, Send, User } from "lucide-react"
import { generateText } from "ai" // Import from AI SDK [^1]
import { openai } from "@ai-sdk/openai" // Import from AI SDK OpenAI integration [^1]

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AiChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Solana program assistant. How can I help you understand the smart program flow?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // This is a mock implementation - in a real app, you would use the AI SDK with your API key
      const systemPrompt = `You are a helpful assistant specializing in Solana blockchain and smart programs. 
      Provide concise, accurate information about Solana program flow, architecture, and development.
      Focus on explaining concepts in simple terms and helping users understand the flow diagram they're viewing.`

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: input,
      })

      setMessages((prev) => [...prev, { role: "assistant", content: text }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex items-start gap-3 max-w-[80%]">
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </Avatar>
                )}
                <Card className={`p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </Card>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </Avatar>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Ask about Solana programs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

