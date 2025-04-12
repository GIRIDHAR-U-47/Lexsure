import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Info, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ClauseSuggestionsPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clause Suggestion Engine</h1>
        <p className="text-muted-foreground">
          Get AI-powered suggestions for missing or weak clauses in your contracts
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Missing Clause Suggestions</CardTitle>
          <CardDescription>
            Our AI has identified these important clauses that are missing from your documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                document: "Vendor Agreement",
                clause: "Dispute Resolution",
                importance: "high",
                suggestion:
                  "Any dispute arising out of or in connection with this Agreement shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, which arbitration shall be conducted in [City], India.",
                reason:
                  "Without a dispute resolution clause, any legal disputes would default to the court system, which can be time-consuming and expensive.",
              },
              {
                document: "Client Contract",
                clause: "Limitation of Liability",
                importance: "high",
                suggestion:
                  "In no event shall either Party be liable to the other Party for any indirect, incidental, consequential, special, exemplary or punitive damages, including lost profits, regardless of the form of action, whether in contract, tort or otherwise, even if such Party has been advised of the possibility of such damages.",
                reason:
                  "Without a limitation of liability clause, your company could be exposed to unlimited financial risk in case of disputes or damages.",
              },
              {
                document: "Employment Agreement",
                clause: "Intellectual Property Assignment",
                importance: "medium",
                suggestion:
                  "Employee agrees that all inventions, innovations, improvements, developments, methods, designs, analyses, drawings, reports, and all similar or related information which relates to Company's actual or anticipated business, and which are conceived, developed or made by Employee while employed by Company, shall belong exclusively to Company.",
                reason:
                  "Without an IP assignment clause, there could be ambiguity about ownership of work created by employees during their employment.",
              },
            ].map((item, index) => (
              <div key={index} className="space-y-4 pb-6 border-b last:border-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        item.importance === "high"
                          ? "bg-red-500"
                          : item.importance === "medium"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.clause}</span>
                        <Badge
                          variant={
                            item.importance === "high"
                              ? "destructive"
                              : item.importance === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {item.importance} priority
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">Missing in: {item.document}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-primary mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-medium">Why it's needed</span>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="font-medium">Suggested clause</span>
                      <div className="mt-1 rounded-md bg-muted p-3 text-sm">
                        <p>{item.suggestion}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Copy Clause
                  </Button>
                  <Button variant="outline" size="sm">
                    Customize
                  </Button>
                  <Button size="sm">
                    <Plus className="mr-1 h-3 w-3" />
                    Add to Document
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
