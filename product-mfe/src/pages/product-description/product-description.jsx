import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "font-awesome/css/font-awesome.min.css";
import "./product-description.css";
import { getProductById } from '../../services/product-service';
import {
  getCartByUserId,
  createCart,
  addOrUpdateProduct,
} from "../../services/cart-service";
import meat from "../../assets/meat.jpg";

const userId = JSON.parse(localStorage.getItem("user"))?.id;

const ProductDescription = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductAndCart = async () => {
      try {
        const productData = await getProductById(productId);
        setProduct(productData);

        let userCart;
        try {
          userCart = await getCartByUserId(userId);
        } catch {
          userCart = await createCart(userId);
        }
        setCart(userCart);
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndCart();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const updatedCart = await addOrUpdateProduct(
        cart.cartId,
        product.productId,
        quantity
      );
      setCart(updatedCart);
      console.log("Product added to cart:", updatedCart);
      toast.success("Product added to cart!", { position: "top-right" });
      navigate("/product");
    } catch {
      toast.error("Failed to add product to cart.", { position: "top-right" });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-details-container">
      <ToastContainer />
      <img
        src={product.imageUrl || meat}
        alt={product.name}
        className="product-image"
      />
      <div className="content-container">
      <h1>{product.name}</h1>
      <p>{product.productDescription}</p>
      <p>Remaining {product.stock} pcs available</p>
      <div className="product-price">${(product.price * quantity).toFixed(2)}</div>
      <div className="quantity-controller">
        <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
      </div>
      <button className="btn purchase-btn" onClick={handleAddToCart}>
        Add to Cart
      </button>
      </div>
    </div>
  );
};

export default ProductDescription;
