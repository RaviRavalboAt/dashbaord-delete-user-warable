import { useEffect, useState } from 'react';
import './App.css';
import PageLayout from './Layout/PageLayout';
import MainPage from "./Screen/MainPage/MainPage"
import OTPVerificationPage from "./Screen/OTPVerificationScreen/OTPVerificationPage"
import SuccessPage from "./Screen/SuccessScreen/SuccessPage"
import {  Spin, Switch } from 'antd';
import { Button, message, Space } from 'antd';
import { COUNTRY_CODE } from './constant';
import axios from 'axios';



function App() {
  const [page, setpage] = useState("main")
  const [mobile, setmobile] = useState('')
  const [loader, setloader] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();
  const [countryCode, setCountryCode] = useState('+91');

  const [countryCodesData, setCountryCodesData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(COUNTRY_CODE);
        setCountryCodesData(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className='app'>
       {contextHolder}
  <Spin spinning={loader} delay={500} tip="Loading .... Please wait">
   <PageLayout>
    {page === "main" ?  
    <MainPage 
    countryCode={countryCode}
    countryCodesData={countryCodesData}
    setCountryCode={(countryCode) => setCountryCode(countryCode)}
    messageApi={messageApi}
    mobile={mobile}
    setmobile={(mobile) =>setmobile(mobile) }
    loader={loader}
    setloader={(loader) => setloader(loader)}
    page={page}
    setpage={(page) => setpage(page)}>
    </MainPage> : null}


    {page === "otp" ?  
    <OTPVerificationPage  
    countryCode={countryCode}
    messageApi={messageApi}
    mobile={mobile}
    setmobile={(mobile) =>setmobile(mobile) }
    loader={loader}
    setloader={(loader) => setloader(loader)}
    page={page}
    setpage={(page) => setpage(page)}>
    </OTPVerificationPage> : null}


    {page === "success" ?  
    <SuccessPage
    page={page}
    setpage={(page) => setpage(page)}
     loader={loader}
    setloader={(loader) => setloader(loader)}
    ></SuccessPage> : null}
   </PageLayout>
   </Spin>
   </div>
  );
  
}

export default App;
