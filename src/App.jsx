import "./App.css";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes, useLocation } from "react-router-dom";
import Navigation from "./components/Nav";
import Home from "./components/Home";
import Tutorial from "./components/Tutorial";
import Patterns from "./components/Patterns";
import { Users } from "./components/Users";
import { Login } from "./components/Login";
import UserPatterns from "./components/UserPatterns";
import { Profile } from "./components/Profile";
import { Comments } from "./components/Comments";
import { NotFound } from "./components/NotFound";
import TwoDimensionalBoard from "./components/TwoDimensionalBoard";
import PlayArea from "./components/PlayArea";

function App() {
const location = /\d/.test(+useLocation().pathname[1]);

  return (
    <div className="App">
      <Navigation/>
      {location && <PlayArea/>}
      <Routes>
        <Route path="3D-geometric-sim/" element={<Home/>}/>
        <Route path="3D-geometric-sim/3dgame" element={<ThreeDimensionalGame/>}/>
        <Route path="3D-geometric-sim/2dgame" element={<TwoDimensionalBoard/>}/>
        <Route path="3D-geometric-sim/tutorial" element={<Tutorial/>}/>
        <Route path="3D-geometric-sim/patterns" element={<Patterns/>}/>
        <Route path="3D-geometric-sim/users" element={<Users/>}/>
        <Route path="3D-geometric-sim/login" element={<Login/>}/>
        <Route path='3D-geometric-sim/profile' element={<Profile/>}/>
        <Route path="3D-geometric-sim/patterns/:username" element={<UserPatterns />}/>
        <Route path="3D-geometric-sim/comments" element={<Comments/>}/>
        <Route path="3D-geometric-sim/*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App
