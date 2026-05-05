export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  price: string;
  images: string[];
  features: string[];
  craftsmanship: string;
}

export const PRODUCTS: Product[] = [
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
  }
];
