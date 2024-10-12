import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { UserContext } from "./App";

function Headers() {
  const { login, setLogin } = useContext(UserContext);

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
            {login ? (
              <Link
                to="/login"
                className="px-2 bg-green-500 py-1 px-3 rounded-lg"
              >
                Log Out
              </Link>
            ) : (
              ""
            )}

            <Link
              to="/register"
              className="px-2 bg-yellow-500 py-1 px-3 rounded-lg"
            >
              {" "}
              Register
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Headers;
