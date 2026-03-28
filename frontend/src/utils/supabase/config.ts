const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function assertEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function assertValidSupabaseUrl(url: string): string {
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(url);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not a valid URL. Use your Supabase Project URL, e.g. https://<project-ref>.supabase.co"
    );
  }

  if (parsedUrl.protocol !== "https:") {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL must use https://");
  }

  return url;
}

export function getSupabaseConfig() {
  const url = assertValidSupabaseUrl(
    assertEnv("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL)
  );
  const anonKey = assertEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", SUPABASE_ANON_KEY);

  return { url, anonKey };
}
