"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Bell,
  SettingsIcon,
  LogOut,
  Trash2,
  Upload,
  Shield,
  Mail,
  MessageSquare,
  Phone,
  Lock,
  RefreshCw,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)

  const handlePhotoUpload = () => {
    setIsUploadingPhoto(true)
    setTimeout(() => {
      setIsUploadingPhoto(false)
      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been successfully updated.",
      })
    }, 1500)
  }

  const handlePasswordChange = () => {
    setIsChangingPassword(true)
    setTimeout(() => {
      setIsChangingPassword(false)
      toast({
        title: "Password changed",
        description: "Your password has been successfully updated.",
      })
    }, 1500)
  }

  const handleLogoutAllDevices = () => {
    toast({
      title: "Logged out from all devices",
      description: "You have been successfully logged out from all devices.",
    })
  }

  const handleResetEverything = () => {
    toast({
      title: "Settings reset",
      description: "All your preferences and customizations have been reset to default.",
    })
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="actions" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Actions</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information and profile picture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="h-20 w-20 border-2 border-border">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">SU</AvatarFallback>
                  </Avatar>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePhotoUpload}
                      disabled={isUploadingPhoto}
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      {isUploadingPhoto ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-3 w-3 mr-1" /> Upload
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue="Startup User" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="user@startup.com" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="company">Company Name</Label>
                      <Input id="company" defaultValue="Startup Inc." />
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handlePasswordChange}
                    disabled={isChangingPassword}
                    className="transition-all hover:bg-primary/90"
                  >
                    {isChangingPassword ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Updating...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" /> Change Password
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="transition-all hover:bg-primary/90">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account security and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Security</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-verification">Email Verification</Label>
                      <p className="text-sm text-muted-foreground">Your email has been verified</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <Shield className="h-4 w-4 mr-2" /> Verified
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication (2FA)</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Preferences</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="space-y-1">
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary"
                    >
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="mr">Marathi</option>
                      <option value="bn">Bengali</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary"
                    >
                      <option value="IST">India Standard Time (IST)</option>
                      <option value="UTC">Coordinated Universal Time (UTC)</option>
                      <option value="EST">Eastern Standard Time (EST)</option>
                      <option value="PST">Pacific Standard Time (PST)</option>
                      <option value="JST">Japan Standard Time (JST)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="transition-all hover:bg-primary/90">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <Switch id="sms-notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      <div className="space-y-0.5">
                        <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications within the application</p>
                      </div>
                    </div>
                    <Switch id="in-app-notifications" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Notification Frequency</h3>
                <div className="space-y-1">
                  <Label htmlFor="notification-frequency">How often would you like to receive notifications?</Label>
                  <select
                    id="notification-frequency"
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors hover:border-primary"
                  >
                    <option value="immediately">Immediately</option>
                    <option value="hourly">Hourly Digest</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>
                </div>
              </div>

              <Separator className="my-2" />

              <div className="space-y-3">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="case-updates">Case Updates</Label>
                      <p className="text-sm text-muted-foreground">Notifications about changes to your legal cases</p>
                    </div>
                    <Switch id="case-updates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="document-status">Document Status</Label>
                      <p className="text-sm text-muted-foreground">Notifications about document uploads and analysis</p>
                    </div>
                    <Switch id="document-status" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="ai-results">AI Analysis Results</Label>
                      <p className="text-sm text-muted-foreground">Notifications when AI completes document analysis</p>
                    </div>
                    <Switch id="ai-results" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compliance-deadlines">Compliance Deadlines</Label>
                      <p className="text-sm text-muted-foreground">Reminders about upcoming compliance deadlines</p>
                    </div>
                    <Switch id="compliance-deadlines" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketing-updates">Marketing & Product Updates</Label>
                      <p className="text-sm text-muted-foreground">News about LexSure features and promotions</p>
                    </div>
                    <Switch id="marketing-updates" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="transition-all hover:bg-primary/90">Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Account Actions</CardTitle>
              <CardDescription>Manage your account status and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium">Log Out From All Devices</h3>
                      <p className="text-sm text-muted-foreground">
                        This will log you out from all devices where you're currently signed in
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleLogoutAllDevices}
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <LogOut className="h-4 w-4 mr-2" /> Log Out All Devices
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium">Reset All Preferences</h3>
                      <p className="text-sm text-muted-foreground">
                        Reset all your AI preferences, customizations, and saved settings to default
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={handleResetEverything}
                      className="transition-all hover:bg-primary hover:text-primary-foreground"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" /> Reset Everything
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-destructive/10 border-destructive/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-destructive">Deactivate Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Temporarily deactivate your account. You can reactivate it anytime by logging in
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all"
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Deactivate Account
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-3 bg-destructive/10 border-destructive/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-destructive">Delete Account</h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all associated data. This action cannot be undone
                      </p>
                    </div>
                    <Button variant="destructive" className="transition-all hover:bg-destructive/90">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
