import React, { useLayoutEffect, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Use useLayoutEffect in browser, useEffect during SSR
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Texture Cache for Particle Glow
let cachedPointTexture = null;
function getPointTexture() {
  if (cachedPointTexture) return cachedPointTexture;
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
  grad.addColorStop(0.3, 'rgba(124, 58, 237, 0.9)');
  grad.addColorStop(0.7, 'rgba(6, 182, 212, 0.45)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);

  cachedPointTexture = new THREE.CanvasTexture(canvas);
  return cachedPointTexture;
}

// Generate Tech + Management Telemetry Badge Sprite Texture (Theme Adaptive)
function createBadgeTexture(tag, status, colorHex, isLight) {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 240;
  canvas.height = 56;
  const ctx = canvas.getContext('2d');

  if (isLight) {
    // Pure White Frosted Glass Pill for Light Mode
    ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
    ctx.beginPath();
    ctx.roundRect(3, 3, 234, 50, 12);
    ctx.fill();

    // Delicate Refined Border
    ctx.strokeStyle = 'rgba(15, 23, 42, 0.14)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Live Status Dot
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.arc(22, 28, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Tag Title (Deep Slate for maximum readability)
    ctx.font = '700 13px "SF Mono", "Fira Code", monospace, sans-serif';
    ctx.fillStyle = '#0F172A';
    ctx.fillText(tag, 36, 33);

    // Status text (Color)
    ctx.font = '700 12px "SF Mono", monospace, sans-serif';
    ctx.fillStyle = colorHex;
    ctx.fillText(status, 155, 33);
  } else {
    // Luxury Obsidian Glass Pill for Dark Mode
    ctx.fillStyle = 'rgba(7, 10, 18, 0.9)';
    ctx.beginPath();
    ctx.roundRect(3, 3, 234, 50, 12);
    ctx.fill();

    // Glowing Border
    ctx.strokeStyle = colorHex;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Live Status Dot
    ctx.fillStyle = colorHex;
    ctx.beginPath();
    ctx.arc(22, 28, 4.5, 0, Math.PI * 2);
    ctx.fill();

    // Tag Title (White)
    ctx.font = '700 13px "SF Mono", "Fira Code", monospace, sans-serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(tag, 36, 33);

    // Status text (Color)
    ctx.font = '700 12px "SF Mono", monospace, sans-serif';
    ctx.fillStyle = colorHex;
    ctx.fillText(status, 155, 33);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export default function Hero3DBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const isMobile = window.innerWidth < 768;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Perspective Camera (optimized FOV for mobile vertical screens)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 62 : 50, width / height, 0.1, 1000);
    camera.position.set(0, isMobile ? 18 : 14, isMobile ? 122 : 94);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: isMobile ? 'default' : 'high-performance'
    });
    renderer.setSize(width, height);
    // Render at crisp Retina resolution (capped at 1.8 to ensure high performance)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));

    // 2. TECH + MANAGEMENT ARCHITECTURE NODES DEFINITION
    // Strategically positioned in Left Wing (Tech Cluster) and Right Wing (Management Cluster)
    // leaving the central hero headline area completely uncluttered with bridging conduits in depth
    const masterNodes = [
      // Left Wing: Tech Architecture Cluster
      { name: 'SYS.CORE', status: 'ACTIVE', color: isLight ? '#0284c7' : '#06b6d4', colorNum: isLight ? 0x0284c7 : 0x06b6d4, pos: new THREE.Vector3(-62, 14, -18), radius: 5.2, geo: 'octa' },
      { name: 'AI.NEURAL', status: 'READY', color: isLight ? '#9333ea' : '#c084fc', colorNum: isLight ? 0x9333ea : 0xc084fc, pos: new THREE.Vector3(-52, -10, -6), radius: 4.8, geo: 'dodeca' },
      { name: 'DATA.STREAM', status: 'LIVE', color: isLight ? '#0369a1' : '#38bdf8', colorNum: isLight ? 0x0369a1 : 0x38bdf8, pos: new THREE.Vector3(-76, 0, -26), radius: 4.0, geo: 'box' },
      { name: 'DEV.STACK', status: 'PASS', color: isLight ? '#4f46e5' : '#818cf8', colorNum: isLight ? 0x4f46e5 : 0x818cf8, pos: new THREE.Vector3(-38, 28, -24), radius: 4.2, geo: 'ico' },

      // Right Wing: Management & Growth Cluster
      { name: 'SPRINT.AGILE', status: '94%', color: isLight ? '#7c3aed' : '#a855f7', colorNum: isLight ? 0x7c3aed : 0xa855f7, pos: new THREE.Vector3(60, 16, -18), radius: 5.2, geo: 'box' },
      { name: 'GROWTH.KPI', status: '4.8X ROAS', color: isLight ? '#059669' : '#10b981', colorNum: isLight ? 0x059669 : 0x10b981, pos: new THREE.Vector3(50, -12, -6), radius: 4.8, geo: 'octa' },
      { name: 'ROADMAP.V2', status: 'ON TRACK', color: isLight ? '#d97706' : '#f59e0b', colorNum: isLight ? 0xd97706 : 0xf59e0b, pos: new THREE.Vector3(40, 28, -24), radius: 4.2, geo: 'ico' },
      { name: 'SLA.GATEWAY', status: '24H PASS', color: isLight ? '#4338ca' : '#6366f1', colorNum: isLight ? 0x4338ca : 0x6366f1, pos: new THREE.Vector3(74, 0, -26), radius: 4.0, geo: 'octa' },

      // Deep Background Infrastructure Nodes (placed back at z = -55 to -65 so they don't block text)
      { name: 'CLOUD.EDGE', status: '12ms', color: isLight ? '#0284c7' : '#06b6d4', colorNum: isLight ? 0x0284c7 : 0x06b6d4, pos: new THREE.Vector3(0, 36, -55), radius: 4.0, geo: 'ico' },
      { name: 'METRIC.GRID', status: '+145%', color: isLight ? '#059669' : '#10b981', colorNum: isLight ? 0x059669 : 0x10b981, pos: new THREE.Vector3(0, -32, -50), radius: 4.2, geo: 'dodeca' }
    ];

    const nodeMeshes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const blendingMode = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;

    // Build 3D Geometric Nodes for each Hub
    masterNodes.forEach((node) => {
      let geo;
      if (node.geo === 'box') {
        geo = new THREE.BoxGeometry(node.radius * 1.4, node.radius * 1.4, node.radius * 1.4);
      } else if (node.geo === 'octa') {
        geo = new THREE.OctahedronGeometry(node.radius, 0);
      } else if (node.geo === 'dodeca') {
        geo = new THREE.DodecahedronGeometry(node.radius, 0);
      } else {
        geo = new THREE.IcosahedronGeometry(node.radius, 0);
      }

      // Wireframe Outer Cage
      const wireMat = new THREE.MeshBasicMaterial({
        color: node.colorNum,
        wireframe: true,
        transparent: true,
        opacity: isLight ? 0.32 : 0.65,
        blending: blendingMode
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.position.copy(node.pos);

      // Inner Core Sphere
      const coreGeo = new THREE.SphereGeometry(node.radius * 0.42, 16, 16);
      const coreMat = new THREE.MeshBasicMaterial({
        color: node.colorNum,
        transparent: true,
        opacity: isLight ? 0.25 : 0.85,
        blending: blendingMode
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      wireMesh.add(coreMesh);

      // Gimbal Ring for Core Hubs
      if (node.name === 'SYS.CORE' || node.name === 'SPRINT.AGILE') {
        const ringGeo = new THREE.TorusGeometry(node.radius * 1.7, 0.12, 8, 36);
        const ringMat = new THREE.MeshBasicMaterial({
          color: node.colorNum,
          transparent: true,
          opacity: isLight ? 0.35 : 0.7,
          blending: blendingMode
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        wireMesh.add(ringMesh);
      }

      nodeGroup.add(wireMesh);
      nodeMeshes.push({
        mesh: wireMesh,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.008,
          y: (Math.random() - 0.5) * 0.012
        },
        baseY: node.pos.y,
        floatFreq: 0.8 + Math.random() * 0.5,
        floatPhase: Math.random() * Math.PI * 2
      });

      // 3D Telemetry Badge Floating above the Node (Adaptive Light/Dark Theme)
      const badgeTex = createBadgeTexture(node.name, node.status, node.color, isLight);
      if (badgeTex) {
        const spriteMat = new THREE.SpriteMaterial({
          map: badgeTex,
          transparent: true,
          opacity: isLight ? 0.95 : 0.9,
          blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
          depthTest: false
        });
        const sprite = new THREE.Sprite(spriteMat);
        sprite.position.set(node.pos.x, node.pos.y + node.radius + 3.2, node.pos.z);
        sprite.scale.set(11, 2.7, 1);
        nodeGroup.add(sprite);
      }
    });

    // 3. SECONDARY SATELLITE NETWORK NODES (Cluster Expansion)
    const satelliteCount = 38;
    const satellitePositions = [];
    const satGeo = new THREE.BufferGeometry();
    const satPositionsArray = new Float32Array(satelliteCount * 3);
    const satColorsArray = new Float32Array(satelliteCount * 3);

    for (let s = 0; s < satelliteCount; s++) {
      const parent = masterNodes[s % masterNodes.length];
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 18
      );
      const satPos = parent.pos.clone().add(offset);
      satellitePositions.push(satPos);

      satPositionsArray[s * 3] = satPos.x;
      satPositionsArray[s * 3 + 1] = satPos.y;
      satPositionsArray[s * 3 + 2] = satPos.z;

      const pColor = new THREE.Color(parent.color);
      satColorsArray[s * 3] = pColor.r;
      satColorsArray[s * 3 + 1] = pColor.g;
      satColorsArray[s * 3 + 2] = pColor.b;
    }

    satGeo.setAttribute('position', new THREE.BufferAttribute(satPositionsArray, 3));
    satGeo.setAttribute('color', new THREE.BufferAttribute(satColorsArray, 3));

    const satMat = new THREE.PointsMaterial({
      size: 4.2,
      vertexColors: true,
      map: getPointTexture(),
      transparent: true,
      opacity: isLight ? 0.45 : 0.85,
      blending: blendingMode,
      depthWrite: false
    });
    const satellitePoints = new THREE.Points(satGeo, satMat);
    scene.add(satellitePoints);

    // 4. DATA PIPELINE CONDUITS (Connection Lines)
    const connections = [];
    const linePositions = [];
    const lineColors = [];

    // Left Tech Cluster Interconnects
    const leftClusterLinks = [
      [0, 1], [0, 2], [0, 3], [1, 2], [2, 3], [1, 3]
    ];
    // Right Management Cluster Interconnects
    const rightClusterLinks = [
      [4, 5], [4, 6], [4, 7], [5, 6], [6, 7], [5, 7]
    ];
    // Deep Bridging Conduits across the background plane
    const bridgeLinks = [
      [3, 8], [6, 8], [1, 9], [5, 9], [0, 8], [4, 8], [2, 9], [7, 9]
    ];

    const allHubLinks = [...leftClusterLinks, ...rightClusterLinks, ...bridgeLinks];

    allHubLinks.forEach(([fromIdx, toIdx]) => {
      const pA = masterNodes[fromIdx].pos;
      const pB = masterNodes[toIdx].pos;
      connections.push({ from: pA, to: pB });

      linePositions.push(pA.x, pA.y, pA.z, pB.x, pB.y, pB.z);
      const cA = new THREE.Color(masterNodes[fromIdx].color);
      const cB = new THREE.Color(masterNodes[toIdx].color);
      lineColors.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
    });

    // Connect satellites to nearest hubs
    satellitePositions.forEach((satPos, idx) => {
      const parent = masterNodes[idx % masterNodes.length];
      connections.push({ from: parent.pos, to: satPos });

      linePositions.push(parent.pos.x, parent.pos.y, parent.pos.z, satPos.x, satPos.y, satPos.z);
      const cA = new THREE.Color(parent.color);
      lineColors.push(cA.r, cA.g, cA.b, cA.r * 0.7, cA.g * 0.7, cA.b * 0.7);
    });

    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    linesGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

    const linesMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.2 : 0.45,
      blending: blendingMode
    });
    const lineMesh = new THREE.LineSegments(linesGeo, linesMat);
    scene.add(lineMesh);

    // 5. DATA SIGNAL PACKETS (Photon Pulses moving through conduits)
    const packetCount = 28;
    const packetData = [];
    const packetPositions = new Float32Array(packetCount * 3);
    const packetColors = new Float32Array(packetCount * 3);

    for (let p = 0; p < packetCount; p++) {
      const conn = connections[Math.floor(Math.random() * connections.length)];
      const progress = Math.random();
      const speed = 0.006 + Math.random() * 0.01;
      const col = new THREE.Color(isLight ? (Math.random() > 0.5 ? 0x0284c7 : 0x7c3aed) : (Math.random() > 0.5 ? 0x06b6d4 : 0xa855f7));

      packetData.push({ conn, progress, speed, col });

      const currentPos = new THREE.Vector3().lerpVectors(conn.from, conn.to, progress);
      packetPositions[p * 3] = currentPos.x;
      packetPositions[p * 3 + 1] = currentPos.y;
      packetPositions[p * 3 + 2] = currentPos.z;

      packetColors[p * 3] = col.r;
      packetColors[p * 3 + 1] = col.g;
      packetColors[p * 3 + 2] = col.b;
    }

    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute('position', new THREE.BufferAttribute(packetPositions, 3));
    packetGeo.setAttribute('color', new THREE.BufferAttribute(packetColors, 3));

    const packetMat = new THREE.PointsMaterial({
      size: isLight ? 4.8 : 5.5,
      vertexColors: true,
      map: getPointTexture(),
      transparent: true,
      opacity: isLight ? 0.75 : 0.95,
      blending: blendingMode,
      depthWrite: false
    });
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    scene.add(packetPoints);

    // 6. ISOMETRIC ARCHITECTURAL FLOOR MATRIX
    // Completely hidden in light mode to keep white theme pristine & elegant (no messy CAD net)
    const gridHelper = new THREE.GridHelper(220, 44, 0x7c3aed, 0x1e293b);
    gridHelper.position.y = -36;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.22;
    gridHelper.visible = !isLight;
    scene.add(gridHelper);

    // Immediate first frame render
    renderer.render(scene, camera);

    // Mouse Interaction Parallax
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      const mobileNow = newW < 768;
      camera.fov = mobileNow ? 62 : 50;
      camera.position.set(0, mobileNow ? 18 : 14, mobileNow ? 122 : 94);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.render(scene, camera);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // 7. ANIMATION LOOP WITH ZERO-LAG INTERSECTION OBSERVER
    let animId = null;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible) {
        animId = null;
        return;
      }
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing for 3D Camera Parallax
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * (isMobile ? 6 : 14);
      camera.position.y = (isMobile ? 18 : 14) + mouse.y * -8;
      camera.lookAt(0, 0, 0);

      // Rotate and float Tech + Management Nodes
      for (let i = 0; i < nodeMeshes.length; i++) {
        const item = nodeMeshes[i];
        item.mesh.rotation.x += item.rotSpeed.x;
        item.mesh.rotation.y += item.rotSpeed.y;
        item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.floatFreq + item.floatPhase) * 1.4;
      }

      // Update Data Signal Packets traveling along conduits
      const pAttr = packetGeo.attributes.position;
      const pArr = pAttr.array;

      for (let p = 0; p < packetCount; p++) {
        const data = packetData[p];
        data.progress += data.speed;

        if (data.progress >= 1.0) {
          data.progress = 0;
          data.conn = connections[Math.floor(Math.random() * connections.length)];
        }

        const curr = new THREE.Vector3().lerpVectors(data.conn.from, data.conn.to, data.progress);
        pArr[p * 3] = curr.x;
        pArr[p * 3 + 1] = curr.y;
        pArr[p * 3 + 2] = curr.z;
      }
      pAttr.needsUpdate = true;

      // Slow orbital drift of secondary constellation
      satellitePoints.rotation.y = elapsedTime * 0.012;
      lineMesh.rotation.y = elapsedTime * 0.004;

      renderer.render(scene, camera);
    };

    // Pause rendering loop completely when Hero is scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        clock.start();
        animId = requestAnimationFrame(animate);
      } else if (!isVisible && animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    }, { threshold: 0.05 });
    observer.observe(container);

    // Pause when browser tab is inactive
    const handleVisibility = () => {
      if (document.hidden) {
        if (animId) {
          cancelAnimationFrame(animId);
          animId = null;
        }
      } else if (isVisible && !animId) {
        clock.start();
        animId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    animate();

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      satGeo.dispose();
      linesGeo.dispose();
      packetGeo.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="hero-3d-pure-background tech-management-network"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 1
        }}
      />
    </div>
  );
}
