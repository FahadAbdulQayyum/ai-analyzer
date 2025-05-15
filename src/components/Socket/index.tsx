import React from 'react'
import useWebSocket from '../WebSocket'

const SocketComponent = () => {

    const data = useWebSocket('ws://localhost:8080')
    
  return (
    <div className="bg-orange-400 z-10">
        <h1>Live Updates</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default SocketComponent