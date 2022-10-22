import './App.css';
import LogIn from './components/login/LogIn';
import * as React from 'react';
import DashboardAdmin from './pages/superAdmin/dashboard/DashboardAdmin';
import NavBar from './components/NavBar';
import UserActivity from './pages/usersActivities/UserActivity';


function App() {
  return (
    <>
   {/* <UserActivity/> */}
    <DashboardAdmin/>
    
      {/* <LogIn/>  */}
    </>
  );
}

export default App;
