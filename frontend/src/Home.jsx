import React, { useState } from "react";
import Headers from "./Headers";

function Home() {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(category);
  }

  function handleFilters() {
    console.log(category);
    console.log(brand);
    console.log(minPrice);
    console.log(maxPrice);
  }

  return (
    <>
      <div>{<Headers />}</div>

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
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Category"
              className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
            />
            <input
              type="text"
              placeholder="Min Price"
              className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
            />
            <label className="block mt-2 text-gray-500">To</label>
            <input
              type="text"
              placeholder="Max Price"
              className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            />

            <label className="block mt-4 text-gray-500 font-semibold">
              Sort By:
            </label>
            <select
              className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300"
              value={category}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="" defaultValue="None" disabled>
                none
              </option>
              <option value="price">Price</option>
              <option value="brand">Brand</option>
            </select>

            <label className="block mt-4 text-gray-500 font-semibold">
              Order:
            </label>
            <select className="my-2 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-300">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <button
              type="submit"
              className="bg-amber-500 text-white px-6 py-2 mt-4 rounded-lg shadow-lg hover:bg-amber-600 transition duration-300 w-full"
              onClick={handleFilters}
            >
              Apply Filters
            </button>
          </form>
        </div>

        {/* Product Section */}
        <div className="lg:w-3/4 w-full p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">
            Available Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example of Product Cards */}
            <div className="bg-white shadow-lg rounded-lg p-4">
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="rounded-lg w-full h-40 object-cover mb-4"
              />
              <h3 className="text-lg font-semibold mb-2 text-gray-700">
                Product Name
              </h3>
              <p className="text-amber-500 font-bold">$99.99</p>
              <button className="bg-amber-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-amber-600 transition duration-300">
                View Details
              </button>
            </div>

            {/* Repeat the above card with actual data */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
