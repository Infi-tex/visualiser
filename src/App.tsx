import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { SerialDataProvider } from "./SerialDataContext";
import SelectionMenu from "./components/SelectionMenu";
import StartPage from "./components/StartPage";
import SamplerView from "./components/sensors/SamplerView";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <SerialDataProvider>
      <div className="bg-background flex h-screen">
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Navigate replace to="/start" />} />
              <Route path="/start" element={<StartPage />} />
              <Route path="/selection" element={<SelectionMenu />} />
              <Route path="/sensor/sampler" element={<SamplerView />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </div>
    </SerialDataProvider>
  );
};

export default App;
