import { scene } from './main.js';
import { Player, players } from './player.js';

var otherPlayers = {};
var PlayerID = "Player - " + Math.random(500000, 0) + "";
PlayerID = PlayerID.replace("0.", "");
console.log(PlayerID);
var player;
var _VS = `
varying vec3 v_Normal;

void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_Normal = normal;
}
`;
var _FS = `
uniform vec3 sphereColour;

varying vec3 v_Normal;

void main() {
    gl_FragColor = vec4(sphereColour, 1.0);
}
`;
//var mousePosition = new THREE.Vector2();
//var raycaster = new Raycaster();
//let Intersects;

export function loadGame () {
    loadEnvironment();
    initMainPlayer();

    listenToOtherPlayers();

    window.onunload = function () {
        fbRef.child("data/servers/Testing Server/players").child(PlayerID).remove();
        players.pop(PlayerID);
    }

    window.onbeforeunload = function () {
        fbRef.child("data/servers/Testing Server/players").child(PlayerID).remove();
        players.pop(PlayerID);
    }
}

function listenToPlayer ( PlayerData ) {
    if ( PlayerData.val() ) {
        otherPlayers[PlayerData.key].setOrientation( PlayerData.val().orientation.position, PlayerData.val().orientation.rotation/*, PlayerData.val().orientation.head.rotation*/ );
    }
} 

function listenToOtherPlayers () {
    fbRef.child("servers/Testing Server/players").on("child_added", function( PlayerData ) {
        if ( PlayerData.val() ) {
            if ( PlayerID != PlayerData.key && !otherPlayers[PlayerData.key] ) {
                otherPlayers[PlayerData.key] = new Player ( PlayerData.key );
                otherPlayers[PlayerData.key].init();
                fbRef.child("servers/Testing Server/players/" + PlayerData.key ).on( "value", listenToPlayer );
            }
        }
    });

    fbRef.child("servers/Testing Server/players").on("child_removed", function( PlayerData ) {
        if ( PlayerData.val() ) {
            fbRef.child("servers/Testing Server/players/" + PlayerData.key ).off( "value", listenToPlayer );
            scene.remove( otherPlayers[PlayerData.key.mesh ] );
            delete otherPlayers[PlayerData.key];
        }
    })
}

function initBrowserName() {
    const userAgent = navigator.userAgent;

    if (userAgent.includes("Chrome")) {
        return "Google Chrome";
    } else if (userAgent.includes("Firefox")) {
        return "Mozilla Firefox";
    } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        return "Apple Safari";
    } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        return "Microsoft Internet Explorer";
    } else if (userAgent.includes("Edge")) {
        return "Microsoft Edge";
    } else if (userAgent.includes("Roblox Devices Browser")){
        return "Roblox Devices Browser"
    } else {
        return "Unknown browser";
    }
}

function initDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.match(/mobile/i)) {
      return "Mobile";
    } else if (userAgent.match(/tablet/i)) {
      return "Tablet";
    } else {
      return "Desktop";
    }
  }

function initGamemode () {
    var gamemode = window.gamemode;
    return gamemode;
}

function initMainPlayer () {
    fbRef.child("servers/Testing Server/crossplayingPlayers").set({
        players:players,
        minecraftPlayers:{}
    });
    fbRef.child("servers/Testing Server/players/" + PlayerID).set({
        orientation: {
            position: {x: 0, y:0, z:0},
            rotation: {x: 0, y:0, z:0},
            Head: {
                rotation: {x: 0, y: 0, z: 0},
            }
        },
        playerSettings: {
            banndedFromServer: false,
            crossplaying: true,
            plateform: {
                browser: initBrowserName(),
                device: initDeviceType(),
                touchScreen: false
            },
            playerAmour: 0,
            //playerCurrentGamemode: initGamemode()
        }
    })

    player = new Player( PlayerID );
    player.isMainPlayer = true;
    player.init();
    console.log(players);
}

import { World } from './world.js';

var textureLoader = new TextureLoader();
var newWorld = new World();

function loadEnvironment () {
    //var sphere_geometry = new SphereGeometry( 1 );
    //var sphere_material = new MeshNormalMaterial();
    //var sphere = new Mesh( sphere_geometry, sphere_material );
    //sphere.position.z = -5
    var textureLoader = new TextureLoader();
    const textureCube1 = [
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
        }),
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
        }),
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockTop.png")
        }),
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockButtom.png")
        }),
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
        }),
        new MeshStandardMaterial({
            //uniforms: {
                //sphereColour: {
                    //value: new Vector3(0, 0, 1)
                //}
            //},
            //vertexShader: _VS,
            //fragmentShader: _FS
            map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
        }),
    ]
    var grid = new GridHelper( 13, 13, 13 );
    grid.name = 'grid-ground';
    var highlighterGeo = new BoxGeometry( 1, 1 );
    var highlighterMat = new MeshStandardMaterial({ side: DoubleSide })
    var highlightMesh = new Mesh( highlighterGeo, highlighterMat );
    highlightMesh.position.y = -0.50 * 2
    grid.position.y = -0.50
    var planeGeo = new BoxGeometry ( 13, 0.1, 13 );
    var planeMat = new MeshStandardMaterial ( {color: "gray", wireframe: false, side: DoubleSide, visible: true} );
    var plane = new Mesh( planeGeo, planeMat );
    plane.position.y = -0.56
    var cube_geometry = new BoxGeometry( 1, 1, 1 );
	//var cube_material = new MeshStandardMaterial( {color: 0x77777ff, wireframe: false} );
    var cube = new Mesh( cube_geometry, textureCube1 );
    cube.position.z = -5
    cube.position.y = 1;
    plane.castShadow = true;
    plane.reciveShadow = true;
    cube.castShadow = true;
    cube.reciveShadow = true;
    var totalTime = 0.0;

    function _Step(timeElapsed) {
        const timeElapsedS = timeElapsed * 0.001;

        totalTime += timeElapsedS;
        const v = Math.sin(totalTime * 2.0) * 0.5 + 0.5;
        const sphereColour = cube.lerp(cube, v);

        cube.material.uniforms.sphereColour.value = sphereColour;
    }

    //window.addEventListener('mousemove', function(e) {
        //mousePosition.x = (e.clientX / this.window.innerWidth) * 2 - 1;
        //mousePosition.y = -(e.clientY / this.window.innerHeight) * 2 + 1;
        //raycaster.setFromCamera(mousePosition, camera);
        //Intersects = raycaster.intersectObjects(scene.children);
        //Intersects.forEach(function(Intersect) {
            //if (Intersect.object.name === 'grid-ground') {
                //const highlightPos = new THREE.Vector3().copy(Intersect.point).floor().addScalar(0.5);
                //highlightMesh.position.set(highlightPos.x, 0, highlightPos.z);
            //}
        //})
    //})
    
    //cube.receiveShadow = true;

    //scene.add( sphere );
    scene.add( cube, plane, grid, highlightMesh );
    //World.generateMeshes();
}
console.log(player, PlayerID);
export { newWorld as minecraftWorld };
export { textureLoader };
export { PlayerID };