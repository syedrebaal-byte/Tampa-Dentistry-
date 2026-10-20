import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Layers, ShieldCheck, RotateCw, Info } from 'lucide-react';

interface InteractiveTooth3DProps {
  className?: string;
}

export const InteractiveTooth3D: React.FC<InteractiveTooth3DProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<'natural' | 'veneer' | 'implant'>('natural');
  const [selectedPart, setSelectedPart] = useState<string>('Crown Enamel');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const toothGroupRef = useRef<THREE.Group | null>(null);
  const veneerMeshRef = useRef<THREE.Mesh | null>(null);
  const implantMeshRef = useRef<THREE.Group | null>(null);
  const naturalMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);

    // 3. Renderer with antialias and alpha
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8ee, 1.6);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x90caf9, 1.2);
    rimLight.position.set(-3, -2, -2);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0xffe0b2, 0.7);
    fillLight.position.set(-2, 3, 2);
    scene.add(fillLight);

    // 5. Build High-Precision Anatomical Tooth Geometry
    const toothGroup = new THREE.Group();
    toothGroupRef.current = toothGroup;
    scene.add(toothGroup);

    // Lathe geometry curve for tooth crown and roots
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0.01, -1.3)); // Root tip
    points.push(new THREE.Vector2(0.18, -1.0));
    points.push(new THREE.Vector2(0.28, -0.6));
    points.push(new THREE.Vector2(0.38, -0.2));
    points.push(new THREE.Vector2(0.44, 0.1));  // Cervical neck
    points.push(new THREE.Vector2(0.58, 0.45)); // Crown widest
    points.push(new THREE.Vector2(0.56, 0.8));
    points.push(new THREE.Vector2(0.48, 1.05)); // Cusp slope
    points.push(new THREE.Vector2(0.22, 1.18)); // Occlusal table
    points.push(new THREE.Vector2(0.01, 1.12)); // Central groove

    const toothGeometry = new THREE.LatheGeometry(points, 48);
    // Subtle deformation for organic natural molar/premolar shape
    const pos = toothGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      // Flatten slightly in bucco-lingual dimension and sculpt 2 roots
      const angle = Math.atan2(z, x);
      const rModifier = 1 + 0.12 * Math.cos(2 * angle);
      if (y < -0.3) {
        // Dual root split illusion
        const rootTwist = Math.sin(y * 4) * 0.08;
        pos.setX(i, (x + rootTwist) * rModifier);
      } else {
        pos.setX(i, x * rModifier);
      }
      pos.setZ(i, z * 0.88);
    }
    toothGeometry.computeVertexNormals();

    // Natural Enamel Material (Physical with pearlescent sheen)
    const naturalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FAF8F2'),
      emissive: new THREE.Color('#1B201A'),
      emissiveIntensity: 0.04,
      roughness: 0.18,
      metalness: 0.04,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15,
      transmission: 0.28,
      ior: 1.54, // Enamel refractive index
      thickness: 0.6,
    });

    const naturalMesh = new THREE.Mesh(toothGeometry, naturalMaterial);
    naturalMeshRef.current = naturalMesh;
    toothGroup.add(naturalMesh);

    // Veneer Layer (Ultra-white handcrafted cosmetic porcelain facet)
    const veneerPoints: THREE.Vector2[] = [];
    veneerPoints.push(new THREE.Vector2(0.45, 0.05));
    veneerPoints.push(new THREE.Vector2(0.61, 0.45));
    veneerPoints.push(new THREE.Vector2(0.59, 0.82));
    veneerPoints.push(new THREE.Vector2(0.50, 1.07));
    const veneerGeometry = new THREE.LatheGeometry(veneerPoints, 48, 0, Math.PI);
    const veneerMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      roughness: 0.08,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transmission: 0.18,
      ior: 1.58, // High-grade Feldspathic porcelain
      transparent: true,
      opacity: 0.0,
    });
    const veneerMesh = new THREE.Mesh(veneerGeometry, veneerMaterial);
    veneerMesh.position.set(0, 0, 0.04);
    veneerMeshRef.current = veneerMesh;
    toothGroup.add(veneerMesh);

    // Implant Fixture Group (Titanium screw + gold abutment)
    const implantGroup = new THREE.Group();
    implantMeshRef.current = implantGroup;

    // Titanium screw body
    const screwGeo = new THREE.CylinderGeometry(0.32, 0.18, 1.3, 32);
    const tiMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#88929A'),
      metalness: 0.88,
      roughness: 0.35,
    });
    const screwMesh = new THREE.Mesh(screwGeo, tiMaterial);
    screwMesh.position.y = -0.75;
    implantGroup.add(screwMesh);

    // Thread rings on titanium fixture
    for (let i = 0; i < 6; i++) {
      const ringGeo = new THREE.TorusGeometry(0.33 - i * 0.02, 0.028, 12, 32);
      const ringMesh = new THREE.Mesh(ringGeo, tiMaterial);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -0.35 - i * 0.16;
      implantGroup.add(ringMesh);
    }

    // Abutment connector (gold / zirconia hue)
    const abutmentGeo = new THREE.CylinderGeometry(0.42, 0.32, 0.32, 32);
    const abutmentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#D8BA78'),
      metalness: 0.65,
      roughness: 0.25,
    });
    const abutmentMesh = new THREE.Mesh(abutmentGeo, abutmentMat);
    abutmentMesh.position.y = 0.05;
    implantGroup.add(abutmentMesh);

    implantGroup.visible = false;
    toothGroup.add(implantGroup);

    // Initial positioning
    toothGroup.position.set(0, -0.1, 0);

    // Drag / Touch Controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !toothGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      toothGroupRef.current.rotation.y += deltaX * 0.012;
      toothGroupRef.current.rotation.x += deltaY * 0.008;
      toothGroupRef.current.rotation.x = Math.max(-0.6, Math.min(0.6, toothGroupRef.current.rotation.x));
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('touchstart', handlePointerDown, { passive: true });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (toothGroupRef.current && isRotating && !isDragging) {
        toothGroupRef.current.rotation.y += delta * 0.35;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      toothGeometry.dispose();
      naturalMaterial.dispose();
      veneerGeometry.dispose();
      veneerMaterial.dispose();
    };
  }, [isRotating]);

  // Handle Layer Changes
  useEffect(() => {
    if (!naturalMeshRef.current || !veneerMeshRef.current || !implantMeshRef.current) return;

    if (activeLayer === 'natural') {
      naturalMeshRef.current.visible = true;
      (veneerMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 0.0;
      implantMeshRef.current.visible = false;
      setSelectedPart('Crown Enamel — Natural Translucency');
    } else if (activeLayer === 'veneer') {
      naturalMeshRef.current.visible = true;
      (veneerMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 0.95;
      implantMeshRef.current.visible = false;
      setSelectedPart('Custom Porcelain Veneer — High Glaze Aesthetic');
    } else if (activeLayer === 'implant') {
      naturalMeshRef.current.visible = true;
      (veneerMeshRef.current.material as THREE.MeshPhysicalMaterial).opacity = 0.0;
      implantMeshRef.current.visible = true;
      setSelectedPart('Medical-Grade Titanium Implant & Zirconia Crown');
    }
  }, [activeLayer]);

  const resetView = () => {
    if (toothGroupRef.current) {
      toothGroupRef.current.rotation.set(0, 0, 0);
    }
    setIsRotating(true);
  };

  return (
    <div className={`relative bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* 3D Canvas Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-[#FAF9F6]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="text-xs font-semibold tracking-wider text-slate-800 uppercase">Interactive 3D Clinical Model</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isRotating
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
            title="Toggle Auto Rotation"
            aria-label="Toggle auto rotation"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>
          <button
            onClick={resetView}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 3D Viewport */}
      <div className="relative w-full h-[360px] md:h-[400px] cursor-grab active:cursor-grabbing bg-radial from-[#F9F7F2] to-white" ref={mountRef}>
        {/* Subtle User Instruction Hint */}
        <div className="absolute top-3 left-4 pointer-events-none text-[11px] text-slate-400 font-medium">
          Drag to orbit 360° · Precision Anatomical Rendering
        </div>

        {/* Selected Part Floating Micro-Tag */}
        <div className="absolute bottom-3 left-4 right-4 md:right-auto pointer-events-none bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-800">
          <Info className="w-4 h-4 text-emerald-700 shrink-0" />
          <span className="font-medium truncate">{selectedPart}</span>
        </div>
      </div>

      {/* Layer Switcher Tabs */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="text-xs font-medium text-slate-500 mb-2">Simulate Treatment Technology:</div>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveLayer('natural')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'natural'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Natural Tooth</span>
          </button>

          <button
            onClick={() => setActiveLayer('veneer')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'veneer'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Porcelain Veneer</span>
          </button>

          <button
            onClick={() => setActiveLayer('implant')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'implant'
                ? 'bg-emerald-900 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Dental Implant</span>
          </button>
        </div>

        {/* Contextual Description */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          {activeLayer === 'natural' &&
            'Enamel is the most mineralized tissue in the body. Dr. Iglesias preserves natural healthy structure using biomimetic restorations and remineralization.'}
          {activeLayer === 'veneer' &&
            'Custom ultra-thin feldspathic porcelain hand-layered for natural light reflection, masking discoloration, micro-fractures, and alignment gaps.'}
          {activeLayer === 'implant' &&
            'Biocompatible titanium fixture permanently anchored into the jawbone, crowned with a custom zirconia tooth that functions identically to a natural tooth.'}
        </p>
      </div>
    </div>
  );
};
