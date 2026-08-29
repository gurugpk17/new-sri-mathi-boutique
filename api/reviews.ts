import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

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

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    // GET REVIEWS
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("GET REVIEWS ERROR:", error);

        return res.status(500).json({
          status: "error",
          step: "supabase-query",
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
      }

      return res.status(200).json(data);
    }

    // ADD REVIEW
    if (req.method === "POST") {
      const { name, text, location } = req.body;

      if (!name || !text || !location) {
        return res.status(400).json({
          error: "Name, text and location are required",
        });
      }

      const { data, error } = await supabase
        .from("reviews")
        .insert([
          {
            name,
            text,
            location,
            featured: false,
          },
        ])
        .select();

      if (error) {
        console.error("ADD REVIEW ERROR:", error);

        return res.status(500).json({
          status: "error",
          step: "supabase-insert",
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
      }

      return res.status(201).json(data?.[0]);
    }

    return res.status(405).json({
      error: "Method not allowed",
    });

  } catch (error: any) {
    console.error("REVIEWS API CRASH:", error);

    return res.status(500).json({
      status: "error",
      step: "runtime",
      message: error?.message || String(error),
      name: error?.name,
      stack: error?.stack,
    });
  }
}