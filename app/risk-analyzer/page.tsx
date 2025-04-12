import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, FileText, Info, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function RiskAnalyzerPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Risk Analyzer</h1>
        <p className="text-muted-foreground">Review and manage potential risks in your legal documents</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="document">Document Analysis</TabsTrigger>
          <TabsTrigger value="clauses">Risky Clauses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Should be reviewed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Standard clauses</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Summary</CardTitle>
              <CardDescription>Overview of risks across all your documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    category: "Auto-renewal clauses",
                    count: 2,
                    severity: "high",
                    description: "Contracts with automatic renewal terms that may lead to unexpected charges",
                  },
                  {
                    category: "Non-refundable deposits",
                    count: 1,
                    severity: "high",
                    description: "Clauses that prevent refund of deposits under any circumstances",
                  },
                  {
                    category: "Arbitration outside India",
                    count: 3,
                    severity: "medium",
                    description: "Dispute resolution clauses requiring arbitration in foreign jurisdictions",
                  },
                  {
                    category: "Unlimited liability",
                    count: 2,
                    severity: "medium",
                    description: "Clauses that do not cap your liability for damages",
                  },
                  {
                    category: "Termination penalties",
                    count: 3,
                    severity: "low",
                    description: "Standard early termination fees within reasonable limits",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.severity === "high"
                            ? "bg-red-500"
                            : item.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.category}</span>
                          <Badge
                            variant={
                              item.severity === "high"
                                ? "destructive"
                                : item.severity === "medium"
                                  ? "default"
                                  : "outline"
                            }
                          >
                            {item.count} {item.count === 1 ? "instance" : "instances"}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="document" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Risk Analysis</CardTitle>
              <CardDescription>Select a document to view its risk assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Select a document</option>
                    <option value="vendor">Vendor Agreement</option>
                    <option value="lease">Office Lease</option>
                    <option value="client">Client Contract</option>
                    <option value="employment">Employment Agreement</option>
                    <option value="privacy">Privacy Policy</option>
                  </select>
                  <Button>Analyze</Button>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      <h3 className="font-medium">Vendor Agreement</h3>
                    </div>
                    <Badge variant="outline">PDF</Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Overall Risk Assessment: High</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Risk Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Auto-renewal clause</span>
                          <Badge variant="destructive">High Risk</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Payment terms</span>
                          <Badge variant="default">Medium Risk</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Confidentiality</span>
                          <Badge variant="outline">Low Risk</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Termination</span>
                          <Badge variant="outline">Low Risk</Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">View Detailed Analysis</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clauses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risky Clauses</CardTitle>
              <CardDescription>Detailed analysis of potentially problematic clauses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Auto-renewal clause in Vendor Agreement</h3>
                  </div>

                  <div className="rounded-md bg-muted p-4 text-sm">
                    <p className="italic">
                      "This Agreement shall automatically renew for successive twelve (12) month periods unless either
                      party provides written notice of non-renewal at least ninety (90) days prior to the end of the
                      then-current term."
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-primary mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-medium">Risk Analysis</span>
                        <p className="text-sm text-muted-foreground">
                          This clause creates an auto-renewal trap with a long 90-day notice period. If you miss the
                          window, you're locked in for another full year. Under Indian Contract Act, such terms may be
                          considered unfair if they create significant imbalance.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-medium">Recommendation</span>
                        <p className="text-sm text-muted-foreground">
                          Negotiate for a shorter renewal period (monthly or quarterly) and/or a shorter notice period
                          (30 days). Alternatively, request removal of auto-renewal entirely in favor of explicit
                          renewal.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      Copy Analysis
                    </Button>
                    <Button size="sm">Request Amendment</Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <h3 className="font-medium">Non-refundable deposit clause in Office Lease</h3>
                    </div>

                    <div className="rounded-md bg-muted p-4 text-sm">
                      <p className="italic">
                        "Tenant shall pay a security deposit of ₹5,00,000 which shall be non-refundable under any
                        circumstances, including but not limited to early termination, breach by Landlord, or force
                        majeure events."
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-primary mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-medium">Risk Analysis</span>
                          <p className="text-sm text-muted-foreground">
                            This clause is potentially unenforceable under Indian law. The Transfer of Property Act and
                            various High Court rulings have established that security deposits must be refundable, minus
                            legitimate deductions for damages or unpaid rent.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div className="flex flex-col">
                          <span className="font-medium">Recommendation</span>
                          <p className="text-sm text-muted-foreground">
                            Request amendment to make the deposit refundable with specific conditions for legitimate
                            deductions. Cite relevant case law such as Forasol vs. ONGC (Delhi HC) which established
                            that forfeiture of security deposits is unconscionable.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Copy Analysis
                      </Button>
                      <Button size="sm">Request Amendment</Button>
                    </div>
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
