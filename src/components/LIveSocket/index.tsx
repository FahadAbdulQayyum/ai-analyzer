import React from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';

const LiveAnalytics = () => {
  const messages = useWebSocket('ws://localhost:8080');
console.log('...message...', messages)
  return (
    <div>
      <h1>Live Analytics Updates</h1>
      <ul className='bg-orange-400 text-white'>
        <h1>Live Updates</h1>
        {messages.map((msg: any, index: any) => (
          <li key={index}>
            {JSON.stringify(msg)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LiveAnalytics;