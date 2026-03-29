"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown, IndianRupee, Loader2, PlaneTakeoff } from "lucide-react";

import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/client";
import { StickySearchBar } from "@/components/flights/sticky-search-bar";
import { FlightCard } from "@/components/flights/flight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type SortBy = "recommended" | "price-asc" | "departure-asc";

function formatDateLabel(dateValue: string | null) {
  if (!dateValue) return "Flexible date";
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return dateValue;
  return parsed.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" });
}

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortBy>("recommended");
  const [showScheduledOnly, setShowScheduledOnly] = useState(true);

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");
  const passengers = Number.parseInt(searchParams.get("passengers") || "1", 10);
  const fareClass = searchParams.get("class") || "economy";

  useEffect(() => {
    async function fetchFlights() {
      setLoading(true);

      let query = supabase
        .from("flights")
        .select("*, company:flight_companies(company_name)")
        .order("departure_time", { ascending: true });

      if (source) query = query.ilike("source", `%${source}%`);
      if (destination) query = query.ilike("destination", `%${destination}%`);

      if (date) {
        const dayStart = `${date}T00:00:00`;
        const dayEnd = `${date}T23:59:59`;
        query = query.gte("departure_time", dayStart).lte("departure_time", dayEnd);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching flights:", JSON.stringify(error, null, 2));
      } else {
        setFlights(data || []);
      }
      setLoading(false);
    }

    fetchFlights();
  }, [source, destination, date]);

  const visibleFlights = useMemo(() => {
    const onlyRelevant = showScheduledOnly
      ? flights.filter((flight) => String(flight.status || "").toLowerCase() === "scheduled")
      : [...flights];

    if (sortBy === "price-asc") {
      return [...onlyRelevant].sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }

    if (sortBy === "departure-asc") {
      return [...onlyRelevant].sort(
        (a, b) => new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime()
      );
    }

    return [...onlyRelevant].sort((a, b) => {
      const seatsA = Number(a.available_seats ?? 9999);
      const seatsB = Number(b.available_seats ?? 9999);
      const priceA = Number(a.price || 0);
      const priceB = Number(b.price || 0);
      return priceA - priceB || seatsB - seatsA;
    });
  }, [flights, sortBy, showScheduledOnly]);

  const handleBook = (flight: any) => {
    const pax = searchParams.get("passengers") || "1";
    router.push(`/book/${flight.id}?passengers=${pax}`);
  };

  const summaryTitle =
    source && destination
      ? `${source.toUpperCase()} → ${destination.toUpperCase()}`
      : "Available Flights";

  return (
    <>
      <StickySearchBar />

      <main className="relative z-10 mx-auto mt-8 max-w-6xl px-4 pb-20">
        <section className="mb-5 rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-sky-50/70 to-indigo-50 p-5 shadow-sm md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Search Snapshot</p>
              <h2 className="mt-1 text-2xl font-black text-slate-900 md:text-3xl">{summaryTitle}</h2>
              <p className="mt-1 text-sm text-slate-600">
                {formatDateLabel(date)} • {Number.isFinite(passengers) ? passengers : 1} traveler(s) •{" "}
                {fareClass.toUpperCase()}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-full border border-sky-300/60 bg-sky-100 px-3 py-1 text-sky-900">
                <PlaneTakeoff className="mr-1 h-3.5 w-3.5" />
                {visibleFlights.length} option(s)
              </Badge>
              <Badge className="rounded-full border border-slate-300 bg-white px-3 py-1 text-slate-700">
                <IndianRupee className="mr-1 h-3.5 w-3.5" />
                Live fare snapshot
              </Badge>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant={sortBy === "recommended" ? "premium" : "outline"}
              onClick={() => setSortBy("recommended")}
            >
              Recommended
            </Button>
            <Button
              type="button"
              size="sm"
              variant={sortBy === "price-asc" ? "premium" : "outline"}
              onClick={() => setSortBy("price-asc")}
            >
              <IndianRupee className="h-4 w-4" />
              Cheapest First
            </Button>
            <Button
              type="button"
              size="sm"
              variant={sortBy === "departure-asc" ? "premium" : "outline"}
              onClick={() => setSortBy("departure-asc")}
            >
              <ArrowUpDown className="h-4 w-4" />
              Earliest Departure
            </Button>
            <Button
              type="button"
              size="sm"
              variant={showScheduledOnly ? "secondary" : "outline"}
              onClick={() => setShowScheduledOnly((value) => !value)}
            >
              {showScheduledOnly ? "Scheduled Only" : "Show All Statuses"}
            </Button>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center rounded-2xl border border-slate-200 bg-white py-20 shadow-sm">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="space-y-4">
            {visibleFlights.length > 0 ? (
              visibleFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} onBook={handleBook} />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">No flights found</h3>
                <p className="mt-2 text-slate-600">
                  Try a nearby airport code or remove one filter to see more options.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        }
      >
        <SearchResults />
      </Suspense>
    </div>
  );
}
