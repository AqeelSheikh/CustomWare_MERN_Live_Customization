import React from 'react';
import { useSnapshot } from 'valtio';
import {Decal, useGLTF, useTexture } from '@react-three/drei';
import state from '../store';
import { useFrame } from '@react-three/fiber';


import { easing } from 'maath';

const Shirt = () => {
  const snap = useSnapshot(state);
  const rotationPoint = { x: 0, y: 0, z: 0 };
  const { nodes, materials } = useGLTF('./shirt_baked.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Set the colorSpace property on the textures
  // logoTexture.encoding = fullTexture.encoding = 'sRGBEncoding';
  useFrame((state,delta)=>easing.dampC(materials.lambert1.color,
  snap.color,.25,delta))//for color smoothness
  const stateString=JSON.stringify(snap);//key prop to store the state chanhe
  
  return (
    <group key={stateString}>
    

      <mesh 
      castShadow
       geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        
        roughness={1}
         dispose={null}>
        {/* <meshStandardMaterial map={logoTexture} roughness={1} /> */}
        {snap.isFullTexture && (
          <Decal
            position={[0,0,0]}
            rotation={[0,0,0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0,0.04,0.15]}
            rotation={[0,0,0]}
            scale={.1}
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
 
    </group>
  );
};

export default Shirt;
