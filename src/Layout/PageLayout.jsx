import React from 'react'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'
import "./PageLayout.css"


const PageLayout = ({children,setpage,page}) => {
  return (
    <div className='main-div'>
    <Header page={page} setpage={(page) => setpage(page)}></Header>
    {children}
    <Footer></Footer>
    </div>
  )
}

export default PageLayout