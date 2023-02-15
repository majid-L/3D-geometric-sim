import { useRef, useContext, useState } from "react";
import { GameControlsContext, boardArray } from "../contexts/GameControlsContext";
import { useControls, button, buttonGroup } from "leva";
import { useCallback } from "react";

function PlayArea() {
  const { gameParameters: {configuration, wrap, interval, physics}, setGameParameters } = useContext(GameControlsContext);

  const [isRunning, setIsRunning] = useState(false);
  const gameRef = useRef(isRunning);
  gameRef.current = isRunning;
  const intervalRef = useRef();
  intervalRef.current = interval;

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
        runGame();
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
  
  /*useEffect(() => {
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

    } else if(button === "randomise") {
      const randomBoard = [];
      for (let i = 0; i < configuration.length; i++) {
        randomBoard.push(Array.from(Array(configuration.length), () => {
          return Math.random() > 0.7 ? 1 : 0;
        }));
      };
      setGameParameters(prev => ({...prev, isRunning: false, configuration: randomBoard}));

    } else if (button === "clear") {
      const emptyBoard = [];
      for (let i = 0; i < configuration.length; i++) {
        emptyBoard.push(Array.from(Array(configuration.length), () => 0));
      };
      setGameParameters(prev => ({...prev, isRunning: false, configuration: emptyBoard}));

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

    } else if (button === "stars" || button === "sky") {
     // setEffect(button);

    } else if (button === "enableBloom") {
     // setBloom(true);

    } else if (button === "disableBloom") {
     // setBloom(false);

    } else if (button === "toggleText") {
      setGameParameters(prev => ({...prev, floating3DText: !prev.floating3DText}));
      
    } else if (['red', 'hotpink', 'blue', 'green', 'orange', 'purple', 'white', 'black'].includes(button)) {
      setGameParameters(prev => ({...prev, emissive: button}));
    }
  }, [controls]);*/
  
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

/*const loop = () => {
    useGameLoop(setGameParameters, wrap, intervalRef)();
    setTimeout(loop, intervalRef.current);
}

useEffect(() => {
  if (gameRef.current) {
    loop();
  };
}, [isRunning]);*/
  //setGameParameters(prev => ({...prev, configuration: newGameGrid}));

  /*const runGame = () => {
    if (!gameRef.current) return;
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
   }, [configuration, isRunning]);*/
  
 /* const boardConfig = gameGrid => {
    const cellCoords = [];
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: gameGrid[i][j] });
      }
    }
    return cellCoords;
  };

  if (url[1] === '3' && physics) {
    return <PhysicsScene/>
  } else if (url[1] === '3') {
    return (
      boardConfig(configuration).map(cell => {
        return <Cell key={uuidv4()} position={cell.coords} living={cell.alive} interact={interact} physics={physics} setGameParameters={setGameParameters} bloom={bloom}/>
       })
    );
  } else if (url[1] === '2') {
    return <TwoDimensionalBoard/>
  }*/
