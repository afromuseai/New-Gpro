
"use client"

import * as React from "react"
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Lock, 
  RefreshCcw, 
  Wifi, 
  Fingerprint,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Server
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const proxyNodes = [
  { region: "North America (Residential Elite)", status: "Healthy", latency: "12ms", encryption: "AES-512", load: 68 },
  { region: "European Union (Sovereign Proxy)", status: "Healthy", latency: "18ms", encryption: "AES-512", load: 42 },
  { region: "Asia Pacific (Fiber Mesh)", status: "Optimizing", latency: "45ms", encryption: "AES-512", load: 89 },
  { region: "Global Mesh Network", status: "Healthy", latency: "32ms", encryption: "AES-512", load: 24 },
]

export default function IntegrityPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline text-primary">Sovereign Integrity Shield</h1>
        <p className="text-muted-foreground">Monitoring industrial-grade anti-detection, proxy rotation, and 100,000,000 node infrastructure health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground">Detection Avoidance</span>
            <Fingerprint className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-[10px] text-emerald-500 flex items-center gap-1 mt-1 font-mono">
              <CheckCircle2 className="h-3 w-3" /> INDUSTRIAL BYPASS ACTIVE
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground">Active Node Fleet</span>
            <Server className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100M / 100M</div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-mono">
              NODES ROTATED IN 24H
            </p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <span className="text-xs font-medium text-muted-foreground">Integrity Score</span>
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100/100</div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1 font-mono">
              SOVEREIGN LEVEL SECURITY
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Global Sovereign Infrastructure
            </CardTitle>
            <CardDescription>Residential mesh health across 100,000,000 nodes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {proxyNodes.map((node) => (
              <div key={node.region} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{node.region}</span>
                    <Badge variant="outline" className="text-[10px] h-4 py-0 border-emerald-500/50 text-emerald-500 uppercase font-mono">
                      {node.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{node.latency} RTT</span>
                </div>
                <Progress value={node.load} className="h-1.5" />
                <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                  <span>Encryption: {node.encryption}</span>
                  <span>Node Load: {node.load}%</span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="bg-secondary/20 pt-4">
            <Button variant="ghost" size="sm" className="w-full text-xs hover:text-accent">
              <RefreshCcw className="h-3 w-3 mr-2" />
              Force Full 100M Node Rotation
            </Button>
          </CardFooter>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-accent" />
              Elite Anti-Detection Layer
            </CardTitle>
            <CardDescription>Sovereign-grade behavioral variety simulating 100M unique humans.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Sovereign Fingerprinting", status: "ENABLED", value: "100M+ Entropy Clusters", icon: Cpu },
              { label: "Residential Proxy Mesh", status: "ACTIVE", value: "184 Region Rotation", icon: Globe },
              { label: "Cognitive Timing", status: "ACTIVE", value: "Bio-Rhythm Simulation", icon: Zap },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-border/30 bg-card/30">
                <div className="size-10 rounded-full bg-secondary flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.label}</p>
                  <p className="text-xs text-muted-foreground font-mono">{item.value}</p>
                </div>
                <Badge className="bg-primary/10 text-primary border-none font-mono text-[10px]">
                  {item.status}
                </Badge>
              </div>
            ))}

            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3" />
                Sovereign Integrity Active
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                The 100M node fleet is currently operating within the 'Sovereign Mesh' protocol. Every interaction utilizes unique hardware-level headers and residential IP clustering, ensuring zero detection across all platform security layers and AI-detection models.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
