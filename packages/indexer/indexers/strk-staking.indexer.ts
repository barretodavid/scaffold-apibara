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
            "0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D",
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
