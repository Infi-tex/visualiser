import { FC, createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context's value
interface SerialDataProps {
  serialData: string[]; // Assuming serial data will be stored as an array of strings
  updateSerialData: (newData: string) => void; // Function to update the serial data
}

// Create the context with an initial undefined value, but specify the type
const SerialDataContext = createContext<SerialDataProps | undefined>(undefined);

// Props type for the provider component
interface SerialDataProviderProps {
  children: ReactNode;
}

// Provider component
export const SerialDataProvider: FC<SerialDataProviderProps> = ({
  children,
}) => {
  const [serialData, setSerialData] = useState<string[]>([]);

  const updateSerialData = (newData: string) => {
    setSerialData((prevData) => [...prevData, newData]);
  };

  return (
    <SerialDataContext.Provider value={{ serialData, updateSerialData }}>
      {children}
    </SerialDataContext.Provider>
  );
};

// Custom hook to use the serial data context
export const useSerialData = (): SerialDataProps => {
  const context = useContext(SerialDataContext);
  if (context === undefined) {
    throw new Error("useSerialData must be used within a SerialDataProvider");
  }
  return context;
};
