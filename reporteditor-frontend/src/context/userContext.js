import React, { createContext, useState } from "react";
export const UserDataContext = createContext({
  updateAdminData: () => { },
});

const UserContext = (props) => {
    const [userInfo, setUserInfo] = useState('')
    const [userLogOut, setUserLogOut] = useState()
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [supportSigleData, setSupportSingleData]=useState()
  
    const [adminData, setAdminData] = useState({});
    const updateAdminData = (data) => {
      setAdminData(data);
      
    };
  
    return (
      <UserDataContext.Provider value={{
        updateAdminData, adminData,
        setUserInfo, userInfo,
        userLogOut, setUserLogOut,
        isAuthenticated, setIsAuthenticated,
        isLoading, setIsLoading,
        setSupportSingleData,supportSigleData,
        isAdmin, setIsAdmin,
        userRole, setUserRole
      }}>
        {props.children}
      </UserDataContext.Provider>
    );
  };
  
  export default UserContext;