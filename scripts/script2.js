import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DeviceOrientationControls.js';


let camera, scene, renderer, controls;
var imageCount =1;
var counter = 1;

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

  scene.add(sprite);


  textureLoad();

    
  const geometry2 = new THREE.BoxGeometry( 1, 1, 1 );
  let video = document.getElementById( 'video' );
	video.play();
	video.addEventListener( 'play', function () {

					this.currentTime = 3;

	} );

  const texture5 = new THREE.VideoTexture(video)
  const test = new THREE.TextureLoader().load( "../images/2021-01-22 13.jpg" );
  const material2 = new THREE.MeshBasicMaterial( {map: texture5,alphaMap:test, alphaTest: 0.5,transparent: false} );
  const cube = new THREE.Mesh( geometry2, material2 );
  cube.position.set(0, 0, 0);
  scene.add( cube )

 

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
        location.href='../indexs/index3.html'


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