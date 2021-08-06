import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DeviceOrientationControls.js';


let camera, scene, renderer, controls,scene2,scene3,scene4,sprite,sprite2,sprite3,TextureName,trigerBool;
var imageCount =1;
var counter = 1;
trigerBool = false
const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', function () {
  main();

  document.getElementById('overlay').style.display = 'none';
  trigerBool = true
  // counter++
  
} );

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

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
  scene2= new THREE.Scene();
  scene3= new THREE.Scene();
  scene4= new THREE.Scene();
  scene.add(scene2)
  scene.add(scene3)
  scene.add(scene4)
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
  var map = new THREE.TextureLoader().load( "arrow_black.png" );
  var material = new THREE.SpriteMaterial( { map: map,rotation: -0.2} );
  sprite = new THREE.Sprite( material );
  sprite.position.set(2,-2,7);
  sprite.scale.set(2,1,1.25)
  scene2.add(sprite);

  var map2 = new THREE.TextureLoader().load( "arrow_black.png" );
  var material3 = new THREE.SpriteMaterial( { map: map2,rotation: 0.1} );
  sprite2 = new THREE.Sprite( material3 );
  sprite2.position.set(-5,-2,6);
  sprite2.scale.set(2,1,1.25)
  scene3.add(sprite2);

  
  var map3 = new THREE.TextureLoader().load( "arrow_black.png" );
  var material4 = new THREE.SpriteMaterial( { map: map3,rotation: 1} );
  sprite3 = new THREE.Sprite( material4 );
  sprite3.position.set(3,-2,2);
  sprite3.scale.set(1.5,1,1.25)
  scene4.add(sprite3);
  var texture_scene1 = "YOUSPA 360_2_v2"
  textureLoad(texture_scene1);




  const geometry2 = new THREE.BoxGeometry( 24, 48, 1 );
  let video = document.getElementById( 'video' );
	video.play();
	video.addEventListener( 'play', function () {

					this.currentTime = 3;

	} );

  const texture5 = new THREE.VideoTexture(video)
  const test = new THREE.TextureLoader().load( "images/2021-01-22 13.jpg" );
  const material2 = new THREE.MeshBasicMaterial( {map: texture5,alphaMap:test, alphaTest: 0.5,transparent: false} );
  const cube = new THREE.Mesh( geometry2, material2 );
  cube.position.set(0, 1, -80);
  scene.add( cube )

  //***********************TEXT********************
  const textGeo = new THREE.PlaneGeometry( 1, 1, 1 );
  const textTexture = new THREE.TextureLoader().load( "images/text.png" );
  const textMat = new THREE.MeshBasicMaterial( {map: textTexture,transparent:true, opacity: 0} );
  const text = new THREE.Mesh( textGeo, textMat );
  text.position.set(0, 1.2, 0);
  scene.add(text);




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


    controls.update();
    var vector = camera.position.clone();
    // console.log(vector.x)
    var testBool = false
    new TWEEN.Tween( text.material ).to( { opacity: 1 }, 100 ).start();
    animate()
    if (Math.abs(vector.x)> 0 && Math.abs(vector.x) <0.01 && testBool == false){
    
      // console.log("tween started")
      testBool = true;
    }
    // } if(vector.x >0.013 || vector.x < -0.003){
    //   new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
    //   testBool = false;
    // }

    // var vector = camera.position.clone();
    // var testBool = false
    // if (vector.x > 0.0005 && vector.x <0.013 && testBool == false){
    //   new TWEEN.Tween( text.material ).to( { opacity: 1 }, 1000 ).start();
    //   animate()
    //   console.log("tween started")
    //   testBool = true;
    // } if(vector.x >0.013 || vector.x <0){
    //   new TWEEN.Tween( text.material ).to( { opacity: 0 }, 1000 ).start();
    //   testBool = false;
    // }



    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
  const raycaster = new THREE.Raycaster();
  document.addEventListener(
    "click",
    event => {
     
      mouse.x = event.clientX / window.innerWidth * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 +1 ;
   
      raycaster.setFromCamera( mouse, camera );

      var intersects = raycaster.intersectObjects( scene2.children, false );
      var intersects2 = raycaster.intersectObjects( scene3.children, false );
      var intersects3 = raycaster.intersectObjects( scene4.children, false );


      if ( intersects.length > 0  && trigerBool == true) {
        console.log("worked")
        
        counter++
 
       
        if(counter ==5){
          console.log("scene1")
          var texture_scene2 = "YOUSPA 360_1_v2"
          textureLoad(texture_scene2);
  
          scene.remove( scene2 );
          scene.remove( scene3 );
          scene.remove( scene4 );
          cube.position.set(-5, 30, -200);
          text.position.set(-.2, 0.9, -2);
          
    
        } 
    }
    else if ( intersects2.length > 0 && trigerBool == true) {
      counter++
    
      if(counter ==3 ){
        console.log("scene2")
        console.log(counter)
        var texture_scene3 = "scene2"
        textureLoad(texture_scene3);
    
        scene.remove( scene2 );
        scene.remove( scene3 );
        scene.remove( scene4 );
        
      } 
  }
  else if ( intersects3.length > 0 && trigerBool == true) {
    counter++
    

    console.log("thirt button")
    console.log(counter)
    if(counter ==3 ){
      console.log("scene3")
      console.log(counter)
      var texture_scene4 = "scene3"
      textureLoad(texture_scene4);
      scene.remove( scene2 );
      scene.remove( scene3 );
      scene.remove( scene4 );
      cube.position.set(-5, 30, -200);
      text.position.set(-.2, 0.9, -2);
    }
    } 
    },
    false );
}

function textureLoad(TextureName){
  
  const loader = new THREE.TextureLoader();
  const texture = loader.load(
    'images/'+TextureName+'.jpg',
    () => {
    
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);

      rt.fromEquirectangularTexture(renderer, texture);
  
      scene.background = rt.texture;
 

    });
   

};


function animate() {
requestAnimationFrame(animate)
// [...]
TWEEN.update()
// [...]
}