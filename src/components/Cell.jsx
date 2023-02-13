import { Edges } from "@react-three/drei"
import { useContext, useEffect, useState } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";

const bloomIntensities = [0.7, 1.4, 2.4, 3, 4, 5.5];
const reducedBloomIntensities = [0.4, 0.7, 1, 1.3, 1.6, 2];

function Cell({ position, living, interact, setGameParameters, isRunning, bloom }) {
  const {gameParameters : {emissive, bloomIntensity, edgeColor}} = useContext(GameControlsContext);
  //const {isActive, intensity} = bloom;
    return (
        <mesh onClick={() => {
            if (interact === true) {
              setGameParameters(prev => {
                const newConfig = structuredClone(prev.configuration);
                newConfig[position[0]][position[2]] = living ? 0 : 1;
                return {...prev, configuration: newConfig};
              })
            };
        } } position={position}>
            {living ? <>
            <meshStandardMaterial emissive={emissive} emissiveIntensity={!bloom ? 2 : bloomIntensity} transparent={!bloom} toneMapped={false} opacity={0.9} />
            <Edges color={edgeColor}/>
            <boxGeometry/></> :
            <><mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial color="pink" transparent opacity={0.6}/>
            <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
        </mesh>
    );
}
export default Cell;