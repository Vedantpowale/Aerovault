<<<<<<< HEAD
import { NextResponse } from 'next/server';

export async function GET() {
    const API_KEY = process.env.AVIATION_STACK_KEY;

    if (!API_KEY) {
        return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
    }

    try {
        // Fetching active flights (limit 10 for demo)
        const response = await fetch(`http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&limit=10&flight_status=active`);

        if (!response.ok) {
            throw new Error(`External API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
=======
import { NextResponse } from "next/server";

const backendApiUrl = process.env.BACKEND_API_URL ?? "http://localhost:4000";

export async function GET() {
  try {
    const response = await fetch(`${backendApiUrl}/api/tracker`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Backend proxy error:", error);
    return NextResponse.json({ error: "Failed to reach backend API." }, { status: 502 });
  }
>>>>>>> origin/main
}
