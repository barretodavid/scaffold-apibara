import { defineConfig } from "apibara/config";

export default defineConfig({
  runtimeConfig: {
    strkStaking: {
      startingBlock: 900_000,
      streamUrl: "https://mainnet.starknet.a5a.ch",
    },
  },
});
