


import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "@/lib/next-shims/navigation"
import { Zap, ShieldCheck, Mail, Lock, Loader2, UserPlus, LogIn, Sparkles, Globe } from "lucide-react"
import { useAuth, useUser } from "@/firebase"
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn } from "@/firebase/non-blocking-login"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function AuthPage() {
  const { user, isUserLoading } = useUser()
  const auth = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Redirect if already authenticated
  useEffect(() => {
    if (!isUserLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isUserLoading, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    initiateEmailSignIn(auth, email, password)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    initiateEmailSignUp(auth, email, password)
  }

  const handleDemoAccess = () => {
    setLoading(true)
    initiateAnonymousSignIn(auth)
  }

  if (isUserLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="font-headline text-muted-foreground">Synchronizing Sovereign Session...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex size-12 rounded-xl bg-accent items-center justify-center mb-4 shadow-[0_0_20px_rgba(236,22,106,0.3)]">
            <Zap className="text-white size-7 fill-white" />
          </div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">GrowthPulse <span className="text-accent">Pro</span></h1>
          <p className="text-muted-foreground">Industrial-Scale Influence. 100M Node Fleet Control.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
            <TabsTrigger value="login" className="gap-2">
              <LogIn className="h-4 w-4" /> Login
            </TabsTrigger>
            <TabsTrigger value="register" className="gap-2">
              <UserPlus className="h-4 w-4" /> Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="border-border/50 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-headline">Commander Login</CardTitle>
                <CardDescription>Enter your credentials to access the 100M node fleet.</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="commander@growthpulse.pro" className="pl-10 bg-background/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" placeholder="••••••••" className="pl-10 bg-background/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
                    Authorize Session
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="border-border/50 bg-card/60 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="font-headline">Initialize Fleet Commission</CardTitle>
                <CardDescription>Join the elite tier of global growth commanders.</CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reg-email">Corporate Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="reg-email" type="email" placeholder="commander@growthpulse.pro" className="pl-10 bg-background/50" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">Secure Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="reg-password" type="password" placeholder="••••••••" className="pl-10 bg-background/50" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 font-bold" disabled={loading}>
                    {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    Commission Fleet
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or Sandbox Access</span>
          </div>
        </div>

        <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/5 h-12" onClick={handleDemoAccess} disabled={loading}>
          <Globe className="mr-2 h-4 w-4 text-primary" />
          Enter Sovereign Simulation (No Account)
        </Button>

        <p className="text-center text-[10px] text-muted-foreground">
          By authorizing, you agree to the Industrial Terms of Engagement and Sovereign Privacy Protocol.
        </p>
      </div>
    </div>
  )
}
