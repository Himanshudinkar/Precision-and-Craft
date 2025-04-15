import Carousel from 'react-bootstrap/Carousel';
import cover from "../assets/cover.jpg";
import cover2 from "../assets/cover2.jpg";
import cover3 from "../assets/cover3.jpg";
import Card from 'react-bootstrap/Card';
import payment from "../assets/mail.png"
import cube from "../assets/cube.png"
import rotate from "../assets/rotate.png"
import chack from "../assets/chack.png"
import { useEffect, useState, useContext } from 'react';
import BASE_URL from '../Config';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addtocart } from '../cartSlice';
import { MyContext } from "../LoginContext";



const Home = () => {

    const [mydata,setMydata] = useState([]);

    const dispatch = useDispatch();

     const {logedIn, setLogedIn, setUname, setUemail} = useContext(MyContext);


      const customerAunthenticate=async()=>{

    const token=localStorage.getItem("token");
     if (token)
     {
         let api=`${BASE_URL}/ecommerce/userauthenticate`;

         const response =await axios.get(api, {
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log(response.data);
        localStorage.setItem("username", response.data.name);
        localStorage.setItem("useremail", response.data.email);
        localStorage.setItem("userid", response.data._id);
        localStorage.setItem("userLogedin", true);
        setLogedIn(true);
        setUname(localStorage.getItem("username"));
        setUemail(localStorage.getItem("useremail"));
     }
   }

    const loadData = async () =>{

        let api = `${BASE_URL}/ecommerce/displaydata`;
        
        try {
            const response = await axios.get(api);
            console.log(response.data);
            setMydata(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadData();
        customerAunthenticate();
    },[])


     useEffect(()=>{
        customerAunthenticate();
    },[logedIn])
   

    return (
        <>
        <div className="carousel-container">
            <Carousel className="custom-carousel" style={{ height:"80vh" }}>
                <Carousel.Item>
                    <img src={cover} alt="" className="carousel-image" />
                    <Carousel.Caption style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "10px", borderRadius: "8px", backdropFilter: "blur(5px)" }}>
                        <h3 style={{ color: "#FFD700", fontSize: "22px", fontWeight: "bold" }}>Timeless Elegance</h3>
                        <p style={{ color: "white", fontSize: "14px" }}>Experience the perfect blend of luxury and precision with our exquisite collection of watches.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={cover2} alt="" className="carousel-image" />
                    <Carousel.Caption style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "10px", borderRadius: "8px", backdropFilter: "blur(5px)" }}>
                        <h3 style={{ color: "#FFD700", fontSize: "22px", fontWeight: "bold" }}>Unmatched Craftsmanship</h3>
                        <p style={{ color: "white", fontSize: "14px" }}>Designed for those who appreciate detail and sophistication. Elevate your style today.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src={cover3} alt="" className="carousel-image" />
                    <Carousel.Caption style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "10px", borderRadius: "8px", backdropFilter: "blur(5px)" }}>
                        <h3 style={{ color: "#FFD700", fontSize: "22px", fontWeight: "bold" }}>Precision & Innovation</h3>
                        <p style={{ color: "white", fontSize: "14px" }}>Stay ahead of time with our latest range, crafted for excellence and durability.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>



        <div className="iconcard">

             <Card style={{ width: '18rem' }} className='cards'>
      <Card.Body>
        
        <Card.Text className='ic'>
        
            <img src={payment} alt=""  style={{width:"35px"}}/>
        
          <div className="iccon">
            <h1>PAYMENT</h1>
        <p>Fast Payment</p>

          </div>
        </Card.Text>
        
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem' }} className='cards'>
      <Card.Body>
         <Card.Text className='ic'>
        
            <img src={cube} alt=""  style={{width:"55px"}}/>
        
          <div className="iccon">
            <h1>DELIVERY</h1>
        <p>Fast Delivery</p>

          </div>
        </Card.Text>
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem' }} className='cards'>
      <Card.Body>
        <Card.Text className='ic'>
        
            <img src={rotate} alt=""  style={{width:"35px"}}/>
        
          <div className="iccon">
            <h1>RETURNS</h1>
        <p>Quick Returns</p>

          </div>
        </Card.Text>
      </Card.Body>
    </Card>

     <Card style={{ width: '18rem' }} className='cards'>
      <Card.Body>
         <Card.Text className='ic'>
        
            <img src={chack}  style={{width:"32px"}}/>
        
          <div className="iccon">
            <h1>HIGH QUALITY</h1>
        <p>High Quality Product</p>

          </div>
        </Card.Text>
      </Card.Body>
    </Card>

        </div>

        <div className="singleline">
            <h1>WATCH CATEGORIES</h1>
            <p>Timeless Elegance, Modern Precision – Find Your Perfect Watch Today</p>
        </div>


       <div className="cards-grid">
    {mydata.slice(0, 8).map((key) => (
        <Card className="custom-card" key={key.id}>
            <div className="card-image-container">
                <Card.Img variant="top" src={`${BASE_URL}/${key.dfaultImage}`} className="card-img" />
                <div className="card-icons">
                    <span className="iconi">❤</span>
                    <span className="iconi">👁</span>
                </div>
            </div>
            <Card.Body className="card-body">
                <p className="card-category">{key.category}</p>
                <Card.Title className="card-title">{key.brand}</Card.Title>
                <Card.Text className="card-price">${key.price}</Card.Text>
                <Button 
                    variant="primary" 
                    className="add-to-cart" 
                    onClick={() => {
                        dispatch(addtocart({
                            id: key._id, 
                            name: key.name, 
                            description: key.description, 
                            price: key.price, 
                            brand: key.brand, 
                            category: key.category, 
                            dfaultImage: key.dfaultImage, 
                            images: key.images, 
                            qnty: 1
                        }))
                    }}
                >
                    Add To Cart
                </Button>
            </Card.Body>
        </Card>
    ))}
</div>

        </>
    );
};

export default Home;
