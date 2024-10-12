import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./App";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8282/login",
        {
          email,
          password,
          role,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const userRole = response.data.role;
        setLogin(true); // Set login status to true

        // Correctly check user role
        if (userRole === "admin") {
          navigate("/admin/dashboard");
        } else if (userRole === "user") {
          navigate("/home");
        } else {
          alert("Not registered as a valid user or Admin");
          setLogin(false);
          navigate("/login");
        }
      }
    } catch (err) {
      console.log("Error during login process:", err);
      alert("Kindly check the credentials");
    }
  }

  async function checkLogin() {
    try {
      const response = await axios.get("http://localhost:8282/loggedInUser", {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching logged-in user:", err);
    }
  }

  // Adding empty dependency array to avoid infinite re-renders
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center border-4 border-red-100">
        <section className="flex items-center w-full justify-center h-screen bg-gray-50">
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-2xl font-bold sm:text-3xl">
                Login to your Account
              </h1>
            </div>

            <form
              className="mx-auto mb-0 mt-8 max-w-md space-y-4"
              onSubmit={handleLogin}
            >
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
              </div>

              <div className="mx-auto p-2">
                <select
                  className="mt-1 w-1/2 px-10 rounded-md border-gray-200 bg-white shadow-sm border"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    None
                  </option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  No account?{" "}
                  <Link to="/register" className="underline">
                    Sign up
                  </Link>
                </p>
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
            <img
              alt=""
              src="https://plus.unsplash.com/premium_photo-1664475282327-b1fe8e56e9e7?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
