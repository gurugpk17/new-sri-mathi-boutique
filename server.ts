import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const app = express();
const PORT = 3000;

// Mock Data
const PRODUCTS = [
  {
    id: "royal-mughal-blouse",
    title: "The Royal Mughal Blouse",
    category: "Bridal Couture",
    description: "A tribute to Mughal aesthetics with heavy zardosi and aari work.",
    longDescription: "This bespoke masterpiece is inspired by the opulence of the Mughal courts. Hand-embroidered over 240 hours, it features intricate floral patterns, miniature architecture motifs, and semi-precious beadwork. Perfect for a traditional royal bridal ensemble.",
    price: "Inquiry Basis",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpoq_fklzK_ecU0pX4MELzAIC0o-VhUk6AXdCkxuOC4dQS8zI-TJPNu4DR8utA-1vYLAdUq8af9GZ5fB0UKCHgwGfrcw0J8DXvTnDVGDVngEPAcmsbpgz5ysLmOGkOPIsyUFRfIjtCVfEwqUr1JytGSW9dTqyioNytWNpFE_3l2q2iKlHlHAObj4gZ6rfUx_iyboj6wlE7bU_XukYs0cYzc1D0QS4wymBzuKA7n1qBMl9bHOXsHPK8E9ZLGMsxcRzyw06EvXRpbsI"
    ],
    features: ["Gold Zardosi", "Aari Handwork", "Silk Base", "Intricate Borders"],
    craftsmanship: "240+ Hours of Hand-Embroidery"
  },
  {
    id: "floral-mandala-embroidery",
    title: "Floral Mandala Embroidery",
    category: "Atelier Series",
    description: "A geometric dance of floral motifs in vibrant silk threads.",
    longDescription: "Part of our Atelier Series, this design explores the spiritual geometry of mandalas through the lens of South Indian flora. Each petal is shaded with multiple tones of silk thread to create a 3D effect that catches light from every angle.",
    price: "Inquiry Basis",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArAwbxtgCMUoLDB1IaUxtfHcR_69_KoPxoYFU8IqVgcRjWUPQ8PG91zedQk0XjXb5YojMtaD0DnPrPkxpY8b0pGv0T_644os-kF2cGwrmnmO3dhMsPSSrFMj-cSbJ9_2dy3d8sJfLfycjxBgOyaZrraS5Ih9ErSFr3_s026C8h7E3qpE5p8FjANiajL21buQ1pkolE2zDiT7LtiK1hcIRX1LYMvLfbhPTlOfEMOO66y1ONGYG_ulvocsHkdhlr5PhoEaBPJdVB584"
    ],
    features: ["Silk Thread Shading", "Dimensional Texture", "Natural Motifs", "Custom Colorway"],
    craftsmanship: "Master Artisan Signature Series"
  },
  {
    id: "paisley-heritage-blouse",
    title: "Paisley Heritage Blouse",
    category: "Heritage Collection",
    description: "Classic paisley motifs reimagined with modern metallic accents.",
    longDescription: "The Paisley Heritage Blouse is a cornerstone of our collection. It brings back the traditional 'Manga' (Mango/Paisley) design of the Dharmapuri weavers, updated with contemporary copper and antique gold zari. It's a bridge between our ancestors' style and today's luxury.",
    price: "Inquiry Basis",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBaCpleiyeaxswAKpLXlM7SxHI4UA1FFt-x_UwAKrGCu8w85eXxtGaWr9IvN4ccHWxClm4GNt_PK9RK6_FEkIYYJYsahRYLNoApy3H8kuvrIPo72fGrUyjiTaR77jRHJrpSuCtzxKCwxJds494O_lPjlGnbr7II8HS-rUikUwn_SWjQZPG7uRyfTH00QxYQzpcW7brNi8nIy8HjMCzDWyiizo-7JEK8AgWgSUiHobG9VF3Y6Z8_YgFBdIbwMQuOuhtreVH194WXu-k"
    ],
    features: ["Copper Zari", "Antique Gold Accents", "Traditional Dharmapuri Motifs"],
    craftsmanship: "Dharmapuri Heritage Series"
  },
  {
    id: "golden-zardosi-masterpiece",
    title: "Golden Zardosi Masterpiece",
    category: "Bridal Couture",
    description: "Exquisite gold zardosi work for the perfect bridal look.",
    longDescription: "A defining piece of our bridal couture, this blouse features intensive gold zardosi work. Each motif is carefully hand-stitched by our master artisans, taking over 180 hours of meticulous labor.",
    price: "Inquiry Basis",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXNggQNuW53q-UrS-4zUnZJNLA3TX13VMXD6qBrT3GJ2nvxS4hnihC-c_9bJb3DNARI5JQD1MiK4TL1hmr4WduCKUI7ZDaVGG00dSd5-7MdESaN56IiaQRMbEyJIeL6ewkt_F5vww5Oc9TiDsaqqVwbbTrIXu2C1diJLzD1ywX1bWQ-C_y9pxT_RnVn6k4_a2QRp5QUp7sfu7G9jdRFDMFg7X-Tk6ub7Mg4Xfu-QNHS0sBdPR7VTMJCK8uaQDdD2oOy8FFYUqeLck"
    ],
    features: ["Handcrafted Zardosi", "Wedding Special", "Velvet Base Option"],
    craftsmanship: "180+ Hours of Masterwork"
  }
];

const REVIEWS = [
  {
    id: "rev-1",
    name: "Ananya Iyer",
    location: "Bride from Bangalore",
    text: "The craftsmanship is beyond anything I’ve seen in Bangalore. My wedding blouse felt like a piece of art rather than just a garment. Every stitch told a story.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwdPp3EZrLorYd6_xiNhvmoROTzRy6RtsSlxvMrFuBwGxMGRCLmL1UPn6BUkZEl7DyJfqJyWs-ha_kTdTIFApLXewDKxUz4xHyaTVfA12o8F6hAyb0simV7RkE_gmG33DabFzHluAbn2Dm9CXOq1M9-RpREjg-cXQP1UaPiLTySzMnxsVs2qQ4GzEt7pyUj-EpJ0M6rCd75yzPdy4yJTFvojvSzNw_x_31ITgctYxzt3lZLWnwBwvm4CGyHawmx1ODEnoiW9jmbGA",
    featured: true
  },
  {
    id: "rev-2",
    name: "Meera Kapoor",
    location: "Chennai Client",
    text: "The bespoke consultation was so personal. They understood my vision for a minimalist but regal look and executed it perfectly.",
    rating: 5,
    featured: false
  },
  {
    id: "rev-3",
    name: "Riya Sharma",
    location: "Bride from Hyderabad",
    text: "From the first sketch to the final fitting, the experience was seamless. Truly the gold standard for luxury bridal wear.",
    rating: 5,
    featured: false
  }
];

async function startServer() {
  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    res.json(PRODUCTS);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = PRODUCTS.find((p) => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.get("/api/reviews", (req, res) => {
    res.json(REVIEWS);
  });

  app.post("/api/products", (req, res) => {
    const newProduct = { ...req.body, id: `prod-${Date.now()}` };
    PRODUCTS.push(newProduct);
    res.status(201).json(newProduct);
  });

  app.post("/api/reviews", (req, res) => {
    const newReview = { ...req.body, id: `rev-${Date.now()}` };
    REVIEWS.push(newReview);
    res.status(201).json(newReview);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
