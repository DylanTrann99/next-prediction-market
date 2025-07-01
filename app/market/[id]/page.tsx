"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, TrendingUp, Users, DollarSign, Clock, Share, BookOpen } from "lucide-react"
import Link from "next/link"

// Mock market data
const marketData = {
  id: "1",
  title: "Will Bitcoin reach $100,000 by end of 2024?",
  description:
    "This market will resolve to YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major cryptocurrency exchange (Coinbase, Binance, Kraken) at any point before 11:59 PM UTC on December 31, 2024. The market will resolve to NO if Bitcoin does not reach this price by the deadline.",
  category: "Crypto",
  yesPrice: 0.67,
  noPrice: 0.33,
  volume: 125000,
  participants: 1247,
  endDate: "2024-12-31",
  createdBy: "CryptoAnalyst",
  createdDate: "2024-01-15",
  rules: [
    "Price must be reached on at least one of the specified major exchanges",
    "Market resolves immediately upon reaching $100,000",
    "If not reached by deadline, market resolves to NO",
    "Price data will be verified using multiple sources",
  ],
  priceHistory: [
    { date: "2024-01-15", yes: 0.45, no: 0.55 },
    { date: "2024-02-01", yes: 0.52, no: 0.48 },
    { date: "2024-03-01", yes: 0.61, no: 0.39 },
    { date: "2024-04-01", yes: 0.67, no: 0.33 },
  ],
}

export default function MarketPage({ params }: { params: { id: string } }) {
  const [betAmount, setBetAmount] = useState("")
  const [selectedSide, setSelectedSide] = useState<"yes" | "no">("yes")

  const handleBet = () => {
    // In a real app, this would submit the bet to your backend
    console.log(`Betting $${betAmount} on ${selectedSide.toUpperCase()}`)
  }

  const potentialPayout = betAmount
    ? (Number.parseFloat(betAmount) / (selectedSide === "yes" ? marketData.yesPrice : marketData.noPrice)).toFixed(2)
    : "0"

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
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{marketData.category}</Badge>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">{marketData.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">{marketData.description}</p>
            </div>

            {/* Market Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Market Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">${(marketData.volume / 1000).toFixed(0)}k</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      Total Volume
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{marketData.participants}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Users className="w-3 h-3" />
                      Traders
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{marketData.endDate}</div>
                    <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" />
                      End Date
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">67%</div>
                    <div className="text-sm text-muted-foreground">Market Confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for additional info */}
            <Tabs defaultValue="rules" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>

              <TabsContent value="rules" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Market Rules
                    </CardTitle>
                    <CardDescription>How this market will be resolved</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {marketData.rules.map((rule, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary font-semibold">{index + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>Created by:</strong> {marketData.createdBy} on {marketData.createdDate}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <span className="font-medium">User123</span> bought{" "}
                          <span className="font-bold text-green-600">YES</span> for $250
                        </div>
                        <span className="text-sm text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <span className="font-medium">Trader456</span> bought{" "}
                          <span className="font-bold text-red-600">NO</span> for $150
                        </div>
                        <span className="text-sm text-muted-foreground">5 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <span className="font-medium">CryptoFan</span> bought{" "}
                          <span className="font-bold text-green-600">YES</span> for $500
                        </div>
                        <span className="text-sm text-muted-foreground">12 min ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card>
                  <CardHeader>
                    <CardTitle>Discussion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">BitcoinBull</span>
                          <span className="text-sm text-muted-foreground">1 hour ago</span>
                        </div>
                        <p className="text-sm">
                          Looking at the current market trends and institutional adoption, I think we have a strong
                          chance of hitting $100k this year. The ETF approvals are a game changer.
                        </p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">SkepticalTrader</span>
                          <span className="text-sm text-muted-foreground">3 hours ago</span>
                        </div>
                        <p className="text-sm">
                          I'm not so sure. The regulatory environment is still uncertain and we've seen major
                          corrections before. 67¢ seems too optimistic to me.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Betting Panel */}
          <div className="space-y-6">
            {/* Current Prices */}
            <Card>
              <CardHeader>
                <CardTitle>Current Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedSide === "yes"
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-green-300"
                      }`}
                      onClick={() => setSelectedSide("yes")}
                    >
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">YES</div>
                        <div className="text-3xl font-bold text-green-600">
                          {(marketData.yesPrice * 100).toFixed(0)}¢
                        </div>
                      </div>
                    </div>
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedSide === "no" ? "border-red-500 bg-red-50" : "border-gray-200 hover:border-red-300"
                      }`}
                      onClick={() => setSelectedSide("no")}
                    >
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">NO</div>
                        <div className="text-3xl font-bold text-red-600">{(marketData.noPrice * 100).toFixed(0)}¢</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Progress value={marketData.yesPrice * 100} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{(marketData.yesPrice * 100).toFixed(0)}% YES</span>
                      <span>{(marketData.noPrice * 100).toFixed(0)}% NO</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Betting Form */}
            <Card>
              <CardHeader>
                <CardTitle>Place Your Bet</CardTitle>
                <CardDescription>
                  You're betting on{" "}
                  <span className={selectedSide === "yes" ? "text-green-600" : "text-red-600"}>
                    {selectedSide.toUpperCase()}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                </div>

                {betAmount && (
                  <div className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>You pay:</span>
                      <span className="font-medium">${betAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Potential payout:</span>
                      <span className="font-medium">${potentialPayout}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span>Potential profit:</span>
                      <span className="text-green-600">
                        ${(Number.parseFloat(potentialPayout) - Number.parseFloat(betAmount)).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <Button
                  className={`w-full ${
                    selectedSide === "yes" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
                  }`}
                  onClick={handleBet}
                  disabled={!betAmount || Number.parseFloat(betAmount) <= 0}
                >
                  Buy {selectedSide.toUpperCase()} for ${betAmount || "0"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By placing a bet, you agree to our Terms of Service
                </p>
              </CardContent>
            </Card>

            {/* Quick Bet Amounts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Amounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {["10", "25", "50", "100", "250", "500"].map((amount) => (
                    <Button key={amount} variant="outline" size="sm" onClick={() => setBetAmount(amount)}>
                      ${amount}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
