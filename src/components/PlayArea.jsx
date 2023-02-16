import { useRef, useContext, useState, useEffect } from "react";
import { GameControlsContext, boardArray } from "../contexts/GameControlsContext";
import { useControls, button, buttonGroup } from "leva";
import { useCallback } from "react";

function PlayArea() {

  const { gameParameters: {configuration, wrap, interval}, setGameParameters } = useContext(GameControlsContext);

  const [isRunning, setIsRunning] = useState(false);
  
  const gameRef = useRef(isRunning);
  gameRef.current = isRunning;
  const intervalRef = useRef();
  intervalRef.current = interval;

  useEffect(() => {
    return () => {
      setIsRunning(false);
      gameRef.current = false;
    };
  }, []);

  useControls({" ": buttonGroup({
    "start": () => {
      if (!gameRef.current) {
        setIsRunning(true);
        gameRef.current = true;
        runGame();
      }
      },
      "stop": () => {
        setIsRunning(false);
        gameRef.current = false;
      }
    })
  });

  useControls({ reset : button(() => {
    setIsRunning(false);
    gameRef.current = false;
    setGameParameters(prev => ({...prev, configuration: boardArray, sizeModifier: 0}));
  })});

  useControls({ randomise : button(() => {
    setGameParameters(prev => {
      const randomBoard = [];
      for (let i = 0; i < prev.configuration.length; i++) {
        randomBoard.push(Array.from(Array(prev.configuration.length), () => {
          return Math.random() > 0.7 ? 1 : 0;
        }));
      };
      return {...prev, configuration: randomBoard};
    });
    setIsRunning(false);
    gameRef.current = false;
  })});

  useControls({ clear : button(() => {
    const emptyBoard = [];
    for (let i = 0; i < configuration.length; i++) {
      emptyBoard.push(Array.from(Array(configuration.length), () => 0));
    };
    setGameParameters(prev => ({...prev, isRunning: false, configuration: emptyBoard}));
  })});

  useControls({"board size": buttonGroup({
    "inc": () => {
      setGameParameters(prev => {
        const copy = [...prev.configuration].map(m => m);
        const expanded = copy.map(arr => [0, ...arr, 0]);
        expanded.push(Array.from(Array(prev.configuration.length + 2), () => 0))
        expanded.unshift(Array.from(Array(prev.configuration.length + 2), () => 0));
        return {...prev, configuration: expanded};
      })
    },
    "dec": () => {
      setGameParameters(prev => {
        const copy = [...prev.configuration].map(m => m);
        const shrunkenArray = copy.filter((row, i, arr) => i > 0 && i < arr.length - 1).map(row => row.filter((row, i, arr) => i > 0 && i < arr.length - 1));
        return {...prev, configuration: shrunkenArray};
      });
    }
  })});
  
const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];

  const runGame = useCallback(() => {
    if (!gameRef.current) {
      return;
    };
    
    setGameParameters(prev => {
      const {configuration} = prev;
      intervalRef.current = prev.interval;
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
    return {...prev, configuration: newGameGrid};
  });

  setTimeout(runGame, intervalRef.current);
}, [gameRef.current]);
}
export default PlayArea;