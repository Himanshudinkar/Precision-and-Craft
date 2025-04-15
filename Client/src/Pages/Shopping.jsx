import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../Config";
import { useDispatch } from 'react-redux';
import { addtocart } from '../cartSlice';

const Shopping = () => {
  const { id } = useParams();
  const [mydata, setMydata] = useState({});
  const [mainImg, setMainImg] = useState("");
  const dispatch = useDispatch();
  const loadData = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/ecommerce/shoppingdata`, { id });
      setMydata(response.data);
      setMainImg(`${BASE_URL}/${response.data.dfaultImage}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const thumbnails = mydata.images?.filter(img => img !== mydata.dfaultImage);

  return (
    <div className="product-container">
      <div className="image-section">
        <div className="thumbnail-column">
          {thumbnails?.map((img, i) => (
            <img
              key={i}
              src={`${BASE_URL}/${img}`}
              alt="thumb"
              className="thumbnail"
              onMouseEnter={() => setMainImg(`${BASE_URL}/${img}`)}
            />
          ))}
        </div>

        <div className="main-image-box">
          <img src={mainImg} alt="product" className="main-image" />
        </div>
      </div>

      <div className="details-section">
        <h2>{mydata.name}</h2>
        <h3>Brand: <span>{mydata.brand}</span></h3>
        <h4>Category: <span>{mydata.category}</span></h4>
        <p>{mydata.description}</p>
        <h2 className="price">₹{mydata.price}</h2>
        <button className="buy-btn" onClick={()=>{dispatch(addtocart({id:mydata._id, name:mydata.name, description:mydata.description, price:mydata.price, brand:mydata.brand, category:mydata.category, dfaultImage:mydata.dfaultImage, images:mydata.images,qnty:1}))}} >Add to Cart</button>
      </div>
    </div>
  );
};

export default Shopping;
