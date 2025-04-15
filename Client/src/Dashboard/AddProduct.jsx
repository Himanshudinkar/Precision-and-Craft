import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col, Card, InputGroup } from 'react-bootstrap';
import { FaTag, FaAlignLeft, FaBuilding, FaBoxes, FaDollarSign, FaImages } from 'react-icons/fa';
import { useState } from 'react';
import BASE_URL from '../Config';
import axios from 'axios';
import { message } from 'antd';

const AddProduct = () => {

    const [input,setInput] = useState({});
    const [image,setImage] = useState("");

    const [messageApi, contextHolder] = message.useMessage();

    const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setInput((values)=>({...values,[name]:value}))
        console.log(input)
    }

    const handleImage = (e) =>{
        const images = e.target.files;
        setImage(images);
        console.log(image)
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const formdata = new FormData();

        for (let key in input) {
            formdata.append(key, input[key]);
          }
        
        for (let i = 0; i < image.length; i++) {
            formdata.append('image', image[i]);
          }
          
        let api = `${BASE_URL}/ecommerce/addproduct`;

        try {
            let response = await axios.post(api,formdata);
            console.log(response.data);
            messageApi.success(response.data.msg);
        } catch (error) {
            console.log(error.response.data)
        }
    }

       
  return (
    <>
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>  
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <div className="text-center mb-4">
                <h1 className="text-dark fw-bold mb-3" style={{ fontSize: '2.5rem' }}>
                  Add New Product
                </h1>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>
                  Fill in the details below to add a new product to the catalog.
                </p>
                <div style={{
                  width: '80px', 
                  height: '4px', 
                  background: 'linear-gradient(to right, #007bff, #00d4ff)', 
                  margin: '0 auto'
                }}></div>
              </div>

              <Form>
                <Form.Group className="mb-3" controlId="formProductName">
                  <Form.Label>Product Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaTag /></InputGroup.Text>
                    <Form.Control type="text" name='name' onChange={handleInput} placeholder="Enter product name" className="shadow-sm" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaAlignLeft /></InputGroup.Text>
                    <Form.Control as="textarea" name='description'  onChange={handleInput} rows={4} placeholder="Enter product description" className="shadow-sm" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBrand">
                  <Form.Label>Brand Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaBuilding /></InputGroup.Text>
                    <Form.Select aria-label="Select brand" className="shadow-sm" name='brand'  onChange={handleInput} >
                      <option>Choose Brand</option>
                      <option value="Rolex">Rolex</option>
                      <option value="Audemars Piguet">Audemars Piguet</option>
                      <option value="Patek Philippe">Patek Philippe</option>
                      <option value="Richard Mille">Richard Mille</option>
                      <option value="Longines">Longines</option>
                      <option value="Vacheron Constantin">Vacheron Constantin</option>
                      <option value="Timex">Timex</option>
                      <option value="Titne">Titne</option>
                      <option value="Sonata">Sonata</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategories">
                  <Form.Label>Categories</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaBoxes /></InputGroup.Text>
                    <Form.Select aria-label="Select category" className="shadow-sm" name='categories'  onChange={handleInput}>
                      <option>Choose Category</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Sports">Sports</option>
                      <option value="Casual">Casual</option>
                      <option value="Chronograph Watches">Chronograph Watches</option>
                      <option value="Hybrid Watches">Hybrid Watches</option>
                    </Form.Select>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaDollarSign /></InputGroup.Text>
                    <Form.Control type="number" name='price'  onChange={handleInput} placeholder="Enter product price" className="shadow-sm" />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImages">
                  <Form.Label>Upload Images</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaImages /></InputGroup.Text>
                    <Form.Control type="file"  onChange={handleImage} multiple className="shadow-sm" />
                  </InputGroup>
                </Form.Group>

                <Button variant="success" type="submit" className="w-100 mt-4"onClick={handleSubmit} >
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

      {contextHolder}
      </>
  );
};

export default AddProduct;
