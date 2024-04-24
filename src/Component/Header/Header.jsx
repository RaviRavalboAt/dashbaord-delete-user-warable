import { Button } from 'antd'
import React from 'react'
import { BackwardFilled } from '@ant-design/icons';
import "./Header.css"

const Header = ({setpage,page}) => {

  const handleOnClick = () => {
    if(page === "otp") return setpage("main")
    if(page === "success") return setpage("main");
 }

  return (
    <div className='header'>
         <img src="https://wearable.boat-lifestyle.com/media/logos/boat_logo.png"/>
         {page !== "main" && <Button onClick={() => handleOnClick()} icon={<BackwardFilled />}>
          Back
      </Button>}
    </div>
  )
}

export default Header