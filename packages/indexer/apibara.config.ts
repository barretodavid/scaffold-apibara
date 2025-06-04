import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    strkStaking: {
      startingBlock: "latest",
      streamUrl: "http://apibara:7007",
    },
  },
});
