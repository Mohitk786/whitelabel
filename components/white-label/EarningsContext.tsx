"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type Earnings = {
  clients: number;
  price: number;
  cost: number;
  setClients: (n: number) => void;
  setPrice: (n: number) => void;
  setCost: (n: number) => void;
};

const EarningsContext = createContext<Earnings | null>(null);

// Shared so the survey can store the visitor's calculator settings with their answers.
export function EarningsProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState(15);
  const [price, setPrice] = useState(49);
  const [cost, setCost] = useState(12);

  const value = useMemo(
    () => ({ clients, price, cost, setClients, setPrice, setCost }),
    [clients, price, cost],
  );

  return (
    <EarningsContext.Provider value={value}>{children}</EarningsContext.Provider>
  );
}

export function useEarnings() {
  const ctx = useContext(EarningsContext);
  if (!ctx) throw new Error("useEarnings must be used inside EarningsProvider");
  return ctx;
}
