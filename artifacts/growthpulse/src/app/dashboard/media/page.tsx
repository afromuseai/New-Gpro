

import * as React from "react"
import { useState } from "react"
import { 
  Image as ImageIcon, 
  Video as VideoIcon,
  Sparkles, 
  Loader2, 
  Download, 
  Share2, 
  Zap,
  Layers,
  Film,
  Play
} from "lucide-react"
import { generatePostMedia } from "@/ai/flows/generate-post-media"
import { generateVideoMedia } from "@/ai/flows/generate-video-media"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "@/lib/next-shims/image"

export default function MediaGeneratorPage() {
  const [prompt, setPrompt] = useState("")
  const [aspectRatio, setAspectRatio] = useState<any>("1:1")
  const [loading, setLoading] = useState(false)
  const [generatedMedia, setGeneratedMedia] = useState<string | null>(null)
  const [mediaType, setMediaType] = useState<"image" | "video">("image")
  const { toast } = useToast()

  const handleGenerate = async () => {
    if (!prompt) return
    setLoading(true)
    try {
      if (mediaType === "image") {
        const result = await generatePostMedia({ prompt, aspectRatio })
        setGeneratedMedia(result.mediaUrl)
      } else {
        const result = await generateVideoMedia({ prompt, aspectRatio: "16:9" })
        setGeneratedMedia(result.videoUrl)
      }
      toast({
        title: `${mediaType === 'image' ? 'Image' : 'Video'} Generated`,
        description: "Your AI-powered post asset is ready for deployment.",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Failed to generate media. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Automated Media Studio</h1>
        <p className="text-muted-foreground">Create cinematic visual and video assets for your 1.2M managed fleet.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1 border-border/50 bg-card/40 h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-accent" />
              Creative Engine
            </CardTitle>
            <CardDescription>Synthesize high-impact content via prompt engineering.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="image" onValueChange={(v) => setMediaType(v as any)}>
              <TabsList className="w-full bg-secondary/50">
                <TabsTrigger value="image" className="flex-1 gap-2">
                  <ImageIcon className="h-4 w-4" /> Image
                </TabsTrigger>
                <TabsTrigger value="video" className="flex-1 gap-2">
                  <VideoIcon className="h-4 w-4" /> Video
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="prompt">Creative Brief</Label>
              <Textarea 
                id="prompt" 
                placeholder={mediaType === 'image' ? "A futuristic workspace with holographic screens..." : "A slow cinematic pan over a cyberpunk city at night, rain hitting neon lights..."}
                className="min-h-[120px] bg-background/50"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            
            {mediaType === 'image' ? (
              <div className="space-y-2">
                <Label htmlFor="aspect">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger id="aspect">
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                    <SelectItem value="9:16">Vertical (9:16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="p-3 rounded-md bg-accent/5 border border-accent/20">
                <p className="text-[10px] text-muted-foreground flex items-center gap-2">
                  <Film className="h-3 w-3 text-accent" />
                  Veo 3.0 Preview: 8-second cinematic loop (16:9)
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-accent hover:bg-accent/90" 
              onClick={handleGenerate} 
              disabled={loading || !prompt}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Synthesizing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate {mediaType === 'image' ? 'Image' : 'Video'}
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold font-headline flex items-center gap-2">
            <Film className="h-5 w-5 text-primary" />
            Studio Preview
          </h2>

          <Card className="border-border/50 bg-card/20 min-h-[450px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {generatedMedia ? (
              <div className="w-full space-y-6">
                <div className={`relative ${mediaType === 'image' ? 'aspect-square' : 'aspect-video'} max-w-2xl mx-auto rounded-xl overflow-hidden border border-border/50 shadow-2xl`}>
                  <Image 
                    src={generatedMedia} 
                    alt="Generated media" 
                    fill 
                    className="object-cover"
                    data-ai-hint={mediaType === 'image' ? 'professional photography' : 'cinematic video'}
                  />
                  {mediaType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group cursor-pointer">
                      <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all">
                        <Play className="h-8 w-8 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" size="sm" className="bg-background/50">
                    <Download className="mr-2 h-4 w-4" />
                    Download Master
                  </Button>
                  <Button variant="outline" size="sm" className="bg-background/50 border-accent/50 text-accent">
                    <Share2 className="mr-2 h-4 w-4" />
                    Deploy to Fleet
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="size-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto">
                  <Zap className="h-8 w-8 text-muted-foreground opacity-20" />
                </div>
                <p className="text-muted-foreground">Your synthesized media will appear here.</p>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <Loader2 className="h-10 w-10 animate-spin text-accent mb-4" />
                <p className="font-headline font-bold text-lg">Synthesizing {mediaType === 'image' ? 'Pixels' : 'Frames'}...</p>
                <p className="text-sm text-muted-foreground">Running {mediaType === 'image' ? 'Imagen 4.0' : 'Veo 3.0'} Elite Engine</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
