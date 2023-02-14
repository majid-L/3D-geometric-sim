import "./App.css";
import ThreeDimensionalGame from "./components/ThreeDimensionalGame";
import { Route, Routes } from "react-router-dom";
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

  return (
    <div className="App">
      <Navigation/>
      <PlayArea/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/3dgame" element={<ThreeDimensionalGame/>}/>
        <Route path="/2dgame" element={<TwoDimensionalBoard/>}/>
        <Route path="/tutorial" element={<Tutorial/>}/>
        <Route path="/patterns" element={<Patterns/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/patterns/:username" element={<UserPatterns />}/>
        <Route path="/comments" element={<Comments/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </div>
  );
};

export default App
