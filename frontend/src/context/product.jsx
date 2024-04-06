import React, { createContext, useState, useContext, useEffect } from "react";

const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(0);

  return (
    <productContext.Provider value={{ productId, setProductId }}>
      {children}
    </productContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(productContext);
  if (!context) {
    throw new Error("useProduct must be used within a ThemeProvider");
  }
  return context;
};
