import { FC, useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useSerialData } from "../SerialDataContext";
import { loadingIcon } from "../icons/loadingIcon";
import { connect } from "../connectToSampler";

const SelectionMenu: FC = () => {
  // State for selected items
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [selectedConnection, setSelectedConnection] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Hook to nagiagate to /sampler page
  const navigate = useNavigate();

  // Serial Data context hook
  const { updateSerialData } = useSerialData();

  // Define sensor to connection mapping
  const sensorConnectionMap: { [key: string]: string[] } = {
    Sampler: ["USB board"],
    "Infi-sole": ["USB board", "Bluetooth", "Data-logger"],
    ForcePad: ["USB board", "Bluetooth", "Data-logger"],
    "Button strip": ["USB board"],
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 10000); // Clear the error after 2 second
    }
    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, [error]);

  const handleSensorSelection = (sensor: string) => {
    setSelectedSensor(sensor);
    // Reset connection selection when sensor selection changes
    setSelectedConnection(null);
  };

  const handleConnectionSelection = (connection: string) => {
    setSelectedConnection(connection);
  };

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      await connect(updateSerialData);
      navigate("/sensor/sampler"); // Pass data to /sampler page
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  // Function to get button classes
  const getButtonClasses = (name: string, selectedName: string | null) => {
    return `select-button ${name === selectedName ? "bg-infitex" : ""}`;
  };

  // Get available connections based on selected sensor
  const availableConnections = selectedSensor
    ? sensorConnectionMap[selectedSensor] || []
    : [];

  return (
    <div className="m-16 flex flex-col flex-1">
      {/* Sensors */}
      <div className="flex flex-col mb-16">
        <div className="text-infitex text-3xl mb-8">Select your sensor</div>
        <div className="flex flex-row">
          {Object.keys(sensorConnectionMap).map((sensor) => (
            <button
              key={sensor}
              className={getButtonClasses(sensor, selectedSensor)}
              onClick={() => handleSensorSelection(sensor)}
            >
              {sensor}
            </button>
          ))}
        </div>
      </div>

      {/* Connections */}
      {selectedSensor && availableConnections.length > 0 && (
        <div className="flex flex-col mb-32">
          <div className="text-infitex text-3xl mb-8">
            Select connection type
          </div>
          <div className="flex flex-row">
            {availableConnections.map((connection) => (
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
      )}

      {/* Connect button */}
      {selectedSensor && selectedConnection && (
        <div className="flex flex-col">
          <div className="flex flex-row">
            <button
              className={`select-button h-[80px] ${
                isLoading ? "w-[180px] bg-infitex" : ""
              }`}
              onClick={!isLoading ? handleConnect : undefined} // Prevent function invocation when loading
            >
              {isLoading ? (
                <Fragment>
                  Connecting
                  {loadingIcon}
                </Fragment>
              ) : (
                "Connect"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Selection error message box */}
      {error && <div className="text-infitex mt-8">{error}</div>}
    </div>
  );
};

export default SelectionMenu;
