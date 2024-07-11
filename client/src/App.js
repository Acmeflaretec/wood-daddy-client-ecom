import { HashRouter } from "react-router-dom";
import "./App.css";
import RoutesPath from "./routes/routes";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <RoutesPath />
      </HashRouter>
    </div>
  );
}

export default App;
