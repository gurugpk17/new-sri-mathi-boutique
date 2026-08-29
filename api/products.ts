import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "./_lib/supabase";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    console.log("PRODUCTS API STARTED");

    console.log("Testing Supabase Storage...");

    const {
      data,
      error,
    } = await supabase.storage
      .from("sample")
      .list("");

    console.log("Storage response received");

    if (error) {
      console.error("STORAGE ERROR:", error);

      return res.status(500).json({
        status: "error",
        step: "storage",
        message: error.message,
        name: error.name,
        statusCode: error.statusCode,
      });
    }

    return res.status(200).json({
      status: "ok",
      storage: "healthy",
      bucket: "sample",
      itemCount: data?.length ?? 0,
      items: data?.slice(0, 10).map((item) => ({
        name: item.name,
        id: item.id,
        metadata: item.metadata,
      })),
    });

  } catch (error: any) {
    console.error("PRODUCTS API CRASH:", error);

    return res.status(500).json({
      status: "error",
      step: "runtime",
      message: error?.message || String(error),
      name: error?.name,
      stack: error?.stack,
    });
  }
}