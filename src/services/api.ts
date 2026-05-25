export interface Review {
  id: number;
  name: string;
  text: string;
  location: string;
  featured?: boolean;
}

export const api = {
  getProducts: async () => {
    const res = await fetch(`/api/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  },

  getProduct: async (id: string) => {
    const res = await fetch(`/api/products?id=${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  },

  generateDescription: async (imageUrl: string) => {
    const res = await fetch(
      `/api/generate-description`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          imageUrl,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to generate AI description");
    }

    return res.json();
  },
  
  getReviews: async () => {
  const res = await fetch("/api/reviews");

  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
},

addReview: async (review: {
  name: string;
  text: string;
  location: string;
}) => {
  const res = await fetch("/api/reviews", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(review),
  });

  if (!res.ok) {
    throw new Error("Failed to submit review");
  }

  return res.json();
}
};