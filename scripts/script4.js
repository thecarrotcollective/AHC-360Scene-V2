import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DeviceOrientationControls.js';


let camera, scene, renderer, controls;
var imageCount =1;
var counter = 1;
// const startButton = document.getElementById( 'startButton' );
// startButton.addEventListener( 'click', function () {
//   main();

//   document.getElementById('overlay').style.display = 'none';
//   // document.getElementById('change').style.display = 'flex';
// } );

// const changeButton = document.getElementById( 'changeButton' );
// changeButton.addEventListener( 'click', function () {

  
  
//   if(counter < 8){
//     counter++;
//     imageCount = counter;
//   }else{
//    counter = 8

//   }if(counter==8){
//     document.getElementById('change').style.display = 'none';
//   }
//   imageCount = counter;

//   textureLoad();
// } );
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
var sprite;
function main() {

  const canvas = document.querySelector('#c');
  renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
  controls = new DeviceOrientationControls( camera );


  // disable for web
  // const controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 0, 0);
  // controls.update();

  scene = new THREE.Scene();

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
  var map = new THREE.TextureLoader().load( "../arrow_black.png" );
  var material = new THREE.SpriteMaterial( { map: map, rotation: 0} );
  sprite = new THREE.Sprite( material );
  sprite.position.set(1,-1.8,0.5);
  sprite.scale.set(2,1,1.25)
  // sprite.lookAt(scene.position);
  scene.add(sprite);



  textureLoad();
 

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    //disable for web
    controls.update();


    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  const raycaster = new THREE.Raycaster();
  document.addEventListener(
    "click",
    event => {
   
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
   
      raycaster.setFromCamera( mouse, camera );

      var intersects = raycaster.intersectObjects( scene.children, true );
     
      if ( intersects.length > 0 ) {
        location.href='../indexs/index5.html'
        // console.log( 'clicked' );
        // if(counter < 8){
        //   counter++;
        //   imageCount = counter;
        // }
        // if(counter==8){
        
        //   counter =1;
        // }
        // imageCount = counter;
  
        // textureLoad();

    }
    },
    false );
}

function textureLoad(){
  
    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      '../images/YOUSPA 360_1_v3.jpg',
      () => {
        console.log("a" + imageCount);
        const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
        rt.fromEquirectangularTexture(renderer, texture);
        scene.background = rt.texture;
      });
  
};
main();