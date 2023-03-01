import React, { useEffect, useState } from "react";
import "./Collection.scss";
import Product from "../../components/product/Product";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { axiosClient } from "../../utils/axiosClient";
import { motion } from "framer-motion";

function Collection() {
  const navigate = useNavigate();
  const params = useParams();
  const [categoryId, setCategoryId] = useState("");
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [products, setProducts] = useState([]);

  const sortOptions = [
    {
      value: "Price - Low To High",
      sort: "price",
    },
    {
      value: "Newest First",
      sort: "createdAt",
    },
  ];

  const [sortBy, setSortBy] = useState(sortOptions[0].sort);

  async function fetchProducts() {
    const url = params.categoryId
      ? `/products?populate=image&filters[category][key][$eq]=${params.categoryId}&sort=${sortBy}`
      : `/products?populate=image&sort=${sortBy}`;
    const response = await axiosClient.get(url);
    setProducts(response.data.data);
  }

  useEffect(() => {
    setCategoryId(params.categoryId);
    fetchProducts();
  }, [params, sortBy]);

  function updateCategory(e) {
    navigate(`/category/${e.target.value}`);
  }

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="Categories">
        <div className="container">
          <div className="header">
            <div className="info">
              <h2>Explore all print and work</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Tenetur rerum est ratione numquam praesentium.
              </p>
            </div>
            <div className="sort-by">
              <div className="sort-by-container">
                <h3 className="sort-by-text">Sort By</h3>
                <select
                  className="select-sort-by"
                  name="sort by"
                  id="sort by"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortOptions.map((item) => (
                    <option key={item.sort} value={item.sort}>
                      {item.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="filter-box">
              <div className="catergory-filter">
                <h3>Category</h3>
                {categories.map((item) => (
                  <div key={item.id} className="filter-radio">
                    <input
                      name="category"
                      type="radio"
                      id={item.id}
                      value={item.attributes.key}
                      onChange={updateCategory}
                      checked={item.attributes.key === categoryId}
                    />
                    <label htmlFor={item.id}>{item.attributes.title}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="products-box">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Collection;
