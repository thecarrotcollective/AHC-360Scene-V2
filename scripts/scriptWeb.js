import * as THREE from './three.module.js';
import {OrbitControls} from './Orbit.js';


// TODO - check if some of these can be lists / arrays + use as state machine?
let camera, controls,videoMat;
let renderer,video,skydome,BottleRoomVideoPlayScene
let videoMeshBottleScene,vector,selfieScene,VideoRoomScene, BottleRoomScene, videoRoomArrow, BottleRoomArrow,MainRoomScene,MainRoomArrow,PoolRoomArrow,PoolRoomScene,CoachRoomScene,CoachRoomArrow;
let scene,text,cubeColor,materials,skyBox,opacityValue,transparentBool,ProductRoomScene,ProductRoomArrow;
let textScene,RoomVideoPlay,RoomVideoPlayScene,filterScene,clickableVideoMesh,SceneObjectVideo1,videoPlane,runVideo,selfieRoomArrow;
let arrowUrl ="UIAssets/arrow_white.png";
let alphaMask,videoMatBottleScene,videoDivBottleScene,alphaMaskBottleScene,VideoPlayBottleScene;
const mouse = new THREE.Vector2();
var clickableVideo;

var arrowDist = 25
var arrowHeight = -12
var videoDist = 10
var videoHeight = 1
/* The below code triggers the experience. We will likely remove / refactor it later */
const startButton = document.getElementById( 'start-btn' );
startButton.addEventListener( 'click', function () {
	init();
	animate();

	renderer.autoclear = false;
	TweenForVideos(videoMat)


    RoomVideoPlayScene.add(RoomVideoPlay);
	RoomVideoPlay.position.set(101.4,-11.5,-180)
    RoomVideoPlay.rotation.set(0,-1.58,-0.01)
    RoomVideoPlay.scale.set(3.1,3,2.1)


    video.play()
	clickableVideo = false
	document.getElementById('overlay').style.display = 'none';
	setTimeout(function(){
		MainRoomScene.add(MainRoomArrow);
		// clickableVideo = true
	}, 1000);
} );


// var textureManager = new THREE.LoadingManager();
// textureManager.onProgress = function ( item, loaded, total ) {
//     // this gets called after any item has been loaded
// };

// textureManager.onLoad = function () {
//     // all textures are loaded
//     // ...
//     console.log("loaded" )
// };

// var textureLoader = new THREE.ImageLoader( textureManager );
// var myTextureArray = [];
// var myTexture = new THREE.Texture();
// myTextureArray.push( myTexture );

// textureLoader.load( "scenes/4kEXTROVERT01.png", function ( image ) {
//     myTexture.image = image;
//     console.log( myTexture.image )
// } );

const navArrowScale = new THREE.Vector3(4,2,4)
const navVideoScale = new THREE.Vector3(9,16,1)
function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function init() {

	const container = document.getElementById( 'container' );

	renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	renderer.autoclear = false

	/* Custom variables */

	scene = new THREE.Scene();
	CoachRoomScene = new THREE.Scene()
	selfieScene = new THREE.Scene()
	PoolRoomScene = new THREE.Scene()
	MainRoomScene = new THREE.Scene()
	ProductRoomScene = new THREE.Scene()
	VideoRoomScene = new THREE.Scene()
	BottleRoomScene = new THREE.Scene()
	SceneObjectVideo1 = new THREE.Scene()
	RoomVideoPlayScene = new THREE.Scene();
	textScene = new THREE.Scene();
	filterScene = new THREE.Scene();
	BottleRoomVideoPlayScene = new THREE.Scene();

	scene.add(MainRoomScene)
	scene.add(CoachRoomScene)
	scene.add(VideoRoomScene)
	scene.add(BottleRoomScene)
	scene.add(selfieScene)
	scene.add(PoolRoomScene)
	scene.add(RoomVideoPlayScene)
	scene.add(textScene)
	scene.add(ProductRoomScene)
	scene.add(filterScene)
	scene.add(SceneObjectVideo1)
	scene.add(BottleRoomVideoPlayScene)

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 );

	skydome = {
		scene: new THREE.Scene(),
		camera : new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 3000 ),
	};
	camera.rotation.z = 0
	skydome.camera.position.z =0.01;
	controls = new OrbitControls( skydome.camera, renderer.domElement );

	// controls.target.set(0, 0, 0);
	controls.rotateSpeed = - 0.25;
	controls.enableZoom = false;
	controls.enablePan = false;
	controls.enableDamping = true;
	controls.rotateSpeed = - 0.25;
	controls.update();
	//***********************CUBE MAP********************
	envLoad("scenes/4kEXTROVERT00.png")

	//***********************LIGHT********************
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	//***********************ARROWS********************
	var arrowTexture = new THREE.TextureLoader().load( arrowUrl );
	var arrowMat = new THREE.SpriteMaterial( { map: arrowTexture ,rotation:0,transparent: true,opacity:1} );
	CoachRoomArrow = new THREE.Sprite( arrowMat );
	// CoachRoomArrow.position.set(-18,-8,25);
	CoachRoomArrow.scale.copy(navArrowScale)

	PoolRoomArrow = new THREE.Sprite( arrowMat );
	// PoolRoomArrow.position.set(9,-4,4);
	PoolRoomArrow.scale.copy(navArrowScale)

	MainRoomArrow = new THREE.Sprite( arrowMat );
	// MainRoomArrow.position.set(0,-12,-22);
	MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist * Math.cos(toRadians(-20)));

	MainRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture4 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat4 = new THREE.SpriteMaterial( { map: spriteTexture4,rotation: -0.1 } );
	ProductRoomArrow = new THREE.Sprite( arrowMat );
	// ProductRoomArrow.position.set(-5,-7,-10);
	ProductRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture5 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat5 = new THREE.SpriteMaterial( { map: spriteTexture5,rotation: -0.1 } );
	selfieRoomArrow = new THREE.Sprite( arrowMat );
	// selfieRoomArrow.position.set(12,-7,-18);
	selfieRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture6 = new THREE.TextureLoader().load(arrowUrl );
	// var spriteMat6 = new THREE.SpriteMaterial( { map: spriteTexture6,rotation: 0.1 } );
	videoRoomArrow = new THREE.Sprite( arrowMat );
	// videoRoomArrow.position.set(-5,-7,-20);
	videoRoomArrow.scale.copy(navArrowScale)

	// var spriteTexture7 = new THREE.TextureLoader().load( arrowUrl );
	// var spriteMat7 = new THREE.SpriteMaterial( { map: spriteTexture7,rotation: -0.1 } );
	BottleRoomArrow = new THREE.Sprite( arrowMat );
	BottleRoomArrow.scale.copy(navArrowScale)



	//***********************VIDEO1********************
	videoPlane = new THREE.PlaneGeometry( 16, 9 );
	video = document.createElement('video');
	video.src = "video/10_sec_MP4_loop.mp4"; // Set video address
	video.muted = true;
	video.loop = true;
	alphaMask = new THREE.TextureLoader().load( "UIAssets/alphaMasks/scene0AlphaMask.png");
	const videoTexture = new THREE.VideoTexture(video)
	videoMat = new THREE.MeshBasicMaterial( {map: videoTexture, transparent: true,opacity:0,side: THREE.DoubleSide} );
	videoMat.alphaMap = alphaMask
	RoomVideoPlay = new THREE.Mesh( videoPlane, videoMat );

    // ***********************VIDEO2********************
	videoMeshBottleScene = new THREE.PlaneGeometry( 9, 16 );
	videoDivBottleScene = document.createElement('video');
	videoDivBottleScene.src = "video/Ahc-Spa- Home-Sensorial-Treatment-Introverts- -Thinke3-1.mp4"; // Set video address
	videoDivBottleScene.muted = true
	videoDivBottleScene.loop = true;
    // alphaMaskBottleScene = new THREE.TextureLoader().load( "UIAssets/alphaMasks/scene0AlphaMask.png");
    const videoTextureBottleScene = new THREE.VideoTexture(videoDivBottleScene)
    videoMatBottleScene = new THREE.MeshBasicMaterial( {map: videoTextureBottleScene, transparent: true,opacity:1,side: THREE.DoubleSide} );
    // videoMatBottleScene.alphaMap = alphaMaskBottleScene
    VideoPlayBottleScene = new THREE.Mesh( videoMeshBottleScene, videoMatBottleScene );
	VideoPlayBottleScene.scale.copy(navVideoScale)


	// RoomVideoPlay.scale.normalize().multiplyScalar(0.1);
	// RoomVideoPlayScene.add(RoomVideoPlay)
	const colorMesh = new THREE.PlaneGeometry( 36, 24, 1 );

	const materialColor = new THREE.MeshBasicMaterial( {color: 0x000000,transparent:true, opacity: 0} );
	cubeColor = new THREE.Mesh( colorMesh, materialColor );
	cubeColor.position.set(49.9, 1, -10);
	cubeColor.rotation.set(0,-1.5,0)
	// filterScene.add( cubeColor );
	const testTesture = new THREE.TextureLoader().load( "UIAssets/textureTest.jpg" );
	const clickableVideoGeo = new THREE.BoxGeometry( 3, 2, 2 );
	const alphAmapTex = new THREE.TextureLoader().load( "UIAssets/mask.jpg" );
	const clickableVideoMat = new THREE.MeshBasicMaterial( {map:testTesture,transparent:true, opacity: 1} );
    //, alphaMap:alphAmapTex
	clickableVideoMesh = new THREE.Mesh( clickableVideoGeo, clickableVideoMat );
	clickableVideoMesh.position.set(-2, -1.5, -20);

	//***********************TEXT********************
	const textGeo = new THREE.PlaneGeometry( 36, 36, 36 );
	const textTexture = new THREE.TextureLoader().load( "UIAssets/startExperience.png" );
	const textMat = new THREE.MeshBasicMaterial( {map: textTexture, transparent:true, opacity: 0} );
	text = new THREE.Mesh( textGeo, textMat );
	text.position.set(49.8, 1, -10);
	text.rotation.set(0,-1.5,0)
	textScene.add(text);
	window.addEventListener( 'resize', onWindowResize );
	clickTrigger()
	renderer.autoclear = false;
}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
	const textures = [];
	for ( let i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}
	new THREE.ImageLoader()
	.load( atlasImgUrl, ( image ) => {

		let canvas, context;
		const tileWidth = image.height;

		for ( let i = 0; i < textures.length; i ++ ) {
			canvas = document.createElement( 'canvas' );
			context = canvas.getContext( '2d' );
			canvas.height = tileWidth;
			canvas.width = tileWidth;
			context.drawImage( image, tileWidth * i, 0, tileWidth, tileWidth, 0, 0, tileWidth, tileWidth );
			textures[ i ].image = canvas;
			textures[ i ].needsUpdate = true;
		}
	} );
	return textures;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	//***********************TWEEN********************
	var testBool = false
	// if (  testBool == false){
	//     new TWEEN.Tween( text.material ).to( { opacity: 1 }, 100 ).start();
	//     new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 100 ).start();
	//     testBool = true;
	// } if( Math.abs(vector.x) > 0.0000010130538922770067 && Math.abs(vector.x) <0.000006352257762340783){
	//     new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();

	//     new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
	//     testBool = false;
	//   }
	//   if(vector.x > 0 && vector.x < 0.000009522163112851169 && (vector.z > -0.00000999932445997495 && vector.z<0) && vector.z<9 && poolSceneVideo == true){

	//       video.play()

	//   }else if ((vector.x > 0.000009522163112851169|| vector.x <   0)  && poolSceneVideo == true){
	//     video.pause()
	//   }


	requestAnimationFrame( animate );
	renderer.autoClear = true;
	controls.update();
	camera.quaternion.copy( skydome.camera.quaternion );

	renderer.render(skydome.scene, skydome.camera);

	renderer.autoClear = false;

	renderer.render(scene, camera );
	runTween()
}

function clickTrigger(){
	const raycaster = new THREE.Raycaster();
	document.addEventListener("click", event => {
		mouse.x = event.clientX / window.innerWidth * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 +1 ;
		raycaster.setFromCamera( mouse, camera );

		var intersectsPoolRoom = raycaster.intersectObjects( PoolRoomScene.children, false );
		var intersectsMainRoom = raycaster.intersectObjects( MainRoomScene.children, false );
		var intersectsCoachRoom = raycaster.intersectObjects( CoachRoomScene.children, false );
		var intersectsProductRoom = raycaster.intersectObjects( ProductRoomScene.children, false );
		var intersectsRoomVideoPlay = raycaster.intersectObjects( RoomVideoPlayScene.children, false );
		var intersectsObjectVideo = raycaster.intersectObjects( SceneObjectVideo1.children, false );
		var intersectsSelfie = raycaster.intersectObjects( selfieScene.children, false );
		var intersectsVideoRoom = raycaster.intersectObjects( VideoRoomScene.children, false );
		var intersectsBottleRoom = raycaster.intersectObjects( BottleRoomScene.children, false );


		//***********************POOL SCENE**************************
		if ( intersectsPoolRoom.length > 0 ) {
			console.log("POOOL SCENE - 1")
			setTimeout(function(){
				DisableEverything()
                const alphaMaskPool = new THREE.TextureLoader().load( "UIAssets/alphaMasks/poolSceneAlpha.png" );
                videoMat.alphaMap = alphaMaskPool
				MainRoomScene.add(MainRoomArrow);
				selfieScene.add(selfieRoomArrow);
				RoomVideoPlayScene.add(RoomVideoPlay);
				MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-150)) , arrowHeight, -arrowDist * Math.cos(toRadians(-150)));
				selfieRoomArrow.position.set(arrowDist * Math.sin(toRadians(-60)) , arrowHeight, -arrowDist * Math.cos(toRadians(-60)));
				MainRoomArrow.scale.copy(navArrowScale)
				selfieRoomArrow.scale.copy(navArrowScale)

				RoomVideoPlay.position.set(100,-20.5,65)
				RoomVideoPlay.rotation.set(0,4.7,0)
				RoomVideoPlay.scale.set(7.2,6.9,1)
				video.play()
				runVideo =true

				clickableVideo = true
			}, 500);
			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT06.png")

			

			}, 200);

	
			TweenForVideos(videoMat)
		
		}
		//***********************SELFIE SCENE**************************
		if ( intersectsSelfie.length > 0 ) {
			console.log("SELFIE SCENE - 1")
			setTimeout(function(){
				DisableEverything()
                const alphaMaskSelfie = new THREE.TextureLoader().load( "UIAssets/alphaMasks/SelfieSceneAlphaMask.png" );
                videoMat.alphaMap = alphaMaskSelfie;
				MainRoomScene.add(MainRoomArrow)
				PoolRoomScene.add(PoolRoomArrow);
				MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-180)) , arrowHeight, -arrowDist * Math.cos(toRadians(-180)));
				PoolRoomArrow.position.set(arrowDist * Math.sin(toRadians(60)) , arrowHeight, -arrowDist * Math.cos(toRadians(60)));
				PoolRoomArrow.scale.copy(navArrowScale)
				MainRoomArrow.scale.copy(navArrowScale)


				RoomVideoPlayScene.add(RoomVideoPlay);
				RoomVideoPlay.position.set(200,-21,2)
				RoomVideoPlay.rotation.set(0,4.7,0)
				RoomVideoPlay.scale.set(4.3,4.1,1)
                video.play();
				
			}, 500);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT07.png")
			
			}, 200);

	

			TweenForVideos(videoMat)
			clickableVideo = false

		}
		//***********************COACH SCENE********************Arrow******
		if ( intersectsCoachRoom.length > 0 ) {
			console.log("COACH SCENE - 1")
			setTimeout(function(){
				ProductRoomScene.add(ProductRoomArrow);
				MainRoomScene.add(MainRoomArrow);
				BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
				videoDivBottleScene.play();
				
				VideoPlayBottleScene.position.set(-342,25,-450);
			
				VideoPlayBottleScene.rotation.set(0,4.7,0)
				VideoPlayBottleScene.scale.set(7.2,7.5,1)
				// BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
				MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-45)) , arrowHeight, -arrowDist * Math.cos(toRadians(-45)));
				ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(-15)) , arrowHeight, -arrowDist * Math.cos(toRadians(-15)));
				MainRoomArrow.scale.copy(navArrowScale)
				ProductRoomArrow.scale.copy(navArrowScale)
			}, 300);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT02.png")
		
				// skyBox.rotation.y =0
			}, 200);


			DisableEverything()

			clickableVideo = false
			runVideo =false
		}

		//***********************PRODUCT ROOOM SCENE********************Arrow4******
		if(intersectsProductRoom.length > 0  ) {
			console.log("ROOM ENTREANCE SCENE - 1")
			setTimeout(function(){
				VideoRoomScene.add(videoRoomArrow)
				BottleRoomScene.add(BottleRoomArrow)
				CoachRoomScene.add(CoachRoomArrow)
				MainRoomScene.add(MainRoomArrow);
				BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
				videoDivBottleScene.play();
				
				VideoPlayBottleScene.position.set(-245,20,-450);
			
				VideoPlayBottleScene.rotation.set(0,4.7,0)
				VideoPlayBottleScene.scale.set(9,10,1)
				videoRoomArrow.position.set(arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-20)));
				BottleRoomArrow.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(30)));
				CoachRoomArrow.position.set(arrowDist * Math.sin(toRadians(100)) , arrowHeight, -arrowDist * Math.cos(toRadians(100)));
				MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist * Math.cos(toRadians(-90)));
				CoachRoomArrow.scale.copy(navArrowScale)
				MainRoomArrow.scale.copy(navArrowScale)
				videoRoomArrow.scale.copy(navArrowScale)
				BottleRoomArrow.scale.copy(navArrowScale)
				clickableVideo = false
				runVideo =false
			}, 300);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT03.png")
				// skyBox.rotation.y =0
			}, 200);



			DisableEverything()
			// new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();

			clickableVideo = false
		}

		//***********************Video ROOM SCENE**************************
		if(intersectsVideoRoom.length > 0  ) {
			console.log("VIDEO ROOM SCENE - 1")
			setTimeout(function(){
				ProductRoomScene.add(ProductRoomArrow)
				ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(180)) , arrowHeight, -arrowDist *0.5* Math.cos(toRadians(180)));
				ProductRoomArrow.scale.copy(navArrowScale)

				
				
				BottleRoomScene.add(BottleRoomArrow)
				BottleRoomArrow.position.set(arrowDist * Math.sin(toRadians(60)) , arrowHeight, -arrowDist * Math.cos(toRadians(60)));
				BottleRoomArrow.scale.copy(navArrowScale)
			}, 300);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT04.png")
			}, 200);



			DisableEverything()
		}

		//***********************BOTTLE ROOOM SCENE**************************
		if(intersectsBottleRoom.length > 0  ) {
			console.log("BOTTLE ROOM SCENE - 1")
			setTimeout(function(){
				ProductRoomScene.add(ProductRoomArrow)
				ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(210)) , arrowHeight, -arrowDist *0.9* Math.cos(toRadians(210)));
				ProductRoomArrow.scale.copy(navArrowScale)

				
				VideoRoomScene.add(videoRoomArrow)
				videoRoomArrow.position.set(arrowDist * Math.sin(toRadians(-100)) , arrowHeight, -arrowDist * Math.cos(toRadians(-100)));
				videoRoomArrow.scale.copy(navArrowScale)
				// RoomVideoPlayScene.add(RoomVideoPlay);
			}, 300);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT05.png")
				// skyBox.rotation.y =0
			}, 200);



			DisableEverything()
		}

		
	

		//***********************BACK TO MAIN SCENE********************Arrow3******
		if(intersectsMainRoom.length > 0  ) {
			console.log("MAIN SCENE - 1")
			setTimeout(function(){
			DisableEverything()

	      	const alphaMaskMainRoom = new THREE.TextureLoader().load( "UIAssets/alphaMasks/scene1AlphaMask.png" );
	      	videoMat.alphaMap = alphaMaskMainRoom
			CoachRoomScene.add(CoachRoomArrow)
			PoolRoomScene.add(PoolRoomArrow);
			RoomVideoPlayScene.add(RoomVideoPlay);
        	RoomVideoPlay.position.set(88,-8.5,-120)
        	RoomVideoPlay.rotation.set(0,-1.5,-0.01)
        	RoomVideoPlay.scale.set(2.4,2.5,2.1)
				// RoomVideoPlay.rotation.set(0,90,0)
			CoachRoomArrow.position.set(arrowDist * Math.sin(toRadians(90)) , arrowHeight, -arrowDist * Math.cos(toRadians(90)));
			CoachRoomArrow.scale.copy(navArrowScale)
			PoolRoomArrow.position.set(arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist * Math.cos(toRadians(-20)));
			PoolRoomArrow.scale.copy(navArrowScale)
        	video.play()

				runVideo =true
			
		
			}, 500);

			setTimeout(function(){
				envLoad("scenes/4kEXTROVERT01.png")
			
				// skyBox.rotation.y = -1.7
			}, 200);
			TweenForVideos(videoMat)

		
		}

		if(intersectsObjectVideo.length > 0  && clickableVideo == true) {
			console.log("video clicked")
			setTimeout(function(){
				console.log("working")

				// document.getElementById('video2').style.display = 'block';
				// document.getElementById('video_id').style.display = 'block';
				// var player = videojs('#video2');
				// var video = document.getElementById('video2');
				// video.requestFullscreen();
				// player.play();
			}, 1200);
			window.open('https://www.thecarrotcollective.com/')
			// clickableVideoMesh.userData = { URL: "http://stackoverflow.com"};
			// window.open(intersectsObjectVideo[0].clickableVideoMesh.userData.URL);
			// document.getElementById('blackScreen').style.display = 'block';
		}

		//***********************PLAY VIDEO ON PRODUCT SCENE**************************
		else if ( intersectsRoomVideoPlay.length > 0 && clickableVideo == true) {
			setTimeout(function(){
				document.getElementById('video2').style.display = 'block';
				document.getElementById('video_id').style.display = 'block';
				var player = videojs('#video2');
				var video = document.getElementById('video2');
				video.requestFullscreen();
				player.play();
				player.on('fullscreenchange', function () {
					if (this.isFullscreen()){
						console.log('fullscreen');
					} else {
						document.getElementById('video2').style.display = 'none';
						document.getElementById('blackScreen').style.display = 'none';
						document.getElementById('video_id').style.display = 'none';
						player.pause()
					}
				})
			}, 1500);
			document.getElementById('blackScreen').style.display = 'block';
			// controls.enableRotate = false
			// clickableVideo = false
		}
	});
}

function envLoad(textureUrl){
	const textures = getTexturesFromAtlasFile( textureUrl, 6 );
	materials = [];
	transparentBool = true
	opacityValue = 0
	for ( let i = 0; i < 6; i ++ ) {
		materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] ,opacity: 0, transparent: true, depthWrite:false, depthTest :false} ) );
	}

	skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );

	

	skyBox.geometry.scale( 1, 1, -1 );
	for ( let i = 0; i < 6; i ++ ) {
		new TWEEN.Tween(materials[i]).to( { opacity: 1 }, 500 ).start();
		runTween()
	}

	setTimeout(function(){
		for ( let i = 0; i < 6; i ++ ) {
			materials[i].transparent = false
		}
	}, 1000);

	skydome.scene.add( skyBox );

}

function runTween(){
	requestAnimationFrame(runTween)
	TWEEN.update()
}

function DisableEverything(){
	clickableVideo = false
	video.pause();

	let ArrowArray = [MainRoomArrow,PoolRoomArrow,selfieRoomArrow,CoachRoomArrow,videoRoomArrow,ProductRoomArrow,BottleRoomArrow,RoomVideoPlay,VideoPlayBottleScene]
	let ArrowScene = [MainRoomScene,PoolRoomScene,selfieScene,CoachRoomScene,VideoRoomScene,ProductRoomScene,BottleRoomScene,RoomVideoPlayScene,BottleRoomVideoPlayScene]
	for (var i = 0; i < ArrowArray.length; i++) {
		ArrowScene[i].remove(ArrowArray[i]);
	}
}

function TweenForVideos(VideoOpacityMat){

	setTimeout(function(){
		new TWEEN.Tween( VideoOpacityMat ).to( { opacity: 0 }, 250 ).start();
	}, 250);
	setTimeout(function(){
		new TWEEN.Tween( VideoOpacityMat ).to( { opacity: 1 }, 500 ).start();
	}, 500);


}