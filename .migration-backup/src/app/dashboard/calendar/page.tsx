
"use client"

import * as React from "react"
import { Calendar as CalendarIcon, Plus, Instagram, Twitter, Youtube, MoreHorizontal, Video, ImageIcon, Sparkles, Clock, Globe, Zap } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const scheduledPosts = [
  { id: 1, date: "2024-05-20", platform: "Instagram", title: "Global Niche Dominance", type: "Video", status: "Calibrated", reach: "12.4M", region: "Global" },
  { id: 2, date: "2024-05-21", platform: "Twitter", title: "Sovereign Trend Momentum", type: "Image", status: "Queueing", reach: "8.2M", region: "NA / EU" },
  { id: 3, date: "2024-05-23", platform: "YouTube", title: "Industrial Brand Narrative", type: "Video", status: "Calibrated", reach: "45.1M", region: "APAC" },
]

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [timeZone, setTimeZone] = React.useState("UTC")

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-headline text-primary">Industrial Content Pipeline</h1>
          <p className="text-muted-foreground">Orchestrate time-zone dominant asset delivery across 100M profiles.</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" />
          Queue Industrial Campaign
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-border/50 bg-card/30">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">Fleet Delivery Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md"
              />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-primary/5">
            <CardHeader className="p-4">
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                Time-Zone Optimizer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-4 pb-4">
              <div className="space-y-2">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Target Zone</span>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger className="h-8 text-xs bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (Universal)</SelectItem>
                    <SelectItem value="EST">EST (New York)</SelectItem>
                    <SelectItem value="GMT">GMT (London)</SelectItem>
                    <SelectItem value="JST">JST (Tokyo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-2 rounded bg-secondary/30 text-[10px] border border-border/50">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-3 w-3 text-accent" />
                  Dominance Peak Detected
                </div>
                Optimal delivery window calculated for 100M node saturation.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3 border-border/50 bg-card/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-lg">Upcoming Sovereign Deployments</CardTitle>
                <CardDescription>Industrial-scale scheduling across the 100M managed fleet.</CardDescription>
              </div>
              <Badge variant="outline" className="font-mono text-xs border-primary/50 text-primary">
                3 BATCHES QUEUED
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.map((post) => (
              <div key={post.id} className="group relative flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card/50 hover:border-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-secondary/50 ${post.platform === 'Instagram' ? 'text-pink-500' : post.platform === 'Twitter' ? 'text-blue-400' : 'text-red-500'}`}>
                    {post.platform === 'Instagram' ? <Instagram className="h-6 w-6" /> : post.platform === 'Twitter' ? <Twitter className="h-6 w-6" /> : <Youtube className="h-6 w-6" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg">{post.title}</p>
                      <Badge className="bg-secondary text-[8px] h-4 py-0">{post.region}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-mono uppercase"><Clock className="h-3 w-3" /> {post.date} @ 14:00 {timeZone}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Video className="h-3 w-3" /> {post.type}</span>
                      <span>•</span>
                      <span className="text-emerald-500 font-bold">Saturation Goal: {post.reach}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-mono uppercase text-[10px]">
                    {post.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full border-dashed py-8 h-auto flex flex-col gap-2 hover:bg-secondary/30 transition-colors border-primary/30">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span className="text-muted-foreground font-headline">Initialize Sovereign Deployment for {date?.toLocaleDateString()}</span>
              <p className="text-[10px] text-muted-foreground italic">Calibrating 100M node drip-feed...</p>
            </Button>
          </CardContent>
          <CardFooter className="bg-secondary/20 border-t border-border/30 px-6 py-4">
            <p className="text-[10px] text-muted-foreground flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-accent" />
              Sovereign Time-Zone Optimizer: Calibrating global reach peaks across 18 regional clusters.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
