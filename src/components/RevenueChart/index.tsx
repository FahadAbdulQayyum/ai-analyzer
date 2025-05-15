import Button from '@/app/Screen/Button';
import React, { useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import PercentageAnalytics from '../PercentageAnalytics';
import { IRevenueData } from '../Dashboard';

// Define the type for the data points
type RevenueData = {
  month: string;
  revenue: number;
};

interface RevenueChartProps {
  analyticsTotalRevenue?: string | number; // Allow string, number, or undefined
  analyticsRevenueData?: IRevenueData[]; // Array of revenue data points
}

// Define the type for the custom tooltip props
type CustomTooltipProps = TooltipProps<number, string> & {
  active?: boolean; // Whether the tooltip is active
  payload?: Array<{ payload: RevenueData }>; // Payload containing the data point
};

const RevenueChart: React.FC<RevenueChartProps> = ({
  analyticsTotalRevenue = "27.9K",
  analyticsRevenueData
}) => {
  // Data with explicit type annotation
  const data: RevenueData[] = [
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 1000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 10000 },
    { month: 'May', revenue: 15000 },
    { month: 'Jun', revenue: 15000 },
    { month: 'Jul', revenue: 15000 },
    { month: 'Aug', revenue: 18000 },
    { month: 'Sep', revenue: 20000 },
    { month: 'Oct', revenue: 25000 },
    { month: 'Nov', revenue: 27000 },
    { month: 'Dec', revenue: 29000 },
  ];

  useEffect(() => {
    console.log('...Analytics Revenue Data:...', analyticsRevenueData);
  }, [])

  // Custom tooltip content with type annotations
  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { revenue } = payload[0].payload;
      const percentageChange = ((revenue - 1000) / 1000) * 100; // Assuming Jan as the baseline
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '10px',
            borderRadius: '5px',
            color: '#fff',
            fontSize: '14px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <p style={{ fontWeight: 'bold' }}>{`$${revenue.toLocaleString()}K`}</p>
          <p style={{ color: '#2ecc71' }}>
            {`${percentageChange.toFixed(1)}% ↑`}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        backgroundColor: '#121212',
        padding: '20px',
        borderRadius: '10px',
        color: '#fff',
      }}
    >
      {/* Total revenue header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <p style={{ fontSize: '16px', margin: 0 }}>Total revenue</p>
          <span className='flex items-center space-x-2 space-y-1'>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                ${analyticsTotalRevenue}{' '}
            </p>
            <PercentageAnalytics change="+24.6%" value=''/>
          </span>

        </div>
        {/* Date range selector */}
        <div
          style={{
            padding: '5px 10px',
            borderRadius: '5px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button title='Jan 2025 - Dec 2025' style='border-colorful' ic='mdi:keyboard-arrow-down' lic='mdi:calendar' wide={false} cntr={false}/>
        </div>
      </div>

      {/* Chart container */}
      <ResponsiveContainer width="100%" height={500}>
        {/* <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}> */}
        {/* <LineChart data={analyticsRevenueData ? analyticsRevenueData : data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}> */}
        <LineChart data={analyticsRevenueData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#fff' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#fff' }}
            tickFormatter={(value) => `${value / 1000}K`} // Format Y-axis values in thousands
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3498db"
            strokeWidth={3}
            dot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
            activeDot={{ r: 8, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;