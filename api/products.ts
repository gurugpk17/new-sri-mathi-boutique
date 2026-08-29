import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

const BUCKET = "sample";

if (!SUPABASE_URL) {
  throw new Error("SUPABASE_URL is missing");
}

if (!SUPABASE_ANON_KEY) {
  throw new Error("SUPABASE_ANON_KEY is missing");
}

async function listStorageFiles(prefix: string = "") {
  const url = `${SUPABASE_URL}/storage/v1/object/list/${BUCKET}`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      apikey: SUPABASE_ANON_KEY,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prefix,
      limit: 1000,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc",
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Supabase Storage error (${response.status}): ${errorText}`
    );
  }

  return response.json();
}

async function getProductImages(folderName: string) {
  const files = await listStorageFiles(folderName);

  if (!Array.isArray(files)) {
    return [];
  }

  const imageFiles = files.filter((file: any) => {
    const extension = file.name
      ?.split(".")
      .pop()
      ?.toLowerCase();

    return [
      "jpg",
      "jpeg",
      "png",
      "webp",
    ].includes(extension || "");
  });

  return imageFiles.map((file: any) => {
    return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${folderName}/${file.name}`;
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { id } = req.query;

    // Get product folders
    const folders = await listStorageFiles("");

    if (!Array.isArray(folders)) {
      return res.status(200).json([]);
    }

    // Only folders that contain actual sub-paths
    const productFolders = folders.filter(
      (item: any) => item.id === null
    );

    const products = await Promise.all(
      productFolders.map(async (folder: any) => {
        const folderName = folder.name;

        const images = await getProductImages(
          folderName
        );

        return {
          id: folderName,

          title: folderName
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c: string) =>
              c.toUpperCase()
            ),

          category:
            folderName.includes(
              "floral-mandala-embroidery"
            )
              ? "Bridal Couture"
              : folderName.includes(
                  "royal-mughal-blouse"
                )
              ? "Atelier Series"
              : "Luxury Collection",

          description:
            "Elegant handcrafted embroidery masterpiece.",

          longDescription:
            "A timeless luxury embroidery design crafted with premium detailing and artisan techniques.",

          features: [
            "Hand Embroidery",
            "Luxury Finish",
            "Premium Design",
          ],

          craftsmanship:
            "Handcrafted with precision",

          images,
        };
      })
    );

    // SINGLE PRODUCT
    if (id && typeof id === "string") {
      const product = products.find(
        (p) => p.id === id
      );

      if (!product) {
        return res.status(404).json({
          error: "Product not found",
        });
      }

      return res.status(200).json(product);
    }

    // ALL PRODUCTS
    return res.status(200).json(products);

  } catch (error: any) {
    console.error(
      "PRODUCTS API ERROR:",
      error
    );

    return res.status(500).json({
      error: "Failed to load products",
      message:
        error?.message || String(error),
    });
  }
}