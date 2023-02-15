import { useBox } from "@react-three/cannon";
import { Edges } from "@react-three/drei"
import { useContext, useEffect, useRef } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";

function Cell({ position, living, interact, setGameParameters, bloom }) {
  const {gameParameters : {emissive, bloomIntensity, edgeColor, physics}} = useContext(GameControlsContext);

  const [cellRef, api] = useBox(() => ({ mass: 10, position }));

    return (
        <mesh ref={cellRef} onClick={() => {
         // if (living && physics) {
           api.velocity.set(10, 30, 1);
        //  };
          if (interact === true) {
            setGameParameters(prev => {
              const newConfig = structuredClone(prev.configuration);
              newConfig[position[0]][position[2]] = living ? 0 : 1;
              return {...prev, configuration: newConfig};
            })
          };
        }} position={position}>
            {living ? <>
            <meshStandardMaterial emissive={emissive} emissiveIntensity={!bloom ? 2 : bloomIntensity} transparent={!bloom} toneMapped={false} opacity={0.9} />
            <Edges scale={1.01} color={edgeColor}/>
            <boxGeometry/></> :
            <><mesh position={[0, -0.5, 0]}>
            <meshStandardMaterial color="pink" transparent opacity={0.6}/>
            <boxGeometry args={[1, 0.05, 1]}/></mesh></>}
        </mesh>
    );
}
export default Cell;