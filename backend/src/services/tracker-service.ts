// Moved external flight tracker API call from frontend route to backend service layer.
export async function fetchActiveFlights() {
  const apiKey = process.env.AVIATION_STACK_KEY;

  if (!apiKey) {
    throw new Error("API Key missing");
  }

  const response = await fetch(
    `http://api.aviationstack.com/v1/flights?access_key=${apiKey}&limit=10&flight_status=active`
  );

  if (!response.ok) {
    throw new Error(`External API error: ${response.statusText}`);
  }

  return response.json();
}
