"use client"

import * as React from "react"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Zap,
  Save
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-headline">Account Settings</h1>
        <p className="text-muted-foreground">Configure your platform preferences and security details.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details visible to the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Rivera" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue="alex.rivera@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" defaultValue="Growth Strategist & Social Media Consultant" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent" />
                Notifications
              </CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Campaign Completion</Label>
                  <p className="text-xs text-muted-foreground">Receive a notification when a boost simulation ends.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analytics Reports</Label>
                  <p className="text-xs text-muted-foreground">Weekly performance summaries delivered to your email.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Security Alerts</Label>
                  <p className="text-xs text-muted-foreground">Immediate alerts for suspicious account activity.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-border/50 bg-secondary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                AI API Configuration
              </CardTitle>
              <CardDescription>Manage your Genkit model settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Model</Label>
                <Input value="gemini-2.5-flash" disabled className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label>Creativity (Temperature)</Label>
                <Input type="number" step="0.1" defaultValue="0.7" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-500" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-xs text-muted-foreground">Your growth data is encrypted and only used for your private dashboard.</p>
              <Button variant="link" className="p-0 text-xs h-auto">Download My Data</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button className="bg-accent hover:bg-accent/90" onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
