"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from "framer-motion";

import { FlightOptionCard, ParsedFlightOption } from "@/components/aiva/flight-option-card";

function parseFlightLine(line: string): ParsedFlightOption | null {
  const indexMatch = line.match(/^(\d+)\.\s+(.*)$/);
  if (!indexMatch) return null;

  const index = Number.parseInt(indexMatch[1], 10);
  const content = indexMatch[2].trim();
  const parts = content.split("|").map((part) => part.trim());
  if (parts.length < 6) return null;

  const route = parts[1];
  const routeParts = route.split("→").map((part) => part.trim());
  if (routeParts.length !== 2) return null;

  return {
    index: Number.isFinite(index) ? index : 0,
    flightNumber: parts[0],
    source: routeParts[0],
    destination: routeParts[1],
    departureLabel: parts[2],
    priceLabel: parts[3].startsWith("₹") ? parts[3] : `₹${parts[3]}`,
    status: parts[4],
    airline: parts[5],
    seatsLabel: parts[6],
  };
}

function parseFlightMessage(text: string) {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const options: ParsedFlightOption[] = [];
  const introLines: string[] = [];
  const outroLines: string[] = [];
  let hasStartedOptions = false;

  for (const line of lines) {
    const option = parseFlightLine(line);
    if (option) {
      hasStartedOptions = true;
      options.push(option);
      continue;
    }

    if (!hasStartedOptions) {
      introLines.push(line);
    } else {
      outroLines.push(line);
    }
  }

  if (!options.length) return null;

  return {
    intro: introLines.join("\n"),
    options,
    outro: outroLines.join("\n"),
  };
}

const markdownComponents = {
  p: ({ children }: any) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
  ul: ({ children }: any) => <ul className="mb-2 list-disc space-y-1 pl-4">{children}</ul>,
  ol: ({ children }: any) => <ol className="mb-2 list-decimal space-y-1 pl-4">{children}</ol>,
  li: ({ children }: any) => <li>{children}</li>,
  strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }: any) => <em className="italic">{children}</em>,
  code: ({ children }: any) => (
    <code className="rounded bg-slate-800/70 px-1.5 py-0.5 text-xs text-blue-100">{children}</code>
  ),
  a: ({ href, children }: any) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-blue-200 underline underline-offset-2"
    >
      {children}
    </a>
  ),
};

export function AivaMessageContent({ text }: { text: string }) {
  const parsedFlightMessage = parseFlightMessage(text);
  if (!parsedFlightMessage) {
    return (
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    );
  }

  return (
    <div className="space-y-3">
      {parsedFlightMessage.intro ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {parsedFlightMessage.intro}
        </ReactMarkdown>
      ) : null}

      <div className="space-y-2">
        {parsedFlightMessage.options.map((option, index) => (
          <motion.div
            key={`${option.flightNumber}-${option.index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: index * 0.04 }}
          >
            <FlightOptionCard option={option} />
          </motion.div>
        ))}
      </div>

      {parsedFlightMessage.outro ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {parsedFlightMessage.outro}
        </ReactMarkdown>
      ) : null}
    </div>
  );
}
