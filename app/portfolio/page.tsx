import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Target, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock portfolio data
const portfolioData = {
  totalValue: 2847.5,
  totalInvested: 2500.0,
  totalProfit: 347.5,
  profitPercentage: 13.9,
  activePositions: 12,
  resolvedBets: 28,
  winRate: 67.9,
}

const activePositions = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    side: "YES",
    amount: 250,
    shares: 373,
    currentPrice: 0.67,
    currentValue: 250,
    profit: 0,
    profitPercentage: 0,
  },
  {
    id: "2",
    title: "Will there be a recession in the US in 2024?",
    side: "NO",
    amount: 150,
    shares: 195,
    currentPrice: 0.77,
    currentValue: 150.15,
    profit: 0.15,
    profitPercentage: 0.1,
  },
  {
    id: "3",
    title: "Will Taylor Swift win a Grammy in 2024?",
    side: "YES",
    amount: 100,
    shares: 122,
    currentPrice: 0.82,
    currentValue: 100.04,
    profit: 0.04,
    profitPercentage: 0.04,
  },
]

const resolvedBets = [
  {
    id: "4",
    title: "Will the Lakers make the playoffs in 2024?",
    side: "YES",
    amount: 200,
    payout: 380,
    profit: 180,
    result: "WON",
    resolvedDate: "2024-04-15",
  },
  {
    id: "5",
    title: "Will inflation be above 3% in March 2024?",
    side: "NO",
    amount: 150,
    payout: 0,
    profit: -150,
    result: "LOST",
    resolvedDate: "2024-04-01",
  },
]

export default function PortfolioPage() {
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
              <h1 className="text-2xl font-bold">My Portfolio</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Export Data</Button>
              <Button>Add Funds</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${portfolioData.totalValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+${portfolioData.totalProfit.toFixed(2)} from invested</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{portfolioData.profitPercentage.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Since inception</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.activePositions}</div>
              <p className="text-xs text-muted-foreground">Currently trading</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioData.winRate}%</div>
              <p className="text-xs text-muted-foreground">{portfolioData.resolvedBets} resolved bets</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Details */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Positions</TabsTrigger>
            <TabsTrigger value="history">Betting History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Positions</CardTitle>
                <CardDescription>Your current open positions across all markets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activePositions.map((position) => (
                    <div key={position.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">
                            <Link href={`/market/${position.id}`} className="hover:text-primary">
                              {position.title}
                            </Link>
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={position.side === "YES" ? "default" : "secondary"}
                              className={position.side === "YES" ? "bg-green-600" : "bg-red-600"}
                            >
                              {position.side}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {position.shares} shares @ {(position.currentPrice * 100).toFixed(0)}¢
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${position.currentValue.toFixed(2)}</div>
                          <div className={`text-sm ${position.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {position.profit >= 0 ? "+" : ""}${position.profit.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Invested:</span>
                          <div className="font-medium">${position.amount}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Current Value:</span>
                          <div className="font-medium">${position.currentValue.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">P&L:</span>
                          <div className={`font-medium ${position.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {position.profit >= 0 ? "+" : ""}
                            {position.profitPercentage.toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resolved Bets</CardTitle>
                <CardDescription>Your completed predictions and their outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolvedBets.map((bet) => (
                    <div key={bet.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{bet.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={bet.side === "YES" ? "default" : "secondary"}
                              className={bet.side === "YES" ? "bg-green-600" : "bg-red-600"}
                            >
                              {bet.side}
                            </Badge>
                            <Badge
                              variant={bet.result === "WON" ? "default" : "destructive"}
                              className={bet.result === "WON" ? "bg-green-600" : "bg-red-600"}
                            >
                              {bet.result}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Resolved {bet.resolvedDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">${bet.payout.toFixed(2)}</div>
                          <div className={`text-sm ${bet.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {bet.profit >= 0 ? "+" : ""}${bet.profit.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Invested:</span>
                          <div className="font-medium">${bet.amount}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Payout:</span>
                          <div className="font-medium">${bet.payout.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Profit:</span>
                          <div className={`font-medium ${bet.profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {bet.profit >= 0 ? "+" : ""}${bet.profit.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance by Category</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sports</span>
                      <span className="text-green-600">+$180</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Politics</span>
                      <span className="text-red-600">-$50</span>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Technology</span>
                      <span className="text-green-600">+$120</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Economics</span>
                      <span className="text-green-600">+$97</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>January 2024</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">+$125</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>February 2024</span>
                    <div className="flex items-center gap-2">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      <span className="text-red-600">-$45</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>March 2024</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">+$267</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>April 2024</span>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-green-600">+$89</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
