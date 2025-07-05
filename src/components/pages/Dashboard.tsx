import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Building, Package, AlertCircle, Plus, Calendar, Heart } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, router]);

  // Role-specific stats
  const stats = {
    admin: {
      totalPartners: 45,
      totalListings: 234,
      pendingApprovals: 12,
      totalBookings: 1567,
      monthlyRevenue: 2450000,
      activeUsers: 3456
    },
    partner: {
      totalListings: 12,
      activeBookings: 34,
      totalRevenue: 245000,
      avgRating: 4.6,
      monthlyBookings: [
        { month: "Jan", bookings: 15 },
        { month: "Feb", bookings: 23 },
        { month: "Mar", bookings: 34 },
        { month: "Apr", bookings: 28 }
      ]
    },
    user: {
      totalBookings: 8,
      wishlistItems: 12,
      lastBooking: "2024-06-15",
      memberSince: "January 2023"
    }
  };

  // Role-specific tabs configuration
  const tabConfig = {
    admin: [
      { value: "overview", label: "Overview" },
      { value: "partners", label: "Partners" },
      { value: "listings", label: "Listings" },
      { value: "approvals", label: "Approvals" },
      { value: "analytics", label: "Analytics" }
    ],
    partner: [
      { value: "overview", label: "Overview" },
      { value: "listings", label: "My Listings" },
      { value: "bookings", label: "Bookings" },
      { value: "profile", label: "Profile" }
    ],
    user: [
      { value: "overview", label: "Overview" },
      { value: "bookings", label: "My Bookings" },
      { value: "wishlist", label: "Wishlist" },
      { value: "profile", label: "Profile" }
    ]
  };

  // Get role-specific tabs configuration
  const currentTabs = tabConfig[user?.role as keyof typeof tabConfig] || tabConfig.user;

  // Role-specific header content
  const headerContent = {
    admin: {
      title: "Admin Dashboard",
      subtitle: "Sikkim Travel Platform Administration",
      action: (
        <Badge className="bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          {stats.admin.pendingApprovals} Pending
        </Badge>
      )
    },
    partner: {
      title: "Partner Dashboard",
      subtitle: "Welcome back, Sikkim Travel Co.",
      action: (
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Listing
        </Button>
      )
    },
    user: {
      title: "My Dashboard",
      subtitle: `Member since ${stats.user.memberSince}`,
      action: null
    }
  };

  // Get current header content
  const currentHeader = headerContent[user?.role as keyof typeof headerContent] || headerContent.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{currentHeader.title}</h1>
              <p className="text-gray-600">{currentHeader.subtitle}</p>
            </div>
            {currentHeader.action}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full grid-cols-${currentTabs.length}`}>
            {currentTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Role-specific overview content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {user?.role === "admin" && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
                      <Building className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.admin.totalPartners}</div>
                      <p className="text-xs text-muted-foreground">+5 new this month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.admin.totalListings}</div>
                      <p className="text-xs text-muted-foreground">+23 new this month</p>
                    </CardContent>
                  </Card>
                </>
              )}

              {user?.role === "partner" && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.partner.totalListings}</div>
                      <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.partner.activeBookings}</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                </>
              )}

              {user?.role === "user" && (
                <>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.user.totalBookings}</div>
                      <p className="text-xs text-muted-foreground">Last booking: {stats.user.lastBooking}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.user.wishlistItems}</div>
                      <p className="text-xs text-muted-foreground">Saved experiences</p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          {/* Additional tab contents can be added here based on role */}
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;