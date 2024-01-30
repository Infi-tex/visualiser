export const connect = async (setError: Function) => {
  // Web Serial API is only supported on latest versions of Chrome, Edge and Opera
  // and is not supported on mobile browsers
  if (!("serial" in navigator)) {
    setError("Web Serial API not supported");
    return;
  }

  try {
    const port: SerialPort = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    await port.setSignals({ dataTerminalReady: true });
    await port.setSignals({ requestToSend: false });
    readFromSerialPort(port, setError);
  } catch (error) {
    setError("Connection failed: " + error);
  }
};

const readFromSerialPort = async (port: SerialPort, setError: Function) => {
  while (port.readable) {
    const reader = port.readable
      //   .pipeThrough(new TextDecoderStream())
      .getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // |reader| has been canceled
          break;
        }
        // Do something with |value|...
        console.log(value);
      }
    } catch (e) {
      console.error(e);
      setError("Error reading from serial port");
    } finally {
      reader.releaseLock();
    }
  }
};
