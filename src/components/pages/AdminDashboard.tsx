
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Users,
  Building,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  BarChart3
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const adminStats = {
    totalPartners: 45,
    totalListings: 234,
    pendingApprovals: 12,
    totalBookings: 1567,
    monthlyRevenue: 2450000,
    activeUsers: 3456
  };

  const pendingApprovals = [
    {
      id: 1,
      partnerName: "Himalayan Adventures",
      listingTitle: "Kanchenjunga Base Camp Trek",
      type: "Package",
      submittedDate: "2024-07-01",
      status: "pending"
    },
    {
      id: 2,
      partnerName: "Mountain View Stays",
      listingTitle: "Traditional Lepcha Homestay",
      type: "Homestay",
      submittedDate: "2024-07-02",
      status: "pending"
    },
    {
      id: 3,
      partnerName: "Sikkim Heritage Hotels",
      listingTitle: "Palace Heritage Resort",
      type: "Hotel",
      submittedDate: "2024-06-28",
      status: "under_review"
    }
  ];

  const recentPartners = [
    {
      id: 1,
      name: "Sikkim Travel Co.",
      contactPerson: "Tenzin Norbu",
      email: "contact@sikkimtravel.com",
      joinDate: "2024-06-15",
      status: "verified",
      listings: 8,
      rating: 4.6
    },
    {
      id: 2,
      name: "Mountain Adventures",
      contactPerson: "Karma Lama",
      email: "info@mountainadv.com",
      joinDate: "2024-06-20",
      status: "pending",
      listings: 3,
      rating: 4.8
    },
    {
      id: 3,
      name: "Homestay Sikkim",
      contactPerson: "Pemba Sherpa",
      email: "stay@homestaysikkim.com",
      joinDate: "2024-06-25",
      status: "verified",
      listings: 12,
      rating: 4.5
    }
  ];

  const topPerformingListings = [
    {
      id: 1,
      title: "Gangtok Adventure Tour",
      partner: "Sikkim Travel Co.",
      bookings: 45,
      revenue: 584550,
      rating: 4.8,
      category: "Package"
    },
    {
      id: 2,
      title: "Yumthang Valley Trek",
      partner: "Mountain Adventures",
      bookings: 32,
      revenue: 607680,
      rating: 4.9,
      category: "Package"
    },
    {
      id: 3,
      title: "Traditional Sikkimese Homestay",
      partner: "Homestay Sikkim",
      bookings: 28,
      revenue: 140000,
      rating: 4.7,
      category: "Homestay"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Sikkim Travel Platform Administration</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-red-100 text-red-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                {adminStats.pendingApprovals} Pending
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="listings">Listings</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalPartners}</div>
                  <p className="text-xs text-muted-foreground">+5 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalListings}</div>
                  <p className="text-xs text-muted-foreground">+23 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{adminStats.totalBookings.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{adminStats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+25% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{adminStats.pendingApprovals}</div>
                  <p className="text-xs text-muted-foreground">Requires attention</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Performing Listings */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Listings</CardTitle>
                <CardDescription>Best performing packages and accommodations</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Listing</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformingListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="font-medium">{listing.title}</TableCell>
                        <TableCell>{listing.partner}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{listing.category}</Badge>
                        </TableCell>
                        <TableCell>{listing.bookings}</TableCell>
                        <TableCell>₹{listing.revenue.toLocaleString()}</TableCell>
                        <TableCell className="flex items-center">
                          <span className="mr-1">{listing.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Partner Management</h2>
              <Button variant="outline">Export Partners</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Partners</CardTitle>
                <CardDescription>Manage registered travel partners</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner Name</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Listings</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPartners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell className="font-medium">{partner.name}</TableCell>
                        <TableCell>{partner.contactPerson}</TableCell>
                        <TableCell>{partner.email}</TableCell>
                        <TableCell>{partner.joinDate}</TableCell>
                        <TableCell>{partner.listings}</TableCell>
                        <TableCell>{partner.rating}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Pending Approvals</h2>
              <Badge className="bg-red-100 text-red-800">
                {pendingApprovals.length} items pending
              </Badge>
            </div>

            <div className="grid gap-4">
              {pendingApprovals.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold">{item.listingTitle}</h3>
                          <Badge variant="outline">{item.type}</Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Partner: {item.partnerName} • Submitted: {item.submittedDate}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Detailed insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-12">
                    <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600">Detailed charts and metrics will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
