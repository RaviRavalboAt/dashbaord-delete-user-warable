import React, { useState } from 'react'
import "./OTPVerificationPage.css"
import { Input } from 'antd';
import { Button } from 'antd';


const MainScreen = () => {

  const [mobile, setmobile] = useState('')


   const handleOnClick = () => {
      const payload = {
        mobile,
        coutryCode: "+91"
      }


      console.log(payload)
   }


  return (
    <div className='main-mobile'>
          <div className='left__main-mobile'>
            <h1>Welcome to BoAt</h1>
          </div>
          <div className='rigth__main-mobile'>
          <div className='right_main-mobile-card'>
            <div className="right_main-mobile-card-header">
            <img src="https://wearable.boat-lifestyle.com/media/logos/boAt.png" width="100"></img>
            <h2>Delete User Accout</h2>
            </div>
            <div className="right_main-mobile-card-body">
            <Input 
            placeholder="OTP" 
            size='large'  
            onChange={(e) => setmobile(e.target.value)}
            value-={mobile}
            className='mobile-iput'/>
            <Button type="primary" onClick={() => handleOnClick()}>Verify OTP</Button>
            </div>
            <div className="right_main-mobile-card-action">
           
            </div>
          </div>
          </div>
    </div>
  )
}

export default MainScreen