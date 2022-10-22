
import React, { createContext, useState } from "react";
export const UserDataContext = createContext();
const UseContext = (props) => {
  return (
    <UserDataContext.Provider >
        {props.children}
      </UserDataContext.Provider>
  )
}

export default UseContext
