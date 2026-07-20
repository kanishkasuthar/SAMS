import React, { createContext, useState, useContext } from 'react';

const AnalyticsContext = createContext();

export const useAnalytics = () => useContext(AnalyticsContext);

export const AnalyticsProvider = ({ children }) => {
  const [simulationState, setSimulationState] = useState({
    budget: 100, // percentage modifier (100 = base)
    employees: 100,
    hierarchyDepth: 5,
    automationLevel: 20 // 0-100%
  });

  const [activeItem, setActiveItem] = useState(null); // For MasterDrawer
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Derived metrics based on simulation state
  const orgHealthScore = Math.min(100, Math.max(0, 92 + (simulationState.automationLevel * 0.1) - (Math.abs(100 - simulationState.employees) * 0.2)));
  const authorityStability = Math.min(100, Math.max(0, 88 - (simulationState.hierarchyDepth > 6 ? (simulationState.hierarchyDepth - 6) * 5 : 0)));

  return (
    <AnalyticsContext.Provider value={{
      simulationState,
      setSimulationState,
      orgHealthScore,
      authorityStability,
      activeItem,
      setActiveItem,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen
    }}>
      {children}
    </AnalyticsContext.Provider>
  );
};
