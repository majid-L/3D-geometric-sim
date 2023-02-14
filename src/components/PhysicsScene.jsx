import { useEffect, useRef } from 'react';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Center, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from "three";
import { useContext } from 'react';
import { GameControlsContext } from '../contexts/GameControlsContext';

function PhysicsScene ({bloom}) {

  const {gameParameters : {emissive, bloomIntensity, edgeColor}} = useContext(GameControlsContext);

    const positions = [
        [0, 2, 3],
        [-1, 5, 16],
        [-2, 5, -10],
        [0, 12, 3],
        [-10, 5, 16],
        [8, 5, -10]
      ];

    function Plane() {
    const [ref, api] = usePlane(() => ({ mass: 1, position: [0, 0, 0], type: "Static", rotation : [-Math.PI / 2, 0, 0] }));

    return (
      <mesh ref={ref} position={[100, 100, 100]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[30, 30]}/>
        <meshLambertMaterial side={THREE.DoubleSide} transparent={!bloom} toneMapped={false} opacity={0.9} emissive={edgeColor} emissiveIntensity={!bloom ? 2 : bloomIntensity} attach="material" color={emissive}/>
      </mesh>
     )
  }

  function Box() {
    const [ref, api] = useBox(() => ({ mass: 1, position : [0, 2, 0] }));
    return (
      <mesh 
      onClick={() => {
      api.velocity.set(
        +String(Math.random())[2]/2,
        +String(Math.random())[2]/2,
        +String(Math.random())[2]/2
      );
      }} 
      ref={ref} 
      position={[0, 2, 0]}>
      <boxGeometry attach="geometry"/>
      <meshLambertMaterial attach="material" color={emissive} />
    </mesh>
   )
  }

return (<>
 <PerspectiveCamera makedefault fov={85} position={[7, -4, 0]}>
 <Stars/>
<Physics>
  <Box/>
  <Plane/>
</Physics>
</PerspectiveCamera>
</>)

};

export default PhysicsScene;
