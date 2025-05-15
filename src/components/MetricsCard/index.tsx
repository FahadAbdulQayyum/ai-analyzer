import { Icon } from "@iconify/react";
import PercentageAnalytics from "../PercentageAnalytics";

interface MetricsCardProps {
    title: string;
    value: string;
    change: string;
    ic: string;
  }
  
  const MetricsCard = ({ title, value, change, ic }: MetricsCardProps) => {
    return (
      <div className="bg-boxColor p-4 rounded shadow-md flex items-center justify-between">
        <div className="space-y-3 w-full">
          <span className="flex items-center justify-between text-gray-400 w-full">
            <span className="flex items-center space-x-1">
            <Icon icon={ic} /><p>{title}</p>
            </span>
            <span className="hover:cursor-pointer">
            <Icon icon={"mdi:dots-horizontal"} fontSize={25} />
            </span>
            </span>
          <span className="flex items-center justify-start space-x-2 space-y-1">
            <h2 className="text-2xl font-bold text-white">{value}</h2>
            <PercentageAnalytics change={change} value={value}/>
          </span>
        </div>
      </div>
    );
  };
  
  export default MetricsCard;