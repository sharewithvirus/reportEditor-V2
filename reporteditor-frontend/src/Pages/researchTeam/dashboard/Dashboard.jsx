import React from "react";
import NavBar from "../../../components/NavBar";
import DashboardPanel from "./DashboardPanel";


function Dashboard() {
  return (
    <>
    <NavBar reportsDashboard={"Research Team Mode"} />
      <DashboardPanel pageType={"Reports Management"}/>
      {/* <DashboardPanel/> */}
    </>
  );
}

export default Dashboard;
