import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../src/services/supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      return res.status(500).json({
        status: "error",
        supabase: "unhealthy",
        error: error.message,
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
    return res.status(500).json({
      status: "error",
      supabase: "unreachable",
      error: error?.message || String(error),
    });
  }
}