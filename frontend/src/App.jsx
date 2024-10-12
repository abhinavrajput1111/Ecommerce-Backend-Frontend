import { useState, createContext } from "react";
import Home from "./Home";
import Register from "./Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard"; // Fixed naming convention

// Create a User Context
export const UserContext = createContext(false);

function App() {
  const [login, setLogin] = useState(null);

  return (
    <>
      <div>
        <BrowserRouter>
          {/* Use the created UserContext with the correct provider */}
          <UserContext.Provider value={{ login, setLogin }}>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/admin/dashboard"
                element={<AdminDashboard />}
              />{" "}
              {/* Fixed naming */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
