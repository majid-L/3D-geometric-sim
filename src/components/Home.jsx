import {CameraControls, PerspectiveCamera} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "./Text";
import { EffectComposer, GodRays, Glitch, Noise, SMAA } from "@react-three/postprocessing";
import { forwardRef, Suspense, useMemo, useRef } from "react";
import { BlendFunction, Resizer, KernelSize, GlitchMode } from "postprocessing";
import * as THREE from "three";
import { useResource } from "react-three-fiber";
import { apply as applySpring, useSpring, a, interpolate } from 'react-spring/three';


const Sun = forwardRef(function Sun(props, forwardRef) {
  useFrame(({ clock }) => {
    forwardRef.current.position.x = Math.sin(clock.getElapsedTime()) * -8;
    forwardRef.current.position.y = Math.cos(clock.getElapsedTime()) * -8;
  });

  return (
    <mesh ref={forwardRef} position={[0, 0, -15]}>
      <sphereGeometry args={[1, 36, 36]} />
      <meshBasicMaterial color={"#C58D47"} />
    </mesh>
  );
});

function Effects() {
  const sunRef = useResource();
  return (
    <>
      <Sun ref={sunRef} />
      {sunRef.current && (
        <EffectComposer multisampling={0}>
          <GodRays
            sun={sunRef.current}
            blendFunction={BlendFunction.Screen}
            samples={30}
            density={0.97}
            decay={0.96}
            weight={0.6}
            exposure={0.4}
            clampMax={1}
            width={Resizer.AUTO_SIZE}
            height={Resizer.AUTO_SIZE}
            kernelSize={KernelSize.SMALL}
            blur={true}
          />
            <Glitch
            delay={[1.5, 7.5]} // min and max glitch delay
            duration={[0.6, 1.0]} // min and max glitch duration
            strength={[0.3, 1.0]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
            />
            <Noise
            premultiply // enables or disables noise premultiplication
            blendFunction={BlendFunction.ADD} // blend mode
            />
        </EffectComposer>
      )}
    </>
  );
};


function Stars({ position }) {
  let group = useRef();
  let theta = 0;
  useFrame(() => {
    const r = 5 * Math.sin(THREE.MathUtils.degToRad((theta += 0.01)));
    const s = Math.cos(THREE.MathUtils.degToRad(theta * 2));
    group.current.rotation.set(r, r, r);
    group.current.scale.set(s, s, s);
  });
  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 10, 10);
    const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('peachpuff'), transparent: true });
    const coords = new Array(1000).fill().map(i => [Math.random() * 800 - 400, Math.random() * 800 - 400, Math.random() * 800 - 400]);
    return [geo, mat, coords];
  }, []);
  
  return (
    <a.group ref={group} position={position}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </a.group>
  )
};

function HomeMesh () {
  const [{ top }] = useSpring(() => ({ top: 0}));
  const mesh = useRef();
  const { viewport } = useThree();
  
  return (<mesh
    ref={mesh}
    scale={viewport.width < 26 ? viewport.width / 25 : 1}>
    <Stars position={top.interpolate(top => [0, -1 + top / 20, 0])} />
    <Text/>
    <Effects />
  </mesh>)

};


const Home = () => {
return (
<section className="anim">
  <Canvas
    camera={{ position: [0, 0, 10] }}
    onCreated={({ gl }) => {
      gl.setClearColor(new THREE.Color("#000000"));
    }}>
    <PerspectiveCamera makeDefault fov={75} position={[0, 0, 15]} />
    <CameraControls />
    <ambientLight intensity={0.8} />
    <pointLight position={[15, 15, 15]} intensity={1} />
    <HomeMesh/>
  </Canvas>
</section>);
};

export default Home;