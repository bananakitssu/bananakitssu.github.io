var container, scene, camera, renderer;
//var controls;

import { World } from './world.js';
import { createUI } from './world.js';
import { loadGame } from './game.js';
import { controls } from './player.js';
import { PlayerID } from './game.js';

init();
animate();

var color = 0xFFFFFF;
var intensity = 3;
var light = new DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
var light2 = new DirectionalLight(color, intensity);
light2.position.set(1, -2, -4);

function init () {
	container = document.querySelector('.game');

	camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 5;

	scene = new Scene();

	//var color = 0xFFFFFF;
	//var intensity = 3;
	//var light = new DirectionalLight(color, intensity);
	//light.position.set(-1, 2, 4);
	//var light2 = new DirectionalLight(color, intensity);
	//light2.position.set(1, -2, -4);
	scene.add(light, light2);

	renderer = new WebGLRenderer( { alpha: true } );
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0x80a0e0);
	renderer.setSize( window.innerWidth, window.innerHeight );
	//renderer.shadowMap.enabled = true;

	//PlayerID = Math.random(0, 10000);
	//console.log(PlayerID);

	/*firebase.auth().onAuthStateChanged(function( user ) {
		if ( user ) {
			//PlayerID = user.uid;
			loadGame();
		} else {
			firebase.auth().signInAnonymously().then(user => {/*PlayerID = user.uid*//*}).catch(function(error) {
				console.log( error.code + ": " + error.message );
			});
			loadGame();
		}
	});*/

	window.addEventListener( 'resize', onWindowResize, false );

	container.appendChild( renderer.domElement );
}

function animate () {
	requestAnimationFrame((t) => {
		animate();
		//_Step(t - this._previousRAF);
		//if (this._previousRAF === null) {
			//this._previousRAF = t;
		//}
		//this._previousRAF = t;
	});

	//stats.update();

	if ( controls ) {
		controls.update();
	}

	render();
	camera.fov = 70;
}

function render () {
	renderer.clear();
	renderer.render( scene, camera );
}

function onWindowResize () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

var minecraftWorld = new World();
createUI(minecraftWorld);

export { scene };
export { camera };
export { controls };
export { light, light2 };