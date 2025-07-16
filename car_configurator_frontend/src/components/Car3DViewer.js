import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import "./Car3DViewer.css";

/**
 * PUBLIC_INTERFACE
 * Props: 
 *  - color: string ("white", "blue", etc.)
 *  - accessories: array of string IDs
 *  - model: string (future extension)
 * This displays a minimal 3D car model using Three.js and updates color/accessories live.
 */
function Car3DViewer({ color, accessories, model }) {
  const mountRef = useRef();

  // Simple mapping from colorId to CSS hex
  const colorMap = {
    white: "#FFFFFF",
    blue: "#1e88e5",
    grey: "#cfd8dc",
    pink: "#ff4081",
    black: "#282c34",
  };

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#fff");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 11);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Car body (simple box as placeholder)
    const geometry = new THREE.BoxGeometry(4.2, 1.5, 2);
    const material = new THREE.MeshPhysicalMaterial({ color: colorMap[color] || "#fff", roughness: 0.4, metalness: 0.6, clearcoat: 1, });
    const car = new THREE.Mesh(geometry, material);
    car.castShadow = true;
    car.receiveShadow = true;
    car.position.y = 1.0;
    scene.add(car);

    // Wheels (simple cylinders)
    const wheelGeometry = new THREE.CylinderGeometry(0.45, 0.45, 0.5, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({ color: "#333" });
    const wheelOffsets = [
      [1.5, 0.25, 0.9],
      [-1.5, 0.25, 0.9],
      [1.5, 0.25, -0.9],
      [-1.5, 0.25, -0.9],
    ];
    wheelOffsets.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, y, z);
      scene.add(wheel);
    });

    // Accessory overlays—demo (e.g., spoiler, sunroof, etc.)
    if (accessories.includes("spoiler")) {
      const spoilerGeom = new THREE.BoxGeometry(2, 0.1, 0.5);
      const spoilerMat = new THREE.MeshStandardMaterial({ color: "#666" });
      const spoiler = new THREE.Mesh(spoilerGeom, spoilerMat);
      spoiler.position.set(0, 1.6, -1.1);
      scene.add(spoiler);
    }
    if (accessories.includes("sunroof")) {
      const sunroofGeom = new THREE.PlaneGeometry(1.2, 0.7);
      const sunroofMat = new THREE.MeshStandardMaterial({
        color: "#d1e2ee",
        transparent: true,
        opacity: 0.7,
      });
      const sunroof = new THREE.Mesh(sunroofGeom, sunroofMat);
      sunroof.position.set(0, 1.5, 0);
      sunroof.rotation.x = -Math.PI / 2;
      scene.add(sunroof);
    }
    if (accessories.includes("roof_box")) {
      const boxGeom = new THREE.BoxGeometry(1.2, 0.4, 0.7);
      const boxMat = new THREE.MeshStandardMaterial({ color: "#222" });
      const roofBox = new THREE.Mesh(boxGeom, boxMat);
      roofBox.position.set(0, 2.2, 0);
      scene.add(roofBox);
    }
    // Lighting
    const ambient = new THREE.AmbientLight("#fff", 0.7);
    scene.add(ambient);

    const dirLight = new THREE.DirectionalLight("#eaeaea", 0.7);
    dirLight.position.set(4, 10, 4);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Controls (very simple click-drag to rotate car)
    let dragging = false;
    let lastX = 0;
    function onPointerDown(e) {
      dragging = true;
      lastX = e.clientX;
    }
    function onPointerUp() {
      dragging = false;
    }
    function onPointerMove(e) {
      if (dragging) {
        const delta = (e.clientX - lastX) * 0.01;
        car.rotation.y += delta;
        lastX = e.clientX;
      }
    }
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerUp);
    renderer.domElement.addEventListener("pointermove", onPointerMove);

    // Render loop
    let running = true;
    function animate() {
      if (!running) return;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => {
      running = false;
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerUp);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      // No scene dispose for demo
    };
    // eslint-disable-next-line
  }, [color, accessories, model]);

  return (
    <section className="car-3d-viewer" aria-label="3D Car Model">
      <div ref={mountRef} className="car-3d-canvas" />
    </section>
  );
}

export default Car3DViewer;
