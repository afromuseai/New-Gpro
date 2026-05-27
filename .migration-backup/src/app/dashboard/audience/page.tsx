"use client"

import * as React from "react"
import { useState } from "react"
import { 
  Target, 
  TrendingUp, 
  Users, 
  MapPin, 
  Brain, 
  Loader2, 
  CheckCircle2,
  ArrowUpRight,
  BarChart3,
  Search
} from "lucide-react"
import { analyzeAudienceTrends, type AnalyzeAudienceOutput } from "@/ai/flows/analyze-audience-trends"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function AudienceIntelligencePage() {
  const [niche, setNiche] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AnalyzeAudienceOutput | null>(null)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!niche) return
    setLoading(true)
    try {
      const result = await analyzeAudienceTrends({ niche })
      setData(result)
      toast({
        title: "Intelligence Gathered",
        description: `Deep analysis complete for ${niche}.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to gather intelligence. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Deep Audience Intelligence</h1>
        <p className="text-muted-foreground">Map global demographics and trend sentiment to optimize fleet delivery.</p>
      </div>

      <div className="grid gap-6">
        <Card className="border-border/50 bg-card/40">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="niche">Niche or Industry Segment</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="niche" 
                    placeholder="e.g., Luxury Sustainable Fashion, Web3 Gaming, Bio-Hacking..." 
                    className="pl-10 h-12 bg-background/50"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                className="h-12 px-8 bg-primary hover:bg-primary/90 mt-auto" 
                onClick={handleAnalyze}
                disabled={loading || !niche}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Brain className="h-4 w-4 mr-2" />}
                Analyze Audience
              </Button>
            </div>
          </CardContent>
        </Card>

        {data ? (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-5 w-5 text-accent" />
                    Target Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between py-2 border-b border-border/30">
                    <span className="text-sm text-muted-foreground">Primary Age Range</span>
                    <Badge variant="secondary">{data.demographics.ageRange}</Badge>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Top Geographic Clusters</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {data.demographics.topLocations.map((loc, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 rounded-md bg-secondary/30 text-xs">
                          <MapPin className="h-3 w-3 text-accent" />
                          {loc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Interest Saturation</Label>
                    <div className="flex flex-wrap gap-2">
                      {data.demographics.primaryInterests.map((interest, i) => (
                        <Badge key={i} variant="outline" className="border-accent/30 text-accent">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Growth Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground italic">
                    {data.growthStrategy}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/50 h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  Momentum Tracking
                </CardTitle>
                <CardDescription>Real-time trend analysis for this segment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {data.trendingTopics.map((item, i) => (
                  <div key={i} className="space-y-2 p-4 rounded-lg border border-border/30 bg-card/30">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{item.topic}</span>
                      <Badge className={
                        item.momentum === 'Explosive' ? 'bg-rose-500/10 text-rose-500 border-none' : 
                        item.momentum === 'Rising' ? 'bg-emerald-500/10 text-emerald-500 border-none' : 
                        'bg-blue-500/10 text-blue-500 border-none'
                      }>
                        {item.momentum}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-3 w-3" />
                        Sentiment: {item.sentiment}
                      </span>
                      <span className="flex items-center gap-0.5 text-emerald-500">
                        <ArrowUpRight className="h-3 w-3" /> High Conversion
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="bg-secondary/20 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium w-full">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Fleet profiles synchronized to these trends.
                </div>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="border-dashed border-2 p-20 text-center bg-transparent">
            {loading ? (
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                <p className="font-headline font-bold text-lg">Processing Global Signals...</p>
                <p className="text-sm text-muted-foreground">Accessing multi-region audience clusters</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Brain className="h-16 w-16 text-muted-foreground mx-auto opacity-20" />
                <p className="text-muted-foreground">Enter a niche above to generate deep market intelligence.</p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
