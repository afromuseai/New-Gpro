
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Toaster } from "@/components/ui/toaster"
import { useUser } from "@/firebase"
import { Loader2, ShieldCheck, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser()
  const router = useRouter()

  const isAdmin = user?.email === "joshuaa2g5@gmail.com"

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/login")
    }
  }, [user, isUserLoading, router])

  if (isUserLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-headline text-muted-foreground text-lg">Authenticating Fleet Access...</p>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardSidebar />
      <SidebarInset className="bg-background">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border/50">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-sm font-bold flex items-center gap-2 justify-end font-headline">
                {isAdmin ? (
                  <Badge className="bg-primary hover:bg-primary text-[10px] h-5 px-2 py-0 flex items-center gap-1 border-none shadow-sm">
                    <ShieldCheck className="h-3 w-3" /> Admin Commander
                  </Badge>
                ) : user.isAnonymous ? "Sovereign Guest" : "Fleet Commander"}
              </span>
              <span className="text-[10px] text-muted-foreground truncate max-w-[150px] font-mono">
                {user.email || "GUEST_SESSION_ACTIVE"}
              </span>
            </div>
            <Avatar className={`size-10 border-2 ${isAdmin ? 'border-primary shadow-[0_0_10px_rgba(124,58,237,0.3)]' : 'border-border'}`}>
              <AvatarImage src={`https://picsum.photos/seed/${user.uid}/100/100`} />
              <AvatarFallback className={isAdmin ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                {user.email ? user.email.substring(0, 2).toUpperCase() : <User className="size-5" />}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="p-4 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  )
}
