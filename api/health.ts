import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    // Check environment variables
    if (!supabaseUrl) {
      return res.status(500).json({
        status: "error",
        step: "environment",
        message: "SUPABASE_URL is missing",
      });
    }

    if (!supabaseKey) {
      return res.status(500).json({
        status: "error",
        step: "environment",
        message: "SUPABASE_ANON_KEY is missing",
      });
    }

    // Create Supabase client directly
    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    // Test database connection
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase error:", error);

      return res.status(500).json({
        status: "error",
        step: "supabase",
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
    }

    return res.status(200).json({
      status: "ok",
      supabase: "healthy",
      productsQuery: "successful",
      rowsFound: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Health check crashed:", error);

    return res.status(500).json({
      status: "error",
      step: "runtime",
      message: error?.message || String(error),
      name: error?.name,
    });
  }
}