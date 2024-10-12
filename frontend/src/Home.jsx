import React, { useState, useContext, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import Headers from "./Headers";
import { UserContext } from "./App";
import { Link } from "react-router-dom";

function Home() {
  // Products fetched from DB
  const [products, setProducts] = useState([]);

  // Filters which are applied
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");

  const { login } = useContext(UserContext); // Assuming login is in UserContext

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8282/api/product/products"
        );
        setProducts(response.data.products);
        console.log(response.data); // Update products state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array, so this runs once when the component mounts

  function handleSubmit(e) {
    e.preventDefault();
    handleFilters(); // Call filters on submit
  }

  function handleFilters() {
    console.log("Filters applied:");
    console.log("Category:", category);
    console.log("Brand:", brand);
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
    console.log("Sort By:", sortBy);
    console.log("Order:", sort);
  }

  return (
    <>
      {login ? (
        <div>
          <Headers />

          <div className="w-full flex flex-col lg:flex-row bg-gray-100">
            {/* Sidebar Filter */}
            <div className="lg:w-1/4 w-full p-6 bg-white shadow-lg rounded-lg">
              <form className="text-center" onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                  Filter Products
                </h2>

                <input
                  type="text"
                  placeholder="Brand"
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Category"
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Min Price"
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <label className="block mt-2 text-gray-500">To</label>
                <input
                  type="text"
                  placeholder="Max Price"
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />

                <label className="block mt-4 text-gray-500 font-semibold">
                  Sort By:
                </label>
                <select
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="" disabled>
                    Select sort option
                  </option>
                  <option value="price">Price</option>
                  <option value="brand">Brand</option>
                </select>

                <label className="block mt-4 text-gray-500 font-semibold">
                  Order:
                </label>
                <select
                  className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="">Select order</option>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>

                <button
                  type="submit"
                  className="bg-amber-500 text-white px-6 py-2 mt-4 rounded-lg shadow-lg hover:bg-amber-600 transition duration-300 w-full"
                >
                  Apply Filters
                </button>
              </form>
            </div>
            {/* Product Section */}
            <div className="lg:w-3/4 w-full p-6 bg-gray-50">
              <h1 className="text-2xl font-bold text-gray-700 mb-4"></h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-lg rounded-lg p-4"
                  >
                    <img
                      src={product.img || "https://via.placeholder.com/150"}
                      alt={product.name}
                      className="rounded-lg w-full h-40 object-cover mb-4"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-gray-700">
                      {product.name}
                    </h3>
                    <p className="text-amber-500 font-bold">${product.price}</p>
                    <button className="bg-amber-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-amber-600 transition duration-300">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto my-5">
          <Link to="/login" className="text-red-500 text-center p-5">
            Jump to{" "}
            <span className=" px-2 py-1 bg-red-500 text-white rounded-lg hover:text-yellow-300">
              Login Page
            </span>
            You are not logged in
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;
