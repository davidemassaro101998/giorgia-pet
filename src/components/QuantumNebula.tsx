// Da 21st.dev — dhileepkumargm/quantum-nebula (id 9112): 50.000 particelle
// Three.js con curl noise e Unreal Bloom, nebulosa che respira e reagisce
// al cursore. Codice del componente lasciato fedele all'originale — solo
// l'hue base ricolorato da ciano (200) ad ambra/oro (38) per la palette
// Armonya, e boxSize/bloom leggermente ridotti per stare bene in una
// sezione di pagina invece che a schermo intero.

import { useEffect, useRef } from "react";
import type * as THREE from "three";

const config = {
  // Ritoccato dopo revisione: threshold 0.08 faceva brillare quasi ogni
  // particella → foschia piatta ("vetro sporco"). Threshold più alto fa
  // brillare solo i punti più luminosi = contrasto vero, non nebbia
  // uniforme. boxSize ridotto concentra le particelle in un nucleo
  // invece di riempire lo schermo in modo omogeneo.
  particles: { count: 32000, size: 0.024, boxSize: 3.4 },
  colors: { baseHue: 38, hueVariance: 22 },
  simulation: { noiseSpeed: 0.1, noiseScale: 1.2, mouseRepulsion: 0.005, friction: 0.95 },
  bloom: { strength: 0.85, radius: 0.32, threshold: 0.35 },
  camera: { initialDistance: 4.4, parallaxIntensity: 0.005 },
};

export function QuantumNebula({ className }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Three.js + postprocessing pesano ~280KB gzip — caricati come chunk
    // separato al mount invece che nel bundle iniziale, così la pagina
    // resta leggera finché questo componente non serve davvero.
    let cancelled = false;
    let cleanup = () => {};

    Promise.all([
      import("three"),
      import("three/examples/jsm/postprocessing/EffectComposer.js"),
      import("three/examples/jsm/postprocessing/RenderPass.js"),
      import("three/examples/jsm/postprocessing/UnrealBloomPass.js"),
    ]).then(([THREE, { EffectComposer }, { RenderPass }, { UnrealBloomPass }]) => {
      if (cancelled || !currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = config.camera.initialDistance;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(currentMount.clientWidth, currentMount.clientHeight),
      config.bloom.strength,
      config.bloom.radius,
      config.bloom.threshold,
    );
    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    const particleCount = config.particles.count;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3).fill(0);
    const baseColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * config.particles.boxSize;
      positions[i3 + 1] = (Math.random() - 0.5) * config.particles.boxSize;
      positions[i3 + 2] = (Math.random() - 0.5) * config.particles.boxSize;

      const hue = (config.colors.baseHue + (Math.random() - 0.5) * config.colors.hueVariance) / 360;
      baseColor.setHSL(hue, 0.85, 0.58);
      colors[i3] = baseColor.r;
      colors[i3 + 1] = baseColor.g;
      colors[i3 + 2] = baseColor.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: { u_pointSize: { value: config.particles.size * renderer.getPixelRatio() } },
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float u_pointSize;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = u_pointSize * (10.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float strength = distance(gl_PointCoord, vec2(0.5));
          strength = 1.0 - step(0.5, strength);
          if (strength < 0.01) discard;
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    const mouse = new THREE.Vector2(0, 0);
    let frameId: number;
    const clock = new THREE.Clock();

    // Con più istanze sulla stessa pagina (hero + sezione biorisonanza +
    // CTA finale), lasciarle tutte animare fuori viewport spreca CPU per
    // niente — pausa quando la sezione non è visibile.
    let inView = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        inView = entry?.isIntersecting ?? true;
      },
      { rootMargin: "200px" },
    );
    intersectionObserver.observe(currentMount);

    const curlNoiseFn = (p: THREE.Vector3, speed: number, scale: number) =>
      new THREE.Vector3(
        Math.sin(p.y * scale + speed),
        Math.cos(p.z * scale + speed),
        Math.sin(p.x * scale + speed),
      ).normalize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (!inView) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      const elapsedTime = clock.getElapsedTime();
      const pos = particleSystem.geometry.attributes.position.array as Float32Array;

      if (!reduceMotion) {
        for (let i = 0; i < particleCount; i++) {
          const i3 = i * 3;
          const p = new THREE.Vector3(pos[i3], pos[i3 + 1], pos[i3 + 2]);

          const curlForce = curlNoiseFn(p, elapsedTime * config.simulation.noiseSpeed, config.simulation.noiseScale);

          const mouseForce = new THREE.Vector3();
          const mouseTarget = new THREE.Vector3(
            mouse.x * (config.particles.boxSize / 2),
            mouse.y * (config.particles.boxSize / 2),
            0,
          );
          const distanceToMouse = p.distanceTo(mouseTarget);
          if (distanceToMouse < 2) {
            mouseForce.subVectors(p, mouseTarget).normalize().multiplyScalar(1 / (distanceToMouse + 0.1));
          }

          velocities[i3] += curlForce.x * 0.001 + mouseForce.x * config.simulation.mouseRepulsion;
          velocities[i3 + 1] += curlForce.y * 0.001 + mouseForce.y * config.simulation.mouseRepulsion;
          velocities[i3 + 2] += curlForce.z * 0.001 + mouseForce.z * config.simulation.mouseRepulsion;

          velocities[i3] *= config.simulation.friction;
          velocities[i3 + 1] *= config.simulation.friction;
          velocities[i3 + 2] *= config.simulation.friction;

          pos[i3] += velocities[i3];
          pos[i3 + 1] += velocities[i3 + 1];
          pos[i3 + 2] += velocities[i3 + 2];

          if (Math.abs(pos[i3]) > config.particles.boxSize / 2) pos[i3] *= -1;
          if (Math.abs(pos[i3 + 1]) > config.particles.boxSize / 2) pos[i3 + 1] *= -1;
          if (Math.abs(pos[i3 + 2]) > config.particles.boxSize / 2) pos[i3 + 2] *= -1;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;

        camera.position.x += (mouse.x * config.camera.parallaxIntensity - camera.position.x) * 0.02;
        camera.position.y += (-mouse.y * config.camera.parallaxIntensity - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
      }

      composer.render();
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = currentMount.clientWidth;
      const h = currentMount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = currentMount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("resize", handleResize);
    currentMount.addEventListener("mousemove", handleMouseMove);

      cleanup = () => {
        cancelAnimationFrame(frameId);
        intersectionObserver.disconnect();
        window.removeEventListener("resize", handleResize);
        currentMount.removeEventListener("mousemove", handleMouseMove);
        if (renderer.domElement.parentNode === currentMount) {
          currentMount.removeChild(renderer.domElement);
        }
        particleGeometry.dispose();
        particleMaterial.dispose();
        renderer.dispose();
      };
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
}
