import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHeart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import BASE_URL from '../Config';
import axios from "axios";
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const TopHeader = () => {

      const [input, setInput] = useState({});

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
      const [messageApi, contextHolder] = message.useMessage();

      const nav = useNavigate();


      const handleInput = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setInput((values)=>({...values,[name]:value}))
      }


      const handleSubmit = async(e) =>{
        e.preventDefault();

        let api = `${BASE_URL}/ecommerce/admin`;

        try {
            let response = await axios.post(api,input);
            console.log(response);
            messageApi.success(response.data.msg2);
            setShow(false)
            localStorage.setItem("admin",response.data.Admin.name)
            nav("/dashboard");
        } 
        catch (error) 
        {
            messageApi.error(error.response.data.msg)
        }
      }

     


    return (

        <>
        <Navbar className="top-header">
            <Container className="justify-content-between">
                <Navbar.Text className="header-text">
                    10% off with SMS or email sign up
                </Navbar.Text>
                <Nav className="header-icons">
                    <FaHeart className="icon" />
                    <FaSearch className="icon" />
                    <RiAdminFill className="icon" onClick={handleShow} />
                 
                </Nav>
            </Container>
            <div className="header-separator"></div>
        </Navbar>

        

      <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton style={{ backgroundColor: "#013f46", color: "white", borderBottom: "2px solid #ddd" }}>
        <Modal.Title>Admin Login</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{ padding: "20px", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ textAlign: "left" }}>
                <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Enter ID:</label>
                <input type="text" name="adminid" onChange={handleInput}  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }} />
            </div>
            <div style={{ textAlign: "left" }}>
                <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Enter Password:</label>
                <input type="password" name="password" onChange={handleInput}  style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }} />
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer style={{ justifyContent: "space-between", padding: "15px" }}>
        <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: "#6c757d", border: "none", padding: "10px 20px" }}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: "#013f46", border: "none", padding: "10px 20px" }}>
            Submit
        </Button>
    </Modal.Footer>
</Modal>

   {contextHolder}
        </>
    );
};

export default TopHeader;