import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { supabase } from "./src/services/supabase";

const app = express();
const PORT = 3000;

/* ---------------- GET IMAGES FROM SUPABASE ---------------- */

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

/* ---------------- SERVER ---------------- */

async function startServer() {
  app.use(express.json());

  /* ---------------- GET ALL PRODUCTS ---------------- */

  app.get("/api/products", async (req, res) => {
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

      res.json(products);
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "Failed to load products",
      });
    }
  });

  /* ---------------- GET SINGLE PRODUCT ---------------- */

  app.get("/api/products/:id", async (req, res) => {
    try {
      const folderName = req.params.id;

      const images = await getProductImages(folderName);

      res.json({
        id: folderName,

        title: folderName
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),

        category: "Luxury Collection",

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
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "Failed to load product",
      });
    }
  });

  /* ---------------- AI DESCRIPTION API ---------------- */

  app.post("/api/generate-description", async (req, res) => {
    try {
      const { imageUrl } = req.body;

      console.log("AI analyzing:", imageUrl);

      // TEMPORARY MOCK AI RESPONSE

      res.json({
        title: "Luxury Bridal Embroidery",

        description:
          "An elegant handcrafted bridal blouse featuring intricate embroidery and timeless artistry.",
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        error: "AI generation failed",
      });
    }
  });

  /* ---------------- REVIEWS ---------------- */

  const REVIEWS: any[] = [];

  app.get("/api/reviews", (req, res) => {
    res.json(REVIEWS);
  });

  app.post("/api/reviews", (req, res) => {
    const newReview = {
      ...req.body,
      id: `rev-${Date.now()}`,
    };

    REVIEWS.push(newReview);

    res.status(201).json(newReview);
  });

  /* ---------------- VITE ---------------- */

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },

      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  /* ---------------- START SERVER ---------------- */

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();