import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { PMREMGenerator } from 'three';


import GUI from 'lil-gui';

const gui = new GUI();

gsap.registerPlugin(ScrollTrigger);

const cameraPositions = [
  { x: -1, y: 0, z: 3.9 },   // سكشن 1
  { x: -1, y: 0, z: 4.43 },   // سكشن 2
  { x: 0, y:0, z: 5 },  // سكشن 3
  { x: 0, y: 0, z: 4 },   // سكشن 4
];

const modelRotations = [
  { x: -0.53, y: -0.3, z: -0.15 },          // سكشن 1
  { x: -1.23, y: 0.92, z: -.53}, // سكشن 2
  { x: -.23, y: 0, z: 0 }, // سكشن 3
  { x: -1.3, y: 0, z: 0 }, // سكشن 4
];

const modelPositions = [
  { x: 0.2, y: -0.55, z: 0 },          // سكشن 1
  { x: -2.45, y: -.48, z: 0 }, // سكشن 2
  { x: 0, y: 0, z: 0 }, // سكشن 3
  { x: 0, y: -1, z: 1.47 }, // سكشن 4
];

const lightPositions = [
  { x: -1.47, y: 0, z: 1.72 , angle :0.5 }, // سكشن 1
  { x: -.73, y: 0, z: 1.23 , angle :3.77 }, // سكشن 2
  { x: 1.23, y: 0.74, z: .99, angle :5}, // سكشن 3
  { x: -.25, y: 1.48, z: 2.22, angle :5}, // سكشن 4
  
]

const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(-1, 0, 3.9);

// const cameraPos = gui.addFolder('camera')

// cameraPos.add(camera.position, 'x').min(-10).max(10).step(0.01)
// cameraPos.add(camera.position, 'y').min(-10).max(10).step(0.01)
// cameraPos.add(camera.position, 'z').min(-10).max(10).step(0.01)

const canvas = document.querySelector("canvas#canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const spotlight = new THREE.SpotLight(0Xffffff,88 , 10 , 0.5, 1)
spotlight.position.set(-1.47,0,1.72)
spotlight.castShadow = true
scene.add(spotlight);

// const spot = gui.addFolder('spotlight')

// spot.add(spotlight.position, 'x').min(-10).max(10).step(0.01)
// spot.add(spotlight.position, 'y').min(-10).max(10).step(0.01)
// spot.add(spotlight.position, 'z').min(-10).max(10).step(0.01)
// spot.add(spotlight, 'distance').min(0).max(10).step(0.01)
// spot.add(spotlight, 'angle').min(0).max(10).step(0.001)
// spot.add(spotlight, 'penumbra').min(0).max(10).step(0.01)
// spot.add(spotlight, 'decay').min(0).max(10).step(0.01)

const group = new THREE.Group();
scene.add(group);

const loader = new GLTFLoader()
let mixer;
let actions = [];
let model

loader.load('watch2.gltf', (gltf) => {
  model = gltf.scene
  model.position.set(0, 0, 0);
  // model.position.set(0.2, -0.55, 0);
  // model.rotation.set(-0.35, 0.45, 0);
  // model.rotation.set(-0.53, -0.3, -.15);
  model.rotation.set(0, 0, 0);
  model.scale.set(13.5,13.5,13.5)
  group.add(model)

   // 🎬 إعداد الأنيميشن
   mixer = new THREE.AnimationMixer(model);

   gltf.animations.forEach((clip) => {
     const action = mixer.clipAction(clip);
     action.clampWhenFinished = true;
     action.loop = THREE.LoopOnce;
     action.stop(); // نوقفه افتراضيًا
     actions.push(action);
   });
 


  initScrollAnimations();

   // 🔥 GUI للتحكم في الروتيشن

  //  const rotFolder = gui.addFolder("Model Rotation");
 
  //  rotFolder.add(model.rotation, "x", -Math.PI, Math.PI, 0.001);
  //  rotFolder.add(model.rotation, "y", -Math.PI, Math.PI, 0.001);
  //  rotFolder.add(model.rotation, "z", -Math.PI, Math.PI, 0.001);

  //  const posFolder = gui.addFolder("Model Position");
 
  //  posFolder.add(model.position, "x", -10, 10, 0.001);
  //  posFolder.add(model.position, "y", -10, 10, 0.001);
  //  posFolder.add(model.position, "z", -10, 10, 0.001);
})

let model2
let mixer2;

loader.load("watch3.gltf", function (gltf) {
  model2 = gltf.scene;
  model2.scale.set(13.5,13.5,13.5)
  model2.position.set(0,0,-0.009999)
  model2.rotation.set(0,0,0)
  group.add(model2)

  // 🎬 إعداد الأنيميشن
   mixer2 = new THREE.AnimationMixer(model2);

  gltf.animations.forEach((clip) => {
    const action = mixer2.clipAction(clip);
    actions.push(action);
  });


   const rotFolder = gui.addFolder("Model Rotation");
 
   rotFolder.add(model2.rotation, "x", -Math.PI, Math.PI, 0.001);
   rotFolder.add(model2.rotation, "y", -Math.PI, Math.PI, 0.001);
   rotFolder.add(model2.rotation, "z", -Math.PI, Math.PI, 0.001);

   const posFolder = gui.addFolder("Model Position");
 
   posFolder.add(model2.position, "x", -10, 10, 0.01);
   posFolder.add(model2.position, "y", -10, 10, 0.01);
   posFolder.add(model2.position, "z", -10, 10, 0.01);

  initScrollAnimations();
})

function initScrollAnimations() {
  document.querySelectorAll(".panel").forEach((panel, index) => {
    ScrollTrigger.create({
      trigger: panel,
      start: "top center",
      onEnter: () => moveToSection(index),
      onEnterBack: () => moveToSection(index),
    });
  });
}

function moveToSection(i) {

  // تشغيل الأنميشن فقط في السكشن الثاني
  if (i === 1) {
    // تشغيل جميع الأنيميشن للأمام
    actions.forEach(action => {
      action.reset();
      action.setEffectiveTimeScale(1); // تشغيل طبيعي
      action.play();
    });
  } else {
    // عكس الأنيميشن عند مغادرة السكشن
    actions.forEach(action => {
      action.paused = false;
      action.setEffectiveTimeScale(-1); // عكس الحركة
      action.play();
    });
  }
  // تحريك الكاميرا
  gsap.to(camera.position, {
    x: cameraPositions[i].x,
    y: cameraPositions[i].y,
    z: cameraPositions[i].z,
    duration: 2,
    ease: "power2.inOut",
    
  });

  // تدوير الموديل
  gsap.to(group.rotation, {
    x: modelRotations[i].x,
    y: modelRotations[i].y,
    z: modelRotations[i].z,
    duration: 1,
    ease: "power2.inOut"
  });

  // تحريك الموديل
  gsap.to(group.position, {
    x: modelPositions[i].x,
    y: modelPositions[i].y,
    z: modelPositions[i].z,
    duration:1,
    ease: "power2.inOut"
  });


  //تحريك الاضائة
  gsap.to(spotlight.position, {
    x: lightPositions[i].x,
    y: lightPositions[i].y,
    z: lightPositions[i].z,
    duration: 1,
    ease: "power2.inOut"
  });

  gsap.to(spotlight, {
    angle: lightPositions[i].angle,
    duration: 1,
    ease: "power2.inOut"
  });
}

const clock = new THREE.Clock();


const groupRoutaion =  gui.addFolder("Group Rotation");
groupRoutaion.add(group.rotation, "x", -Math.PI, Math.PI, 0.001);
groupRoutaion.add(group.rotation, "y", -Math.PI, Math.PI, 0.001);
groupRoutaion.add(group.rotation, "z", -Math.PI, Math.PI, 0.001);

const groupPosition = gui.addFolder("Group Position");
groupPosition.add(group.position, "x", -10, 10, 0.001);
groupPosition.add(group.position, "y", -10, 10, 0.001);
groupPosition.add(group.position, "z", -10, 10, 0.001);

//HDR loader
// const hdRloader = new RGBELoader();
// hdRloader.load("hdr/studio.hdr", function (texture) {
//   const envMap = texture;
//   envMap.mapping = THREE.EquirectangularReflectionMapping;
//   scene.environment = envMap;
//   scene.background=null
// });

function animate() {
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);

  if (mixer2) mixer2.update(delta);

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

animate();



// Animation for all .reveal elements
gsap.utils.toArray(".reveal").forEach((el) => {
  gsap.from(el, {
    y: 40,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse",
    }
  });
});
