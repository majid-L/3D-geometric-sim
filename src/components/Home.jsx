import {
    CameraControls,
    Center,
    Environment,
    Float,
    OrbitControls,
    PerspectiveCamera,
    Text3D,
    useMatcapTexture,
  } from "@react-three/drei";
  import { Canvas, useThree } from "@react-three/fiber";
  import retro from "../assets/retro.json";
  import { CubeTextureLoader } from "three";
  import { Bloom, EffectComposer, GodRays } from "@react-three/postprocessing";
  
  const Home = () => {
    function MatCap({ texture }) {
      const [matcap] = useMatcapTexture(texture, 256);
      return <meshMatcapMaterial matcap={matcap} />;
    };
  
    return (
      <section className="anim">
        <Canvas>
          <EffectComposer>
            <Bloom mipmapBlur luminanceThreshold={1}></Bloom>
            
          </EffectComposer>
          <PerspectiveCamera makeDefault fov={75} position={[10, 10, 10]} />
          <CameraControls />
  
          <ambientLight intensity={0.8} />
          <Float
            speed={2.4}
            rotationIntensity={2.4}
            floatIntensity={2}
            floatingRange={[-2, 2]}
          >
            <Center>
              <Text3D
                font={retro}
                height={0.5}
                letterSpacing={-0.06}
                size={2.8}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.02}
                bevelOffset={0}
                bevelSegments={5}
              >
                {" "}
                AUTOMATRIX
                <MatCap texture={"422509_C89536_824512_0A0604"} />{" "}
              </Text3D>
  
              <mesh position={[2, -4, 0]}>
                <Text3D
                  font={retro}
                  height={0.5}
                  letterSpacing={-0.06}
                  size={2}
                  curveSegments={10}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelOffset={0}
                  bevelSegments={5}
                >
                  {" "}
                  Multiply or die.
                  <MatCap texture={"3B3C3F_DAD9D5_929290_ABACA8"} />{" "}
                </Text3D>
              </mesh>
            </Center>
          </Float>
        </Canvas>
      </section>
    );
  };
  
  export default Home;