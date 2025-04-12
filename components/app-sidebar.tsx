"use client"

import { Calendar, MessageSquare, Settings, LogOut, Edit, BookOpen, AlertTriangle, CreditCard } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: MessageSquare,
      href: "/",
    },
    {
      title: "Risk Analyzer",
      icon: AlertTriangle,
      href: "/risk-analyzer",
    },
    {
      title: "Compliance Tracker",
      icon: Calendar,
      href: "/compliance",
    },
    {
      title: "Clause Suggestions",
      icon: Edit,
      href: "/clause-suggestions",
    },
    {
      title: "Legal Library",
      icon: BookOpen,
      href: "/legal-library",
    },
    {
      title: "Subscription & Billing",
      icon: CreditCard,
      href: "/subscription",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary p-1">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold">LexSure</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="transition-all hover:bg-primary/10"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 transition-all hover:ring-2 hover:ring-primary">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Startup User</span>
              <span className="text-xs text-muted-foreground">Pro Plan</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="transition-all hover:bg-primary hover:text-primary-foreground">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
