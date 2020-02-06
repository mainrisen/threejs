
	var camera, controls, scene, renderer, mesh;

	function addFace(geometry, arrFirstPoint, arrSecondPoint, arrThirdPoint, arrFourPoint, index) {
		var normal = new THREE.Vector3( 0, 0, 0 );
		geometry.vertices.push( new THREE.Vector3( arrFirstPoint[0], arrFirstPoint[1], arrFirstPoint[2] ) );
		geometry.vertices.push( new THREE.Vector3( arrSecondPoint[0], arrSecondPoint[1], arrSecondPoint[2] ) );
		geometry.vertices.push( new THREE.Vector3( arrThirdPoint[0], arrThirdPoint[1], arrThirdPoint[2] ) );

		var faceFirst = new THREE.Face3(0, 1, 2, normal, 0x445566 , 0);
		geometry.faces.push(faceFirst);

		if (arrFourPoint) {
			geometry.vertices.push( new THREE.Vector3( arrFourPoint[0], arrFourPoint[1], arrFourPoint[2] ) );
			var faceSecond = new THREE.Face3(0, 2, 3, normal, 0x445566 , 0);
			geometry.faces.push(faceSecond);
		}
	}

	function init() {

		scene = new THREE.Scene();
		scene.background = new THREE.Color( 0x555555 );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
	  renderer.shadowMap.enabled = true;
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 1, 1, 1 );

		// controls

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

		controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
		controls.dampingFactor = 0.8;

		controls.screenSpacePanning = false;

		controls.minDistance = 5;
		controls.maxDistance = 1000;

		controls.maxPolarAngle = Math.PI / 2;

		// world
	{
		//add plane
		{
			var planeGeometry = new THREE.PlaneGeometry( 1000, 1000, 5 );
			var planeMaterial = new THREE.MeshPhongMaterial( { color: 0x887766, side: THREE.DoubleSide} );
			var plane = new THREE.Mesh( planeGeometry, planeMaterial );
			plane.position.set( 0, 0, 0 );
			plane.rotation.x=Math.PI*3/2;
			scene.add( plane );
		}

		//add geometry vertex model
		{
			var css3dr = new THREE.CSS3DRenderer();
			console.dir(css3dr);

			var material = new THREE.MeshPhysicalMaterial( { color: 0x004500, side: THREE.DoubleSide} );
			var geometry = new THREE.Geometry();

			addFace(geometry, [-1,0,-1], [1,0,-1], [1,0,1], [-1,0,1]);

			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			var mesh = new THREE.Mesh( geometry, material );
			mesh.position.set(0, 1, 0);
			scene.add( mesh );

			console.dir(material);
			console.dir(geometry);
		}

	}

	// {
	// const objLoader = new THREE.OBJLoader2();
	// objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (event) => {
	// 	const root = event.detail.loaderRootNode;
	// 	scene.add(root);
	// });

	// lights
	var lightAmb = new THREE.AmbientLight( 0xffffff );
	scene.add( lightAmb );

	var lightDir = new THREE.DirectionalLight( {color: 0xffffff} );
	lightDir.position.set(100, 100, 100);
	scene.add( lightDir );

	function animate() {
		// mesh.rotation.x+=0.01;
		 mesh.rotation.y+=0.01;
		// mesh.rotation.z+=0.01;
		controls.update();
		renderer.render( scene, camera );
		requestAnimationFrame( animate );
	}
		animate();
}
	init();
