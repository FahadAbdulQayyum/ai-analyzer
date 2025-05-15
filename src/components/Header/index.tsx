import Button from '@/app/Screen/Button';
import { useEffect, useState } from 'react';

const Header = () => {
  const [username, setUserName] = useState('Guest!');

  useEffect(() => {
    const fetchUserName = () => {
      const userName = localStorage.getItem('userName');
      setUserName(userName || 'Guest!'); // Default to 'Guest!' if not found
      if (userName) {
        return userName;
      } else {
        return 'Guest!'; // Default name if not found
      }
    }
    fetchUserName();
  }, []);

  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {username} 👋</h1>
        <p className="text-sm text-gray-400">
          This is the Admin Dashboard. Track the Analytics here.
        </p>
      </div>
      <div>
        <Button style={"border-colorful"} title={"Export Data"} ic={"mdi:arrow-down-thin"} lic='' wide={false} cntr={false}/>
        <Button style={"bg-colorful"} title={"Create report"} ic='' lic='' wide={false} cntr={false}/>
      </div>
    </div>
  );
};

export default Header;