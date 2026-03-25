const requiredEnvVars = [
  "GEMINI_API_KEY",
  "AVIATION_STACK_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
] as const;

export type BackendEnv = {
  NODE_ENV: string;
  PORT: number;
} & Record<(typeof requiredEnvVars)[number], string>;

export function validateEnv(): BackendEnv {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }

  return {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.BACKEND_PORT ?? process.env.PORT ?? 4000),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY!,
    AVIATION_STACK_KEY: process.env.AVIATION_STACK_KEY!,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  };
}
