import { useEffect, useRef } from 'react';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { Center, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from "three";

function PhysicsScene () {

    const positions = [
        [0, 2, 3],
        [-1, 5, 16],
        [-2, 5, -10],
        [0, 12, 3],
        [-10, 5, 16],
        [8, 5, -10]
      ];

    function Plane() {
    const [ref, api] = usePlane(() => ({ mass: 1, position: [0, -5, 0], type: "Static", rotation : [-Math.PI / 2, 0, 0] }));

    useFrame(({ mouse }) => {
        api.rotation.set(-Math.PI / 2 - mouse.y * 0.2, 0 + mouse.x * 0.2, 0);
      });

    return (
      <mesh ref={ref} scale={20} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry attach="geometry" args={[10, 10]}/>
        <meshLambertMaterial side={THREE.DoubleSide} emissive="yellow" emissiveIntensity={5} attach="material" color="rgb(90, 100, 200)"/>
      </mesh>
     )
  }

  function Box(position) {
    const [ref, api] = useBox(() => ({ mass: 1, position : [0, 1, 0] }));
   // useFrame(({ clock }) => api.position.set(Math.sin(clock.getElapsedTime()) * 5, 3, 0));
    const direction = Math.random().toString()[2];
   return (
    <mesh 
      onClick={() => {
      api.velocity.set(direction, direction, direction);
      }} 
      ref={ref} 
      position={position}>
      <boxGeometry attach="geometry" args={[5, 5, 5]}/>
      <meshLambertMaterial attach="material" color="rgb(250,50,50)" />
    </mesh>
   )
  }

return (<>
 <PerspectiveCamera makeDefault fov={85} position={[25, 55, 15]}/>
 <Stars/>
<Physics>
<Center>
  <Plane/>
  {positions.map((position, i) => (
          <Box position={position} key={i} />
        ))}
</Center>
</Physics>
</>)

};

export default PhysicsScene;
