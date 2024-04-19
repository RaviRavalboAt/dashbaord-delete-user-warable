import React from 'react'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import "./PageLayout.css"


const PageLayout = ({children}) => {
  return (
    <div className='main-div'>
    <Header></Header>
    {children}
    <Footer></Footer>
    </div>
  )
}

export default PageLayout