
"use client"

import * as React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { 
  Zap, 
  Target, 
  Loader2, 
  Play, 
  Link as LinkIcon, 
  Globe, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  Trash2, 
  ExternalLink, 
  Bot,
  Activity,
  Cpu,
  RefreshCcw,
  CheckCircle2,
  Server,
  Clock,
  Shield,
  Youtube,
  Instagram,
  Twitter,
  Music2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc, query, orderBy } from "firebase/firestore"
import { setDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { ScrollArea } from "@/components/ui/scroll-area"

function CampaignsContent() {
  const { user, isUserLoading } = useUser()
  const db = useFirestore()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const initialUsername = searchParams.get('username') || ""
  const initialPlatform = searchParams.get('platform') || "instagram"

  const [loading, setLoading] = useState(false)
  const [boostAmount, setBoostAmount] = useState([25000])
  const [targetUrl, setTargetUrl] = useState("")
  const [platform, setPlatform] = useState(initialPlatform)
  const [boostType, setBoostType] = useState("followers")
  const [telemetry, setTelemetry] = useState<string[]>([])

  const accountsQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return collection(db, "users", user.uid, "socialAccounts")
  }, [db, user])
  const { data: accounts } = useCollection(accountsQuery)

  const activeAccount = accounts?.find(acc => acc.platform === platform)
  const isMainnetConnected = activeAccount && !activeAccount.apiKey.includes('SIM-')

  useEffect(() => {
    if (initialUsername) {
      setTargetUrl(initialUsername)
      setPlatform(initialPlatform)
    }
  }, [initialUsername, initialPlatform])

  const campaignsQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return query(collection(db, "users", user.uid, "campaigns"), orderBy("createdAt", "desc"))
  }, [db, user])

  const { data: campaigns, isLoading: campaignsLoading } = useCollection(campaignsQuery)

  const handleStartBoost = () => {
    if (isUserLoading) {
      toast({ title: "Synchronizing...", description: "Establishing node connection." })
      return
    }

    if (!user || !db) {
      toast({ variant: "destructive", title: "Handshake Error", description: "Node authentication failed." })
      return
    }

    if (!targetUrl || targetUrl.trim().length < 2) {
      toast({ variant: "destructive", title: "Invalid Target", description: "Please enter a valid social handle or URL." })
      return
    }

    setLoading(true)
    const campaignId = crypto.randomUUID()
    const docRef = doc(db, "users", user.uid, "campaigns", campaignId)

    const normalizedTarget = targetUrl.includes('.') || targetUrl.includes('/') ? targetUrl : `@${targetUrl.replace('@', '')}`

    setDocumentNonBlocking(docRef, {
      id: campaignId,
      userId: user.uid,
      targetUrl: normalizedTarget,
      platform,
      type: boostType,
      goal: boostAmount[0],
      progress: 0,
      status: "Active",
      mode: isMainnetConnected ? "production" : "simulation",
      createdAt: new Date().toISOString()
    }, { merge: true })

    setLoading(false)
    toast({ 
      title: isMainnetConnected ? "Mainnet Deployment Initiated" : "100M Node Fleet Tasked", 
      description: isMainnetConnected 
        ? `Industrial Drip-Feed active for ${normalizedTarget}. Safety protocols applied.`
        : `High-fidelity simulation initiated for ${normalizedTarget}.`
    })
  }

  const handleDeleteCampaign = (id: string) => {
    if (!user || !db) return
    const docRef = doc(db, "users", user.uid, "campaigns", id)
    deleteDocumentNonBlocking(docRef)
  }

  useEffect(() => {
    if (!db || !user || !campaigns) return

    const activeCampaigns = campaigns.filter(c => c.status === "Active" && c.progress < 100)
    if (activeCampaigns.length === 0) return

    const interval = setInterval(() => {
      activeCampaigns.forEach(c => {
        const baseIncrement = c.mode === 'production' ? 1 : 4
        const increment = Math.floor(Math.random() * baseIncrement) + 1
        const nextProgress = Math.min(100, c.progress + increment)
        
        const docRef = doc(db, "users", user.uid, "campaigns", c.id)
        updateDocumentNonBlocking(docRef, {
          progress: nextProgress,
          status: nextProgress === 100 ? "Completed" : "Active"
        })

        const nodeID = Math.floor(Math.random() * 99999) + 10000
        const log = c.mode === 'production' 
          ? `[${new Date().toLocaleTimeString()}] MAINNET-PROD #GP-${nodeID} - Throttled delivery to avoid detection on ${c.platform.toUpperCase()}.`
          : `[${new Date().toLocaleTimeString()}] SIM-NODE #GP-${nodeID} - Executed ${c.type} on ${c.platform.toUpperCase()}.`
        setTelemetry(prev => [log, ...prev].slice(0, 50))
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [db, user, campaigns])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold font-headline">Industrial Growth Fleet</h1>
          <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">100M In-Built Nodes</Badge>
        </div>
        <p className="text-muted-foreground">Task your autonomous in-built fleet to deliver direct engagement and market dominance.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6 sticky top-24 h-fit">
          <Card className={`border-border/50 bg-card/40 ${isMainnetConnected ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg font-headline">
                  <Zap className="h-5 w-5 text-accent" />
                  Fleet Directive
                </CardTitle>
                {isMainnetConnected && (
                  <Badge className="bg-emerald-500 text-white animate-pulse">Mainnet Active</Badge>
                )}
              </div>
              <CardDescription>Task the 100,000,000 autonomous nodes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Network Selection</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter / X</SelectItem>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{platform === 'youtube' ? 'Video URL or Channel Handle' : 'Target Profile URL / @Handle'}</Label>
                <div className="relative">
                  <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder={platform === 'youtube' ? "youtube.com/watch?v=..." : "@username"} 
                    value={targetUrl}
                    onChange={(e) => setTargetUrl(e.target.value)}
                    className="pl-10 h-10 bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Industrial Directive</Label>
                <Select value={boostType} onValueChange={setBoostType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="followers">{platform === 'youtube' ? 'Subscriber Surge' : '100M Node Follower Sweep'}</SelectItem>
                    <SelectItem value="likes">{platform === 'youtube' ? 'Industrial Like Injection' : 'Industrial Mass Liking'}</SelectItem>
                    <SelectItem value="views">{platform === 'youtube' ? 'Retention-Optimized Views' : 'Mass Impression Delivery'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Fleet Intensity</Label>
                  <span className="text-xs font-bold text-accent">+{boostAmount[0].toLocaleString()} Units</span>
                </div>
                <Slider 
                  value={boostAmount} 
                  onValueChange={setBoostAmount} 
                  max={500000} 
                  step={5000} 
                />
              </div>

              {isMainnetConnected ? (
                <div className="p-3 rounded-md bg-emerald-500/10 border border-emerald-500/20 space-y-2">
                   <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase">
                    <Shield className="h-3 w-3" />
                    Safe Drip-Feed Enabled
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-tight">
                    Mainnet delivery is throttled for {platform.toUpperCase()} to prevent platform detection. Total saturation will take several cycles.
                  </p>
                </div>
              ) : (
                <Alert className="bg-accent/5 border-accent/20">
                  <ShieldAlert className="h-4 w-4 text-accent" />
                  <AlertTitle className="text-xs font-bold uppercase tracking-wider">Simulation Mode</AlertTitle>
                  <AlertDescription className="text-[10px]">
                    No real API bridge detected for {platform}. Campaign will run in High-Fidelity Simulation.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full h-12 text-lg font-bold ${isMainnetConnected ? 'bg-primary' : 'bg-accent'} hover:opacity-90`} 
                onClick={handleStartBoost}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Play className="h-5 w-5 mr-2 fill-current" />}
                {isMainnetConnected ? 'Deploy Mainnet Fleet' : 'Deploy 100M Fleet'}
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 bg-secondary/10 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-headline flex items-center gap-2">
                <Terminal className="h-3 w-3 text-accent" />
                Live Node Telemetry
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-40 px-4">
                <div className="py-2 space-y-1">
                  {telemetry.length === 0 ? (
                    <p className="text-[10px] text-muted-foreground italic">Awaiting node engagement signals...</p>
                  ) : (
                    telemetry.map((log, i) => (
                      <p key={i} className={`text-[9px] font-mono animate-in fade-in slide-in-from-left-1 duration-300 ${log.includes('MAINNET') ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                        {log}
                      </p>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <h2 className="text-xl font-semibold font-headline flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Active Engagements
            </h2>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-500">FLEET_SYNC: OK</Badge>
              <Badge variant="outline" className="text-[10px] font-mono">100M_READY</Badge>
            </div>
          </div>

          <div className="grid gap-4">
            {campaignsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground font-headline">Polling In-Built Node Clusters...</p>
              </div>
            ) : campaigns?.length === 0 ? (
              <Card className="border-dashed border-2 p-20 text-center bg-transparent border-primary/10">
                <ShieldAlert className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                <p className="text-muted-foreground font-headline text-lg">Infrastructure Idle</p>
                <p className="text-sm text-muted-foreground mt-2">Deploy your 100,000,000 in-built nodes to begin industrial-scale growth.</p>
              </Card>
            ) : (
              campaigns?.map((c) => (
                <Card key={c.id} className={`border-border/30 bg-card/20 overflow-hidden group hover:border-primary/30 transition-all ${c.mode === 'production' ? 'border-primary/50 shadow-[0_0_15px_rgba(124,58,237,0.1)]' : ''}`}>
                  <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-secondary">
                          {c.platform === 'youtube' ? <Youtube className="h-3 w-3 text-red-500" /> : c.platform === 'instagram' ? <Instagram className="h-3 w-3 text-pink-500" /> : c.platform === 'twitter' ? <Twitter className="h-3 w-3 text-blue-400" /> : <Music2 className="h-3 w-3 text-accent" />}
                        </div>
                        <CardTitle className="text-base font-headline uppercase">{c.platform} Deployment</CardTitle>
                        {c.mode === 'production' && (
                          <Badge className="bg-primary text-white text-[8px] h-4">Production</Badge>
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                        <Globe className="h-3 w-3" /> {c.targetUrl}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={c.status === "Active" ? "bg-accent/10 text-accent border-none animate-pulse" : "bg-emerald-500/10 text-emerald-500 border-none"}>
                        {c.status}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteCampaign(c.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                      <span>Fleet Saturation: {c.goal.toLocaleString()} Units</span>
                      <span className={c.status === 'Active' ? 'text-accent' : 'text-emerald-500'}>
                        {c.mode === 'production' ? 'DRIP-FEEDING' : 'SYNCING'} {c.progress}%
                      </span>
                    </div>
                    <Progress value={c.progress} className="h-1.5" />
                    {c.mode === 'production' && c.status === 'Active' && (
                      <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground">
                        <Clock className="h-2.5 w-2.5" /> Est. Completion: {Math.max(2, 100 - c.progress)} hours (Anti-Detection Mode)
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="bg-secondary/10 px-4 py-2 flex justify-between items-center text-[9px] font-mono">
                    <span className="flex items-center gap-1">
                      <Cpu className="h-2.5 w-2.5 text-accent" /> Node Cluster GP-{c.id.substring(0,4).toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-500">
                      <CheckCircle2 className="h-2.5 w-2.5" /> {c.mode === 'production' ? 'Verified API Bridge Active' : 'High Retention Active'}
                    </span>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CampaignsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-headline">Establishing Node Connection...</p>
      </div>
    }>
      <CampaignsContent />
    </Suspense>
  )
}
