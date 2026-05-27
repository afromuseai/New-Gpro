
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  BarChart3, 
  Calendar, 
  Settings, 
  Users, 
  Zap, 
  CreditCard,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  Globe,
  ShieldCheck,
  Brain,
  ImageIcon,
  ShieldAlert
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { useAuth, useUser } from "@/firebase"
import { initiateSignOut } from "@/firebase/non-blocking-login"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Brain, label: "Audience Intel", href: "/dashboard/audience" },
  { icon: Globe, label: "AI Profile Network", href: "/dashboard/bots" },
  { icon: ShieldAlert, label: "Crisis Management", href: "/dashboard/crisis" },
  { icon: Zap, label: "Growth Campaigns", href: "/dashboard/campaigns" },
  { icon: ImageIcon, label: "Media Generator", href: "/dashboard/media" },
  { icon: MessageSquare, label: "Engagement Hub", href: "/dashboard/engagement" },
  { icon: Calendar, label: "Content Pipeline", href: "/dashboard/calendar" },
  { icon: BarChart3, label: "Growth Analytics", href: "/dashboard/analytics" },
  { icon: ShieldCheck, label: "Network Integrity", href: "/dashboard/integrity" },
  { icon: Users, label: "Connected Accounts", href: "/dashboard/accounts" },
]

const systemItems = [
  { icon: CreditCard, label: "Subscription", href: "/dashboard/billing" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  const { user } = useUser()

  const isAdmin = user?.email === "joshuaa2g5@gmail.com"

  const handleLogout = () => {
    initiateSignOut(auth)
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex items-center gap-2">
        <div className="size-8 rounded-lg bg-accent flex items-center justify-center">
          <Zap className="text-white size-5 fill-white" />
        </div>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="font-headline font-bold text-lg leading-tight">GrowthPulse<span className="text-accent">Pro</span></span>
          {isAdmin && (
            <Badge className="bg-primary/20 text-primary border-none text-[8px] h-3 px-1 py-0 w-fit">ADMIN CONSOLE</Badge>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2 mt-4">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator />
        <SidebarMenu className="px-2">
          {systemItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
