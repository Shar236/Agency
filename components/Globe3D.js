import * as THREE from 'three';

/**
 * Saarthi Interactive 3D Dither Globe Component
 * Features:
 * - High-contrast procedural continental dither particles (Americas, Europe, MENA, India, APAC)
 * - Starts oriented directly towards Europe / Middle East / India so continents are immediately visible
 * - Labeled 3D beacon hubs with live local time calculations
 * - Glowing 3D flight arcs with animated traveling photons
 * - Mouse drag & touch inertia controls + auto-rotation
 * - Dual-view support (3D Globe <-> Regional Hubs Grid)
 * - Click country pills to smoothly fly the camera to that country
 */

export const GLOBAL_HUBS = [
  {
    id: 'in',
    name: 'New Delhi / Gurugram',
    country: 'India',
    flag: '🇮🇳',
    lat: 28.6139,
    lon: 77.2090,
    tz: 'IST / UTC+5:30',
    timeOffset: 5.5,
    tag: 'Core Engineering Studio & APAC Hub',
    stats: '24/7 Rapid Delivery Pipeline · IST Overlap',
    accent: '#FB923C'
  },
  {
    id: 'uae',
    name: 'Dubai',
    country: 'UAE / Dubai',
    flag: '🇦🇪',
    lat: 25.2048,
    lon: 55.2708,
    tz: 'GST / UTC+4',
    timeOffset: 4,
    tag: 'MENA Real Estate & FinTech Partner',
    stats: '8 Flagship Deployments · Zero Latency',
    accent: '#FBBF24'
  },
  {
    id: 'uk',
    name: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    lat: 51.5074,
    lon: -0.1278,
    tz: 'GMT / UTC+0',
    timeOffset: 0,
    tag: 'European HQ & Flagship Brands',
    stats: '11 Live Platforms · 99/100 Core Web Vitals',
    accent: '#F472B6'
  },
  {
    id: 'us',
    name: 'New York / US East',
    country: 'United States',
    flag: '🇺🇸',
    lat: 40.7128,
    lon: -74.0060,
    tz: 'EST / UTC-5',
    timeOffset: -5,
    tag: 'North American Commercial Hub',
    stats: '14 Live Brands · $3.2M Client ARR',
    accent: '#38BDF8'
  },
  {
    id: 'us-west',
    name: 'San Francisco / Bay Area',
    country: 'United States',
    flag: '🇺🇸',
    lat: 37.7749,
    lon: -122.4194,
    tz: 'PST / UTC-8',
    timeOffset: -8,
    tag: 'AI & High-Growth Startups',
    stats: '9 Active Engagements',
    accent: '#818CF8'
  },
  {
    id: 'sg',
    name: 'Singapore',
    country: 'Singapore',
    flag: '🇸🇬',
    lat: 1.3521,
    lon: 103.8198,
    tz: 'SGT / UTC+8',
    timeOffset: 8,
    tag: 'Southeast Asia Growth Center',
    stats: '6 International Brands',
    accent: '#34D399'
  },
  {
    id: 'de',
    name: 'Berlin',
    country: 'Germany',
    flag: '🇩🇪',
    lat: 52.5200,
    lon: 13.4050,
    tz: 'CET / UTC+1',
    timeOffset: 1,
    tag: 'DACH SaaS & Design Engineering',
    stats: '7 High-Velocity Platforms',
    accent: '#60A5FA'
  },
  {
    id: 'au',
    name: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    lat: -33.8688,
    lon: 151.2093,
    tz: 'AEST / UTC+10',
    timeOffset: 10,
    tag: 'Oceania E-Commerce & Retail',
    stats: '5 Flagship Platforms',
    accent: '#A78BFA'
  },
  {
    id: 'ca',
    name: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    lat: 43.6532,
    lon: -79.3832,
    tz: 'EST / UTC-5',
    timeOffset: -5,
    tag: 'Canadian Expansion Hub',
    stats: '4 Active Clients',
    accent: '#F87171'
  }
];

export function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// High-fidelity procedural continental land test
function isLandmass(lat, lon) {
  // North America
  if (lat >= 12 && lat <= 72 && lon >= -168 && lon <= -52) {
    if (lat < 28 && lon < -106) return false;
    return true;
  }
  // South America
  if (lat >= -56 && lat < 13 && lon >= -82 && lon <= -34) {
    if (lat < -20 && lon > -44) return false;
    return true;
  }
  // Europe & UK
  if (lat >= 35 && lat <= 72 && lon >= -12 && lon <= 45) return true;
  // Africa
  if (lat >= -36 && lat <= 37 && lon >= -18 && lon <= 52) return true;
  // Middle East & India
  if (lat >= 10 && lat <= 40 && lon >= 34 && lon <= 92) return true;
  // East & North Asia
  if (lat >= 5 && lat <= 75 && lon >= 92 && lon <= 150) return true;
  // Southeast Asia
  if (lat >= -10 && lat <= 22 && lon >= 95 && lon <= 142) return true;
  // Australia & New Zealand
  if (lat >= -45 && lat <= -10 && lon >= 112 && lon <= 180) return true;

  return false;
}

export function initGlobe3D() {
  const canvas = document.getElementById('globe3dCanvas');
  const container = document.getElementById('globeCanvasContainer');
  if (!canvas || !container) return null;

  const scene = new THREE.Scene();

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 520;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 250; // Closer camera for larger, clearer globe

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const globeGroup = new THREE.Group();
  // Start oriented towards Europe / Middle East / India so continents are immediately in view!
  globeGroup.rotation.y = -1.2;
  globeGroup.rotation.x = 0.25;
  scene.add(globeGroup);

  const GLOBE_RADIUS = 104;

  // 1. DENSE DITHERED CONTINENTAL LATTICE (5,200 particles)
  const particleCount = 5200;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const colorLandPrimary = new THREE.Color('#C084FC');   // Radiant Purple
  const colorLandSecondary = new THREE.Color('#38BDF8'); // Electric Cyan
  const colorLandAccent = new THREE.Color('#FB923C');    // Amber / Coral hub
  const colorOcean = new THREE.Color('#1E293B');

  const phiStep = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

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
      // High-contrast luminescent continents
      const pick = (i % 4 === 0) ? colorLandAccent : ((i % 2 === 0) ? colorLandSecondary : colorLandPrimary);
      colors[i * 3] = pick.r * 1.25;
      colors[i * 3 + 1] = pick.g * 1.25;
      colors[i * 3 + 2] = pick.b * 1.25;
    } else {
      // Subtle ocean grid
      colors[i * 3] = colorOcean.r * 0.35;
      colors[i * 3 + 1] = colorOcean.g * 0.35;
      colors[i * 3 + 2] = colorOcean.b * 0.45;
    }
  }

  // Soft round particle texture
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

  // 2. INNER DARK SPHERE (Blocks backside points for depth clarity)
  const innerSphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 40, 40);
  const innerSphereMat = new THREE.MeshBasicMaterial({
    color: 0x080b14,
    transparent: true,
    opacity: 0.94
  });
  const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
  globeGroup.add(innerSphere);

  // Latitude and Longitude reference rings
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

  // 3. ATMOSPHERIC HALO
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

  // 4. INTERACTIVE 3D BEACON HUBS
  const hubMeshes = [];
  const hubGroup = new THREE.Group();
  globeGroup.add(hubGroup);

  GLOBAL_HUBS.forEach((hub) => {
    const hubPos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS + 0.8);

    // Glowing core dot
    const dotGeo = new THREE.SphereGeometry(1.8, 16, 16);
    const dotMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(hub.accent),
      transparent: true,
      opacity: 0.98
    });
    const dotMesh = new THREE.Mesh(dotGeo, dotMat);
    dotMesh.position.copy(hubPos);

    // Expanding beacon ripple
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
      pos: hubPos,
      scalePhase: Math.random() * Math.PI * 2
    });
  });

  // 5. 3D BÉZIER FLIGHT ARCS (Pulsing connections between hubs)
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

    // Traveling Photon Beam
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

  // 6. INTERACTION & HUD CARD STATE
  let isDragging = false;
  let previousMousePos = { x: 0, y: 0 };
  let autoRotate = true;
  let rotationVelocity = { x: 0.0016, y: 0.0004 };
  let targetRotation = null;
  let currentActiveHub = GLOBAL_HUBS[0]; // New Delhi / India default

  const hubCard = document.getElementById('globeActiveHubCard');
  const hubCityName = document.getElementById('hubCityName');
  const hubTag = document.getElementById('hubTag');
  const hubTimeVal = document.getElementById('hubTimeVal');
  const hubMetaRow = document.getElementById('hubMetaRow');
  const btnAutoSpin = document.getElementById('btnGlobeRotate');
  const btnReset = document.getElementById('btnGlobeReset');

  function updateHubCard(hub) {
    if (!hub) return;
    currentActiveHub = hub;

    if (hubCityName) {
      hubCityName.innerHTML = `${hub.flag} ${hub.name}`;
    }
    if (hubTag) {
      hubTag.textContent = hub.tag;
      hubTag.style.borderColor = hub.accent;
      hubTag.style.color = hub.accent;
    }
    if (hubTimeVal) {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const hubTime = new Date(utc + (3600000 * hub.timeOffset));
      const hours = String(hubTime.getHours()).padStart(2, '0');
      const mins = String(hubTime.getMinutes()).padStart(2, '0');
      hubTimeVal.textContent = `${hours}:${mins} ${hub.tz.split('/')[0].trim()}`;
    }
    if (hubMetaRow) {
      hubMetaRow.innerHTML = `<span>✦ Operational Coverage: <strong>${hub.stats}</strong></span><span>✦ Status: <strong style="color: #34D399;">Active 24/7 Pipeline</strong></span>`;
    }
    if (hubCard) {
      hubCard.classList.remove('pulse-update');
      void hubCard.offsetWidth;
      hubCard.classList.add('pulse-update');
    }
  }
  updateHubCard(currentActiveHub);

  // Hook for pill click
  window.__focusHubById = (hubId) => {
    const hub = GLOBAL_HUBS.find(h => h.id === hubId || h.country.toLowerCase().includes(hubId.toLowerCase()));
    if (!hub) return;

    const targetY = -((hub.lon + 90) * (Math.PI / 180));
    const targetX = (hub.lat * (Math.PI / 180)) * 0.45;

    targetRotation = { x: targetX, y: targetY };
    autoRotate = false;
    if (btnAutoSpin) btnAutoSpin.classList.remove('active');
    updateHubCard(hub);
  };

  window.__focusHubByCountry = (countryStr) => {
    const match = GLOBAL_HUBS.find(h => 
      h.country.toLowerCase().includes(countryStr.toLowerCase()) ||
      countryStr.toLowerCase().includes(h.country.toLowerCase())
    );
    if (match) window.__focusHubById(match.id);
  };

  function onPointerDown(e) {
    isDragging = true;
    targetRotation = null;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    previousMousePos = { x: clientX, y: clientY };
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

  function onPointerUp() {
    isDragging = false;
  }

  canvas.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  canvas.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);

  if (btnAutoSpin) {
    btnAutoSpin.addEventListener('click', () => {
      autoRotate = !autoRotate;
      targetRotation = null;
      btnAutoSpin.classList.toggle('active', autoRotate);
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      targetRotation = { x: 0.25, y: -1.2 };
      autoRotate = true;
      if (btnAutoSpin) btnAutoSpin.classList.add('active');
      updateHubCard(GLOBAL_HUBS[0]);
    });
  }

  // Connect country pills in marquee
  const countryPills = document.querySelectorAll('.country-pill');
  countryPills.forEach(pill => {
    pill.style.cursor = 'pointer';
    pill.setAttribute('title', 'Click to rotate 3D Globe to this timezone');
    pill.addEventListener('click', () => {
      const countryText = pill.querySelector('.name')?.textContent || '';
      window.__focusHubByCountry?.(countryText);
    });
  });

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

  // Animation Loop
  let animId = null;
  function animate() {
    animId = requestAnimationFrame(animate);
    if (!isVisible) return;

    if (targetRotation) {
      globeGroup.rotation.y += (targetRotation.y - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x += (targetRotation.x - globeGroup.rotation.x) * 0.06;
      if (
        Math.abs(targetRotation.y - globeGroup.rotation.y) < 0.002 &&
        Math.abs(targetRotation.x - globeGroup.rotation.x) < 0.002
      ) {
        targetRotation = null;
      }
    } else if (autoRotate && !isDragging) {
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

  return {
    destroy: () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    }
  };
}
