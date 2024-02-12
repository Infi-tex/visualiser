import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SelectionMenu from "./components/SelectionMenu";
import StartPage from "./components/StartPage";
import Sampler from "./components/sensors/Sampler";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <div className="bg-background flex h-screen">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate replace to="/start" />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/selection" element={<SelectionMenu />} />
            <Route path="/sensor/sampler" element={<Sampler />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
