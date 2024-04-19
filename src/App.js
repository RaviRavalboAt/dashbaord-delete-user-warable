import { useState } from 'react';
import './App.css';
import PageLayout from './Layout/PageLayout';
import MainPage from "./Screen/MainPage/MainPage"
import OTPVerificationPage from "./Screen/OTPVerificationScreen/OTPVerificationPage"
import SuccessPage from "./Screen/SuccessScreen/SuccessPage"


function App() {
  const [page, setpage] = useState("otp")


  return (
    <div className='app'>
   <PageLayout>
    {page === "main" ?  
    <MainPage 
    page={page}
    setpage={(page) => setpage(page)}>
    </MainPage> : null}


    {page === "otp" ?  
    <OTPVerificationPage  
    page={page}
    setpage={(page) => setpage(page)}>
    </OTPVerificationPage> : null}


    {page === "success" ?  
    <SuccessPage
    page={page}
    setpage={(page) => setpage(page)}
    ></SuccessPage> : null}
   </PageLayout>
   </div>
  );
  
}

export default App;
