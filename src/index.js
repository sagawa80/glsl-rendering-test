import "@babel/polyfill"; //IE11
import * as THREE from "three";

import vertexShader from './vertexShader.vert';
import fragmentShader from './fragmentShader.frag';

const fov = 30;
const fovRad = (fov / 2) * (Math.PI / 180);

let dist;

let scene;
let camera;

let renderer;

let width = window.innerWidth;
let height = window.innerHeight;

const canvas = document.getElementById('webgl-canvas');

let geometry;
let material;
let mesh;

let uniforms;

window.addEventListener("load", () => glInit());
window.addEventListener("resize", () => handleResize());

function glInit() {

  scene = new THREE.Scene();

  dist = (height / 2) / Math.tan(fovRad);

  camera = new THREE.PerspectiveCamera(fov, width / height, 1, dist * 2 );
  camera.position.set(0, 0, dist);

  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1.0);

  uniforms = {
    ufr: { type: 'f', value: 0.0 },
    ufg: { type: 'f', value: 0.0 },
    ufb: { type: 'f', value: 1.0 },
    ufa: {type: 'f', value: 1.0},
  };

  geometry = new THREE.PlaneBufferGeometry(width, height, 10, 10);
  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    opacity: 1.0
  });
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  tick();
}

function handleResize() {
  width = window.innerWidth;
  height = window.innerHeight;
  dist   = (height / 2) / Math.tan(fovRad);
  camera.aspect = width / height;
  camera.position.set(0, 0, dist);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

function tick() {
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}