import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../Config';
import { message } from 'antd';

const Registration = () => {

  const [input, setInput] = useState({});
  const [messageApi, contextHolder] = message.useMessage();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api = `${BASE_URL}/ecommerce/registration`;
    try {
      const response = await axios.post(api, input);
      messageApi.success(response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <div className="reg-container-uni">
      <div className="reg-box-uni">
        <h2 className="reg-title-uni">User Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Enter Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Full Name" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Enter Address</Form.Label>
            <Form.Control type="text" name="address" placeholder="Address" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Enter City</Form.Label>
            <Form.Control type="text" name="city" placeholder="City" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Enter Contact</Form.Label>
            <Form.Control type="text" name="contact" placeholder="Phone Number" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Enter Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Email" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="reg-label-uni">Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" onChange={handleInput} className="reg-input-uni" />
          </Form.Group>

          <Button type="submit" className="reg-btn-uni">Register</Button>
        </Form>
      </div>
    </div>
    
      {contextHolder}
    </>
  );
};

export default Registration;
