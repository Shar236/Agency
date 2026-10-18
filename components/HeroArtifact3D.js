import * as THREE from 'three';

/**
 * Saarthi — High-Tech Interactive 3D Quantum Engine
 * Features:
 * - Concentric Gyroscopic Tech Orbital Rings with satellite data nodes
 * - Central Holographic Quantum Core (Torus Knot / Hyper-Lattice / Neural Sphere)
 * - Luminous 600+ particle constellation with orbital drift
 * - 360° Drag-to-rotate with inertia momentum physics
 * - Real-time cursor tilt parallax across the Hero section
 * - Interactive geometry mode cycling (Cyber Torus, Quantum Matrix, Neural Sphere)
 * - GPU-optimized rendering with IntersectionObserver auto-pause
 */

export function initHeroArtifact3D() {
  const canvas = document.getElementById('heroTechCanvas');
  const container = document.getElementById('heroTechStage');
  if (!canvas || !container) return null;

  const getWidth = () => container.clientWidth || 540;
  const getHeight = () => container.clientHeight || 520;

  let width = getWidth();
  let height = getHeight();

  // 1. Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 95);

  // 2. WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 3. Root Interactive 3D Group
  const techGroup = new THREE.Group();
  scene.add(techGroup);

  // Color Palette
  const PALETTE = {
    cyan: 0x38bdf8,
    purple: 0x8b5cf6,
    violet: 0xc084fc,
    coral: 0xff5e62,
    emerald: 0x10b981,
    white: 0xffffff,
    darkCore: 0x07080b
  };

  // -------------------------------------------------------------------------
  // GEOMETRY LAYER 1: Central Quantum Core (3 Modes)
  // -------------------------------------------------------------------------
  const coreGroup = new THREE.Group();
  techGroup.add(coreGroup);

  // Mode 0: Cyber Torus Knot
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

  // Mode 1: Quantum Matrix (Icosahedron & Dodecahedron Lattice)
  const matrixOuterGeo = new THREE.IcosahedronGeometry(22, 1);
  const matrixOuterMat = new THREE.MeshStandardMaterial({
    color: PALETTE.cyan,
    emissive: PALETTE.purple,
    emissiveIntensity: 0.75,
    wireframe: true,
    transparent: true,
    opacity: 0.75
  });
  const matrixOuterMesh = new THREE.Mesh(matrixOuterGeo, matrixOuterMat);
  matrixOuterMesh.visible = false;
  coreGroup.add(matrixOuterMesh);

  // Mode 2: Neural Geodesic Sphere
  const sphereGeo = new THREE.SphereGeometry(21, 24, 24);
  const sphereMat = new THREE.MeshStandardMaterial({
    color: PALETTE.coral,
    emissive: PALETTE.violet,
    emissiveIntensity: 0.65,
    wireframe: true,
    transparent: true,
    opacity: 0.68
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.visible = false;
  coreGroup.add(sphereMesh);

  // Crystalline Inner Kernel (Shared across modes)
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

  // -------------------------------------------------------------------------
  // GEOMETRY LAYER 2: Concentric Gyroscopic Tech Orbital Rings
  // -------------------------------------------------------------------------
  const gyroGroup = new THREE.Group();
  techGroup.add(gyroGroup);

  // Ring X (Pitch)
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

  // Ring Y (Yaw)
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

  // Ring Z (Roll)
  const ringZGeo = new THREE.TorusGeometry(42, 0.38, 16, 90);
  const ringZMat = new THREE.MeshStandardMaterial({
    color: PALETTE.coral,
    emissive: PALETTE.coral,
    emissiveIntensity: 0.7,
    transparent: true,
    opacity: 0.75
  });
  const ringZ = new THREE.Mesh(ringZGeo, ringZMat);
  ringZ.rotation.y = Math.PI / 3;
  gyroGroup.add(ringZ);

  // Satellite Data Beacons on Rings
  const nodeGeo = new THREE.OctahedronGeometry(1.4, 0);
  const nodeMat = new THREE.MeshBasicMaterial({ color: PALETTE.white });

  const node1 = new THREE.Mesh(nodeGeo, nodeMat);
  node1.position.set(32, 0, 0);
  ringX.add(node1);

  const node2 = new THREE.Mesh(nodeGeo, nodeMat);
  node2.position.set(0, 37, 0);
  ringY.add(node2);

  const node3 = new THREE.Mesh(nodeGeo, nodeMat);
  node3.position.set(-42, 0, 0);
  ringZ.add(node3);

  // -------------------------------------------------------------------------
  // GEOMETRY LAYER 3: Volumetric Quantum Particle Constellation
  // -------------------------------------------------------------------------
  const particleCount = 650;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const c1 = new THREE.Color(PALETTE.cyan);
  const c2 = new THREE.Color(PALETTE.violet);
  const c3 = new THREE.Color(PALETTE.coral);

  for (let i = 0; i < particleCount; i++) {
    const radius = 12 + Math.random() * 46;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const randVal = Math.random();
    const chosenColor = randVal < 0.45 ? c1 : randVal < 0.8 ? c2 : c3;
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 1.8,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const particleField = new THREE.Points(particleGeo, particleMat);
  techGroup.add(particleField);

  // -------------------------------------------------------------------------
  // LIGHTING SETUP
  // -------------------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const lightCyan = new THREE.PointLight(PALETTE.cyan, 3.5, 180);
  lightCyan.position.set(50, 40, 50);
  scene.add(lightCyan);

  const lightPurple = new THREE.PointLight(PALETTE.purple, 3, 180);
  lightPurple.position.set(-50, -40, -40);
  scene.add(lightPurple);

  const lightCoral = new THREE.PointLight(PALETTE.coral, 2.5, 140);
  lightCoral.position.set(0, 50, -40);
  scene.add(lightCoral);

  // -------------------------------------------------------------------------
  // INTERACTION: 3D Drag Rotation with Momentum
  // -------------------------------------------------------------------------
  let isDragging = false;
  let prevPointer = { x: 0, y: 0 };
  let velocity = { x: 0.007, y: 0.004 };
  let targetTilt = { x: 0, y: 0 };
  let currentTilt = { x: 0, y: 0 };

  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    prevPointer = { x: clientX, y: clientY };
  };

  const onPointerMove = (clientX, clientY) => {
    if (!isDragging) return;
    const deltaX = clientX - prevPointer.x;
    const deltaY = clientY - prevPointer.y;

    velocity.x = deltaX * 0.008;
    velocity.y = deltaY * 0.008;

    techGroup.rotation.y += velocity.x;
    techGroup.rotation.x += velocity.y;

    prevPointer = { x: clientX, y: clientY };
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  // Canvas Mouse Listeners
  canvas.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onPointerUp);

  // Touch Listeners
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', onPointerUp);

  // Hero Section Mouse Parallax Tilt
  const heroSection = document.getElementById('hero') || container;
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      targetTilt.x = dy * 0.35;
      targetTilt.y = dx * 0.35;
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetTilt.x = 0;
      targetTilt.y = 0;
    }, { passive: true });
  }

  // -------------------------------------------------------------------------
  // GEOMETRY MODE CYCLING (Cyber Torus -> Quantum Matrix -> Neural Sphere)
  // -------------------------------------------------------------------------
  let activeModeIndex = 0;
  const MODES = [
    { name: 'MODE: CYBER TORUS', mesh: torusKnotMesh },
    { name: 'MODE: QUANTUM MATRIX', mesh: matrixOuterMesh },
    { name: 'MODE: NEURAL SPHERE', mesh: sphereMesh }
  ];

  const modeBtn = document.getElementById('heroTechModeBtn');
  const modeLabel = document.getElementById('heroTechModeLabel');

  function setMode(index) {
    activeModeIndex = index % MODES.length;
    MODES.forEach((m, idx) => {
      m.mesh.visible = (idx === activeModeIndex);
    });
    if (modeLabel) {
      modeLabel.textContent = MODES[activeModeIndex].name;
    }
  }

  if (modeBtn) {
    modeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      setMode(activeModeIndex + 1);
    });
  }

  // -------------------------------------------------------------------------
  // RESPONSIVE RESIZE LISTENER
  // -------------------------------------------------------------------------
  const onResize = () => {
    width = getWidth();
    height = getHeight();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener('resize', onResize, { passive: true });
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
  }

  // -------------------------------------------------------------------------
  // ANIMATION LOOP & LIFECYCLE MANAGEMENT
  // -------------------------------------------------------------------------
  let isRunning = true;
  let rafId = null;
  let clock = new THREE.Clock();

  function animate() {
    if (!isRunning) return;
    rafId = requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsed = clock.getElapsedTime();

    // 1. Damped Drag Inertia
    if (!isDragging) {
      velocity.x *= 0.94;
      velocity.y *= 0.94;

      // Base autonomous celestial rotation
      techGroup.rotation.y += 0.007 + velocity.x;
      techGroup.rotation.x += 0.003 + velocity.y;
    }

    // 2. Gyroscopic Orbital Ring Multi-Axis Rotations
    ringX.rotation.x += delta * 0.7;
    ringX.rotation.y += delta * 0.4;

    ringY.rotation.y += delta * 0.85;
    ringY.rotation.z += delta * 0.5;

    ringZ.rotation.z += delta * 0.6;
    ringZ.rotation.x -= delta * 0.35;

    // 3. Central Kernel Breathing & Pulsation
    const pulse = 1 + Math.sin(elapsed * 2.4) * 0.12;
    kernelMesh.scale.set(pulse, pulse, pulse);
    kernelMesh.rotation.y += delta * 1.2;
    kernelMesh.rotation.z -= delta * 0.8;

    // 4. Active Outer Mesh Oscillation
    if (torusKnotMesh.visible) {
      torusKnotMesh.rotation.z = Math.sin(elapsed * 0.4) * 0.2;
    } else if (matrixOuterMesh.visible) {
      matrixOuterMesh.rotation.y += delta * 0.5;
    } else if (sphereMesh.visible) {
      sphereMesh.rotation.x += delta * 0.4;
    }

    // 5. Particle Drift Halo
    particleField.rotation.y -= delta * 0.15;
    particleField.rotation.x += delta * 0.08;

    // 6. Smooth Mouse Tilt Parallax Interpolation (LERP)
    currentTilt.x += (targetTilt.x - currentTilt.x) * 0.06;
    currentTilt.y += (targetTilt.y - currentTilt.y) * 0.06;
    scene.rotation.x = currentTilt.x;
    scene.rotation.y = currentTilt.y;

    renderer.render(scene, camera);
  }

  // Auto-pause when scrolled off-screen to preserve GPU/CPU cycles
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!isRunning) {
            isRunning = true;
            clock.start();
            animate();
          }
        } else {
          isRunning = false;
          if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        }
      });
    }, { threshold: 0.1 });
    observer.observe(container);
  }

  animate();

  return {
    destroy: () => {
      isRunning = false;
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
    }
  };
}
