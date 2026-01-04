'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';

const MedicalHeroBackground = ({
  children,
  width = '100%',
  height = '100vh',
  className = '',
  showTorso = false,
  showLeftKidney = true,
  showRightKidney = true,
  bloodIntensity = 1.0,
  animationSpeed = 1.0,
  overlayDarkness = 0.3,
  showLabels = false,
  showFlowArrows = true,
  complexity = 'medium',
  showDrugParticles = true, // NEW: Toggle drug particle effects
  drugEffectType = 'antibiotic', // 'antibiotic', 'analgesic', 'contrast'
  enableMouseInteraction = true,
  positionVertical = 'center',
  positionHorizontal = 'center'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [activeDrugEffect, setActiveDrugEffect] = useState(drugEffectType);

  // Drug effect configuration
  const drugEffects = {
    antibiotic: {
      color: 0x00ff00, // Green
      effect: 'healing',
      particleCount: 80,
      speed: 0.003,
      size: 0.08,
      opacity: 0.7
    },
    analgesic: {
      color: 0xff00ff, // Magenta/Pink
      effect: 'relief',
      particleCount: 60,
      speed: 0.002,
      size: 0.06,
      opacity: 0.8
    },
    contrast: {
      color: 0xffff00, // Yellow
      effect: 'highlight',
      particleCount: 100,
      speed: 0.004,
      size: 0.1,
      opacity: 0.9
    },
    diuretic: {
      color: 0x00ffff, // Cyan
      effect: 'flow',
      particleCount: 70,
      speed: 0.0035,
      size: 0.07,
      opacity: 0.75
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene with transparent background
    const scene = new THREE.Scene();
    scene.background = null;

    // FIXED CAMERA: Top-down orthographic view
    const aspectRatio = width / height;
    const viewSize = 25; // Controls zoom level
    
    const camera = new THREE.OrthographicCamera(
      -viewSize * aspectRatio, // left
      viewSize * aspectRatio,  // right
      viewSize,                // top
      -viewSize,               // bottom
      0.1,                     // near
      1000                     // far
    );
    
    // Position camera above looking down
    camera.position.set(0, 25, 0);
    camera.lookAt(0, 0, 0);
    camera.up.set(0, 0, -1); // Adjust up vector for proper orientation

    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: complexity !== 'low',
      powerPreference: complexity === 'high' ? "high-performance" : "default"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, complexity === 'high' ? 2 : 1));
    renderer.shadowMap.enabled = complexity !== 'low';
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Post-processing only for medium/high complexity
    let composer;
    if (complexity !== 'low') {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.8 * bloodIntensity,
        0.6,
        0.9
      );
      composer.addPass(bloomPass);

      const filmPass = new FilmPass(0.08, 0.2, 2048, false);
      composer.addPass(filmPass);
    }

    // Lighting - adjusted for top-down view
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.0);
    topLight.position.set(0, 50, 0);
    topLight.castShadow = complexity !== 'low';
    scene.add(topLight);

    const fillLight = new THREE.DirectionalLight(0x4466ff, 0.3);
    fillLight.position.set(15, 30, 15);
    scene.add(fillLight);

    const bloodLight = new THREE.PointLight(0xff0000, 2.0 * bloodIntensity, 40);
    bloodLight.position.set(0, 15, 0);
    scene.add(bloodLight);

    // Create kidney from top-down perspective
    const createKidney = (side = 'right') => {
      const kidneyGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const xOffset = sideMultiplier * 6;
      const yOffset = 0; // All at same height for top-down view

      // Main kidney shape - flatter for top-down view
      const geometry = new THREE.SphereGeometry(1.5, complexity === 'high' ? 96 : 64);
      geometry.scale(1.5, 0.6, 1.2); // Flattened Y for top-down view
      
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i) / 1.5;
        const y = positions.getY(i) / 0.6;
        const z = positions.getZ(i) / 1.2;

        // Hilum indentation (toward center)
        if (x * sideMultiplier < -0.3 && Math.abs(z) < 0.8) {
          const indent = 0.5 * Math.exp(-(z * z) / 0.3);
          positions.setX(i, (x + indent * sideMultiplier) * 1.5);
        }
        
        // Minor calyx indentations
        if (Math.abs(x) > 0.3 && Math.abs(z) > 0.2) {
          const indent = 0.15 * Math.cos(z * 4) * Math.exp(-(Math.abs(x) - 0.4) * 2);
          positions.setY(i, (y - indent) * 0.6);
        }
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xff88aa,
        transmission: 0.85,
        roughness: 0.2,
        metalness: 0.1,
        ior: 1.5,
        thickness: 0.8,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide
      });

      const kidney = new THREE.Mesh(geometry, material);
      kidney.position.set(xOffset, yOffset, 0);
      kidney.rotation.x = Math.PI / 2; // Lay flat for top-down view
      kidney.castShadow = complexity !== 'low';
      kidneyGroup.add(kidney);

      // Add collecting system
      if (complexity !== 'low') {
        const pelvisGeometry = new THREE.TorusGeometry(0.6, 0.1, 32, 64);
        const pelvisMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x88ffaa,
          transmission: 0.9,
          roughness: 0.15,
          metalness: 0.3,
          emissive: 0x44ff66,
          emissiveIntensity: 0.3 * bloodIntensity
        });
        const pelvis = new THREE.Mesh(pelvisGeometry, pelvisMaterial);
        pelvis.position.set(xOffset + sideMultiplier * 0.3, yOffset, 0);
        pelvis.rotation.x = Math.PI / 2;
        pelvis.rotation.z = Math.PI / 4;
        kidneyGroup.add(pelvis);
      }

      // Add anatomical label
      if (showLabels) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        context.fillStyle = 'rgba(255, 255, 255, 0.9)';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${side === 'right' ? 'Right' : 'Left'} Kidney`, 128, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(2.5, 0.6);
        const labelMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          side: THREE.DoubleSide
        });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(xOffset, yOffset + 1.8, 0);
        label.rotation.x = -Math.PI / 2;
        kidneyGroup.add(label);
      }

      kidney.userData = {
        type: 'kidney',
        side: side,
        pulsation: 0,
        baseScale: new THREE.Vector3(1, 1, 1)
      };

      return kidneyGroup;
    };

    // Create blood vessels for top-down view
    const createBloodVessels = (side = 'right') => {
      const vesselsGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const kidneyX = sideMultiplier * 6;

      // Renal Artery - coming from center
      const arteryCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sideMultiplier * 2, 0, 1.5),
        new THREE.Vector3(kidneyX - sideMultiplier * 1.5, 0, 0.8),
        new THREE.Vector3(kidneyX - sideMultiplier * 0.8, 0, 0.3),
        new THREE.Vector3(kidneyX, 0, 0),
      ]);

      const arteryGeometry = new THREE.TubeGeometry(
        arteryCurve, 
        32, 
        0.2, 
        12, 
        false
      );
      
      const arteryMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        emissive: 0xff4444,
        emissiveIntensity: 1.5 * bloodIntensity,
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.95 * bloodIntensity,
      });

      const artery = new THREE.Mesh(arteryGeometry, arteryMaterial);
      artery.userData = { type: 'artery', pulsation: 0 };
      vesselsGroup.add(artery);

      // Renal Vein - going to center
      const veinCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(kidneyX, 0, 0),
        new THREE.Vector3(kidneyX + sideMultiplier * 0.8, 0, -0.3),
        new THREE.Vector3(sideMultiplier * 2.5, 0, -1),
        new THREE.Vector3(sideMultiplier * 4, 0, -1.5),
      ]);

      const veinGeometry = new THREE.TubeGeometry(
        veinCurve, 
        32, 
        0.25, 
        12, 
        false
      );
      
      const veinMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1e88e5,
        emissive: 0x1565c0,
        emissiveIntensity: 1.2 * bloodIntensity,
        roughness: 0.1,
        metalness: 0.3,
        transparent: true,
        opacity: 0.9 * bloodIntensity,
      });

      const vein = new THREE.Mesh(veinGeometry, veinMaterial);
      vein.userData = { type: 'vein', pulsation: 0 };
      vesselsGroup.add(vein);

      // Ureter - going down from kidney
      const ureterCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(kidneyX, 0, 0),
        new THREE.Vector3(kidneyX - sideMultiplier * 0.5, -2, 0),
        new THREE.Vector3(0, -5, sideMultiplier * 1),
        new THREE.Vector3(0, -8, sideMultiplier * 2),
      ]);

      const ureterGeometry = new THREE.TubeGeometry(
        ureterCurve, 
        24, 
        0.15, 
        8, 
        false
      );
      
      const ureterMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xffff00,
        emissive: 0xffff88,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.2,
        transparent: true,
        opacity: 0.85,
      });

      const ureter = new THREE.Mesh(ureterGeometry, ureterMaterial);
      ureter.userData = { type: 'ureter', flow: 0 };
      vesselsGroup.add(ureter);

      // Blood flow particles
      const createBloodParticles = (count, isArterial = true) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
          const t = Math.random();
          const curve = isArterial ? arteryCurve : veinCurve;
          const point = curve.getPoint(t);
          const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4,
            (Math.random() - 0.5) * 0.4
          );

          positions[i * 3] = point.x + offset.x;
          positions[i * 3 + 1] = point.y + offset.y;
          positions[i * 3 + 2] = point.z + offset.z;

          if (isArterial) {
            colors[i * 3] = 0.9 + Math.random() * 0.1;
            colors[i * 3 + 1] = Math.random() * 0.2;
            colors[i * 3 + 2] = Math.random() * 0.2;
          } else {
            colors[i * 3] = 0.2 + Math.random() * 0.2;
            colors[i * 3 + 1] = 0.4 + Math.random() * 0.3;
            colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
          }

          velocities[i * 3] = (Math.random() - 0.5) * 0.001;
          velocities[i * 3 + 1] = isArterial ? 0.002 : -0.0015;
          velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

        const material = new THREE.PointsMaterial({
          size: isArterial ? 0.1 : 0.12,
          vertexColors: true,
          transparent: true,
          opacity: isArterial ? 0.9 : 0.8,
          sizeAttenuation: true,
          blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData = {
          type: 'bloodParticles',
          isArterial,
          count: count,
          curve: curve
        };
        
        return particles;
      };

      const arterialParticles = createBloodParticles(80, true);
      const venousParticles = createBloodParticles(70, false);
      vesselsGroup.add(arterialParticles);
      vesselsGroup.add(venousParticles);

      return vesselsGroup;
    };

    // Create medical stent
    const createStent = (side = 'right') => {
      const stentGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const kidneyX = sideMultiplier * 6;

      const ureterCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(kidneyX, 0, 0),
        new THREE.Vector3(kidneyX - sideMultiplier * 0.5, -2, 0),
        new THREE.Vector3(0, -5, sideMultiplier * 1),
        new THREE.Vector3(0, -8, sideMultiplier * 2),
      ]);

      // Stent coils
      for (let i = 0; i < 25; i++) {
        const t = i / 25;
        const point = ureterCurve.getPoint(t);
        const tangent = ureterCurve.getTangent(t);

        const coilGeometry = new THREE.TorusGeometry(0.12, 0.02, 6, 12);
        const coilMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x29b6f6,
          metalness: 0.9,
          roughness: 0.05,
          emissive: 0x0277bd,
          emissiveIntensity: 0.6,
        });

        const coil = new THREE.Mesh(coilGeometry, coilMaterial);
        
        const angle = i * 0.4;
        const offset = new THREE.Vector3(
          Math.cos(angle) * 0.05,
          Math.sin(angle) * 0.05,
          0
        );

        coil.position.copy(point).add(offset);
        coil.lookAt(point.clone().add(tangent));
        coil.rotateX(Math.PI / 2);
        coil.rotateZ(angle);

        coil.userData = {
          type: 'stentCoil',
          index: i,
          rotationSpeed: 0.001 + Math.random() * 0.001
        };
        stentGroup.add(coil);
      }

      return stentGroup;
    };

    // Create torso
    const createTorso = () => {
      const torsoGroup = new THREE.Group();

      const geometry = new THREE.CylinderGeometry(4, 3.5, 15, 32);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.95,
        roughness: 0.08,
        ior: 1.5,
        transparent: true,
        opacity: 0.03,
      });

      const torso = new THREE.Mesh(geometry, material);
      torso.position.y = 0;
      torso.rotation.x = Math.PI / 2; // Lay flat
      torsoGroup.add(torso);

      return torsoGroup;
    };

    // Create floating particles
    const createMedicalParticles = () => {
      const particlesGroup = new THREE.Group();
      const cellCount = complexity === 'high' ? 150 : 100;
      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(cellCount * 3);
      const colors = new Float32Array(cellCount * 3);
      const velocities = new Float32Array(cellCount * 3);

      for (let i = 0; i < cellCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

        const particleType = Math.random();
        if (particleType < 0.4) {
          colors[i * 3] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 1] = Math.random() * 0.1;
          colors[i * 3 + 2] = Math.random() * 0.1;
        } else if (particleType < 0.8) {
          colors[i * 3] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
        } else {
          colors[i * 3] = 0.2 + Math.random() * 0.3;
          colors[i * 3 + 1] = 0.6 + Math.random() * 0.3;
          colors[i * 3 + 2] = 0.8 + Math.random() * 0.2;
        }

        velocities[i * 3] = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

      const material = new THREE.PointsMaterial({
        size: 0.08,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particles.userData = {
        type: 'medicalParticles',
        velocities: velocities
      };
      
      particlesGroup.add(particles);

      return particlesGroup;
    };

    // NEW: Create drug/medication particles
    const createDrugParticles = (effectType = 'antibiotic') => {
      const drugGroup = new THREE.Group();
      const config = drugEffects[effectType];
      const particleCount = config.particleCount;
      
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const targets = new Float32Array(particleCount * 3);

      const color = new THREE.Color(config.color);

      for (let i = 0; i < particleCount; i++) {
        // Start positions around the kidneys
        const startX = (Math.random() - 0.5) * 3;
        const startY = 10 + Math.random() * 5;
        const startZ = (Math.random() - 0.5) * 3;
        
        positions[i * 3] = startX;
        positions[i * 3 + 1] = startY;
        positions[i * 3 + 2] = startZ;

        // Target positions (toward kidneys)
        const targetX = (Math.random() > 0.5 ? 6 : -6) + (Math.random() - 0.5) * 2;
        const targetY = 0;
        const targetZ = (Math.random() - 0.5) * 2;
        
        targets[i * 3] = targetX;
        targets[i * 3 + 1] = targetY;
        targets[i * 3 + 2] = targetZ;

        // Color with variations
        colors[i * 3] = color.r * (0.8 + Math.random() * 0.4);
        colors[i * 3 + 1] = color.g * (0.8 + Math.random() * 0.4);
        colors[i * 3 + 2] = color.b * (0.8 + Math.random() * 0.4);

        // Velocity toward target
        const dirX = targetX - startX;
        const dirY = targetY - startY;
        const dirZ = targetZ - startZ;
        const distance = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
        
        velocities[i * 3] = (dirX / distance) * config.speed;
        velocities[i * 3 + 1] = (dirY / distance) * config.speed;
        velocities[i * 3 + 2] = (dirZ / distance) * config.speed;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
      geometry.setAttribute('target', new THREE.BufferAttribute(targets, 3));

      const material = new THREE.PointsMaterial({
        size: config.size,
        vertexColors: true,
        transparent: true,
        opacity: config.opacity,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
      });

      const particles = new THREE.Points(geometry, material);
      particles.userData = {
        type: 'drugParticles',
        effect: effectType,
        config: config,
        life: new Float32Array(particleCount).fill(1.0)
      };
      
      drugGroup.add(particles);

      return drugGroup;
    };

    // Build scene
    const medicalParticles = createMedicalParticles();
    scene.add(medicalParticles);

    let drugParticles = null;
    if (showDrugParticles) {
      drugParticles = createDrugParticles(activeDrugEffect);
      scene.add(drugParticles);
    }

    if (showTorso) {
      const torso = createTorso();
      scene.add(torso);
    }

    if (showRightKidney) {
      const rightKidney = createKidney('right');
      const rightVessels = createBloodVessels('right');
      const rightStent = createStent('right');
      scene.add(rightKidney);
      scene.add(rightVessels);
      scene.add(rightStent);
    }

    if (showLeftKidney) {
      const leftKidney = createKidney('left');
      const leftVessels = createBloodVessels('left');
      const leftStent = createStent('left');
      scene.add(leftKidney);
      scene.add(leftVessels);
      scene.add(leftStent);
    }

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * animationSpeed;

      // Animate all scene objects
      scene.traverse((object) => {
        if (object.userData) {
          // Kidney pulsation
          if (object.userData.type === 'kidney') {
            const pulsation = Math.sin(time * 2) * 0.02;
            object.scale.setScalar(1 + pulsation);
          }

          // Vessel pulsation
          if (object.userData.type === 'artery' || object.userData.type === 'vein') {
            const scale = 1 + Math.sin(time * 3) * 0.03;
            object.scale.y = scale;
          }

          // Blood particles animation
          if (object.userData.type === 'bloodParticles') {
            const positions = object.geometry?.attributes?.position?.array;
            const velocities = object.geometry?.attributes?.velocity?.array;
            
            if (positions && velocities) {
              for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Reset particles at end of curve
                if (object.userData.isArterial && positions[i] > 8) {
                  const t = Math.random() * 0.3;
                  const point = object.userData.curve.getPoint(t);
                  positions[i] = point.x;
                  positions[i + 1] = point.y;
                  positions[i + 2] = point.z;
                }
              }
              object.geometry.attributes.position.needsUpdate = true;
            }
          }

          // Stent coil rotation
          if (object.userData.type === 'stentCoil') {
            object.rotation.z += object.userData.rotationSpeed;
          }

          // Medical particles animation
          if (object.userData.type === 'medicalParticles') {
            const positions = object.geometry?.attributes?.position?.array;
            const velocities = object.geometry?.attributes?.velocity?.array;
            
            if (positions && velocities) {
              for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];

                // Boundary check
                if (positions[i] > 10) positions[i] = -10;
                if (positions[i] < -10) positions[i] = 10;
                if (positions[i + 1] > 5) positions[i + 1] = -5;
                if (positions[i + 1] < -5) positions[i + 1] = 5;
                if (positions[i + 2] > 5) positions[i + 2] = -5;
                if (positions[i + 2] < -5) positions[i + 2] = 5;
              }
              object.geometry.attributes.position.needsUpdate = true;
            }
          }

          // NEW: Drug particles animation
          if (object.userData.type === 'drugParticles') {
            const positions = object.geometry?.attributes?.position?.array;
            const velocities = object.geometry?.attributes?.velocity?.array;
            const targets = object.geometry?.attributes?.target?.array;
            const life = object.userData.life;
            
            if (positions && velocities && targets) {
              for (let i = 0; i < positions.length; i += 3) {
                if (life[i] > 0) {
                  // Move toward target
                  positions[i] += velocities[i];
                  positions[i + 1] += velocities[i + 1];
                  positions[i + 2] += velocities[i + 2];

                  // Check if reached target
                  const dx = positions[i] - targets[i];
                  const dy = positions[i + 1] - targets[i + 1];
                  const dz = positions[i + 2] - targets[i + 2];
                  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

                  if (distance < 0.5) {
                    // Reset particle
                    life[i] -= 0.05;
                    if (life[i] <= 0) {
                      // Respawn particle
                      const startX = (Math.random() - 0.5) * 3;
                      const startY = 10 + Math.random() * 5;
                      const startZ = (Math.random() - 0.5) * 3;
                      
                      positions[i] = startX;
                      positions[i + 1] = startY;
                      positions[i + 2] = startZ;

                      const targetX = (Math.random() > 0.5 ? 6 : -6) + (Math.random() - 0.5) * 2;
                      const targetY = 0;
                      const targetZ = (Math.random() - 0.5) * 2;
                      
                      targets[i] = targetX;
                      targets[i + 1] = targetY;
                      targets[i + 2] = targetZ;

                      // Recalculate velocity
                      const dirX = targetX - startX;
                      const dirY = targetY - startY;
                      const dirZ = targetZ - startZ;
                      const newDistance = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ);
                      
                      velocities[i] = (dirX / newDistance) * object.userData.config.speed;
                      velocities[i + 1] = (dirY / newDistance) * object.userData.config.speed;
                      velocities[i + 2] = (dirZ / newDistance) * object.userData.config.speed;

                      life[i] = 1.0;
                    }
                  }

                  // Add some Brownian motion
                  positions[i] += (Math.random() - 0.5) * 0.001;
                  positions[i + 1] += (Math.random() - 0.5) * 0.001;
                  positions[i + 2] += (Math.random() - 0.5) * 0.001;
                }
              }
              object.geometry.attributes.position.needsUpdate = true;
            }
          }
        }

        // Material effects
        if (object.material) {
          // Pulsing glow for vessels
          if (object.material.emissive) {
            if (object.material.color && object.material.color.getHex() === 0xff0000) {
              object.material.emissiveIntensity = (0.7 + Math.sin(time * 3) * 0.2) * bloodIntensity;
            } else if (object.material.color && object.material.color.getHex() === 0x1e88e5) {
              object.material.emissiveIntensity = (0.5 + Math.cos(time * 2.5) * 0.2) * bloodIntensity;
            }
          }
        }
      });

      // Animate blood light
      bloodLight.intensity = 1.8 * bloodIntensity * (0.7 + Math.sin(time * 1.5) * 0.3);

      // Render
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      const aspectRatio = newWidth / newHeight;
      
      camera.left = -viewSize * aspectRatio;
      camera.right = viewSize * aspectRatio;
      camera.top = viewSize;
      camera.bottom = -viewSize;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, newHeight);
      
      if (composer) {
        composer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    
    setIsLoaded(true);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      renderer.dispose();
    };
  }, [
    showTorso, 
    showLeftKidney, 
    showRightKidney, 
    bloodIntensity, 
    animationSpeed,
    showLabels,
    showFlowArrows,
    complexity,
    showDrugParticles,
    activeDrugEffect
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        width,
        height,
        minHeight: '600px',
      }}
    >
      {/* Top-down view indicator */}
      <div className="absolute top-4 left-4 z-20">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm text-sm font-medium text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          Top-Down View
        </div>
      </div>

      {/* Enhanced gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: complexity === 'high' 
            ? 'radial-gradient(circle at 50% 50%, #FDF5EE 0%, #F9F0E8 40%, #ffffff 100%)'
            : 'linear-gradient(180deg, #FDF5EE 0%, #ffffff 50%, #F9F0E8 100%)'
        }}
      />
      
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-t-transparent border-red-500 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-t-transparent border-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            </div>
            <p className="text-gray-700 font-medium">
              Loading Medical Visualization...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {complexity === 'high' ? 'High-detail rendering' : 'Standard rendering'}
            </p>
          </div>
        </div>
      )}

      {/* Dark Overlay with gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${overlayDarkness})`,
          backgroundImage: `linear-gradient(to bottom, 
            rgba(0, 0, 0, ${overlayDarkness * 0.3}), 
            rgba(0, 0, 0, ${overlayDarkness * 0.1}), 
            rgba(0, 0, 0, ${overlayDarkness * 0.3})
          )`
        }}
      />

      {/* Children / Content Layer */}
      <div className="relative h-full min-h-screen">
        {children}
      </div>

      {/* Enhanced Accent Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/5 via-purple-500/3 to-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Drug Effect Controls */}
      {showDrugParticles && (
        <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
            </svg>
            Medication Effect
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(drugEffects).map((effect) => (
              <button
                key={effect}
                onClick={() => setActiveDrugEffect(effect)}
                className={`px-3 py-2 rounded text-sm font-medium transition-all ${
                  activeDrugEffect === effect
                    ? 'text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  activeDrugEffect === effect
                    ? {
                        backgroundColor: `#${drugEffects[effect].color.toString(16).padStart(6, '0')}`,
                        boxShadow: `0 4px 6px rgba(${drugEffects[effect].color >> 16}, ${(drugEffects[effect].color >> 8) & 255}, ${drugEffects[effect].color & 255}, 0.2)`
                      }
                    : {}
                }
              >
                {effect.charAt(0).toUpperCase() + effect.slice(1)}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Current: {drugEffects[activeDrugEffect].effect} effect
          </p>
        </div>
      )}

      {/* Legend/Info Panel */}
      {(showLabels || showFlowArrows) && (
        <div className="absolute bottom-4 right-4 z-20 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Anatomical Legend
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ff0000] mr-2"></div>
              <span>Renal Artery</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#1e88e5] mr-2"></div>
              <span>Renal Vein</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#ffff00] mr-2"></div>
              <span>Ureter</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-[#29b6f6] to-[#0277bd] mr-2" style={{ width: '12px', height: '2px' }}></div>
              <span>Ureteral Stent</span>
            </div>
            {showDrugParticles && (
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{
                  backgroundColor: `#${drugEffects[activeDrugEffect].color.toString(16).padStart(6, '0')}`
                }}></div>
                <span>{activeDrugEffect.charAt(0).toUpperCase() + activeDrugEffect.slice(1)} Particles</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Performance Indicator */}
      {complexity !== 'low' && (
        <div className="absolute top-4 right-4 z-20 text-xs text-gray-500 bg-black/20 backdrop-blur-sm px-2 py-1 rounded">
          {complexity === 'high' ? 'High Detail Mode' : 'Medium Detail Mode'}
        </div>
      )}
    </div>
  );
};

export default MedicalHeroBackground;