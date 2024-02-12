import { FC } from "react";
import { useLocation } from "react-router-dom";

const SamplerPage: FC = () => {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="m-16">
      <div className="text-infitex text-3xl mb-8">Sampler data</div>
      <div>
        {/* Get the data from the SerialDataContext */}
        <div className="text-white">
          Display data from the SerialDataContext
        </div>
      </div>
    </div>
  );
};

export default SamplerPage;
