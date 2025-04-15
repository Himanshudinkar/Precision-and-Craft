import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import BASE_URL from '../Config';
import { message } from 'antd';
import axios from 'axios';
import { MyContext } from '../LoginContext';

const TopNav = () => {

    const [input, setInput] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [messageApi, contextHolder] = message.useMessage();


    const {logedIn, setLogedIn, uname, uemail, setUname, setUemail} = useContext(MyContext);

    const nav = useNavigate();

    const navigate = () => {
        nav("/cartdata");
    };

    const product = useSelector(state => state.mycart.cart);
    const proLength = product.length;

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput((values) => ({ ...values, [name]: value }));
    };


      const handleSubmit = async (e) =>{
        e.preventDefault();

         let api = `${BASE_URL}/ecommerce/customerlogin`;

         try {
            const response =  await axios.post(api,input);
            console.log(response.data);
            localStorage.setItem("token", response.data.token);
            messageApi.success(response.data.msg1);
            setShow(false)
            setLogedIn(true)
            nav("/home")

         } catch (error) {
            messageApi.error(error.response.data.msg)
         }
        
    }

    const logout=()=>{
   localStorage.clear();
   setUname("")
   setUemail("");
   setLogedIn(false);
   nav("/home");  
}



    return (
        <>
            <Navbar expand="lg" className="custom-navbar" style={{ backgroundColor: "#013f46" }}>
                <Container>
                    <Navbar.Brand>
                        <img src={logo} alt="Logo" className="navbar-logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-toggler" style={{ backgroundColor: "white" }} />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="nav-links">
                            <Nav.Link as={Link} to="/home" className='linking'>HOME</Nav.Link>
                            <Nav.Link as={Link} to="/shop" className='linking'>SHOP</Nav.Link>
                            <Nav.Link as={Link} to="/registration" className='linking'>REGISTRATION</Nav.Link>
                        </Nav>
                       <Nav className="nav-icons" style={{ alignItems: 'center', gap: '25px' }}>

    {/* LOGIN text (optional) */}
    <div className="nav-item">
        <FaUser className="icon" style={{ color: "#d1d1d1" }} />
        <span className="nav-text" onClick={handleShow}>LOGIN</span>
    </div>

    {/* BAG icon */}
    <div className="nav-item" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <FaShoppingCart className="icon" onClick={navigate} />
        <span className='prolength'><p>{proLength}</p></span>
        <span className="nav-text">BAG</span>
    </div>

    {/* 👤 User Dropdown aligned slightly left */}
    <Dropdown align="end">
        <Dropdown.Toggle 
            variant="link" 
            style={{ 
                color: "#d1d1d1", 
                textDecoration: "none", 
                fontWeight: "bold", 
               

            }}
        >
            {uname}
        </Dropdown.Toggle>

        <Dropdown.Menu 
            style={{ 
                minWidth: "200px", 
                transform: "translateX(-20px)" // shifts dropdown slightly left 
            }}
        >
            <Dropdown.Header>Email: {uemail}</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} >Logout</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>

</Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Login Modal */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton style={{ backgroundColor: "#013f46", color: "white", borderBottom: "2px solid #ddd" }}>
                    <Modal.Title>User Login</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: "20px", textAlign: "center" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                        <div style={{ textAlign: "left" }}>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Enter Email:</label>
                            <input type="text" name="email" onChange={handleInput} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Enter Password:</label>
                            <input type="password" name="password" onChange={handleInput} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", outline: "none" }} />
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

export default TopNav;



