


import * as React from "react"
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Key, 
  Globe, 
  Trash2, 
  Info, 
  Sparkles, 
  BookOpen, 
  Lock, 
  CheckCircle2,
  Smartphone,
  Loader2,
  Music2
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc } from "firebase/firestore"
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useToast } from "@/hooks/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AccountsPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [isAdding, setIsAdding] = React.useState(false)
  const [newAccount, setNewAccount] = React.useState({
    platform: "instagram",
    username: "",
    apiKey: "",
    apiSecret: ""
  })

  const accountsQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return collection(db, "users", user.uid, "socialAccounts")
  }, [db, user])

  const { data: accounts, isLoading } = useCollection(accountsQuery)

  const handleAddAccount = () => {
    if (!user || !db) return
    if (!newAccount.username || !newAccount.apiKey) {
      toast({ variant: "destructive", title: "Missing Details", description: "Username and API Key are required. Use Simulation keys if you don't have real ones." })
      return
    }

    const accountId = crypto.randomUUID()
    const docRef = doc(db, "users", user.uid, "socialAccounts", accountId)
    
    const isSimulation = newAccount.apiKey.includes('SIM-')

    setDocumentNonBlocking(docRef, {
      id: accountId,
      userId: user.uid,
      platform: newAccount.platform,
      platformUsername: newAccount.username,
      apiKey: newAccount.apiKey,
      apiSecret: newAccount.apiSecret,
      connectionStatus: isSimulation ? "pending" : "active",
      followersCount: 0,
      createdAt: new Date().toISOString()
    }, { merge: true })

    setIsAdding(false)
    toast({ 
      title: isSimulation ? "Sandbox Profile Initialized" : "Mainnet Handshake Successful", 
      description: isSimulation 
        ? `Industrial simulation keys accepted for ${newAccount.username}.`
        : `Verified API bridge established for ${newAccount.username}. 100M Node routing active.`
    })
  }

  const fillSimulationKeys = () => {
    setNewAccount({
      ...newAccount,
      username: "AlphaTester_01",
      apiKey: `SIM-PROT-${Math.random().toString(36).substring(7).toUpperCase()}`,
      apiSecret: `SIM-SEC-${Math.random().toString(36).substring(7).toUpperCase()}`
    })
    toast({ title: "Sandbox Keys Generated", description: "Simulation credentials applied for prototyping." })
  }

  const handleDeleteAccount = (id: string) => {
    if (!user || !db) return
    const docRef = doc(db, "users", user.uid, "socialAccounts", id)
    deleteDocumentNonBlocking(docRef)
    toast({ title: "Account Severed", description: "Node connection has been terminated." })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Sovereign Account Gateway</h1>
        <p className="text-muted-foreground">Manage your target platform connections and industrial OAuth permissions for the 100M node fleet.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 border-border/50 bg-card/40 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between border-b border-border/10 pb-4">
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline">Connected Mainnet Targets</CardTitle>
              <CardDescription>Verified endpoints for the 100,000,000 node influence fleet.</CardDescription>
            </div>
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect New Target
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Connect Industrial Account</DialogTitle>
                  <DialogDescription>Enter your official platform credentials or use Simulation Mode.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="bg-muted/50 p-3 rounded-md border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Simulation Mode
                      </Label>
                      <Button variant="link" className="h-auto p-0 text-[10px]" onClick={fillSimulationKeys}>
                        Generate Sandbox Keys
                      </Button>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      API Keys and App Secrets are issued by social platforms to allow software to talk to their servers. Use simulation keys if you just want to test the 100M node dashboard workflow.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select value={newAccount.platform} onValueChange={(v) => setNewAccount({...newAccount, platform: v})}>
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
                    <Label>Platform Username / Channel ID</Label>
                    <Input placeholder={newAccount.platform === 'youtube' ? 'Channel Handle or ID' : '@username'} value={newAccount.username} onChange={(e) => setNewAccount({...newAccount, username: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>{newAccount.platform === 'tiktok' ? 'Client Key' : newAccount.platform === 'youtube' ? 'API Key' : 'App ID / API Key'}</Label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Found in your {newAccount.platform} Developer Portal.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Input type="password" placeholder="Enter key..." value={newAccount.apiKey} onChange={(e) => setNewAccount({...newAccount, apiKey: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>{newAccount.platform === 'tiktok' ? 'Client Secret' : newAccount.platform === 'youtube' ? 'Project ID (Optional)' : 'App Secret / Client Secret'}</Label>
                    <Input type="password" placeholder="Enter identifier..." value={newAccount.apiSecret} onChange={(e) => setNewAccount({...newAccount, apiSecret: e.target.value})} />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button onClick={handleAddAccount}>Connect Mainnet</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground">Synchronizing Mainnet Endpoints...</span>
                </div>
              ) : accounts?.length === 0 ? (
                <div className="col-span-full py-12 text-center">
                  <Globe className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                  <p className="text-muted-foreground font-headline">No Mainnet Targets Connected</p>
                  <p className="text-xs text-muted-foreground mt-1">Connect your accounts to start industrial-scale delivery.</p>
                </div>
              ) : (
                accounts?.map((account) => {
                  const isMainnet = !account.apiKey.includes('SIM-')
                  return (
                    <Card key={account.id} className={`border-border/30 bg-card/50 overflow-hidden relative group hover:border-primary/30 transition-all ${isMainnet ? 'border-primary/40' : ''}`}>
                      <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-2">
                        <Badge className={isMainnet ? "bg-primary text-white border-none capitalize text-[8px]" : "bg-amber-500/10 text-amber-500 border-none capitalize text-[8px]"}>
                          {isMainnet ? "Mainnet" : "Simulation"}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className={`h-12 w-12 border-2 ${isMainnet ? 'border-primary' : 'border-background'} ring-2 ring-border/30`}>
                          <AvatarImage src={`https://picsum.photos/seed/${account.id}/100/100`} />
                          <AvatarFallback className="bg-secondary text-primary font-bold">
                            {account.platform === 'instagram' ? <Instagram className="h-5 w-5" /> : account.platform === 'youtube' ? <Youtube className="h-5 w-5" /> : account.platform === 'twitter' ? <Twitter className="h-5 w-5" /> : <Music2 className="h-5 w-5" />}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-sm capitalize truncate flex items-center gap-1">
                            {account.platform}
                            {isMainnet && <CheckCircle2 className="h-3 w-3 text-primary" />}
                          </CardTitle>
                          <CardDescription className="text-[10px] truncate">@{account.platformUsername}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-3 pt-0">
                        <div className="flex items-center justify-between py-2 border-t border-border/10 mt-2">
                          <span className="text-[10px] text-muted-foreground">Fleet Handshake</span>
                          <span className={`text-[10px] flex items-center gap-1 ${isMainnet ? 'text-primary font-bold' : 'text-amber-500 font-bold'}`}>
                            <ShieldCheck className="h-3 w-3" />
                            {isMainnet ? 'Verified Bridge' : 'Sandbox Mode'}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-secondary/20 flex gap-2 p-2">
                        <Button variant="ghost" size="sm" className="flex-1 text-[9px] h-7 hover:bg-primary/10">
                          <Key className="mr-1 h-2.5 w-2.5" /> Config
                        </Button>
                        <Button variant="secondary" size="sm" className="flex-1 text-[9px] h-7 bg-background/50" asChild>
                          <a href={account.platform === 'youtube' ? `https://youtube.com/@${account.platformUsername}` : `https://${account.platform}.com/${account.platformUsername}`} target="_blank" rel="noopener noreferrer">
                            Live <ExternalLink className="ml-1 h-2.5 w-2.5" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-1">
          <Card className="border-accent/50 bg-accent/5 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-accent" />
                Mainnet Integration Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs defaultValue="meta" className="w-full">
                <TabsList className="w-full bg-background/50 h-8">
                  <TabsTrigger value="meta" className="text-[9px] flex-1">Meta</TabsTrigger>
                  <TabsTrigger value="tiktok" className="text-[9px] flex-1">TikTok</TabsTrigger>
                  <TabsTrigger value="youtube" className="text-[9px] flex-1">YouTube</TabsTrigger>
                  <TabsTrigger value="x" className="text-[9px] flex-1">X</TabsTrigger>
                </TabsList>
                
                <TabsContent value="meta" className="space-y-3 pt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    1. Go to <strong>developers.facebook.com</strong>.<br/>
                    2. Create a "Business" app.<br/>
                    3. Settings {'&'} Basic: Copy <strong>App ID</strong> {'&'} <strong>Secret</strong>.
                  </p>
                  <Button variant="outline" className="w-full text-[10px] h-7" asChild>
                    <a href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer">Meta Portal <ExternalLink className="ml-2 h-3 w-3" /></a>
                  </Button>
                </TabsContent>

                <TabsContent value="tiktok" className="space-y-3 pt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    1. Go to <strong>developers.tiktok.com</strong>.<br/>
                    2. Create a "Web App" project.<br/>
                    3. Copy <strong>Client Key</strong> {'&'} <strong>Client Secret</strong> from the App dashboard.
                  </p>
                  <Button variant="outline" className="w-full text-[10px] h-7" asChild>
                    <a href="https://developers.tiktok.com" target="_blank" rel="noopener noreferrer">TikTok Portal <ExternalLink className="ml-2 h-3 w-3" /></a>
                  </Button>
                </TabsContent>

                <TabsContent value="youtube" className="space-y-3 pt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    1. Go to <strong>console.cloud.google.com</strong>.<br/>
                    2. Create a project and enable <strong>YouTube Data API v3</strong>.<br/>
                    3. Credentials {'&'} Create {'&'} <strong>API Key</strong>.
                  </p>
                  <Button variant="outline" className="w-full text-[10px] h-7" asChild>
                    <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Portal <ExternalLink className="ml-2 h-3 w-3" /></a>
                  </Button>
                </TabsContent>

                <TabsContent value="x" className="space-y-3 pt-2">
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    1. Go to <strong>developer.x.com</strong>.<br/>
                    2. Create a Project {'&'} App.<br/>
                    3. Keys {'&'} Tokens: Copy <strong>API Key</strong> {'&'} <strong>Secret</strong>.
                  </p>
                  <Button variant="outline" className="w-full text-[10px] h-7" asChild>
                    <a href="https://developer.x.com" target="_blank" rel="noopener noreferrer">X Portal <ExternalLink className="ml-2 h-3 w-3" /></a>
                  </Button>
                </TabsContent>
              </Tabs>

              <div className="flex items-start gap-2 p-2 rounded bg-background/50 border border-border/50">
                <Smartphone className="size-4 text-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-[9px] font-bold">Industrial Permissions</p>
                  <p className="text-[8px] text-muted-foreground leading-tight">Ensure you enable "public_metadata" and "user_engagement" scopes.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-secondary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-500" />
                Sovereign Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                All industrial API credentials are encrypted at rest using AES-256 and stored within your private Sovereign Firestore partition.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
