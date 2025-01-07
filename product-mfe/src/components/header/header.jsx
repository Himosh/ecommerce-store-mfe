import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getCartByUserId, removeProductFromCart } from "../../services/cart-service";
import { createOrderFromCart } from "../../services/order-service";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import "./header.css";

const userId = JSON.parse(localStorage.getItem("user"))?.userId;

const Header = ({onSearch}) => {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setRole(loggedInUser.role);
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const fetchedCart = await getCartByUserId(loggedInUser.id);
        setCart(fetchedCart);
      } catch (error) {
        console.error("Failed to fetch cart:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeProductFromCart(cart.cartId, productId);
      setCart(updatedCart);
      toast.success("Product removed from cart!", { position: "top-right" });
    } catch (error) {
      console.error("Failed to remove product:", error.message);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const order = await createOrderFromCart(cart.cartId);
      toast.success("Order successfully created!", { position: "top-right" });
      setCart({ items: [], totalAmount: 0 });
      setIsCartOpen(false);
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Remove user details from localStorage and redirect
    localStorage.removeItem("user");
    toast.success("Successfully logged out", { position: "top-right" });
    navigate("/");
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const handleDashboardNavigate = () => {
    navigate("/dashboard");
  };

  const handleCreateUserNavigate = () => {
    navigate("/signup");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <h1>Sysco Store</h1>
      </div>
      <div className="navbar-content">
        <input
          type="text"
          placeholder="Search..."
          className="navbar-search"
          onChange={(e) => onSearch(e.target.value)}
        />

        <button className="navbar-cart" onClick={toggleCart} aria-label="Cart">
          🛒 <span className="cart-counter">{cart?.items?.length || 0}</span>
        </button>

        {role ? (
          <>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
            {role === 'ADMIN' || role === 'DATA_STEWARD' ? (
              <button className="navbar-dashboard" onClick={handleDashboardNavigate}>
                Dashboard
              </button>
            ) : null}
            {role === 'ADMIN' ? (
              <button className="navbar-create-user" onClick={handleCreateUserNavigate}>
                Create User
              </button>
            ) : null}
          </>
        ) : (
          <button className="navbar-login">Login</button>
        )}
      </div>

      {isCartOpen && (
        <div className="cart-modal">
          {loading ? (
            <p>Loading...</p>
          ) : cart?.items?.length > 0 ? (
            <div className="cart-details">
              <h2>Your Cart</h2>
              <ul className="cart-items-list">
                {cart.items.map((item) => (
                  <li key={item.productId} className="cart-item">
                    <div>
                      <p>{item.productName || `ProductId ${item.productId}`}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
                    </div>
                    <button
                      className="remove-btn-cart"
                      onClick={() => handleRemoveItem(item.productId)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <strong>Total Price: ${cart.totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
          <div className="button-container">
            <button
              className="close-cart-btn"
              onClick={toggleCart}
              disabled={loading}
            >
              Close
            </button>
            <button
              className="order-cart-btn"
              onClick={handlePlaceOrder}
              disabled={loading || cart.items.length === 0}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
