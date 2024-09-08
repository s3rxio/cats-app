export const catsApiConfig = {
  url: "https://api.thecatapi.com/v1",
  apiKey: import.meta.env.VITE_CATS_API_KEY,
  catsCount: 15,
};

export const appApiConfig = {
  url: import.meta.env.VITE_APP_API_URL || "http://localhost:3000",
};
