


import * as React from "react"
import { Check, CreditCard, Zap, ShieldCheck, ArrowRight, Globe, Loader2, Star, ShieldAlert, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase"
import { collection, doc } from "firebase/firestore"
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Script from "@/lib/next-shims/script"

declare const PaystackPop: any;

export default function BillingPage() {
  const { user } = useUser()
  const db = useFirestore()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = React.useState(false)

  const isAdmin = user?.email === "joshuaa2g5@gmail.com"

  const subscriptionsQuery = useMemoFirebase(() => {
    if (!db || !user) return null
    return collection(db, "users", user.uid, "subscriptions")
  }, [db, user])

  const { data: subscriptions, isLoading } = useCollection(subscriptionsQuery)
  const activeSub = subscriptions?.[0]

  React.useEffect(() => {
    if (isAdmin && !isLoading && !activeSub && db && user) {
      const subId = crypto.randomUUID()
      const docRef = doc(db, "users", user.uid, "subscriptions", subId)
      setDocumentNonBlocking(docRef, {
        id: subId,
        userId: user.uid,
        tier: "Sovereign",
        status: "active",
        nodeLimit: 100000000,
        currentNodes: 100000000,
        billingCycle: "annual",
        nextBillingDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      }, { merge: true })
      toast({ title: "Admin Access Granted", description: "Sovereign 100M Node License automatically provisioned." })
    }
  }, [isAdmin, isLoading, activeSub, db, user, toast])

  const finalizeUpgrade = (tier: string) => {
    if (!user || !db) return

    const subId = activeSub?.id || crypto.randomUUID()
    const docRef = doc(db, "users", user.uid, "subscriptions", subId)

    const limits: Record<string, number> = {
      "Pro": 10000000,
      "Elite": 50000000,
      "Sovereign": 100000000
    }

    setDocumentNonBlocking(docRef, {
      id: subId,
      userId: user.uid,
      tier: tier,
      status: "active",
      nodeLimit: limits[tier] || 10000000,
      currentNodes: limits[tier] || 10000000,
      billingCycle: "annual",
      nextBillingDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    }, { merge: true })

    toast({
      title: "Fleet License Upgraded",
      description: `Sovereign nodes re-calibrated to ${tier} capacity.`
    })
  }

  const handlePaystackPayment = (tier: string, priceInCents: number) => {
    if (isAdmin) {
      finalizeUpgrade(tier)
      return
    }

    if (!user?.email) {
      toast({ variant: "destructive", title: "Handshake Error", description: "Email required for industrial transaction." })
      return
    }

    setIsProcessing(true)

    const handler = PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // User should replace with real public key
      email: user.email,
      amount: priceInCents,
      currency: 'NGN', // Can be changed to GHS, ZAR, USD depending on Paystack account
      callback: (response: any) => {
        setIsProcessing(false)
        finalizeUpgrade(tier)
        toast({ title: "Transaction Successful", description: `Handshake verified. Reference: ${response.reference}` })
      },
      onClose: () => {
        setIsProcessing(false)
        toast({ title: "Transaction Aborted", description: "Industrial credit authorization canceled." })
      }
    });

    handler.openIframe();
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-muted-foreground font-headline text-lg">Syncing Corporate Ledger...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <Script src="https://js.paystack.co/v1/inline.js" strategy="beforeInteractive" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline text-primary">Industrial License & Scaling</h1>
        <p className="text-muted-foreground">Manage your 100M fleet capacity, network access, and global billing via Paystack.</p>
      </div>

      {isAdmin && (
        <Alert className="bg-primary/10 border-primary/20">
          <ShieldAlert className="h-4 w-4 text-primary" />
          <AlertTitle className="text-sm font-bold uppercase tracking-widest text-primary">Admin Override Active</AlertTitle>
          <AlertDescription className="text-xs">
            Global developer credentials detected. Sovereign 100M Node License is automatically granted without payment.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/50 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              <Badge className="bg-primary text-white">{activeSub?.tier || "Unlicensed"} Tier</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <Globe className="h-6 w-6 text-accent fill-accent" />
                Network Hegemon Pro
              </CardTitle>
              <CardDescription>
                {activeSub ? `Billed annually • Next billing: ${new Date(activeSub.nextBillingDate).toLocaleDateString()}` : "No active industrial license detected."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fleet Usage</span>
                  <span className="font-medium">
                    {activeSub ? `${(activeSub.currentNodes / 1000000).toFixed(1)}M / ${(activeSub.nodeLimit / 1000000).toFixed(1)}M` : "0 / 0"} nodes
                  </span>
                </div>
                <Progress value={activeSub ? (activeSub.currentNodes / activeSub.nodeLimit) * 100 : 0} className="h-2" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
                  <div className="size-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">100M Organic Personas</p>
                    <p className="text-[10px] text-muted-foreground">Global industrial-scale delivery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-background/40 border border-border/50">
                  <div className="size-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-emerald-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Paystack Secured</p>
                    <p className="text-[10px] text-muted-foreground">Instant industrial credit settlement</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-primary/10 flex justify-between">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-transparent text-xs">
                Review Global Quotas
              </Button>
              <Button 
                className="bg-accent hover:bg-accent/90" 
                onClick={() => handlePaystackPayment("Sovereign", 1449000)} 
                disabled={activeSub?.tier === "Sovereign" || isProcessing}
              >
                {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wallet className="mr-2 h-4 w-4" />}
                Scale to 100M Nodes
              </Button>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { tier: "Pro", price: "$490", cents: 49000, limit: "10M" },
              { tier: "Elite", price: "$2,490", cents: 249000, limit: "50M" },
              { tier: "Sovereign", price: "$14,490", cents: 1449000, limit: "100M" },
            ].map((plan) => (
              <Card key={plan.tier} className={`border-border/50 bg-card/40 ${activeSub?.tier === plan.tier ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.tier}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">
                    {isAdmin ? "$0" : plan.price}
                    <span className="text-xs font-normal text-muted-foreground">/yr</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xs text-muted-foreground">{plan.limit} Managed Nodes</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant={activeSub?.tier === plan.tier ? "secondary" : "outline"} 
                    className="w-full text-xs h-8"
                    onClick={() => handlePaystackPayment(plan.tier, plan.cents)}
                    disabled={activeSub?.tier === plan.tier || (isAdmin && plan.tier !== "Sovereign") || isProcessing}
                  >
                    {activeSub?.tier === plan.tier ? "Current License" : isAdmin ? "Provisioned" : `Purchase ${plan.tier}`}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <Card className="lg:col-span-1 border-border/50 h-fit bg-card/40">
          <CardHeader>
            <CardTitle className="text-lg">Sovereign Billing</CardTitle>
            <CardDescription>Industrial handshake via Paystack.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-border/50 bg-secondary/40 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <div className="p-1 rounded bg-white w-fit">
                  <div className="h-6 w-10 flex items-center justify-center font-bold text-blue-800 text-[10px] italic">VISA</div>
                </div>
                <Badge variant="secondary" className="text-[10px] bg-background/50">SECURED</Badge>
              </div>
              <p className="font-mono text-sm tracking-widest mb-1 text-foreground">•••• •••• •••• {isAdmin ? "0000" : "9999"}</p>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Expires {isAdmin ? "∞/∞" : "08/30"}</span>
                <span>{isAdmin ? "Global Administrator" : user?.email?.split('@')[0] || "Commander"}</span>
              </div>
            </div>
            
            <div className="space-y-3 pt-4 border-t border-border/30">
              <p className="text-xs font-bold uppercase text-muted-foreground">Recent Activity</p>
              {isAdmin ? (
                 <div className="py-2 text-center bg-secondary/20 rounded border border-dashed border-border/50">
                    <p className="text-[10px] text-muted-foreground italic">Admin account bypasses Paystack ledger.</p>
                 </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-muted-foreground">Last Cycle</span>
                    <span className="font-bold">Verified</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex items-start gap-2 text-[10px] text-muted-foreground p-3 bg-secondary/10 rounded-md border border-border/30">
              <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
              GrowthPulse Pro uses Paystack for industrial-grade transaction security.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
