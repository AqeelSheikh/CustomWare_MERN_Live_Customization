import React, { Suspense, useMemo, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Center, OrbitControls } from '@react-three/drei';
import Backdrop from './Backdrop';
import CameraRig from './CameraRig';
import Shirt from './Shirt';

const CanvasModel = () => {
// Define the rotation point coordinates


  const canvasProps = useMemo(
    () => ({
      shadows: true,
      camera: { position: [0, 0, 0], fov: 25 },
      gl: { preserveDrawingBuffer: true },
      className: 'w-full max-w-full h-full transition-all ease-in',
      frameloop: 'demand',
    }),
    []
  );

  const renderLights = useCallback(() => {
    return (
      <>
        <ambientLight intensity={0.5} />
        <spotLight intensity={'0.9'} angle={'0.1'} penumbra={1} position={[10, 15, 10]} />
      </>
    );
  }, []);

  return (
    <Canvas {...canvasProps}>
      <Suspense fallback={null}>
        <Environment preset="city" />
        <OrbitControls enablePan enableZoom enableRotate />
      </Suspense>
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
