import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        status: "error",
        step: "environment",
        url: !!supabaseUrl,
        key: !!supabaseKey,
      });
    }

    const url = `${supabaseUrl}/storage/v1/object/list/sample`;

    console.log("Testing Storage URL:", url);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix: "",
        limit: 10,
        offset: 0,
        sortBy: {
          column: "name",
          order: "asc",
        },
      }),
    });

    const text = await response.text();

    console.log("Storage HTTP status:", response.status);
    console.log("Storage response:", text);

    return res.status(response.status).json({
      status: response.ok ? "ok" : "error",
      storageStatus: response.status,
      response: text,
    });

  } catch (error: any) {
    console.error("DIRECT STORAGE TEST FAILED:", error);

    return res.status(500).json({
      status: "error",
      step: "network",
      message: error?.message || String(error),
      name: error?.name,
      cause: error?.cause?.message || String(error?.cause || ""),
    });
  }
}