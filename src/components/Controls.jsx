import { button, useControls } from 'leva'
import { useContext } from "react";
import { GameControlsContext } from "../contexts/GameControlsContext";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'
import { useLocation } from 'react-router-dom';

export function Controls() {
    const {setGameParameters} = useContext(GameControlsContext);
    const threeDBoard = useLocation().pathname[1] === '3';
    const twoDBoard = useLocation().pathname[1] === '2';

    const { zoom } = threeDBoard && useControls({ zoom: { value: 0.8, min: 0, max: 2.5, step: 0.01 } });

    const { "bloom %": bloomIntensity } = threeDBoard && useControls({ "bloom %": { value: 1.5, min: 0, max: 5.5, step: 0.01 } });

    const { interval } = useControls({ interval: { value: 600, min: 0, max: 1500, step: 1 } });
    const { wrap } = useControls({ wrap : true});
    const { "block color": emissive } = threeDBoard && useControls({"block color" : 'hotpink'});
    const {"cell color": cellColor} = twoDBoard && useControls({"cell color": 'rgb(250, 162, 55)'});
    const { "edges": edgeColor } = threeDBoard && useControls({"edges" : 'grey'});

    const {"box shadow": boxShadow} = twoDBoard && useControls({"box shadow": 'rgb(187, 100, 1)'});
    
    const { "3D text" : text} = threeDBoard && useControls({"3D text": true});
    const {interact} = useControls({interact: true});

    const {physics} = threeDBoard && useControls({physics: true});

    const {background} = twoDBoard && useControls({background: 'rgb(22, 19, 15)'});
    
    threeDBoard && useFrame(state => {
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
      setGameParameters(prev => ({...prev, boxShadow }));
    }, [boxShadow]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, interval}));
    }, [interval]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, wrap}));
    }, [wrap]);

    useEffect(() => {
      setGameParameters(prev => ({...prev, emissive}));
    }, [emissive]);

    useEffect(() => {
        setGameParameters(prev => ({...prev, cellColor}));
      }, [cellColor]);
    
    useEffect(() => {
      setGameParameters(prev => ({...prev, interact}));
    }, [interact]);

    useEffect(() => {
        setGameParameters(prev => ({...prev, background}))
    }, [background]);

};