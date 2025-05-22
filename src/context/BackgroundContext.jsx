import { createContext, useContext, useState } from "react";

// 1. Tạo context
const BackgroundContext = createContext();

// 2. Provider
export const BackgroundProvider = ({ children }) => {
  const [bgColor, setBgColor] = useState("#121212"); // màu mặc định

  return (
    <BackgroundContext.Provider value={{ bgColor, setBgColor }}>
      {children}
    </BackgroundContext.Provider>
  );
};

// 3. Custom hook
export const useBackground = () => useContext(BackgroundContext);
