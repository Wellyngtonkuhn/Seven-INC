import { useState, createContext, useContext } from "react";

const DashBoardContext = createContext();

export const useDashBoardContext = () => {
  return useContext(DashBoardContext);
};

export default function DashBoardProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <DashBoardContext.Provider value={{ isDrawerOpen, handleDrawer }}>
        {children}
      </DashBoardContext.Provider>
    </>
  );
}
