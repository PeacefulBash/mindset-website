/* ============================================================
   MINDSET.I — BREATHING GEOMETRIES
   ============================================================ */

(function() {
  const container = document.getElementById('three-bg');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true,
    powerPreference: "low-power"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const colors = {
    violet: new THREE.Color(0x3B1F52),
    cyan: new THREE.Color(0x18B9D8),
    teal: new THREE.Color(0x0A4D5E),
    cream: new THREE.Color(0xF7F9FC)
  };

  // Floating sacred shapes
  const shapes = [];
  const shapeCount = 5;

  const geometries = [
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.OctahedronGeometry(1, 0),
    new THREE.TetrahedronGeometry(1, 0),
    new THREE.DodecahedronGeometry(1, 0)
  ];

  for (let i = 0; i < shapeCount; i++) {
    const geo = geometries[i % geometries.length];
    const material = new THREE.MeshBasicMaterial({
      color: i % 2 === 0 ? colors.violet : colors.teal,
      transparent: true,
      opacity: 0.05 + (Math.random() * 0.03),
      wireframe: true
    });

    const mesh = new THREE.Mesh(geo, material);
    mesh.position.x = (Math.random() - 0.5) * 40;
    mesh.position.y = (Math.random() - 0.5) * 30;
    mesh.position.z = (Math.random() - 0.5) * 20 - 10;
    
    const scale = 2 + Math.random() * 5;
    mesh.scale.set(scale, scale, scale);
    
    mesh.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.002,
      rotSpeedY: (Math.random() - 0.5) * 0.002,
      floatOffset: Math.random() * Math.PI * 2,
      originalY: mesh.position.y
    };

    scene.add(mesh);
    shapes.push(mesh);
  }

  // Particle field
  const particleCount = 60;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: colors.cyan,
    size: 0.06,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Ambient glow
  const glowGeo = new THREE.SphereGeometry(1, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: colors.cyan,
    transparent: true,
    opacity: 0.02
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.scale.set(12, 12, 12);
  glow.position.set(5, 5, -10);
  scene.add(glow);

  const glow2 = glow.clone();
  glow2.material = glowMat.clone();
  glow2.material.color = colors.violet;
  glow2.scale.set(10, 10, 10);
  glow2.position.set(-8, -5, -15);
  scene.add(glow2);

  // Mouse interaction
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  document.addEventListener('mousemove', (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // Animation
  let time = 0;
  let animationId;

  function animate() {
    animationId = requestAnimationFrame(animate);
    time += 0.001;

    mouseX += (targetMouseX - mouseX) * 0.02;
    mouseY += (targetMouseY - mouseY) * 0.02;

    shapes.forEach((shape) => {
      shape.rotation.x += shape.userData.rotSpeedX;
      shape.rotation.y += shape.userData.rotSpeedY;
      shape.position.y = shape.userData.originalY + Math.sin(time * 2 + shape.userData.floatOffset) * 1.5;
      shape.position.x += (mouseX * 0.3 - shape.position.x * 0.01) * 0.01;
    });

    particles.rotation.y += 0.00015;
    particles.rotation.x += 0.00008;

    glow.scale.setScalar(12 + Math.sin(time * 3) * 1.5);
    glow2.scale.setScalar(10 + Math.cos(time * 2.5) * 1.5);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(animationId);
    renderer.dispose();
  });
})();