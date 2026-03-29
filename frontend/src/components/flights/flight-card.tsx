"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  CircleDot,
  Clock3,
  Luggage,
  Plane,
  Ticket,
  Utensils,
} from "lucide-react";

interface Flight {
  id: string;
  flight_number: string;
  airline_name?: string;
  company?: {
    company_name: string;
  };
  source: string;
  destination: string;
  arrival_time: string;
  price: number;
  departure_time: string;
  meal_available: boolean;
  status: string;
  available_seats?: number;
  total_seats?: number;
}

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function calculateDuration(start: string, end: string) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  const diff = Math.max(0, endTime - startTime);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function getStatusStyle(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "scheduled") {
    return "border-emerald-300/60 bg-emerald-100 text-emerald-900";
  }
  if (normalized === "delayed") {
    return "border-amber-300/60 bg-amber-100 text-amber-900";
  }
  if (normalized === "cancelled" || normalized === "canceled") {
    return "border-rose-300/60 bg-rose-100 text-rose-900";
  }
  return "border-slate-300/60 bg-slate-100 text-slate-900";
}

function LocationBlock({
  label,
  time,
  place,
  align = "left",
}: {
  label: string;
  time: string;
  place: string;
  align?: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className="text-2xl font-black leading-none text-slate-900">{time}</p>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-slate-600">{place}</p>
    </div>
  );
}

function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="text-xs font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export function FlightCard({ flight, onBook }: FlightCardProps) {
  const [expanded, setExpanded] = useState(false);

  const companyName = flight.company?.company_name || flight.airline_name || "Unknown Airline";
  const duration = calculateDuration(flight.departure_time, flight.arrival_time);
  const seatsLeft =
    typeof flight.available_seats === "number" && flight.available_seats >= 0
      ? `${flight.available_seats} seats left`
      : "Seats available";

  return (
    <Card className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-white via-sky-50/60 to-indigo-50/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600 opacity-80" />
      <CardContent className="p-5 md:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex w-full items-start gap-4 md:w-1/3">
            <div className="rounded-2xl border border-sky-200 bg-sky-100 p-3 text-sky-700">
              <Plane className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{flight.flight_number}</p>
              <h3 className="text-lg font-bold leading-tight text-slate-900">{companyName}</h3>
              <Badge className={`mt-2 rounded-full border px-2 py-0.5 text-[10px] ${getStatusStyle(flight.status)}`}>
                {flight.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <LocationBlock
                label="Departure"
                time={formatTime(flight.departure_time)}
                place={flight.source}
              />

              <div className="flex min-w-[96px] flex-col items-center px-2">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-sky-700">{duration}</p>
                <div className="relative h-[2px] w-full bg-gradient-to-r from-sky-200 via-slate-300 to-indigo-200">
                  <CircleDot className="absolute -left-1 -top-[7px] h-4 w-4 bg-white text-sky-700" />
                  <Plane className="absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 text-slate-600" />
                  <CircleDot className="absolute -right-1 -top-[7px] h-4 w-4 bg-white text-indigo-700" />
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-slate-500">Non-stop</p>
              </div>

              <LocationBlock
                label="Arrival"
                time={formatTime(flight.arrival_time)}
                place={flight.destination}
                align="right"
              />
            </div>
          </div>

          <div className="flex w-full items-center justify-between border-t border-dashed border-slate-200 pt-4 md:w-1/3 md:justify-end md:gap-6 md:border-t-0 md:pt-0">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Per traveler</p>
              <p className="text-3xl font-black leading-none text-slate-900">{formatCurrency(flight.price)}</p>
            </div>
            <Button
              onClick={() => onBook(flight)}
              variant="premium"
              className="h-12 rounded-2xl px-7 text-base font-bold"
              disabled={flight.status.toLowerCase() !== "scheduled"}
            >
              {flight.status.toLowerCase() === "scheduled" ? "Select" : "Unavailable"}
            </Button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
          <MetaChip label="Departure Date" value={formatDate(flight.departure_time)} />
          <MetaChip label="Duration" value={duration} />
          <MetaChip label="Seat Inventory" value={seatsLeft} />
          <MetaChip label="Meal" value={flight.meal_available ? "Included" : "Optional"} />
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
          {flight.meal_available ? (
            <Badge variant="secondary" className="rounded-full bg-emerald-100 text-emerald-900">
              <Utensils className="h-3.5 w-3.5" />
              Meal included
            </Badge>
          ) : null}
          <button
            onClick={() => setExpanded((value) => !value)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-900"
          >
            {expanded ? "Hide Details" : "View Fare & Policy"}
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {expanded ? (
          <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4 md:grid-cols-3">
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Luggage className="h-3.5 w-3.5" />
                Baggage
              </p>
              <p className="text-xs text-slate-700">Check-in: 15kg (1 piece)</p>
              <p className="text-xs text-slate-700">Cabin: 7kg (1 piece)</p>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Clock3 className="h-3.5 w-3.5" />
                Timing
              </p>
              <p className="text-xs text-slate-700">Boarding closes 45 mins before departure.</p>
              <p className="text-xs text-slate-700">Gate may change before departure.</p>
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">
                <Ticket className="h-3.5 w-3.5" />
                Fare Rules
              </p>
              <p className="text-xs text-slate-700">Cancellation fee starts from ₹50 before 24h.</p>
              <p className="text-xs text-slate-700">Limited changes allowed per fare conditions.</p>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
