import { GameControlsContext } from "../contexts/GameControlsContext";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { Controls } from "./Controls";
import NewPattern from "./NewPattern";

const TwoDimensionalBoard = () => {
const { gameParameters: {configuration, interact, cellColor, boxShadow, background}, setGameParameters } = useContext(GameControlsContext);

const gridcolumns = "1fr ".repeat(configuration.length);

return (<>
<h1 style={{marginTop: '70px'}} className="tutorial_h1">Game Of Life in 2D</h1>
    <div className="cellboard" style={{ gridTemplateColumns: gridcolumns, backgroundColor: background }}>
      {configuration.map((row, i) => {
        return row.map((cell, k) => {
          return <div key={uuidv4()} 
          style={configuration[i][k] ? {backgroundColor: cellColor, boxShadow: `0 0 6px 6px inset ${boxShadow}`} : {}}
          className={configuration[i][k] === 1 ? "cellgridliving" : "cellgriddead"} onClick={() => {
            if (interact === true) {
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
    <NewPattern />
    <Controls/>
</>);
};

export default TwoDimensionalBoard;