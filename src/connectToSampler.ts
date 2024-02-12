export const connect = async () => {
  if (!("serial" in navigator)) {
    throw new Error(
      "Web Serial API not supported, please use a supported browser (Chrome, Edge, Opera) on a desktop device."
    );
  }

  try {
    const port: SerialPort = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    await port.setSignals({ dataTerminalReady: true });
    await port.setSignals({ requestToSend: false });
    readFromSerialPort(port);
  } catch (error) {
    throw new Error("Error connecting to serial port: " + error);
  }
};

const readFromSerialPort = async (port: SerialPort) => {
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
    } catch (error) {
      throw new Error("Error reading from serial port: " + error);
    } finally {
      reader.releaseLock();
    }
  }
};
