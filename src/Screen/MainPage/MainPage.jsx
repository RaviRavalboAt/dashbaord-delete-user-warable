import React, { useState } from 'react'
import "./MainPage.css"
// import { Input } from 'antd';
import { GENRATE_OTP } from '../../constant';
import { Button, message, Space } from 'antd';
import axios from 'axios';
import { checkUserExist, validateMobile } from '../../Utils/utills';
import { Cascader, Input, Select } from 'antd';
const { Option } = Select;


const MainScreen = ({ messageApi, mobile, setpage, setmobile, loader, setloader , countryCode, setCountryCode }) => {


  const handleCountryCode = (value) => {
    setCountryCode(value);
  };

  const countryCodeSelect = (
    <Select value={countryCode} onChange={handleCountryCode} >
      <Option value="+91">+91</Option>
    </Select>
  );



  const handleOnClick = async () => {
    if (!validateMobile(mobile, messageApi)) return;

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
        setpage("otp")
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
      if (err.response) {
        const statusCode = err.response.status;
        switch (statusCode) {
          case 401:
            setloader(false)
            messageApi.open({
              type: 'warning',
              content: 'User not found',
            });
            break;
        }
      } else {
        setloader(false)
        messageApi.open({
          type: 'warning',
          content: 'Something went wrong',
        });
      }
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


            <Input addonBefore={countryCodeSelect} placeholder="Enter Mobile Number"
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