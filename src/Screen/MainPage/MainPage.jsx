import React, { useState } from 'react'
import "./MainPage.css"
import { Input } from 'antd';
import { GENRATE_OTP } from '../../constant';
import { Button, message, Space } from 'antd';
import axios from 'axios';



const MainScreen = ({ messageApi,mobile,setpage, setmobile, loader, setloader }) => {


  const handleOnClick = async () => {
    try {
      const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/
      if (!mobile.match(regex)) {
        messageApi.open({
          type: 'error',
          content: 'Not a valid number',
        });
      }

      const payload = {
        mobile,
        countryCode: "+91"
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      setloader(true)
      let res = await axios.post(GENRATE_OTP, payload, { headers })
      setloader(false)
     
      if (res.data.statusCode == 200) {
        messageApi.open({
          type: 'success',
          content: res.data.message,
        });
        setpage("otp")
      }
      else{
        setloader(false)
        messageApi.open({
          type: 'warning',
          content: 'Something went wrong',
        });
      }
    }
    catch (err) {
      setloader(false)
      messageApi.open({
        type: 'error',
        content: 'Something went wrong',
      });
    }
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
              placeholder="Enter Mobile Number"
              size='large'
              onChange={(e) => setmobile(e.target.value)}
              value-={mobile}
              className='mobile-iput' />
            <Button type="primary" onClick={() => handleOnClick()}>Generate OTP</Button>
          </div>
          <div className="right_main-mobile-card-action">

          </div>
        </div>
      </div>
    </div>
  )
}

export default MainScreen