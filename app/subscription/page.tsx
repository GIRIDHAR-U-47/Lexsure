"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Lock,
  Shield,
  BarChart3,
  Users,
  Database,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [currentPlan, setCurrentPlan] = useState("pro")

  const handleBillingCycleChange = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")
  }

  const getDiscountedPrice = (price: number) => {
    return Math.round(price * 0.8) // 20% discount for yearly
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-muted-foreground">Manage your subscription plan and payment details</p>
      </div>

      <Card className="border-[#8C9EFF]/30 bg-[#F4F6F8]/50">
        <CardHeader className="pb-3">
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Your current subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">Pro Plan</span>
                <Badge className="bg-[#8C9EFF] hover:bg-[#8C9EFF]/80">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Billed {billingCycle === "monthly" ? "monthly" : "annually"} • Next payment on May 15, 2025
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="transition-all hover:bg-[#1E2A38] hover:text-white">
                Manage Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Choose a Plan</h2>
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${billingCycle === "monthly" ? "font-medium" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch id="billing-cycle" checked={billingCycle === "yearly"} onCheckedChange={handleBillingCycleChange} />
          <span className={`text-sm ${billingCycle === "yearly" ? "font-medium" : "text-muted-foreground"}`}>
            Yearly{" "}
            <Badge variant="outline" className="ml-1 bg-green-500/10 text-green-600 border-green-500/20">
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Starter Plan */}
        <Card className="border-[#8C9EFF]/30 transition-all hover:shadow-md hover:border-[#8C9EFF]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Starter Plan</CardTitle>
            <CardDescription>For small legal practices</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">
                ₹{billingCycle === "monthly" ? "1,499" : getDiscountedPrice(1499)}
              </span>
              <span className="text-muted-foreground">
                /{billingCycle === "monthly" ? "month" : "month, billed yearly"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Up to 50 document analyses per month</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Basic risk analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>10 GB secure document storage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#1E2A38] hover:bg-[#1E2A38]/80 transition-all"
              onClick={() => setCurrentPlan("starter")}
            >
              {currentPlan === "starter" ? "Current Plan" : "Subscribe Now"}
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card
          className={`border-[#8C9EFF] ${currentPlan === "pro" ? "bg-[#8C9EFF]/5" : ""} transition-all hover:shadow-md relative overflow-hidden`}
        >
          {currentPlan === "pro" && (
            <div className="absolute top-0 right-0">
              <Badge className="rounded-none rounded-bl-md bg-[#8C9EFF]">Current</Badge>
            </div>
          )}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#8C9EFF]"></div>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pro Plan</CardTitle>
            <CardDescription>For growing legal teams</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">
                ₹{billingCycle === "monthly" ? "2,999" : getDiscountedPrice(2999)}
              </span>
              <span className="text-muted-foreground">
                /{billingCycle === "monthly" ? "month" : "month, billed yearly"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Unlimited document analyses</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Advanced risk analysis with recommendations</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>50 GB secure document storage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Priority email & chat support</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Compliance tracking for up to 50 requirements</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#8C9EFF] hover:bg-[#8C9EFF]/80 text-[#1E2A38] transition-all"
              onClick={() => setCurrentPlan("pro")}
            >
              {currentPlan === "pro" ? "Current Plan" : "Upgrade Plan"}
            </Button>
          </CardFooter>
        </Card>

        {/* Enterprise Plan */}
        <Card className="border-[#8C9EFF]/30 transition-all hover:shadow-md hover:border-[#8C9EFF]">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Enterprise Plan</CardTitle>
            <CardDescription>For law firms and legal departments</CardDescription>
            <div className="mt-2">
              <span className="text-3xl font-bold">
                ₹{billingCycle === "monthly" ? "7,499" : getDiscountedPrice(7499)}
              </span>
              <span className="text-muted-foreground">
                /{billingCycle === "monthly" ? "month" : "month, billed yearly"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Everything in Pro, plus:</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Custom AI training on your legal documents</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Unlimited secure document storage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <span>API access for custom integrations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-[#1E2A38] hover:bg-[#1E2A38]/80 transition-all"
              onClick={() => setCurrentPlan("enterprise")}
            >
              {currentPlan === "enterprise" ? "Current Plan" : "Contact Sales"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="payment" className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span>Payment Methods</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Billing History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-[#1E2A38] p-2 text-white">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">HDFC Bank •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 04/2026</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              <Button variant="outline" className="transition-all hover:bg-[#1E2A38] hover:text-white">
                <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="py-2 px-3 text-left font-medium">Invoice</th>
                      <th className="py-2 px-3 text-left font-medium">Date</th>
                      <th className="py-2 px-3 text-left font-medium">Amount</th>
                      <th className="py-2 px-3 text-left font-medium">Status</th>
                      <th className="py-2 px-3 text-right font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "INV-2025-004", date: "Apr 1, 2025", amount: "₹2,999", status: "Paid" },
                      { id: "INV-2025-003", date: "Mar 1, 2025", amount: "₹2,999", status: "Paid" },
                      { id: "INV-2025-002", date: "Feb 1, 2025", amount: "₹2,999", status: "Paid" },
                      { id: "INV-2025-001", date: "Jan 1, 2025", amount: "₹2,999", status: "Paid" },
                    ].map((invoice) => (
                      <tr key={invoice.id} className="border-t">
                        <td className="py-2 px-3">{invoice.id}</td>
                        <td className="py-2 px-3">{invoice.date}</td>
                        <td className="py-2 px-3">{invoice.amount}</td>
                        <td className="py-2 px-3">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Plan Comparison</CardTitle>
          <CardDescription>Compare features across different plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3 text-left font-medium">Feature</th>
                  <th className="py-2 px-3 text-center font-medium">Starter</th>
                  <th className="py-2 px-3 text-center font-medium">Pro</th>
                  <th className="py-2 px-3 text-center font-medium">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Document Analysis</span>
                  </td>
                  <td className="py-2 px-3 text-center">50/month</td>
                  <td className="py-2 px-3 text-center">Unlimited</td>
                  <td className="py-2 px-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Risk Analysis</span>
                  </td>
                  <td className="py-2 px-3 text-center">Basic</td>
                  <td className="py-2 px-3 text-center">Advanced</td>
                  <td className="py-2 px-3 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Storage</span>
                  </td>
                  <td className="py-2 px-3 text-center">10 GB</td>
                  <td className="py-2 px-3 text-center">50 GB</td>
                  <td className="py-2 px-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Team Members</span>
                  </td>
                  <td className="py-2 px-3 text-center">2</td>
                  <td className="py-2 px-3 text-center">10</td>
                  <td className="py-2 px-3 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Support Response Time</span>
                  </td>
                  <td className="py-2 px-3 text-center">48 hours</td>
                  <td className="py-2 px-3 text-center">24 hours</td>
                  <td className="py-2 px-3 text-center">4 hours</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-[#8C9EFF]" />
                    <span>Analytics Dashboard</span>
                  </td>
                  <td className="py-2 px-3 text-center">Basic</td>
                  <td className="py-2 px-3 text-center">Advanced</td>
                  <td className="py-2 px-3 text-center">Custom</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-[#8C9EFF]" />
                    <span>API Access</span>
                  </td>
                  <td className="py-2 px-3 text-center">—</td>
                  <td className="py-2 px-3 text-center">Limited</td>
                  <td className="py-2 px-3 text-center">Full</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="bg-[#F4F6F8] rounded-lg p-4 border border-[#8C9EFF]/20">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-[#8C9EFF] mt-1" />
          <div>
            <h3 className="font-medium">Secure Billing</h3>
            <p className="text-sm text-muted-foreground">
              Your payment information is encrypted and securely processed. We use industry-standard security measures
              to protect your data.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
