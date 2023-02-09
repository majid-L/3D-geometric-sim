import { GameControlsContext, boardArray } from "./contexts/GameControlsContext";
import { useEffect, useContext } from "react";
import { runGame } from "./runGame";

export const useGameConditions = (currentRef, runGame) => {

const { controls, gameParameters: {configuration, wrap, interval}, setGameParameters } = useContext(GameControlsContext);
const {button} = controls;

    if (button === "start") {
      setGameParameters(prev => ({...prev, isRunning: true}));
      currentRef = true;
      runGame(currentRef, configuration, wrap, setGameParameters)();
    } else if (button === "stop") {
      currentRef = false;
      setGameParameters(prev => ({...prev, isRunning: false}));
    } else if (button === "faster" && interval > 120) {
      setGameParameters(prev => ({...prev, interval: interval - 100}));
    } else if (button === "slower") {
      setGameParameters(prev => ({...prev, interval: interval + 100}));
    } else if (button === "reset") {
      setGameParameters(prev => ({...prev, isRunning: false, configuration: boardArray}));
      currentRef = false;
    } else if (button === "edge") {
      setGameParameters(prev => ({...prev, wrap: false}));
    } else if (button === "wrap") {
      setGameParameters(prev => ({...prev, wrap: true}));
    } else if (button === "enableClick") {
      setGameParameters(prev => ({...prev, interact: true}));
    } else if (button === "disableClick") {
      setGameParameters(prev => ({...prev, interact: false}));
    } else if (button === "enablePhysics") {
      setGameParameters(prev => ({...prev, interact: false, physics: true}));
    } else if (button === "disablePhysics") {
      setGameParameters(prev => ({...prev, interact: true, physics: false}));
    };
};