import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Clock, Users, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock data - in a real app, this would come from your database
const featuredMarkets = [
  {
    id: "1",
    title: "Will Bitcoin reach $100,000 by end of 2024?",
    description: "Market resolves based on Bitcoin's price on major exchanges at 11:59 PM UTC on December 31, 2024",
    category: "Crypto",
    yesPrice: 0.67,
    noPrice: 0.33,
    volume: 125000,
    participants: 1247,
    endDate: "2024-12-31",
    trending: "up",
  },
  {
    id: "2",
    title: "Will there be a recession in the US in 2024?",
    description: "Market resolves YES if NBER officially declares a recession that begins in 2024",
    category: "Economics",
    yesPrice: 0.23,
    noPrice: 0.77,
    volume: 89000,
    participants: 892,
    endDate: "2024-12-31",
    trending: "down",
  },
  {
    id: "3",
    title: "Will SpaceX successfully land humans on Mars by 2030?",
    description: "Market resolves YES if SpaceX successfully lands at least one human on Mars by December 31, 2030",
    category: "Technology",
    yesPrice: 0.15,
    noPrice: 0.85,
    volume: 67000,
    participants: 543,
    endDate: "2030-12-31",
    trending: "up",
  },
  {
    id: "4",
    title: "Will Taylor Swift win a Grammy in 2024?",
    description: "Market resolves YES if Taylor Swift wins any Grammy award at the 2024 ceremony",
    category: "Entertainment",
    yesPrice: 0.82,
    noPrice: 0.18,
    volume: 45000,
    participants: 1891,
    endDate: "2024-02-04",
    trending: "up",
  },
]

const categories = ["All", "Politics", "Sports", "Technology", "Economics", "Entertainment", "Crypto"]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">PredictMarket</h1>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-foreground hover:text-primary">
                  Markets
                </Link>
                <Link href="/portfolio" className="text-muted-foreground hover:text-primary">
                  Portfolio
                </Link>
                <Link href="/create" className="text-muted-foreground hover:text-primary">
                  Create Market
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Predict the Future, Earn Rewards</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Trade on the outcomes of real-world events. Use your knowledge and intuition to profit from accurate
            predictions.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Start Trading</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">$2.4M</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15,247</div>
              <div className="text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,892</div>
              <div className="text-sm text-muted-foreground">Markets Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">94.2%</div>
              <div className="text-sm text-muted-foreground">Resolution Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Featured Markets</h3>
            <Button variant="outline">View All Markets</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMarkets.map((market) => (
              <Card key={market.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{market.category}</Badge>
                        {market.trending === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight mb-2">
                        <Link href={`/market/${market.id}`} className="hover:text-primary">
                          {market.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm">{market.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Price Display */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">YES</div>
                        <div className="text-2xl font-bold text-green-600">{(market.yesPrice * 100).toFixed(0)}¢</div>
                      </div>
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">NO</div>
                        <div className="text-2xl font-bold text-red-600">{(market.noPrice * 100).toFixed(0)}¢</div>
                      </div>
                    </div>

                    {/* Market Stats */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>${(market.volume / 1000).toFixed(0)}k volume</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{market.participants} traders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>Ends {market.endDate}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">Buy YES</Button>
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent">
                        Buy NO
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">PredictMarket</h4>
              <p className="text-sm text-muted-foreground">The world's most trusted prediction market platform.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Markets</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Politics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Economics
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    API Docs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Risk Disclosure
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 PredictMarket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
