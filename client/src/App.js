import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import RoutesPath from "./routes/routes";

function App() {
  return (
    <div className="App">
<Router>
<RoutesPath/>
</Router>
    </div>
  );
}

export default App;
