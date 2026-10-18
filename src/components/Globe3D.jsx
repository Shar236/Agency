import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';

export const GLOBAL_HUBS = [
  {
    id: 'us',
    name: 'New York / US East',
    country: 'United States',
    flag: '🇺🇸',
    lat: 40.7128,
    lon: -74.0060,
    tag: 'Fintech & B2B SaaS',
    accent: '#38BDF8',
    clientProject: 'Apex Capital & FinFlow Platform',
    scope: 'Bespoke Next.js Platform + Google Ads Pipeline',
    impact: '+$4.2M Pipeline · 0.38s FCP Edge CDN',
    stack: ['Next.js 14', 'Tailwind', 'Google PMax', 'Stripe'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'us-west',
    name: 'San Francisco / Bay Area',
    country: 'United States',
    flag: '🇺🇸',
    lat: 37.7749,
    lon: -122.4194,
    tag: 'AI & Cloud Infrastructure',
    accent: '#818CF8',
    clientProject: 'CognitiveScale AI Platform',
    scope: 'Enterprise SaaS Web App + AI WhatsApp Bot',
    impact: '99.99% Uptime · 2-Min Lead SLA',
    stack: ['MERN Stack', 'OpenAI APIs', 'Redis', 'AWS'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'uk',
    name: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    lat: 51.5074,
    lon: -0.1278,
    tag: 'Headless Luxury E-Commerce',
    accent: '#F472B6',
    clientProject: 'Monolith Luxury Atelier',
    scope: 'Headless Shopify Plus + International SEO',
    impact: '+58% Mobile Checkout · #1 UK Rank',
    stack: ['Shopify Plus', 'Sanity CMS', 'Next.js', 'Meta CAPI'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'uae',
    name: 'Dubai / Downtown',
    country: 'UAE / Dubai',
    flag: '🇦🇪',
    lat: 25.2048,
    lon: 55.2708,
    tag: 'Prime Real Estate & Ads',
    accent: '#FBBF24',
    clientProject: 'Elysian Prime Developments',
    scope: 'Interactive 3D WebGL Showcase + Meta Ads Engine',
    impact: '4.8× ROAS · 14,000+ Inquiries',
    stack: ['Three.js WebGL', 'Meta CAPI', 'Node.js', 'CRM Sync'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'sg',
    name: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    lat: 1.3521,
    lon: 103.8198,
    tag: 'Cross-Border Commerce',
    accent: '#34D399',
    clientProject: 'Zenith Logistics & Supply Network',
    scope: 'Multi-Currency Web App & Technical SEO',
    impact: '3.8× Organic Traffic Growth in 90 Days',
    stack: ['React', 'Algolia Search', 'Stripe Global', 'Node.js'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'de',
    name: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    lat: 52.5200,
    lon: 13.4050,
    tag: 'CleanTech Data Platform',
    accent: '#60A5FA',
    clientProject: 'Verdant Carbon Analytics Dashboard',
    scope: 'Real-time Emissions Intelligence Web App',
    impact: '100/100 Google Lighthouse · Zero Bloat',
    stack: ['React', 'D3.js Charts', 'Express API', 'MongoDB'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'au',
    name: 'Sydney / Melbourne',
    country: 'Australia',
    flag: '🇦🇺',
    lat: -33.8688,
    lon: 151.2093,
    tag: 'D2C Consumer & Paid Growth',
    accent: '#A78BFA',
    clientProject: 'Kinship Wellness DTC',
    scope: 'Omnichannel Meta & Google Performance Max',
    impact: '-41% Blended CAC · +135% MoM Scale',
    stack: ['Meta Ads', 'PMax', 'Klaviyo', 'Shopify Plus'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'ca',
    name: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    lat: 43.6532,
    lon: -79.3832,
    tag: 'B2B Enterprise SaaS',
    accent: '#F87171',
    clientProject: 'FieldWorks Operational Suite',
    scope: 'Full-Stack React Portal & Automated Workflows',
    impact: '65% Reduction in Task Turnaround Time',
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'Live in Production',
    link: '/work'
  },
  {
    id: 'in',
    name: 'Delhi NCR (HQ Studio)',
    country: 'India',
    flag: '🇮🇳',
    lat: 28.6139,
    lon: 77.2090,
    tag: 'Central Engineering Labs HQ',
    accent: '#FB923C',
    clientProject: 'Saarthi Design & Engineering Labs',
    scope: 'Core 3D WebGL, Full-Stack MERN & AI Engineering',
    impact: '100% In-House Senior Architects · Zero Middlemen',
    stack: ['Senior Tech Leads', 'WebGL Craftsmen', 'Growth Strategists'],
    status: 'Global HQ & Delivery Core',
    link: '/contact'
  }
];

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function isLandmass(lat, lon) {
  if (lat >= 12 && lat <= 72 && lon >= -168 && lon <= -52) {
    if (lat < 28 && lon < -106) return false;
    return true;
  }
  if (lat >= -56 && lat < 13 && lon >= -82 && lon <= -34) {
    if (lat < -20 && lon > -44) return false;
    return true;
  }
  if (lat >= 35 && lat <= 72 && lon >= -12 && lon <= 45) return true;
  if (lat >= -36 && lat <= 37 && lon >= -18 && lon <= 52) return true;
  if (lat >= 10 && lat <= 40 && lon >= 34 && lon <= 92) return true;
  if (lat >= 5 && lat <= 75 && lon >= 92 && lon <= 150) return true;
  if (lat >= -10 && lat <= 22 && lon >= 95 && lon <= 142) return true;
  if (lat >= -45 && lat <= -10 && lon >= 112 && lon <= 180) return true;
  return false;
}

export default function Globe3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeHub, setActiveHub] = useState(GLOBAL_HUBS[0]);
  const [autoRotate, setAutoRotate] = useState(true);
  const targetRotationRef = useRef(null);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const focusHub = (hub) => {
    setActiveHub(hub);
    const targetY = -((hub.lon + 90) * (Math.PI / 180));
    const targetX = (hub.lat * (Math.PI / 180)) * 0.45;
    targetRotationRef.current = { x: targetX, y: targetY };
    setAutoRotate(false);
  };

  const handleReset = () => {
    targetRotationRef.current = { x: 0.25, y: -1.2 };
    setAutoRotate(true);
    setActiveHub(GLOBAL_HUBS[0]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let cleanupFn = null;
    let isInitialized = false;

    const initGlobe = () => {
      const scene = new THREE.Scene();
      const width = container.clientWidth || 800;
      const height = container.clientHeight || 520;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeGroup = new THREE.Group();
    globeGroup.rotation.y = -1.2;
    globeGroup.rotation.x = 0.25;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 104;

    // 1. Continental particle lattice
    const particleCount = 5200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLandPrimary = new THREE.Color('#C084FC');
    const colorLandSecondary = new THREE.Color('#38BDF8');
    const colorLandAccent = new THREE.Color('#FB923C');
    const colorOcean = new THREE.Color('#1E293B');

    const phiStep = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiStep * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const lat = 90 - Math.acos(y) * (180 / Math.PI);
      let lon = (Math.atan2(z, -x) * (180 / Math.PI)) - 180;
      if (lon < -180) lon += 360;

      const isLand = isLandmass(lat, lon);
      const r = GLOBE_RADIUS * (isLand ? 1.008 : 0.992);
      positions[i * 3] = x * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = z * r;

      if (isLand) {
        const pick = (i % 4 === 0) ? colorLandAccent : ((i % 2 === 0) ? colorLandSecondary : colorLandPrimary);
        colors[i * 3] = pick.r * 1.25;
        colors[i * 3 + 1] = pick.g * 1.25;
        colors[i * 3 + 2] = pick.b * 1.25;
      } else {
        colors[i * 3] = colorOcean.r * 0.35;
        colors[i * 3 + 1] = colorOcean.g * 0.35;
        colors[i * 3 + 2] = colorOcean.b * 0.45;
      }
    }

    const spriteCanvas = document.createElement('canvas');
    spriteCanvas.width = 32;
    spriteCanvas.height = 32;
    const sCtx = spriteCanvas.getContext('2d');
    const grad = sCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.45, 'rgba(255,255,255,0.85)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(spriteCanvas);

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 2.6,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSphere = new THREE.Points(particlesGeo, particlesMat);
    globeGroup.add(particleSphere);

    // 2. Inner sphere
    const innerSphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 40, 40);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0x080b14,
      transparent: true,
      opacity: 0.94
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    globeGroup.add(innerSphere);

    // Lat/Lon Rings
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.16
    });
    for (let latDeg of [-60, -30, 0, 30, 60]) {
      const latRad = (latDeg * Math.PI) / 180;
      const ringRadius = GLOBE_RADIUS * Math.cos(latRad);
      const ringY = GLOBE_RADIUS * Math.sin(latRad);
      const ringGeo = new THREE.BufferGeometry();
      const ringPts = [];
      for (let j = 0; j <= 64; j++) {
        const a = (j / 64) * Math.PI * 2;
        ringPts.push(new THREE.Vector3(Math.cos(a) * ringRadius, ringY, Math.sin(a) * ringRadius));
      }
      ringGeo.setFromPoints(ringPts);
      globeGroup.add(new THREE.Line(ringGeo, wireMat));
    }

    // 3. Halo
    const haloGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.09, 36, 36);
    const haloMat = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        color: { value: new THREE.Color('#818CF8') }
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 color;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.6);
          gl_FragColor = vec4(color, intensity * 0.65);
        }
      `
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // 4. Hub meshes
    const hubMeshes = [];
    const hubGroup = new THREE.Group();
    globeGroup.add(hubGroup);

    GLOBAL_HUBS.forEach((hub) => {
      const hubPos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS + 0.8);

      const dotGeo = new THREE.SphereGeometry(1.8, 16, 16);
      const dotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.accent),
        transparent: true,
        opacity: 0.98
      });
      const dotMesh = new THREE.Mesh(dotGeo, dotMat);
      dotMesh.position.copy(hubPos);

      const ringGeo = new THREE.RingGeometry(2.2, 3.0, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(hub.accent),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(hubPos);
      ringMesh.lookAt(new THREE.Vector3(0, 0, 0));

      hubGroup.add(dotMesh);
      hubGroup.add(ringMesh);

      hubMeshes.push({
        hub,
        dotMesh,
        ringMesh,
        scalePhase: Math.random() * Math.PI * 2
      });
    });

    // 5. Arcs
    const arcPairs = [
      ['in', 'uae'],
      ['uae', 'uk'],
      ['uk', 'us'],
      ['us', 'us-west'],
      ['in', 'sg'],
      ['sg', 'au'],
      ['uk', 'de'],
      ['us', 'ca']
    ];

    const arcPhotonMeshes = [];
    const arcsGroup = new THREE.Group();
    globeGroup.add(arcsGroup);

    arcPairs.forEach(([fromId, toId]) => {
      const fromHub = GLOBAL_HUBS.find(h => h.id === fromId);
      const toHub = GLOBAL_HUBS.find(h => h.id === toId);
      if (!fromHub || !toHub) return;

      const start = latLonToVector3(fromHub.lat, fromHub.lon, GLOBE_RADIUS);
      const end = latLonToVector3(toHub.lat, toHub.lon, GLOBE_RADIUS);

      const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
      const distance = start.distanceTo(end);
      const altitude = distance * 0.28;
      mid.normalize().multiplyScalar(GLOBE_RADIUS + altitude);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const curvePoints = curve.getPoints(50);

      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: 0x818cf8,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending
      });
      arcsGroup.add(new THREE.Line(curveGeo, curveMat));

      const photonGeo = new THREE.SphereGeometry(1.4, 12, 12);
      const photonMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.98,
        blending: THREE.AdditiveBlending
      });
      const photon = new THREE.Mesh(photonGeo, photonMat);
      arcsGroup.add(photon);

      arcPhotonMeshes.push({
        curve,
        photon,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.002
      });
    });

    // Interaction handling & Pin Click Raycaster
    let isDragging = false;
    let pointerDownPos = { x: 0, y: 0 };
    let previousMousePos = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.0016, y: 0.0004 };
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    function onPointerDown(e) {
      isDragging = true;
      targetRotationRef.current = null;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      previousMousePos = { x: clientX, y: clientY };
      pointerDownPos = { x: clientX, y: clientY };
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      const deltaX = clientX - previousMousePos.x;
      const deltaY = clientY - previousMousePos.y;

      rotationVelocity.x = deltaX * 0.0035;
      rotationVelocity.y = deltaY * 0.0035;

      globeGroup.rotation.y += rotationVelocity.x;
      globeGroup.rotation.x += rotationVelocity.y;
      globeGroup.rotation.x = Math.max(-0.65, Math.min(0.65, globeGroup.rotation.x));

      previousMousePos = { x: clientX, y: clientY };
    }

    function onPointerUp(e) {
      isDragging = false;
      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || previousMousePos.x;
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || previousMousePos.y;
      const dragDist = Math.hypot(clientX - pointerDownPos.x, clientY - pointerDownPos.y);

      // If user tapped without dragging, raycast for clicked hub pins
      if (dragDist < 6) {
        const rect = canvas.getBoundingClientRect();
        mouseCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouseCoord, camera);

        const targetList = [];
        hubMeshes.forEach(hm => {
          targetList.push({ obj: hm.dotMesh, hub: hm.hub });
          targetList.push({ obj: hm.ringMesh, hub: hm.hub });
        });

        const hits = raycaster.intersectObjects(targetList.map(t => t.obj));
        if (hits.length > 0) {
          const match = targetList.find(t => t.obj === hits[0].object);
          if (match) {
            focusHub(match.hub);
          }
        }
      }
    }

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    function onResize() {
      if (!container) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    }
    window.addEventListener('resize', onResize);

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    let animId = null;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      if (targetRotationRef.current) {
        globeGroup.rotation.y += (targetRotationRef.current.y - globeGroup.rotation.y) * 0.06;
        globeGroup.rotation.x += (targetRotationRef.current.x - globeGroup.rotation.x) * 0.06;
        if (
          Math.abs(targetRotationRef.current.y - globeGroup.rotation.y) < 0.002 &&
          Math.abs(targetRotationRef.current.x - globeGroup.rotation.x) < 0.002
        ) {
          targetRotationRef.current = null;
        }
      } else if (autoRotateRef.current && !isDragging) {
        globeGroup.rotation.y += 0.0016;
      } else if (!isDragging) {
        globeGroup.rotation.y += rotationVelocity.x;
        globeGroup.rotation.x += rotationVelocity.y;
        rotationVelocity.x *= 0.94;
        rotationVelocity.y *= 0.94;
      }

      hubMeshes.forEach(item => {
        item.scalePhase += 0.045;
        const s = 1.0 + Math.sin(item.scalePhase) * 0.45;
        item.ringMesh.scale.set(s, s, s);
        item.ringMesh.material.opacity = 0.85 - (s - 1.0) * 0.8;
      });

      arcPhotonMeshes.forEach(item => {
        item.progress += item.speed;
        if (item.progress > 1) item.progress = 0;
        const pt = item.curve.getPoint(item.progress);
        item.photon.position.copy(pt);
      });

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isInitialized) {
      isInitialized = true;
      cleanupFn = initGlobe();
    }
  }, { rootMargin: '250px' });

  observer.observe(container);

  return () => {
    observer.disconnect();
    if (cleanupFn) cleanupFn();
  };
}, []);

  const marqueeCountries = [
    { flag: '🇺🇸', name: 'United States', tag: 'Fintech & AI Platforms', id: 'us' },
    { flag: '🇬🇧', name: 'United Kingdom', tag: 'Luxury E-Commerce', id: 'uk' },
    { flag: '🇦🇪', name: 'UAE / Dubai', tag: 'Prime Real Estate & Ads', id: 'uae' },
    { flag: '🇩🇪', name: 'Germany', tag: 'CleanTech & Analytics', id: 'de' },
    { flag: '🇸🇬', name: 'Singapore', tag: 'Cross-Border Commerce', id: 'sg' },
    { flag: '🇦🇺', name: 'Australia', tag: 'DTC Paid Acquisition', id: 'au' },
    { flag: '🇨🇦', name: 'Canada', tag: 'Enterprise SaaS', id: 'ca' },
    { flag: '🇮🇳', name: 'India (HQ)', tag: 'Global Design & Code Labs', id: 'in' },
  ];

  return (
    <div className="globe-3d-stage-wrapper">
      <div className="globe-canvas-container" id="globeCanvasContainer" ref={containerRef}>
        <canvas id="globe3dCanvas" ref={canvasRef}></canvas>

        {/* Floating Holographic Glass Info Badge: Live Client Deployment & Case Study */}
        <div 
          className="globe-active-hub-card glass-card" 
          id="globeActiveHubCard"
          style={{
            '--hub-accent': activeHub.accent,
            borderColor: `${activeHub.accent}50`,
            boxShadow: `0 20px 48px -10px rgba(0,0,0,0.75), 0 0 30px -4px ${activeHub.accent}35`
          }}
        >
          <div className="hub-status-row">
            <span className="hub-live-dot" style={{ background: activeHub.accent, boxShadow: `0 0 10px ${activeHub.accent}` }}></span>
            <span className="hub-city-name" id="hubCityName">{activeHub.flag} {activeHub.name}</span>
            <span className="hub-tag" id="hubTag" style={{ borderColor: `${activeHub.accent}60`, color: activeHub.accent }}>
              {activeHub.tag}
            </span>
          </div>

          <div className="hub-deployment-body">
            <span className="hub-eyebrow">LIVE CLIENT DEPLOYMENT</span>
            <h4 className="hub-project-name">{activeHub.clientProject}</h4>
            <p className="hub-project-scope">{activeHub.scope}</p>
          </div>

          <div className="hub-metric-badge" style={{ borderColor: `${activeHub.accent}45`, background: `${activeHub.accent}14` }}>
            <span className="metric-arrow">📈</span>
            <span className="metric-val">{activeHub.impact}</span>
          </div>

          <div className="hub-tags-row">
            {activeHub.stack.map((item, idx) => (
              <span key={idx} className="hub-tech-chip">✦ {item}</span>
            ))}
          </div>

          <div className="hub-card-footer">
            <span className="hub-live-status">
              <span className="status-ping-mini" style={{ background: activeHub.accent }}></span>
              {activeHub.status}
            </span>
            <Link to="/work" className="hub-case-link" style={{ color: activeHub.accent }}>
              <span>View Case Study</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Globe Quick Control Dock */}
        <div className="globe-control-dock">
          <button
            type="button"
            className={`globe-control-btn ${autoRotate ? 'active' : ''}`}
            id="btnGlobeRotate"
            onClick={() => setAutoRotate(!autoRotate)}
            title="Toggle Auto-Spin"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
            </svg>
            <span>Auto-Spin</span>
          </button>
          <button
            type="button"
            className="globe-control-btn"
            id="btnGlobeReset"
            onClick={handleReset}
            title="Reset View"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
            <span>Reset View</span>
          </button>
          <div className="globe-drag-hint">
            <span>✦ CLICK PINS OR DRAG GLOBE</span>
          </div>
        </div>
      </div>

      {/* Interactive Country Deployment Pills */}
      <div className="marquee-wrapper" aria-label="Global markets we serve ticker" style={{ marginTop: '2rem' }}>
        <div className="marquee-track marquee-track-ltr">
          <div className="marquee-group">
            {marqueeCountries.map((c, idx) => (
              <div
                key={idx}
                className={`country-pill glass-chip ${activeHub.id === c.id ? 'active-market-pill' : ''}`}
                style={{ cursor: 'pointer' }}
                title={`Click to rotate 3D Globe to ${c.name}`}
                onClick={() => {
                  const hub = GLOBAL_HUBS.find(h => h.id === c.id || h.country.toLowerCase().includes(c.name.toLowerCase()));
                  if (hub) focusHub(hub);
                }}
              >
                <span className="country-flag">{c.flag}</span>
                <span className="name">{c.name}</span>
                <span className="tz-badge">{c.tag}</span>
              </div>
            ))}
          </div>
          {/* Duplicate for smooth continuous marquee */}
          <div className="marquee-group" aria-hidden="true">
            {marqueeCountries.map((c, idx) => (
              <div
                key={`dup-${idx}`}
                className={`country-pill glass-chip ${activeHub.id === c.id ? 'active-market-pill' : ''}`}
                style={{ cursor: 'pointer' }}
                title={`Click to rotate 3D Globe to ${c.name}`}
                onClick={() => {
                  const hub = GLOBAL_HUBS.find(h => h.id === c.id || h.country.toLowerCase().includes(c.name.toLowerCase()));
                  if (hub) focusHub(hub);
                }}
              >
                <span className="country-flag">{c.flag}</span>
                <span className="name">{c.name}</span>
                <span className="tz-badge">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
