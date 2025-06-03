"use client";
import { IncreaseCounter } from "~~/components/IncreaseCounter";
import { DecreaseCounter } from "~~/components/DecreaseCounter";
import { ResetCounter } from "~~/components/ResetCounter";
import { EventsTable } from "~~/components/EventsTable";
import { useScaffoldReadContract } from "~~/hooks/scaffold-stark/useScaffoldReadContract";

const Home = () => {
  const { data: counterData } = useScaffoldReadContract({
    contractName: "CounterContract",
    functionName: "get_counter",
  });
  const counter = counterData ? Number(counterData) : 0;

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <p>Counter: {counter}</p>
      <div className="flex gap-4">
        <IncreaseCounter />
        <DecreaseCounter counter={counter} />
        <ResetCounter counter={counter} />
      </div>
      <EventsTable 
        eventName="contracts::counter::CounterContract::CounterIncreased"
        tableCaption="Counter Increased" />
      <EventsTable 
        eventName="contracts::counter::CounterContract::CounterDecreased"
        tableCaption="Counter Decreased" />
    </div>
  );
};

export default Home;