"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Plane, User, LogOut, Ticket } from "lucide-react"

export default function Navbar() {
    const pathname = usePathname()

    const [user, setUser] = useState<any>(null)
    const [mounted, setMounted] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        setMounted(true)

        const checkUser = async () => {
            const { data } = await supabase.auth.getUser()
            setUser(data.user)
        }
        checkUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = '/'
    }

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="bg-blue-600 p-2 rounded-full">
                            <Plane className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            SkyWings
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            Home
                        </Link>
                        <Link href="/search" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                            Book Flight
                        </Link>
                        <Link href="/tracker" className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
                            <Plane className="h-4 w-4" /> Live Status
                        </Link>
                        {mounted && user && (
                            <Link href="/dashboard/my-tickets" className="text-gray-700 hover:text-blue-600 transition-colors font-medium flex items-center gap-1">
                                <Ticket className="h-4 w-4" /> My Tickets
                            </Link>
                        )}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {!mounted ? (
                            <div className="h-10 w-32" />
                        ) : user ? (
                            <>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                                    <LogOut className="h-5 w-5 text-red-500" />
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className="hidden md:flex gap-2 text-sm">
                                    <Link href="/login/admin" className="text-gray-500 hover:text-blue-600 transition-colors">
                                        Admin
                                    </Link>
                                    <Link href="/login/company" className="text-gray-500 hover:text-blue-600 transition-colors">
                                        Airline
                                    </Link>
                                </div>
                                <Link href="/login/user">
                                    <Button variant="ghost" className="text-gray-700 hover:text-blue-600 font-medium">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-full px-6 transition-all transform hover:scale-105">
                                        Sign Up
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
