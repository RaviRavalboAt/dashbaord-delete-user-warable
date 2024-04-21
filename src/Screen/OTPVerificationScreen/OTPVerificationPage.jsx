import React, { useState } from 'react'
import "./OTPVerificationPage.css"
import { Input } from 'antd';
import { DELETE_URL, GENRATE_OTP, VERIFY_OTP } from '../../constant';
import { Button, message, Space } from 'antd';
import axios from 'axios';



const MainScreen = ({ messageApi, setpage, mobile, loader, setloader, countryCode }) => {

  const [otp, setOtp] = useState('')

  const handleOnClick = async () => {
    try {
      const payload = {
        mobile,
        countryCode: countryCode,
        otp
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      setloader(true)
      let res;
      try {
        res = await axios.post(VERIFY_OTP, payload, { headers });
      }
      catch (err) {
        setloader(false)
        messageApi.open({
          type: 'warning',
          content: 'OTP is Invalid',
        });
      }

     
      if (res.data.statusCode === 200) {

        const authToken = res.data.data.token;

        const payload = {
          "mobile": mobile
        };


        const headers = {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };

        let response
        try {
          response = await axios.delete(DELETE_URL, {
            headers,
            data: payload,
          })
        }
        catch (err) {
          setloader(false)
          messageApi.open({
            type: 'warning',
            content: 'User not found',
          });
        }

        if (response.data.statusCode === 200) {
          setloader(false)
          setpage("success")
        }
        else {
          setloader(false)
          messageApi.open({
            type: 'warning',
            content: 'User not found',
          });
        }

      }
      else {
        messageApi.open({
          type: 'warning',
          content: 'OTP is Invalid',
        });
      }
    }
    catch (err) {
      setloader(false)
    }

  }

  const handleResendOtp = async () => {
    try {

    
      const payload = {
        mobile,
        countryCode: countryCode
      }

      const headers = {
        'Content-Type': 'application/json',
      };

      setloader(true)
      let res = await axios.post(GENRATE_OTP, payload, { headers })
      setloader(false)

      if (res.data.statusCode === 200) {
        messageApi.open({
          type: 'success',
          content: res.data.message,
        });
      }
      else {
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
        type: 'warning',
        content: 'Something went wrong',
      });
    }
    setOtp('')
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
              onChange={(e) => setOtp(e.target.value)}
              value-={otp}
              className='mobile-iput' />

            <div className='otp-button-position'>
              <div className='first-btn'>
                <Button onClick={() => handleResendOtp()}>Resend OTP</Button>
              </div>

              <div className='second-btn'>
                <Button type="primary" onClick={() => handleOnClick()}>Verify OTP</Button></div>
            </div>
          </div>
          <div className="right_main-mobile-card-action">

          </div>
        </div>
      </div>
    </div>
  )
}

export default MainScreen