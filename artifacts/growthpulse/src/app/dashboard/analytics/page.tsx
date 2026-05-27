


import * as React from "react"
import { 
  TrendingUp, 
  Users, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Share2,
  Globe,
  Map as MapIcon,
  ShieldCheck,
  Brain
} from "lucide-react"
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const detailData = [
  { name: "Week 1", organic: 4500000, boosted: 24000000 },
  { name: "Week 2", organic: 3000000, boosted: 13980000 },
  { name: "Week 3", organic: 2000000, boosted: 98000000 },
  { name: "Week 4", organic: 2780000, boosted: 39080000 },
  { name: "Week 5", organic: 1890000, boosted: 48000000 },
  { name: "Week 6", organic: 2390000, boosted: 38000000 },
  { name: "Week 7", organic: 3490000, boosted: 43000000 },
]

const sentimentData = [
  { name: "Positive", value: 65, color: "hsl(var(--primary))" },
  { name: "Neutral", value: 25, color: "hsl(var(--secondary))" },
  { name: "Controversial", value: 10, color: "hsl(var(--accent))" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Sovereign Intelligence</h1>
        <p className="text-muted-foreground">Deep global sentiment mapping and industrial node attribution.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Global Reach", value: "12.4B", change: "+12.3%", icon: Globe, color: "text-blue-500" },
          { label: "Fleet Activity", value: "100M", change: "100%", icon: Users, color: "text-emerald-500" },
          { label: "Fleet Sentiment", value: "Positive", change: "+4.2%", icon: Brain, color: "text-accent" },
          { label: "Share Velocity", value: "8.4M/h", change: "+12.1%", icon: Share2, color: "text-purple-500" },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-[10px] flex items-center gap-1 ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change} vs prev. cycle
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="font-headline">Network Attribution</CardTitle>
                <CardDescription>Organic discovery vs 100M Fleet-boosted impressions.</CardDescription>
              </div>
              <Tabs defaultValue="month">
                <TabsList className="bg-secondary/50">
                  <TabsTrigger value="week">W</TabsTrigger>
                  <TabsTrigger value="month">M</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={detailData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000000}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px' }}
                  formatter={(v: any) => v.toLocaleString()}
                />
                <Bar dataKey="organic" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Organic Discovery" />
                <Bar dataKey="boosted" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Fleet Boosted" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-headline">Global Sentiment Saturation</CardTitle>
            <CardDescription>Industrial-scale perception across all monitored nodes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-4 ml-4">
              {sentimentData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 bg-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapIcon className="h-5 w-5 text-primary" />
            Industrial Reach Heatmap
          </CardTitle>
          <CardDescription>Live telemetry from the 100,000,000 node network across sovereign regions.</CardDescription>
        </CardHeader>
        <CardContent className="h-40 flex items-center justify-center">
          <div className="grid grid-cols-12 gap-1 w-full h-full opacity-30">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className={`h-full rounded-sm ${Math.random() > 0.5 ? 'bg-primary' : 'bg-accent'}`} />
            ))}
          </div>
          <div className="absolute flex flex-col items-center text-center space-y-2">
            <Globe className="h-10 w-10 text-primary animate-pulse" />
            <p className="font-bold text-lg">Sovereign Data Aggregation Active</p>
            <p className="text-xs text-muted-foreground">Monitoring 100M threads in 184 languages.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
