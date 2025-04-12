"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  FileText,
  Send,
  Upload,
  BookOpen,
  AlertCircle,
  User,
  Info,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  attachedDocument?: string
}

export default function Dashboard() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Lex, your legal assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInput = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Animate progress bars on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressValue(87)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message

      if (input.toLowerCase().includes("gst") || input.toLowerCase().includes("filing")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Your next GST filing (GSTR-3B) is due on May 20, 2025. This is a monthly return that summarizes your sales, purchases, and GST liability. Would you like me to explain the filing process or remind you closer to the deadline?",
          sender: "bot",
          timestamp: new Date(),
        }
      } else if (input.toLowerCase().includes("auto renewal") || input.toLowerCase().includes("clause")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "Auto-renewal clauses in contracts can be risky if they have long notice periods. Under Indian contract law, such clauses may be considered unfair if they create significant imbalance between parties. I recommend negotiating for shorter renewal periods (monthly/quarterly) or shorter notice periods (30 days). Would you like me to analyze a specific contract clause?",
          sender: "bot",
          timestamp: new Date(),
          attachedDocument: "Vendor Agreement",
        }
      } else if (input.toLowerCase().includes("mca") || input.toLowerCase().includes("form")) {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "MCA Form 20A is the annual return form that companies must file with the Ministry of Corporate Affairs. It includes details about your company's shareholders, directors, and financial position. The filing deadline is within 60 days of your Annual General Meeting. Your next filing is due on June 5, 2025.",
          sender: "bot",
          timestamp: new Date(),
        }
      } else {
        botResponse = {
          id: (Date.now() + 1).toString(),
          content:
            "I understand you're asking about legal matters. Could you provide more details about your question? I can help with contract analysis, compliance deadlines, or explaining legal terms.",
          sender: "bot",
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      // Check if file is PDF or Word document
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded and is being analyzed.`,
        })

        // Simulate a message about the uploaded document
        const userMessage: Message = {
          id: Date.now().toString(),
          content: `I've uploaded ${file.name} for analysis.`,
          sender: "user",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, userMessage])
        setIsTyping(true)

        // Simulate bot response about the document
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() + 1).toString(),
            content: `I'm analyzing ${file.name}. This document appears to be a ${file.type.includes("pdf") ? "PDF" : "Word"} file. I'll check for potential legal risks and compliance issues. This may take a few moments.`,
            sender: "bot",
            timestamp: new Date(),
            attachedDocument: file.name,
          }

          setMessages((prev) => [...prev, botResponse])
          setIsTyping(false)
        }, 1500)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload only PDF or Word documents.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      {/* Login/Sign-up Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button variant="outline" className="transition-all hover:bg-primary hover:text-primary-foreground" asChild>
          <Link href="/login">
            <User className="h-4 w-4 mr-2" /> Login / Sign Up
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Analyzed</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requires your attention</p>
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={progressValue} className="h-2 transition-all duration-1000 ease-in-out" />
          </CardContent>
        </Card>
        <Card className="transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Next: GST Filing in 3 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-16rem)]">
        {/* Chat Area */}
        <Card className="flex-1 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle>Ask Lex</CardTitle>
            <CardDescription>Your AI-powered legal assistant for quick answers and guidance</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      {message.sender === "user" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" />
                          <AvatarFallback>LEX</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        {message.attachedDocument && (
                          <div className="mt-2 flex items-center gap-2 p-2 rounded bg-background/50">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{message.attachedDocument}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>LEX</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-75"></div>
                          <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <div className="border-t p-3">
            <div className="flex flex-wrap gap-2 mb-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFileUpload}
                className="transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Upload className="h-3 w-3 mr-1" /> Upload Document
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Explain arbitration clauses in simple terms")}
                className="transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <AlertCircle className="h-3 w-3 mr-1" /> Simple Terms
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInput("Show me legal references for force majeure")}
                className="transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <BookOpen className="h-3 w-3 mr-1" /> References
              </Button>
            </div>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Ask a legal question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 transition-all focus-visible:ring-primary"
              />
              <Button
                onClick={handleSend}
                disabled={input.trim() === ""}
                className="transition-all hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </div>
        </Card>

        {/* Risk Summary Panel */}
        <Card className="w-full lg:w-72 flex-shrink-0 h-full overflow-hidden">
          <CardHeader className="bg-muted/50 pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              Risk Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-auto h-[calc(100%-52px)]">
            <div className="p-3 border-b">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm">Overall Risk Level</h3>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  Medium
                </Badge>
              </div>
              <Progress value={65} className="h-2 bg-muted transition-all duration-1000 ease-in-out" />
            </div>

            <div className="p-3 space-y-3">
              <h3 className="font-medium text-sm">Top Risks</h3>

              <div className="space-y-2">
                {[
                  {
                    title: "Auto-renewal clause",
                    document: "Vendor Agreement",
                    severity: "high",
                    description: "90-day notice period creates potential trap",
                  },
                  {
                    title: "Non-refundable deposit",
                    document: "Office Lease",
                    severity: "high",
                    description: "Potentially unenforceable under Indian law",
                  },
                  {
                    title: "Arbitration outside India",
                    document: "Client Contract",
                    severity: "medium",
                    description: "Foreign jurisdiction may increase costs",
                  },
                ].map((risk, index) => (
                  <div
                    key={index}
                    className="rounded-md border p-2 transition-all hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            risk.severity === "high"
                              ? "bg-red-500"
                              : risk.severity === "medium"
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                        />
                        <span className="font-medium text-sm">{risk.title}</span>
                      </div>
                      <Badge
                        variant={
                          risk.severity === "high" ? "destructive" : risk.severity === "medium" ? "default" : "outline"
                        }
                        className="text-xs"
                      >
                        {risk.severity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">In: {risk.document}</p>
                    <p className="text-xs">{risk.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full transition-all hover:bg-primary hover:text-primary-foreground"
                  asChild
                >
                  <Link href="/risk-analyzer">
                    <Info className="h-3 w-3 mr-1" /> View Full Risk Analysis
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
