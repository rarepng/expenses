import { createContext, useState } from "react";

import { Transaction } from "@/types/Transaction";


export const LogsContext = createContext({
  logs: [] as Transaction[],
  addEntry: (log:Transaction) => {},
  removeEntry: (log:Transaction) => {},
});

export const LogsContextProvider = (props : any) => {
  const [logs, setLogs] = useState<Transaction[]>([]);

  const addEntry = (log:Transaction) => {
    setLogs((current:Transaction[]) : Transaction[] => [...current, log]);
  };
  const removeEntry = (log:Transaction) => {
    setLogs((current) =>
        current.filter((del:Transaction) => del.name !== log.name)
    );
  };

  const value = {
    logs: logs,
    addEntry: addEntry,
    removeEntry: removeEntry
  };
  return (
    
    <LogsContext.Provider value={value}>{props.children}</LogsContext.Provider>
  );
};

