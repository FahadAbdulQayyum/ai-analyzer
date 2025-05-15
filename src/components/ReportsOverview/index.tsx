import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import { Icon } from '@iconify/react/dist/iconify.js';
import PercentageAnalytics from '../PercentageAnalytics';
import Button from '@/app/Screen/Button';
import { numberWithCommas } from '@/utils/numberWithComma';
import { IRecentSubscriber, IUsersByDeviceData } from '../Dashboard';
import { formatNumber } from '@/utils/formatter';

interface AnalyticsInfoReportsProps {
  analyticsInfoDeviceCount?: string | number; // Allow string, number, or undefined
  analyticsInfoCountryCount?: string | number; // Allow string, number, or undefined
  analyticsInfoDesktopUserCount?: string | number; // Allow string, number, or undefined
  analyticsInfoPhoneUserCount?: string | number; // Allow string, number, or undefined
  analyticsInfoLaptopUserCount?: string | number; // Allow string, number, or undefined
  analyticsRecentSubscriber?: IRecentSubscriber[]; // Allow string, number, or undefined
  analyticsDeviceData?: IUsersByDeviceData[]
}

// const ReportsOverview = () => {
const ReportsOverview: React.FC<AnalyticsInfoReportsProps> = ({
  analyticsInfoDeviceCount, 
  analyticsInfoCountryCount, 
  analyticsInfoDesktopUserCount, 
  analyticsInfoPhoneUserCount, 
  analyticsInfoLaptopUserCount,
  analyticsRecentSubscriber,
  analyticsDeviceData
}) => {
  // Doughnut Chart Data
  const usersByDeviceData = {
    labels: analyticsDeviceData ? analyticsDeviceData[0].labels : ["Dummy", "Pagal", "Tiwar", "Kuja", "letSee"],
    datasets: analyticsDeviceData ? analyticsDeviceData[0].datasets : 
    [
        {
          data: [4100, 643, 1000, 400],
          backgroundColor: ['#CB3CFF', '#00C2FF', '#0038FF', '#343B4F40'],
          hoverOffset: 4,
        },
      ],
  };

  // Users by Country Data
  const usersByCountryData = [
    { country: 'United States', percentage: 30, color: 'purple' },
    { country: 'United Kingdom', percentage: 25, color: 'cyan' },
    { country: 'Canada', percentage: 20, color: 'teal' },
    { country: 'Australia', percentage: 10, color: 'orange' },
    { country: 'Spain', percentage: 10 , color: 'pink'},
  ];

  const colorClasses = {
    purple: 'bg-purple-400',
    cyan: 'bg-cyan-400',
    teal: 'bg-teal-400',
    orange: 'bg-orange-400',
    pink: 'bg-pink-400',
  };

  return (
    <div className="bg-transparent p-4 rounded-3xl shadow-md mt-4">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-3xl font-bold text-white mb-4">Reports overview</h2>
    <span className='flex items-center space-x-4'>
            <select className="bg-gray-700 text-white px-2 py-2 rounded">
                <option value="Jan 2023 - Dec 2023">Select date</option>
            </select>
 
            <Button style={"border-colorful"} title={"Export Data"} ic={"mdi:arrow-down-thin"} lic='' wide={false} cntr={false}/>
            
            <Button style={"bg-colorful"} title={"Create report"} ic='' lic='' wide={false} cntr={false}/>
    </span>
      </div>

      {/* Users by Device */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col items-center justify-center bg-boxColor p-20 rounded-3xl shadow-md">
            <div className='w-[450px] h-[450px]'>
                <Doughnut
                    data={analyticsDeviceData ? analyticsDeviceData[0] : usersByDeviceData}
                    options={{
                    plugins: {
                        legend: {
                        display: false
                        },
                        tooltip: {
                        enabled: false
                        }
                    },
                    rotation: -90,
                    circumference: 180,
                    cutout: "90%",
                    maintainAspectRatio: true,
                    responsive: true,
                    }}
            />
            </div>
      <div className='relative'>
        <span className='absolute bottom-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-[200px]'>
            <h1 className="text-6xl font-bold text-white">{numberWithCommas(analyticsInfoDeviceCount ?? "0")}</h1>
            <p className="text-xl font-bold text-grayColor w-full">Users by device</p>
        </span>
      </div>
          <div className="mt-4 w-full">
            <div className="flex flex-col mt-2 space-y-6 text-grayColor">
              <span className="flex justify-between"><span className="flex items-center space-x-2 text-lg"><p className='bg-purpleColor h-2 w-2 rounded-full'></p><p>Desktop users</p></span><span className='text-xl font-bold'>{analyticsInfoDesktopUserCount}</span></span>
              <span className="flex justify-between"><span className="flex items-center space-x-2 text-lg"><p className='bg-tealColor h-2 w-2 rounded-full'></p><p>Phone app users</p></span><span className='text-xl font-bold'>{analyticsInfoPhoneUserCount}</span></span>
              <span className="flex justify-between"><span className="flex items-center space-x-2 text-lg"><p className='bg-blueColor h-2 w-2 rounded-full'></p><p>Laptop users</p></span><span className='text-xl font-bold'>{analyticsInfoLaptopUserCount}</span></span>
            </div>
          </div>
        </div>

        {/* Recent Subscribers */}
        <div className="bg-boxColor py-14 px-10 rounded-3xl shadow-md">
            <h2 className="text-2xl text-white">Recent Subscribers</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-6 text-xl text-white"><span className='flex items-center '><Icon icon="mdi:account" className="mr-1" />{' '}<p>Name</p></span></th>
                <th className="px-4 py-6 text-xl text-white"><span className='flex items-center '><Icon icon="mdi:calendar" className="mr-1" />{' '}<p>Date</p></span></th>
                <th className="px-4 py-6 text-xl text-white"><span className='flex items-center '><Icon icon="mdi:checkbox-marked" className="mr-1" />{' '}<p>Package</p></span></th>
                <th className="px-4 py-6 text-xl text-white"><span className='flex items-center '><Icon icon="mdi:" className="mr-1" />{' '}<p>Amount</p></span></th>
              </tr>
            </thead>
            <tbody>
              {analyticsRecentSubscriber !== undefined && analyticsRecentSubscriber?.map((subscriber, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-transparent' : 'bg-gray-800'}>
                  <td className="px-4 py-6 text-xl text-white">{subscriber?.name}</td>
                  <td className="px-4 py-6 text-xl text-white">{subscriber?.date?.toString()?.slice(0,10)}</td>
                  <td className="px-4 py-6 text-xl text-white">{subscriber?.package}</td>
                  <td className="px-4 py-6 text-xl text-white">{formatNumber(subscriber?.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users by Country */}
      <div className="bg-boxColor p-10 rounded-3xl shadow-md mt-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-4 flex-2 w-[80%]">
            {/* Users by Country List */}
            <div className="flex flex-col flex-1">
            <div className="flex flex-col justify-start items-start mb-4">
                <h3 className="text-sm font-bold text-white">Users by Country</h3>
                <h2 className="flex items-center text-2xl font-bold text-white space-x-2">
                <p>{analyticsInfoCountryCount}</p>
                <PercentageAnalytics change={"+28.5%"} value=''/>
                </h2>
            </div>    
        {/* Content */}
            {usersByCountryData.map((country, index) => {
              let className = 'h-2';
              if (country.color === 'purple') {
                className += ' bg-purple-400';
              } else if (country.color === 'cyan') {
                className += ' bg-cyan-400';
              } else if (country.color === 'teal') {
                className += ' bg-teal-400';
              } else if (country.color === 'orange') {
                className += ' bg-orange-400';
              } else if (country.color === 'pink') {
                className += ' bg-pink-400';
              }

              return (
                <div key={index} className="flex items-center justify-between mt-2">
                  <span className="flex flex-col w-full text-sm text-white">
                    {country.country}{' '}
                    <span className="flex items-center justify-between w-full">
                      <div className="flex items-center justify-start w-[85%] bg-gray-600">
                        <div
                          className={className}
                          style={{ width: `${country.percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400">({country.percentage}%)</div>
                    </span>
                  </span>
                </div>
              );
            })}

            </div>

            {/* World Map */}
            <div className="w-full h-full flex-1">
            <img
                src="/images/worldmap.svg"
                alt="World Map"
                className="w-full h-full object-cover rounded"
            />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsOverview;