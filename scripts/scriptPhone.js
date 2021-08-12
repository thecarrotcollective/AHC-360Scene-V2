import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
import { DeviceOrientationControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/DeviceOrientationControls.js';

import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';


			let camera, controls;
			let renderer,video;
            let poolSceneVideo,vector;
			let scene,spriteScene,spriteScene2,text,cubeColor,materials,skyBox,opacityValue,transparentBool,sprite,sprite2,sprite3,sprite4;
            let videoScene,textScene ,spriteScene3,spriteScene4,videoMesh,filterScene,clickableVideoMesh,SceneObjectVideo1,videoPlane,runVideo;
            const mouse = new THREE.Vector2();
            const startButton = document.getElementById( 'start-btn' );
            startButton.addEventListener( 'click', function () {
                init();
                animate();
                runVideo = false;
                scene.add(videoScene)
               
                clickableVideo = false
            document.getElementById('overlay').style.display = 'none';
            setTimeout(function(){  
                    spriteScene3.add(sprite3);
                    clickableVideo = true
            }, 1000);
          
           
      
                
            } );
            var clickableVideo = true
            const closeButton = document.getElementById( 'closeButton' );
            closeButton.addEventListener( 'click', function () {
            if(clickableVideo == false){
                document.getElementById('video_id').style.display = 'none';
                document.getElementById('blackScreen').style.display = 'none';
                controls.enableRotate = true

                // clickableVideo = true
                setTimeout(function(){ clickableVideo = true 
                   
                }, 500);
                
            }

            
            } );

         

			function init() {

				const container = document.getElementById( 'container' );

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				scene = new THREE.Scene();
				spriteScene = new THREE.Scene()
				spriteScene2 = new THREE.Scene()
                spriteScene3 = new THREE.Scene()
                spriteScene4 = new THREE.Scene()
                SceneObjectVideo1 = new THREE.Scene()
                videoScene = new THREE.Scene();
                textScene = new THREE.Scene();
                filterScene = new THREE.Scene();
				scene.add(spriteScene)
				scene.add(spriteScene2)
                scene.add(videoScene)
                scene.add(textScene)
                scene.add(spriteScene3)
                scene.add(spriteScene4)
                scene.add(filterScene)
                scene.add(SceneObjectVideo1)
				const aspect = 2; 
				camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 100 );
				camera.position.z =0.01;
                
                
               

				controls = new DeviceOrientationControls( camera );
				// controls.enableZoom = false;
				// controls.enablePan = false;
				// controls.enableDamping = true;
				// controls.rotateSpeed = - 0.25;

                //***********************CUBE MAP********************
				envLoad("scenes/AHCScene1.png")
                
                
			
                //***********************LIGHT********************
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.DirectionalLight(color, intensity);
                light.position.set(-1, 2, 4);
                scene.add(light);

                //***********************SPRITES********************
                var spriteTexture1 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat1 = new THREE.SpriteMaterial( { map: spriteTexture1 ,rotation:0,transparent: true,opacity:1} );
				sprite = new THREE.Sprite( spriteMat1 );
				sprite.position.set(-18,-8,25);
				sprite.scale.set(9,6,6)
				

				var spriteTexture2 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat2 = new THREE.SpriteMaterial( { map: spriteTexture2,rotation: -0.1 } );
				sprite2 = new THREE.Sprite( spriteMat2 );
				sprite2.position.set(9,-4,4);
				sprite2.scale.set(4,2,2)
				

                var spriteTexture3 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat3 = new THREE.SpriteMaterial( { map: spriteTexture3,rotation: -0.1 } );
				sprite3 = new THREE.Sprite( spriteMat3 );
				sprite3.position.set(0,-12,-22);
				sprite3.scale.set(10,10,10)

                var spriteTexture4 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat4 = new THREE.SpriteMaterial( { map: spriteTexture4,rotation: -0.1 } );
				sprite4 = new THREE.Sprite( spriteMat4 );
				sprite4.position.set(12,-7,-18);
				sprite4.scale.set(6,3,3)
				

                //***********************VIDEO********************
                videoPlane = new THREE.PlaneGeometry( 36, 24, 1 );
                video = document.createElement('video');
                video.src = "video/Ahc-Spa- Home-Sensorial-Treatment-Introverts- -Thinke3-1.m4v"; // Set video address
                video.autoplay = "autoplay";
                video.play();
                video.loop = true;
                const videoTexture = new THREE.VideoTexture(video)
                const videoMat = new THREE.MeshBasicMaterial( {map: videoTexture,transparent: true,opacity:1,side: THREE.DoubleSide} );
                videoMesh = new THREE.Mesh( videoPlane, videoMat );
                videoMesh.position.set(-5, 1, -50);
                videoScene.add( videoMesh )
                // videoMesh.rotation.set(0,-3.4,0)
                

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
                controls.update();
               
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
                    
                    var intersects = raycaster.intersectObjects( spriteScene2.children, false );
                    var intersects2 = raycaster.intersectObjects( spriteScene3.children, false );
                    var intersects3 = raycaster.intersectObjects( spriteScene.children, false );
                    var intersects4 = raycaster.intersectObjects( spriteScene4.children, false );
                    var intersectsVideo = raycaster.intersectObjects( videoScene.children, false );
                    var intersectsObjectVideo = raycaster.intersectObjects( SceneObjectVideo1.children, false );

                    //***********************POOL SCENE********************SPRITE2******
                    if ( intersects.length > 0 ) {
                        setTimeout(function(){  
                            scene.add(spriteScene3);
                            spriteScene3.add(sprite3);
                            sprite3.position.set(-20,-10,-10);
				            sprite3.scale.set(8,8,8)
                            
                            videoMesh.position.set(-280, -15, 200);
                            videoMesh.rotation.set(0,-3.7,-0.002)
                            videoMesh.scale.set(3.4,2.7,1)
                            runVideo =true
                            poolSceneVideo = true
                        }, 300);
                        setTimeout(function(){ 
                            envLoad("scenes/AHCScene4.png") 
                     
                        }, 200);
                        setTimeout(function(){
                    
                            controls.reset();
                        }, 250);
                       
                        scene.remove(spriteScene);
                        scene.remove(spriteScene2);
                        scene.remove(filterScene);
                        scene.remove(textScene);
                        clickableVideo = false
                        // videoMesh.position.set(135, 15, -15);
                        
                    }
                     //***********************COACH SCENE********************SPRITE******    
                    if ( intersects3.length > 0 ) {
                        setTimeout(function(){  
                            scene.add(spriteScene4)
                            spriteScene4.add(sprite4);
                            scene.add(spriteScene3)
                            spriteScene3.add(sprite3);
                            sprite3.position.set(-10,-7,-15);
				            sprite3.scale.set(5,5,5)
                        }, 1000);
                        envLoad("scenes/AHCScene5.png")
                        scene.remove(spriteScene);
                        scene.remove(spriteScene2);
                        scene.remove(videoScene);
                        scene.remove(filterScene);
                        scene.remove(textScene);
                        clickableVideo = false
                        runVideo =false
                      
                    //***********************ROOOM SCENE********************SPRITE4******    
                    } if(intersects4.length > 0  ) {
                        console.log("joined room")
                        setTimeout(function(){  
                               
                                scene.add(spriteScene);
                                scene.add(spriteScene2);
                                sprite.position.set(-18,-8,5);
				                sprite.scale.set(4,2,2)
                                sprite3.position.set(-10,-4,-5);
				                sprite3.scale.set(4,2,2);
                                scene.add(SceneObjectVideo1)
                                SceneObjectVideo1.add(clickableVideoMesh)
                                clickableVideo = true
                                runVideo =false
                                
                        }, 1000);
                        setTimeout(function(){  
                            // new TWEEN.Tween( videoMesh.material ).to( { opacity: 1 }, 2000 ).start();
                            // // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 4000 ).start();
                            // new TWEEN.Tween( text.material ).to( { opacity: 1 }, 2000 ).start();
                        }, 500);
                           
                            envLoad("scenes/AHCScene3.png")
                            scene.remove(spriteScene4);
                            // new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                            // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                            // new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
                            clickableVideo = true
                           
                            
                        }


                    //***********************BACK TO MAIN SCENE********************SPRITE3******

                    if(intersects2.length > 0  ) {
                        console.log("main Scene")
                    setTimeout(function(){  
                            scene.remove(spriteScene4)
                            
                          
                            scene.add(spriteScene2)
                            scene.add(spriteScene)
                            spriteScene2.add(sprite2);
                            spriteScene.add(sprite);
                            sprite.position.set(-18,-8,25);
                            sprite.scale.set(9,6,6)
                            spriteScene3.remove(sprite3);
                            videoScene.add( videoMesh )
                            videoPlane = new THREE.PlaneGeometry( 36, 24, 1 );
                            videoMesh.position.set(87, 1, 110);
                            videoMesh.rotation.set(0,-3.4,0)
                            runVideo =true
                            poolSceneVideo =false
                    
                    }, 300);
                    setTimeout(function(){  
                        new TWEEN.Tween( videoMesh.material ).to( { opacity: 1 }, 2000 ).start();
                        // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 4000 ).start();
                        new TWEEN.Tween( text.material ).to( { opacity: 1 }, 2000 ).start();
                    }, 900);
                    setTimeout(function(){
                        envLoad("scenes/AHCScene2.png")
               
                    }, 200);
                    setTimeout(function(){
                    
                        controls.reset();
                    }, 250);
                      
                       
                        console.log("clicked")
                        new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                        new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                        new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
                        
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



                    else if ( intersectsVideo.length > 0 && clickableVideo == true) {
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
                //"test_scene2.jpg"
				materials = [];
                transparentBool = true
                opacityValue = 0
				for ( let i = 0; i < 6; i ++ ) {

					materials.push( new THREE.MeshBasicMaterial( { map: textures[ i ] ,opacity: 0,
                    transparent: true, depthWrite:false, depthTest :false} ) );
                    

				}

				skyBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), materials );
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
                // new TWEEN.Tween(materials).to( { opacity: 1 }, 1000 ).start();
				scene.add( skyBox );
                
          
               

            }
            function runTween() {
                
                 requestAnimationFrame(runTween)
              
                TWEEN.update()
                // [...]
            }
