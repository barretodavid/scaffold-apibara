"use client";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-stark/useScaffoldEventHistory";

interface EventTableProps {
  eventName: "contracts::counter::CounterContract::CounterIncreased" | "contracts::counter::CounterContract::CounterDecreased";
  tableCaption: string;
}

export const EventsTable = ({ eventName, tableCaption }: EventTableProps) => {

  const { data: events } = useScaffoldEventHistory({
    contractName: "CounterContract",
    eventName: eventName,
    fromBlock: BigInt(0),
    blockData: true,
    transactionData: false,
    receiptData: false,
    watch: true,
    enabled: true,
  });

  const reversedEvents = [...events].reverse();
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold mb-2">{tableCaption}</h3>
      <table className="table border-collapse">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2">#</th>
            <th className="p-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {reversedEvents.map((event, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{event.args.address.toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};