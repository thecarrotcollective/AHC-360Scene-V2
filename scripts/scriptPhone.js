import * as THREE from './three.module.js';

import {OrbitControls} from './Orbit.js';
// import { DeviceOrientationControls } from './DeviceOrientation.js';
import { DeviceOrientationControls } from './DeviceOrientationWithOrbit.js';



			let camera, controls;
			let renderer,video,skydome;
      let poolSceneVideo,vector,selfieScene,VideoRoomScene, BottleRoomScene,videoRoomSprite,BottleRoomSprite,MainRoomScene,MainRoomSprite,PoolRoomSprite,PoolRoomScene,CoachRoomScene,CoachRoomSprite;
			let scene,text,cubeColor,materials,skyBox,opacityValue,transparentBool,ProductRoomScene,ProductRoomSprite;
      let textScene,RoomVideoPlay,RoomVideoPlayScene,filterScene,clickableVideoMesh,SceneObjectVideo1,videoPlane,runVideo,selfieRoomSprite;
      const mouse = new THREE.Vector2();
      const startButton = document.getElementById( 'start-btn' );
      startButton.addEventListener( 'click', function () {
          init();
          animate();
          runVideo = false;
          // scene.add(videoScene)
          // clickableVideo = false
		      document.getElementById('overlay').style.display = 'none';
		      setTimeout(function(){
		              MainRoomScene.add(MainRoomSprite);
		              clickableVideo = true
		      }, 1000);
      } );
      var clickableVideo = true

			function init() {

				const container = document.getElementById( 'container' );

				renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );
                // skydome = {
                //     scene: new THREE.Scene(),
                //     camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000 ),
                // };

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
				scene.add(CoachRoomScene)
        scene.add(VideoRoomScene)
        scene.add(BottleRoomScene)
        scene.add(selfieScene)
				scene.add(PoolRoomScene)
	      scene.add(RoomVideoPlayScene)
	      scene.add(textScene)
	      scene.add(MainRoomScene)
	      scene.add(ProductRoomScene)
	      scene.add(filterScene)
	      scene.add(SceneObjectVideo1)

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 3000 );
				camera.position.z =0.01;
        controls = new DeviceOrientationControls( camera );
				console.log(controls);
        // controls.target.set(0, 0, 0);

        //***********************CUBE MAP********************
				envLoad("scenes/360Scene1.png")

        //***********************LIGHT********************
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);

        //***********************SPRITES********************
        var spriteTexture1 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat1 = new THREE.SpriteMaterial( { map: spriteTexture1 ,rotation:0,transparent: true,opacity:1} );
				CoachRoomSprite = new THREE.Sprite( spriteMat1 );
				CoachRoomSprite.position.set(-18,-8,25);
				CoachRoomSprite.scale.set(9,6,6)


				var spriteTexture2 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat2 = new THREE.SpriteMaterial( { map: spriteTexture2,rotation: -0.1 } );
				PoolRoomSprite = new THREE.Sprite( spriteMat2 );
				PoolRoomSprite.position.set(9,-4,4);
				PoolRoomSprite.scale.set(4,2,2)


        var spriteTexture3 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat3 = new THREE.SpriteMaterial( { map: spriteTexture3,rotation: -0.1 } );
				MainRoomSprite = new THREE.Sprite( spriteMat3 );
				MainRoomSprite.position.set(0,-12,-22);
				MainRoomSprite.scale.set(10,10,10)


        var spriteTexture4 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat4 = new THREE.SpriteMaterial( { map: spriteTexture4,rotation: -0.1 } );
				ProductRoomSprite = new THREE.Sprite( spriteMat4 );
				ProductRoomSprite.position.set(-5,-7,-10);
				ProductRoomSprite.scale.set(6,3,3)

        var spriteTexture5 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat5 = new THREE.SpriteMaterial( { map: spriteTexture5,rotation: -0.1 } );
				selfieRoomSprite = new THREE.Sprite( spriteMat5 );
				selfieRoomSprite.position.set(12,-7,-18);
				selfieRoomSprite.scale.set(6,3,3)

        var spriteTexture6 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat6 = new THREE.SpriteMaterial( { map: spriteTexture6,rotation: 0.1 } );
				videoRoomSprite = new THREE.Sprite( spriteMat6 );
				videoRoomSprite.position.set(-5,-7,-20);
				videoRoomSprite.scale.set(6,3,3)


        var spriteTexture7 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat7 = new THREE.SpriteMaterial( { map: spriteTexture7,rotation: -0.1 } );
				BottleRoomSprite = new THREE.Sprite( spriteMat7 );
				BottleRoomSprite.position.set(8,-7,-20);
				BottleRoomSprite.scale.set(6,3,3)




        //***********************VIDEO********************
        videoPlane = new THREE.PlaneGeometry( 9, 16 );
        video = document.createElement('video');
        video.src = "video/test-video.mp4"; // Set video address
        // video.autoplay = "autoplay";
        // video.play();
        // video.loop = true;
        const videoTexture = new THREE.VideoTexture(video)
        const videoMat = new THREE.MeshBasicMaterial( {map: videoTexture,transparent: true,opacity:1,side: THREE.DoubleSide} );
        RoomVideoPlay = new THREE.Mesh( videoPlane, videoMat );
        RoomVideoPlay.position.set(0,0,-1)
        RoomVideoPlay.scale.normalize().multiplyScalar(0.1);
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
        const clickableVideoMat = new THREE.MeshBasicMaterial( {map:testTesture,alphaMap:alphAmapTex ,transparent:true, opacity: 1} );
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

				requestAnimationFrame( animate );

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
          //main Scene
          //0.000009983227825237407
          //0.000007191070537904391
          //0.0000021222522946780884
          //4.5

          //pool Scene
          //-5.312526464765157e-7
          //0.000009339746910191843

				 // required when damping is enabled
				renderer.render( scene, camera );
        controls.update();
        runTween()
			}
            function clickTrigger(){
                const raycaster = new THREE.Raycaster();
                document.addEventListener(
                    "click",
                    event => {

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


                    //***********************POOL SCENE********************SPRITE2******
                    if ( intersectsPoolRoom.length > 0 ) {
                        console.log("POOOL SCENE - 1")
                        setTimeout(function(){

                            MainRoomScene.add(MainRoomSprite);
                            selfieScene.add(selfieRoomSprite);

                            MainRoomSprite.position.set(-20,-10,-10);
				            MainRoomSprite.scale.set(8,8,8)
                            CoachRoomScene.remove(CoachRoomSprite);
                            PoolRoomScene.remove(PoolRoomSprite);
                            // videoMesh.position.set(-280, -15, 200);
                            // videoMesh.rotation.set(0,-3.7,-0.002)
                            // videoMesh.scale.set(3.4,2.7,1)
                            runVideo =true
                            poolSceneVideo = true
                        }, 300);
                        setTimeout(function(){
                            envLoad("scenes/360Scene7.png")
                            skyBox.rotation.y = -2

                        }, 200);
                        setTimeout(function(){

                            controls.reset();
                        }, 250);


                        // scene.remove(filterScene);
                        // scene.remove(textScene);
                        clickableVideo = false
                        // videoMesh.position.set(135, 15, -15);

                    }
                       //***********************SELFIE SCENE**************************
                       if ( intersectsSelfie.length > 0 ) {
                        console.log("SELFIE SCENE - 1")
                        setTimeout(function(){
                            selfieScene.remove(selfieRoomSprite)
                            PoolRoomScene.add(PoolRoomSprite);
                            PoolRoomSprite.position.set(-5,-4,10);
                            PoolRoomSprite.scale.set(4,2,2)

                            CoachRoomScene.remove(CoachRoomSprite);
                            PoolRoomScene.remove(PoolRoomSprite);
                        }, 300);
                        setTimeout(function(){
                            envLoad("scenes/360Scene8.png")
                            skyBox.rotation.y = -2.5

                        }, 200);
                        setTimeout(function(){

                            controls.reset();
                        }, 250);

                        clickableVideo = false
                        // videoMesh.position.set(135, 15, -15);

                    }
                     //***********************COACH SCENE********************SPRITE******
                    if ( intersectsCoachRoom.length > 0 ) {
                        console.log("COACH SCENE - 1")
                        setTimeout(function(){

                            ProductRoomScene.add(ProductRoomSprite);
                            MainRoomScene.add(MainRoomSprite);
                            MainRoomSprite.position.set(-20,-10,0);
				            MainRoomSprite.scale.set(6,6,6)
                            ProductRoomSprite.position.set(-5,-7,-10);
                            ProductRoomSprite.scale.set(6,3,3)
                            VideoRoomScene.remove(videoRoomSprite)
                            BottleRoomScene.remove(BottleRoomSprite)
                            CoachRoomScene.remove(CoachRoomSprite);
                            PoolRoomScene.remove(PoolRoomSprite);
                        }, 300);
                        setTimeout(function(){
                            envLoad("scenes/360Scene3.png")
                            skyBox.rotation.y =0

                        }, 200);
                        setTimeout(function(){

                            controls.reset();
                        }, 250);

                        // scene.remove(videoScene);
                        // scene.remove(filterScene);
                        // scene.remove(textScene);

                        clickableVideo = false
                        runVideo =false

                    //***********************ROOOM SCENE********************SPRITE4******
                    } if(intersectsProductRoom.length > 0  ) {
                        console.log("ROOM ENTREANCE SCENE - 1")
                        setTimeout(function(){
                                VideoRoomScene.add(videoRoomSprite)
                                BottleRoomScene.add(BottleRoomSprite)
                                RoomVideoPlayScene.add(RoomVideoPlay)
                                CoachRoomScene.add(CoachRoomSprite)
                                MainRoomScene.add(MainRoomSprite);
                                PoolRoomScene.remove(PoolRoomSprite);
                                CoachRoomSprite.position.set(18,-10,2);
				                CoachRoomSprite.scale.set(8,4,4)
                                MainRoomSprite.position.set(-18,-10,0);
				                MainRoomSprite.scale.set(8,4,4);
                                // scene.add(SceneObjectVideo1)
                                // SceneObjectVideo1.add(clickableVideoMesh)
                                clickableVideo = true
                                runVideo =false
                                ProductRoomScene.remove(ProductRoomSprite);
                        }, 300);
                        setTimeout(function(){
                            envLoad("scenes/360Scene4.png")
                            skyBox.rotation.y =0

                        }, 200);
                        setTimeout(function(){

                            controls.reset();
                        }, 250);

                            // new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                            // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                            // new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
                            clickableVideo = true


                        }
                    //***********************Video ROOM SCENE**************************
                        if(intersectsVideoRoom.length > 0  ) {
                            console.log("VIDEO ROOM SCENE - 1")
                            setTimeout(function(){

                                ProductRoomScene.add(ProductRoomSprite)
                                ProductRoomSprite.position.set(2,-10,10);
                                ProductRoomSprite.scale.set(8,4,4)
                                CoachRoomScene.remove(CoachRoomSprite)
                                MainRoomScene.remove(MainRoomSprite)

                                BottleRoomScene.remove(BottleRoomSprite)
                                VideoRoomScene.remove(videoRoomSprite)
                            }, 300);
                            setTimeout(function(){
                                envLoad("scenes/360Scene5.png")
                                skyBox.rotation.y =0

                            }, 200);
                            setTimeout(function(){

                                controls.reset();
                            }, 250);

                            }
                          //***********************BOTTLE ROOOM SCENE**************************
                        if(intersectsBottleRoom.length > 0  ) {
                            console.log("BOTTLE ROOM SCENE - 1")
                            setTimeout(function(){

                                ProductRoomScene.add(ProductRoomSprite)
                                ProductRoomSprite.position.set(-5,-7,10);
                                ProductRoomSprite.scale.set(8,4,4);
                                // RoomVideoPlayScene.add(RoomVideoPlay);
                                CoachRoomScene.remove(CoachRoomSprite)
                                MainRoomScene.remove(MainRoomSprite)

                                BottleRoomScene.remove(BottleRoomSprite)
                                VideoRoomScene.remove(videoRoomSprite)
                            }, 300);
                            setTimeout(function(){
                                envLoad("scenes/360Scene6.png")
                                skyBox.rotation.y =0

                            }, 200);
                            setTimeout(function(){

                                controls.reset();
                            }, 250);

                            }



                    //***********************BACK TO MAIN SCENE********************SPRITE3******

                    if(intersectsMainRoom.length > 0  ) {
                        console.log("MAIN SCENE - 1")
                    setTimeout(function(){
                            ProductRoomScene.remove(ProductRoomSprite)
                            CoachRoomScene.add(CoachRoomSprite)
                            PoolRoomScene.add(PoolRoomSprite);
                            selfieScene.remove(selfieRoomSprite)
                            CoachRoomSprite.position.set(-18,-8,25);
                            CoachRoomSprite.scale.set(9,6,6)
                            PoolRoomSprite.position.set(9,-4,4);
                            PoolRoomSprite.scale.set(4,2,2)
                            MainRoomScene.remove(MainRoomSprite);
                            VideoRoomScene.remove(videoRoomSprite)
                            BottleRoomScene.remove(BottleRoomSprite)
                            // videoScene.add( videoMesh )
                            // videoPlane = new THREE.PlaneGeometry( 36, 24, 1 );
                            // videoMesh.position.set(87, 1, 110);
                            // videoMesh.rotation.set(0,-3.4,0)
                            runVideo =true
                            poolSceneVideo =false

                    }, 300);
                    setTimeout(function(){
                        // new TWEEN.Tween( videoMesh.material ).to( { opacity: 1 }, 2000 ).start();
                        // // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 4000 ).start();
                        // new TWEEN.Tween( text.material ).to( { opacity: 1 }, 2000 ).start();
                    }, 900);
                    setTimeout(function(){
                        envLoad("scenes/360Scene2.png")
                        skyBox.rotation.y = -1.7
                    }, 200);
                    setTimeout(function(){

                        controls.reset();
                    }, 250);


                        console.log("clicked")
                        // new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                        // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                        // new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();

                        // clickableVideo = true
                        clickableVideo == false

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

					materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] ,opacity: 0,
                    transparent: true, depthWrite:false, depthTest :false} ) );


				}

				skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
                // skyBox.rotation.y = 30
                console.log(materials[0].transparent)

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

				scene.add( skyBox );
            }


            function runTween() {

                 requestAnimationFrame(runTween)

                TWEEN.update()
                // [...]
            }
