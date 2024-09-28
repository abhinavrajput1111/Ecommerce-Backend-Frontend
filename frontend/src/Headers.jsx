import React from "react";

function Headers() {
  return (
    <div>
      <header className="w-full bg-blue-950">
        <div className="mx-2 p-2 flex text-gray-100 justify-center h-12 items-center">
          <div className="w-[20%]">
            <img src="logo2.webp" className="h-12 w-12 m-3" />
          </div>
          <div className="w-[60%] flex justify-center gap-10">
            <p className=" hover:bg-cyan-100 ">Products</p>
            <p>Cart</p>
            <p>Category</p>
            <p>Wishlist</p>
          </div>

          <div className="w-[20%] flex justify-center items-center gap-4">
            <p className="px-2 bg-green-500 py-1 px-3 rounded-lg">Login</p>
            <p className="px-2 bg-yellow-500 py-1 px-3 rounded-lg"> Register</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Headers;
