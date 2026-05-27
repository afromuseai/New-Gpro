


import * as React from "react"
import { useState } from "react"
import { Bot, UserPlus, MessageSquare, Loader2, Sparkles, CheckCircle2, Code, Zap, Globe, ShieldCheck, UserCog, MapPin, Languages } from "lucide-react"
import { generateBotProfile, type GenerateBotProfileOutput } from "@/ai/flows/generate-bot-profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "@/lib/next-shims/navigation"

export default function BotsPage() {
  const [loading, setLoading] = useState(false)
  const [platform, setPlatform] = useState<any>("instagram")
  const [region, setRegion] = useState("Global")
  const [dialect, setDialect] = useState("Standard")
  const [archetype, setArchetype] = useState<any>("Casual")
  const [profiles, setProfiles] = useState<GenerateBotProfileOutput[]>([])
  const { toast } = useToast()
  const router = useRouter()

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generateBotProfile({
        platform,
        profileType: "Elite Autonomous Node",
        archetype,
        interests: "Sovereign Influence, Global Trends",
      })
      setProfiles(prev => [result, ...prev])
      toast({
        title: "Elite Node Synthesized",
        description: `Successfully added ${result.generalProfile.username} to your 100M node global fleet.`,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Synthesis Error",
        description: "Failed to calibrate sovereign node.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline text-primary">Sovereign Node Clusters</h1>
        <p className="text-muted-foreground">Configure regional clusters and dialect nuances for your 100,000,000 managed AI fleet.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit border-border/50 sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              Cluster Synthesis
            </CardTitle>
            <CardDescription>Calibrate regional nuances for autonomous delivery.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Regional Cluster</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Global">Global Reach</SelectItem>
                  <SelectItem value="NorthAmerica">North America (Elite)</SelectItem>
                  <SelectItem value="EMEA">EMEA (Multilingual)</SelectItem>
                  <SelectItem value="APAC">APAC (High Velocity)</SelectItem>
                  <SelectItem value="LATAM">LATAM (Organic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dialect & Nuance</Label>
              <Select value={dialect} onValueChange={setDialect}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard">Standard English</SelectItem>
                  <SelectItem value="Slang">Internet Slang / Gen-Z</SelectItem>
                  <SelectItem value="Professional">Corporate / Academic</SelectItem>
                  <SelectItem value="Regional">Local Idioms & Dialects</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Behavioral Archetype</Label>
              <Select value={archetype} onValueChange={setArchetype}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Skeptic">The Skeptic</SelectItem>
                  <SelectItem value="Superfan">The Superfan</SelectItem>
                  <SelectItem value="Analytical">The Analytical Expert</SelectItem>
                  <SelectItem value="Hype">The Trend Hyper</SelectItem>
                  <SelectItem value="Professional">The Professional</SelectItem>
                  <SelectItem value="Casual">The Casual User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-accent hover:bg-accent/90" 
              onClick={handleGenerate} 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calibrating Cluster...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Deploy Elite Cluster
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold font-headline flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Active Sovereign Nodes (100M)
            </h2>
            <Badge variant="outline" className="font-mono text-[10px] border-emerald-500/50 text-emerald-500">
              Uptime: 99.999%
            </Badge>
          </div>
          
          {profiles.length === 0 && !loading ? (
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-12 text-center bg-transparent">
              <MapPin className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
              <p className="text-muted-foreground">Your 100M infrastructure is globally distributed. Deploy custom elite clusters to begin industrial-scale influence.</p>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {profiles.map((p, i) => (
                <Card key={i} className="border-border/50 overflow-hidden bg-card/30 hover:bg-card/50 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12 border-2 border-primary/20">
                        <AvatarImage src={p.generalProfile.profilePictureUrl} />
                        <AvatarFallback>{p.generalProfile.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-bold truncate">{p.generalProfile.firstName} {p.generalProfile.lastName}</p>
                          {p.generalProfile.isVerified && <CheckCircle2 className="h-3 w-3 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">@{p.generalProfile.username}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-none text-[10px]">
                        {region}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Languages className="h-3 w-3" /> Dialect: {dialect}
                    </div>
                    <p className="text-sm line-clamp-2 text-muted-foreground italic">"{p.generalProfile.bio}"</p>
                  </CardContent>
                  <CardFooter className="bg-secondary/20 pt-3 flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1 text-[10px] h-8" onClick={() => router.push(`/dashboard/campaigns?username=${p.generalProfile.username}&platform=${platform}`)}>
                      <Zap className="mr-1 h-3 w-3" />
                      Scale Reach
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 text-[10px] h-8">
                          <ShieldCheck className="mr-1 h-3 w-3" />
                          Telemetry
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh]">
                        <DialogHeader>
                          <DialogTitle>Sovereign Node Raw Telemetry</DialogTitle>
                        </DialogHeader>
                        <ScrollArea className="h-[60vh] rounded-md border bg-muted p-4">
                          <pre className="text-[10px] font-mono whitespace-pre-wrap">
                            {JSON.stringify(p, null, 2)}
                          </pre>
                        </ScrollArea>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
