import React, { useState } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import Cart from "../cart/Cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function NavBar() {
  let user = JSON.parse(localStorage.getItem("userinfo"));
  console.log(user);
  const [openCart, setOpenCart] = useState(false);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const cart = useSelector((state) => state.cartReducer.cart);
  const navigate = useNavigate();

  let totalItems = 0;
  cart.forEach((item) => (totalItems += item.quantity));

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav className="NavBar">
        <div className="container nav-container">
          <div className="nav-left">
            <ul className="link-group">
              {localStorage.getItem("userinfo") ? (
                <>
                  <li className="center">{user && user.username}</li>
                  <button
                    className="center"
                    style={{
                      backgroundColor: "#212121",
                      color: "white",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={logout}
                  >
                    <BiLogOut />
                  </button>
                </>
              ) : (
                <li>
                  <button
                    className="btn-primary"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </button>
                </li>
              )}

              {categories?.map((category) => (
                <li className="hover-link" key={category.id}>
                  <Link
                    className="link"
                    to={`/category/${category.attributes.key}`}
                  >
                    {category.attributes.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav-center">
            <Link to="/">
              <h1 className="banner">Posterz</h1>
            </Link>
          </div>
          <div className="nav right">
            <div
              className="nav-cart hover-link"
              onClick={() => setOpenCart(!openCart)}
            >
              <BsCart2 className="icon" />
              {totalItems > 0 && (
                <span className="cart-count center">{totalItems}</span>
              )}
            </div>
          </div>
        </div>
      </nav>
      {openCart && <Cart onClose={() => setOpenCart(false)} />}
    </>
  );
}

export default NavBar;
