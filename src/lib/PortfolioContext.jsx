import React, { createContext, useContext, useState, useEffect } from "react";

const PortfolioContext = createContext();

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ganti dengan URL Apps Script Anda
        const response = await fetch('https://script.google.com/macros/s/AKfycbzsOHz5P2I3OjNrsH-oFwYGaLOR8SzOjyxZota1K89EEHbZV23B31bwjKWK4K-AgwmL/exec');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return context;
}