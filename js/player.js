import { scene } from './main.js';
import { camera } from './main.js';
import { PlayerControls } from './lib/PlayerControls.js';
var controls;
var players = [];

export function Player ( playerID ) {
	this.playerID = playerID;
	this.isMainPlayer = false;
	this.mesh;

	var textureLoader = new TextureLoader();
	//var textureTop = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png");
	//var textureButtom = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png");
	var textureSide = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png");
	var cube_geometry = new BoxGeometry( 1, 2, 0.5 );
	var cube_geometry3 = new BoxGeometry( 0.5, 2, 0.5 );
	var cube_geometry2 = new BoxGeometry( 1, 1, 1);
	var cube_material = [new MeshBasicMaterial( {wireframe: false, map: textureSide}), new MeshBasicMaterial( {wireframe: false, map: textureSide}), new MeshBasicMaterial( {wireframe: false, map: textureSide}),new MeshBasicMaterial( {wireframe: false, map: textureSide}),new MeshBasicMaterial( {wireframe: false, map: textureSide}),new MeshBasicMaterial( {wireframe: false, map: textureSide} )];

	var scope = this;

	this.init = function() {
		scope.group = new Group();
		scope.torso = new Mesh( cube_geometry, cube_material );
		scope.head = new Mesh( cube_geometry2, cube_material );
		scope.head.castShadow = true;
    	scope.head.receiveShadow = true;
		scope.leftArm = new Mesh( cube_geometry3, cube_material );
		scope.leftArm.castShadow = true;
    	scope.leftArm.receiveShadow = true;
		scope.leftArm.position.x = 0.75;
		scope.rightArm = new Mesh( cube_geometry3, cube_material );
		scope.rightArm.castShadow = true;
    	scope.rightArm.receiveShadow = true;
		scope.rightArm.position.x = -0.75;
		scope.leftLeg = new Mesh( cube_geometry3, cube_material );
		scope.leftLeg.castShadow = true;
    	scope.leftLeg.receiveShadow = true;
		scope.leftLeg.position.x = 0.25;
		scope.leftLeg.position.y = -2;
		scope.rightLeg = new Mesh( cube_geometry3, cube_material );
		scope.rightLeg.castShadow = true;
    	scope.rightLeg.receiveShadow = true;
		scope.rightLeg.position.x = -0.2;
		scope.rightLeg.position.y = -2;
		scope.head.position.y += 1;
		//scope.group.position.x += 1;
		scope.torso.castShadow = true;
    	scope.torso.receiveShadow = true;
		scope.group.position.x += 1;
		scope.group.position.y += 3;
		scope.head.position.y += 0.5;
		camera.position.y += 4;
		camera.position.z += 4;
		scope.group.name = playerID;
		scope.head.name = playerID + " - Player Head";
		window.gamemode = "spectator";
		scope.group.add( scope.torso, scope.head, scope.leftArm, scope.rightArm, scope.leftLeg, scope.rightLeg );
		//scope.mesh.position.z += -10;
		scene.add( scope.group );
		players.push( scope.group );

		window.addEventListener("keydown", (e) => {
			if (e.key == "p") {
				scope.group.getObjectByName(playerID + " - Player Head").rotation.x = camera.rotation.x + scope.torso.rotation.x;
				scope.group.getObjectByName(playerID + " - Player Head").rotation.y = camera.rotation.y + scope.torso.rotation.y;
				scope.group.getObjectByName(playerID + " - Player Head").rotation.z = camera.rotation.z + scope.torso.rotation.z;
			}
		})

		window.addEventListener("mousemove", () => {
			//scope.group.getObjectByName(playerID).rotation.x = camera.rotation.x - scope.torso.rotation.x;
			//scope.group.getObjectByName(playerID).rotation.y = camera.rotation.y - scope.torso.rotation.y;
			//scope.group.getObjectByName(playerID).rotation.z = camera.rotation.z - scope.torso.rotation.z;
		});

		setInterval(() => {
			scope.group.getObjectByName(playerID + " - Player Head").rotation.x = camera.rotation.x + scope.torso.rotation.x;
			scope.group.getObjectByName(playerID + " - Player Head").rotation.y = camera.rotation.y + scope.torso.rotation.y;
			scope.group.getObjectByName(playerID + " - Player Head").rotation.z = camera.rotation.z + scope.torso.rotation.z;
		}, 1);

		window.fullturn = false
		setInterval(() => {if (window.fullturn == false) {scope.leftArm.rotation.z += 0.01; if (scope.leftArm.rotation.z = 0.35) {window.fullturn = true}} else if (window.fullturn == true) {scope.leftArm.rotation.z -= 0.01; if (scope.leftArm.rotation.z = 0) {window.fullturn = false}}}, 100)

		document.addEventListener("keydown", (e) => {
			if (e.key == " ") {
				scope.group.getObjectByName(playerID).position.y += 1;
			}
			if (e.ctrlKey) {
				scope.group.getObjectByName(playerID).position.y -= 1;
			}
			if (e.key == "KeyO") {
				camera.position.z -= 10;
			}
		})

		if ( scope.isMainPlayer ) {
			controls = new PlayerControls( camera , scope.group );
			controls.init();
			scope.mainPlayerGamemode = "spectate"
			if ( scope.mainPlayerGamemode === "survival" ) {
				
			} else if ( scope.mainPlayerGamemode === "spectate" ) {
				scope.group.opacity = 0.5;
			} else if ( scope.mainPlayerGamemode === "creative" ) {

			} else if ( scope.mainPlayerGamemode === "aventer" ) {
				scope.mainOtherPlayerFighting = false;
				scope.mainPlayerGetAttacked = true;
			}
		}
	};

	this.setOrientation = function( position, rotation, headRotation ) {
		if ( scope.group ) {
			scope.group.position.copy( position );
			/*scope.group.getObjectByName(playerID + "Player Head").rotation.x = rotation.x;
			scope.group.getObjectByName(playerID + "Player Head").rotation.y = rotation.y;
			scope.group.getObjectByName(playerID + "Player Head").rotation.z = rotation.z;*/
			scope.group.rotation.x = rotation.x;
			scope.group.rotation.y = rotation.y;
			scope.group.rotation.z = rotation.z;
		}
	};
};

export { controls };
export { players };