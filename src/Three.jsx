import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";

function MyThree() {
  const refContainer = useRef(null);
  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(5, 5, 5);
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(pointLight, ambientLight);

    const grid = new THREE.GridHelper(200, 50);
    scene.add(grid);

    const controls = new OrbitControls(camera, renderer.domElement);


    var addStars = function () {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

      star.position.set(x, y, z);
      scene.add(star);
    };
    Array(200).fill().forEach(addStars);

    var animate = function () {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.01;

      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }, []);
  return <div ref={refContainer}></div>;
}

export default MyThree;
