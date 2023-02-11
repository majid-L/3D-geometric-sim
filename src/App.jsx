import "./App.css";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Nav";
import Home from "./components/Home";
import PlayArea from "./components/PlayArea";
import Tutorial from "./components/Tutorial";
import Patterns from "./components/Patterns";
import { Users } from "./components/Users";
import { Login } from "./components/Login";

function App() {
  return (
    <div className="App">
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/3dgame" element={<ThreeDimensionalGame/>}/>
        <Route path="/2dgame" element={<PlayArea/>}/>
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/patterns" element={<Patterns />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default App
