import React from 'react'
import "./SuccessPage.css"
import { Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import {  Result } from 'antd';
import boAtImage from "../../Utils/images/boAt.png"



const MainScreen = () => {

  return (
    <div className='main-mobile'>
          <div className='left__main-mobile'>
            <h1>Welcome to boAt</h1>
          </div>
          <div className='rigth__main-mobile'>
          <div className='right_main-mobile-card'>
          <Card> <div className="right_main-mobile-card-header">
            <img src={boAtImage} width="100" alt='boAt'></img>
            <h2>Delete User Account</h2>
            </div>
        <Result
    icon={<SmileOutlined />}
    title="User Account Deleted Successfully!"
   
  /></Card>
          </div>
          </div>
    </div>
  )
}

export default MainScreen