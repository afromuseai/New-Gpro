
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/firebase"
import { Loader2, Zap } from "lucide-react"

export default function Home() {
  const { user, isUserLoading } = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, isUserLoading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="size-16 rounded-2xl bg-accent flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(236,22,106,0.4)]">
          <Zap className="text-white size-10 fill-white" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-bold font-headline">GrowthPulse <span className="text-accent">Pro</span></h1>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            Synchronizing Industrial Fleet...
          </p>
        </div>
      </div>
    </div>
  )
}
