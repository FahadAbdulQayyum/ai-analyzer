import { useEffect, useState } from 'react';

const useWebSocket = (url: string) => {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Message received:', message);
            setData(message);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, [url]);

    return data;
};

export default useWebSocket;