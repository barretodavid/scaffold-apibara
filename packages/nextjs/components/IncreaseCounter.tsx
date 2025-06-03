"use client";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark/useScaffoldWriteContract";

export const IncreaseCounter = () => { 
  const {sendAsync, isPending} = useScaffoldWriteContract({
    contractName: "CounterContract",
    functionName: "increase_counter",
  });

  const handleIncreaseCounter = async () => {
    try {
      await sendAsync();
    } catch (e) {
      console.error("Error increasing counter", e);
    }
  };

  return (
    <button
      onClick={handleIncreaseCounter}
      disabled={isPending}
      className="btn btn-primary">
        Increase Counter
    </button>
  );
};