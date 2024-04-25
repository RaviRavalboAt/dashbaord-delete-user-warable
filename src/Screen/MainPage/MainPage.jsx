import React from 'react'
import "./MainPage.css"
// import { Input } from 'antd';
import { GENRATE_OTP } from '../../constant';
import { Button, Card, message  } from 'antd';
import axios from 'axios';
import {  validateMobile } from '../../Utils/utills';
import {  Input, Select } from 'antd';
import boAtImage from "../../Utils/images/boAt.png"
const { Option } = Select;



const MainScreen = ({ messageApi, mobile, setpage, setmobile, loader, setloader, countryCode, setCountryCode, countryCodesData }) => {


  const handleCountryCode = (value) => {
    setCountryCode(value);
  };

  const countryCodeSelect = (
    <Select value={countryCode} onChange={handleCountryCode} >
      {countryCodesData && countryCodesData?.map((item) => (
        item.status === 'active' && item.supported === true ? (
          <Option key={item?.id} value={item?.code}>
            {item?.code}
          </Option>
        ) : null
      ))}
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
      if(err.response.statusCode === 400) {
        console.log(err.response.message, "This is the 400 message");
         if(err.response.message === "User not found") {
          return messageApi.open({
            type: 'warning',
            content: 'User not found',
          });
         }
         else {
          return messageApi.open({
            type: 'warning',
            content: 'Retry limit exceeded please try after some time',
          });
         }
      }
      
      if (err.response) {
        const statusCode = err.response.status;
        const message = err.response.message
        switch (statusCode) {
          case 401:
            setloader(false)
            messageApi.open({
              type: 'warning',
              content: 'User not found',
            });
            break;
            case 400:
              setloader(false)
              if(message === "User not found") {
                messageApi.open({
                  type: 'warning',
                  content: 'User not found!!',
                });
                break;
              }
              else {
                messageApi.open({
                  type: 'warning',
                  content: 'Retry limit exceeded please try after some time',
                });
                break;
              }
             
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
        <h1>Welcome to boAt</h1>
      </div>
      <div className='rigth__main-mobile'>
     
        <div className='right_main-mobile-card'>
        <Card>   
          <div className="right_main-mobile-card-header">
            <img src={boAtImage} width="100" alt='boAt'></img>
            <h2>Delete User Account</h2>
          </div>
          <div className="right_main-mobile-card-body">
            <Input addonBefore={countryCodeSelect} placeholder="Enter Mobile Number"
              size='large'
              onChange={(e) => setmobile(e.target.value)}
              value-={mobile}
              className='mobile-iput' />
          </div>
          <div className="right_main-mobile-card-action">
          <Button type="primary" onClick={() => handleOnClick()}>Generate OTP</Button>
          </div>
     </Card>
        </div>
      </div>
    </div>
  )
}

export default MainScreen