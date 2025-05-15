import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PercentageAnalytics = ({change="-10%", value="500"}) => {
  return (
        <div className={`flex items-center text-sm px-1.5 py-0.2 ${change.includes('-') ? 'text-redColor bg-redColorT': 'bg-greenColorT text-greenColor'} rounded`}>
                {value.includes('500') && <p className='bg-greenColorT h-[6px] w-[6px] rounded-full mr-1'></p>}
                {value.includes('500') ? "Live" : change.slice(1,)}
                {!value.includes('500')
                ?
                    <Icon icon={`${change.includes('-') ? 'mdi:arrow-bottom-right-thick': 'mdi:arrow-top-right-thick'}`} 
                        className={`${change.includes('-') ? 'text-redColor': 'text-greenColor'}`}
                    />
                :
                ""
                }
        </div>
  )
}

export default PercentageAnalytics