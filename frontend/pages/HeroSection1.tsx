import React, { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations, Html } from "@react-three/drei";
import styles from "../styles/HeroSection1.module.css";
import { useRouter } from "next/router";

interface EarthModelProps {
  [key: string]: any;
}

function EarthModel(props: EarthModelProps) {
  const group = useRef<THREE.Group>(null!);
  const { scene, animations } = useGLTF("/earth.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions, animations]);

  useFrame((_, delta) => {
    mixer?.update(delta);
  });

  return <primitive ref={group} object={scene} scale={2.3} {...props} />;
}

export default function HeroSection1() {
  const router = useRouter();

  return (
    <section className={styles.hero}>
      <div className={styles.heroContentWith3d}>
        <div className={styles.content}>
          <h1 className={styles.title}>Travel. Snap. We Post.</h1>
          <p className={styles.tagline}>
            Instantly broadcast your travel moments to friends and followers. 
            Capture breathtaking views, share spontaneous adventures, and bring your journey to life in real time.
          </p>
          <button className={styles.ctaButton} onClick={() => router.push("/login")}>
            Start Now
          </button>
        </div>
        <div className={styles.modelContainer}>
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ambientLight intensity={2.5} />
            <directionalLight position={[0, 11, 5]} intensity={0.6} />
            <Suspense fallback={<Html><span>Loading...</span></Html>}>
              <EarthModel />
            </Suspense>
            <OrbitControls enablePan={false} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
