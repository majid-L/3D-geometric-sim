import { Canvas, useThree } from "@react-three/fiber";
import { CameraControls, Center, OrbitControls, Sky, Sparkles, Stars } from "@react-three/drei";
// import PlayArea from "./PlayArea";
import Table from "./Table";
import React, { Suspense } from "react";
import { Bloom, EffectComposer, SMAA } from "@react-three/postprocessing";
import { useRef } from "react";
import { Controls } from "./Controls";
import { useControls } from "leva";
import NewPattern from "./NewPattern";
import { v4 as uuidv4 } from 'uuid';
import { useContext } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";
import Cell from "./Cell";
import PhysicsScene from "./PhysicsScene";


function BoardMesh ({bloom}) {
  const {gameParameters : {configuration, interact, physics}, setGameParameters} = useContext(GameControlsContext);

  const mesh = useRef();
  const { viewport } = useThree();

  const boardConfig = gameGrid => {
    const cellCoords = [];
    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        cellCoords.push({ coords: [i, 0, j], alive: gameGrid[i][j] });
      }
    }
    return cellCoords;
  };

  return (<mesh ref={mesh} scale={viewport.width < 97 ? viewport.width / 80 : 1}>
    {/* <PlayArea/> */}
    <Table/>
    {physics ? <PhysicsScene/> : boardConfig(configuration).map(cell => {
        return <Cell key={uuidv4()} position={cell.coords} living={cell.alive} interact={interact} physics={physics} setGameParameters={setGameParameters} bloom={bloom}/>
       })}
    </mesh>)
  };


function ThreeDimensionalGame() {
  const { bloom } = useControls({"bloom" : true});
  const { scene } = useControls({scene : { options: { sky: 'sky', stars: 'stars'}}});

  return (
  <main id="three-d-main">
  <NewPattern/>
  <section className="anim">
  <Canvas
  camera={{ position: [30, 30, 40] }}>
    <Controls/>
    {scene === "stars" && <Stars radius={80} depth={50} count={7000} factor={5} saturation={0} fade speed={1}/>}
    {scene === "sky" && <Sky sunPosition={[0, 1, 3]} exposure={0.01} elevation={0.01} azimuth={90} rayleigh={0}/>}
    {!bloom && <Sparkles {...props}/>}
    <pointLight position={[10, 0, 10]}/>
    {/* <PerspectiveCamera makeDefault fov={75} position={[35, 30, 5]}/> */}
    <CameraControls/>
    <OrbitControls/>
    <Center>
      <Suspense fallback={null}>
      <EffectComposer multisampling={0} enabled={bloom}>
      <SMAA />
      <Bloom luminanceThreshold={0.8} luminanceSmoothing={0.9} height={300} mipmapBlur />
        {/* <Bloom luminanceThreshold={1} mipmapBlur /> */}
      </EffectComposer>
      </Suspense>
      <BoardMesh bloom={bloom}/>
    </Center>
  </Canvas>
  </section>
  </main>)

};

export default ThreeDimensionalGame;

const props = {
    /** Number of particles (default: 100) */ count: 30000,
    /** Speed of particles (default: 1) */
    speed: 2,
    /** Opacity of particles (default: 1) */
    opacity: 1,
    /** Color of particles (default: 100) */
    color: [100, 100, 50],
    /** Size of particles (default: randomized between 0 and 1) */
    size: 30,
    /** The space the particles occupy (default: 1) */
    scale: [250, 250, 250],
    /** Movement factor (default: 1) */
    noise: 1,
  };


/*
{startStop: false, reset: false, faster: false, slower: false, edge: false, wrap: false, enableClick: false, disableClick: false, clear: false}
*/

/*
<PerspectiveCamera makeDefault fov={75} position={[35, 30, 15]}/>
*/

/*

function Zoom() {
    const { zoom } = useControls({ zoom: { value: 0.5, min: 0.05, max: 1.6, step: 0.01 } })
    return useFrame((state) => {
      state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, zoom * 5.3, 0.4)
      state.camera.updateProjectionMatrix()
    })
  };
*/