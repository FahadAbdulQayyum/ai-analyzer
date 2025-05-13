import Sidebar from '../Sidebar';
import Header from '../Header';
import MetricsCard from '../MetricsCard';
import RevenueChart from '../RevenueChart';
import ReportsOverview from '../ReportsOverview';
import { useEffect, useState } from 'react';
import { formatNumber } from '@/utils/formatter';
import { numberWithCommas } from '@/utils/numberWithComma';
import Loader from '../Loader';
import { useWebSocket } from '@/hooks/useWebSocket';

interface BlogPosts {
  title: string;
  content: string;
}

// Interfaces and Types
interface IUsersByDevice {
  desktop_users: number | string;
  laptop_users: number | string;
  phone_app_users: number | string;
}

export interface IUsersByDeviceData {
  labels: string[];
  datasets: [
    {
      data: number[];
      backgroundColor: string[];
      hoverOffset: number;
    },
  ];
}

export interface IRecentSubscriber {
  date: Date;
  name: string;
  package: string;
  amount: number;
}

export interface IRevenueData {
  _id: string;
  month: string;
  revenue: string;
}

interface AnalyticsType {
  user_id: string;
  live_visits: number;
  monthly_users: number;
  new_sign_ups: number;
  subscriptions: number;
  total_revenue: number;
  revenue_data: IRevenueData[];
  recent_subscribers: IRecentSubscriber[];
  users_by_device: IUsersByDevice;
  users_by_device_data: IUsersByDeviceData;
  users_by_country_count: number;
  users_by_device_count: number;
  createdAt: Date;
  updatedAt: Date;
}

interface MessagesProps {
  _id: {
    _data: string
  },
  operationType: string,
  clusterTime?: Date,
  wallTime?: Date,
  ns?: {db?: string, coll?: string},
  documentKey?: {
    _id: String
  },
  updateDescription?: {
  },
}

const DashboardComponent = () => {
  const [username, setUsername] = useState('Guest!');
  const [isUsernameFetched, setIsUsernameFetched] = useState(false);
  const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsType | null>(null);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([])

  // const [detectMessages, setDetectMessages] = useState<MessagesProps[]>([])
  
  // Fetch username from localStorage
  useEffect(() => {
    const fetchUserName = () => {
      const storedUserName = localStorage.getItem('userName');
      const finalUsername = storedUserName || 'Guest!';
      setUsername(finalUsername);
      setIsUsernameFetched(true);
    };
    fetchUserName();
  }, []);

const messages = useWebSocket('ws://localhost:8080');
  // useEffect(() => {
  //     setDetectMessages(messages)
  // }, [detectMessages])

  // Fetch analytics data only after username is fetched
  useEffect(() => {
    const fetchAnalyticsInfo = async () => {
      try {
        const response = await fetch('/api/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username }),
        });
        // const response = await fetch('/api/ai-analytics', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ username }),
        // });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();
        data = {
          ...data,
          revenue_data: data.revenue_data.map((item: IRevenueData) => ({
            ...item,
            revenue: parseFloat(item.revenue),
          })),
        };

        console.log('...Analytics data:...', data);
        setAnalyticsInfo(data);
        setBlogPosts(data.blog_posts)
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    if (isUsernameFetched) {
      fetchAnalyticsInfo();
    }
  // }, [username, isUsernameFetched]);
  }, [username, isUsernameFetched, messages]);
  // }, [username, isUsernameFetched, detectMessages]);


  // Render content based on the selected tab
  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <MetricsCard
                title="Live Visits"
                ic={"ic:baseline-remove-red-eye"}
                value={analyticsInfo?.live_visits?.toString() ?? "0"}
                change="+12%"
              />
              <MetricsCard
                title="Monthly Users"
                ic={"mdi:account"}
                value={analyticsInfo ? formatNumber(analyticsInfo.monthly_users) : "0"}
                change="-2.5%"
              />
              <MetricsCard
                title="New Sign-ups"
                ic={"mdi:plus-circle"}
                value={analyticsInfo?.new_sign_ups?.toString() ?? "0"}
                change="+15%"
              />
              <MetricsCard
                title="Subscriptions"
                ic={"mdi:star"}
                value={analyticsInfo ? formatNumber(analyticsInfo.subscriptions) : "0"}
                change="+0.25%"
              />
            </div>

            {/* Revenue Chart */}
            <div className="bg-boxColor p-4 rounded shadow-md mt-4">
              {analyticsInfo ? (
                <RevenueChart
                  analyticsTotalRevenue={analyticsInfo ? formatNumber(analyticsInfo.total_revenue) : "0"}
                  analyticsRevenueData={analyticsInfo!.revenue_data}
                />
              ) : (
                <Loader />
              )}
            </div>

            {/* Reports Overview */}
            {analyticsInfo ? (
              <ReportsOverview
                analyticsInfoDeviceCount={analyticsInfo ? analyticsInfo.users_by_device_count.toLocaleString() : "0"}
                analyticsInfoCountryCount={analyticsInfo ? formatNumber(analyticsInfo.users_by_country_count) : "0"}
                analyticsInfoDesktopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.desktop_users) : "0"}
                analyticsInfoPhoneUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.phone_app_users) : "0"}
                analyticsInfoLaptopUserCount={analyticsInfo ? numberWithCommas(+analyticsInfo.users_by_device.laptop_users) : "0"}
                analyticsRecentSubscriber={analyticsInfo?.recent_subscribers}
                analyticsDeviceData={analyticsInfo ? [analyticsInfo?.users_by_device_data] : []}
              />
            ) : (
              <Loader />
            )}
          </>
        );

      case "notifications":
        return <p className='text-white'>Notifications Content</p>;

      case "users":
        return <p className='text-white'>Users Content</p>;

      case "posts":
        return <p className='text-white'>Flagged Posts Content</p>;

      case "ads":
        return <p className='text-white'>Advertisements Content</p>;

      case "blogs":
        // return <p className='text-white'>Blogs Content</p>;
        return <div className="space-y-4">
        {blogPosts && blogPosts.map((post, index) => (
          <div key={index} className="bg-boxColor p-4 rounded shadow-md">
            <h3 className="text-lg font-semibold text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{post.content}</p>
          </div>
        ))}
      </div>

      default:
        return <p className='text-white'>No content available</p>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar onTabChange={setSelectedTab} />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-br from-gray-800 to-indigo-900 p-4 overflow-y-auto">
        {/* Header */}
        <Header />

        {/* Dynamic Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardComponent;