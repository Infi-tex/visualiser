import { FC, useEffect, useState } from "react";
import { useSerialData } from "../../SerialDataContext";

const SamplerView: FC = () => {
  const { serialData } = useSerialData();

  return (
    <div className="m-16">
      <div className="text-infitex text-3xl mb-8">Sampler data</div>
      <div>
        {/* Get the data from the SerialDataContext */}
        <div className="text-black">
          <div>{serialData}</div>
        </div>
      </div>
    </div>
  );
};

export default SamplerView;
