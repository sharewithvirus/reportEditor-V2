import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { UserDataContext } from '../../context/userContext';

// Import Components

import NavBar from '../../components/NavBar';
import DashboardAdmin from "../superAdmin/dashboard/DashboardAdmin";
import DashboardResearchPanel from "../../Pages/researchTeam/dashboard/Dashboard";
// import DashboardResearchPanel from "../../Pages/researchTeam/reportsection/component";
import LogIn from '../login/LogIn';
// import NavBar from '../../components/NavBar';

function DashboardRoutes() {
  const { userIf } = useContext(UserDataContext);
  return (
    <>
      <Routes>
      <Route path='/' element={<NavBar />}>
            <Route path='/a_control'>
              <Route index element={<DashboardAdmin />} />
            </Route>
            <Route path='/u_control'>
              <Route index element={<DashboardResearchPanel />} />
              <Route path='create-report' element={<DashboardResearchPanel />} />
            </Route>
          </Route>
          {/* <Route path="/login" element={<LogIn />} /> */}
      </Routes>
    </>
  )
}

export default DashboardRoutes;