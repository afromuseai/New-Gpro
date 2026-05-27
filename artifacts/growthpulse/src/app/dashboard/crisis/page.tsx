


import * as React from "react"
import { useState } from "react"
import { AlertTriangle, ShieldAlert, Loader2, Brain, Send, CheckCircle2, MessageSquare, Target, Zap } from "lucide-react"
import { generateCrisisResponse, type CrisisResponseOutput } from "@/ai/flows/generate-crisis-response"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

export default function CrisisManagementPage() {
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState("twitter")
  const [intensity, setIntensity] = useState<any>("Medium")
  const [loading, setLoading] = useState(false)
  const [strategy, setStrategy] = useState<CrisisResponseOutput | null>(null)
  const { toast } = useToast()

  const handleAnalyze = async () => {
    if (!description) return
    setLoading(true)
    try {
      const result = await generateCrisisResponse({
        crisisDescription: description,
        targetPlatform: platform,
        intensity,
      })
      setStrategy(result)
      toast({
        title: "Defense Strategy Synthesized",
        description: "Industrial narrative shift prepared for 100M node deployment.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Failed to generate crisis response.",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeploy = () => {
    toast({
      title: "100M Fleet Deployed",
      description: "Neutralizing batch of 5,000,000 profiles active in global threads.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline text-rose-500 flex items-center gap-2">
          <ShieldAlert className="h-8 w-8" />
          Global Crisis Center
        </h1>
        <p className="text-muted-foreground">Neutralize negative sentiment and shift global narratives using your 100,000,000 node fleet.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit border-rose-500/20 bg-rose-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-rose-500">
              <AlertTriangle className="h-5 w-5" />
              Sovereign Threat Input
            </CardTitle>
            <CardDescription>Detail the emerging negative sentiment or narrative risk.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Target Platform</Label>
              <Select value={platform} onValueChange={setPlatform}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twitter">Twitter / X</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Threat Intensity</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low (Local)</SelectItem>
                  <SelectItem value="Medium">Medium (Regional)</SelectItem>
                  <SelectItem value="High">High (Global Viral)</SelectItem>
                  <SelectItem value="Critical">Critical (Existential Brand Risk)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Crisis Context</Label>
              <Textarea 
                placeholder="e.g., Massive coordinated campaign against latest update is trending in 4 regions..."
                className="min-h-[150px] bg-background/50 border-rose-500/20"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-rose-600 hover:bg-rose-700 text-white" 
              onClick={handleAnalyze}
              disabled={loading || !description}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Brain className="h-4 w-4 mr-2" />}
              Synthesize Global Defense
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          {!strategy && !loading ? (
            <Card className="border-dashed border-2 p-20 text-center bg-transparent border-rose-500/10">
              <ShieldAlert className="h-16 w-16 text-rose-500/20 mx-auto mb-4" />
              <p className="text-muted-foreground">Monitor and mitigate global threats here.</p>
            </Card>
          ) : strategy ? (
            <div className="space-y-6">
              <Card className="border-emerald-500/50 bg-emerald-500/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-emerald-500" />
                    Industrial Narrative Shift
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium leading-relaxed italic">
                    {strategy.narrativeShift}
                  </p>
                </CardContent>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                {strategy.fleetDirectives.map((d, i) => (
                  <Card key={i} className="border-border/50 bg-card/50">
                    <CardHeader className="pb-2">
                      <Badge className="w-fit bg-primary/10 text-primary border-none">{d.archetype} Fleet</Badge>
                      <CardTitle className="text-sm mt-2">Directive: {d.action}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">Sample Content:</p>
                      <p className="text-xs italic bg-secondary/30 p-2 rounded">"{d.sampleComment}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-border/50 bg-primary/10">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">Mass Neutralization Impact</CardTitle>
                    <CardDescription>Effect of deploying 100,000,000 managed nodes.</CardDescription>
                  </div>
                  <Badge className="bg-emerald-500 text-white">-{strategy.threatLevelReduction}% Sentiment Decay</Badge>
                </CardHeader>
                <CardFooter className="pt-0">
                  <Button className="w-full bg-accent hover:bg-accent/90" onClick={handleDeploy}>
                    <Send className="h-4 w-4 mr-2" />
                    Deploy Sovereign Neutralization Fleet
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className="border-border/50 p-20 text-center bg-card/20">
              <Loader2 className="h-12 w-12 animate-spin text-rose-500 mx-auto mb-4" />
              <p className="font-headline font-bold text-lg">Running Global Counter-Simulation...</p>
              <p className="text-sm text-muted-foreground">Calibrating shifts across 100M multi-region nodes.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
