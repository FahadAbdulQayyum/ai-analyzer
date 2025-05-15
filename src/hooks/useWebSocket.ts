import { useEffect, useState } from 'react';

export function useWebSocket(url: string) {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return messages;
}