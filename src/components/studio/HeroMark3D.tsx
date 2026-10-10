import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import { B_HOLES, B_OUTER, type PathCmd } from "@/components/studio/brand";

type Props = {
  heroRef: RefObject<HTMLElement>;
  /** Starts the entrance spin. */
  ready: boolean;
};

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Photo-studio cube: black room, a few softboxes. Faces stay black, edges catch light. */
function studioEnvironment() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020202);
  const plane = new THREE.PlaneGeometry(1, 1);
  const materials: THREE.Material[] = [];
  const softbox = (intensity: number, position: [number, number, number], size: [number, number]) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide,
    });
    materials.push(material);
    const mesh = new THREE.Mesh(plane, material);
    mesh.position.set(...position);
    mesh.scale.set(size[0], size[1], 1);
    mesh.lookAt(0, 0, 0);
    scene.add(mesh);
  };
  softbox(5, [-6, 5, 5], [7, 4]); // key, top left
  softbox(3.5, [7, 0.5, 2], [1.2, 9]); // tall strip, right
  softbox(2.4, [-7, 0, -3], [1, 8]); // rim, back left
  softbox(1.4, [2, 7, -6], [6, 2]); // top back
  softbox(0.3, [0, -7, 3], [12, 3]); // faint floor bounce
  softbox(0.7, [0, 3, 9], [10, 4]); // behind the camera: soft sheen on the front faces
  softbox(0.22, [0, -2, 9], [10, 4]);
  return {
    scene,
    dispose: () => {
      plane.dispose();
      materials.forEach((m) => m.dispose());
    },
  };
}

function trace<T extends THREE.Path>(cmds: PathCmd[], path: T): T {
  for (const c of cmds) {
    if (c[0] === "M") path.moveTo(c[1], c[2]);
    else if (c[0] === "L") path.lineTo(c[1], c[2]);
    else if (c[0] === "C") path.bezierCurveTo(c[1], c[2], c[3], c[4], c[5], c[6]);
  }
  return path;
}

/**
 * Glossy black, extruded "B" of the BoostAI mark. Sways on its own, leans
 * toward the pointer and turns as the hero scrolls away. Renders only while
 * visible; a single still frame when reduced motion is requested.
 */
export default function HeroMark3D({ heroRef, ready }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyAt = useRef<number | null>(null);

  useEffect(() => {
    if (ready && readyAt.current === null) readyAt.current = performance.now();
  }, [ready]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      canvas.style.display = "none";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const studio = studioEnvironment();
    const envMap = pmrem.fromScene(studio.scene, 0.02).texture;
    scene.environment = envMap;

    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const shape = trace(B_OUTER, new THREE.Shape());
    B_HOLES.forEach((hole) => shape.holes.push(trace(hole, new THREE.Path())));
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.46,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.05,
      bevelSegments: 12,
      curveSegments: 72,
    });
    geometry.center();
    // Black lacquer: faces facing the camera stay dark, edges catch the room light
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.25,
      roughness: 0.26,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      envMapIntensity: 1.35,
    });
    const pivot = new THREE.Group();
    pivot.add(new THREE.Mesh(geometry, material));
    scene.add(pivot);

    const key = new THREE.DirectionalLight(0xffffff, 1);
    key.position.set(-4, 5, 6);
    const rim = new THREE.DirectionalLight(0xfff1ec, 1.5);
    rim.position.set(5, 2, -4);
    scene.add(key, rim);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const visH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const visW = visH * camera.aspect;
      pivot.scale.setScalar(Math.min((visH * 0.6) / 2.1, (visW * 0.56) / 1.8));
    };

    let mx = 0;
    let my = 0;
    let smx = 0;
    let smy = 0;
    const onPointer = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };

    let raf = 0;
    let running = false;
    let inView = true;
    let last = performance.now();
    let time = 0;

    const pose = (now: number) => {
      const hero = heroRef.current;
      const p = hero ? clamp(window.scrollY / Math.max(1, hero.offsetHeight)) : 0;
      const intro = reduced ? 1 : readyAt.current === null ? 0 : easeOut(clamp((now - readyAt.current) / 2400));
      const sway = reduced ? 0 : Math.sin(time * 0.45) * 0.5;
      pivot.rotation.y = -0.5 + sway + smx * 0.4 + p * 1.7 - (1 - intro) * 2.4;
      pivot.rotation.x = 0.06 + (reduced ? 0 : Math.sin(time * 0.3) * 0.06) + smy * 0.2 - p * 0.35;
      pivot.rotation.z = -0.05 + (reduced ? 0 : Math.sin(time * 0.25) * 0.03);
      pivot.position.y = p * 1.3 - (1 - intro) * 0.5;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;
      pose(now);
      renderer.render(scene, camera);
      if (running) raf = requestAnimationFrame(frame);
    };

    const renderStill = () => {
      pose(performance.now());
      renderer.render(scene, camera);
    };

    const update = () => {
      const should = compiled && inView && !document.hidden && !reduced;
      if (should && !running) {
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!should && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    let compiled = false;
    let disposed = false;
    resize();
    renderer
      .compileAsync(scene, camera)
      .catch(() => undefined)
      .then(() => {
        if (disposed) return;
        compiled = true;
        renderStill();
        update();
      });

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      if (compiled && !running) renderStill();
    });
    ro.observe(canvas);
    const onLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    document.addEventListener("visibilitychange", update);
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });
    update();

    return () => {
      disposed = true;
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      material.dispose();
      envMap.dispose();
      studio.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, [heroRef]);

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
