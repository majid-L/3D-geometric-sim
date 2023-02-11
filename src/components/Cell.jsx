import { Edges } from "@react-three/drei"
import { useContext, useEffect, useState } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";

function Cell({ position, living, interact, setGameParameters, isRunning, bloom }) {
  const {gameParameters : {emissive}} = useContext(GameControlsContext);
  
    return (
        <mesh onClick={() => {
            if (interact === true && !isRunning) {
              setGameParameters(prev => {
                const newConfig = structuredClone(prev.configuration);
                newConfig[position[0]][position[2]] = living ? 0 : 1;
                return {...prev, configuration: newConfig};
              })
            };
        } } position={position}>
            {living ? <>
            <meshStandardMaterial emissive={emissive} emissiveIntensity={!bloom ? 2 : 2.6} transparent={!bloom} toneMapped={false} opacity={0.9} />
            <Edges color="rgb(200, 60, 200)"/>
            <boxGeometry/></> :
            <><mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial color="pink" transparent opacity={0.6}/>
            <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
        </mesh>
    );
}
export default Cell;