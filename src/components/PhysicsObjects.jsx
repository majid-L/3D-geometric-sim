import { useBox } from "@react-three/cannon";
import React, { useEffect, useState } from "react";

const Projectile = (props) => {
    const [boxRef] = useBox(() => ({ mass: 6, args: 0.1, ...props}));

    return <mesh ref={boxRef} castshadow>
        <boxGeometry args={[0.1, 32, 32]} />
        <meshLambertMaterial color="rgba(100, 45, 60, 0.5)" />
    </mesh>
};

const Target = (props) => {
    const [color, setColor] = useState("white");
    const [cubeRef] = useBox(() => ({
      mass: 1,
      args: [0.5, 0.5, 0.5],
      material: {
        friction: 1,
        restitution: 0
      },
      ...props
    }));

   const randomColors = ["red", "blue", "pink", "green", "orange", "white"];
  
    useEffect(() => {
        setColor(randomColors[Math.floor(Math.random() * randomColors.length)])
    }, []);
  
    return (
      <mesh ref={cubeRef} castShadow layers={props.layers}>
        <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
        <meshLambertMaterial color={color} />
      </mesh>
    );
  };

export const PhysicsObjects = () => {

};