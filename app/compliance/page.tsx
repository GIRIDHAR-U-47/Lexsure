"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Calendar, CheckCircle, Clock, Download, FileText, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type ComplianceItem = {
  id: string
  title: string
  category: string
  authority: string
  date: string
  daysLeft: number
  priority: "high" | "medium" | "low"
}

export default function CompliancePage() {
  const { toast } = useToast()
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      title: "GST Filing - GSTR-3B",
      category: "Tax",
      authority: "GST Council",
      date: "May 20, 2025",
      daysLeft: 3,
      priority: "high",
    },
    {
      id: "2",
      title: "MCA Annual Return",
      category: "Corporate",
      authority: "Ministry of Corporate Affairs",
      date: "June 5, 2025",
      daysLeft: 19,
      priority: "medium",
    },
    {
      id: "3",
      title: "TDS Payment",
      category: "Tax",
      authority: "Income Tax Department",
      date: "June 7, 2025",
      daysLeft: 21,
      priority: "medium",
    },
    {
      id: "4",
      title: "SEBI Quarterly Compliance",
      category: "Securities",
      authority: "SEBI",
      date: "June 15, 2025",
      daysLeft: 29,
      priority: "low",
    },
    {
      id: "5",
      title: "ESI Contribution",
      category: "Labor",
      authority: "ESIC",
      date: "June 21, 2025",
      daysLeft: 35,
      priority: "low",
    },
  ])

  const [newCompliance, setNewCompliance] = useState({
    title: "",
    category: "",
    authority: "",
    date: "",
  })

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddCompliance = () => {
    if (!newCompliance.title || !newCompliance.category || !newCompliance.date) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Calculate days left
    const today = new Date()
    const dueDate = new Date(newCompliance.date)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    // Determine priority based on days left
    let priority: "high" | "medium" | "low" = "low"
    if (diffDays <= 7) {
      priority = "high"
    } else if (diffDays <= 14) {
      priority = "medium"
    }

    const newItem: ComplianceItem = {
      id: Date.now().toString(),
      title: newCompliance.title,
      category: newCompliance.category,
      authority: newCompliance.authority || "Not specified",
      date: new Date(newCompliance.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      daysLeft: diffDays,
      priority,
    }

    setComplianceItems((prev) => [...prev, newItem])
    setNewCompliance({
      title: "",
      category: "",
      authority: "",
      date: "",
    })
    setIsDialogOpen(false)

    toast({
      title: "Compliance added",
      description: "Your new compliance item has been added successfully",
    })
  }

  return (
    <div className="flex flex-col p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Compliance Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage your regulatory compliance requirements</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Compliance
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Compliance</DialogTitle>
              <DialogDescription>Enter the details of your compliance requirement.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newCompliance.title}
                  onChange={(e) => setNewCompliance({ ...newCompliance, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <select
                  id="category"
                  value={newCompliance.category}
                  onChange={(e) => setNewCompliance({ ...newCompliance, category: e.target.value })}
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select category</option>
                  <option value="Tax">Tax</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Labor">Labor</option>
                  <option value="Securities">Securities</option>
                  <option value="Regulatory">Regulatory</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="authority" className="text-right">
                  Authority
                </Label>
                <Input
                  id="authority"
                  value={newCompliance.authority}
                  onChange={(e) => setNewCompliance({ ...newCompliance, authority: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={newCompliance.date}
                  onChange={(e) => setNewCompliance({ ...newCompliance, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddCompliance}>
                Add Compliance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <Progress value={87} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Next: GST Filing in 3 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">TDS Payment - 2 days overdue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Out of 14 total requirements</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="overdue">Overdue</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Compliance Deadlines</CardTitle>
              <CardDescription>Tasks that need to be completed soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          item.priority === "high"
                            ? "bg-red-500"
                            : item.priority === "medium"
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span>{item.authority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.date}</span>
                        </div>
                        <span
                          className={`text-xs ${
                            item.daysLeft <= 7
                              ? "text-red-500"
                              : item.daysLeft <= 14
                                ? "text-amber-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          {item.daysLeft} days left
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overdue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Overdue Compliance Tasks</CardTitle>
              <CardDescription>Tasks that have passed their deadline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "TDS Payment - April",
                    category: "Tax",
                    authority: "Income Tax Department",
                    date: "May 15, 2025",
                    daysOverdue: 2,
                    priority: "high",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span>{item.authority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.date}</span>
                        </div>
                        <span className="text-xs text-red-500">{item.daysOverdue} days overdue</span>
                      </div>
                      <Button variant="destructive" size="sm">
                        Urgent Action
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-center p-4 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <p className="font-medium">Overdue tasks require immediate attention</p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Failure to complete these tasks may result in penalties or legal consequences. Contact our support
                      team if you need assistance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Completed Compliance Tasks</CardTitle>
              <CardDescription>Tasks that have been successfully completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "GST Filing - GSTR-1",
                    category: "Tax",
                    authority: "GST Council",
                    completedDate: "May 10, 2025",
                    dueDate: "May 11, 2025",
                  },
                  {
                    title: "PF Contribution",
                    category: "Labor",
                    authority: "EPFO",
                    completedDate: "May 8, 2025",
                    dueDate: "May 15, 2025",
                  },
                  {
                    title: "Board Meeting Minutes Filing",
                    category: "Corporate",
                    authority: "MCA",
                    completedDate: "April 28, 2025",
                    dueDate: "April 30, 2025",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <div className="flex flex-col">
                        <span className="font-medium">{item.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                          <span>{item.authority}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1">
                          <span className="text-sm">Completed: {item.completedDate}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Due: {item.dueDate}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Compliance Requirements</CardTitle>
              <CardDescription>Complete list of regulatory requirements for your business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Filter by category</option>
                    <option value="tax">Tax</option>
                    <option value="corporate">Corporate</option>
                    <option value="labor">Labor</option>
                    <option value="securities">Securities</option>
                  </select>
                  <Button variant="outline">Filter</Button>
                </div>

                <div className="rounded-md border">
                  <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
                    <div>Requirement</div>
                    <div>Category</div>
                    <div>Authority</div>
                    <div>Frequency</div>
                    <div>Next Due Date</div>
                  </div>

                  {[
                    {
                      title: "GST Filing - GSTR-3B",
                      category: "Tax",
                      authority: "GST Council",
                      frequency: "Monthly",
                      nextDue: "May 20, 2025",
                      status: "upcoming",
                    },
                    {
                      title: "TDS Payment",
                      category: "Tax",
                      authority: "Income Tax Department",
                      frequency: "Monthly",
                      nextDue: "May 15, 2025",
                      status: "overdue",
                    },
                    {
                      title: "PF Contribution",
                      category: "Labor",
                      authority: "EPFO",
                      frequency: "Monthly",
                      nextDue: "June 15, 2025",
                      status: "upcoming",
                    },
                    {
                      title: "MCA Annual Return",
                      category: "Corporate",
                      authority: "MCA",
                      frequency: "Yearly",
                      nextDue: "June 5, 2025",
                      status: "upcoming",
                    },
                    {
                      title: "SEBI Quarterly Compliance",
                      category: "Securities",
                      authority: "SEBI",
                      frequency: "Quarterly",
                      nextDue: "June 15, 2025",
                      status: "upcoming",
                    },
                  ].map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 p-4 text-sm border-b">
                      <div className="font-medium">{item.title}</div>
                      <div>{item.category}</div>
                      <div>{item.authority}</div>
                      <div>{item.frequency}</div>
                      <div className="flex items-center gap-2">
                        <span>{item.nextDue}</span>
                        <Badge
                          variant={
                            item.status === "overdue"
                              ? "destructive"
                              : item.status === "upcoming"
                                ? "default"
                                : "outline"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
