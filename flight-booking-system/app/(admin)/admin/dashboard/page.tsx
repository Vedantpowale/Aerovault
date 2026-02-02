import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Plane, CreditCard, Activity } from "lucide-react"

export default async function AdminDashboard() {
    const supabase = await createClient()

    // Verify Admin Role (Pseudo-check, real check should be stricter in middleware/RLS)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        redirect('/login')
    }

    // Fetch Stats (Mocked for now or simple count)
    // const { count: userCount } = await supabase.from('users').select('*', { count: 'exact' })
    // const { count: flightCount } = await supabase.from('flights').select('*', { count: 'exact' })

    const userCount = 120
    const flightCount = 45
    const totalRevenue = "$12,450"

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-24">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{userCount}</div>
                                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Flights</CardTitle>
                                <Plane className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{flightCount}</div>
                                <p className="text-xs text-muted-foreground">+4 new routes added</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{totalRevenue}</div>
                                <p className="text-xs text-muted-foreground">+12% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Management Tabs */}
                    <Tabs defaultValue="overview" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="users">Manage Users</TabsTrigger>
                            <TabsTrigger value="companies">Flight Companies</TabsTrigger>
                            <TabsTrigger value="reports">Reports</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>System Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <div className="h-[200px] flex items-center justify-center text-gray-500">
                                        <Activity className="mr-2" /> Activity Chart Placeholder
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="users">
                            <Card>
                                <CardHeader><CardTitle>User Management</CardTitle></CardHeader>
                                <CardContent>List of users will go here.</CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="companies">
                            <Card>
                                <CardHeader><CardTitle>Flight Companies</CardTitle></CardHeader>
                                <CardContent>List of airlines will go here.</CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
