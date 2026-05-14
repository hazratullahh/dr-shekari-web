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
  height = '100%',
  className = '',
  showTorso = false,
  showLeftKidney = true,
  showRightKidney = true,
  bloodIntensity = 1.0,
  animationSpeed = 1.0,
  overlayDarkness = 0.3,
  positionVertical = 'center', // 'top', 'center', 'bottom'
  positionHorizontal = 'center' // 'left', 'center', 'right'
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

    // Camera setup - positioned to show kidneys at top
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 8, 25); // Increased Y to show kidneys higher
    camera.lookAt(0, 8, 0); // Look at higher position

    // Renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Post-processing
    const composer = new EffectComposer(renderer);
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

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    keyLight.position.set(10, 20, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x4466ff, 0.5);
    rimLight.position.set(-10, 15, -10);
    scene.add(rimLight);

    const bloodLight = new THREE.PointLight(0xff0000, 2.0 * bloodIntensity, 30);
    bloodLight.position.set(5, 8, 5);
    scene.add(bloodLight);

    // Create kidney at higher position
    const createKidney = (side = 'right') => {
      const kidneyGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const verticalOffset = 11; // Position kidneys higher

      // Main kidney shape
      const geometry = new THREE.SphereGeometry(1.5, 64, 64);
      geometry.scale(1.2, 1.8, 0.8);
      
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i) / 1.2;
        const y = positions.getY(i) / 1.8;
        const z = positions.getZ(i) / 0.8;

        if (x > 0.4 && Math.abs(y) < 0.8) {
          const indent = 0.6 * Math.exp(-(y * y) / 0.4);
          positions.setX(i, (x - indent) * 1.2);
        }
        
        if (x < -0.4) {
          const bulge = 0.25 * Math.exp(-(y * y) / 0.6);
          positions.setX(i, (x - bulge) * 1.2);
        }
      }
      geometry.computeVertexNormals();

      const material = new THREE.MeshPhysicalMaterial({
        color: 0xff88aa,
        transmission: 0.9,
        roughness: 0.15,
        metalness: 0,
        ior: 1.5,
        thickness: 1.0,
        transparent: true,
        opacity: 0.7,
      });

      const kidney = new THREE.Mesh(geometry, material);
      kidney.position.set(sideMultiplier * 6, verticalOffset, 0);
      kidney.castShadow = true;
      kidneyGroup.add(kidney);

      return kidneyGroup;
    };

    // Create blood vessels at higher position
    const createBloodVessels = (side = 'right') => {
      const vesselsGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const verticalOffset = 11; // Match kidney vertical position

      // ARTERY
      const arteryCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sideMultiplier * -10, verticalOffset + 4, 0.5),
        new THREE.Vector3(sideMultiplier * -8, verticalOffset + 2, 0),
        new THREE.Vector3(sideMultiplier * -6, verticalOffset + 1, -0.3),
        new THREE.Vector3(sideMultiplier * -4, verticalOffset, 0),
      ]);

      const arteryGeometry = new THREE.TubeGeometry(arteryCurve, 32, 0.25, 12, false);
      const arteryMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        emissive: 0xff4444,
        emissiveIntensity: 1.5 * bloodIntensity,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.95 * bloodIntensity,
      });

      const artery = new THREE.Mesh(arteryGeometry, arteryMaterial);
      vesselsGroup.add(artery);

      // VEIN
      const veinCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sideMultiplier * -4, verticalOffset, 0),
        new THREE.Vector3(sideMultiplier * -6, verticalOffset - 1, 0.3),
        new THREE.Vector3(sideMultiplier * -8, verticalOffset - 2, 0),
        new THREE.Vector3(sideMultiplier * -10, verticalOffset - 4, -0.5),
      ]);

      const veinGeometry = new THREE.TubeGeometry(veinCurve, 32, 0.3, 12, false);
      const veinMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x1e88e5,
        emissive: 0x1565c0,
        emissiveIntensity: 1.2 * bloodIntensity,
        roughness: 0.1,
        metalness: 0.2,
        transparent: true,
        opacity: 0.9 * bloodIntensity,
      });

      const vein = new THREE.Mesh(veinGeometry, veinMaterial);
      vesselsGroup.add(vein);

      // Blood particles
      const createBloodParticles = (count) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
          const t = Math.random();
          const curve = Math.random() > 0.3 ? arteryCurve : veinCurve;
          const point = curve.getPoint(t);
          const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 0.8
          );

          positions[i * 3] = point.x + offset.x;
          positions[i * 3 + 1] = point.y + offset.y;
          positions[i * 3 + 2] = point.z + offset.z;

          colors[i * 3] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 1] = Math.random() * 0.2;
          colors[i * 3 + 2] = Math.random() * 0.2;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.15 * bloodIntensity,
          vertexColors: true,
          transparent: true,
          opacity: 0.9 * bloodIntensity,
          sizeAttenuation: true,
        });

        const particles = new THREE.Points(geometry, material);
        particles.userData = { flowSpeed: 0.03 };
        return particles;
      };

      vesselsGroup.add(createBloodParticles(200));

      return vesselsGroup;
    };

    // Create medical stent at higher position
    const createStent = (side = 'right') => {
      const stentGroup = new THREE.Group();
      const sideMultiplier = side === 'right' ? 1 : -1;
      const verticalOffset = 11;

      const ureterCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(sideMultiplier * 4, verticalOffset, 0),
        new THREE.Vector3(sideMultiplier * 2, verticalOffset - 3, 0.3),
        new THREE.Vector3(sideMultiplier * 1, verticalOffset - 6, 0),
        new THREE.Vector3(0, verticalOffset - 9, -0.2),
      ]);

      // Stent coils
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        const point = ureterCurve.getPoint(t);
        const tangent = ureterCurve.getTangent(t);

        const coilGeometry = new THREE.TorusGeometry(0.18, 0.03, 8, 16);
        const coilMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x29b6f6,
          metalness: 1.0,
          roughness: 0.05,
          emissive: 0x0277bd,
          emissiveIntensity: 0.6,
        });

        const coil = new THREE.Mesh(coilGeometry, coilMaterial);
        
        const offset = new THREE.Vector3(
          Math.cos(i * 0.8) * 0.06,
          Math.sin(i * 0.8) * 0.06,
          0
        );

        coil.position.copy(point).add(offset);
        coil.lookAt(point.clone().add(tangent));
        coil.rotateX(Math.PI / 2);
        coil.rotateZ(i * 0.5);

        coil.userData = { rotationSpeed: 0.002 };
        stentGroup.add(coil);
      }

      return stentGroup;
    };

    // Create torso at higher position
    const createTorso = () => {
      const torsoGroup = new THREE.Group();

      const geometry = new THREE.CylinderGeometry(3.5, 3, 12, 32);
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.98,
        roughness: 0.05,
        ior: 1.5,
        transparent: true,
        opacity: 0.05,
      });

      const torso = new THREE.Mesh(geometry, material);
      torso.position.y = 11; // Position torso higher
      torsoGroup.add(torso);

      return torsoGroup;
    };

    // Create floating blood cells at higher position
    const createBloodCells = () => {
      const cellsGroup = new THREE.Group();
      const cellCount = 150;
      const verticalOffset = 11;
      
      for (let i = 0; i < cellCount; i++) {
        const size = 0.04 + Math.random() * 0.06;
        const geometry = new THREE.SphereGeometry(size, 8, 8);
        const material = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(0, 0.9, 0.6),
          transparent: true,
          opacity: 0.5 * bloodIntensity,
        });
        
        const cell = new THREE.Mesh(geometry, material);
        
        cell.position.set(
          (Math.random() - 0.5) * 25,
          verticalOffset + (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        );
        
        cell.userData = { speed: 0.001 + Math.random() * 0.002 };
        cellsGroup.add(cell);
      }
      
      return cellsGroup;
    };

    // Build scene
    const bloodCells = createBloodCells();
    scene.add(bloodCells);

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

    // Create main rotation group for circular motion
    const rotationGroup = new THREE.Group();
    scene.add(rotationGroup);

    // Add all visible objects to rotation group
    scene.children.forEach(child => {
      if (child.type !== 'Group' || child !== rotationGroup) {
        // rotationGroup.add(child.clone());
      }
    });

    // Animation
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime() * animationSpeed;

      // SLOW CIRCULAR ROTATION - Everything rotates together
      rotationGroup.rotation.y += 0.003 * animationSpeed;
      rotationGroup.rotation.x += 0.001 * animationSpeed;

      // Animate individual elements
      scene.traverse((object) => {
        if (object.userData) {
          // Blood particles flow
          if (object.userData.flowSpeed) {
            const positions = object.geometry?.attributes?.position?.array;
            if (positions) {
              for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] -= object.userData.flowSpeed;
                if (positions[i + 1] < 2) positions[i + 1] = 12;
              }
              object.geometry.attributes.position.needsUpdate = true;
            }
          }

          // Stent coil rotation
          if (object.userData.rotationSpeed) {
            object.rotation.z += object.userData.rotationSpeed;
          }

          // Floating blood cells
          if (object.userData.speed) {
            object.position.x += object.userData.speed;
            object.rotation.x += object.userData.speed * 0.5;
            object.rotation.y += object.userData.speed * 0.3;
            
            if (object.position.x > 15) object.position.x = -15;
          }
        }

        // Pulsing glow for arteries/veins
        if (object.material && object.material.emissive) {
          if (object.material.color.getHex() === 0xff0000) {
            object.material.emissiveIntensity = (0.8 + Math.sin(time * 4) * 0.2) * bloodIntensity;
          } else if (object.material.color.getHex() === 0x1e88e5) {
            object.material.emissiveIntensity = (0.6 + Math.cos(time * 3.5) * 0.2) * bloodIntensity;
          }
        }
      });

      // Animate point light
      bloodLight.intensity = 2.0 * bloodIntensity * (0.7 + Math.sin(time * 2) * 0.3);

      // Fixed camera looking at the elevated position
      camera.lookAt(0, 8, 0);

      // Render
      composer.render();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      composer.setSize(newWidth, newHeight);
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
  }, [showTorso, showLeftKidney, showRightKidney, bloodIntensity, animationSpeed]);

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
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF5EE] via-white to-[#F9F0E8]" />
      
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-red-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-light">
              Loading Medical Visualization...
            </p>
          </div>
        </div>
      )}

      {/* 🎨 Configurable Dark Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${"s"})`,
          // backgroundImage: `linear-gradient(to bottom, 
          //   rgba(0, 0, 0, ${overlayDarkness * 0.8}), 
          //   rgba(0, 0, 0, ${overlayDarkness * 0.4}), 
          //   rgba(0, 0, 0, ${overlayDarkness * 0.8})
          // )`
        }}
      />

      {/* 🧩 Children / Content Layer */}
      <div className="relative h-full min-h-screen">
        {children}
      </div>

      {/* ✨ Accent Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/3 to-pink-500/3 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default MedicalHeroBackground;