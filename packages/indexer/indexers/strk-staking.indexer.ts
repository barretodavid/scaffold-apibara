import { defineIndexer } from "apibara/indexer";
import { useLogger } from "apibara/plugins";

import { StarknetStream } from "@apibara/starknet";
import type { ApibaraRuntimeConfig } from "apibara/types";

export default function (runtimeConfig: ApibaraRuntimeConfig) {
  const { startingBlock, streamUrl } = runtimeConfig["strkStaking"];

  return defineIndexer(StarknetStream)({
    streamUrl,
    finality: "accepted",
    startingBlock: BigInt(startingBlock),
    filter: {
      events: [
        {
          address:
            "0x028d709c875c0ceac3dce7065bec5328186dc89fe254527084d1689910954b0a",
        },
      ],
    },
    plugins: [],
    async transform({ block }) {
      const logger = useLogger();
      const { events, header } = block;
      logger.log(`Block number ${header?.blockNumber}`);
      for (const event of events) {
        logger.log(`Event ${event.eventIndex} tx=${event.transactionHash}`);
      }
    },
  });
}
