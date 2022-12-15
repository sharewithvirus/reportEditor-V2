import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { UserDataContext } from "./context/userContext";

// import Services

import { userDashboard } from "./Services/authService";

// Import CSS from File
import "./App.css";

// Import Components
import DashboardAdmin from "./Pages/superAdmin/dashboard/DashboardAdmin";

import LogIn from "./Pages/login/LogIn";
import VerifyPassword from "./Pages/verifyPassword/VerifyPassword";
import Loader from "./components/Loader";
import DashboardRoutes from "./Pages/Routes/DashboardRoutes";
import Dashboard from "./Pages/researchTeam/dashboard/Dashboard";

import NavBar from "./components/NavBar";
function App() {
  const {
    isAuthenticated,
    setUserInfo,
    setIsAuthenticated,
    setIsLoading,
    updateAdminData,
  } = useContext(UserDataContext);

  const navigate = useNavigate();

  const getUserDataApi = async () => {
    const res = await userDashboard();
    
    if (res === "User Not found") {
      isAuthenticated(false);
      setIsLoading(false);
      navigate("/login");
    } else {
      setIsAuthenticated(true);
      setUserInfo(res.data.user);
      setIsLoading(false);
      if (res.data.user.role === "admin") {
        navigate("/a_control");
      } else if (res.data.user.role === "user") {
        navigate("/u_control");
      }
    }
  };

  useEffect(() => {
    getUserDataApi();
  }, []);
  return (
    <>
      <Loader />
      {/* <CreateReport   /> */}

      {isAuthenticated ? (
        <DashboardRoutes />
      ) : (
        <Routes>
          <Route path="/" element={<Navigate replace to="login" />}></Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/verifyEmail/:token" element={<VerifyPassword />} />
        </Routes>
      )}
      {/* <NavBar reportsDashboard={"Research Team Mode"} />

      <Routes>
        <Route path="/" element={<Navigate replace to="dashboard" />}></Route>
        <Route path="/dashboard" element={<Dashboard />} />
         
        <Route path="create-report" element={ <CreateReport />} />
      </Routes> */}
    </>
  );
}

export default App;
