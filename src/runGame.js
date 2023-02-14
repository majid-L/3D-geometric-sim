import { useCallback } from "react";

const coordOffset = [[0, 1], [0, -1], [1, -1], [-1, 1], [1, 1], [-1, -1], [1, 0], [-1, 0]];
  
export const useGameLoop = (setGameParameters, wrap, intervalRef) => {
  return () => {
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
}
};