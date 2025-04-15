import { Table, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../Config";
import { productRemove, quntyDecrease, quntyIncrease } from "../cartSlice";
import ani from "../assets/ani.gif"

const CartData = () => {
  const Product = useSelector((state) => state.mycart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalAmount = 0;

  return (
    <div className="cart-container">
      <h1 className="cart-heading">🛒 Your Cart</h1>

      {Product.length === 0 ? (
        <div className="empty-cart">
          <img
            src={ani}
            alt="Empty Cart"
            className="empty-cart-img"
          />
          <p className="text-light fs-4 mt-3">Oops! Your cart is empty.</p>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Product.map((item) => {
                totalAmount += item.price * item.qnty;
                return (
                  <tr key={item.id}>
                    <td>
                      <Image
                        src={`${BASE_URL}/${item.dfaultImage}`}
                        height="50"
                        width="50"
                        rounded
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="quantity-control">
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => dispatch(quntyDecrease({ id: item.id }))}
                        >
                          <FaMinus />
                        </Button>
                        <span className="quantity-value">{item.qnty}</span>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => dispatch(quntyIncrease({ id: item.id }))}
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </td>
                    <td>₹{item.price * item.qnty}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => dispatch(productRemove({ id: item.id }))}
                      >
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount}</h3>
            <Button variant="warning" onClick={() => navigate("/chackout")}>
              Proceed to Checkout
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartData;
