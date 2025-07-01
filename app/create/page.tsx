"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, X, DollarSign, AlertCircle } from "lucide-react"
import Link from "next/link"

const categories = [
  "Politics",
  "Sports",
  "Technology",
  "Economics",
  "Entertainment",
  "Crypto",
  "Science",
  "Weather",
  "Business",
  "Other",
]

export default function CreateMarketPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    endDate: "",
    resolutionSource: "",
    initialLiquidity: "",
  })

  const [rules, setRules] = useState<string[]>([""])
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addRule = () => {
    setRules([...rules, ""])
  }

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules]
    newRules[index] = value
    setRules(newRules)
  }

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would submit to your backend
    console.log("Creating market:", { ...formData, rules, tags })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <ArrowLeft className="w-4 h-4" />
                Back to Markets
              </Link>
              <h1 className="text-2xl font-bold">Create New Market</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Save Draft</Button>
              <Button form="create-market-form">Create Market</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form id="create-market-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide the essential details for your prediction market</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Market Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Will Bitcoin reach $100,000 by end of 2024?"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Make it clear and specific. This is what traders will see first.
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="description">Detailed Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide detailed information about how this market will be resolved, including specific criteria, data sources, and any edge cases..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="endDate">Resolution Date *</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resolution Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle>Resolution Rules</CardTitle>
                    <CardDescription>Define clear rules for how this market will be resolved</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="resolutionSource">Primary Resolution Source *</Label>
                      <Input
                        id="resolutionSource"
                        placeholder="e.g., CoinMarketCap, Reuters, Official Government Website"
                        value={formData.resolutionSource}
                        onChange={(e) => setFormData({ ...formData, resolutionSource: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label>Resolution Criteria</Label>
                      <div className="space-y-2">
                        {rules.map((rule, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder={`Rule ${index + 1}`}
                              value={rule}
                              onChange={(e) => updateRule(index, e.target.value)}
                            />
                            {rules.length > 1 && (
                              <Button type="button" variant="outline" size="icon" onClick={() => removeRule(index)}>
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button type="button" variant="outline" onClick={addRule} className="w-full bg-transparent">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Rule
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Market Settings</CardTitle>
                    <CardDescription>Configure the trading parameters for your market</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="initialLiquidity">Initial Liquidity ($)</Label>
                      <Input
                        id="initialLiquidity"
                        type="number"
                        placeholder="1000"
                        value={formData.initialLiquidity}
                        onChange={(e) => setFormData({ ...formData, initialLiquidity: e.target.value })}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Higher liquidity means better prices for traders. Minimum $100.
                      </p>
                    </div>

                    <div>
                      <Label>Tags</Label>
                      <div className="flex gap-2 mb-2">
                        <Input
                          placeholder="Add a tag"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag}>
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="cursor-pointer">
                            {tag}
                            <X className="w-3 h-3 ml-1" onClick={() => removeTag(tag)} />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Title</h4>
                      <p className="text-sm">{formData.title || "Your market title will appear here"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">Category</h4>
                      <p className="text-sm">{formData.category || "No category selected"}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-muted-foreground">End Date</h4>
                      <p className="text-sm">{formData.endDate || "No end date set"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-green-50 p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">YES</div>
                        <div className="text-lg font-bold text-green-600">50¢</div>
                      </div>
                      <div className="bg-red-50 p-2 rounded text-center">
                        <div className="text-xs text-muted-foreground">NO</div>
                        <div className="text-lg font-bold text-red-600">50¢</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Guidelines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h5 className="font-medium">Good Markets Have:</h5>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Clear, unambiguous resolution criteria</li>
                      <li>Specific end dates and data sources</li>
                      <li>Objective, verifiable outcomes</li>
                      <li>Reasonable time horizons</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium">Avoid:</h5>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Subjective or opinion-based questions</li>
                      <li>Markets that could be manipulated</li>
                      <li>Illegal or harmful content</li>
                      <li>Overly complex resolution criteria</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Fees */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Market Fees
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Creation Fee:</span>
                    <span className="font-medium">$10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Fee:</span>
                    <span className="font-medium">2% of volume</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution Fee:</span>
                    <span className="font-medium">$5</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>Total Upfront:</span>
                    <span>$15</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
