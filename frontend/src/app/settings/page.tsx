"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { useTheme } from "next-themes"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  User, 
  Palette, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Moon,
  Sun,
  Download,
  Upload,
  Trash2,
  Save,
  Eye,
  EyeOff,
  DollarSign,
  Languages,
  Clock,
  Calendar,
  Users,
  Lock,
  Globe2
} from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState(true)
  const [emailAlerts, setEmailAlerts] = useState(true)
  const [currency, setCurrency] = useState("USD")
  const [language, setLanguage] = useState("en")
  const [showPasswords, setShowPasswords] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)
  const [dataRetention, setDataRetention] = useState("365")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      }
    }
  }

  return (
    <Layout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your application preferences and account settings.
              </p>
            </div>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </motion.div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="johndoe" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input 
                        id="currentPassword" 
                        type={showPasswords ? "text" : "password"}
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => setShowPasswords(!showPasswords)}
                      >
                        {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type={showPasswords ? "text" : "password"} placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type={showPasswords ? "text" : "password"} placeholder="Confirm new password" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Theme & Display
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Label>Dark Mode</Label>
                        <Badge variant="secondary">Beta</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      <Switch 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      Currency
                    </Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇺🇸</span>
                            <div>
                              <div className="font-medium">USD</div>
                              <div className="text-xs text-muted-foreground">US Dollar</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="EUR">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇪🇺</span>
                            <div>
                              <div className="font-medium">EUR</div>
                              <div className="text-xs text-muted-foreground">Euro</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="GBP">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇬🇧</span>
                            <div>
                              <div className="font-medium">GBP</div>
                              <div className="text-xs text-muted-foreground">British Pound</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="JPY">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇯🇵</span>
                            <div>
                              <div className="font-medium">JPY</div>
                              <div className="text-xs text-muted-foreground">Japanese Yen</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="INR">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇮🇳</span>
                            <div>
                              <div className="font-medium">INR</div>
                              <div className="text-xs text-muted-foreground">Indian Rupee</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Languages className="h-4 w-4 text-primary" />
                      Language
                    </Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇺🇸</span>
                            <div>
                              <div className="font-medium">English</div>
                              <div className="text-xs text-muted-foreground">English (US)</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="es">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇪🇸</span>
                            <div>
                              <div className="font-medium">Español</div>
                              <div className="text-xs text-muted-foreground">Spanish</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="fr">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇫🇷</span>
                            <div>
                              <div className="font-medium">Français</div>
                              <div className="text-xs text-muted-foreground">French</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="de">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇩🇪</span>
                            <div>
                              <div className="font-medium">Deutsch</div>
                              <div className="text-xs text-muted-foreground">German</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="ja">
                          <div className="flex items-center gap-3">
                            <span className="text-base">🇯🇵</span>
                            <div>
                              <div className="font-medium">日本語</div>
                              <div className="text-xs text-muted-foreground">Japanese</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications about your expenses</p>
                    </div>
                    <Switch 
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get email summaries of your spending</p>
                    </div>
                    <Switch 
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Label>Alert Types</Label>
                    <div className="space-y-2">
                      {["Budget Limits", "Large Transactions", "Weekly Summaries", "Category Alerts"].map((alert) => (
                        <div key={alert} className="flex items-center justify-between">
                          <span className="text-sm">{alert}</span>
                          <Switch defaultChecked={alert !== "Category Alerts"} />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label className="text-base font-medium flex items-center gap-2">
                          <Eye className="h-4 w-4 text-primary" />
                          Profile Visibility
                        </Label>
                        <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                      </div>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-40 h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">
                            <div className="flex items-center gap-3">
                              <Globe2 className="h-4 w-4 text-green-500" />
                              <div>
                                <div className="font-medium">Public</div>
                                <div className="text-xs text-muted-foreground">Everyone can see</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="friends">
                            <div className="flex items-center gap-3">
                              <Users className="h-4 w-4 text-blue-500" />
                              <div>
                                <div className="font-medium">Friends</div>
                                <div className="text-xs text-muted-foreground">Only friends</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="private">
                            <div className="flex items-center gap-3">
                              <Lock className="h-4 w-4 text-red-500" />
                              <div>
                                <div className="font-medium">Private</div>
                                <div className="text-xs text-muted-foreground">Only you</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Data Analytics</Label>
                        <p className="text-sm text-muted-foreground">Help improve our service with anonymous usage data</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>Marketing Communications</Label>
                        <p className="text-sm text-muted-foreground">Receive updates about new features and offers</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                </CardTitle>
                  Data Management
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label>Auto Backup</Label>
                      <p className="text-sm text-muted-foreground">Automatically backup your data to the cloud</p>
                    </div>
                    <Switch 
                      checked={autoBackup}
                      onCheckedChange={setAutoBackup}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Data Retention
                    </Label>
                    <Select value={dataRetention} onValueChange={setDataRetention}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">30 days</div>
                              <div className="text-xs text-muted-foreground">Short term storage</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="90">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">90 days</div>
                              <div className="text-xs text-muted-foreground">Quarterly storage</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="365">
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">1 year</div>
                              <div className="text-xs text-muted-foreground">Annual storage</div>
                            </div>
                          </div>
                        </SelectItem>
                        <SelectItem value="-1">
                          <div className="flex items-center gap-3">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Forever</div>
                              <div className="text-xs text-muted-foreground">Permanent storage</div>
                            </div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Data
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Import Data
                    </Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label className="text-destructive">Danger Zone</Label>
                    <div className="rounded-lg border border-destructive/20 p-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Delete All Data</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete all your expenses and data. This action cannot be undone.
                        </p>
                        <Button variant="destructive" className="gap-2">
                          <Trash2 className="h-4 w-4" />
                          Delete Everything
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  )
}
