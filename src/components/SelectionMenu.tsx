import { FC, useState, useEffect } from "react";
import { loadingIcon } from "../icons/loadingIcon";
import { connect } from "../connectToSampler";

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
      }, 6000); // Clear the error after 2 second
    }
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [selectionError]);

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
    connect(setSelectionError);
  };

  // Function to get button classes
  const getButtonClasses = (name: string, selectedName: string | null) => {
    return `select-button ${name === selectedName ? "bg-infitex" : ""}`;
  };

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
