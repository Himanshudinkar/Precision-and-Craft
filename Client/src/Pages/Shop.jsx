import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import BASE_URL from "../Config";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addtocart } from '../cartSlice';
import { useNavigate } from "react-router-dom";

const Shop = () =>{

    const [mydata,setMydata] = useState([]);

    const dispatch = useDispatch();

    const nav = useNavigate();

   

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
    },[])

     const navigate = (id) =>{
        nav(`/shopping/${id}`)
    }

    return(
        <>
        
       
        <div className="singleline">
            <h1>WATCH CATEGORIES</h1>
            <p>Timeless Elegance, Modern Precision – Find Your Perfect Watch Today</p>
        </div>

        <div className="cards-grid">
                {mydata.map((key) => (
                    <Card className="custom-card" key={key.id}>
                        <div className="card-image-container" onClick={()=>(navigate(key._id))}>
                            <Card.Img variant="top" src={`${BASE_URL}/${key.dfaultImage}`} className="card-img"  />
                            <div className="card-icons">
                                <span className="iconi">❤</span>
                                <span className="iconi">👁</span>
                            </div>
                        </div>
                        <Card.Body className="card-body">
                            <p className="card-category">{key.category}</p>
                            <Card.Title className="card-title">{key.brand}</Card.Title>
                            <Card.Text className="card-price">${key.price}</Card.Text>
                            <Button variant="primary" className="add-to-cart" onClick={()=>{dispatch(addtocart({id:key._id, name:key.name, description:key.description, price:key.price, brand:key.brand, category:key.category, dfaultImage:key.dfaultImage, images:key.images,qnty:1}))}}>Add To Cart</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        
        </>
    )
}

export default Shop