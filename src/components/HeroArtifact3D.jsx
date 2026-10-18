import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroArtifact3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 95);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const techGroup = new THREE.Group();
    scene.add(techGroup);

    const PALETTE = {
      cyan: 0x38bdf8,
      purple: 0x8b5cf6,
      violet: 0xc084fc,
      coral: 0xff5e62,
      emerald: 0x10b981,
      white: 0xffffff,
      darkCore: 0x07080b
    };

    // Core Group
    const coreGroup = new THREE.Group();
    coreGroup.visible = false;
    techGroup.add(coreGroup);

    // Torus Knot
    const torusKnotGeo = new THREE.TorusKnotGeometry(19, 5.2, 120, 24, 2, 3);
    const torusKnotMat = new THREE.MeshStandardMaterial({
      color: PALETTE.purple,
      emissive: PALETTE.cyan,
      emissiveIntensity: 0.65,
      wireframe: true,
      transparent: true,
      opacity: 0.72,
      roughness: 0.2,
      metalness: 0.85
    });
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    coreGroup.add(torusKnotMesh);

    // Kernel
    const kernelGeo = new THREE.OctahedronGeometry(10, 0);
    const kernelMat = new THREE.MeshPhysicalMaterial({
      color: PALETTE.cyan,
      emissive: PALETTE.purple,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const kernelMesh = new THREE.Mesh(kernelGeo, kernelMat);
    coreGroup.add(kernelMesh);

    // Gyro Rings
    const gyroGroup = new THREE.Group();
    gyroGroup.visible = false;
    techGroup.add(gyroGroup);

    const ringXGeo = new THREE.TorusGeometry(32, 0.38, 16, 90);
    const ringXMat = new THREE.MeshStandardMaterial({
      color: PALETTE.cyan,
      emissive: PALETTE.cyan,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.8
    });
    const ringX = new THREE.Mesh(ringXGeo, ringXMat);
    gyroGroup.add(ringX);

    const ringYGeo = new THREE.TorusGeometry(37, 0.38, 16, 90);
    const ringYMat = new THREE.MeshStandardMaterial({
      color: PALETTE.violet,
      emissive: PALETTE.purple,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0.85
    });
    const ringY = new THREE.Mesh(ringYGeo, ringYMat);
    ringY.rotation.x = Math.PI / 2;
    gyroGroup.add(ringY);

    // Ambient 3D Star Particle Constellation (Always active in background)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    const cCyan = new THREE.Color(PALETTE.cyan);
    const cViolet = new THREE.Color(PALETTE.violet);
    const cCoral = new THREE.Color(PALETTE.coral);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 220;
      posArray[i + 1] = (Math.random() - 0.5) * 160;
      posArray[i + 2] = (Math.random() - 0.5) * 140;

      const r = Math.random();
      const pColor = r < 0.4 ? cCyan : r < 0.75 ? cViolet : cCoral;
      colorArray[i] = pColor.r;
      colorArray[i + 1] = pColor.g;
      colorArray[i + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    techGroup.add(particleField);

    // Expose global controller
    window.toggleHero3DQuantumMode = (show) => {
      coreGroup.visible = show;
      gyroGroup.visible = show;
    };

    // Parallax mouse tilt
    let targetTilt = { x: 0, y: 0 };
    let currentTilt = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      const dx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const dy = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetTilt.x = dy * 0.25;
      targetTilt.y = dx * 0.25;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isRunning = true;
    let clock = new THREE.Clock();
    let rafId = null;

    const animate = () => {
      if (!isRunning) return;
      rafId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Base rotation
      techGroup.rotation.y += 0.005;
      techGroup.rotation.x += 0.002;

      // Particle drift
      particleField.rotation.y -= delta * 0.08;
      particleField.rotation.x += delta * 0.04;

      if (coreGroup.visible) {
        ringX.rotation.x += delta * 0.7;
        ringY.rotation.y += delta * 0.85;
        const pulse = 1 + Math.sin(elapsed * 2.4) * 0.12;
        kernelMesh.scale.set(pulse, pulse, pulse);
        torusKnotMesh.rotation.z = Math.sin(elapsed * 0.4) * 0.2;
      }

      currentTilt.x += (targetTilt.x - currentTilt.x) * 0.05;
      currentTilt.y += (targetTilt.y - currentTilt.y) * 0.05;
      scene.rotation.x = currentTilt.x;
      scene.rotation.y = currentTilt.y;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="heroBgCanvas" style={{ width: '100%', height: '100%', display: 'block' }} />;
}
