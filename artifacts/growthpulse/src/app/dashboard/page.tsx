


import * as React from "react"
import { 
  TrendingUp, 
  Users, 
  Instagram, 
  Twitter, 
  Youtube,
  ArrowUpRight,
  Zap,
  Bot,
  Globe,
  ShieldCheck,
  Server,
  Activity,
  MapPin,
  Terminal,
  MessageSquare,
  UserPlus,
  Heart
} from "lucide-react"
import { 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"

const growthData = [
  { name: "Mon", followers: 124000000 },
  { name: "Tue", followers: 132000000 },
  { name: "Wed", followers: 145000000 },
  { name: "Thu", followers: 158000000 },
  { name: "Fri", followers: 181000000 },
  { name: "Sat", followers: 204000000 },
  { name: "Sun", followers: 239000000 },
]

const fleetDistribution = [
  { region: "North America", count: 35000000, status: "Active", load: 65, latency: "12ms" },
  { region: "Europe", count: 25000000, status: "Active", load: 42, latency: "18ms" },
  { region: "Asia Pacific", count: 22000000, status: "Optimizing", load: 88, latency: "45ms" },
  { region: "Latin America", count: 18000000, status: "Active", load: 24, latency: "22ms" },
]

const platformStats = [
  { platform: "Instagram", icon: Instagram, reach: "4.8B", growth: "+24%", color: "text-pink-500" },
  { platform: "Twitter/X", icon: Twitter, reach: "2.1B", growth: "+15%", color: "text-blue-400" },
  { platform: "YouTube", icon: Youtube, reach: "5.5B", growth: "+31%", color: "text-red-500" },
]

export default function DashboardPage() {
  const [logs, setLogs] = React.useState<any[]>([])

  // Simulate Live Node Feed
  React.useEffect(() => {
    const actions = [
      { type: 'follow', icon: UserPlus, color: 'text-emerald-500', text: 'Node #8821 followed target @alex_growth' },
      { type: 'like', icon: Heart, color: 'text-rose-500', text: 'Node #1249 liked post ID: 99281' },
      { type: 'comment', icon: MessageSquare, color: 'text-blue-500', text: 'Node #4410 commented on campaign object' },
      { type: 'rotate', icon: ShieldCheck, color: 'text-accent', text: 'Residential IP cluster rotated for Region: EMEA' },
    ]

    const interval = setInterval(() => {
      const action = actions[Math.floor(Math.random() * actions.length)]
      setLogs(prev => [{ ...action, id: Date.now(), time: new Date().toLocaleTimeString() }, ...prev].slice(0, 50))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-primary">Sovereign Command Center</h1>
        <p className="text-muted-foreground">Managing 100,000,000 "In-Built" AI Nodes performing autonomous engagement across global networks.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sovereign Reach</CardTitle>
            <Globe className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.42B</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="h-3 w-3" /> +12.4%
              </span>{" "}
              quarterly impressions
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fleet Integrity</CardTitle>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">
              Global residential bypass active
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active In-Built Fleet</CardTitle>
            <Bot className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100M</div>
            <p className="text-xs text-muted-foreground">
              Autonomous AI Personas
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real-Time Ops</CardTitle>
            <Activity className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4M/hr</div>
            <p className="text-xs text-muted-foreground">
              Direct engagement velocity
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-headline">Global Influence Velocity</CardTitle>
              <CardDescription>Aggregate reach across the 100M node industrial network.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value/1000000}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                    formatter={(v: any) => v.toLocaleString()}
                  />
                  <Area type="monotone" dataKey="followers" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorFollowers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-secondary/10 overflow-hidden">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2 font-headline">
                  <Terminal className="h-5 w-5 text-accent" />
                  Live Node Activity Feed
                </CardTitle>
                <CardDescription>Real-time telemetry from the 100M autonomous fleet.</CardDescription>
              </div>
              <Badge variant="outline" className="animate-pulse border-accent text-accent">LIVE STREAM</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[250px] px-6">
                <div className="space-y-2 py-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center gap-3 text-xs font-mono py-1 border-b border-border/10 last:border-0 group">
                      <span className="text-muted-foreground shrink-0">[{log.time}]</span>
                      <log.icon className={`h-3 w-3 shrink-0 ${log.color}`} />
                      <span className="truncate group-hover:text-primary transition-colors">{log.text}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Server className="h-5 w-5 text-accent" />
                Infrastructure Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fleetDistribution.map((item) => (
                <div key={item.region} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{item.region}</span>
                    <span className="text-muted-foreground text-[10px] font-mono">{item.latency} RTT</span>
                  </div>
                  <Progress value={item.load} className="h-1.5" />
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">{(item.count / 1000000).toFixed(0)}M nodes</span>
                    <span className="text-emerald-500 font-bold">Status: {item.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Platform Penetration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformStats.map((item) => (
                  <div key={item.platform} className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-secondary ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">{item.platform}</p>
                      <p className="text-sm font-bold">{item.reach} Impressions</p>
                    </div>
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none font-mono">
                      {item.growth}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
