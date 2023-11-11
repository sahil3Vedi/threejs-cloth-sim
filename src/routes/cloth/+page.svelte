<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
    	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
    	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    	import { addAxesToScene } from '../../utils/addAxes';

	let camera_1: any;
	let camera_2: any;

	onMount(()=>{
		let workspace = document.querySelector('.workspace');
		let pointcloud = document.querySelector('.pointcloud');
		const renderer_1 = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		const renderer_2 = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		renderer_1.setClearColor(0x000000, 0);  // Here, 0x000000 can be any color, but the second parameter (alpha) should be 0 for transparency.
		renderer_2.setClearColor(0x000000, 0);
        	const gltfLoader = new GLTFLoader(); 

		if (workspace){
			camera_1 = new THREE.PerspectiveCamera(70, workspace.clientWidth / workspace.clientHeight, 0.001, 10 );
			camera_1.position.set(1,1.618,1.618);
			const controls = new OrbitControls(camera_1, renderer_1.domElement);
			controls.target.set(0,1,0);
			controls.enableZoom = false;
			controls.enablePan = false;
            		controls.update();
            		const scene = new THREE.Scene();

			addAxesToScene(scene, 2);
			const ambientLight = new THREE.AmbientLight(0xffffff);
            		scene.add(ambientLight);

			const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
            		directionalLight1.position.set(1, 1, 1);
            		const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
            		directionalLight2.position.set(-1, -1, -1);
			scene.add(directionalLight1);
			scene.add(directionalLight2);

			gltfLoader.load('/src/assets/mannequin/scene.gltf', (gltf)=>{
				scene.add(gltf.scene);
				// New code to extract vertices and save to a file

				{/*
				//THIS CODE EXTRACTS POINT CLOUD FROM GLTF
				
				const vertices = [];
				gltf.scene.traverse(function (child) {
					if (child.isMesh) {
						const geometry = child.geometry;
						const positions = geometry.attributes.position.array;
						let swappedVertices = [];

						for (let i = 0; i < positions.length; i+=3){
							const x = positions[i];
							const y = positions[i+1];
							const z = positions[i+2];

							swappedVertices.push(x,z,-y);
						}
						vertices.push(swappedVertices); // Add to vertices array
					}
				});

				const blob = new Blob([JSON.stringify(vertices)], {type : 'application/json'});
				const anchor = document.createElement('a');
				anchor.href = URL.createObjectURL(blob);
				anchor.download = 'pointCloud.json';
				anchor.click();
				URL.revokeObjectURL(anchor.href); // Clean up the URL object

				*/}
				
			});

			renderer_1.setSize(workspace.clientWidth, workspace.clientHeight);
			renderer_1.setAnimationLoop((time)=>{
				renderer_1.render(scene, camera_1);
			});
			workspace.appendChild(renderer_1.domElement);
		};

		if(pointcloud){
			camera_2 = new THREE.PerspectiveCamera(70, pointcloud.clientWidth / pointcloud.clientHeight, 0.001, 1000 );
                      	camera_2.position.set(61.8,100,100);
                      	const controls = new OrbitControls(camera_2, renderer_2.domElement);
                      	controls.target.set(0,0,0);
                      	controls.enableZoom = false;
                     	controls.enablePan = false;
                     	controls.update();
                     	const scene = new THREE.Scene();
  
                      	addAxesToScene(scene, 200);
                      	const ambientLight = new THREE.AmbientLight(0xffffff);
                      	scene.add(ambientLight);
  
                      	const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2);
                      	directionalLight1.position.set(1, 1, 1);
                      	const directionalLight2 = new THREE.DirectionalLight(0xffffff, 2);
                      	directionalLight2.position.set(-1, -1, -1);
                      	scene.add(directionalLight1);
                     	scene.add(directionalLight2);

			const renderPointCloud = (vertices) => {
				console.log(vertices)
				const geometry = new THREE.BufferGeometry();
				const material = new THREE.PointsMaterial({ 
					size: 1, // Change size to your preference
					color: 0xff0000 // Change color to your preference
				});

				// If the vertices are not in the form of a Float32Array, you need to convert them.
				const verticesArray = new Float32Array(vertices.flat());

				// Add vertices to geometry
				geometry.setAttribute('position', new THREE.BufferAttribute(verticesArray, 3));

				// Create points system and add it to the scene
				const points = new THREE.Points(geometry, material);
				scene.add(points);
			};

			// New code to load the point cloud data and render it
			const loader = new THREE.FileLoader();
			loader.load('/src/assets/pointCloud.json', (data) => {
				const vertices = JSON.parse(data);
				renderPointCloud(vertices);
			});

			renderer_2.setSize(pointcloud.clientWidth, pointcloud.clientHeight);
			renderer_2.setAnimationLoop((time)=>{
                                renderer_2.render(scene, camera_2);
                        });
                        pointcloud.appendChild(renderer_2.domElement);
		};

	});
</script>

<h1>Hi!</h1>
<p>The first step is converting the 3D mannequin to a point cloud.</p>

<div class="workspace"></div>

<div class="pointcloud"></div>

<style lang="scss">
    .workspace{
	    background-color: #f1f5f9;
	    border: 2px solid black;
	    height: 90vh;
    }
    .pointcloud{
	    background-color: #f1f5f9;
	    border: 2px solid black;
	    height: 90vh;
    }
</style>
