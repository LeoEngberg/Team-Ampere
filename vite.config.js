import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  // Läser .env och gör API_KEY/API_URL tillgängliga i Vite-konfigurationen.
  // Dessa värden skickas inte till frontend-koden.
  const env = loadEnv(mode, process.cwd(), "");

  // /api → mock-API med API-nyckeln på serversidan.
  const apiProxy = {
    "/api": {
      target: env.API_URL || "http://localhost:4000",
      changeOrigin: true,
      headers: {
        "X-Api-Key": env.API_KEY || "",
      },
    },
  };

  return {
    plugins: [vue()],

    // Proxy används när Vite kör utvecklingsservern.
    server: {
      proxy: apiProxy,
    },

    // Proxy används även vid vite preview.
    preview: {
      proxy: apiProxy,
    },

    // Behåll teamets befintliga test-konfiguration.
    test: {
      include: ["src/**/*.test.js"],
      environment: "jsdom",
    },
  };
});
