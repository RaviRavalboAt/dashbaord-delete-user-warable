import { Button } from 'antd'
import React from 'react'
import { BackwardFilled } from '@ant-design/icons';
import "./Header.css"
import logo from "./boat_logo.png"

const Header = ({setpage,page}) => {

  const handleOnClick = () => {
    if(page === "otp") return setpage("main")
    if(page === "success") return setpage("main");
 }

  return (
    <div className='header'>
         <img src={logo} alt="boAt logo"/>
         {page !== "main" && <Button onClick={() => handleOnClick()} icon={<BackwardFilled />}>
          Back
      </Button>}
    </div>
  )
}

export default Header