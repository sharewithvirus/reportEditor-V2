import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { UserDataContext } from '../../context/userContext';

// Import Components

import NavBar from '../../components/NavBar';
import DashboardAdmin from "../superAdmin/dashboard/DashboardAdmin";
import DashboardResearchPanel from "../../Pages/researchTeam/dashboard/Dashboard";
import CreateReport from '../researchTeam/createReport/createReport';
// import DashboardResearchPanel from "../../Pages/researchTeam/reportsection/component";
import LogIn from '../login/LogIn';
import ReportTemplateManagement from '../researchTeam/reportsection/ReportTemplateManagement';
import SubmitReport from '../researchTeam/dashboard/component/SubmitReport';
import ReportEditor from '../researchTeam/reportEditor/ReportEditor';
import ReportPreview from '../researchTeam/reportEditor/ReportPreview';
import EditingDashboard from '../editingTeam/dashboard/EditingDashboard';
import DraftAccept from '../editingTeam/dashboard/component/DraftAccept';
// import NavBar from '../../components/NavBar';

function DashboardRoutes() {
  // const { userIf } = useContext(UserDataContext);
  return (
    <>
      <Routes>
          <Route path='/' element={<NavBar />}>
                <Route path='/a_control'>
                  <Route index element={<DashboardAdmin />} />
                </Route>
                {/* <Route path='/u_control'>
                  <Route index element={<DashboardResearchPanel />} />
                  <Route path='/u_control/create-report' element={<CreateReport />} />
                </Route> */}

                <Route path='/u_control'>
                  {/* <Route index element={<DashboardResearchPanel/>} /> */}
                  {/* <Route index element={<EditingDashboard/>} /> */}
                  <Route index element={<CreateReport />} />
                  {/* <Route index element={<DraftAccept/>}/> */}
                  <Route path='/u_control/create-report' element={<CreateReport />} />
                  <Route path="/u_control/report-editor" element ={<ReportEditor />} />
                  <Route path='/u_control/report-template-management' element={<ReportTemplateManagement />} />
                  <Route path="/u_control/submit-report" element={<SubmitReport/>}/>
                </Route>
              <Route path='/u_control'>
                {/* <Route index element={<DashboardResearchPanel/>} /> */}
                {/* <Route index element={<EditingDashboard/>} /> */}
                <Route index element={<CreateReport />} />
                {/* <Route index element={<DraftAccept/>}/> */}
                <Route path='/u_control/create-report' element={<CreateReport />} />
                <Route path="/u_control/report-editor" element ={<ReportEditor />} />
                <Route path='/u_control/report-template-management' element={<ReportTemplateManagement />} />
                <Route path="/u_control/submit-report" element={<SubmitReport/>}/>
              </Route>
          </Route>
      </Routes>
    </>
  )
}

export default DashboardRoutes;