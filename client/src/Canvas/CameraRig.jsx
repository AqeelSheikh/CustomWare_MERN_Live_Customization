// import React, { useRef } from 'react'


import React, { useRef } from 'react';
import { easing } from 'maath';
import { useSnapshot } from "valtio";
import { useFrame } from '@react-three/fiber';
import  state  from "../store";
  
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap=useSnapshot(state);
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    const targetPosition = [-0.4, 0.2];

    if (isBreakpoint) {
      targetPosition[2] = snap.intro ? 2 : 2.2;
    } else if (isMobile) {
      targetPosition[2] = snap.intro ? 2.5 : 2;
    } else {
      targetPosition[2] = snap.intro ? 2 : 2;
    }

    // Smoothly move the camera position
    easing.damp3(state.camera.position, targetPosition, 0.7, delta);

    // Calculate the rotation increment based on the desired speed
    const rotationSpeed = 0.5; // Adjust this value to control the rotation speed
    const rotationIncrement = (Math.PI / 180) * rotationSpeed * delta;

    // Update the rotation of the model
    group.current.rotation.y += rotationIncrement;

    // Wrap the rotation within 360 degrees
    if (group.current.rotation.y > Math.PI * 2) {
      group.current.rotation.y -= Math.PI * 2;
    }

    // Smoothly rotate the model
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.1,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
