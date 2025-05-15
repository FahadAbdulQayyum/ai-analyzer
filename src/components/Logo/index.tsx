import React from 'react'

const LogoComponent = ({size=20}) => {
  return (
    <div className="text-center text-white">
        <span className={`flex flex-row items-center mb-${size} space-x-2`}>
            <img
              src="/images/weeshare-logo.svg"
              alt="WeeShare Logo"
              className="w-10 mb-4"
            />
            <img
              src="/images/wee-share-txt.svg"
              alt="WeeShare Text"
              className="w-30 mb-4"
            />
        </span>
    </div>
  )
}

export default LogoComponent