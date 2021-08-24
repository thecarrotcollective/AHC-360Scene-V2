import * as THREE from './three.module.js';
import {OrbitControls} from './Orbit.js';

// TODO - check if some of these can be lists / arrays + use as state machine?
let camera, controls,videoMat,ProductIcon1,ProductIcon2,ProductIcon3,ProductIconScene1,ProductIconScene2,ProductIconScene3,video3,videoMask,videoMask2,videoTexture;
let renderer,video,skydome,BottleRoomVideoPlayScene,SelfiePlane,SelfiePlaneScene,video2,OrbVideoScene;
let videoMeshBottleScene,selfieScene,VideoRoomScene, BottleRoomScene, videoRoomArrow, BottleRoomArrow,MainRoomScene,MainRoomArrow,PoolRoomArrow,PoolRoomScene,CoachRoomScene,CoachRoomArrow;
let scene,materials,skyBox,ProductRoomScene,ProductRoomArrow,MiddleRoomScene,MiddleRoomArrow;
let RoomVideoPlay,RoomVideoPlayScene,filterScene,SceneObjectVideo1,videoPlane,selfieRoomArrow;
let orbVideoPlane, orbVideo, orbVideoMask,orbVideoTex, orbVideoMaskTex, orbVideoMat, orbVideoMesh;
let videoMatBottleScene,VideoPlayBottleScene,firtVideoChecker,secondVideoChecker,selfieSceneClick;
let bilboardVideo, bilboardVideoTex,orbProductPlane, orbProductTex,orbProductAlpha,orbProductMat,orbProduct;
let PoolEntranceArrow, ProcuctBaseArrow ,PoolEntranceScene, ProcuctBaseScene
const mouse = new THREE.Vector2();
var clickableVideo,manager,videoManager,arrowMat,productbool,orbProductScene;
var loaderCheck = false;
var arrowDist = 25
var arrowHeight = -12
let arrowUrl ="UIAssets/arrow_white.png";
let ProductIconUrl ="UIAssets/plus.png";
var bool = false
var currState = -1 // use this for statemachine

// Please reorder this to match the assets
var INTRO = 0
var MAIN = 1
var POOL = 2
var SELFIE = 3
var COUCH = 4
var PRODUCTS = 5
var BEAUTY = 6
var PRODENTRANCE = 7
var MIDDLE = 8
var POOLENTRACE =9
var PRODUCTBASE = 10

window.addEventListener('load', (event) => {
	init();
	animate();
	currState = INTRO
	renderer.autoclear = false;
	// TweenFadeInForVideos(videoMat)
	checkTheVideoLoad()

  });

/* The below code triggers the experience. We will likely remove / refactor it later */


const shareLinkBtn = document.getElementById('share-btn');
shareLinkBtn.addEventListener('click', copyLink)


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
	OrbVideoScene = new THREE.Scene();
	filterScene = new THREE.Scene();
	BottleRoomVideoPlayScene = new THREE.Scene();

	ProductIconScene1 = new THREE.Scene();
	ProductIconScene2 = new THREE.Scene();
	ProductIconScene3 = new THREE.Scene();
	SelfiePlaneScene =  new THREE.Scene();
	MiddleRoomScene =  new THREE.Scene();
	PoolEntranceScene =  new THREE.Scene();
	ProcuctBaseScene =  new THREE.Scene();
	orbProductScene = new THREE.Scene()
	scene.add(orbProductScene)
	scene.add(PoolEntranceScene)
	scene.add(ProcuctBaseScene)
	scene.add(OrbVideoScene)
	scene.add(SelfiePlaneScene)
	scene.add(MiddleRoomScene)
	scene.add(ProductIconScene1)
	scene.add(ProductIconScene2)
	scene.add(ProductIconScene3)
	scene.add(MainRoomScene)
	scene.add(CoachRoomScene)
	scene.add(VideoRoomScene)
	scene.add(BottleRoomScene)
	scene.add(selfieScene)
	scene.add(PoolRoomScene)
	scene.add(RoomVideoPlayScene)

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




	manager = new THREE.LoadingManager();
	manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

	};

	manager.onLoad = function ( ) {

		console.log( 'Loading complete!');

		if(currState === INTRO){
			video.currentTime = 0;
			video2.currentTime = 0;
			video3.currentTime = 0;
			console.log("intro scene runned")
			video.play()
			video2.play()
			RoomVideoPlayScene.add(RoomVideoPlay);
			RoomVideoPlay.position.set(101.4,-11.5,-180)
			RoomVideoPlay.rotation.set(0,-1.58,-0.01)
			RoomVideoPlay.scale.set(3.1,3,2.1)


			MainRoomScene.add(MainRoomArrow);
			MiddleRoomScene.add(MiddleRoomArrow)
			MiddleRoomArrow.position.set(arrowDist * Math.sin(toRadians(60)) , arrowHeight, -arrowDist * Math.cos(toRadians(60)));
			MiddleRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForVideos(videoMat)
			TweenFadeInForArrow()




		}
		if(currState === POOL){
			video.currentTime = 0;
			video2.currentTime = 0;
			console.log("pool scene runned")
			document.getElementById('pool-text').style.display = 'block';
			document.getElementById('pool-btn').style.display = 'block';
			document.getElementById('pool-btn').style.pointerEvents = "auto";

			// const alphaMaskPool = new THREE.TextureLoader().load( "UIAssets/alphaMasks/poolSceneAlpha.png" );
			// videoMat.alphaMap = alphaMaskPool
			PoolEntranceScene.add(PoolEntranceArrow);
			selfieScene.add(selfieRoomArrow);
			RoomVideoPlayScene.add(RoomVideoPlay);
			PoolEntranceArrow.position.set(arrowDist * Math.sin(toRadians(-150)) , arrowHeight, -arrowDist * Math.cos(toRadians(-150)));
			selfieRoomArrow.position.set(arrowDist * Math.sin(toRadians(-85)) , arrowHeight, -arrowDist * Math.cos(toRadians(-85)));
			PoolEntranceArrow.scale.copy(navArrowScale)
			selfieRoomArrow.scale.copy(navArrowScale)

			RoomVideoPlay.position.set(100,-20.5,65)
			RoomVideoPlay.rotation.set(0,4.7,0)
			RoomVideoPlay.scale.set(7.2,6.9,1)
			TweenFadeInForVideos(videoMat)
			video.play()
			video2.play()
			TweenFadeInForArrow()

			clickableVideo = true
		}

		if(currState === SELFIE){
			video.currentTime = 0;
			video2.currentTime = 0;
			console.log("selfie scene runned")
			document.getElementById('selfie-text').style.display = 'block';
			document.getElementById('selfie-btn').style.display = 'block';
			document.getElementById('selfie-btn').style.pointerEvents = "auto";
			PoolEntranceScene.add(PoolEntranceArrow)
			PoolRoomScene.add(PoolRoomArrow);
			SelfiePlaneScene.add(SelfiePlane)
			SelfiePlane.position.set(-1,0,1)
			SelfiePlane.rotation.set(0,-1,0)
			SelfiePlane.scale.set(2,1.5,1)

			PoolEntranceArrow.position.set(arrowDist * Math.sin(toRadians(-180)) , arrowHeight, -arrowDist * Math.cos(toRadians(-180)));
			PoolRoomArrow.position.set(arrowDist * Math.sin(toRadians(60)) , arrowHeight, -arrowDist * Math.cos(toRadians(60)));
			PoolRoomArrow.scale.copy(navArrowScale)
			PoolEntranceArrow.scale.copy(navArrowScale)

			RoomVideoPlayScene.add(RoomVideoPlay);
			RoomVideoPlay.position.set(200,-21,2)
			RoomVideoPlay.rotation.set(0,4.7,0)
			RoomVideoPlay.scale.set(4.3,4.1,1)
			video.play()
			video2.play()
			TweenFadeInForVideos(videoMat)
			TweenFadeInForArrow()
			selfieSceneClick = true
		}
		if(currState === COUCH){
			bilboardVideo.currentTime = 0;
			console.log("couch scene runned")
			ProductRoomScene.add(ProductRoomArrow);
			MiddleRoomScene.add(MiddleRoomArrow);


			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
			VideoPlayBottleScene.position.set(-342,25,-450);


			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(7.2,7.5,1)
			bilboardVideo.play();

			MiddleRoomArrow.position.set(arrowDist * Math.sin(toRadians(-45)) , arrowHeight, -arrowDist * Math.cos(toRadians(-45)));
			ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(-15)) , arrowHeight, -arrowDist * Math.cos(toRadians(-15)));
			MiddleRoomArrow.scale.copy(navArrowScale)
			ProductRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
		}
		if(currState === PRODENTRANCE){
			bilboardVideo.currentTime = 0;
			console.log("product scene runned")
			VideoRoomScene.add(videoRoomArrow)
			BottleRoomScene.add(BottleRoomArrow)
			CoachRoomScene.add(CoachRoomArrow)
			MiddleRoomScene.add(MiddleRoomArrow);

			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
			VideoPlayBottleScene.position.set(-240,16,-450);
			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(9.2,9.6,1)
			bilboardVideo.play();
			videoRoomArrow.position.set(arrowDist * Math.sin(toRadians(-20)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(-20)));
			BottleRoomArrow.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist *1.5* Math.cos(toRadians(30)));
			CoachRoomArrow.position.set(arrowDist * Math.sin(toRadians(100)) , arrowHeight, -arrowDist * Math.cos(toRadians(100)));
			MiddleRoomArrow.position.set(arrowDist * Math.sin(toRadians(-90)) , arrowHeight, -arrowDist * Math.cos(toRadians(-90)));
			CoachRoomArrow.scale.copy(navArrowScale)
			MiddleRoomArrow.scale.copy(navArrowScale)
			videoRoomArrow.scale.copy(navArrowScale)
			BottleRoomArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()

		}
		if(currState === BEAUTY){
			bilboardVideo.currentTime = 0;
			console.log("beauty scene runned")
			document.getElementById('beauty-text').style.display = 'block';
			document.getElementById('beauty-btn').style.display = 'block';
			document.getElementById('beauty-btn').style.pointerEvents = "auto";
			ProductRoomScene.add(ProductRoomArrow)
			ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(180)) , arrowHeight, -arrowDist *0.5* Math.cos(toRadians(180)));
			ProductRoomArrow.scale.copy(navArrowScale)

			ProcuctBaseScene.add(ProcuctBaseArrow)
			ProcuctBaseArrow.position.set(arrowDist * Math.sin(toRadians(60)) , arrowHeight, -arrowDist * Math.cos(toRadians(60)));
			ProcuctBaseArrow.scale.copy(navArrowScale)
			bilboardVideo.play()
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)

			VideoPlayBottleScene.position.set(-22,-1.8,-20);

			VideoPlayBottleScene.rotation.set(0.01,1.4,0)
			VideoPlayBottleScene.scale.set(0.85,1,1)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
		}
		if(currState === PRODUCTS){
			bilboardVideo.currentTime = 0;
			console.log("product scene runned")
			ProductRoomScene.add(ProductRoomArrow)
			ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(210)) , arrowHeight, -arrowDist *0.9* Math.cos(toRadians(210)));
			ProductRoomArrow.scale.copy(navArrowScale)

			bilboardVideo.play()
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)

			VideoPlayBottleScene.position.set(-50,-0.85,-11.5);

			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(	1.14,1.19,1)

			ProductIconScene1.add(ProductIcon1)
			ProductIcon1.position.set(-3.8,0,-2)
			ProductIcon1.scale.set(0.4,0.4,0.4)
			ProductIcon1.rotation.set(0,-5,0)

			ProductIconScene2.add(ProductIcon2)
			ProductIcon2.position.set(-2.8,0.2,-2)
			ProductIcon2.scale.set(0.3,0.3,0.3)
			ProductIcon2.rotation.set(0,-5,0)

			ProductIconScene3.add(ProductIcon3)
			ProductIcon3.position.set(-1.7,0.2,-2)
			ProductIcon3.scale.set(0.28,0.28,0.28)
			ProductIcon3.rotation.set(0,-5,0)


			ProcuctBaseScene.add(ProcuctBaseArrow)
			ProcuctBaseArrow.position.set(arrowDist * Math.sin(toRadians(-100)) , arrowHeight, -arrowDist * Math.cos(toRadians(-100)));
			ProcuctBaseArrow.scale.copy(navArrowScale)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
			// RoomVideoPlayScene.add(RoomVideoPlay);
		}
		if(currState === PRODUCTBASE){
			bilboardVideo.currentTime = 0;
			BottleRoomVideoPlayScene.add(VideoPlayBottleScene)

			VideoPlayBottleScene.position.set(-50,-5.8,-23.8);

			VideoPlayBottleScene.rotation.set(0,1.5,0)
			VideoPlayBottleScene.scale.set(1.6,1.7,1)
			bilboardVideo.play()
			VideoRoomScene.add(videoRoomArrow)
			BottleRoomScene.add(BottleRoomArrow)
			BottleRoomArrow.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist*0.5 * Math.cos(toRadians(30)));
			videoRoomArrow.position.set(arrowDist * Math.sin(toRadians(-30)) , arrowHeight, -arrowDist *0.5* Math.cos(toRadians(-30)));
			BottleRoomArrow.scale.copy(navArrowScale)
			videoRoomArrow.scale.copy(navArrowScale)
			ProductRoomScene.add(ProductRoomArrow)
			ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(180)) , arrowHeight, -arrowDist *0.5* Math.cos(toRadians(180)));
			ProductRoomArrow.scale.copy(navArrowScale)
			ProductIconScene1.add(ProductIcon1)
			ProductIcon1.position.set(0,-0.25,-1)
			ProductIcon1.scale.set(0.1,0.1,0.1)
			ProductIcon1.rotation.set(0,0,0)

			ProductIconScene2.add(ProductIcon2)
			ProductIcon2.position.set(-0.3,-0.28,-1)
			ProductIcon2.scale.set(0.085,0.085,0.085)
			ProductIcon2.rotation.set(0,0,0)

			ProductIconScene3.add(ProductIcon3)
			ProductIcon3.position.set(0.225,-0.28,-1)
			ProductIcon3.scale.set(0.09,0.09,0.09)
			ProductIcon3.rotation.set(0,0,0)
			TweenFadeInForArrow()
			TweenFadeInForBilboardVideos()
		}
		if(currState === POOLENTRACE){
			video.currentTime = 0;
			video3.currentTime = 0;


			selfieScene.add(selfieRoomArrow)
			PoolRoomScene.add(PoolRoomArrow)
			MainRoomScene.add(MainRoomArrow)
			RoomVideoPlayScene.add(RoomVideoPlay);

			MiddleRoomScene.add(MiddleRoomArrow)
			selfieRoomArrow.scale.copy(navArrowScale)
			PoolRoomArrow.scale.copy(navArrowScale)
			MainRoomArrow.scale.copy(navArrowScale)
			MiddleRoomArrow.scale.copy(navArrowScale)
			selfieRoomArrow.position.set(arrowDist * Math.sin(toRadians(-75)) , arrowHeight, -arrowDist * Math.cos(toRadians(-75)));
			PoolRoomArrow.position.set(arrowDist * Math.sin(toRadians(10)) , arrowHeight, -arrowDist * Math.cos(toRadians(10)));
			MiddleRoomArrow.position.set(arrowDist * Math.sin(toRadians(135)) , arrowHeight, -arrowDist * Math.cos(toRadians(135)));
			MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(190)) , arrowHeight, -arrowDist * Math.cos(toRadians(190)));


			RoomVideoPlay.position.set(120,-8.5,-100)
			RoomVideoPlay.rotation.set(0,-1.5,-0.01)
			RoomVideoPlay.scale.set(3,3,2.1)
			video.play()
			video2.play()

			TweenFadeInForArrow()
			TweenFadeInForVideos(videoMat)
		}
		if(currState === MAIN){
			video.currentTime = 0;
			video3.currentTime = 0;
			orbVideo.currentTime = 0;
			orbVideoMask.currentTime = 0;
			console.log("MAIN scene runned")
			OrbVideoScene.add(orbVideoMesh)
			orbProductScene.add(orbProduct)
			  MiddleRoomScene.add(MiddleRoomArrow)
			  PoolEntranceScene.add(PoolEntranceArrow);
			  RoomVideoPlayScene.add(RoomVideoPlay);
			  orbProduct.position.set(-8.2,1.75,1)
			  orbProduct.rotation.set(0,2,0)

			  orbVideoMesh.position.set(-8,1.75,1.01)
			  orbVideoMesh.rotation.set(0,2,0)
			  RoomVideoPlay.position.set(88,-8.5,-120)
			  RoomVideoPlay.rotation.set(0,-1.5,-0.01)
			  RoomVideoPlay.scale.set(2.4,2.5,2.1)
				  // RoomVideoPlay.rotation.set(0,90,0)
			  MiddleRoomArrow.position.set(arrowDist * Math.sin(toRadians(90)) , arrowHeight, -arrowDist * Math.cos(toRadians(90)));
			  MiddleRoomArrow.scale.copy(navArrowScale)
			  PoolEntranceArrow.position.set(arrowDist * Math.sin(toRadians(0)) , arrowHeight, -arrowDist * Math.cos(toRadians(0)));
			  PoolEntranceArrow.scale.copy(navArrowScale)
			//   orbVideoMask.play()
			//   orbVideo.play()

			  video.play()
			  video3.play()

			  videoMat.alphaMap = videoMask2

			  TweenFadeInForVideos(videoMat)
			  TweenFadeInForArrow()
		}
		else{
			video.currentTime = 0;
			video2.currentTime = 0;
			videoMat.alphaMap = videoMask
		}
		if(currState === MIDDLE){
			console.log("middle scene runned")
		  MainRoomScene.add(MainRoomArrow)
		  PoolEntranceScene.add(PoolEntranceArrow);
		  CoachRoomScene.add(CoachRoomArrow)
		  ProductRoomScene.add(ProductRoomArrow);

		  CoachRoomArrow.position.set(arrowDist * Math.sin(toRadians(110)) , arrowHeight, -arrowDist * Math.cos(toRadians(110)));
		  CoachRoomArrow.scale.copy(navArrowScale)
		  ProductRoomArrow.position.set(arrowDist * Math.sin(toRadians(30)) , arrowHeight, -arrowDist * Math.cos(toRadians(30)));
		  ProductRoomArrow.scale.copy(navArrowScale)
		  MainRoomArrow.position.set(arrowDist * Math.sin(toRadians(-75)) , arrowHeight, -arrowDist * Math.cos(toRadians(-75)));
		  MainRoomArrow.scale.copy(navArrowScale)
		  PoolEntranceArrow.position.set(arrowDist * Math.sin(toRadians(-25)) , arrowHeight, -arrowDist * Math.cos(toRadians(-25)));
		  PoolEntranceArrow.scale.copy(navArrowScale)

		  TweenFadeInForArrow()
	}
	};







	//***********************CUBE MAP********************
	envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_000.jpg")

	//***********************LIGHT********************
	const color = 0xFFFFFF;
	const intensity = 1;
	const light = new THREE.DirectionalLight(color, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	//***********************ARROWS********************
	var arrowTexture = new THREE.TextureLoader().load( arrowUrl );
	arrowMat = new THREE.SpriteMaterial( { map: arrowTexture ,rotation:0,transparent: true,opacity:1} );
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

	MiddleRoomArrow = new THREE.Sprite( arrowMat );
	MiddleRoomArrow.scale.copy(navArrowScale)

	PoolEntranceArrow = new THREE.Sprite( arrowMat );
	PoolEntranceArrow.scale.copy(navArrowScale)

	ProcuctBaseArrow = new THREE.Sprite( arrowMat );
	ProcuctBaseArrow.scale.copy(navArrowScale)


	const ProductMesh = new THREE.PlaneGeometry( 1, 1, 1 );
	var ProductTexture = new THREE.TextureLoader().load( ProductIconUrl );
	var ProductMat = new THREE.MeshBasicMaterial( {map: ProductTexture, transparent: true,opacity:1,side: THREE.DoubleSide} );

	ProductIcon1 = new THREE.Mesh( ProductMesh, ProductMat );
	ProductIcon2 = new THREE.Mesh( ProductMesh, ProductMat );
	ProductIcon3 = new THREE.Mesh( ProductMesh, ProductMat );
	// ProductIcon1.rotation.set(0,0,90)
	const selfiMesh = new THREE.PlaneGeometry( 1, 1 );
	const selfiMat = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true,opacity:0, side: THREE.DoubleSide} );
	SelfiePlane = new THREE.Mesh( selfiMesh, selfiMat );

	orbProductPlane = new THREE.PlaneGeometry( 4, 4 );
	orbProductTex =new THREE.TextureLoader().load("images/AHC.HEROPRODUCT.BASE.jpg");
	orbProductAlpha =new THREE.TextureLoader().load("images/AHC.HEROPRODUCT.ALPHA.jpg");

	orbProductMat = new THREE.MeshBasicMaterial( {map:orbProductTex , transparent: true,opacity:1,side: THREE.DoubleSide});
	orbProductMat.alphaMap = orbProductAlpha
	orbProduct = new THREE.Mesh( orbProductPlane, orbProductMat );
	//***********************ORB VIDEO********************
	orbVideoPlane = new THREE.PlaneGeometry( 9, 9 );
	orbVideo = document.createElement('video');
	orbVideo.src = "video/ORBREVEALBASE.mp4";
	orbVideo.muted = true;
	orbVideo.loop = false;

	orbVideoMask = document.createElement('video');
	orbVideoMask.src = "video/ORBREVEALALPHA.mp4";
	orbVideoMask.muted = true;
	orbVideoMask.loop = false
	orbVideoTex =  new THREE.VideoTexture(orbVideo)
	orbVideoMaskTex = new THREE.VideoTexture(orbVideoMask)
	orbVideoMat = new THREE.MeshBasicMaterial( {map: orbVideoTex, transparent: true,opacity:1,side: THREE.DoubleSide} );
	orbVideoMat.alphaMap = orbVideoMaskTex
	orbVideoMesh = new THREE.Mesh( orbVideoPlane, orbVideoMat );
	//***********************VIDEO1********************
	videoPlane = new THREE.PlaneGeometry( 16, 9 );
	video = document.createElement('video');
	video.src = "video/sceneVideo.mp4"; // Set video address

	video.muted = true;
	video.loop = true;

	video2 = document.createElement('video');
	video2.src = "video/sceneVideoAlpha.mp4";

	video2.muted = true;
	video2.loop = true;

	video3 = document.createElement('video');
	video3.src = "video/sceneVideoAlpha3.mp4";

	video3.muted = true;
	video3.loop = true;

	// alphaMask = new THREE.TextureLoader().load( "video/10_sec_MP4_Alpha.mp4");
	videoMask = new THREE.VideoTexture(video2)
	videoMask2 = new THREE.VideoTexture(video3)
	videoTexture = new THREE.VideoTexture(video)
	videoMat = new THREE.MeshBasicMaterial( {map: videoTexture, transparent: true,opacity:0,side: THREE.DoubleSide} );
	videoMat.alphaMap = videoMask

	RoomVideoPlay = new THREE.Mesh( videoPlane, videoMat );

    // ***********************VIDEO2********************
	videoMeshBottleScene = new THREE.PlaneGeometry( 9, 16 );
	bilboardVideo  = document.createElement('video');
	bilboardVideo.src = "video/K-Beauty Treatment Area Krystal Logo-1.mp4"; // Set video address

	bilboardVideo.muted = true;
	bilboardVideo.loop = true;
	bilboardVideoTex = new THREE.VideoTexture(bilboardVideo)


    videoMatBottleScene = new THREE.MeshBasicMaterial( {map: bilboardVideoTex,opacity:0,side: THREE.DoubleSide} );
    // videoMatBottleScene.alphaMap = alphaMaskBottleScene
    VideoPlayBottleScene = new THREE.Mesh( videoMeshBottleScene, videoMatBottleScene );
	// VideoPlayBottleScene.position.set(0,0,-10)
	// BottleRoomVideoPlayScene.add(VideoPlayBottleScene)
	// bilboardVideo.play()
	// VideoPlayBottleScene.scale.copy(navVideoScale)


	// const hoverTextGeo = new THREE.PlaneGeometry( 1, 1, 1 );
	// const hoverTextTexture = new THREE.TextureLoader().load( "images/text.png" );
	// const hoverTextMat = new THREE.MeshBasicMaterial( {map: hoverTextTexture,transparent:true, opacity: 1} );
	// const hoverText = new THREE.Mesh( hoverTextGeo, hoverTextMat );
	//
	// const selfieTextGeo = new THREE.PlaneGeometry( 1, 1, 1 );
	// const selfieTextTexture = new THREE.TextureLoader().load( "images/text.png" );
	// const selfieTextMat = new THREE.MeshBasicMaterial( {map: selfieTextTexture,transparent:true, opacity: 1} );
	// const selfieText = new THREE.Mesh( selfieTextGeo, selfieTextMat );


	window.addEventListener( 'resize', onWindowResize );

	clickTrigger();
	renderer.autoclear = false;
}

function getTexturesFromAtlasFile( atlasImgUrl, tilesNum ) {
	const textures = [];
	for ( let i = 0; i < tilesNum; i ++ ) {
		textures[ i ] = new THREE.Texture();
	}
	new THREE.ImageLoader(manager)
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
var endbool;

var orbVideoPlayed = false
function animate() {

	// console.log("video" + video.currentTime)
	// console.log("video2" + video2.currentTime)
	controls.addEventListener( 'change', function(){


		endbool =false
		if(currState == POOL){
			clickableVideo = false
		}
		if(currState == SELFIE){
			selfieSceneClick = false
		}
	});
	controls.addEventListener( 'start', function(){
		if(productbool == true){

			document.getElementById('product1').style.display = 'none';
			document.getElementById('product2').style.display = 'none';
			document.getElementById('product3').style.display = 'none';

		}
	})

	controls.addEventListener( 'end', function(){
		endbool = true
		if(currState == POOL && endbool == true){
			setTimeout(function(){
				clickableVideo = true
			}, 500);
		}
		if(currState == SELFIE && endbool == true){
			setTimeout(function(){
				selfieSceneClick = true
			}, 500);


		}
	});


	//***********************TWEEN********************

	var testBool = false



	var dirVector = new THREE.Vector3();

	if(currState === SELFIE){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(dirVector.z > 0.25 && dirVector.z < 0.75 && dirVector.y > -0.3 && dirVector.x < 0 ){ // need to stress test
			document.getElementById('selfie-text').style.opacity = 1;
			document.getElementById('selfie-btn').style.opacity = 1;
			document.getElementById('selfie-btn').style.pointerEvents = "auto";
		} else {
			document.getElementById('selfie-text').style.opacity = 0;
			document.getElementById('selfie-btn').style.opacity = 0;
			document.getElementById('selfie-btn').style.pointerEvents = "none";
		}
	}
	 else if(currState === POOL){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(dirVector.z > 0.25 && dirVector.z < 0.75 && dirVector.y > -0.3 && dirVector.x > 0.8 ){ // need to stress test
			document.getElementById('pool-text').style.opacity = 1;
			document.getElementById('pool-btn').style.opacity = 1;
			document.getElementById('pool-btn').style.pointerEvents = "auto";
		} else {
			document.getElementById('pool-text').style.opacity = 0;
			document.getElementById('pool-btn').style.opacity = 0;
			document.getElementById('pool-btn').style.pointerEvents = "none";
		}
	} else if(currState === BEAUTY){
		camera.getWorldDirection(dirVector)
		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(dirVector.z > -0.65 && dirVector.z < 0 && dirVector.y > -0.3 && dirVector.x < -0.75 ){ // need to stress test
			document.getElementById('beauty-text').style.opacity = 1;
			document.getElementById('beauty-btn').style.opacity = 1;
			document.getElementById('beauty-btn').style.pointerEvents = "auto";
		} else {
			document.getElementById('beauty-text').style.opacity = 0;
			document.getElementById('beauty-btn').style.opacity = 0;
			document.getElementById('beauty-btn').style.pointerEvents = "none";
		}
	}else if(currState === MAIN){
		camera.getWorldDirection(dirVector)

		// console.log(dirVector.x +', '+dirVector.y +', '+dirVector.z);

		if(dirVector.z > -0.8 && dirVector.z < 0.8 && dirVector.y > -0.3 && dirVector.x < 0 ){ // need to stress test
			if(orbVideoPlayed == false){
				orbVideo.play();
				orbVideoMask.play()
				orbVideoPlayed = true
			}
			// orbVideo.addEventListener("ended",function(){

			// },false);
			// }

		} else {
			// orbVideo.pause();
			// 	orbVideoMask.pause()

		}
	}



	requestAnimationFrame( animate );
	renderer.autoClear = true;
	controls.update();
	camera.quaternion.copy( skydome.camera.quaternion );

	renderer.render(skydome.scene, skydome.camera);

	renderer.autoClear = false;

	renderer.render(scene, camera );


	// Hover Text
	// var vector = camera.position.clone();
	// var testBool = false

	// if (vector.x > 0.0005 && vector.x <0.013 && testBool == false){
	// 	new TWEEN.Tween( text.material ).to( { opacity: 1 }, 1000 ).start();
	// 	runTween()
	// 	console.log("tween started")
	// 	testBool = true;
	// } if(vector.x >0.013 || vector.x <0){
	// 	new TWEEN.Tween( text.material ).to( { opacity: 0 }, 500 ).start();
	// 	testBool = false;
	// }

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
		var intersectsSelfie = raycaster.intersectObjects( selfieScene.children, false );
		var intersectsVideoRoom = raycaster.intersectObjects( VideoRoomScene.children, false );
		var intersectsBottleRoom = raycaster.intersectObjects( BottleRoomScene.children, false );
		var intersectsProductPlusIcon1 = raycaster.intersectObjects( ProductIconScene1.children, false );
		var intersectsProductPlusIcon2 = raycaster.intersectObjects( ProductIconScene2.children, false );
		var intersectsProductPlusIcon3 = raycaster.intersectObjects( ProductIconScene3.children, false );
		var intersectsMultipleVideo = raycaster.intersectObjects( BottleRoomVideoPlayScene.children, false );
		var intersectsSelfieClick = raycaster.intersectObjects( SelfiePlaneScene.children, false );
		var intersectsPoolEntrance = raycaster.intersectObjects( PoolEntranceScene.children, false );
		var intersectsProductBase = raycaster.intersectObjects( ProcuctBaseScene.children, false );
		var intersectsMiddleRoom = raycaster.intersectObjects( MiddleRoomScene.children, false );
		//***********************POOL SCENE**************************
		if ( intersectsPoolRoom.length > 0 ) {
				setTimeout(function(){
					envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_009.jpg")
					currState = POOL

				}, 200)

			DisableEverything()

			// POOL SCENE - HOVER TEXT
			// console.log("campos X= " +  camera.position.x + "Y= " + camera.position.y)

			// hoverText.position.set(90, -25, 65)
			// hoverText.rotation.set(0,-1.5,-0.01)
			// hoverText.scale.set(20,20,6)
			// scene.add(hoverText);


		}
		//***********************SELFIE SCENE**************************
		if ( intersectsSelfie.length > 0 ) {

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_010.jpg")
				currState = SELFIE;
			}, 200);
			console.log("SELFIE SCENE - 1")
			DisableEverything()



			// videoMesh.position.set(135, 15, -15);


			// SELFIE SCENE - HOVER TEXT
			// console.log("campos X= " +  camera.position.x + "Y= " + camera.position.y)

			// selfieText.position.set(90, 0, 65)
			// selfieText.rotation.set(0,-1.5,-0.01)
			// selfieText.scale.set(20,20,6)
			// scene.add(selfieText);



		}
		//***********************POOL ENTRANCE SCENE**************************
		if ( intersectsPoolEntrance.length > 0 ) {

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_002.jpg")
				currState = POOLENTRACE;
			}, 200);
			console.log("POOL ENTRANCE SCENE - 1")
			DisableEverything()



		}
		//***********************PRODUCT BASE SCENE**************************
		if ( intersectsProductBase.length > 0 ) {

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_008.jpg")
				currState = PRODUCTBASE;
			}, 200);
			console.log("PRODUCT BASE SCENE")
			DisableEverything()



		}
		//***********************MIDDLE SCENE**************************
		if ( intersectsMiddleRoom.length > 0 ) {

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_003.jpg")
				currState = MIDDLE;
			}, 200);
			console.log("MIDDLE SCENE - 1")
			DisableEverything()



		}
		//***********************COACH SCENE**************************
		if ( intersectsCoachRoom.length > 0 ) {
			console.log("COACH SCENE - 1")

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_004.jpg")
				currState = COUCH
			}, 200);


			DisableEverything()


		}

		//***********************PRODUCT ROOOM SCENE********************Arrow4******
		if(intersectsProductRoom.length > 0  ) {
			console.log("ROOM ENTREANCE SCENE - 1")


			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_005.jpg")

				currState = PRODENTRANCE
			}, 200);

			DisableEverything()
			clickableVideo = false
		}

		//***********************Video ROOM SCENE**************************
		if(intersectsVideoRoom.length > 0  ) {
			console.log("VIDEO ROOM SCENE - 1")

			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_006.jpg")
				currState = BEAUTY
			}, 200);

			DisableEverything()
		}

		//***********************BOTTLE ROOOM SCENE**************************
		if(intersectsBottleRoom.length > 0  ) {
			console.log("BOTTLE ROOM SCENE - 1")


			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_007.jpg")
				currState = PRODUCTS
				// skyBox.rotation.y =0
			}, 200);



			DisableEverything()
		}




		//***********************BACK TO MAIN SCENE*************************
		if(intersectsMainRoom.length > 0  ) {
			console.log("MAIN SCENE - 1")


			setTimeout(function(){
				envLoad("scenes/EXTROVERT/EXTRO_CUBEMAP_001.jpg")
				currState = MAIN
				// skyBox.rotation.y = -1.7
			}, 200);
			// TweenForVideos(videoMat)
			DisableEverything()

		}
		// if(intersectsMultipleVideo.length > 0 ) {
		// 	alert("Video Clicked");
		// }
		if(intersectsProductPlusIcon1.length > 0 ) {
			productbool = true
            console.log("video clicked")
            document.getElementById('product1').style.display = 'block';
			document.getElementById('productButton-1').style.display = 'block';

            //window.open('https://us.ahcbeauty.com/')
        }
        if(intersectsProductPlusIcon2.length> 0) {
			productbool = true
            console.log("video clicked")
            document.getElementById('product2').style.display = 'block';
			document.getElementById('productButton-2').style.display = 'block';
            //window.open('https://us.ahcbeauty.com/')
        }
        if(intersectsProductPlusIcon3.length> 0 ) {
			productbool = true
            console.log("video clicked")
            document.getElementById('product3').style.display = 'block';
			document.getElementById('productButton-3').style.display = 'block';


            //window.open('https://us.ahcbeauty.com/')
        }
		if(intersectsSelfieClick.length > 0 && selfieSceneClick == true) {
			// alert("Selfie Clicked")
		}

		//***********************PLAY VIDEO ON PRODUCT SCENE**************************
		else if ( intersectsRoomVideoPlay.length > 0 && clickableVideo == true) {
			// setTimeout(function(){
			// 	document.getElementById('video2').style.display = 'block';
			// 	document.getElementById('video_id').style.display = 'block';
			// 	var player = videojs('#video2');
			// 	var video = document.getElementById('video2');
			// 	// video.requestFullscreen();
			// 	player.play();
			// 	player.on('fullscreenchange', function () {
			// 		if (this.isFullscreen()){
			// 			console.log('fullscreen');
			// 		} else {
			// 			document.getElementById('video2').style.display = 'none';
			// 			document.getElementById('blackScreen').style.display = 'none';
			// 			document.getElementById('video_id').style.display = 'none';
			// 			player.pause()
			// 		}
			// 	})
			// }, 1500);
			// document.getElementById('blackScreen').style.display = 'block';
			// controls.enableRotate = false
			// clickableVideo = false
		}
	});
}

function envLoad(textureUrl){
	const textures = getTexturesFromAtlasFile( textureUrl, 6 );
	materials = [];


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
	// manager.onLoad = function ( ) {

	// 	console.log( 'Loading complete!');

	// };

	skydome.scene.add( skyBox );

}

function runTween(){
	requestAnimationFrame(runTween)
	TWEEN.update()
}

function DisableEverything(){
	firtVideoChecker = false
	secondVideoChecker = false
	clickableVideo = false
	selfieSceneClick = false
	video.pause();
	video2.pause();
	video3.pause();
	orbVideo.pause();
	bilboardVideo.pause();
	orbVideoMask.pause()
	loaderCheck = false
	orbVideoPlayed = false
	console.log(loaderCheck)
	document.getElementById('selfie-text').style.display = 'none';
	document.getElementById('selfie-btn').style.display = 'none';
	document.getElementById('pool-text').style.display = 'none';
	document.getElementById('pool-btn').style.display = 'none';
	document.getElementById('beauty-text').style.display = 'none';
	document.getElementById('beauty-btn').style.display = 'none';
	document.getElementById('beauty-btn').style.pointerEvents = 'none';
	document.getElementById('pool-btn').style.pointerEvents = 'none';
	document.getElementById('selfie-btn').style.pointerEvents = 'none';
	let ArrowArray = [orbProduct,ProcuctBaseArrow,PoolEntranceArrow,orbVideoMesh,MainRoomArrow,PoolRoomArrow,selfieRoomArrow,CoachRoomArrow,videoRoomArrow,ProductRoomArrow,BottleRoomArrow,RoomVideoPlay,VideoPlayBottleScene,ProductIcon1,ProductIcon2,ProductIcon3,VideoPlayBottleScene,SelfiePlane,MiddleRoomArrow]
	let ArrowScene = [orbProductScene,ProcuctBaseScene,PoolEntranceScene,OrbVideoScene,MainRoomScene,PoolRoomScene,selfieScene,CoachRoomScene,VideoRoomScene,ProductRoomScene,BottleRoomScene,RoomVideoPlayScene,BottleRoomVideoPlayScene,ProductIconScene1,ProductIconScene2,ProductIconScene3,BottleRoomVideoPlayScene,SelfiePlaneScene,MiddleRoomScene]

	setTimeout(function(){
		for (var i = 0; i < ArrowArray.length; i++) {
			ArrowScene[i].remove(ArrowArray[i]);

		}
	}, 200);
	TweenFadeOutForVideos()
}

function TweenFadeOutForVideos(){

	new TWEEN.Tween( videoMat ).to( { opacity: 0 }, 250 ).start();
	new TWEEN.Tween( arrowMat ).to( { opacity: 0 }, 250 ).start();
	new TWEEN.Tween( videoMatBottleScene ).to( { opacity: 0 }, 250 ).start();
}
function TweenFadeInForVideos(VideoOpacityMat){

	new TWEEN.Tween( VideoOpacityMat ).to( { opacity: 1 }, 1000 ).start();

}
function TweenFadeInForBilboardVideos(){

	new TWEEN.Tween( videoMatBottleScene ).to( { opacity: 1 }, 1000 ).start();

}

function TweenFadeInForArrow(){

	new TWEEN.Tween( arrowMat ).to( { opacity: 1 }, 1000 ).start();

}
function checkTheVideoLoad(){

	video.onloadeddata  = function() {

		video.play()
		video2.play()
		orbVideo.play()
		orbVideoMask.play()
		video.currentTime = 0;
		video2.currentTime = 0;
		// video3.play()
		console.log("LOADED")

	};
}
// function checkRobTheVideoLoad(){
// 	var orbvideoBool1 = false;
// 	var orbvideoBool2 = false;
// 	orbVideo.onloadeddata  = function() {

// 		orbvideoBool1 = true
// 		console.log("orbVideo")

// 	};
// 	orbVideoMask.onloadeddata  = function() {

// 		orbvideoBool2 = true
// 		console.log("orbMaskVideo")

// 	};
// 	if(orbvideoBool1 == true && orbvideoBool2 == true){
// 		orbVideo.play()
// 		orbVideoMask.play()
// 	}
// }

function copyLink() {
	const linkToCopy = "https://us.ahcbeauty.com/";

	if (navigator.share) {
		navigator.share({
			title: 'AHC You Spa',
			url: linkToCopy
		}).then(() => {
			shareLinkBtn.innerText = 'LINK COPIED'
			setTimeout(() => {
				shareLinkBtn.innerText = 'Share Experience With a Friend'
			}, 2000)
		})
			.catch(console.error);
	} else {
		// TODO Add fallback to copy Link
		// navigator.clipboard.writeText(linkToCopy)
		// 	.then(() => {
		// 		// alert(`Copied!`)
		// 		shareLinkBtn.innerText = 'LINK COPIED'
		// 		// shareLinkBtn.style.color = 'white'
		// 		// shareLinkBtn.style.backgroundColor = 'black'
		// 		setTimeout(() => {
		// 			shareLinkBtn.innerText = 'Share Experience With a Friend'
		// 			// shareLinkBtn.style.color = 'black'
		// 			// shareLinkBtn.style.backgroundColor = 'white'
		// 		}, 2000)
		//
		// 	})
		// 	.catch((error) => {
		// 		alert(`Copy failed! ${error}`)
		// 	})
	}
}
