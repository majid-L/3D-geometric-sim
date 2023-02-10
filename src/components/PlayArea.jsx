import Cell from "./Cell";
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { v4 as uuidv4 } from 'uuid';
import { GameControlsContext, boardArray } from "../contexts/GameControlsContext";
import PhysicsScene from "./PhysicsScene";
import { useLocation } from "react-router-dom";
import TwoDimensionalBoard from "./TwoDimensionalBoard";

function PlayArea() {
  const { controls, setControls, gameParameters: {isRunning, configuration, wrap, interact, interval, physics, sizeModifier}, setGameParameters } = useContext(GameControlsContext);
 
  const gameRef = useRef(isRunning);
  gameRef.current = isRunning;

  const url = useLocation().pathname;

//   useEffect(() => {
//     if(url[1] === "3") {
//       setBoardConfiguration(configuration.length - 1);
//     };
//   }, [sizeModifier]);

  useEffect(() => {
    const {button} = controls;
    if (button === "start") {
      setGameParameters(prev => ({...prev, isRunning: true}));
      gameRef.current = true;
      runGame();

    } else if (button === "stop") {
      setGameParameters(prev => ({...prev, isRunning: false}));
      gameRef.current = false;

    } else if (button === "faster" && interval > 50) {
      setGameParameters(prev => ({...prev, interval: interval - 50}));

    } else if (button === "slower") {
      setGameParameters(prev => ({...prev, interval: interval + 50}));

    } else if (button === "reset") {
      gameRef.current = false;
      setGameParameters(prev => ({...prev, isRunning: false, configuration: boardArray, sizeModifier: 0}));

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

    } else if (button === 'larger') {
        const newConfig = structuredClone(configuration);
        newConfig.push(Array.from(Array(configuration.length), () => 0));
        setGameParameters(prev => ({...prev, configuration: newConfig.map(m => ([...m, 0])), sizeModifier: prev.sizeModifier + 1}));
       // gameRef.current = true;
    } else if (button === 'smaller') {
      const newConfig = structuredClone(configuration).filter((m, i, arr) => i < arr.length - 1).map(m => m.filter((m, i, arr) => i < arr.length - 1));
      setGameParameters(prev => ({...prev, configuration : newConfig, sizeModifier: prev.sizeModifier - 1}));
  }
  }, [controls]);
  
  const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];
  
  const runGame = () => {
    if (!gameRef.current) return;
    //const newGameGrid = structuredClone(configuration);
    const newGameGrid = configuration.map(m => m.map(m => m));

    for (let i = 0; i < configuration.length; i++) {
      for (let j = 0; j < configuration[i].length ; j++) {
        let liveNeighbours = 0;
        coordOffset.forEach(([x, y]) => {
          if (!wrap) {
             if ( i + x >= 0 
             && i + x < configuration.length 
             && j + y >= 0 
             && j + y < configuration[i].length) {
               liveNeighbours += configuration[i + x][j + y];
             }
          } else if (wrap) {
          const xWrapAroundOffset = (i + x + configuration[i].length) % configuration[i].length;
          const yWrapAroundOffset = (j + y + configuration.length) % configuration.length;
          liveNeighbours += configuration[xWrapAroundOffset][yWrapAroundOffset];
          };
        });
        if (liveNeighbours < 2 || liveNeighbours > 3) {
          newGameGrid[i][j] = 0;
        } else if (configuration[i][j] === 0 && liveNeighbours === 3) {
          newGameGrid[i][j] = 1;
        } else if (configuration[i][j] === 1 && [2, 3].includes(liveNeighbours)) {
          newGameGrid[i][j] = 1;
        }
      }
    };
    setGameParameters(prev => ({...prev, configuration: newGameGrid}));
  };
  
   useEffect(() => {
    setTimeout(runGame, interval);
   }, [configuration]);
  
  const boardConfig = gameGrid => {
    const cellCoords = [];
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: gameGrid[i][j] });
      }
    }
    return cellCoords;
  };

  if (url[1] === '3' && physics) {
    return <PhysicsScene></PhysicsScene>
  } else if (url[1] === '3') {
    return (
      boardConfig(configuration).map(cell => {
        return <Cell key={uuidv4()} position={cell.coords} living={cell.alive} interact={interact} physics={physics} setGameParameters={setGameParameters} isRunning={isRunning}/>
       })
    );
  } else if (url[1] === '2') {
    return <TwoDimensionalBoard/>
  }
}
export default PlayArea;