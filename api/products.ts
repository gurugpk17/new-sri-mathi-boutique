import type { VercelRequest, VercelResponse } from "@vercel/node";
import { supabase } from "../src/services/supabase";

async function getProductImages(folderName: string) {
  const { data, error } = await supabase.storage
    .from("sample")
    .list(folderName);

  if (error) {
    console.log("Supabase error:", error);
    return [];
  }

  const imageFiles = data.filter((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    return ["jpg", "jpeg", "png", "webp"].includes(extension || "");
  });

  return imageFiles.map((file) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from("sample")
      .getPublicUrl(`${folderName}/${file.name}`);

    return publicUrl;
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const { data: folders, error } = await supabase.storage
      .from("sample")
      .list("");

    if (error) {
      console.log(error);

      return res.status(500).json({
        error: "Failed to fetch folders",
      });
    }

    const products = await Promise.all(
      folders.map(async (folder) => {
        const images = await getProductImages(folder.name);

        return {
          id: folder.name,

          title: folder.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),

          category:
            folder.name.includes("floral-mandala-embroidery")
              ? "Bridal Couture"
              : folder.name.includes("royal-mughal-blouse")
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

          craftsmanship: "Handcrafted with precision",

          images,
        };
      })
    );

    res.status(200).json(products);
  }
    catch (err: any) {
  console.error(err);

  return res.status(500).json({
    message: err?.message,
    stack: err?.stack,
  });
}
}