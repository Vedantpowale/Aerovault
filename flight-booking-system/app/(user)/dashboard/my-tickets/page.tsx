import { createClient } from "@/utils/supabase/server"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plane, Calendar, Users, MapPin, FileText } from "lucide-react"
import Link from "next/link"

export default async function MyTicketsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return <div className="p-8 text-center">Please log in to view your tickets.</div>
    }

    // Fetch bookings with all related data
    const { data: bookings, error } = await supabase
        .from('bookings')
        .select(`
            *,
            flights (
                id,
                flight_number,
                source,
                destination,
                departure_time,
                arrival_time,
                price,
                company:flight_companies (
                    company_name,
                    logo_url
                )
            ),
            passengers (
                first_name,
                last_name,
                age,
                gender,
                email,
                phone
            ),
            flight_seats!flight_seats_booking_id_fkey (
                seat_number
            )
        `)
        .eq('user_id', user.id)
        .order('booking_date', { ascending: false })

    if (error) {
        console.error("Error fetching tickets:", error)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-24">
                <div className="px-4 mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tickets</h1>
                    <p className="text-gray-600">View and manage all your flight bookings</p>
                </div>

                <div className="px-4 space-y-6">
                    {bookings && bookings.length > 0 ? (
                        bookings.map((booking: any) => {
                            const flight = booking.flights
                            const passengers = booking.passengers || []
                            const seats = booking.flight_seats || []
                            const company = flight?.company

                            return (
                                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-2xl mb-1">
                                                    {flight?.source} → {flight?.destination}
                                                </CardTitle>
                                                <p className="text-blue-100 text-sm">
                                                    {company?.company_name || 'Airline'} • {flight?.flight_number}
                                                </p>
                                            </div>
                                            <Badge
                                                variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                                                className="bg-white text-blue-600 hover:bg-white"
                                            >
                                                {booking.status?.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                            {/* Flight Details */}
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Plane className="w-5 h-5 text-blue-600" />
                                                    Flight Details
                                                </h3>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-600">Departure:</span>
                                                        <span className="font-medium">
                                                            {flight?.departure_time ? new Date(flight.departure_time).toLocaleString() : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-600">Arrival:</span>
                                                        <span className="font-medium">
                                                            {flight?.arrival_time ? new Date(flight.arrival_time).toLocaleString() : 'N/A'}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-600">Seats:</span>
                                                        <div className="flex gap-1 flex-wrap">
                                                            {seats.map((seat: any, idx: number) => (
                                                                <span key={idx} className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                                                                    {seat.seat_number}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Passenger Details */}
                                            <div className="space-y-4">
                                                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                                                    <Users className="w-5 h-5 text-blue-600" />
                                                    Passengers ({passengers.length})
                                                </h3>
                                                <div className="space-y-2 text-sm">
                                                    {passengers.map((passenger: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                                                            <span className="font-medium text-gray-900">
                                                                {passenger.first_name} {passenger.last_name}
                                                            </span>
                                                            <span className="text-gray-500">•</span>
                                                            <span className="text-gray-600">
                                                                {passenger.gender}, {passenger.age}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Booking Info & Actions */}
                                        <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div className="space-y-1">
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-semibold">Ticket ID:</span> {booking.ticket_id || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-semibold">Invoice:</span> {booking.invoice_number || 'N/A'}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-semibold">Booked on:</span>{' '}
                                                    {new Date(booking.booking_date).toLocaleDateString()}
                                                </div>
                                                <div className="text-lg font-bold text-blue-600">
                                                    Total: ₹{booking.total_price}
                                                </div>
                                            </div>
                                            <Link href={`/dashboard/invoice/${booking.id}`}>
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                    <FileText className="w-4 h-4 mr-2" />
                                                    View Invoice
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })
                    ) : (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h3>
                                <p className="text-gray-600 mb-6">You haven't booked any flights yet.</p>
                                <Link href="/search">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Search Flights
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}
