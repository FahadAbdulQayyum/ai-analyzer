"use client"

import React, { useEffect } from 'react'

const AiDashboard = () => {

    useEffect(() => {
        const aiAnalyzer = async () => {
            try {
                const response = await fetch('/api/ai-analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify({ username }),
                  });
                  console.log('...response...', response)
            } catch (err) {
                
            }
        }
        aiAnalyzer()
    }, [])
    
  return (
    <div>AiDashboard</div>
  )
}

export default AiDashboard