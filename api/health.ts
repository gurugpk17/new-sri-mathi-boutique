import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("HEALTH FUNCTION STARTED");

  try {
    console.log("Checking environment variables...");

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    console.log("SUPABASE_URL exists:", !!supabaseUrl);
    console.log("SUPABASE_ANON_KEY exists:", !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        status: "error",
        step: "environment",
        supabaseUrlExists: !!supabaseUrl,
        supabaseKeyExists: !!supabaseKey,
      });
    }

    console.log("Importing Supabase...");

    const { createClient } = await import("@supabase/supabase-js");

    console.log("Creating Supabase client...");

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    console.log("Testing Supabase database...");

    const { data, error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("SUPABASE QUERY ERROR:", error);

      return res.status(500).json({
        status: "error",
        step: "supabase-query",
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    console.log("SUPABASE QUERY SUCCESS");

    return res.status(200).json({
      status: "ok",
      supabase: "healthy",
      productsQuery: "successful",
      rowsFound: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("HEALTH FUNCTION CRASH:", error);

    return res.status(500).json({
      status: "error",
      step: "runtime",
      error: error?.message || String(error),
      name: error?.name,
      stack: error?.stack,
    });
  }
}