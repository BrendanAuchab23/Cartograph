import { auth } from "@clerk/nextjs/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./database.types";

export async function createServerSupabase(): Promise<SupabaseClient<Database>> {
  const { getToken } = await auth();

  const token = await getToken();
  if (token) {
    const p = JSON.parse(Buffer.from(token.split(".")[1], "base64url").toString());
    console.log("TOKEN", { iat: p.iat, exp: p.exp, now: Math.floor(Date.now() / 1000), org: p.o ?? p.org_id, role: p.role });
  } else {
    console.log("TOKEN is null (not signed in?)");
  }

  return createClient<Database>(
    env("NEXT_PUBLIC_SUPABASE_URL"),
    env("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
    { accessToken: async () => (await getToken()) ?? null },
  );
}