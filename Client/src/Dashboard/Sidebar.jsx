import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUsers, FaClock } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
import { CiLogout } from "react-icons/ci";
import { useEffect } from "react";

const Sidebar = () => {

  const nav = useNavigate();

  const logout = () =>{
    localStorage.removeItem("admin")
    nav("/home")
  }

  useEffect(()=>{
    if(!localStorage.getItem("admin"))
    {
      nav("/home")
    }
  },[])
  return (
    <div className="bg-dark text-white p-4" style={{ width: "250px", minHeight: "100vh" }}>
      <h2 className="mb-4">Admin Dashboard</h2>
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/dashboard/home" className="text-white">
          <FaClock /> Home
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/addproduct" className="text-white">
          <FaShoppingCart /> Add Product
        </Nav.Link>
        <Nav.Link as={Link} to="/dashboard/customers" className="text-white">
          <FaUsers /> Customers Order
        </Nav.Link>
        <Nav.Link className="text-white" onClick={logout} >
          <CiLogout /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
