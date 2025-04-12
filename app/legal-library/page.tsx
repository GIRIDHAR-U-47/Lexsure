import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Download, Edit, FileText, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export default function LegalLibraryPage() {
  return (
    <div className="flex flex-col p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Library</h1>
        <p className="text-muted-foreground">Access India-specific legal resources and templates</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>India-Specific Legal Templates</CardTitle>
          <CardDescription>Ready-to-use templates for common startup legal needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search templates..." className="pl-8" />
              </div>
              <select className="flex h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <option value="">All Categories</option>
                <option value="founders">Founder Agreements</option>
                <option value="employment">Employment</option>
                <option value="service">Service Agreements</option>
                <option value="privacy">Privacy Policies</option>
                <option value="terms">Terms of Service</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {[
                {
                  title: "Founder Agreement",
                  category: "Founders",
                  description: "Comprehensive agreement between co-founders covering equity, roles, and vesting.",
                  downloads: 1245,
                },
                {
                  title: "Employment Agreement",
                  category: "Employment",
                  description: "Standard employment contract compliant with Indian labor laws.",
                  downloads: 2389,
                },
                {
                  title: "NDA Template",
                  category: "Confidentiality",
                  description: "Mutual non-disclosure agreement for business discussions.",
                  downloads: 3156,
                },
                {
                  title: "Service Agreement",
                  category: "Service",
                  description: "Contract for service providers with GST compliance clauses.",
                  downloads: 1876,
                },
                {
                  title: "Privacy Policy",
                  category: "Privacy",
                  description: "DPDPA-compliant privacy policy for websites and apps.",
                  downloads: 2245,
                },
                {
                  title: "Terms of Service",
                  category: "Terms",
                  description: "Website terms of service with Indian jurisdiction clauses.",
                  downloads: 1932,
                },
              ].map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="bg-muted p-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{item.category}</Badge>
                      <div className="text-xs text-muted-foreground">{item.downloads} downloads</div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                      <div className="pt-2 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="mr-2 h-3 w-3" />
                          Review
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="mr-2 h-3 w-3" />
                          Form Fill
                        </Button>
                        <Button size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Web Extension (Future Scope)</CardTitle>
          <CardDescription>Coming soon: Scan terms directly from websites</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 border rounded-md bg-muted/50">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Chrome Extension for Legal Analysis</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Our upcoming Chrome extension will allow you to scan Terms & Conditions and Privacy Policies directly from
              any website. Get instant risk analysis without leaving the page.
            </p>
            <Button variant="outline" disabled>
              Coming Soon
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
