import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';
import { MINERALS } from '../data/minerals';

export { MINERALS };

// ─── Ambient particles ─────────────────────────────────────────────────────────
function Particles({ accentColor }) {
  const count = 90;
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.025;
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.012;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color={accentColor}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Single mineral mesh ───────────────────────────────────────────────────────
function MineralMesh({ mineral }) {
  const floatRef = useRef();

  // Continuous float + slow rotation — separated from GSAP's Y transition on outer group
  useFrame((state) => {
    if (!floatRef.current) return;
    const t = state.clock.elapsedTime;
    floatRef.current.position.y = Math.sin(t * 0.85) * 0.15;
    floatRef.current.rotation.y += 0.0045;
    floatRef.current.rotation.x = Math.sin(t * 0.4) * 0.06;
    floatRef.current.rotation.z = Math.cos(t * 0.3) * 0.03;
  });

  return (
    <group ref={floatRef} scale={mineral.scale || [1, 1, 1]}>
      <mesh castShadow receiveShadow>
        {mineral.geometry === 'octahedron'   && <octahedronGeometry   args={mineral.args} />}
        {mineral.geometry === 'icosahedron'  && <icosahedronGeometry  args={mineral.args} />}
        {mineral.geometry === 'cylinder'     && <cylinderGeometry     args={mineral.args} />}
        {mineral.geometry === 'dodecahedron' && <dodecahedronGeometry args={mineral.args} />}

        {mineral.isMetallic ? (
          <meshPhysicalMaterial
            color={mineral.color}
            metalness={mineral.metalness ?? 1}
            roughness={mineral.roughness ?? 0.08}
            envMapIntensity={3}
          />
        ) : (
          <MeshTransmissionMaterial
            color={mineral.color}
            transmission={mineral.transmission}
            thickness={mineral.thickness}
            roughness={mineral.roughness}
            ior={mineral.ior}
            chromaticAberration={mineral.chromaticAberration}
            samples={10}
            resolution={512}
            envMapIntensity={2.2}
            backside
            backsideThickness={0.3}
          />
        )}
      </mesh>

      {/* Internal glow for crystals — creates a coloured halo */}
      {!mineral.isMetallic && (
        <pointLight
          position={[0, 0, 0]}
          intensity={0.7}
          color={mineral.accentColor}
          distance={2.8}
          decay={2}
        />
      )}
    </group>
  );
}

// ─── R3F Scene ─────────────────────────────────────────────────────────────────
function MineralScene({ currentIndex, transitionGroupRef }) {
  const mineral = MINERALS[currentIndex];

  return (
    <>
      <color attach="background" args={['#060d18']} />

      {/* Transition group — GSAP animates position.y here */}
      <group ref={transitionGroupRef}>
        {/* key forces unmount/remount when mineral changes, resetting rotation */}
        <MineralMesh key={mineral.id} mineral={mineral} />
      </group>

      <Particles accentColor={mineral.accentColor} />

      {/* ── Lighting ── */}
      <ambientLight intensity={0.35} color="#c8e8ff" />

      {/* Key light — warm, from above-right */}
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
      />

      {/* Rim light — cyan, from left */}
      <pointLight position={[-5, 2, -2]} intensity={2} color="#00AEEF" distance={12} decay={2} />

      {/* Fill light — warm gold, from below-right */}
      <pointLight position={[3, -4, 2]} intensity={1.2} color="#F5C200" distance={10} decay={2} />

      {/* Back light — deep blue */}
      <pointLight position={[0, 0, -4]} intensity={0.8} color="#0033AA" distance={8} decay={2} />

      {/* Top spotlight */}
      <spotLight
        position={[0, 8, 1]}
        intensity={4}
        angle={0.28}
        penumbra={0.9}
        color="#ffffff"
        castShadow
      />

      {/* HDR environment — studio gives clean, controllable reflections */}
      <Environment preset="studio" />

      {/* Soft ground shadow */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.4}
        scale={7}
        blur={3}
        far={4}
        color="#000a1a"
      />
    </>
  );
}

// ─── Main export ───────────────────────────────────────────────────────────────
export default function MineralCarousel() {
  const transitionGroupRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [labelVisible, setLabelVisible] = useState(true);
  const isTransitioning = useRef(false);

  const advance = useCallback(() => {
    if (isTransitioning.current || !transitionGroupRef.current) return;
    isTransitioning.current = true;
    setLabelVisible(false);

    // Phase 1 — exit upward
    gsap.to(transitionGroupRef.current.position, {
      y: 7,
      duration: 0.72,
      ease: 'power2.in',
      onComplete: () => {
        if (!transitionGroupRef.current) return;

        // Snap below viewport
        transitionGroupRef.current.position.y = -7;

        // Update mineral (React re-renders MineralMesh with new mineral at y=-7)
        setCurrentIndex((prev) => (prev + 1) % MINERALS.length);

        // One rAF to let React commit the new mineral before entering
        requestAnimationFrame(() => {
          if (!transitionGroupRef.current) return;

          // Phase 2 — enter from below
          gsap.to(transitionGroupRef.current.position, {
            y: 0,
            duration: 0.88,
            ease: 'power3.out',
            onComplete: () => {
              isTransitioning.current = false;
              setLabelVisible(true);
            },
          });
        });
      },
    });
  }, []);

  // Auto-advance every 4.5 s
  useEffect(() => {
    const timer = setInterval(advance, 4500);
    return () => clearInterval(timer);
  }, [advance]);

  const mineral = MINERALS[currentIndex];

  return (
    <div className="relative w-full h-full">
      {/* ── R3F Canvas ── */}
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          alpha: false,
        }}
        dpr={[1, 1.5]}
        shadows
        style={{ width: '100%', height: '100%' }}
      >
        <MineralScene
          currentIndex={currentIndex}
          transitionGroupRef={transitionGroupRef}
        />
      </Canvas>

      {/* ── Mineral label overlay ── */}
      <div
        className="absolute bottom-14 left-0 right-0 flex flex-col items-center gap-1.5 pointer-events-none select-none"
        style={{
          opacity: labelVisible ? 1 : 0,
          transform: labelVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.45s ease, transform 0.45s ease',
        }}
      >
        {/* Accent line — changes colour per mineral */}
        <div
          className="w-8 h-[2px] mb-1 transition-colors duration-700"
          style={{ backgroundColor: mineral.accentColor }}
        />
        <p className="font-heading font-bold text-white leading-tight" style={{ fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
          {mineral.label}
        </p>
        <p className="font-mono text-white/35 uppercase tracking-widest3" style={{ fontSize: '10px' }}>
          {mineral.origin}
        </p>
      </div>

      {/* ── Progress dots ── */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center items-center gap-2 pointer-events-none">
        {MINERALS.map((m, i) => (
          <div
            key={m.id}
            className="rounded-full transition-all duration-500"
            style={{
              width:  i === currentIndex ? '22px' : '5px',
              height: '3px',
              backgroundColor: i === currentIndex
                ? mineral.accentColor
                : 'rgba(255,255,255,0.18)',
              borderRadius: '2px',
            }}
          />
        ))}
      </div>

      {/* ── Edge vignette — blends canvas into page ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, #060d18 100%)',
        }}
      />
    </div>
  );
}
