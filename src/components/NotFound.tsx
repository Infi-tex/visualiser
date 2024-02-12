import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/");
  };
  return (
    <div className="m-16 flex flex-col flex-1">
      <div className="text-infitex text-3xl mb-8">Page not found</div>
      <div className="text-white text-xl mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </div>
      <button
        className="select-button h-[80px] w-[220px]"
        onClick={handleReturnToHome}
      >
        Return to start
      </button>
    </div>
  );
};

export default NotFound;
