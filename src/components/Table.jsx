import { Float, Text3D, useMatcapTexture } from "@react-three/drei";
import retro from '../assets/retro.json';
import { useContext } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { usePlane } from "@react-three/cannon";
import * as THREE from "three";

/*function Plane({boxLength}) {
  const [ref, api] = usePlane(() => ({ mass: 1, position: [boxLength / 2, -0.52, boxLength/2], type: "Static", rotation : [-Math.PI / 2, 0, 0] }));

  return (
    <mesh ref={ref} position={[100, 100, 100]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[boxLength + 3, boxLength + 3]}/>
      <meshLambertMaterial side={THREE.DoubleSide} color="rgb(0, 0, 0)" transparent={true} toneMapped={false} opacity={0} attach="material"/>
    </mesh>
   )
}*/


function Table() {
 const {texture, gameParameters: {configuration, floating3DText}} = useContext(GameControlsContext);
 
  const boxLength = configuration.length - 1;
  function MatCap({texture}) {
    const [matcap] = useMatcapTexture(texture, 256);

    return <meshMatcapMaterial matcap={matcap} />
  };
  
  return (
    <>
    {/* {false && <Plane boxLength={boxLength}></Plane>} */}
    <mesh position={[boxLength / 2, -1, boxLength / 2]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}/>
        <boxGeometry args={[boxLength + 3, 1, boxLength + 3]}/>
      </mesh>
      <mesh position={[boxLength / 2, -0.2, -1]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}/>
        <boxGeometry args={[boxLength + 1, 0.6, 1]}/>
      </mesh>
     <mesh position={[boxLength / 2, -0.2, boxLength + 1]}>
        <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}/>
        <boxGeometry args={[boxLength + 1, 0.6, 1]}/>
      </mesh>

      <mesh position={[boxLength + 1, -0.2, boxLength/2]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}/>
        <boxGeometry args={[1, 0.6, boxLength + 3
        ]}/>
      </mesh>

      <mesh position={[-1, -0.2, boxLength / 2]}>
      <meshMatcapMaterial
          opacity={1}
          depthTest={true}
          depthWrite={true}
          alphaTest={0}
          color={"white"}
          matcap={texture}/>
        <boxGeometry args={[1, 0.6, boxLength + 3]}/>
      </mesh>

      {floating3DText && <mesh position = {[2, 5, -5]}>
      <Float speed={2.4} rotationIntensity={2} floatIntensity={2} floatingRange={[0, 1]}>
      <Text3D 
      font={retro}
      height={0.5}
      letterSpacing={-0.06}
      size={2.8}
      curveSegments={10}
      bevelEnabled
      bevelThickness={0.02}
      bevelOffset={0}
      bevelSegments={5}>AUTOMATRIX<MatCap texture={'422509_C89536_824512_0A0604'}/></Text3D>
      </Float></mesh>}
    </>
  );
}
export default Table;