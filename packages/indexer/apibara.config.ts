import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    strkStaking: {
      startingBlock: 0,
      streamUrl: "http://apibara:7171",
    },
  },
});
