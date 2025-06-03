"use client";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";
import { useAccount } from "~~/hooks/useAccount";

interface ResetCounterProps {
  counter: number
}

export const ResetCounter = ({ counter }: ResetCounterProps) => { 

  const {sendAsync, isPending} = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "reset_counter",
  });

  const { data: ownerAddress } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "owner",
  });

  const { address: connectedAddress } = useAccount();

  const isOwner = (connectedAddress && ownerAddress) ? 
    BigInt(connectedAddress) == BigInt(ownerAddress.toString()) : false;

  const isZero = counter == 0;

  const handleResetCounter = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error resetting counter", e);
    }
  };

  return (
    <button
      onClick={handleResetCounter}
      disabled={isPending || !isOwner || isZero}
      className="btn btn-primary">
        Reset Counter
    </button>
  );
};
