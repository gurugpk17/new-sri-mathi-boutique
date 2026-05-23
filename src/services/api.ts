
export const api = {
  getProducts: async () => {
    const res = await fetch(`/api/products`);

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  },

  getProduct: async (id: string) => {
    const res = await fetch(`/api/products/${id}`);

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
};