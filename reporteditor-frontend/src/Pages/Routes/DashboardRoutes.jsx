import React from 'react'
import { Routes, Route } from "react-router-dom";

// Import Components
import Dashboard from "../superAdmin/dashboard/DashboardAdmin";
import LogIn from '../login/LogIn';

function DashboardRoutes() {
  return (
    <>
      <Routes>
          <Route path='/a_control'>
            <Route index element={<Dashboard />} />
          </Route>
          
          {/* <Route path="/login" element={<LogIn />} /> */}
      </Routes>
    </>
  )
}

export default DashboardRoutes;