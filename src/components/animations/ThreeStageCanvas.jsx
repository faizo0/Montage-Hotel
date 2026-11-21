import React, { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { cn } from '@/utils/cn';

/**
 * Detect software WebGL (SwiftShader/llvmpipe) to cap pixel ratio safely.
 */
function detectSoftwareWebGL() {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = String(
      gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER) || ''
    );
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererStr);
  } catch {
    return true;
  }
}

function ArchitecturalMonolith() {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.14;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.35, 0]}>
      {/* Primary Architectural Limestone Plinth */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.7, 1.5]} />
        <meshStandardMaterial color="#E9DDE0" roughness={0.62} metalness={0.05} />
      </mesh>
      {/* Secondary Royal Burgundy Glass Pavilion */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[1.05, 0.5, 1.05]} />
        <meshStandardMaterial color="#702D43" roughness={0.28} metalness={0.35} />
      </mesh>
      {/* Champagne Gold Accent Crown */}
      <mesh position={[0, 1.32, 0]} castShadow>
        <cylinderGeometry args={[0.36, 0.42, 0.24, 32]} />
        <meshStandardMaterial color="#C6A46A" roughness={0.38} metalness={0.45} />
      </mesh>
    </group>
  );
}

function StudioEnvironmentRig() {
  const envConfigured = useRef(false);

  return (
    <group
      ref={(node) => {
        if (!node || envConfigured.current) return;
        envConfigured.current = true;
      }}
    >
      <hemisphereLight args={['#F8F3EA', '#E9DDE0', 0.9]} />
      <directionalLight position={[4, 6, 4]} intensity={1.35} color="#FFFBF4" />
      <directionalLight position={[-4, 3, -3]} intensity={0.45} color="#E9DDE0" />
    </group>
  );
}

/**
 * Reusable React Three Fiber Architectural Stage Foundation.
 */
export function ThreeStageCanvas({ className = '', children }) {
  const isSoftwareGl = useMemo(() => detectSoftwareWebGL(), []);

  return (
    <div
      className={cn(
        'relative h-full w-full overflow-hidden rounded-[12px] border border-[#E3D5CE] bg-[#F8F3EA]',
        className
      )}
    >
      <Canvas
        dpr={isSoftwareGl ? 1 : [1, 2]}
        camera={{ position: [3.2, 2.2, 3.6], fov: 40 }}
        gl={{
          antialias: !isSoftwareGl,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        onCreated={({ gl, scene }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
          const pmrem = new THREE.PMREMGenerator(gl);
          const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
          scene.environment = envTex;
          pmrem.dispose();
        }}
      >
        <color attach="background" args={['#F8F3EA']} />
        <fog attach="fog" args={['#F8F3EA', 6, 14]} />
        <StudioEnvironmentRig />
        {children || <ArchitecturalMonolith />}
      </Canvas>
    </div>
  );
}

export default ThreeStageCanvas;
