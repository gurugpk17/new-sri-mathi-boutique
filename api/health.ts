import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase} from "../src/services/supabase"

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { error } = await supabase
      .from("products")
      .select("id")
      .limit(1);

    if (error) {
      console.error("Supabase health check failed:", error);

      return res.status(500).json({
        status: "error",
        supabase: "unhealthy",
        error: error.message,
      });
    }

    return res.status(200).json({
      status: "ok",
      supabase: "healthy",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check error:", error);

    return res.status(500).json({
      status: "error",
      supabase: "unreachable",
    });
  }
}