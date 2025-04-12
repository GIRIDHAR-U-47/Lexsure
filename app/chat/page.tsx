"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  attachedDocument?: string
}

export default function ChatPage() {
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
      setProgressValue(65);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
      fileInputRef.current.click();
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Check if file is PDF or Word document
      if (file.type === "application/pdf" || 
          file.type === "application/msword" || 
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        
        toast({
          title: "Document uploaded",
          description: `${file.name} has been uploaded and is being analyzed.`,
        });
        
        // Simulate a message about the uploaded document
        const userMessage: Message = {
          id: Date.now().toString(),
          content: `I've uploaded ${file.name} for analysis.`,
          sender: "user",
          timestamp: new Date(),
        }
        
        setMessages((prev) => [...prev, userMessage]);
        setIsTyping(true);
        
        // Simulate bot response about the document
        setTimeout(() => {
          const botResponse: Message = {
            id: (Date.now() +
