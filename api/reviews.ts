import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./supabase.js";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // GET REVIEWS
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(200).json(data);
  }

  // ADD REVIEW
  if (req.method === "POST") {
    const { name, text, location } = req.body;

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
      return res.status(500).json({
        error: error.message,
      });
    }

    return res.status(201).json(data[0]);
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}