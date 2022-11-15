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

import NavBar from "./components/NavBar";
import CreateReport from "./Pages/researchTeam/reportsection/component/CreateReport";

function App() {
  const { isAuthenticated, setIsAuthenticated, setIsLoading, updateAdminData, setIsAdmin, setUserRole, setUserInfo } = useContext(UserDataContext);

  const navigate = useNavigate();

  const getUserDataApi = async () => {
    const res = await userDashboard();
    if (res === "User Not found") {
      isAuthenticated(false);
      setIsLoading(false);
      navigate("/login");
    } else {
      setIsAuthenticated(true);
      updateAdminData(res.data.user);
      setIsAdmin(res.data.data.userData.isAdmin);
      setUserRole(res.data.data.userData.role);
      setUserInfo(res.data.data.userData);
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

    { isAuthenticated ? (
        <DashboardRoutes />
    )
    :
    (
    <Routes>
      <Route path="/" element={<Navigate replace to="login" />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/verifyEmail/:token" element={<VerifyPassword />} />
    </Routes>
    )
    }

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
