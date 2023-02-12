import React, { createContext, useContext, useState } from "react";
export const RoleContext = createContext();

export const RoleState = (props) => {
  const [role, setRole] = useState("");
  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {props.children}
    </RoleContext.Provider>
  );
};
