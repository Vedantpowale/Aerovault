import Link from "next/link"
import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { FlightSearchForm } from "@/components/flights/flight-search-form"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 selection:bg-blue-100">
      <Navbar />

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-30 transform translate-x-1/2 -translate-y-1/4">
          <div className="w-[800px] h-[800px] bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-30 transform -translate-x-1/3 translate-y-1/4">
          <div className="w-[600px] h-[600px] bg-gradient-to-tr from-purple-400 to-pink-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-8">
            Explore the World with <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Premium Comfort
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            Experience seamless booking, real-time tracking, and exclusive deals. Your journey begins with a single click.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all transform hover:scale-105">
                Book a Flight
              </Button>
            </Link>
            <Link href="/tracker">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 bg-white/50 backdrop-blur-sm transition-all">
                Track Flight
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-2 border border-white/50">
          <FlightSearchForm />
        </div>
      </div>
    </div>
  )
}
