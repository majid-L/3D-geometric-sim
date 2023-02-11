import { GameControlsContext } from "../contexts/GameControlsContext";
import GameControls from "./GameControls";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";

const TwoDimensionalBoard = () => {
const { gameParameters: {isRunning, configuration, interact}, setGameParameters } = useContext(GameControlsContext);

const gridcolumns = "1fr ".repeat(configuration.length);

return (<>
<h1 style={{marginTop: '70px'}} className="tutorial_h1">Game Of Life in 2D</h1>
    <div className="cellboard" style={{ gridTemplateColumns: gridcolumns }}>
      {configuration.map((row, i) => {
        return row.map((cell, k) => {
          return <div key={uuidv4()} className={configuration[i][k] === 1 ? "cellgridliving" : "cellgriddead"} onClick={() => {
            if (interact === true && !isRunning) {
              setGameParameters(prev => {
                const newConfig = structuredClone(configuration);
                newConfig[i][k] = configuration[i][k] ? 0 : 1;
                return {...prev, configuration: newConfig};
              })
            };
        } }/>
        });
      })}
    </div>
    <GameControls />
</>);
};

export default TwoDimensionalBoard;