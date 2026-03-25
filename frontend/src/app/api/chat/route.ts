import { NextRequest, NextResponse } from "next/server";

const backendApiUrl = process.env.BACKEND_API_URL ?? "http://localhost:4000";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const response = await fetch(`${backendApiUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
}
