import { Route, Routes } from "react-router-dom"
import Layout from "./Layout"
import Home from "./Pages/Home"
import Dashboard from "./Dashboard/Dashboard"
import DashboardHome from "./Dashboard/DashboardHome"
import AddProduct from "./Dashboard/AddProduct"
import CartData from "./Pages/CartData"
import ChackOut from "./Pages/ChackOut"
import Registration from "./Pages/Registration"
import Shop from "./Pages/Shop"
import Shopping from "./Pages/Shopping"
import CustomerOrder from "./Dashboard/CustomerOder"

function App() {
 

  return (
    <>
            
    <Routes>   
      <Route path="/" element = {<Layout/>}>
      <Route index element = {<Home/>} />
      <Route path="/home" element = {<Home/>} />
      <Route path="/cartdata" element = {<CartData/>} />
      <Route path="/chackout" element = {<ChackOut/>} /> 
      <Route path="/registration" element = {<Registration/>} />
      <Route path="/shop" element = {<Shop/>} />
      <Route path="/shopping/:id" element = {<Shopping/>} />
      </Route>
    </Routes>


     <Routes>   
      <Route path="/dashboard" element = {<Dashboard/>}>
      <Route index element = {<DashboardHome/>}/>
      <Route path="/dashboard/home" element = {<DashboardHome/>}/>
      <Route path="/dashboard/addproduct" element = {<AddProduct/>}/>
      <Route path="/dashboard/customers" element = {<CustomerOrder/>}/>
     
      </Route>
    </Routes>
             
    </>
  )
}

export default App
