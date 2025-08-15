"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Brain, Shield, Zap, AlertTriangle, CheckCircle, Save } from "lucide-react"
import { InstitutionLayout } from "@/components/institution/institution-layout"

// Mock AI settings data
const mockAISettings = {
  gradingEnabled: true,
  plagiarismDetection: true,
  contentGeneration: false,
  studyRecommendations: true,
  chatAssistant: true,
  learningAnalytics: true,
  confidenceThreshold: 85,
  maxTokens: 1000,
  responseTime: "fast",
  dataRetention: 90,
}

const mockAIModels = [
  {
    id: "gpt-4",
    name: "GPT-4",
    provider: "OpenAI",
    status: "active",
    usage: "High",
    cost: "$0.03/1K tokens",
    features: ["Text Generation", "Code Analysis", "Grading"],
  },
  {
    id: "claude-3",
    name: "Claude 3",
    provider: "Anthropic",
    status: "active",
    usage: "Medium",
    cost: "$0.025/1K tokens",
    features: ["Content Review", "Academic Writing"],
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "Google",
    status: "inactive",
    usage: "Low",
    cost: "$0.02/1K tokens",
    features: ["Multimodal Analysis", "Research"],
  },
]

export default function AISettingsPage() {
  const [settings, setSettings] = useState(mockAISettings)
  const [selectedTab, setSelectedTab] = useState("general")

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUsageColor = (usage: string) => {
    switch (usage) {
      case "High":
        return "text-red-600"
      case "Medium":
        return "text-yellow-600"
      case "Low":
        return "text-green-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <InstitutionLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">AI Integration Settings</h1>
            <p className="text-muted-foreground">Configure AI features and models for your institution</p>
          </div>
          <Button>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
            <TabsTrigger value="security">Security & Privacy</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Features
                </CardTitle>
                <CardDescription>Enable or disable AI-powered features across your platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>AI-Powered Grading</Label>
                      <p className="text-sm text-muted-foreground">Automatic assessment and feedback generation</p>
                    </div>
                    <Switch
                      checked={settings.gradingEnabled}
                      onCheckedChange={(checked) => handleSettingChange("gradingEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Plagiarism Detection</Label>
                      <p className="text-sm text-muted-foreground">AI-based academic integrity monitoring</p>
                    </div>
                    <Switch
                      checked={settings.plagiarismDetection}
                      onCheckedChange={(checked) => handleSettingChange("plagiarismDetection", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Content Generation</Label>
                      <p className="text-sm text-muted-foreground">AI-assisted quiz and material creation</p>
                    </div>
                    <Switch
                      checked={settings.contentGeneration}
                      onCheckedChange={(checked) => handleSettingChange("contentGeneration", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Study Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Personalized learning path suggestions</p>
                    </div>
                    <Switch
                      checked={settings.studyRecommendations}
                      onCheckedChange={(checked) => handleSettingChange("studyRecommendations", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>AI Chat Assistant</Label>
                      <p className="text-sm text-muted-foreground">Real-time AI help for students and faculty</p>
                    </div>
                    <Switch
                      checked={settings.chatAssistant}
                      onCheckedChange={(checked) => handleSettingChange("chatAssistant", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Learning Analytics</Label>
                      <p className="text-sm text-muted-foreground">AI-driven performance insights</p>
                    </div>
                    <Switch
                      checked={settings.learningAnalytics}
                      onCheckedChange={(checked) => handleSettingChange("learningAnalytics", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Performance Settings
                </CardTitle>
                <CardDescription>Configure AI performance and response parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Confidence Threshold: {settings.confidenceThreshold}%</Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Minimum confidence level for AI recommendations
                    </p>
                    <Slider
                      value={[settings.confidenceThreshold]}
                      onValueChange={(value) => handleSettingChange("confidenceThreshold", value[0])}
                      max={100}
                      min={50}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Response Speed</Label>
                      <Select
                        value={settings.responseTime}
                        onValueChange={(value) => handleSettingChange("responseTime", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fast">Fast (Lower accuracy)</SelectItem>
                          <SelectItem value="balanced">Balanced</SelectItem>
                          <SelectItem value="accurate">Accurate (Slower)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Max Tokens per Request</Label>
                      <Input
                        type="number"
                        value={settings.maxTokens}
                        onChange={(e) => handleSettingChange("maxTokens", Number.parseInt(e.target.value))}
                        min={100}
                        max={4000}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Model Configuration</CardTitle>
                <CardDescription>Manage AI models and their usage across your platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAIModels.map((model) => (
                    <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{model.name}</h3>
                          <Badge className={getStatusColor(model.status)}>{model.status}</Badge>
                          <Badge variant="outline">{model.provider}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <span>
                            Usage: <span className={getUsageColor(model.usage)}>{model.usage}</span>
                          </span>
                          <span>Cost: {model.cost}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {model.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button size="sm" variant={model.status === "active" ? "destructive" : "default"}>
                          {model.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security & Privacy Settings
                </CardTitle>
                <CardDescription>Configure data protection and privacy controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Data Encryption</Label>
                      <p className="text-sm text-muted-foreground">Encrypt all AI processing data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Anonymous Processing</Label>
                      <p className="text-sm text-muted-foreground">Remove personal identifiers from AI requests</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all AI interactions for compliance</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Data Retention Period (days)</Label>
                  <Input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange("dataRetention", Number.parseInt(e.target.value))}
                    min={30}
                    max={365}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long to retain AI processing data for audit purposes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label>Content Filtering Rules</Label>
                  <Textarea placeholder="Define content filtering rules and restrictions..." rows={4} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI System Monitoring</CardTitle>
                <CardDescription>Monitor AI performance and usage across your institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">98.5%</p>
                    <p className="text-sm text-muted-foreground">System Uptime</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">1.2s</p>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-primary">15,420</p>
                    <p className="text-sm text-muted-foreground">Daily Requests</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-secondary">$2,340</p>
                    <p className="text-sm text-muted-foreground">Monthly Cost</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm">All AI services are operating normally</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm">High usage detected in Computer Science department</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>Detailed breakdown of AI feature usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Grading</span>
                      <span>8,420 requests</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Chat Assistant</span>
                      <span>4,230 conversations</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Content Generation</span>
                      <span>1,890 items</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-accent h-2 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Plagiarism Detection</span>
                      <span>2,340 scans</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </InstitutionLayout>
  )
}
