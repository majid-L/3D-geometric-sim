import { button, useControls } from 'leva'
import { useContext } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { useLocation } from 'react-router-dom';

export function Controls() {
    const {setGameParameters} = useContext(GameControlsContext);
    const location = useLocation().pathname[1] === '3';

    const { zoom } = location && useControls({ zoom: { value: 0.8, min: 0, max: 2.5, step: 0.01 } });

    const { "bloom %": bloomIntensity } = location && useControls({ "bloom %": { value: 1.5, min: 0, max: 5.5, step: 0.01 } });

    const { interval } = useControls({ interval: { value: 600, min: 0, max: 1500, step: 1 } });
    const { wrap } = useControls({ wrap : true});
    const { color } = useControls({color : 'hotpink'});
    const { "edges": edgeColor } = useControls({"edges" : 'grey'});
    
    const { "3D text" : text} = location && useControls({"3D text": true});
    const {interact} = useControls({interact: true});

    const {physics} = location && useControls({physics: false});

    useControls({ "save pattern" : button(() => {
       
      })});
    
    location && useFrame(state => {
      state.camera.zoom = THREE.MathUtils.lerp(state.camera.zoom, zoom * 5.3, 0.4);
      state.camera.updateProjectionMatrix();
    });
    
    useEffect(() => {
      setGameParameters(prev => ({...prev, bloomIntensity}));
    }, [bloomIntensity]);
     
    useEffect(() => {
      setGameParameters(prev => ({...prev, floating3DText: text}));
    }, [text]);
    
    useEffect(() => {
      setGameParameters(prev => ({...prev, physics}))
    }, [physics]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, edgeColor }));
    }, [edgeColor]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, interval}));
    }, [interval]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, wrap}));
    }, [wrap]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, emissive: color}));
    }, [color]);
    
    useEffect(() => {
      setGameParameters(prev => ({...prev, interact}));
    }, [interact]);

};