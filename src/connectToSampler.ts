// Implementation details: https://developer.mozilla.org/en-US/docs/Web/API/TransformStreamDefaultController
export class LineBreakTransformer implements TransformStreamDefaultController {
  private container: string = "";

  desiredSize!: number | null;

  transform(chunk: string, controller: TransformStreamDefaultController) {
    this.container += chunk;
    const parts = this.container.split("\r\n"); // Adjust the line break character as needed
    this.container = parts.pop() ?? "";
    parts.forEach((part) => controller.enqueue(part));
  }

  flush(controller: TransformStreamDefaultController) {
    if (this.container) {
      controller.enqueue(this.container);
    }
  }
  terminate(): void {
    throw new Error("Method not implemented.");
  }

  enqueue(chunk?: any): void {
    throw new Error("Method not implemented.");
  }

  error(reason?: any): void {
    throw new Error("Method not implemented.");
  }
}

export const connect = async (updateSerialData: (newData: string) => void) => {
  if (!("serial" in navigator)) {
    throw new Error(
      "Web Serial API not supported, please use a supported browser (Chrome, Edge, Opera) on a desktop device."
    );
  }

  try {
    const port: SerialPort = await navigator.serial.requestPort();
    await port.open({ baudRate: 115200 });
    await port.setSignals({ dataTerminalReady: true, requestToSend: false });
    readFromSerialPort(port, updateSerialData);
  } catch (error) {
    throw new Error("Error connecting to serial port: " + error);
  }
};

const readFromSerialPort = async (
  port: SerialPort,
  updateSerialData: (newData: string) => void
) => {
  while (port.readable) {
    const reader = port.readable
      .pipeThrough(new TextDecoderStream()) // Decode stream from bytes to text
      .pipeThrough(new TransformStream(new LineBreakTransformer())) // Transform stream to split data by newline (not sure if this works correctly)
      .getReader();

    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // |reader| has been canceled
          break;
        }
        updateSerialData(value);
      }
    } catch (error) {
      throw new Error("Error reading from serial port: " + error);
    } finally {
      reader.releaseLock();
    }
  }
};
