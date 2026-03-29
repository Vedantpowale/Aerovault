"use client";

import { Badge } from "@/components/ui/badge";
import { Clock3, Plane, Ticket } from "lucide-react";

export type ParsedFlightOption = {
  index: number;
  flightNumber: string;
  source: string;
  destination: string;
  departureLabel: string;
  priceLabel: string;
  status: string;
  airline: string;
  seatsLabel?: string;
};

function statusClasses(status: string) {
  const normalized = status.toLowerCase();
  if (normalized === "scheduled") {
    return "bg-emerald-500/20 text-emerald-200 border-emerald-300/30";
  }
  if (normalized === "delayed") {
    return "bg-amber-500/20 text-amber-100 border-amber-300/30";
  }
  if (normalized === "cancelled" || normalized === "canceled") {
    return "bg-rose-500/20 text-rose-100 border-rose-300/30";
  }
  return "bg-slate-500/20 text-slate-100 border-slate-300/30";
}

export function FlightOptionCard({ option }: { option: ParsedFlightOption }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-slate-900/40 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-blue-200/70">Option {option.index}</p>
          <p className="text-sm font-semibold text-white">{option.airline}</p>
          <p className="text-[11px] font-mono tracking-[0.18em] text-slate-300">{option.flightNumber}</p>
        </div>
        <Badge className={statusClasses(option.status)}>{option.status}</Badge>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl bg-black/20 p-2">
        <div>
          <p className="text-xs text-blue-100">{option.source}</p>
        </div>
        <Plane className="h-3.5 w-3.5 rotate-90 text-blue-300" />
        <div className="text-right">
          <p className="text-xs text-blue-100">{option.destination}</p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-200">
        <div className="rounded-lg bg-white/5 p-2">
          <p className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            <Clock3 className="h-3 w-3" />
            Departure
          </p>
          <p>{option.departureLabel}</p>
        </div>
        <div className="rounded-lg bg-white/5 p-2">
          <p className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.14em] text-slate-400">
            <Ticket className="h-3 w-3" />
            Fare
          </p>
          <p className="font-semibold text-white">{option.priceLabel}</p>
        </div>
      </div>

      {option.seatsLabel ? (
        <p className="mt-2 text-[11px] text-slate-300">{option.seatsLabel}</p>
      ) : null}
    </div>
  );
}
