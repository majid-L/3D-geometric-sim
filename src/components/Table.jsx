import img from "../assets/green.png";
import * as THREE from "three";
import { Float, Text3D, useMatcapTexture } from "@react-three/drei";
import retro from '../assets/retro.json';
import { useContext, useEffect, useState } from "react";
import { GameControlsContext, boardArray } from "../contexts/GameControlsContext";

function Table() {
  //const texture = new THREE.TextureLoader().load(img);
 //const [boxLength, setBoxLength] = useState('');
  
  const {controls, texture, gameParameters: {configuration, floating3DText}} = useContext(GameControlsContext);
  //const boxLength = configuration.length - 1;

  //useEffect(() => {
  //  setBoxLength(configuration.length - 1)
  //}, [sizeModifier]);
  const boxLength = configuration.length - 1;
  function MatCap({texture}) {
    const [matcap] = useMatcapTexture(texture, 256);

    return <meshMatcapMaterial matcap={matcap} />
  };

  if (controls.button !== "enablePhysics") {
  return (
    <><mesh position={[boxLength / 2, -1, boxLength / 2]}>
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
}
export default Table;