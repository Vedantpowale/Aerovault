import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plane, ChevronDown, ChevronUp, Utensils, Luggage, Info } from "lucide-react"

interface Flight {
    id: string
    flight_number: string
    airline_name?: string
    company?: {
        company_name: string
    }
    source: string
    destination: string
    arrival_time: string
    price: number
    duration?: string
    departure_time: string
    meal_available: boolean
    status: string
}

interface FlightCardProps {
    flight: Flight
    onBook: (flight: Flight) => void
}

// Helper function to format time
const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper to calculate duration
const calculateDuration = (start: string, end: string) => {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diff = endTime - startTime;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
};

export function FlightCard({ flight, onBook }: FlightCardProps) {
    const [expanded, setExpanded] = useState(false);
    const companyName = flight.company?.company_name || flight.airline_name || "Unknown Airline";
    const duration = calculateDuration(flight.departure_time, flight.arrival_time);

    return (
        <Card className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-600 mb-4">
            <CardContent className="p-0">
                <div className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Airline Info & Status */}
                        <div className="flex items-center gap-4 w-full md:w-1/4">
                            <div className="bg-blue-50 p-3 rounded-full">
                                <Plane className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-900">{companyName}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-500 font-mono">{flight.flight_number}</p>
                                    <Badge variant={flight.status === 'cancelled' ? 'destructive' : 'secondary'} className="text-[10px] h-5">
                                        {flight.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        {/* Itinerary */}
                        <div className="flex items-center gap-4 w-full md:w-2/5 justify-center">
                            <div className="text-right">
                                <p className="font-bold text-xl text-gray-900">{formatTime(flight.departure_time)}</p>
                                <p className="text-sm text-gray-500 font-medium">{flight.source}</p>
                            </div>

                            <div className="flex flex-col items-center px-4 w-32">
                                <p className="text-xs text-gray-400 mb-1">{duration}</p>
                                <div className="w-full h-[2px] bg-gray-200 relative flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-gray-300 absolute left-0" />
                                    <Plane className="h-3 w-3 text-blue-600 absolute" />
                                    <div className="w-2 h-2 rounded-full bg-gray-300 absolute right-0" />
                                </div>
                                <p className="text-[10px] text-gray-400 mt-1">Non-stop</p>
                            </div>

                            <div className="text-left">
                                <p className="font-bold text-xl text-gray-900">{formatTime(flight.arrival_time)}</p>
                                <p className="text-sm text-gray-500 font-medium">{flight.destination}</p>
                            </div>
                        </div>

                        {/* Price & Action */}
                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-1/3 border-t md:border-t-0 pt-4 md:pt-0 mt-4 md:mt-0">
                            <div className="text-right">
                                <p className="text-xs text-gray-400 mb-0.5">Price per person</p>
                                <p className="text-2xl font-bold text-blue-600">₹{flight.price}</p>
                            </div>
                            <Button
                                onClick={() => onBook(flight)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base shadow-lg shadow-blue-200"
                                disabled={flight.status !== 'scheduled'}
                            >
                                {flight.status === 'scheduled' ? 'Book Now' : 'Unavailable'}
                            </Button>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-dashed border-gray-200">
                        {flight.meal_available && (
                            <div className="flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                                <Utensils className="h-3 w-3" /> Free Meal
                            </div>
                        )}
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-xs text-blue-600 font-medium flex items-center gap-1 hover:underline ml-auto focus:outline-none"
                        >
                            {expanded ? "Hide Details" : "View Flight Details"}
                            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                        </button>
                    </div>
                </div>

                {/* Expanded Details */}
                {expanded && (
                    <div className="bg-gray-50 p-6 border-t animate-in slide-in-from-top-2 duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Luggage className="h-4 w-4 text-gray-500" /> Baggage
                                </h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>Check-in: 15kg (1 piece)</li>
                                    <li>Cabin: 7kg (1 piece)</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Plane className="h-4 w-4 text-gray-500" /> Aircraft Info
                                </h4>
                                <p className="text-xs text-gray-600">
                                    Airbus A320neo • Narrow body
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <Info className="h-4 w-4 text-gray-500" /> Booking Policy
                                </h4>
                                <p className="text-xs text-gray-600">
                                    Cancellation fee: ₹50 before 24h.
                                    <br />
                                    Non-refundable within 24h.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
