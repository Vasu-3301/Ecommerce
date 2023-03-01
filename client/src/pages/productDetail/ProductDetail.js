import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from "../../components/loader/Loader";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { axiosClient } from "../../utils/axiosClient";
import "./ProductDetail.scss";
import { motion } from "framer-motion";

function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer.cart);
  const quantity =
    cart.find((item) => item.key === params.productId)?.quantity || 0;

  async function fetchData() {
    const productResponse = await axiosClient.get(
      `/products?filters[key][$eq]=${params.productId}&populate=*`
    );
    console.log("product", productResponse);
    if (productResponse.data.data.length > 0) {
      setProduct(productResponse.data.data[0]);
    }
  }

  useEffect(() => {
    setProduct(null);
    fetchData();
  }, [params]);

  if (!product) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ProductDetail">
        <div className="container">
          <div className="product-layout">
            <div className="product-img center">
              <div className="img-container">
                <img
                  src={product?.attributes.image.data.attributes.url}
                  alt="Sports Shoes"
                />
              </div>
            </div>
            <div className="product-info">
              <h1 className="heading">{product?.attributes.title}</h1>
              <h3 className="price">$ {product?.attributes.price}</h3>
              <p className="description">{product?.attributes.decs}</p>
              <div className="cart-options">
                <div className="quantity-selector">
                  <span
                    className="btn decrement"
                    onClick={() => dispatch(removeFromCart(product))}
                  >
                    -
                  </span>
                  <span className="quantity">{quantity}</span>
                  <span
                    className="btn increment"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    +
                  </span>
                </div>
                <button
                  className="btn-primary add-to-cart"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to cart
                </button>
              </div>
              <div className="return-policy">
                <ul>
                  <li>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Ipsum, dolorem voluptatibus?
                  </li>
                  <li>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem inventore modi eligendi porro, aspernatur, vitae
                    earum in non, recusandae facere tempora?
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
