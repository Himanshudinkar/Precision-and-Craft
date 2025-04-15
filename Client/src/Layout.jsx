
import TopNav from "./Components/TopNav"
import TopHeader from "./Components/TopHeader"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer"

const Layout = () =>{
    return(
        <>
        <TopHeader/>
    
        <TopNav/>

        <Outlet/>

        <Footer/>
   
        </>
    )
}


export default Layout


