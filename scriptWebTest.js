import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';

import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';


			let camera, controls;
			let renderer;
			let scene,spriteScene,spriteScene2,text,cubeColor,materials,skyBox,opacityValue,transparentBool,sprite,sprite2,sprite3,sprite4;
            let videoScene,textScene ,spriteScene3,spriteScene4,videoMesh,filterScene;
            const mouse = new THREE.Vector2();
            const startButton = document.getElementById( 'start-btn' );
            startButton.addEventListener( 'click', function () {
                init();
                animate();
         
            document.getElementById('overlay').style.display = 'none';
            setTimeout(function(){  
                  
                    spriteScene.add(sprite);
                    spriteScene2.add(sprite2);

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
				
				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
				camera.position.z = 0.00001;
                camera.rotation.z = 100
                
               

				controls = new OrbitControls( camera, renderer.domElement );
				controls.enableZoom = false;
				controls.enablePan = false;
				controls.enableDamping = true;
				controls.rotateSpeed = - 0.25;

                //***********************CUBE MAP********************
				envLoad("scenes/test_scene2.jpg")
                
                
			
                //***********************LIGHT********************
                const color = 0xFFFFFF;
                const intensity = 1;
                const light = new THREE.DirectionalLight(color, intensity);
                light.position.set(-1, 2, 4);
                scene.add(light);

                //***********************SPRITES********************
                var spriteTexture1 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat1 = new THREE.SpriteMaterial( { map: spriteTexture1 ,rotation:.2,transparent: true,opacity:1} );
				sprite = new THREE.Sprite( spriteMat1 );
				sprite.position.set(-8,-5,-12);
				sprite.scale.set(6,3,3)
				

				var spriteTexture2 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat2 = new THREE.SpriteMaterial( { map: spriteTexture2,rotation: -0.1 } );
				sprite2 = new THREE.Sprite( spriteMat2 );
				sprite2.position.set(-8,-4,4);
				sprite2.scale.set(4,2,2)
				

                var spriteTexture3 = new THREE.TextureLoader().load( "UIAssets/arrow_white.png" );
				var spriteMat3 = new THREE.SpriteMaterial( { map: spriteTexture3,rotation: -0.1 } );
				sprite3 = new THREE.Sprite( spriteMat3 );
				sprite3.position.set(8,-4,3);
				sprite3.scale.set(4,2,2)

                var spriteTexture4 = new THREE.TextureLoader().load( "UIAssets/arrow_black.png" );
				var spriteMat4 = new THREE.SpriteMaterial( { map: spriteTexture4,rotation: -0.1 } );
				sprite4 = new THREE.Sprite( spriteMat4 );
				sprite4.position.set(12,-4,-2);
				sprite4.scale.set(4,2,2)
				
				

                //***********************VIDEO********************
                const videoPlane = new THREE.PlaneGeometry( 36, 24, 1 );
                let video = document.createElement('video');
                video.src = "video/test-video.mp4"; // Set video address
                video.autoplay = "autoplay"; // To set up playback
                video.loop = true;
                const videoTexture = new THREE.VideoTexture(video)
                const videoMat = new THREE.MeshBasicMaterial( {map: videoTexture,transparent: true,opacity:1} );
                videoMesh = new THREE.Mesh( videoPlane, videoMat );
                videoMesh.position.set(50, 1, -10);
                videoMesh.rotation.set(0,-1.5,0)
                videoScene.add( videoMesh )

                const colorMesh = new THREE.PlaneGeometry( 36, 24, 1 );
                const materialColor = new THREE.MeshBasicMaterial( {color: 0x000000,transparent:true, opacity: 0} );
                cubeColor = new THREE.Mesh( colorMesh, materialColor );
                cubeColor.position.set(49.9, 1, -10);
                cubeColor.rotation.set(0,-1.5,0)
                filterScene.add( cubeColor );

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
                var vector = camera.position.clone();
                var testBool = false
               
                if (  testBool == false){
                    new TWEEN.Tween( text.material ).to( { opacity: 1 }, 100 ).start();
                    new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 100 ).start();
                  
                 
    
                    testBool = true;
                } if( Math.abs(vector.x) > 0.0000010130538922770067 && Math.abs(vector.x) <0.000006352257762340783){
                    new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
               
                    new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                    testBool = false;
                  }
                  
            
				controls.update(); // required when damping is enabled
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
                    if ( intersects.length > 0 ) {
                        setTimeout(function(){  
                            scene.add(spriteScene3);
                            spriteScene3.add(sprite3);
        
                        }, 1000);
                        envLoad("scenes/test_scene_2.jpg")
                        scene.remove(spriteScene);
                        scene.remove(spriteScene2);
                        scene.remove(filterScene);
                        scene.remove(textScene);
                        clickableVideo = false
                        videoMesh.position.set(135, 15, -15);
                        
                    }
                    if ( intersects3.length > 0 ) {
                        setTimeout(function(){  
                            scene.add(spriteScene4)
                            spriteScene4.add(sprite4);
        
                        }, 1000);
                        envLoad("scenes/test_scene3.jpg")
                        scene.remove(spriteScene);
                        scene.remove(spriteScene2);
                        scene.remove(videoScene);
                        scene.remove(filterScene);
                        scene.remove(textScene);
                        clickableVideo = false
                      
                        
                    } if(intersects4.length > 0  ) {
                        console.log("clicked")
                        setTimeout(function(){  
                                videoMesh.position.set(50, 1, -10);
                                scene.add(spriteScene);
                                scene.add(spriteScene2);
                                scene.add(videoScene);
                                scene.add(textScene);
                                scene.add(filterScene);
                                
                                
                        }, 1000);
                        setTimeout(function(){  
                            new TWEEN.Tween( videoMesh.material ).to( { opacity: 1 }, 2000 ).start();
                            // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 4000 ).start();
                            new TWEEN.Tween( text.material ).to( { opacity: 1 }, 2000 ).start();
                        }, 900);
                            
                            envLoad("scenes/test_scene2.jpg")
                            scene.remove(spriteScene4);
                            new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                            new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                            new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
                            clickableVideo = true
                           
                            
                        }
                    if(intersects2.length > 0  ) {
                    setTimeout(function(){  
                            videoMesh.position.set(50, 1, -10);
                            scene.add(spriteScene);
                            scene.add(spriteScene2);
                            // scene.add(videoScene);
                            scene.add(textScene);
                            scene.add(filterScene);
                            spriteScene3.remove(sprite3);
                    
                    }, 1000);
                    setTimeout(function(){  
                        new TWEEN.Tween( videoMesh.material ).to( { opacity: 1 }, 2000 ).start();
                        // new TWEEN.Tween( cubeColor.material ).to( { opacity: 0.5 }, 4000 ).start();
                        new TWEEN.Tween( text.material ).to( { opacity: 1 }, 2000 ).start();
                    }, 900);
                      
                        envLoad("scenes/test_scene2.jpg")
                        console.log("clicked")
                        new TWEEN.Tween( videoMesh.material ).to( { opacity: 0 }, 100 ).start();
                        new TWEEN.Tween( cubeColor.material ).to( { opacity: 0 }, 100 ).start();
                        new TWEEN.Tween( text.material ).to( { opacity: 0 }, 100 ).start();
                  
                        clickableVideo = true
                        
                    }
                    else if ( intersectsVideo.length > 0 && clickableVideo == true) {
                        setTimeout(function(){  
                
                            var player = videojs('#video2');
                            var video = document.getElementById('video2');
                            video.requestFullscreen();
                            player.play();
                    }, 1500);
                    document.getElementById('video2').style.display = 'block';
                    document.getElementById('video_id').style.display = 'block';
                    document.getElementById('blackScreen').style.display = 'block';
                    controls.enableRotate = false
                    clickableVideo = false
                  
                        
                     
                        
                        
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

					new TWEEN.Tween(materials[i]).to( { opacity: 1 }, 1000 ).start();
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
           