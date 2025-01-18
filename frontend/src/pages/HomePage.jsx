import React, { useEffect } from 'react'
import { BsFillRocketTakeoffFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/product';
import CardSection from '../component/CardSection';


function HomePage({ isDarkMode }) {
  const { fetchProducts, products } = useProductStore()
  useEffect(() => {
    fetchProducts();
    console.log("Fetched Products: ", products); // Ensure products has data
  }, [fetchProducts]);

  console.log("products", products)
  return (
    <div className="home">
      <h1>Current Product <BsFillRocketTakeoffFill /></h1>
      <div className="row">
      {products.map((product) => (
          <CardSection key={product._id} product={product} isDarkMode={isDarkMode} />
        ))}
      </div>
        
      {products.length === 0 && (
        <div className="sub-heading">
          <div>No product found <MdOutlineProductionQuantityLimits /> {" "}
            <Link to={"/create"}>
              Create a product
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage