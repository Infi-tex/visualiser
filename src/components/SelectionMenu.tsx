import { FC, useState, useEffect } from "react";

export const SelectionMenu: FC = () => {
  // State for selected items
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    null
  );
  const [selectionError, setSelectionError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (selectionError) {
      timer = setTimeout(() => {
        setSelectionError(null);
      }, 2000); // Clear the error after 2 second
    }
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [selectionError]);

  // Handlers for selections
  const handleSensorSelection = (sensor: string) => {
    setSelectedSensor(sensor);
  };

  const handleConnectionSelection = (connection: string) => {
    setSelectedConnection(connection);
  };

  const handleConnect = () => {
    if (!selectedSensor || !selectedConnection) {
      setSelectionError("Please select all options");
      return;
    }
    setIsLoading(true);
  };

  // Function to get button classes
  const getButtonClasses = (name: string, selectedName: string | null) => {
    return `select-button ${name === selectedName ? "bg-infitex" : ""}`;
  };

  // Custom loading icon
  // From https://heroicons.com/
  const loadingIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="animate-spin w-6 h-6 infitex ml-4 mb-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );

  return (
    <div className="m-16 flex flex-col flex-1">
      {/* Sensors */}
      <div className="flex flex-col mb-16">
        <div className="text-infitex text-3xl mb-8">Select your sensor</div>
        <div className="flex flex-row">
          {["Sampler", "Infi-sole", "Forcepad", "Button strip"].map(
            (sensor) => (
              <button
                key={sensor}
                className={getButtonClasses(sensor, selectedSensor)}
                onClick={() => handleSensorSelection(sensor)}
              >
                {sensor}
              </button>
            )
          )}
        </div>
      </div>

      {/* Connections */}
      <div className="flex flex-col mb-32">
        <div className="text-infitex text-3xl mb-8">Select connection type</div>
        <div className="flex flex-row">
          {["USB board", "Data-logger", "Bluetooth"].map((connection) => (
            <button
              key={connection}
              className={getButtonClasses(connection, selectedConnection)}
              onClick={() => handleConnectionSelection(connection)}
            >
              {connection}
            </button>
          ))}
        </div>
      </div>

      {/* Connect button */}
      <div className="flex flex-col">
        <div className="flex flex-row">
          {(isLoading && (
            <button
              className="select-button w-[180px] h-[80px] bg-infitex"
              disabled
              onClick={handleConnect}
            >
              Connecting
              {loadingIcon}
            </button>
          )) || (
            <button className="select-button h-[80px]" onClick={handleConnect}>
              Connect
            </button>
          )}
        </div>
      </div>

      {/* Selection error message box */}
      {selectionError && (
        <div className="text-infitex mt-8">{selectionError}</div>
      )}
    </div>
  );
};
