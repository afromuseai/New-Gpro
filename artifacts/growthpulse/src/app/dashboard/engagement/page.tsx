

import * as React from "react"
import { useState } from "react"
import { 
  MessageSquare, 
  Sparkles, 
  Hash, 
  Lightbulb, 
  Send, 
  Loader2, 
  Copy, 
  CheckCircle2,
  TrendingUp,
  Target
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { generateSimulationComment } from "@/ai/flows/generate-simulation-comment"
import { generateContentStrategy, type ContentStrategyOutput } from "@/ai/flows/generate-content-strategy"

export default function EngagementLabPage() {
  const [topic, setTopic] = useState("")
  const [platform, setPlatform] = useState<any>("instagram")
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState<ContentStrategyOutput | null>(null)
  const [comments, setComments] = useState<string[]>([])
  const { toast } = useToast()

  const handleGenerateStrategy = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const result = await generateContentStrategy({ topic, platform })
      setStrategy(result)
      toast({ title: "Strategy Generated", description: "Your viral roadmap is ready." })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate strategy." })
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateComments = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const results = await Promise.all([
        generateSimulationComment({ postContent: topic, postTopic: topic, commentStyle: 'positive' }),
        generateSimulationComment({ postContent: topic, postTopic: topic, commentStyle: 'humorous' }),
        generateSimulationComment({ postContent: topic, postTopic: topic, commentStyle: 'question' }),
      ])
      setComments(results.map(r => r.comment))
      toast({ title: "Comments Simulated", description: "View how personas might react." })
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to simulate comments." })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({ title: "Copied", description: "Content copied to clipboard." })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">AI Engagement Lab</h1>
        <p className="text-muted-foreground">Optimize your content and simulate community feedback before you post.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Content Input
            </CardTitle>
            <CardDescription>Describe your post or topic to get started.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Target Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger id="platform">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="twitter">Twitter / X</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="topic">Topic or Post Draft</Label>
              <Textarea 
                id="topic" 
                placeholder="e.g., A review of the new AI features in GrowthPulse Pro..."
                className="min-h-[150px] bg-background/50"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleGenerateStrategy}
              disabled={loading || !topic}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
              Generate Strategy
            </Button>
            <Button 
              variant="outline"
              className="w-full border-accent/50 text-accent hover:bg-accent/10"
              onClick={handleSimulateComments}
              disabled={loading || !topic}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <MessageSquare className="h-4 w-4 mr-2" />}
              Simulate Reactions
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2">
          <Tabs defaultValue="strategy" className="space-y-4">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="strategy">Strategy & Hashtags</TabsTrigger>
              <TabsTrigger value="comments">Persona Reactions</TabsTrigger>
            </TabsList>

            <TabsContent value="strategy" className="space-y-4">
              {!strategy && !loading ? (
                <Card className="border-dashed border-2 p-12 text-center bg-transparent">
                  <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">Generate a strategy to see post ideas and optimization tips.</p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Hash className="h-5 w-5 text-accent" />
                        Recommended Hashtags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {strategy?.hashtags.map((tag, i) => (
                        <Badge 
                          key={i} 
                          variant="secondary" 
                          className="cursor-pointer hover:bg-secondary transition-colors"
                          onClick={() => copyToClipboard(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    {strategy?.postIdeas.map((idea, i) => (
                      <Card key={i} className="border-border/50 bg-card/50">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md">{idea.title}</CardTitle>
                          <Badge className="w-fit bg-emerald-500/10 text-emerald-500 border-none">Hook Idea</Badge>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <p className="text-sm font-medium italic">"{idea.hook}"</p>
                          <p className="text-xs text-muted-foreground">{idea.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="ghost" size="sm" className="w-full text-xs" onClick={() => copyToClipboard(idea.description)}>
                            <Copy className="h-3 w-3 mr-2" /> Copy Idea
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>

                  <Card className="border-border/50 bg-primary/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        Optimization Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {strategy?.optimizationTips.map((tip, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              {comments.length === 0 && !loading ? (
                <Card className="border-dashed border-2 p-12 text-center bg-transparent">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground">Simulate reactions to see how personas might engage with your post.</p>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {comments.map((comment, i) => (
                    <Card key={i} className="border-border/30 bg-card/20 hover:bg-card/40 transition-colors">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="size-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                            {['A', 'B', 'C'][i]}
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm leading-relaxed">"{comment}"</p>
                            <Badge variant="outline" className="text-[10px] uppercase font-mono py-0">
                              {['Supportive', 'Humorous', 'Analytical'][i]} Persona
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
