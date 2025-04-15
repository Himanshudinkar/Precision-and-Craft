import { useEffect, useContext, useState } from "react";
import { MyContext } from "../LoginContext";
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from 'react-bootstrap/Table';
import { HiDocumentCurrencyRupee } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import { cartEmpty } from "../cartSlice";


const ChackOut=()=>{
const {logedIn} = useContext(MyContext);
const [cusData, setCusData] = useState({});
const navigate = useNavigate();
const dispatch= useDispatch();


const [shoe,setShoe] = useState({
  name: "Training Shoes",
  creator: "Nike",
  img: "https://images.pexels.com/photos/3490360/pexels-photo-3490360.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  price: 500,
});




useEffect(()=>{
  if (!localStorage.getItem("userLogedin"))
  {
     navigate("/home");
  }
  loadData();
}, []);


const loadData=async()=>{
  let api=`${BASE_URL}/ecommerce/getdata?userid=${localStorage.getItem("userid")}`;

  try {
       const response = await axios.get(api);
       console.log(response.data);
       setCusData(response.data);
  } catch (error) {
     console.log(error);
  }

}


 const Product= useSelector(state=>state.mycart.cart);
    console.log(Product);
   
    let totalAmount=0;
    let productsName="";
    let imgURL="";
    const ans=Product.map((key)=>{
        totalAmount+=key.price * key.qnty;
        productsName+=key.name + ", ";
        imgURL=`${BASE_URL}/${key.dfaultImage}`;
        return(
            <>
               <tr>
               <td>
                <img src={`${BASE_URL}/${key.dfaultImage}`} width="80" height="60" /> 
                </td>
                <td>{key.name}</td>
                <td>{key.brand}</td>
                <td>{key.price}</td>
                <td>
                  {key.qnty}
                  
                </td>
                <td>{key.price * key.qnty}</td>
                               </tr>
            </>
        )
    })



    const initPay = (data) => {
      const options = {
        key : "rzp_test_ZULuTiNSqwsNp2",
        amount: data.amount,
        currency: data.currency,
        name: productsName,
        description: "Test",
        image:imgURL,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyURL = "https://localhost:8080/api/payment/verify";
            const {data} = await axios.post(verifyURL,response);
          } catch(error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
    



    const handlePay = async () => {
      try {
        const orderURL = "http://localhost:8080/api/payment/orders";
        const {data} = await axios.post(orderURL,{amount: totalAmount , customername:cusData.name, address:cusData.address, contact:cusData.contact, email:cusData.email, proname:productsName});
        console.log(data);
        initPay(data.data);

        dispatch(cartEmpty());


      } catch (error) {
        console.log(error);
      }
    };
    
    
    
    return(
        <>
          <div className="checkout-container">
    <h1 className="checkout-heading">Your Checkout Page</h1>
<div className="table-responsive">
  <Table className="checkout-table" bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Product Name</th>
        <th>Brand</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {ans}
    </tbody>
  </Table>
</div>

    <h4 className="checkout-total">Your Total Payable Amount: ₹{totalAmount}</h4>

    <div className="customer-details">
      <div><strong>Customer Name:</strong> {cusData.name}</div>
      <div><strong>Shipping Address:</strong> {cusData.address}</div>
      <div><strong>Contact no:</strong> {cusData.contact}</div>
      <div><strong>Email:</strong> {cusData.email}</div>

      <Button className="pay-button" onClick={handlePay}>Pay Now!</Button>
    </div>
  </div>
     
        </>
    )
}

export default ChackOut;