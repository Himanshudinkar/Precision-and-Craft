// CustomerOrder.jsx
import axios from "axios";
import { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import BASE_URL from "../Config";


const CustomerOrder = () => {
  const [mydata, setMydata] = useState([]);
  const [dispatchedRows, setDispatchedRows] = useState([]);

  const loadData = async () => {
    let api = `${BASE_URL}/ecommerce/getcustomerorder`;
    try {
      const response = await axios.get(api);
      setMydata(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDispatch = (index) => {
    if (!dispatchedRows.includes(index)) {
      setDispatchedRows([...dispatchedRows, index]);
    }
  };

  return (
    <div className="co-container">
      <h1 className="co-title">Customer Orders</h1>
      <Table striped bordered hover responsive className="co-table">
        <thead>
          <tr>
            <th>Products Name</th>
            <th>Total Amount</th>
            <th>Customer Name</th>
            <th>Shipping Address</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Date of Purchasing</th>
            <th>Dispatch</th>
          </tr>
        </thead>
        <tbody>
          {mydata.map((key, index) => (
            <tr
              key={index}
              className={dispatchedRows.includes(index) ? "co-dispatched-row" : ""}
            >
              <td>{key.name}</td>
              <td>${key.totalamount}</td>
              <td>{key.customername}</td>
              <td>{key.address}</td>
              <td>{key.contact}</td>
              <td>{key.email}</td>
              <td>{key.dop}</td>
              <td>
                <button
                  className="co-dispatch-btn"
                  onClick={() => handleDispatch(index)}
                >
                  Dispatch
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerOrder;
