import { PlayerControls } from 'http://127.0.0.1:5500/js/lib/PlayerControls.js';
import { World } from 'http://127.0.0.1:5500/mineyCraftyWorld.js';
//import { Sky } from 'three/examples/jsm/objects/Sky.js';

var player;

var c_start;
var c_end;

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

let itemsInInventory = [
    {
        "type": "minecraft:dirt",
        "amount": 1,
        "infiniteAmount": false
    },
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];
let adjectives = ["Cool", "Amazing", "Fast", "Brave", "Clever"];
let nouns = ["Tiger", "Eagle", "Shark", "Panther", "Wolf"];
let name;
let uid;
let nameTemplate = `{adjectives}{nouns}{numbers}`;
let uidTemplate = `{numbers}-{letters}`;
let uidLetters = ["aaaaaa", "aaaaab", "aaaaac", "aaaaad", "aaaaae", "aaaaaf"];

function generateUID () {
    uid = uidTemplate.replace(`{numbers}`, (Math.random() * 1000000).toFixed(0)).replace(`{letters}`, uidLetters[Math.floor(Math.random() * uidLetters.length)]);
    console.log(uid);
}

function generateName () {
    name = nameTemplate.replace(`{adjectives}`, adjectives[Math.floor(Math.random() * adjectives.length)]).replace(`{nouns}`, nouns[Math.floor(Math.random() * nouns.length)]).replace(`{numbers}`, (Math.random() * 1000).toFixed(0));
    console.log(name);
}

if (getCookie("player_name")) {
    name = getCookie("player_name");
    createCookie("player_name", name, 1000);
} else {
    generateName();
    createCookie("player_name", name, 1000);
}
if (getCookie("player_uid")) {
    uid = getCookie("player_uid");
    createCookie("player_uid", uid, 1000);
} else {
    generateUID();
    createCookie("player_uid", uid, 1000);
}

window.addEventListener("keyup", (e) => {
    if (e.key === "N") {
        window.open("http://127.0.0.1:5500/miney-crafty-username-changer.html");
    } else if (e.key === "n") {
        window.open("http://127.0.0.1:5500/miney-crafty-username-changer.html");
    }
});

import vertexShader from 'http://127.0.0.1:5500/shaders/vertexShader.glsl.js';
import fragmentShader from 'http://127.0.0.1:5500/shaders/fragmentShader.glsl.js';

            
            window.ShadersEnabled = true;
            var serverType = document.body.getAttribute('server-type');

            function StartGame (enableAnimations) {};
            function PauseGame (enableAnimations) {};

            function ShowGameMenu () {
                if (serverType === "null") {
                    document.querySelector('.game .menu').removeAttribute('hidden');
                    document.querySelector('.game .menu .save_disconnect').textContent = "Save and Quit to title";
                    PauseGame(true);
                }
                if (serverType === "Singleplayer") {
                    document.querySelector('.game .menu').removeAttribute('hidden');
                    document.querySelector('.game .menu .save_disconnect').textContent = "Save and Quit to title";
                    PauseGame(true);
                }
                if (serverType === "Multiplayer") {
                    document.querySelector('.game .menu').removeAttribute('hidden');
                    document.querySelector('.game .menu .save_disconnect').textContent = "Disconnect";
                }
            }

            function HideGameMenu () {
                if (serverType === "null") {
                    document.querySelector('.game .menu').setAttribute('hidden', '');
                    StartGame(true);
                }
                if (serverType === "Singleplayer") {
                    document.querySelector('.game .menu').setAttribute('hidden', '');
                    StartGame(true);
                }
                if (serverType === "Multiplayer") {
                    document.querySelector('.game .menu').setAttribute('hidden', '');
                }
            }

            var container, scene, camera, renderer;
            var controls;
            var current = 8;

            /*var color = 0xFFFFFF;
            var intensity = 3;
            var light = new DirectionalLight(color, intensity);
            light.position.set(-1, 2, 4);
            var light2 = new DirectionalLight(color, intensity);
            light2.position.set(1, -2, -4);*/

            window.FOV = 70;
            window.DefualtFOV = 70;
            window.SprintFOV = window.DefualtFOV + 5;
            window.normalFOV = 70;
            window.highFOV = 100;
            window.lowFOV = 30;
            window.near = 0.001;
            window.far = 5000;

            window.death = {
                'throwStrength': 2,
                'throwDirection': 'FrontLeft',
                'isFastRespwan': false
            }

            function respawn () {
                setTimeout(() => {
                    window.group.rotation.z = 0;
                    window.group.position.set(0, 0, 0);
                });
            }

            function knockback (group, direction, strength) {
                if (group && typeof direction === 'string' && typeof strength === 'number') {
                    if (direction === "FrontLeft") {
                        let knockbackInterval = setInterval(() => {
                            if (strength < 1) {
                                clearInterval(knockbackInterval);
                            } else {
                                group.position.x -= 0.01;
                                group.position.z -= 0.01;
                                strength = strength - 0.01;
                            }
                        });
                    } else if (direction === "FrontRight") {
                        let knockbackInterval = setInterval(() => {
                            if (strength < 1) {
                                clearInterval(knockbackInterval);
                            } else {
                                group.position.x += 0.01;
                                group.position.z -= 0.01;
                                strength = strength - 0.01;
                            }
                        });
                    } else if (direction === "BackLeft") {
                        let knockbackInterval = setInterval(() => {
                            if (strength < 1) {
                                clearInterval(knockbackInterval);
                            } else {
                                group.position.x -= 0.01;
                                group.position.z += 0.01;
                                strength = strength - 0.01;
                            }
                        });
                    } else if (direction === 'BackRight') {
                        let knockbackInterval = setInterval(() => {
                            if (strength < 1) {
                                clearInterval(knockbackInterval);
                            } else {
                                group.position.x += 0.01;
                                group.position.z += 0.01;
                                strength = strength - 0.01;
                            }
                        }, 5);
                    }
                    if (player) {player.jump(group, group.position.y + 1)};
                }
            }

            class HP {
                constructor (resourceOne, resourceTwo, resourceThree, regenerateAmount, data, camera) {
                    this.hpFullImg = resourceOne;
                    this.hpHalfImg = resourceTwo;
                    this.hpEmptyImg = resourceThree;
                    this.data = data;
                    this.regenerateAmount = regenerateAmount;
                    this.camera = camera;
                    this.init();
                }

                hpsCreated = 0;
                hpsInitalized = 0;
                itemCount = -1;
                beforeNewMax = 0;

                init () {
                    if (this.data.current < 1) {
                        this.death(window.death.throwStrength, window.death.throwDirection, window.death.isFastRespawn);
                    }
                    if (this.data.current > 20) {
                        document.querySelector('.bottom .topleft .hpBox').style.marginTop = "-" + (20 * 2 + 5) + "px";
                    }
                    if (this.data) {
                        if (this.data.max > 0) {
                            this.beforeNewMax = this.data.max;
                            this.hpsCreated = 0;
                            this.hpsInitalized = 0;
                            this.itemCount = -1;
                            document.querySelector('.bottom .topleft .hpBox').innerHTML = '';
                            this.createHP();
                        }
                    }
                }

                createHP () {
                    if (this.hpsCreated > this.data.max - 1) {
                        this.initalizeHPs();
                    } else {
                        this.hpsCreated += 2;
                        let hp = document.createElement('img');
                        hp.src = this.hpEmptyImg;
                        hp.style.marginRight = "-2px";
                        hp.width = "20";
                        hp.height = "20";
                        document.querySelector('.bottom .topleft .hpBox').appendChild(hp);
                        if (this.hpsCreated > this.data.max - 1) {
                            this.initalizeHPs();
                        } else {
                            this.createHP();
                        }
                    }
                }

                initalizeHPs () {
                    if (this.hpsInitalized < this.data.current) {
                        if (this.hpsInitalized + 2 > this.data.current) {
                            this.hpsInitalized += 1;
                            this.itemCount += 1;
                            let hp = document.querySelectorAll('.bottom .topleft .hpBox img').item(this.itemCount)
                            if (hp) {
                                hp.src = this.hpHalfImg;
                            }
                            if (this.hpsInitalized < this.data.current) {
                                this.initalizeHPs();
                            }
                        } else {
                            this.hpsInitalized += 2;
                            this.itemCount += 1;
                            let hp = document.querySelectorAll('.bottom .topleft .hpBox img').item(this.itemCount)
                            if (hp) {
                                hp.src = this.hpFullImg;
                            }
                            if (this.hpsInitalized < this.data.current) {
                                this.initalizeHPs();
                            }
                        }
                    }
                }

                death (throwStrength, throwDirection, isFastRespawn) {
                    if (isFastRespawn) {
                        respawn();
                    } else {
                        if (window.group) {
                            if (throwDirection === 'Left') {
                                let cancelPoint = window.group.rotation.z - 1.45;
                                let interval = setInterval(() => {
                                    if (window.group.rotation.z < cancelPoint) {
                                        window.group.rotation.z = cancelPoint;
                                        clearInterval(interval);
                                    } else {
                                        window.group.rotation.z -= 0.01;
                                    }
                                }, 5);
                            } else if (throwDirection === 'Right') {
                                let cancelPoint = window.group.rotation.z + 1.45;
                                let interval = setInterval(() => {
                                    if (window.group.rotation.z > cancelPoint) {
                                        window.group.rotation.z = cancelPoint;
                                        clearInterval(interval);
                                    } else {
                                        window.group.rotation.z += 0.01;
                                    }
                                }, 5);
                            } else {
                                let directionOptions = ["Left", "Right"];
                                let choosenOption = directionOptions[Math.floor(Math.random() * directionOptions.length)];
                                if (choosenOption === "Left") {
                                    let cancelPoint = window.group.rotation.z - 1.45;
                                    let interval = setInterval(() => {
                                        if (window.group.rotation.z < cancelPoint) {
                                            window.group.rotation.z = cancelPoint;
                                            clearInterval(interval);
                                        } else {
                                            window.group.rotation.z -= 0.01;
                                        }
                                    }, 5);
                                } else if (choosenOption === "Right") {
                                    let cancelPoint = window.group.rotation.z + 1.45;
                                    let interval = setInterval(() => {
                                        if (window.group.rotation.z > cancelPoint) {
                                            window.group.rotation.z = cancelPoint;
                                            clearInterval(interval);
                                        } else {
                                            window.group.rotation.z += 0.01;
                                        }
                                    }, 5);
                                }
                            }
                            knockback(window.group, throwDirection, throwStrength);
                        }
                    }
                } 

                update () {
                    this.init();
                }

                setRegenerateSpeed (ms) {
                    if (this.regenerateSpeed) {
                        clearInterval(this.regenerateSpeed);
                        this.regenerateSpeed = setInterval(() => {this.regenerateHP();}, ms);
                    } else {
                        this.regenerateSpeed = setInterval(() => {this.regenerateHP();}, ms);
                    }
                }

                removeRegenerate () {
                    clearInterval(this.regenerateSpeed);
                    this.regenerateSpeed = null;
                }

                setRegenerateAmount (n) {
                    this.regenerateAmount = n;
                }

                regenerateHP () {
                    if (hunger) {
                        if (hunger.getCurrentHunger() > 17) {
                            if (this.regenerateAmount && this.data.current < this.data.max + 1) {
                                if (this.data.current + this.regenerateAmount < this.data.max + 1) {
                                    this.data.current += this.regenerateAmount;
                                    this.update();
                                }
                            }
                        }
                    }
                }

                attackedAnimation () {
                    let soundEffect = document.createElement('audio');
                    soundEffect.src = "resources/Minecraft Hit.mp4";
                    soundEffect.play();
                    setTimeout(() => {
                        soundEffect.remove();
                    }, 1000);
                }

                reciveHPDataFromServer (msg) {
                    if (typeof msg === 'string') {

                    }
                }

                changeCurrentHP (n) {
                    if (this.data.current > 0) {
                        if (this.data.current > n) {
                            this.data.current = n;
                            this.attackedAnimation();
                            this.update();
                        } else {
                            this.data.current = n;
                            this.update();
                        }
                    } else {
                        this.data.current = n;
                        this.update();
                    }
                }

                changeMaximumHP (n) {
                    if (this.beforeNewMax > n) {
                        if (this.data.current > n) {
                            this.beforeNewMax = n;
                            this.data.max = n;
                            this.data.current = n;
                            this.attackedAnimation();
                            this.update();
                        } else {
                            this.beforeNewMax = n;
                            this.data.max = n;
                            this.update();
                        }
                    } else {
                        this.beforeNewMax = n;
                        this.data.max = n;
                        this.update();
                    }
                }

                getMaximumHP () {
                    return this.data.max;
                }

                getCurrentHP () {
                    return this.data.current;
                }
            }

            class Hunger {
                constructor (resourceOne, resourceTwo, resourceThree, removeAmount, data, camera, hp) {
                    this.hungerFullImg = resourceOne;
                    this.hungerHalfImg = resourceTwo;
                    this.hungerEmptyImg = resourceThree;
                    this.data = data;
                    this.camera = camera;
                    this.removeAmount = removeAmount;
                    this.itemCount = this.data.max / 2;
                    this.hpClass = hp;
                    this.init();
                }

                removeHungerSpeed;
                inter;
                hungersCreated = 0;
                hungersInitalized = 0;

                init () {
                    if (this.data) {
                        if (this.data.max > 0) {
                            this.hungersCreated = 0;
                            this.hungersInitalized = 0;
                            this.itemCount = this.data.max / 2;
                            document.querySelector('.bottom .topright .hungerBox').innerHTML = '';
                            this.createHunger();
                        }
                        clearInterval(this.inter);
                        this.inter = setInterval(() => {
                            if (this.hpClass.getCurrentHP() === 0) {
                                clearInterval(this.inter);
                            } else {
                                if (this.data.current === 0) {
                                    this.hpClass.changeCurrentHP(hp.getCurrentHP() - 1);
                                    this.hpClass.removeRegenerate(); 
                                } else {
                                    clearInterval(this.inter);
                                }
                            }
                        }, 1000);
                    }
                }

                createHunger () {
                    if (this.hungersCreated > this.data.max - 1) {
                        this.initalizeHungers();
                    } else {
                        this.hungersCreated += 2;
                        let hunger = document.createElement('img');
                        hunger.src = this.hungerEmptyImg;
                        hunger.width = "20";
                        hunger.height = "20";
                        document.querySelector('.bottom .topright .hungerBox').appendChild(hunger);
                        if (this.hungersCreated > this.data.max - 1) {
                            this.initalizeHungers();
                        } else {
                            this.createHunger();
                        }
                    }
                }

                initalizeHungers () {
                    if (this.hungersInitalized < this.data.current) {
                        if (this.hungersInitalized + 2 > this.data.current) {
                            this.hungersInitalized += 1;
                            this.itemCount -= 1;
                            let hunger = document.querySelectorAll('.bottom .topright .hungerBox img').item(this.itemCount)
                            if (hunger) {
                                hunger.src = this.hungerHalfImg;
                            }
                            if (this.hungersInitalized < this.data.current) {
                                this.initalizeHungers();
                            }
                        } else {
                            this.hungersInitalized += 2;
                            this.itemCount -= 1;
                            let hunger = document.querySelectorAll('.bottom .topright .hungerBox img').item(this.itemCount)
                            if (hunger) {
                                hunger.src = this.hungerFullImg;
                            }
                            if (this.hungersInitalized < this.data.current) {
                                this.initalizeHungers();
                            }
                        }
                    }
                }

                update () {
                    this.init();
                }

                reciveHungerDataFromServer (msg) {
                    if (typeof msg === 'string') {

                    }
                }

                changeCurrentHunger (n) {
                    this.data.current = n;
                    this.update();
                }

                getMaximumHunger () {
                    return this.data.max;
                }

                getCurrentHunger () {
                    return this.data.current;
                }

                setRemoveSpeed (ms) {
                    clearInterval(this.removeHungerSpeed);
                    this.removeHungerSpeed = setInterval(() => {this.removeHunger()}, ms);
                }

                feed (amount) {
                    if (this.data.current < this.data.max + 1) {
                        this.data.current += amount;
                        this.update();
                    }
                }

                setRemoveAmount (n) {
                    this.removeAmount = n;
                }

                removeHunger () {
                    if (this.data.current > 0) {
                        this.data.current -= this.removeAmount;
                        this.update();
                    }
                }
            }

            var hp;
            var hunger;
            var frame;

            window.settings = {
                "antialias": true,
                "TerrainRefresh": 100,
                "devicePixelRatio": window.devicePixelRatio,
                "onDevicePixelRatioChange": function () {
                    renderer.setPixelRatio(window.settings["devicePixelRatio"]);
                }
            }

            setTimeout(() => {
                //window.settings["devicePixelRatio"] = "0.0";
                //window.settings.onDevicePixelRatioChange();
            }, 10000);

              const skyGradientShader = {
                uniforms: {},
                vertexShader: `
                    void main() {
                        gl_Position = vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    void main() {
                        float v = gl_FragCoord.y / ${window.innerHeight.toFixed(50)};
                        gl_FragColor = vec4(0.5 * v, 0.5 * v, v, 1.0);
                    }
                `,
                depthWrite: false
              };

              const quadGeometry = new PlaneGeometry(2, 2);
              const gradientMaterial = new ShaderMaterial(skyGradientShader);
              const quadMesh = new Mesh(quadGeometry, gradientMaterial);
              const gradientScene = new Scene();
              gradientScene.add(quadMesh);

              const fogVertexShader = `
                    varying float vOpacity;
                    void main() {
                        vec3 pos = vec3(modelViewMatrix * vec4(position, 1.0));
                        vOpacity = pos.z * pos.z * 0.001;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `;

                const fogFragmentShader = `
                    varying float vOpacity;
                    void main() {
                        gl_FragColor = vec4(0.0, 0.0, 0.0, vOpacity);
                    }
                `;

                const fogMaterial = new ShaderMaterial({
                    vertexShader: fogVertexShader,
                    fragmentShader: fogFragmentShader,
                    transparent: true
                });

                const fogSphereGeometry = new SphereGeometry(10, 32, 32);
                const fogSphere = new Mesh(fogSphereGeometry, fogMaterial);

            function initGame () {

                container = document.querySelector('.game');

                camera = new PerspectiveCamera( window.FOV, window.innerWidth / window.innerHeight, window.near, window.far );
                hp = new HP("https://bananakitssu.github.io/resources/FullHP.png", "https://bananakitssu.github.io/resources/HalfHP.png", "https://bananakitssu.github.io/resources/EmptyHP.png", 1, {"max": 40, "current": 20}, camera);
                hp.setRegenerateSpeed(1000);
                hp.setRegenerateAmount(1);
                hunger = new Hunger("https://bananakitssu.github.io/resources/FullHunger.png", "https://bananakitssu.github.io/resources/HalfHunger.png", "https://bananakitssu.github.io/resources/EmptyHunger.png", 1, {"max": 20, "current": 20}, camera, hp);
                hunger.setRemoveSpeed(60000);
                hunger.setRemoveAmount(1);

                camera.position.z = 5;

                scene = new Scene();

                //scene.fog = new Fog(0x80a0e0, 0.1, 0);

                //scene.add(fogSphere);

                let testGeo = new BoxGeometry(1, 1, 1);
                let testMat = new ShaderMaterial(skyGradientShader);
                let testBlock = new Mesh(testGeo, testMat);
                testBlock.position.y = 6;
                //scene.add(testBlock);

                /*var color = 0xFFFFFF;
                var sunIntensity = 0.5;
                var moonIntensity = 0.2;
                var sunLight = new DirectionalLight(color, sunIntensity);
                sunLight.position.set(0, 100, 0);
                var sunLightLeft = new DirectionalLight(color, sunIntensity);
                sunLightLeft.position.set(-50, 100, 0);
                var sunLightRight = new DirectionalLight(color, sunIntensity);
                sunLightRight.position.set(50, 100, 0);
                var sunLightFront = new DirectionalLight(color, sunIntensity);
                sunLightFront.position.set(0, 100, -50);
                var sunLightBack = new DirectionalLight(color, sunIntensity);
                sunLightBack.position.set(0, 100, 50);
                var moonLight = new DirectionalLight(color, moonIntensity);
                moonLight.position.set(0, -100, 0);
                var moonLightLeft = new DirectionalLight(color, moonIntensity);
                moonLightLeft.position.set(-50, -100, 0);
                var moonLightRight = new DirectionalLight(color, moonIntensity);
                moonLightRight.position.set(50, -100, 0);
                var moonLightFront = new DirectionalLight(color, moonIntensity);
                moonLightFront.position.set(0, -100, -50);
                var moonLightBack = new DirectionalLight(color, moonIntensity);
                moonLightBack.position.set(0, -100, 50);
                //var light2 = new DirectionalLight(color, intensity);
                //light2.position.set(1, -2, -4);
                scene.add(sunLight, sunLightLeft, sunLightRight, sunLightFront, sunLightBack, moonLight, moonLightLeft, moonLightRight, moonLightFront, moonLightBack);*/

                //var intensity = 0.5;
                //var ambientLight = new AmbientLight(intensity);
                //var physics = new Physics();
                //var sky = new Sky(100, 100, 20);
                //scene.add(ambientLight, /*physics/*sky*/);

                /*const gameSky = new Sky();
                gameSky.scale.setScalar(450000); // Adjust the scale as needed
                scene.add(gameSky);

                const gameSun = new Vector3();
                //gameSun.position.set(100, 100, 20);

                const uniforms = sky.material.uniforms;
                uniforms['turbidity'].value = 10;
                uniforms['rayleigh'].value = 2;
                uniforms['mieCoefficient'].value = 0.005;
                uniforms['mieDirectionalG'].value = 0.8;

                const phi = THREE.MathUtils.degToRad(90 - 10);
                const theta = THREE.MathUtils.degToRad(180);

                gameSun.setFromSphericalCoords(1, phi, theta);
                uniforms['sunPosition'].value.copy(gameSun);*/
                var mineyCraftyCanvas = document.querySelector('.gameCanvas');
                renderer = new WebGLRenderer( { antialias: window.settings["antialias"], alpha: true, canvas: document.querySelector('.gameCanvas') } );
                renderer.setPixelRatio(window.settings["devicePixelRatio"]);
                renderer.setClearColor(0x80a0e0);
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = PCFSoftShadowMap;

                /*const composer = new EffectComposer(renderer);
                window.composer = composer;
                const renderPass = new RenderPass(scene, camera);
                composer.addPass(renderPass);

                const kernelSize = 25;
                const sigma = 4.0;
                const normalUVGenerator = new THREE.Passes.NormalUVGenerator();
                const effectPass = new THREE.UnrealBloomPass(normalUVGenerator, kernelSize, sigma);
                effectPass.renderToScreen = true;
                composer.addPass(effectPass);*/
                //renderer.shadowMap.enabled = true;

                //PlayerID = Math.random(0, 10000);
                //console.log(PlayerID);

                //firebase.auth().onAuthStateChanged(function( user ) {
                    //if ( user ) {
                        //PlayerID = user.uid;
                    //	loadGame();
                    //} else {
                    //	firebase.auth().signInAnonymously().then(user => {/*PlayerID = user.uid*/}).catch(function(error) {
                    //		console.log( error.code + ": " + error.message );
                    //	});
                    //	loadGame();
                    //}
                //});

                renderer.domElement.addEventListener('click', () => {
                    if (document.querySelector('.menu').hasAttribute('hidden')) {
                        renderer.domElement.requestPointerLock();
                    }
                });

                document.addEventListener('pointerlockchange', () => {
                    if (document.pointerLockElement === renderer.domElement) {
                      document.addEventListener('mousemove', onMouseMove, false);
                    } else {
                      document.removeEventListener('mousemove', onMouseMove, false);
                    }
                  }, false);

                window.addEventListener( 'resize', onWindowResize, false );

                renderer.domElement.style.position = "absolute";
                renderer.domElement.style.top = "0%";
                renderer.domElement.style.left = "0%";
                renderer.domElement.style.zIndex = "-2";
                //container.appendChild( renderer.domElement );
                var PlayerID = "Player - " + Math.random(500000, 0) + "";
                player = new Player( PlayerID );
                player.isMainPlayer = true;
                player.init();
                //camera.shadowMap.enabled = true;
                console.log(player);
                var mcButtonDeactivatedGeo = new BoxGeometry( 0.6, 0.4, 0.2 );
                var mcButtonDeactivatedMat = [
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    })
                ]
                var mcButtonDeactivated = new Mesh( mcButtonDeactivatedGeo, mcButtonDeactivatedMat );
                mcButtonDeactivated.castShadow = true;
                mcButtonDeactivated.receiveShadow = true;
                scene.add(mcButtonDeactivated);
                var mcButtonActivatedGeo = new BoxGeometry( 0.6, 0.4, 0.1 );
                var mcButtonActivatedMat = [
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    })
                ]
                var mcButtonActivated = new Mesh( mcButtonActivatedGeo, mcButtonActivatedMat );
                mcButtonActivated.castShadow = true;
                mcButtonActivated.receiveShadow = true;
                mcButtonActivated.position.x = -1
                scene.add(mcButtonActivated);
                var mcPresureplateDeactivatedGeo = new BoxGeometry( 0.8, 0.1, 0.8 );
                var mcPresureplateDeactivatedMat = [
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    }),
                    new MeshBasicMaterial({

                    })
                ]
                var mcPresureplateDeactivated = new Mesh( mcPresureplateDeactivatedGeo, mcPresureplateDeactivatedMat );
                mcPresureplateDeactivated.castShadow = true;
                mcPresureplateDeactivated.receiveShadow = true;
                mcPresureplateDeactivated.position.x = -2
                scene.add(mcPresureplateDeactivated);
                //var newWorld = new World({width: 8, height: 8});
                //newWorld.generate();
                //document.addEventListener('keypress', (e) => {
                    //if (e.key == "o") {
                        //current++;
                        //newWorld = new World({width: current, height: current});
                        //newWorld.generate();
                    //}
                //})
                var textureLoader = new TextureLoader();
                var mcBoat = new Group();
                var mcBoatBottomGeo = new BoxGeometry( 1.1, 0.1, 2.4 );
                var mcBoatBottomMat = [
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/Log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ];
                var mcBoatBottom = new Mesh( mcBoatBottomGeo, mcBoatBottomMat );
                mcBoatBottom.castShadow = true;
                mcBoatBottom.receiveShadow = true;
                mcBoatBottom.position.x = 0;
                mcBoat.add(mcBoatBottom);
                var mcBoatLeftGeo = new BoxGeometry( 0.1, 0.65, 2.4 );
                var mcBoatLeftMat = [
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ];
                var mcBoatLeft = new Mesh( mcBoatLeftGeo, mcBoatLeftMat );
                mcBoatLeft.castShadow = true;
                mcBoatLeft.receiveShadow = true;
                mcBoatLeft.position.x = -0.5;
                mcBoatLeft.position.y = 0.35;
                var mcBoatRightGeo = new BoxGeometry( 0.1, 0.65, 2.4 );
                var mcBoatRightMat = [
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ];
                var mcBoatRight = new Mesh( mcBoatRightGeo, mcBoatRightMat );
                mcBoatRight.castShadow = true;
                mcBoatRight.receiveShadow = true;
                mcBoatRight.position.x = 0.5;
                mcBoatRight.position.y = 0.35;
                var mcBoatFrontGeo = new BoxGeometry( 1, 0.65, 0.1 );
                var mcBoatFrontMat = [
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ];
                var mcBoatFront = new Mesh( mcBoatFrontGeo, mcBoatFrontMat );
                mcBoatFront.castShadow = true;
                mcBoatFront.receiveShadow = true;
                mcBoatFront.position.x = 0;
                mcBoatFront.position.y = 0.35;
                mcBoatFront.position.z = -1.2;
                var mcBoatBackGeo = new BoxGeometry( 1, 0.65, 0.1 );
                var mcBoatBackMat = [
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial ({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ];
                var mcBoatBack = new Mesh( mcBoatBackGeo, mcBoatBackMat );
                mcBoatBack.castShadow = true;
                mcBoatBack.receiveShadow = true;
                mcBoatBack.position.x = 0;
                mcBoatBack.position.y = 0.35;
                mcBoatBack.position.z = 1.2;
                var paddle = new Group();
                var mcBoatPaddleTopLeftGeo = new BoxGeometry( 0.3, 0.3, 2.2 );
                var mcBoatPaddleTopLeftMat = [
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ]
                var mcBoatPaddleTopLeft = new Mesh( mcBoatPaddleTopLeftGeo, mcBoatPaddleTopLeftMat );
                mcBoatPaddleTopLeft.rotation.x = 1;
                mcBoatPaddleTopLeft.rotation.y = -0.5;
                mcBoatPaddleTopLeft.position.x = 1;
                var mcBoatPaddleBottomLeftGeo = new BoxGeometry( 1, 0.1, 1 );
                var mcBoatPaddleBottomLeftMat = [
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ]
                var mcBoatPaddleBottomLeft = new Mesh( mcBoatPaddleBottomLeftGeo, mcBoatPaddleBottomLeftMat );
                mcBoatPaddleBottomLeft.rotation.x = 1;
                mcBoatPaddleBottomLeft.rotation.y = -0.5;
                mcBoatPaddleBottomLeft.position.x = 0.4;
                mcBoatPaddleBottomLeft.position.y = -1;
                mcBoatPaddleBottomLeft.position.z = 0.5;
                var paddle2 = new Group();
                var mcBoatPaddle2TopRightGeo = new BoxGeometry( 0.3, 0.3, 2.2 );
                var mcBoatPaddle2TopRightMat = [
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ]
                var mcBoatPaddle2TopRight = new Mesh( mcBoatPaddle2TopRightGeo, mcBoatPaddle2TopRightMat );
                mcBoatPaddle2TopRight.rotation.x = 1;
                mcBoatPaddle2TopRight.rotation.y = 0.5;
                mcBoatPaddle2TopRight.position.x = 1;
                var mcBoatPaddle2BottomRightGeo = new BoxGeometry( 1, 0.1, 1 );
                var mcBoatPaddle2BottomRightMat = [
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    }),
                    new MeshBasicMaterial({
                        map: textureLoader.load('http://127.0.0.1:5500/textures/log.jpg')
                    })
                ]
                var mcBoatPaddle2BottomRight = new Mesh( mcBoatPaddle2BottomRightGeo, mcBoatPaddle2BottomRightMat );
                mcBoatPaddle2BottomRight.rotation.x = 1;
                mcBoatPaddle2BottomRight.rotation.y = 0.5;
                mcBoatPaddle2BottomRight.position.x = 1.5;
                mcBoatPaddle2BottomRight.position.y = -1.2;
                mcBoatPaddle2BottomRight.position.z = 0.5;
                paddle.add(mcBoatPaddleTopLeft, mcBoatPaddleBottomLeft);
                paddle2.add(mcBoatPaddle2TopRight, mcBoatPaddle2BottomRight);
                paddle.position.x = -2;
                paddle2.position.x = 0;
                paddle.position.y = 0.5;
                paddle2.position.y = 0.5;
                mcBoat.position.x = 0;
                mcBoat.position.y = 5;
                mcBoat.add(mcBoatLeft, mcBoatRight, mcBoatFront, mcBoatBack, paddle, paddle2);
                scene.add(mcBoat);
                mcBoat.isBoat = true;
                let boatGravity = 0.000;
                setInterval(() => {
                    mcBoat.position.z += 0.001;
                    /*if (getBlockByPosition(Math.trunc(mcBoat.position.x), Math.round(mcBoat.position.y - 1), Math.trunc(mcBoat.position.z))) {

                    } else {
                        if (boatGravity < 0.1) {
                            boatGravity = boatGravity + 0.00005;
                        }
                        mcBoat.position.y -= boatGravity;
                    }*/
                }, 1);
                scene.castShadow = true;
                scene.receiveShadow = true;
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                var inventory = [
                    { name: 'Stone', x: 10, y: 10, width: 50, height: 50 },
                    { name: 'Wood', x: 70, y: 10, width: 50, height: 50 },
                    // Add more items as needed
                ];

                function drawInventory() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    inventory.forEach(item => {
                        ctx.fillStyle = 'gray'; // Placeholder color for items
                        ctx.fillRect(item.x, item.y, item.width, item.height);
                        ctx.fillStyle = 'black';
                        ctx.fillText(item.name, item.x + 5, item.y + 25);
                    });
                }

                /*canvas.addEventListener('click', (event) => {
                    const rect = canvas.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                
                    inventory.forEach(item => {
                        if (x > item.x && x < item.x + item.width && y > item.y && y < item.y + item.height) {
                            console.log(`Clicked on ${item.name}`);
                        }
                    });
                });                

                canvas.style.position = "absolute";
                canvas.style.zIndex = 100;
                document.body.appendChild(canvas);
                canvas.style.width = "100%";
                canvas.style.height = "100%";
                canvas.style.top = "0%";
                canvas.style.left = "0%";
                //drawInventory();*/
                function createElement (html) {
                    var template = document.createElement('template');
                    //var code = html;
                    //template.appendChild(code);

                    return template;
                }
                var sky = createElement(`<sky />`);
                document.body.appendChild(sky);
                document.querySelector('.game').addEventListener('click', (e) => {
                    if (document.querySelector('.menu').hasAttribute('hidden')) {
                        document.querySelector('.game').requestPointerLock();
                    }
                });

                document.addEventListener('pointerlockchange', () => {
                    if (document.pointerLockElement === document.querySelector('.game')) {
                        document.addEventListener('mousemove', onMouseMove, false);
                    } else {
                        ShowGameMenu();
                        document.removeEventListener('mousemove', onMouseMove, false);
                    }
                });
                const moonTexture = new TextureLoader().load('https://bananakitssu.github.io/resources/MCMoon.png');

                // Create the moon geometry and material
                const moonGeometry = new BoxGeometry(0, 32, 32);
                const moonMaterial = new MeshBasicMaterial({ map: moonTexture });
                const moon = new Mesh(moonGeometry, moonMaterial);

                // Position the moon and sun
                moon.position.set(50 + window.group.position.x, window.group.position.y, window.group.position.z);

                const sunTexture = new TextureLoader().load('https://bananakitssu.github.io/resources/MCSun.png');

                // Create the sun geometry and material
                //const sunGeometry = new BoxGeometry(0, 32, 32);
                //const sunMaterial = new MeshBasicMaterial({ map: sunTexture });
                //const sun = new Mesh(sunGeometry, sunMaterial);

                //sun.position.set(-50 + window.group.position.x, window.group.position.y, window.group.position.z);

                //scene.add(sun, moon);
                //window.moon = moon;
                //window.sun = sun;

                var canvasElement = document.querySelector('.joystick');
                var joystick = canvasElement.getContext('2d');

                let joystickElement = {
                    x: canvasElement.width / 2,
                    y: canvasElement.height / 2,
                    radius: 50,
                    color: 'blue',
                    isDragging: false
                };

                function drawJoystick() {
                    joystick.clearRect(0, 0, canvasElement.width, canvasElement.height);
                    joystick.beginPath();
                    joystick.arc(joystickElement.x, joystickElement.y, joystickElement.radius, 0, Math.PI * 2);
                    joystick.fillStyle = joystickElement.color;
                    joystick.fill();
                    joystick.closePath();
                }

                canvasElement.addEventListener('mousedown', (e) => {
                    const rect = canvasElement.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    const dx = mouseX - joystickElement.x;
                    const dy = mouseY - joystickElement.y;
                    if (Math.sqrt(dx * dx + dy * dy) < joystickElement.radius) {
                        joystickElement.isDragging = true;
                    }
                });

                canvasElement.addEventListener('mousemove', (e) => {
                    if (joystickElement.isDragging) {
                        const rect = canvasElement.getBoundingClientRect();
                        joystickElement.x = e.clientX - rect.left;
                        joystickElement.y = e.clientY - rect.top;
                        drawJoystick();
                    }
                });

                canvasElement.addEventListener('mouseup', () => {
                    joystickElement.isDragging = false;
                });

                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    // Code for mobile devices
                    console.log("User is on a mobile device");
                } else {
                    // Code for desktop devices
                    console.log("User is on a desktop device");
                    drawJoystick();
                }

                /*var BlockGeometry = new BoxGeometry( 1, 1, 1 );
                var GrassBlockMaterial = [
                    new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader }),
                    /*new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader  }),
                    /*new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader  }),
                    /*new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockBottom.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader  }),
                    /*new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader  }),
                    /*new ShaderMaterial({ /*map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png'), *//*vertexShader: vertexShader, fragmentShader: fragmentShader  })
                /*]
                var GrassBlock = new Mesh( BlockGeometry, GrassBlockMaterial );
                GrassBlock.position.y -= 1;
                scene.add(GrassBlock);*/

                var frameGeometry = new PlaneGeometry(2.5, 0.5);
                var frameMaterial = new MeshBasicMaterial({ color: 0x000000, side: DoubleSide });
                frame = new Mesh(frameGeometry, frameMaterial);
                frame.position.set(0, 2, -0.1);
                frame.position.set(window.group.position.x, window.group.getObjectByName(PlayerID + " - Player Head").position.y + 1.5, window.group.position.z);
                scene.add(frame);

                /*var gameCanvases = document.querySelectorAll('.game canvas');
                var sky = document.createElement('sky');
                gameCanvases.forEach(gameCanvas => {
                    if (gameCanvas.hasAttribute('data-engine')) {
                        sky.setAttribute('sunPosition', '{"X":100, "Y":100, "Z":20}');
                        gameCanvas.appendChild(sky);
                        if (sky.hasAttribute('sunPosition')) {
                            var sunPosX = JSON.parse(sky.getAttribute('sunPosition')).X;
                            var sunPosY = JSON.parse(sky.getAttribute('sunPosition')).Y;
                            var sunPosZ = JSON.parse(sky.getAttribute('sunPosition')).Z;
                            
                            if (sunPosX) {
                                if (sunPosY) {
                                    if (sunPosZ) {
                                        sun.position.set(sunPosX, sunPosY, sunPosZ);
                                        color = 0xFFFFFF;
                                        intensity = 100;
                                        var sunLight = new DirectionalLight(color, intensity);
                                        sunLight.position.set(sunPosX, sunPosY, sunPosZ);

                                        scene.add(sunLight);
                                    }
                                }
                            }
                        }
                    }
                })*/

                    scene.add(terrainGroup);
                    getBlocks('http://127.0.0.1:5503/$Server_/Json/Terrain.json');

                var Water100Geo = new BoxGeometry( 1, 0.8, 1 );
                var Water100Mat = new MeshBasicMaterial( { color: "blue", wireframe: false } );
                var Water100 = new Mesh( Water100Geo, Water100Mat );
                Water100.position.y -= 0.1;

                scene.add(Water100);
                /*var chunkSize = 10;
                var chunk = new Uint8Array(chunkSize * chunkSize * chunkSize);

                var ChunkGeometry = new BoxGeometry(1, 1, 1);
                var ChunkMaterial = new MeshLambertMaterial({color: 0x00d000});

                for (let y = 0; y < chunkSize; ++y) {
                    for (let z = 0; z < chunkSize; ++z) {
                        for (let x = 0; x < chunkSize; ++x) {
                            var offset = y * chunkSize * chunkSize + z * chunkSize + x;
                            var voxel = chunk[offset];
                            var mesh = new Mesh(ChunkGeometry, ChunkMaterial);
                            mesh.position.set(x, y, z);
                            scene.add(mesh);
                        }
                    }
                }*/
                    const cellSize = 12;
                    const cell = new Uint8Array( cellSize * cellSize * cellSize );
                    for ( let y = 0; y < cellSize; ++ y ) {
                
                        for ( let z = 0; z < cellSize; ++ z ) {
                
                            for ( let x = 0; x < cellSize; ++ x ) {
                
                                const height = ( Math.sin( x / cellSize * Math.PI * 4 ) + Math.sin( z / cellSize * Math.PI * 6 ) ) * 20 + cellSize / 2;
                                if ( height > y && height < y + 1 ) {
                
                                    const offset = y * cellSize * cellSize +
                                       z * cellSize +
                                       x;
                                    cell[ offset ] = 1;
                
                                }
                
                            }
                
                        }
                
                    }
                
                    const geometry = new BoxGeometry( 1, 1, 1 );
                    const material = new MeshPhongMaterial( { color: 'green', transparent: true, opacity: 0 } );
                
                    for ( let y = 0; y < cellSize; ++ y ) {
                
                        for ( let z = 0; z < cellSize; ++ z ) {
                
                            for ( let x = 0; x < cellSize; ++ x ) {
                
                                const offset = y * cellSize * cellSize +
                                       z * cellSize +
                                       x;
                                const block = cell[ offset ];
                                if ( block ) {
                
                                    const mesh = new Mesh( geometry, material );
                                    mesh.position.set( x, y, z );
                                    scene.add( mesh );
                
                                }
                
                            }
                
                        }
                
                    }
            };

            

            class Particle {
                constructor (Block, Player, VisibleToPlayer, Texture, GIFTexture, RepeatGIFTexture, Spread, SpreadSpeed, Amount, Location, Gravity, Collision, ContextType, GenerateTime, DespawnTime) {

                }
            }

            window.cloudSpawnTimer = 0;
            window.cloudSizeY = 2;
            window.cloudSpeed = 0;

            function createCloudGroup () {
                var group = new Group();
                group.name = "Clouds";
                group.position.y = -30;
                group.position.x = -15;
                scene.add(group);
            }

            window.addEventListener('mousemove', (e) => {
                var HoldingItem = document.querySelector('.inventory-div *[holding="true"]');
                if (HoldingItem) {
                    HoldingItem.style.top = `${e.clientY + 10}px`;
                    HoldingItem.style.left = `${e.clientX - 30}px`;
                    if (!HoldingItem.style.position === "absolute") {
                        HoldingItem.style.position = "absolute";
                    }
                }
            });

            var inventoryItems = document.querySelectorAll('.inventory-div #slot');
            var inventoryDiv = document.querySelector('.inventory-div');

            var log = document.querySelector('.item');
            if (log) {
                var count = Number(log.querySelector('.item-count').textContent);
                window.logCount = count;
            } else {
                var count = 0;
                window.logCount = count;
            }

            function grabItem (block, max, value, type) {
                if (type === "Oak log") {
                    if (block) {} else {};
                    if (!inventoryDiv.hasAttribute('full')) {
                        if (window.logCount >= max + 1) {

                        } else {
                            var log = document.querySelector('.item');
                            if (!log) {
                                log = document.createElement('div');
                                log.className = "item";
                                var logImage = document.createElement('img');
                                logImage.src = "resources/OakLogItem.png";
                                logImage.className = "item-img";
                                logImage.width = "30";
                                logImage.height = "30";
                                var logCount = document.createElement('div');
                                logCount.textContent = "1";
                                logCount.className = "item-count";
                                var logHp = document.createElement('div');
                                logHp.setAttribute('value', '81');
                                logHp.setAttribute('max', '100');
                                logHp.setAttribute('durability', '1000');
                                logHp.setAttribute('hidden', '');
                                logHp.className = "item-hp";
                                var logHpBar = document.createElement('div');
                                logHpBar.className = "item-hp-bar";
                                document.querySelector('.inventory-div .row-1 .slot-1').appendChild(log);
                                log.appendChild(logImage);
                                log.appendChild(logCount);
                                log.appendChild(logHp);
                                logHp.appendChild(logHpBar);
                                log.setAttribute('type', 'Oak Log');
                                var count = Number(log.querySelector('.item-count').textContent);
                                var durability = value.durability;
                                var durabilityUsed = value.durabilityUsed;
                                var sound = document.createElement('audio');
                                sound.src = "resources/Minecraft Item Pickup.mp4";
                                sound.play();
                                window.logCount = count;
                                setTimeout(() => {
                                    sound.remove();
                                }, 500);
                                if (durability === "?") {
                                    log.querySelector('.item-hp').setAttribute('hidden', '');
                                    log.querySelector('.item-count').textContent = count;
                                    log.querySelector('.item-img').style.height = `40px`;
                                    log.querySelector('.item-img').style.margin = `-10px 2.5px 2.5px`;
                                    log.querySelector('.item-img').style.position = `absolute`;
                                    setTimeout(() => {
                                        log.querySelector('.item-img').style.height = `30px`;
                                        log.querySelector('.item-img').style.margin = `2.5px 2.5px 2.5px`;
                                        setTimeout(() => {
                                            log.querySelector('.item-img').style.position = `relative`;
                                        }, 100);
                                    }, 100);
                                } else {
                                    log.querySelector('.item-hp').removeAttribute('hidden');
                                    log.querySelector('.item-hp div').style.width = durability / durabilityUsed + "%";
                                    log.querySelector('.item-img').style.height = `40px`;
                                    log.querySelector('.item-img').style.margin = `-10px 2.5px -2.5px`;
                                    log.querySelector('.item-img').style.position = `absolute`;
                                    setTimeout(() => {
                                        log.querySelector('.item-img').style.height = `30px`;
                                        log.querySelector('.item-img').style.margin = `2.5px 2.5px 2.5px`;
                                        setTimeout(() => {
                                            log.querySelector('.item-img').style.position = `relative`;
                                        }, 100);
                                    }, 100);
                                }
                            } else {
                                var count = Number(log.querySelector('.item-count').textContent);
                                var durability = value.durability;
                                var durabilityUsed = value.durabilityUsed;
                                var sound = document.createElement('audio');
                                sound.src = "resources/Minecraft Item Pickup.mp4";
                                sound.play();
                                window.logCount = count;
                                setTimeout(() => {
                                    sound.remove();
                                }, 500);
                                if (durability === "?") {
                                    log.querySelector('.item-hp').setAttribute('hidden', '');
                                    log.querySelector('.item-count').textContent = count + value.number;
                                    log.querySelector('.item-img').style.height = `40px`;
                                    log.querySelector('.item-img').style.margin = `-10px 2.5px 2.5px`;
                                    log.querySelector('.item-img').style.position = `absolute`;
                                    setTimeout(() => {
                                        log.querySelector('.item-img').style.height = `30px`;
                                        log.querySelector('.item-img').style.margin = `2.5px 2.5px 2.5px`;
                                        setTimeout(() => {
                                            log.querySelector('.item-img').style.position = `relative`;
                                        }, 100);
                                    }, 100);
                                } else {
                                    log.querySelector('.item-hp').removeAttribute('hidden');
                                    log.querySelector('.item-hp div').style.width = durability / durabilityUsed + "%";
                                    log.querySelector('.item-img').style.height = `40px`;
                                    log.querySelector('.item-img').style.margin = `-10px 2.5px -2.5px`;
                                    log.querySelector('.item-img').style.position = `absolute`;
                                    setTimeout(() => {
                                        log.querySelector('.item-img').style.height = `30px`;
                                        log.querySelector('.item-img').style.margin = `2.5px 2.5px 2.5px`;
                                        setTimeout(() => {
                                            log.querySelector('.item-img').style.position = `relative`;
                                        }, 100);
                                    }, 100);
                                }
                            }
                        }
                    }
                }
            }

            //document.querySelector('.pickupLog').addEventListener('click', () => {
                grabItem(null, 64, {number: 1, durability: "?", durabilityUsed: "?"}, "Oak log");
            //})

            /*setInterval(() => {
                grabItem(null, 64, {number: 1, durability: "?", durabilityUsed: "?"}, "Oak log");
            }, 1000);*/

            inventoryItems.forEach((inventoryItem) => {
                inventoryItem.addEventListener('click', (e) => {
                    var item = inventoryItem.querySelector('.item');
                    if (item) {
                        var HoldingItem = document.querySelector('.inventory-div *[holding="true"]');
                        if (!HoldingItem) {
                            var x = e.clientX - 30;
                            var y = e.clientY + 10;
                            inventoryItem.querySelector('.item').setAttribute('rownumber', inventoryItem.parentElement.getAttribute('rownumber'));
                            inventoryItem.querySelector('.item').style.position = "absolute";
                            inventoryItem.querySelector('.item').style.top = `${y}px`;
                            inventoryItem.querySelector('.item').style.left = `${x}px`;
                            inventoryItem.querySelector('.item').setAttribute('holding', 'true');
                            inventoryItem.querySelector('.item').setAttribute('slotnumber', inventoryItem.getAttribute('slotnumber'));
                            inventoryDiv.appendChild(inventoryItem.querySelector('.item'));
                        } else {
                            if (!item.getAttribute('type') === HoldingItem.getAttribute('type')) {
                                var x = e.clientX - 30;
                                var y = e.clientY + 10;
                                item.setAttribute('holding', 'true');
                                item.setAttribute('rownumber', inventoryItem.parentElement.getAttribute('rownumber'));
                                item.style.position = "absolute";
                                item.style.top = `${y}px`;
                                item.style.left = `${x}px`;
                                item.setAttribute('slotnumber', inventoryItem.getAttribute('slotnumber'));
                                HoldingItem.removeAttribute('holding');
                                item.parentElement.appendChild(HoldingItem);
                                inventoryDiv.appendChild(item);
                            } else {
                                item.querySelector('.item-count').textContent = Number(item.querySelector('.item-count').textContent) + Number(HoldingItem.querySelector('.item-count').textContent);
                                HoldingItem.remove();
                            }
                        }
                    } else {
                        var HoldingItem = document.querySelector('.inventory-div *[holding="true"]');
                        if (HoldingItem) {
                            var x = `0`;
                            var y = `0`;
                            HoldingItem.style.position = "relative";
                            HoldingItem.style.top = `${y}px`;
                            HoldingItem.style.left = `${x}px`;
                            HoldingItem.removeAttribute('holding');
                            var slots = document.querySelectorAll('.inventory-div #slot');
                            slots.forEach(itemSlot => {
                                if (itemSlot.getAttribute('slotnumber') === inventoryItem.getAttribute('slotnumber')) {
                                    HoldingItem.setAttribute('slotnumber', inventoryItem.getAttribute('slotnumber'));
                                    var itemRow = inventoryItem.parentElement.getAttribute('rownumber');
                                    var slot = inventoryItem.getAttribute('slotnumber');
                                    HoldingItem.setAttribute('rownumber', itemRow);
                                    document.querySelector('.inventory-div *[rownumber="' + itemRow + '"] *[slotnumber="' + slot + '"]').appendChild(HoldingItem);
                                }
                            })
                        }
                    }
                });
                inventoryItem.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    var HoldingItem = document.querySelector('.inventory-div *[holding="true"]');
                    if (!HoldingItem) {
                        var item = inventoryItem.querySelector('.item');
                        var count = Number(item.querySelector('.item-count').textContent);
                        var countElement = item.querySelector('.item-count');
                        countElement.textContent = Math.round(count / 2);
                        var remaining = Math.trunc(count - count / 2);
                        log = document.createElement('div');
                        log.className = "item";
                        var logImage = document.createElement('img');
                        logImage.src = "resources/OakLogItem.png";
                        logImage.className = "item-img";
                        logImage.width = "30";
                        logImage.height = "30";
                        var logCount = document.createElement('div');
                        logCount.textContent = remaining;
                        logCount.className = "item-count";
                        var logHp = document.createElement('div');
                        logHp.setAttribute('value', '81');
                        logHp.setAttribute('max', '100');
                        logHp.setAttribute('durability', '1000');
                        logHp.setAttribute('hidden', '');
                        logHp.className = "item-hp";
                        var logHpBar = document.createElement('div');
                        logHpBar.className = "item-hp-bar";
                        log.setAttribute('holding', 'true');
                        log.style.top = `${e.clientY}px`;
                        log.style.left = `${e.clientX}px`;
                        log.style.position = "absolute";
                        document.querySelector('.inventory-div').appendChild(log);
                        log.appendChild(logImage);
                        log.appendChild(logCount);
                        log.appendChild(logHp);
                        logHp.appendChild(logHpBar);
                    } else {

                    }
                })
            });

            const voxelSize = 1;
            const voxelGeometry = new BoxGeometry(voxelSize, voxelSize, voxelSize);
            const voxelMaterial = new MeshBasicMaterial({ color: 0x00ff00 });

            function addBlock(x, y, z) {
                const block = new Mesh(voxelGeometry, voxelMaterial);
                block.position.set(x, y, z);
                scene.add(block);
                blocks.push(block);
            }            

            const blocks = [];
            const raycaster = new Raycaster();
            const mouse = new Vector2();

            function onMouseRightClick(event) {
                /*mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(blocks);

                if (intersects.length > 0) {
                    const intersectedBlock = intersects[0].object;
                    scene.remove(intersectedBlock);
                    blocks = blocks.filter(block => block !== intersectedBlock);
                }*/
                   /* if (raycaster && mouse) {
                        raycaster.setFromCamera(mouse, camera);
                        const intersects = raycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                //console.log(intersect);
                                if (intersect["distance"] < 5.1) {
                                    blockSelectHighlightGroup.position.set(intersect.object.position.x, intersect.object.position.y, intersect.object.position.z);
                                    blockSelectHighlightGroup.visible = true;
                                } else {
                                    blockSelectHighlightGroup.visible = false;
                                }
                            } else {
                                blockSelectHighlightGroup.visible = false;
                            }
                        } else {
                            blockSelectHighlightGroup.visible = false;
                        }
                    }*/
            }

            window.addEventListener('contextmenu', onMouseRightClick, false);
            

            var craftItems = document.querySelectorAll('.craft-input #slot');
            var craftDiv = document.querySelector('.craft-input');

            craftItems.forEach((craftItem) => {
                craftItem.addEventListener('click', (e) => {
                    var item = craftItem.querySelector('.item');
                    if (item) {
                        var HoldingItem = document.querySelector('.inventory-div *[holding="true"]');
                        if (!HoldingItem) {
                            var x = e.clientX;
                            var y = e.clientY;
                            craftItem.querySelector('.item').style.position = "absolute";
                            craftItem.querySelector('.item').style.top = `${y}px`;
                            craftItem.querySelector('.item').style.left = `${x}px`;
                            craftItem.querySelector('.item').setAttribute('holding', 'true');
                            craftItem.querySelector('.item').setAttribute('slotnumber', inventoryItem.getAttribute('slotnumber'));
                            craftDiv.appendChild(craftItem.querySelector('.item'));
                        }
                    } else {
                        var HoldingItem = document.querySelector('.craft-input *[holding="true"]');
                        if (HoldingItem) {
                            var x = `0`;
                            var y = `0`;
                            HoldingItem.style.position = "relative";
                            HoldingItem.style.top = `${y}px`;
                            HoldingItem.style.left = `${x}px`;
                            HoldingItem.removeAttribute('holding');
                            var slots = document.querySelectorAll('.craft-input #slot');
                            slots.forEach(itemSlot => {
                                if (itemSlot.getAttribute('slotnumber') === craftItem.getAttribute('slotnumber')) {
                                    HoldingItem.setAttribute('slotnumber', craftItem.getAttribute('slotnumber'));
                                    itemSlot.appendChild(HoldingItem);
                                }
                            })
                        }
                    }
                })
            })

            //createCloudGroup();

            function setCloudMoveSpeed ( speed ) {
                window.cloudSpeed = speed;
            }

            function setCloudSpawnSpeed ( spawnSpeed ) {
                window.cloudSpawnTimer = spawnSpeed;
            }

            function setCloudZ ( z ) {
                window.cloudZ = z;
            }

            //console.log(Math.);
            //console.log(["1", "0.5", "5", "0", "2"][Math.floor(Math.random() * ["1", "0.5"].length)]);

            function createCloud () {
                setTimeout(() => {
                    setCloudMoveSpeed( 0.5 );
                    setCloudSpawnSpeed( ["3000", "5000", "5000", "7000", "9000"][Math.floor(Math.random() * ["3000", "5000", "5000", "7000", "9000"].length)] );
                    setCloudZ( ["10", "20", "35", "50", "89", "26","-10", "-20", "-35", "-50", "-89", "-26"][Math.floor(Math.random() * ["10", "20", "35", "50", "89", "26","-10", "-20", "-35", "-50", "-89", "-26"].length)] );
                    var cloudSizeX = 10;
                    var cloudSizeY = window.cloudSizeY;
                    var cloudSizeZ = 10;
                    var cloudMaterial = new MeshBasicMaterial( { color: "gray", wireframe: false, transparent: true, opacity: 0.5 } );
                    var cloudGeometry = new BoxGeometry( cloudSizeX, cloudSizeY, cloudSizeZ );
                    var cloud = new Mesh( cloudGeometry, cloudMaterial );
                    cloud.name = "Cloud - " + Math.random(1, 0).toString().replace("0.", "");
                    cloud.position.z = window.cloudZ;
                    setInterval(() => {
                        cloud.position.x += window.cloudSpeed;
                    }, 100);
                    setTimeout(() => {
                        var cloudName = cloud.name;
                        scene.getObjectByName(cloudName).remove();
                    }, 30000)
                    scene.getObjectByName("Clouds").add(cloud);
                }, window.cloudSpawnTimer);
            }

            let pitch = 0;
            let yaw = 0;
            let pitch2 = 0;
            let yaw2 = 0;
            let additionalHeadRotation = {
                "x": 0,
                "y": 0,
                "z": 0
            }

            function onMouseMove (event) {
                const movementX = event.movementX || 0;
                const movementY = event.movementY || 0;

                yaw -= movementX * 0.002;
                pitch -= movementY * 0.002;

                yaw2 += movementX * 0.002;
                pitch2 += movementY * 0.002;

                pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
                pitch2 = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch2));
                //console.log(camera.rotation);
                //if (camera.rotation.y > 1.8) {
                    //camera.rotation.set(-pitch/*movementY*/, -yaw/*movementX*/, 0);
                //} else if (camera.rotation.y < -1.79) {
                    //camera.rotation.set(-pitch/*movementY*/, -yaw/*movementX*/, 0);
                //} else {
                    camera.rotation.set(pitch/*movementY*/, yaw/*movementX*/, 0);
                //}
                //if (camera.rotation.x > 1.5) {
                    //camera.rotation.x -= movementX / window.innerWidth;
                    //camera.rotation.y -= movementY / window.innerHeight; //(/*pitch*/movementX / window.innerWidth, /*yaw*/movementY / window.innerHeight, 0);
                    //camera.rotation.set(pitch2/*movementY*/, yaw2/*movementX*/, 0);
                //} else if (camera.rotation.y > 1.5) {
                    //camera.rotation.set(/*pitch*/movementX / window.innerWidth, /*yaw*/movementY / window.innerHeight, 0);
                    //camera.rotation.x -= movementX / window.innerWidth;
                    //camera.rotation.y -= movementY / window.innerHeight;
                    //camera.rotation.set(pitch2/*movementY*/, yaw2/*movementX*/, 0);
                //} else {
                    //camera.rotation.set(/*pitch*/movementY / window.innerHeight, /*yaw*/movementX / window.innerWidth, 0);
                    //camera.rotation.x -= movementY / window.innerHeight;
                    //camera.rotation.y -= movementX / window.innerWidth;
                    //camera.rotation.set(pitch/*movementY*/, yaw/*movementX*/, 0);
                //}
                //camera.rotation.set(pitch/*movementY*/, yaw/*movementX*/, 0);

                /*event.preventDefault();

                let theta = - ( ( event.clientX - event.clientX ) * 0.5 ) + 0.002;
                let phi = ( ( event.clientY - event.clientY ) * 0.5 ) + 0.002;
            
                phi = Math.min( 180, Math.max( 0, phi ) );
            
                camera.position.x = 0.002 * Math.sin( theta * Math.PI / 360 ) * Math.cos( phi * Math.PI / 360 );
                camera.position.y = 0.002 * Math.sin( phi * Math.PI / 360 );
                camera.position.z = 0.002 * Math.cos( theta * Math.PI / 360 )
            
                /*mouse3D = projector.unprojectVector(
                    new THREE.Vector3(
                        ( event.clientX / renderer.domElement.width ) * 2 - 1,
                        - ( event.clientY / renderer.domElement.height ) * 2 + 1,
                        0.5
                    ),
                    camera
                );*/
                /*ray.direction = mouse3D.subSelf( camera.position ).normalize();*/
            }

            function getMaterial (blockType) {
                if (blockType === "Bedrock") {
                    return "http://127.0.0.1:5500/textures/BedrockTexture.webp";
                }
            }

            function createTemplate (enabled, PosY, Size) {
                for (let x = 0; x < Size; ++x) {
                    for (let z = 0; z < Size; ++z) {
                        if (enabled) {
                            var Geometry = new BoxGeometry(1, 1, 1);
                            var Material = new MeshBasicMaterial({map: new TextureLoader(getMaterial("Bedrock"))});
                            var Bedrock = new Mesh(Geometry, Material);
                            Bedrock.position.set(x, PosY, z);
                            scene.add(Bedrock);
                        }
                    }
                }
            }

            setTimeout(() => {
                //createTemplate(true, -5, 10);
            }, 1000);

            var beforeRoationY = 0;
            var keys = { w: false, a: false, s: false, d: false, F4: false, Shift: false, ctrl: false, space: false, r: false, one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false, nine: false }; // F4 toggle firstPerson, thirdPerson, fourthPerson // shift = crouch // R = sprint

            var F4Locked = false;

            window.playerKeysEnabled = true;

            window.addEventListener('keydown', (event) => {
                if (window.playerKeysEnabled === true) {
                    if (event.key === "1") {
                        keys["one"] = true
                    }
                    if (event.key === "2") {
                        keys["two"] = true
                    }
                    if (event.key === "3") {
                        keys["three"] = true
                    }
                    if (event.key === "4") {
                        keys["four"] = true
                    }
                    if (event.key === "5") {
                        keys["five"] = true
                    }
                    if (event.key === "6") {
                        keys["six"] = true
                    }
                    if (event.key === "7") {
                        keys["seven"] = true
                    }
                    if (event.key === "8") {
                        keys["eight"] = true
                    }
                    if (event.key === "9") {
                        keys["nine"] = true
                    }
                    keys[event.key] = true;
                    if (event.key === " ") {
                        keys["space"] = true;
                    }
                    if (event.key === "Control") {
                        keys["ctrl"] = true;
                    }
                    if (event.key === "LeftArrow") {
                        camera.rotation.y -= 0.1;
                        window.group.rotation.y -= 0.1;
                    }
                    if (event.key === "RightArrow") {
                        camera.rotation.y += 0.1;
                        window.group.rotation.y += 0.1;
                    }
                    if (event.key === "UpArrow") {
                        camera.rotation.x -= 0.1;
                        window.group.rotation.x -= 0.1;
                    }
                    if (event.key === "DownArrow") {
                        camera.rotation.x += 0.1;
                        window.group.rotation.x += 0.1;
                    }
                }
            });       

            window.addEventListener('keyup', (event) => {
                if (window.playerKeysEnabled === true) {
                    if (event.key === "1") {
                        keys["one"] = false
                    }
                    if (event.key === "2") {
                        keys["two"] = false
                    }
                    if (event.key === "3") {
                        keys["three"] = false
                    }
                    if (event.key === "4") {
                        keys["four"] = false
                    }
                    if (event.key === "5") {
                        keys["five"] = false
                    }
                    if (event.key === "6") {
                        keys["six"] = false
                    }
                    if (event.key === "7") {
                        keys["seven"] = false
                    }
                    if (event.key === "8") {
                        keys["eight"] = false
                    }
                    if (event.key === "9") {
                        keys["nine"] = false
                    }
                    keys[event.key] = false;
                    if (event.key === " ") {
                        keys["space"] = false;
                    }
                    if (event.key === "Escape") {
                        if (document.querySelector('.game .menu').hasAttribute("hidden")) {
                            ShowGameMenu();
                        } else if (!document.querySelector('.game .menu').hasAttribute("hidden")) {
                            document.querySelector('.game').requestPointerLock();
                            HideGameMenu();
                        }
                    }
                    if (event.key === "Control") {
                        keys["ctrl"] = false;
                    }
                    if (event.key === "F4") {
                        if (F4Locked === true) {
                            F4Locked = false;
                        } else {
                            F4Locked = true;
                        }
                    }
                }
            });

            function getBlockByPosition (x, y, z) {
                for (let i = 0; i < scene.getObjectByName("TerrainGroup").children.length; i++) {
                    const object = scene.getObjectByName("TerrainGroup").children[i];
                    if (object.position.x === x && object.position.y === y && object.position.z === z) {
                        return object;
                    }
                } return null;
            }

            window.handShown = false;

            class ANameTag {
                constructor (text, position) {
                    this.text = text;
                    this.pos = position;
                }

                model;
                baseURL = "https://bananakitssu.github.io/resources/NameTagBackground.png";
                interval;
                interval2

                create () {
                    let M = new MeshBasicMaterial({ wireframe: false/*, map: new TextureLoader().load(this.baseURL)*/, color: 'black', transparent: true, opacity: 0.5 });
                    let G = new PlaneGeometry((0.3 * this.text.length), 0.5);
                    this.model = new Mesh(G, M);
                    setTimeout(() => {
                        scene.add(this.model);
                    }, 1000);
                }

                set () {
                    setTimeout(() => {
                        this.interval2 = setInterval(() => {
                            if (this.model.position.x < Math.trunc(window.group.position.x + chunkLimitedSize)) {
                                if (this.model.position.x > Math.trunc(window.group.position.x - chunkLimitedSize)) {
                                    if (this.model.position.y < Math.trunc(window.group.position.y + chunkLimitedSize)) {
                                        if (this.model.position.y > Math.trunc(window.group.position.y - chunkLimitedSize)) {
                                            if (this.model.position.z < Math.trunc(window.group.position.z + chunkLimitedSize)) {
                                                if (this.model.position.z > Math.trunc(window.group.position.z - chunkLimitedSize)) {
                                                    if (this.model.material.opacity === 0) {
                                                        this.show();
                                                    }
                                                } else {
                                                    if (this.model.material.opacity === 0.5) {
                                                        this.hide();
                                                    }
                                                }
                                            } else {
                                                if (this.model.material.opacity === 0.5) {
                                                    this.hide();
                                                }
                                            }
                                        } else {
                                            if (this.model.material.opacity === 0.5) {
                                                this.hide();
                                            }
                                        }
                                    } else {
                                        if (this.model.material.opacity === 0.5) {
                                            this.hide();
                                        }
                                    }
                                } else {
                                    if (this.model.material.opacity === 0.5) {
                                        this.hide();
                                    }
                                }
                            } else {
                                if (this.model.material.opacity === 0.5) {
                                    this.hide();
                                }
                            }
                        }, 1000);
                        this.interval = setInterval(() => {
                            this.model.position.set(this.pos.x, this.pos.y, this.pos.z);
                            this.model.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
                        }, 1);
                    }, 1000);
                }

                hide () {
                    this.model.material.opacity = 0;
                }

                show () {
                    this.model.material.opacity = 0.5;
                }

                destroy () {
                    clearInterval(this.interval);
                    clearInterval(this.interval2);
                    this.hide();
                }

                setPosition (position) {
                    this.pos = position;
                }
            }

            let nameTag = new ANameTag("BananaCool467", {"x": 0, "y": 9, "z": -3});
            nameTag.create();
            nameTag.set();
            nameTag.setPosition({"x": 0, "y": 9, "z": -3});

            function checkDistance (startPosition, endPosition) {
                let x = startPosition.x - endPosition.x;
                let y = startPosition.y - endPosition.y;
                let z = startPosition.z - endPosition.z;
                if (x > y && x > z) {
                    return x;
                } else if (y > x && y > z) {
                    return y;
                } else if (z > x && z > y) {
                    return z;
                } else {
                    return 0;
                }
            }

            class floatingItem {
                constructor (width, height, length, position, texture, takable) {
                    this.width = width;
                    this.height = height;
                    this.length = length;
                    this.textureMat = texture;
                    this.position = position;
                    this.takable = takable;
                    this.create();
                }

                takingDistance = 0.5;

                create () {
                    let Geo = new BoxGeometry(this.width, this.height, this.length);
                    this.Mesh = new Mesh(Geo, this.textureMat);
                    this.g = new Group();
                    this.Mesh.position.set(this.position.x, this.position.y, this.position.z);
                    setTimeout(() => {
                        this.g.add(this.Mesh);
                        scene.add(this.g);
                    }, 1000);
                    setInterval(() => {
                        this.update();
                    });
                    this.float();
                }

                update () {
                    this.Mesh.rotation.y += 0.001;
                    if (this.Mesh.position.x < (window.group.position.x + chunkLimitedSize)) {
                        if (this.Mesh.position.x > (window.group.position.x - chunkLimitedSize)) {
                            if (this.Mesh.position.y < (window.group.position.y + chunkLimitedSize)) {
                                if (this.Mesh.position.y > (window.group.position.y - chunkLimitedSize)) {
                                    if (this.Mesh.position.z < (window.group.position.z + chunkLimitedSize)) {
                                        if (this.Mesh.position.z > (window.group.position.z - chunkLimitedSize)) {
                                            if (this.Mesh.material.opacity === 0) {
                                                this.show();
                                            }
                                        } else {
                                            if (this.Mesh.material.opacity === 1) {
                                                this.hide();
                                            }
                                        }
                                    } else {
                                        if (this.Mesh.material.opacity === 1) {
                                            this.hide();
                                        }
                                    }
                                } else {
                                    if (this.Mesh.material.opacity === 1) {
                                        this.hide();
                                    }
                                }
                            } else {
                                if (this.Mesh.material.opacity === 1) {
                                    this.hide();
                                }
                            }
                        } else {
                            if (this.Mesh.material.opacity === 1) {
                                this.hide();
                            }
                        }
                    } else {
                        if (this.Mesh.material.opacity === 1) {
                            this.hide();
                        }
                    }
                    if (checkDistance({"x": this.Mesh.position.x, "y": this.Mesh.position.y, "z": this.Mesh.position.z}, {"x": window.group.position.x, "y": window.group.position.y, "z": window.group.position.z}) < this.takingDistance) {
                        //this.take();
                    }
                }

                floatDirection = 'up';

                float () {
                    if (this.Mesh.position.y > this.position.y + 0.5) {
                        setTimeout(() => {
                            this.Mesh.position.y -= 0.1;
                            this.floatDirection = 'down';
                            this.float();
                        }, 500);
                    } else {
                        if (this.Mesh.position > this.position.y - 0.4) {
                            if (this.floatDirection === 'down') {
                                this.Mesh.position.y -= 0.1;
                                this.float();
                            } else {
                                this.Mesh.position.y += 0.1;
                                this.float();
                            }
                        } else {
                            setTimeout(() => {
                                this.Mesh.position.y += 0.1;
                                this.floatDirection = 'up';
                                this.float();
                            }, 500);
                        }
                    }
                }

                take () {
                    if (this.takable === true) {
                        this.takable = false;
                        this.hide();
                        var sound = document.createElement('audio');
                        sound.src = "resources/Minecraft Item Pickup.mp4";
                        sound.play();
                        setTimeout(() => {
                            sound.remove();
                        }, 500);
                    }
                }
                
                show () {
                    this.takable = true;
                    this.Mesh.material.opacity = 1;
                }

                hide () {
                    this.takable = false;
                    this.Mesh.material.opacity = 0;
                }
            }

            let floatingItemsss = new floatingItem(0.1, 0.5, 0.5, {'x': 3, 'y': 7, 'z': 0}, new MeshBasicMaterial({ color: 'black', transparent: true }), true);

            class zombie {
                constructor (position) {
                    this.pos = position;
                    this.create();
                }

                hide () {
                    if (this.model.visible === true) {
                        this.model.visible = false;
                    }
                }

                show () {
                    if (this.model.visible === false) {
                        this.model.visible = true;
                    }
                }

                update () {
                    this.model.position.set(this.pos.x, this.pos.y, this.pos.z);
                    if (this.pos.x < (window.group.position.x + chunkLimitedSize)) {
                        if (this.pos.x > (window.group.position.x - chunkLimitedSize)) {
                            if (this.pos.y < (window.group.position.y + chunkLimitedSize)) {
                                if (this.pos.y > (window.group.position.y - chunkLimitedSize)) {
                                    if (this.pos.z < (window.group.position.z + chunkLimitedSize)) {
                                        if (this.pos.z > (window.group.position.z - chunkLimitedSize)) {
                                            this.show();
                                        } else {
                                            this.hide();
                                        }
                                    } else {
                                        this.hide();
                                    }
                                } else {
                                    this.hide();
                                }
                            } else {
                                this.hide();
                            }
                        } else {
                            this.hide();
                        }
                    } else {
                        this.hide();
                    }
                }

                create () {
                    this.model = new Group(); /*new Mesh(new BoxGeometry(0.9, 2, 0.5), new MeshStandardMaterial({}))*/;
                    this.torso = new Mesh(new BoxGeometry(0.9, 2, 0.5), [new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoRight.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoLeft.jpg')}),new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoTop.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoBottom.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoBack.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieTorsoFront.jpg')})]);
                    this.leftArm = new Mesh(new BoxGeometry(0.5, 2, 0.5), [new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmRight.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmLeft.jpg')}),new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmBottom.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmTop.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmBack.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmFront.jpg')})]);
                    this.leftArm.position.x -= 0.7;
                    this.leftArm.position.y += 0.747;
                    this.leftArm.position.z -= 0.75;
                    this.leftArm.rotation.x = -1.57;
                    this.rightArm = new Mesh(new BoxGeometry(0.5, 2, 0.5), [new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmRight.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmLeft.jpg')}),new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmBottom.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmTop.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmBack.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieArmFront.jpg')})]);
                    this.rightArm.position.x += 0.7;
                    this.rightArm.position.y += 0.747;
                    this.rightArm.position.z -= 0.75;
                    this.rightArm.rotation.x = -1.57;
                    this.head = new Mesh(new BoxGeometry(0.9, 0.9, 0.9), [new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadRight.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadLeft.jpg')}),new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadTop.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadBottom.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadBack.jpg')}), new MeshStandardMaterial({map: new TextureLoader().load('http://127.0.0.1:5500/textures/ZombieHeadFront.jpg')})]);
                    this.head.position.y += 1.45;
                    this.leftLeg = new Mesh(new BoxGeometry(0.5, 2, 0.5), new MeshStandardMaterial({}));
                    this.leftLeg.position.y -= 2;
                    this.leftLeg.position.x -= 0.2;
                    this.rightLeg = new Mesh(new BoxGeometry(0.5, 2, 0.5), new MeshStandardMaterial({}));
                    this.rightLeg.position.y -= 2;
                    this.rightLeg.position.x += 0.2;
                    this.leftArm.castShadow = true;
                    this.leftArm.reciveShadow = true;
                    this.rightArm.castShadow = true;
                    this.rightArm.reciveShadow = true;
                    this.torso.castShadow = true;
                    this.torso.reciveShadow = true;
                    this.head.castShadow = true;
                    this.head.reciveShadow = true;
                    this.leftLeg.castShadow = true;
                    this.leftLeg.reciveShadow = true;
                    this.rightLeg.castShadow = true;
                    this.rightLeg.reciveShadow = true;
                    setTimeout(() => {
                        scene.add(this.model);
                        this.model.add(this.torso, this.leftArm, this.rightArm, this.head, this.leftLeg, this.rightLeg);
                    }, 500);
                    setInterval(() => {
                        this.update();
                    }, 200);
                }
            }

            let ZOMBIE = new zombie ({'x': 3, 'y': 7, 'z': 3});

            class CharacterControls {
                character;
                walkSpeed;
                camera;
                alreadySprinting;

                constructor (character, camera, walkSpeed) {
                    this.character = character;
                    this.walkSpeed = 0.00;
                    this.camera = camera;
                    window.crouchY = character.position.y - 0.5;
                    window.defualtY = character.position.y;
                }

                update () {
                    const direction = new Vector3();

                    camera.getWorldDirection(direction);
                    direction.normalize();

                    if (keys.w) {//0.10000000149012
                        if (getBlockByPosition(Math.trunc(this.character.position.x), Math.trunc(this.character.position.y), Math.trunc(this.character.position.z - 0.10000000149012))) {
                            this.walkSpeed = 0;
                        } else {
                            this.walkSpeed = 0.10;
                            if (this.alreadySprinting) {
                                this.walkSpeed = 0.13;
                            }
                        }
                        if (this.character.rotation.y === camera.rotation.y.toFixed(3)) {

                        } else {
                            if (this.character.rotation.y > camera.rotation.y.toFixed(3) + 0.001) {
                                this.character.rotation.y -= 0.05;
                            }
                            if (this.character.rotation.y < camera.rotation.y.toFixed(3)) {
                                this.character.rotation.y += 0.05;
                            }
                        }
                        //this.camera.position.set(this.character.position.x, this.character.position.y + 3, this.character.position.z);
                        this.character.position.z -= this.walkSpeed;
                        
                        //this.camera.position.z -= this.walkSpeed;
                        //this.character.position.addScaledVector({x: direction["x"], y: 0, z: direction["z"]}, this.walkSpeed);
                        //this.camera.position.addScaledVector({x: direction["x"], y: 0, z: direction["z"]}, this.walkSpeed);
                    } else {
                        if (this.walkSpeed > 0.00000000000001) {
                            this.walkSpeed = this.walkSpeed - 0.0001;
                            //this.character.position.z -= this.walkSpeed;
                        } else {
                            if (this.walkSpeed === 0.00000000000001) {
                                this.walkSpeed = 0;
                            }
                        }
                    };
                    if (keys.s) {
                        if (getBlockByPosition(this.character.position.x, this.character.position.y, this.character.position.z + 0.10000000149012)) {
                            this.walkSpeed = 0;
                        } else {
                            this.walkSpeed = 0.10;
                            if (this.alreadySprinting) {
                                this.walkSpeed = 0.13;
                            }
                        }
                        /*if (camera.rotation.y > 0.5) {
                            if (this.character.rotation.y === camera.rotation.y.toFixed(3) - 0.6) {

                            } else {
                                if (this.character.rotation.y > camera.rotation.y.toFixed(3) - 0.6 + 0.001) {
                                    this.character.rotation.y -= 0.05;
                                }
                                if (this.character.rotation.y < camera.rotation.y.toFixed(3) - 0.6) {
                                    this.character.rotation.y += 0.05;
                                }
                            }
                        } else {
                            if (this.character.rotation.y === camera.rotation.y.toFixed(3) - 0.6) {

                            } else {
                                if (this.character.rotation.y > camera.rotation.y.toFixed(3) - 0.6 + 0.001) {
                                    this.character.rotation.y -= 0.05;
                                }
                                if (this.character.rotation.y < camera.rotation.y.toFixed(3) - 0.6) {
                                    this.character.rotation.y += 0.05;
                                }
                            }
                        }*/
                        this.character.position.z += this.walkSpeed;
                        //this.camera.position.set(this.character.position.x, this.character.position.y + 3, this.character.position.z);

                        //this.camera.position.z -= this.walkSpeed;
                        //this.character.position.addScaledVector({x: direction["x"], y: 0, z: direction["z"]}, -this.walkSpeed);
                        //this.camera.position.addScaledVector({x: direction["x"], y: 0, z: direction["z"]}, -this.walkSpeed);
                    };
                    if (keys.a) {
                        if (getBlockByPosition(this.character.position.x - 0.10000000149012, this.character.position.y, this.character.position.z)) {
                            this.walkSpeed = 0;
                        } else {
                            this.walkSpeed = 0.10;
                            if (this.alreadySprinting) {
                                this.walkSpeed = 0.13;
                            }
                        }
                        this.character.position.x -= this.walkSpeed;
                        //this.camera.position.set(this.character.position.x, this.character.position.y + 3, this.character.position.z);

                        //this.camera.position.z -= this.walkSpeed;
                        //camera.getWorldDirection(direction);
                        //direction.normalize();
                        //let strafeDirection = new Vector3().copy({x: direction["x"], y: 0, z: direction["z"]}).cross(camera.up);
                        //this.character.position.addScaledVector(strafeDirection.normalize(), -this.walkSpeed);
                        //this.camera.position.addScaledVector(strafeDirection.normalize(), -this.walkSpeed);
                    };
                    if (keys.d) {
                        if (getBlockByPosition(this.character.position.x + 0.10000000149012, this.character.position.y, this.character.position.z)) {
                            this.walkSpeed = 0;
                        } else {
                            this.walkSpeed = 0.10;
                            if (this.alreadySprinting) {
                                this.walkSpeed = 0.13;
                            }
                        }
                        this.character.position.x += this.walkSpeed;
                        //this.camera.position.set(this.character.position.x, this.character.position.y + 3, this.character.position.z);

                        //this.camera.position.z -= this.walkSpeed;
                        //camera.getWorldDirection(direction);
                        //direction.normalize();
                        //let strafeDirection = new Vector3().copy({x: direction["x"], y: 0, z: direction["z"]}).cross(camera.up);
                        //this.character.position.addScaledVector(strafeDirection.normalize(), this.walkSpeed);
                        //this.camera.position.addScaledVector(strafeDirection.normalize(), this.walkSpeed);
                    };
                    if (keys.r) {
                        if (keys.w) {
                            if (hunger) {
                                if (hunger.getCurrentHunger() > 6) {
                                    if (this.alreadySprinting === false) {
                                        this.alreadySprinting = true;
                                        this.walkSpeed = 0.13;
                                    } else {
                                        this.alreadySprinting = true;
                                        this.walkSpeed = 0.13;
                                    };
                                    if (window.FOV < window.SprintFOV) {
                                        window.FOV += 1.5;
                                    }
                                }
                            }
                        } else {
                            this.alreadySprinting = false;
                            this.walkSpeed = 0.10;
                            if (window.FOV) {
                                if (window.DefualtFOV < window.FOV) {
                                    window.FOV -= 1.5;
                                } else {
                                    window.DefualtFOV = window.FOV;
                                }
                            }
                        }
                    } else {
                        this.alreadySprinting = false;
                        this.walkSpeed = 0.10;
                        if (window.FOV) {
                            if (window.DefualtFOV < window.FOV) {
                                window.FOV -= 1.5;
                            } else {
                                window.DefualtFOV = window.FOV;
                            }
                        }
                    };
                    
                    if (keys.one) {
                        if (document.querySelector('.inventory-slot-1').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.two) {
                        if (document.querySelector('.inventory-slot-2').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.three) {
                        if (document.querySelector('.inventory-slot-3').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.four) {
                        if (document.querySelector('.inventory-slot-4').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.five) {
                        if (document.querySelector('.inventory-slot-5').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.six) {
                        if (document.querySelector('.inventory-slot-6').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.seven) {
                        if (document.querySelector('.inventory-slot-7').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.eight) {
                        if (document.querySelector('.inventory-slot-8').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (keys.nine) {
                        if (document.querySelector('.inventory-slot-9').hasAttribute('has-item')) {
                            this.character.getObjectByName('leftArm').rotation.x = 0.5;
                            this.character.getObjectByName('leftArm').position.z = -0.45;
                            window.handShown = false;
                        } else {
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            window.handShown = true;
                        }
                    }
                    if (document.querySelector('.inventory-slot-1').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-1').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-2').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-2').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-3').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-3').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-4').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-4').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-5').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-5').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-6').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-6').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-7').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-7').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-8').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-8').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (document.querySelector('.inventory-slot-9').getAttribute('equipted') === "true") {
                        if (document.querySelector('.inventory-slot-9').hasAttribute('has-item')) {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.1;
                                this.character.getObjectByName('leftArm').position.z = 0.1;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0.5;
                                this.character.getObjectByName('leftArm').position.z = -0.45;
                            }
                        } else {
                            if (keys["Shift"]) {
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                
                            } else {
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                            }
                        }
                    }
                    if (window.gamemode === "spectator") {
                        if (keys.Shift) {
                            if (window.gamemodeState === "flying") {
                                this.character.position.y -= 0.1;
                                this.character.getObjectByName('torso').rotation.x = -0.5;
                                this.character.getObjectByName('torso').position.z = 0.5;
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('rightArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                this.character.getObjectByName('rightArm').position.z = -0.45;;
                                this.character.getObjectByName('leftLeg').position.z = 1;
                                this.character.getObjectByName('rightLeg').position.z = 1;
                                this.character.getObjectByName('leftLeg').position.y += 0.2;
                                this.character.getObjectByName('rightLeg').position.y += 0.2;
                                
                            }
                        } else {
                            this.character.getObjectByName('torso').rotation.x = 0;
                            this.character.getObjectByName('torso').position.z = -0.5;
                            this.character.getObjectByName('leftArm').rotation.x = 0;
                            this.character.getObjectByName('rightArm').rotation.x = 0;
                            this.character.getObjectByName('leftArm').position.z = 0;
                            this.character.getObjectByName('rightArm').position.z = 0;
                            this.character.getObjectByName('leftLeg').position.z = 0;
                            this.character.getObjectByName('rightLeg').position.z = 0;
                            this.character.getObjectByName('leftLeg').position.y -= 0.2;
                            this.character.getObjectByName('rightLeg').position.y -= 0.2;
                        }
                        if (keys.space) {
                            if (window.gamemodeState === "flying") {
                                this.character.position.y += 0.1;
                                
                            }
                        }
                    }
                    if (window.gamemode === "survival") {
                        if (keys.Shift) {
                            if (this.character.position.y === window.crouchY) {
                                
                            } else {
                                this.character.position.y = window.crouchY;
                                this.character.getObjectByName('torso').rotation.x = -0.5;
                                this.character.getObjectByName('torso').position.z = 0.5;
                                this.character.getObjectByName('leftArm').rotation.x = -0.5;
                                this.character.getObjectByName('rightArm').rotation.x = -0.5;
                                this.character.getObjectByName('leftArm').position.z = 0.5;
                                this.character.getObjectByName('rightArm').position.z = 0.5;
                                this.character.getObjectByName('leftLeg').position.z = 1;
                                this.character.getObjectByName('rightLeg').position.z = 1;
                                this.character.getObjectByName('leftLeg').position.y += 0.2;
                                this.character.getObjectByName('rightLeg').position.y += 0.2;
                                this.walkSpeed = 0.00000000149012;
                                
                            }
                        } else {
                            if (this.character.position.y === window.crouchY) {
                                this.character.position.y = window.defualtY;
                                this.character.getObjectByName('torso').rotation.x = 0;
                                this.character.getObjectByName('torso').position.z = 0;
                                this.character.getObjectByName('leftArm').rotation.x = 0;
                                this.character.getObjectByName('rightArm').rotation.x = 0;
                                this.character.getObjectByName('leftArm').position.z = 0;
                                this.character.getObjectByName('rightArm').position.z = 0;
                                this.character.getObjectByName('leftLeg').position.z = 0;
                                this.character.getObjectByName('rightLeg').position.z = 0;
                                this.character.getObjectByName('leftLeg').position.y -= 0.2;
                                this.character.getObjectByName('rightLeg').position.y -= 0.2;
                            }
                        }
                    }
                }
            };

            document.querySelector('.inventory-slot-1').addEventListener('click', () => {
                keys.one = true;
                setTimeout(() => {
                    keys.one = false;
                }, 150);
            });

            document.querySelector('.inventory-slot-2').addEventListener('click', () => {
                keys.two = true;
                setTimeout(() => {
                    keys.two = false;
                }, 150);
            });

            document.querySelector('.inventory-slot-3').addEventListener('click', () => {
                keys.three = true;
                setTimeout(() => {
                    keys.three = false;
                }, 150);
            });

            document.querySelector('.inventory-slot-4').addEventListener('click', () => {
                keys.four = true;
                setTimeout(() => {
                    keys.four = false;
                }, 150);
            });

            document.querySelector('.inventory-slot-5').addEventListener('click', () => {
                keys.five = true;
                setTimeout(() => {
                    keys.five = false;
                }, 150);
            });

            window.inServer = true;
            window.InputFocused = "Chat-Input";
            window.chatHiddenTimeout;

            class Chat {
                key (event) {
                    if (window.inServer === true) {
                        document.querySelector('.chat .bottom input').addEventListener('keydown', (e) => {
                            setTimeout(() => {
                                clearTimeout(window.chatHiddenTimeout);
                                if (document.querySelector('.chat .bottom input').value.startsWith('/')) {
                                    document.querySelector('.chat .bottom .spans').style.color = 'yellow';
                                } else {
                                    document.querySelector('.chat .bottom .spans').style.color = 'white';
                                }
                                let text = document.querySelector('.chat .bottom input').value;
                                let chatTextArray = text.split('');
                                document.querySelector('.chat .bottom .spans').innerHTML = '';
                                chatTextArray.forEach(chatText => {
                                    let element = document.createElement('div');
                                    element.textContent = chatText;
                                    element.style.display = 'inline-block';
                                    if (chatText === " ") {
                                        element.setAttribute('color', 'space');
                                    } else {
                                        element.setAttribute('color', 'white');
                                    }
                                    document.querySelector('.chat .bottom .spans').appendChild(element);
                                });
                            }, 5);
                        });
                        if (document.querySelector('.chat .bottom input').hasAttribute('hidden')) {
                            if (event.key === "/") {
                                clearTimeout(window.chatHiddenTimeout);
                                document.querySelector('.chat .bottom input').removeAttribute('hidden');
                                document.querySelector('.chat').removeAttribute('hidden');
                                window.playerKeysEnabled = false;
                                window.InputFocused = "Chat-Input";
                                document.querySelector('.chat .bottom input').focus();
                                setTimeout(() => {
                                    if (document.querySelector('.chat .bottom input').value.startsWith('/')) {
                                        document.querySelector('.chat .bottom .spans').style.color = 'yellow';
                                    } else {
                                        document.querySelector('.chat .bottom .spans').style.color = 'white';
                                    }
                                    let text = document.querySelector('.chat .bottom input').value;
                                    let chatTextArray = text.split('');
                                    document.querySelector('.chat .bottom .spans').innerHTML = '';
                                    chatTextArray.forEach(chatText => {
                                        let element = document.createElement('div');
                                        element.textContent = chatText;
                                        element.style.display = 'inline-block';
                                        if (chatText === " ") {
                                            element.setAttribute('color', 'space');
                                        } else {
                                            element.setAttribute('color', 'white');
                                        }
                                        document.querySelector('.chat .bottom .spans').appendChild(element);
                                    });
                                }, 5);
                            } else if (event.key === "t") {
                                clearTimeout(window.chatHiddenTimeout);
                                document.querySelector('.chat .bottom input').removeAttribute('hidden');
                                document.querySelector('.chat').removeAttribute('hidden');
                                window.playerKeysEnabled = false;
                                window.InputFocused = "Chat-Input";
                                document.querySelector('.chat .bottom input').focus();
                                document.querySelector('.chat .bottom input').value = "";
                                setTimeout(() => {
                                    if (document.querySelector('.chat .bottom input').value.startsWith('/')) {
                                        document.querySelector('.chat .bottom .spans').style.color = 'yellow';
                                    } else {
                                        document.querySelector('.chat .bottom .spans').style.color = 'white';
                                    }
                                    let text = document.querySelector('.chat .bottom input').value;
                                    let chatTextArray = text.split('');
                                    document.querySelector('.chat .bottom .spans').innerHTML = '';
                                    chatTextArray.forEach(chatText => {
                                        let element = document.createElement('div');
                                        element.textContent = chatText;
                                        element.style.display = 'inline-block';
                                        if (chatText === " ") {
                                            element.setAttribute('color', 'space');
                                        } else {
                                            element.setAttribute('color', 'white');
                                        }
                                        document.querySelector('.chat .bottom .spans').appendChild(element);
                                    });
                                }, 5);
                            }
                        } else {
                            if (event.key === "Enter") {
                                if (window.InputFocused === "Chat-Input") {
                                    clearTimeout(window.chatHiddenTimeout);
                                    document.querySelector('.chat .bottom input').setAttribute('hidden', '');
                                    window.chatHiddenTimeout = setTimeout(() => {
                                        document.querySelector('.chat').setAttribute('hidden', '');
                                    }, 5000);
                                    window.playerKeysEnabled = true;
                                    window.InputFocused = null;
                                    //let element = document.createElement('div');
                                    //element.className = "message";
                                    //element.innerHTML = `<div color="white"><</div><div color="white">></div><div color="white">:</div><div color="space"></div>` + document.querySelector('.chat .bottom .spans').innerHTML;
                                    //document.querySelector('.chat .top .chatMessages').appendChild(element);
                                    ws.send(`Chat Message: {"msg": "${"<" + name + ">: " + document.querySelector('.chat .bottom input').value}"}`);
                                    document.querySelector('.chat .bottom input').value = "";
                                    document.querySelector('.chat .bottom .spans').innerHTML = '';
                                }
                            } else if (event.key === "Return") {
                                if (window.InputFocused === "Chat-Input") {
                                    clearTimeout(window.chatHiddenTimeout);
                                    document.querySelector('.chat .bottom input').setAttribute('hidden', '');
                                    window.chatHiddenTimeout = setTimeout(() => {
                                        document.querySelector('.chat').setAttribute('hidden', '');
                                    }, 5000);
                                    window.playerKeysEnabled = true;
                                    window.InputFocused = null;
                                    //let element = document.createElement('div');
                                    //element.className = "message";
                                    //element.innerHTML = `<div color="white"><</div><div color="white">></div><div color="white">:</div><div color="space"></div>` + document.querySelector('.chat .bottom .spans').innerHTML;
                                    //document.querySelector('.chat .top .chatMessages').appendChild(element);
                                    ws.send(`Chat Message: {"msg": "${"<" + name + ">: " + document.querySelector('.chat .bottom input').value}"}`);
                                    document.querySelector('.chat .bottom input').value = "";
                                    document.querySelector('.chat .bottom .spans').innerHTML = '';
                                }
                            }
                        }
                    }
                }

                set () {
                    if (window.inServer === true) {
                        window.addEventListener('keydown', this.key, false);
                    }
                }

                remove () {
                    window.removeEventListener('keydown', this.key, false);
                }
            }

            let chat = new Chat();
            chat.set();

            document.querySelectorAll('multiplayer-server-view').forEach(multiplayerServerView => {
                let signalAnimation;
                multiplayerServerView.addEventListener('mouseover', e => {
                    multiplayerServerView.querySelector('.play-button').removeAttribute('hidden');

                });
                multiplayerServerView.addEventListener('mouseleave', e => {
                    multiplayerServerView.querySelector('.play-button').setAttribute('hidden', '');
                });
                setInterval(() => {
                    if (multiplayerServerView.querySelector('.signal').getAttribute('connecting') === "true") {
                        //multiplayerServerView.querySelector('.signal .ConnectionError').setAttribute('hidden', '');
                    }
                    if (multiplayerServerView.querySelector('.signal').getAttribute('connected') === "true") {
                        //multiplayerServerView.querySelector('.signal .ConnectionError').setAttribute('hidden', '');
                    } else {
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connecting') === "false") {
                            //multiplayerServerView.querySelector('.signal .ConnectionError').removeAttribute('hidden');
                        } else {
                            //multiplayerServerView.querySelector('.signal .ConnectionError').setAttribute('hidden', '');
                        }
                    }
                }, 100);
                setTimeout(() => {
                    signalAnimation = setInterval(() => {
                        if (!multiplayerServerView.querySelector('.signal').getAttribute('connection') === "1" || "2" || "3" || "4") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "1");
                        }
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "1") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "2");
                        }
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "2") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "3");
                        }
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "3") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "4");
                        }
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "4") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "3-");
                        }if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "3-") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "2-");
                        }
                        if (multiplayerServerView.querySelector('.signal').getAttribute('connection') === "2-") {
                            multiplayerServerView.querySelector('.signal').setAttribute('connection', "1");
                        }
                    }, 50);

                    let webSocket = new WebSocket(multiplayerServerView.getAttribute('server'));

                    webSocket.onopen = function (e) {
                        multiplayerServerView.querySelector('.signal').setAttribute('connected', 'true');
                        multiplayerServerView.querySelector('.signal').setAttribute('connection', '2/4');
                        multiplayerServerView.querySelector('.signal .ConnectionError').setAttribute('hidden', '');
                        clearInterval(signalAnimation);
                        webSocket.send("HELLO");
                    }

                    //setTimeout(() => {webSocket.send("HELLO");}, 5000);

                    webSocket.onerror = function (e) {
                        multiplayerServerView.querySelector('.signal').setAttribute('connected', 'false');
                        multiplayerServerView.querySelector('.signal').setAttribute('connection', '0/4');
                        multiplayerServerView.querySelector('.signal .ConnectionError').removeAttribute('hidden');
                        clearInterval(signalAnimation);
                    }
                }, 2000);
            });

            let TerrainB = [
                {
                    "name": "b",
                    "type": "minecraft:bedrock",
                    "scale": {
                        "x": 1,
                        "y": 1,
                        "z": 1
                    },
                    "id": 0,
                    "position": {
                        "x": 1,
                        "y": 6,
                        "z": 0
                    },
                    "count": 0,
                    "blocks": []
                }
            ];
            let serverInited = false;
            let plrPosition = {"x": 0, "y": 0, "z": 0};
            let ws = new WebSocket("https://e1a4bc2e-a7f9-4dd4-86b8-06495521bf8b-00-567ie5r871x9.spock.replit.dev:9000/");
            let pingStart = 0;
            let ping = `--`;
            window.onbeforeunload = function () {
                if (serverInited && ws) {
                    ws.send(`Player Connection Removed {"uid": "${uid}", "name": "${name}"}`);
                }
            }
            setTimeout(() => {
                serverInited = true;
                ws.send(`Player Connection Added {"name": "${name}", "uid": "${uid}", "msg": ""}`);
                setInterval(() => {
                    ws.send(`Get Players`);
                }, 1000);
                setInterval(() => {
                    ws.send(`Get Terrain`);
                }, 125);
                setInterval(() => {
                    pingStart = Date.now();
                    ws.send(`Get Ping {"uid": "${uid}"}`);
                }, 1000);
                setInterval(() => {
                    if (plrPosition.x === window.group.position.x) {
                        if (plrPosition.y === window.group.position.y) {
                            if (plrPosition.z === window.group.position.z) {
                                plrPosition.x = window.group.position.x;
                                plrPosition.y = window.group.position.y;
                                plrPosition.z = window.group.position.z;
                            } else {
                                plrPosition.x = window.group.position.x;
                                plrPosition.y = window.group.position.y;
                                plrPosition.z = window.group.position.z;
                                ws.send(`Player Position Changed {"uid": "${uid}", "position": {"x": ${plrPosition.x}, "y": ${plrPosition.y}, "z": ${plrPosition.z}}}`);
                            }
                        } else {
                            plrPosition.x = window.group.position.x;
                            plrPosition.y = window.group.position.y;
                            plrPosition.z = window.group.position.z;
                            ws.send(`Player Position Changed {"uid": "${uid}", "position": {"x": ${plrPosition.x}, "y": ${plrPosition.y}, "z": ${plrPosition.z}}}`);
                        }
                    } else {
                        plrPosition.x = window.group.position.x;
                        plrPosition.y = window.group.position.y;
                        plrPosition.z = window.group.position.z;
                        ws.send(`Player Position Changed {"uid": "${uid}", "position": {"x": ${plrPosition.x}, "y": ${plrPosition.y}, "z": ${plrPosition.z}}}`);
                    }
                }, 1);
            }, 5000);
            let uidCounts = 0;
            setInterval(() => {
                document.querySelector('.ping').textContent = `Ping: ${ping}ms`;
            }, 500);
            ws.onmessage = function (msg) {
                //console.log(msg);
                if (msg.data === `Player Hit: {"uid": "${uid}"}`) {
                    changeCurrentHP(getCurrentHP() - [1, 2, 3][Math.floor(Math.random() * 3)]);
                }
                if (msg.data.includes(`Recived Ping {"uid": "${uid}"}`)) {
                    let pingEnd = Date.now();
                    ping = pingEnd - pingStart;
                }
                if (msg.data.includes("Voice Chat: {")) {
                    // uid, name, voice-data
                    let json = JSON.parse(msg.data.replace("Voice Chat: ", ""));
                    const audioData = new Blob([json['voice-data']], { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioData);
                    t.audioElement.src = audioUrl;
                    t.audioElement.play();
                }
                if (msg.data.includes("Restrict")) {
                    let reason = JSON.parse(msg.data.replace("Restrict ", ""));
                    document.querySelector('.serverConnectionError').removeAttribute('hidden');
                    document.querySelector('.serverConnectionError').querySelector('.Error').textContent = reason.msg;
                }
                if (msg.data.includes("Chat Message: {")) {
                    let jMSG = JSON.parse(msg.data.replace("Chat Message: ", ""));
                    let divs = [];
                    let msgArray = jMSG.msg.split('');
                    msgArray.forEach(mA => {
                        let div = document.createElement('div');
                        div.textContent = mA;
                        if (mA === " ") {
                            div.setAttribute(`color`, `space`);
                        } else {
                            div.setAttribute(`color`, `white`);
                        }
                        divs.push(div);
                    });
                    let message = document.createElement('div');
                    message.className = "message";
                    divs.forEach(div => {
                        message.appendChild(div);
                    });
                    document.querySelector(`.chatBox .chat .top .chatMessages`).appendChild(message);
                }
                if (msg.data.includes("Break Block At: {")) {
                    let j = JSON.parse(msg.data.replace("Break Block At: ", ""));
                    getBlocks(``, true);
                    let posesX = [j.x + 0.2, j.x - 0.2, j.x + 0.1, j.x - 0.1, j.x + 0.3, j.x - 0.3, j.x + 0.4, j.x - 0.4, j.x];
                    let posesY = [j.y + 0.2, j.y - 0.2, j.y + 0.1, j.y - 0.1, j.y + 0.3, j.y - 0.3, j.y + 0.4, j.y - 0.4, j.y];
                    let posesZ = [j.z + 0.2, j.z - 0.2, j.z + 0.1, j.z - 0.1, j.z + 0.3, j.z - 0.3, j.z + 0.4, j.z - 0.4, j.z];
                    let numbers = [1, 2, 3, 4, 5];
                    let numberMax = 5;
                    for (let n = 0; n < numberMax + 1; n++) {
                        let x = posesX[Math.floor(Math.random() * posesX.length)];
                        let y = posesY[Math.floor(Math.random() * posesY.length)];
                        let z = posesZ[Math.floor(Math.random() * posesZ.length)];
                        let num = numbers[Math.floor(Math.random() * numbers.length)];
                        let breakParticles = new gameParticles({ "x": x, "y": y, "z": z }, `http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom - ${num}.png`, true, 0.2, 0.2, 0.01, 1, 0, true, 0.5, 5000);
                    }
                }
                if (msg.data.includes("Terrain: {")) {
                    let json = JSON.parse(msg.data.replace("Terrain: ", ""));
                    let blocks = json.blocks;
                    TerrainB = blocks;
                }
                if (msg.data.includes("Droped Item: {")) {

                }
                if (msg.data.includes("Players: [")) {
                    let array = JSON.parse(msg.data.replace("Players: ", ""));
                    array.forEach(plr => {
                        if (plr.uid === uid) {

                        } else {
                            if (scene.getObjectByName(plr.uid)) {
                                gsap.to(scene.getObjectByName(plr.uid).position, { "x": plr.position.x, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                                gsap.to(scene.getObjectByName(plr.uid).position, { "y": plr.position.y, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                                gsap.to(scene.getObjectByName(plr.uid).position, { "z": plr.position.z, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                            } else {
                                let plrGroup = new Group();
                                let plrHeadM = new MeshBasicMaterial({ color: 'black' });
                                let plrHeadG = new BoxGeometry(1, 1, 1);
                                let plrTursoM = new MeshBasicMaterial({ color: 'black' });
                                let plrTursoG = new BoxGeometry(1, 1.5, 0.5);
                                let plrHead = new Mesh(plrHeadG, plrHeadM);
                                let plrTurso = new Mesh(plrTursoG, plrTursoM);
                                plrHead.y += 2;
                                uidCounts += 1;
                                plrGroup.name = plr.uid;
                                plrGroup.isPlayer = true;
                                plrGroup.uid = plr.uid;
                                plrGroup.add(plrHead, plrTurso);
                                scene.add(plrGroup);
                            }
                        }
                    });
                }
                if (msg.data.includes("Player Position Changed {")) {
                    let json = JSON.parse(msg.data.replace("Player Position Changed ", ""));
                    if (uid === json.uid) {

                    } else {
                        if (scene.getObjectByName(json.uid)) {
                            gsap.to(scene.getObjectByName(json.uid).position, { "x": json.position.x, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                            gsap.to(scene.getObjectByName(json.uid).position, { "y": json.position.y, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                            gsap.to(scene.getObjectByName(json.uid).position, { "z": json.position.z, "duration": 0.2, "yoyo": false, "repeat": 0, "ease": "power1.inOut" });
                            //scene.getObjectByName(json.uid).position.set(json.position.x, json.position.y, json.position.z);
                        }
                    }
                }
                if (msg.data.includes("Player Connection Removed {")) {
                    let json = JSON.parse(msg.data.replace("Player Connection Removed ", ""));
                    if (json.uid) {
                        scene.getObjectByName(json.uid).remove();
                        //scene.remove(scene.getObjectByName(json.uid));
                    }
                }
            };
            ws.onclose = function () {
                serverInited = false;
                //console.log("Retrying Connection...");
                //ws = new WebSocket("https://e1a4bc2e-a7f9-4dd4-86b8-06495521bf8b-00-567ie5r871x9.spock.replit.dev:9000/");
            }

            class gameParticles {
                constructor (startPosition, image, sliceUpImage, width, height, length, amount, spread, shading, throwStrength, timeout) {
                    this.data = {
                        "image": image,
                        "sliceUpImage": sliceUpImage,
                        "amount": amount,
                        "spread": spread,
                        "shadingEnabled": shading,
                        "throwStrength": throwStrength,
                        "timeout": timeout,
                        "blocks": [],
                        "size": {
                            "width": width,
                            "height": height,
                            "length": length
                        },
                        "startPosition": {
                            "x": startPosition.x,
                            "y": startPosition.y,
                            "z": startPosition.z
                        }
                    };
                    this.init();
                    setTimeout(() => {
                        this.removeALL();
                    }, this.data.timeout);
                }

                amountCounted = 0;
                throwStrengthCounted = 0;
                throwGravity = 0.1;
                throwMinusGravity = 0.001;
                gravity = 0.01;

                removeALL () {
                    this.data.blocks.forEach(block => {
                        scene.remove(block);
                    });
                }

                update () {
                    this.data.blocks.forEach(Mesh => {
                        if (Mesh) {
                            if (getBlockByPosition(Math.round(Mesh.position.x), Math.trunc(Mesh.position.y), Math.round(Mesh.position.z))) {
                                
                            } else {
                                Mesh.position.y -= this.gravity;
                            }
                            Mesh.rotation.set(camera.rotation.x, camera.rotation.y, camera.rotation.z);
                        }
                    });
                }

                throw () {
                    if (this.throwStrengthCounted < this.data.throwStrength) {
                        this.throwGravity -= this.throwMinusGravity;
                        this.throwStrengthCounted += this.throwGravity;
                        if (this.throwStrengthCounted < this.data.throwStrength) {
                            this.throw();
                        }
                    }
                }

                init () {
                    if (this.amountCounted < this.data.amount + 1) {
                        this.amountCounted += 1;
                        let G = new BoxGeometry(this.data.size.width, this.data.size.height, this.data.size.length);
                        let M = new MeshStandardMaterial({ map: new TextureLoader().load(this.data.image) });
                        let Mesh = new InstancedMesh(G, M, 1);
                        this.data.blocks.push(Mesh);
                        Mesh.position.set(this.data.startPosition.x, this.data.startPosition.y, this.data.startPosition.z);
                        scene.add(Mesh);
                        if (this.amountCounted < this.data.amount + 1) {
                            this.init();
                        } else {
                            setInterval(() => {this.throw(); this.update();}, 1);
                        }
                    } else {
                        setInterval(() => {this.throw(); this.update();}, 1);
                    }
                }
            }

            class talk {
                constructor (enabled) {
                    this.enabled = enabled;
                }

                mediaRecorder;
                audioContext;
                analyser;
                microphone;
                javascriptNode;
                usable = false;
                isWaiting = false;
                audioChunks = [];

                wait () {
                    setTimeout(async () => {
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                            this.use();
                        } catch (err) {
                            this.wait();
                        }
                    }, 1000);
                }

                checkUseablity () {
                    setInterval(async () => {
                        try {
                            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                            this.usable = true;
                        } catch (err) {
                            this.usable = false;
                        }
                    }, 1000);
                }

                turnedOn = false;

                turnOn () {
                    this.turnedOn = true;
                }

                turnOff () {
                    this.turnedOn = false;
                }

                async use () {
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    this.analyser = this.audioContext.createAnalyser();
                    this.analyser.fftSize = 256;
                    const bufferLength = this.analyser.frequencyBinCount;
                    const dataArray = new Uint8Array(bufferLength);

                    try {
                        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                        this.checkUseablity();
                        this.mediaRecorder = new MediaRecorder(stream);
                        this.usable = true;
                        this.isWaiting = false;
                        this.microphone = this.audioContext.createMediaStreamSource(stream);
                        this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);

                        this.microphone.connect(this.analyser);
                        this.analyser.connect(this.javascriptNode);
                        this.javascriptNode.connect(this.audioContext.destination);
                        this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
                        //this.source = this.audioContext.createMediaStreamSource(new MediaStream());
                        this.audioElement = document.querySelector('.liveAudio');

                        //console.log(this.mediaRecorder);

                        //this.mediaRecorder.ondataavailable = event => {
                            //this.audioChunks.push(event.data);
                            //console.log(event.data);
                        //};

                        this.javascriptNode.onaudioprocess = (event) => {
                            if (this.usable === true) {
                                if (this.turnedOn === true) { 
                                    const inputBuffer = event.inputBuffer;
                                    const outputBuffer = event.outputBuffer;

                                    for (let channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
                                        const inputData = inputBuffer.getChannelData(channel);
                                        const outputData = outputBuffer.getChannelData(channel);

                                        for (let sample = 0; sample < inputBuffer.length; sample++) {
                                            outputData[sample] = inputData[sample];
                                            if (serverInited) {
                                                if (this.turnedOn === true) {
                                                    ws.send(`Voice Chat: {"uid": "${uid}", "name: "${name}", "voice-data": "${outputData}"}`);
                                                }
                                            }
                                        }
                                    }
                                    console.log(this.javascriptNode);
                                    this.isWaiting = false;
                                    this.analyser.getByteFrequencyData(dataArray);
                                    let values = 0;
                                    for (let i = 0; i < bufferLength; i++) {
                                        values += dataArray[i];
                                    }
                                    const average = values / bufferLength;
                                    //console.log(average.toFixed(2));
                                    document.querySelector('.voiceChatting .loudness').textContent = average.toFixed(2);
                                    document.querySelector('.voiceChatting .loudness').style.marginTop = "-10%";
                                    document.querySelector('.voiceChatting .loudness').style.fontSize = "100%";
                                } else {
                                    document.querySelector('.voiceChatting .loudness').textContent = 'Off';
                                    document.querySelector('.voiceChatting .loudness').style.marginTop = "-10%";
                                    document.querySelector('.voiceChatting .loudness').style.fontSize = "100%";
                                }
                            } else {
                                if (this.isWaiting === false) {
                                    this.isWaiting = true;
                                    this.wait();
                                    document.querySelector('.voiceChatting .loudness').textContent = 'Permission Ungranted.';
                                    document.querySelector('.voiceChatting .loudness').style.marginTop = "-20%";
                                    document.querySelector('.voiceChatting .loudness').style.fontSize = "65%";
                                } else {
                                    //this.mediaRecorder.pause();
                                }
                            }
                        };

                        //this.source.connect(processor);
                        this.processor.connect(this.audioContext.destination);

                        //this.mediaRecorder.start();
                        //console.log(this.javascriptNode);
                    } catch (err) {
                        console.error('Error accessing microphone:', err);
                        this.wait();
                    }
                }

                WriteVoiceToServer () {

                }
            }

            setTimeout(() => {
                let t = new talk(true);
                t.use();
                window.addEventListener('keyup', (e) => {
                    if (e.key === 'v') {
                        if (t.turnedOn === true) {
                            t.turnOff();
                        } else {
                            t.turnOn();
                        }
                    } else if (e.key === 'V') {
                        if (t.turnedOn === true) {
                            t.turnOff();
                        } else {
                            t.turnOn();
                        }
                    }
                });
            }, 5000);

            class LeftHand {
                constructor (HandType, Player, Image) {
                    this.Player = camera;
                    this.Image = Image;
                    if (HandType === "Defualt") {
                        this.HandType = "Defualt";
                    } else {
                        this.HandType = "Slim";
                    }
                }

                create () {
                    var handTextureLoader = new TextureLoader();
                    let handSizeX;
                    let handSizeY;
                    let handSizeZ;
                    let handPosX;
                    let handPosY;
                    let handPosZ;
                    if (this.HandType === "Defualt") {
                        handSizeX = 0.2;
                        handSizeY = 0.2;
                        handSizeZ = 0.5;

                        handPosX = this.Player.position.x;
                        handPosY = this.Player.position.y;
                        handPosZ = this.Player.position.z;

                        var handGeometry = new BoxGeometry(handSizeX, handSizeY, handSizeZ);
                        let m1 = new MeshBasicMaterial({ opacity: 0, wireframe: false, transparent: true, map: handTextureLoader.load("http://127.0.0.1:5500/textures/Hand.png")});
                        let m2 = new MeshBasicMaterial({ opacity: 0, wireframe: false, transparent: true, map: handTextureLoader.load("http://127.0.0.1:5500/textures/HandTop.png")});
                        let m3 = new MeshBasicMaterial({ opacity: 0, wireframe: false, transparent: true, map: handTextureLoader.load("http://127.0.0.1:5500/textures/HandBottom.png")});
                        m1.minFilter = LinearFilter;
                        m2.minFilter = LinearFilter;
                        m3.minFilter = LinearFilter;
                        m1.magFilter = LinearFilter;
                        m2.magFilter = LinearFilter;
                        m3.magFilter = LinearFilter;
                        var handMaterial = [
                            m1,
                            m1,
                            m1,
                            m1,
                            m3,
                            m2
                        ];
                        var hand = new Mesh(handGeometry, handMaterial);
                        hand.position.set(handPosX, handPosY, handPosZ);
                        hand["reciveShadow"] = true;
                        let g = new Group();
                        this.g = g;
                        this.hand = hand;
                        window.group.add(g);
                        //g.position.set(-0.1, 0.5, -0.7);
                        g.add(hand);
                        hand.name = "PlayerPrivate-Hand_";
                        scene.add(g);
                    } else {
                        handSizeX = 0.2;
                        handSizeY = 0.15;
                        handSizeZ = 1;

                        handPosX = this.Player.position.x + 0.15;
                        handPosY = this.Player.position.y;
                        handPosZ = this.Player.position.z;

                        var handGeometry = new BoxGeometry(handSizeX, handSizeY, handSizeZ);
                        var handMaterial = new MeshBasicMaterial({ opacity: 0, wireframe: false, transparent: true, map: handTextureLoader.load(this.Image) });
                        var hand = new Mesh(handGeometry, handMaterial);
                        hand.position.set(handPosX, handPosY, handPosZ);
                        hand["reciveShadow"] = true;
                        this.hand = hand;
                        hand.name = "PlayerPrivate-Hand_";
                        let g = new Group();
                        this.g = g;
                        window.group.add(g);
                        g.position.set(-0.1, 0.5, -0.7);
                        g.add(hand);
                    }

                    document.addEventListener('mousemove', (e) => {
                        this.move(e);
                    });
                }

                setRotation (x, y, z) {
                    this.hand.rotation.set(x + 1, y + -0.1, z + -0.4);
                }

                show () {
                    if (this.hand) {
                        this.hand.material.opacity = 1;
                    } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                        scene.getObjectByName("PlayerPrivate-Hand_").material.opacity = 1;
                    }
                }

                hide () {
                    if (this.hand) {
                        this.hand.material.opacity = 0;
                    } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                        scene.getObjectByName("PlayerPrivate-Hand_").material.opacity = 0;
                    }
                }

                equiptItem () {
                    if (this.item) {
                        this.item.remove();
                        this.hand.remove();
                    } else {
                        this.hand.remove();
                    }
                }

                unequiptItem () {
                    if (this.item) {
                        this.item.remove();
                        this.create();
                    }
                }

                handAnimation (animation) {
                    var play = function () {

                    }
                    
                    var pause = function () {

                    }
                }

                startWalkAnimation (transition) {
                    if (transition === true) {

                    } else {

                    }
                }

                beforeMovement = {"x": 0, "y": 0}

                move (event) {
                    const movementX = event.movementX || 0;
                    const movementY = event.movementY || 0;

                    this.beforeMovement = {"x": movementX, "y": movementY};
                }

                update (transition) {
                    let handPosX;
                    let handPosY;
                    let handPosZ;
                    this.Player = camera;

                    if (transition === true) {
                        if (this.HandType === "Defualt") {
                            handPosX = this.Player.position.x + camera.rotation.z + 0.25;
                            handPosY = this.Player.position.y + camera.rotation.z - 0.85;
                            handPosZ = this.Player.position.z - 0.5;
                            let handRotX = 1 + this.Player.rotation.x;
                            let handRotY = -0.1;
                            let handRotZ = -0.4;

                            if (this.hand) {
                                this.hand.position.set(handPosX, handPosY, handPosZ);
                                this.hand.rotation.set(handRotX, handRotY, handRotZ);
                            } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                                scene.getObjectByName("PlayerPrivate-Hand_").position.set(handPosX, handPosY, handPosZ);
                                scene.getObjectByName("PlayerPrivate-Hand_").rotation.set(handRotX, handRotY, handRotZ);
                            }
                        } else {
                            handPosX = this.Player.position.x + camera.rotation.z + 0.25;
                            handPosY = this.Player.position.y + camera.rotation.z;
                            handPosZ = this.Player.position.z - 0.25;
                            let handRotX = 1 + this.Player.rotation.x;
                            let handRotY = -0.1;
                            let handRotZ = -0.4;

                            if (this.hand) {
                                this.hand.position.set(handPosX, handPosY, handPosZ);
                                this.hand.rotation.set(handRotX, handRotY, handRotZ);
                            } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                                scene.getObjectByName("PlayerPrivate-Hand_").position.set(handPosX, handPosY, handPosZ);
                                scene.getObjectByName("PlayerPrivate-Hand_").rotation.set(handRotX, handRotY, handRotZ);
                            }
                        }
                    } else {
                        if (this.HandType === "Defualt") {
                            handPosX = this.Player.position.x + camera.rotation.z + 0.15;
                            handPosY = this.Player.position.y + camera.rotation.z - 0.3;
                            handPosZ = this.Player.position.z - 0.25;
                            let handRotX = 1 + camera.rotation.x;
                            let handRotY = -3.3;
                            let handRotZ = -1.15;
    
                            if (this.hand) {
                                gsap.to(this.hand.position, { "x": handPosX, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(this.hand.position, { "y": handPosY, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(this.hand.position, { "z": handPosZ, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(this.hand.rotation, { "x": handRotX, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(this.hand.rotation, { "y": handRotY, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(this.hand.rotation, { "z": handRotZ, "duration": 0.5, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                //this.hand.rotation.set(handRotX, handRotY, handRotZ);
                            } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                                //gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").position, { "x": handPosX, "duration": 0.2, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                //gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").position, { "y": handPosY, "duration": 0.2, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                //gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").position, { "z": handPosZ, "duration": 0.2, "yoyo": true, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").rotation, { "x": handRotX, "duration": 0.2, "yoyo": false, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").rotation, { "y": handRotY, "duration": 0.2, "yoyo": false, "repeat": 1, "ease": "power1.inOut" });
                                gsap.to(scene.getObjectByName("PlayerPrivate-Hand_").rotation, { "z": handRotZ, "duration": 0.2, "yoyo": false, "repeat": 1, "ease": "power1.inOut" });
                                scene.getObjectByName("PlayerPrivate-Hand_").position.set(handPosX, handPosY, handPosZ);
                                //scene.getObjectByName("PlayerPrivate-Hand_").rotation.set(handRotX, handRotY, handRotZ);
                            }
                        } else {
                            handPosX = this.Player.position.x + camera.rotation.z + 0.25;
                            handPosY = this.Player.position.y + camera.rotation.z + 0.85;
                            handPosZ = this.Player.position.z - 0.25;
                            let handRotX = 1 + this.Player.rotation.x;
                            let handRotY = -0.1;
                            let handRotZ = -0;

                            if (this.hand) {
                                this.hand.position.set(handPosX, handPosY, handPosZ);
                                this.hand.rotation.set(handRotX, handRotY, handRotZ);
                            } else if (scene.getObjectByName("PlayerPrivate-Hand_")) {
                                scene.getObjectByName("PlayerPrivate-Hand_").position.set(handPosX, handPosY, handPosZ);
                                scene.getObjectByName("PlayerPrivate-Hand_").rotation.set(handRotX, handRotY, handRotZ);
                            }
                        }
                    }

                    //const movementX = this.beforeMovement.x || 0;
                    //const movementY = this.beforeMovement.y || 0;

                    //window.group.getObjectByName('PlayerPrivate-Hand_').position.x = movementX;
                }
            }

            class sun_moon {
                constructor (networkRequired, onmessage) {
                    this.networkRequired = networkRequired;
                    this.on = onmessage;
                }

                create () {
                    let sun_moon_group = new Group();
                    sun_moon_group.name = "sun_moon";
                    let sun_moon_geometry = new BoxGeometry(500, 500, 0);
                    let sunTexture = new TextureLoader().load('https://bananakitssu.github.io/resources/MCSun.png');
                    let moonTexture = new TextureLoader().load('https://bananakitssu.github.io/resources/MCMoon.png');
                    let sun = new Mesh(sun_moon_geometry, new MeshBasicMaterial({ transparent: true, opacity: 1, map: sunTexture }));
                    let moon = new Mesh(sun_moon_geometry, new MeshBasicMaterial({ transparent: true, opacity: 1, map: moonTexture }));
                    var color = 0xFFFFFF;
                    var sunIntensity = 1;
                    var moonIntensity = 0.2;
                    var sunLight = new DirectionalLight(color, sunIntensity);
                    sunLight.position.set(sun.position.x + 1, sun.position.y, sun.position.z);
                    var sunLightLeft = new DirectionalLight(color, sunIntensity);
                    sunLightLeft.position.set(sun.position.x + 1, sun.position.y, sun.position.z - 1500);
                    var sunLightRight = new DirectionalLight(color, sunIntensity);
                    sunLightRight.position.set(sun.position.x + 1, sun.position.y, sun.position.z + 1500);
                    var sunLightFront = new DirectionalLight(color, sunIntensity);
                    sunLightFront.position.set(sun.position.x + 1, sun.position.y + 1500, sun.position.z);
                    var sunLightBack = new DirectionalLight(color, sunIntensity);
                    sunLightBack.position.set(sun.position.x + 1, sun.position.y - 1500, sun.position.z);
                    var moonLight = new DirectionalLight(color, moonIntensity);
                    moonLight.position.set(moon.position.x - 1, moon.position.y, moon.position.z);
                    var moonLightLeft = new DirectionalLight(color, moonIntensity);
                    moonLightLeft.position.set(moon.position.x - 1, moon.position.y, moon.position.z - 1500);
                    var moonLightRight = new DirectionalLight(color, moonIntensity);
                    moonLightRight.position.set(moon.position.x - 1, moon.position.y, moon.position.x + 1500);
                    var moonLightFront = new DirectionalLight(color, moonIntensity);
                    moonLightFront.position.set(moon.position.x - 1, moon.position.y + 1500, moon.position.z);
                    var moonLightBack = new DirectionalLight(color, moonIntensity);
                    moonLightBack.position.set(moon.position.x - 1, moon.position.y - 1500, moon.position.z);
                    sun.position.set(-500, 0, 0);
                    moon.position.set(500, 0, 0);
                    scene.add(sun_moon_group);
                    sunLight.castShadow = true;
                    sunLightBack.castShadow = true;
                    sunLightFront.castShadow = true;
                    sunLightLeft.castShadow = true;
                    sunLightRight.castShadow = true;
                    moonLight.castShadow = true;
                    moonLightBack.castShadow = true;
                    moonLightFront.castShadow = true;
                    moonLightLeft.castShadow = true;
                    moonLightRight.castShadow = true;
                    sunLight.shadow.mapSize.width = 1024;
                    sunLight.shadow.mapSize.height = 1024;
                    sunLight.shadow.camera.near = 0.5;
                    sunLight.shadow.camera.far = 500;
                    sunLight.shadow.camera.left = -50;
                    sunLight.shadow.camera.right = 50;
                    sunLight.shadow.camera.top = 50;
                    sunLight.shadow.camera.bottom = -50;
                    sunLightBack.shadow.mapSize.width = 1024;
                    sunLightBack.shadow.mapSize.height = 1024;
                    sunLightBack.shadow.camera.near = 0.5;
                    sunLightBack.shadow.camera.far = 500;
                    sunLightBack.shadow.camera.left = -50;
                    sunLightBack.shadow.camera.right = 50;
                    sunLightBack.shadow.camera.top = 50;
                    sunLightBack.shadow.camera.bottom = -50;
                    sunLightFront.shadow.mapSize.width = 1024;
                    sunLightFront.shadow.mapSize.height = 1024;
                    sunLightFront.shadow.camera.near = 0.5;
                    sunLightFront.shadow.camera.far = 500;
                    sunLightFront.shadow.camera.left = -50;
                    sunLightFront.shadow.camera.right = 50;
                    sunLightFront.shadow.camera.top = 50;
                    sunLightFront.shadow.camera.bottom = -50;
                    sunLightLeft.shadow.mapSize.width = 1024;
                    sunLightLeft.shadow.mapSize.height = 1024;
                    sunLightLeft.shadow.camera.near = 0.5;
                    sunLightLeft.shadow.camera.far = 500;
                    sunLightLeft.shadow.camera.left = -50;
                    sunLightLeft.shadow.camera.right = 50;
                    sunLightLeft.shadow.camera.top = 50;
                    sunLightLeft.shadow.camera.bottom = -50;
                    sunLightRight.shadow.mapSize.width = 1024;
                    sunLightRight.shadow.mapSize.height = 1024;
                    sunLightRight.shadow.camera.near = 0.5;
                    sunLightRight.shadow.camera.far = 500;
                    sunLightRight.shadow.camera.left = -50;
                    sunLightRight.shadow.camera.right = 50;
                    sunLightRight.shadow.camera.top = 50;
                    sunLightRight.shadow.camera.bottom = -50;
                    sun_moon_group.add(sun, moon, sunLight, sunLightLeft, sunLightRight, sunLightFront, sunLightBack, moonLight, moonLightLeft, moonLightRight, moonLightFront, moonLightBack);
                    this.time = 21600;
                    this.sun = sun;
                    this.moon = moon;
                    this.g = sun_moon_group;
                    this.sunLights = {
                        "Light1": sunLight,
                        "Light2": sunLightLeft,
                        "Light3": sunLightRight,
                        "Light4": sunLightFront,
                        "Light5": sunLightBack
                    };
                    this.moonLights = {
                        "Light1": moonLight,
                        "Light2": moonLightLeft,
                        "Light3": moonLightRight,
                        "Light4": moonLightFront,
                        "Light5": moonLightBack
                    };
                    setInterval(() => {
                        if (this.time > 64800) {
                            this.time = 0;
                        } else {
                            this.time += 1;
                        }
                    }, 20);
                    setInterval(() => {
                        this.update();
                    }, 5);
                }

                updateLights () {
                    this.sunLights.Light1.position.set(this.sun.position.x + 1, this.sun.position.y, this.sun.position.z);
                    this.sunLights.Light2.position.set(this.sun.position.x + 1, this.sun.position.y, this.sun.position.z - 1500);
                    this.sunLights.Light3.position.set(this.sun.position.x + 1, this.sun.position.y, this.sun.position.z + 1500);
                    this.sunLights.Light4.position.set(this.sun.position.x + 1, this.sun.position.y + 1500, this.sun.position.z);
                    this.sunLights.Light5.position.set(this.sun.position.x + 1, this.sun.position.y - 1500, this.sun.position.z);
                    this.moonLights.Light1.position.set(this.moon.position.x + 1, this.moon.position.y, this.moon.position.z);
                    this.moonLights.Light2.position.set(this.moon.position.x + 1, this.moon.position.y, this.moon.position.z - 1500);
                    this.moonLights.Light3.position.set(this.moon.position.x + 1, this.moon.position.y, this.moon.position.z + 1500);
                    this.moonLights.Light4.position.set(this.moon.position.x + 1, this.moon.position.y + 1500, this.moon.position.z);
                    this.moonLights.Light5.position.set(this.moon.position.x + 1, this.moon.position.y - 1500, this.moon.position.z);
                }

                update () {
                    this.sun.rotation.set(0, camera.rotation.y, camera.rotation.z);
                    this.moon.rotation.set(0, camera.rotation.y, camera.rotation.z);
                    //this.g.position = window.group.position;
                    if (this.time < 10800) {
                        this.sun.position.set(1000 + window.group.position.x, -this.time / 50 + window.group.position.y, 0);
                        this.moon.position.set(-1000 + window.group.position.x, this.time / 50 + window.group.position.y, 0);
                    } else {
                        if (this.time < 18000) {
                            this.sun.position.set(1000 + window.group.position.x - this.time / 100, -1000 + window.group.position.y, 0);
                            this.moon.position.set(-1000 + window.group.position.x + this.time / 100, 1000 + window.group.position.y, 0);
                        } else {
                            if (this.time < 21600) {
                                this.sun.position.set(-1000 + window.group.position.x, -1000 + window.group.position.y + this.time / 150, 0);
                                this.moon.position.set(1000 + window.group.position.x, 1000 + window.group.position.y - this.time / 150, 0);
                            } else {
                                if (this.time < 32400) {
                                    this.sun.position.set(-1000 + window.group.position.x, this.time / 200 + window.group.position.y, 0);
                                    this.moon.position.set(1000 + window.group.position.x, -this.sun.position.y + window.group.position.y, 0);
                                } else {
                                    if (this.time < 43200) {
                                        this.sun.position.set(this.time / 250 + window.group.position.x, 1000 + window.group.position.y, 0);
                                        this.moon.position.set(this.time * 2 / 250 + window.group.position.x, -1000 + window.group.position.y, 0);
                                    } else {
                                        if (this.time < 64800) {
                                            this.sun.position.set(1000 + window.group.position.x, 1000 - this.time / 300 + window.group.position.y, 0);
                                            this.moon.position.set(-1000 + window.group.position.x, -1000 + this.time / 300 + window.group.position.y, 0);
                                        } else {
                                            this.time = 0;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    this.updateLights();
                }
            }

            var timer1;

            window.addEventListener("gamepadconnected", () => {
                timer1 = setInterval(updateGamepadStatus, 1); // Update gamepad status every 100ms
                document.querySelector('.gamepad').removeAttribute('hidden');
            });

            window.addEventListener("gamepaddisconnected", () => {
                clearInterval(timer1);
                document.querySelector('.gamepad').setAttribute('hidden', '');
            });

            window.Hp = 20;
            window.HpMax = 20;
            window.BeforeHp = 19;

            var PlayerID;

            class CraftingTable {
                constructor (Block) {
                    if (Block) {
                        this.craftingTable = Block;
                        this.craftingTableInterval = setInterval(() => {

                        }, 1000);
                    }
                }

                inputSlots = {
                    "Row-1": {
                        "Slot-1": null,
                        "Slot-2": null,
                        "Slot-3": null
                    },
                    "Row-2": {
                        "Slot-1": null,
                        "Slot-2": null,
                        "Slot-3": null
                    },
                    "Row-3": {
                        "Slot-1": null,
                        "Slot-2": null,
                        "Slot-3": null
                    }
                };

                outputSlot = {
                    "Slot": null
                };

                getInputSlots () {
                    if (this.inputSlots) {
                        return this.inputSlots;
                    }
                };

                getOutputSlots () {
                    if (this.outputSlot) {
                        return this.outputSlot;
                    }
                };

                changeInputSlot (Row, Slot, value) {
                    if (Row) {
                        if (Slot) {
                            this.inputSlots["Row-" + Row]["Slot-" + Slot] = value;
                        }
                    }
                }

                addInputSlotItemCount (Row, Slot, value) {
                    if (Row) {
                        if (Slot) {
                            var inputValue = this.inputSlots["Row-" + Row]["Slot-" + Slot]["count"];
                            var inputVal = inputValue + value;
                            this.inputSlots["Row-" + Row]["Slot-" + Slot]["count"] = inputVal;
                        }
                    }
                }

                changeOutputSlot (value) {
                    if (value) {
                        this.outputSlot["Slot"] = value;
                    }
                }

                craft () {
                    this.outputSlot["Slot"] = null;

                    if (this.inputSlots["Row-1"]["Slot-1"] === "Oak Log") {
                        this.outputSlot["Slot"] = "Oak Plank";
                    }
                }

                exit () {

                }
            }

            function slotClick (slotElement, craftingTableClass) {
                var row = slotElement.parentElement.getAttribute("RowNumber");
                var slot = slotElement.getAttribute("SlotNumber");
                var slotJson = JSON.parse(slotElement.getAttribute('json'));

                if (craftingTableClass) {
                    craftingTableClass.changeInputSlot(row, slot, slotJson);
                }
            }

            function slotRightClick (slotElement, craftingTableClass) {
                var row = slotElement.parentElement.getAttribute("RowNumber");
                var slot = slotElement.getAttribute("SlotNumber");

                if (craftingTableClass) {
                    craftingTableClass.changeInputSlot(row, slot, 1);
                }
            }

            function CreateAiEntity (entityName, entityType) {
                var entity = new Group();
                entity.name = entityName + "-" + entityType;
                var entityHeadGeometry = new BoxGeometry( 1, 1, 1 );
                var entityHeadMaterial = new MeshBasicMaterial( {transparent: true, color: "black"} );
                var entityBodyGeometry = new BoxGeometry( 1, 1, 1 );
                var entityBodyMaterial = new MeshBasicMaterial( {transparent: true, color: "black"} );
                var entityBody = new Mesh (entityBodyGeometry, entityBodyMaterial);
                var entityHead = new Mesh (entityHeadGeometry, entityHeadMaterial);
                entityHead.position.y += 0.5;
                entityHead.position.x += 0.5;
                
                entityBody.name = "Body";
                entityHead.name = "Head";
                entity.position.set(1,1,1);
                console.log(scene);
                entity.add(entityBody, entityHead);
                scene.add(entity);
            }

            var entityWorkTimer;

            function AiEntity (entityName, entityType) {
                var entity = scene.getObjectByName(entityName + "-" + entityType);
                if (entity) {
                    var entityAttacked = false;
                    var entityHead = entity.getObjectByName("Head");
                    if (["look", "idle", "move", "look-move"][Math.floor(Math.random() * ["look", "idle", "move", "look-move"].length)] === "look") {
                        clearInterval(entityWorkTimer);
                        entityWorkTimer = setInterval(() => {
                            if (entityHead) {
                                entityHead.rotation.x = window.group.position.z;
                                entityHead.rotation.y = window.group.position.y;
                            }
                        }, 5);
                    } else if (["look", "idle", "move", "look-move"][Math.floor(Math.random() * ["look", "idle", "move", "look-move"].length)] === "idle") {
                        entityHead.rotation.x = 0;
                        entityHead.rotation.y = 0;
                        clearInterval(entityWorkTimer);
                    } else if (["look", "idle", "move", "look-move"][Math.floor(Math.random() * ["look", "idle", "move", "look-move"].length)] === "move") {
                        clearInterval(entityWorkTimer);
                        if (entityAttacked === false) {
                            entityWorkTimer = setInterval(() => {
                                entityHead.rotation.x = 0;
                                entityHead.rotation.y = 0;
                                if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-1") {
                                    entity.position.x += 0.02;
                                } else if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-2") {
                                    entity.position.z += 0.02;
                                }
                            }, 5)
                        } else if (entityAttacked === true) {
                            entityWorkTimer = setInterval(() => {
                                entityHead.rotation.x = 0;
                                entityHead.rotation.y = 0;
                                if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-1") {
                                    entity.position.x += 0.02 * 3;
                                } else if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-2") {
                                    entity.position.z += 0.02 * 3;
                                }
                            }, 5)
                        }
                    } else if (["look", "idle", "move", "look-move"][Math.floor(Math.random() * ["look", "idle", "move", "look-move"].length)] === "look-move") {
                        clearInterval(entityWorkTimer);
                        window.entityWork = 1500;
                        entityWorkTimer = setInterval(() => {
                            entityHead.rotation.x = window.group.position.y;
                            entityHead.rotation.y = window.group.position.z;
                            if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-1") {
                                entity.position.x += 0.02;
                            } else if (["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"][Math.floor(Math.random() * ["walk-1", "walk-1", "walk-1", "walk-2", "walk-2", "walk-2"].length)] === "walk-2") {
                                entity.position.z += 0.02;
                            }
                        }, 5);
                    };
                }
            }

            setTimeout(() => {
                CreateAiEntity("EntityTest-abc-000", "Block");
            }, 500);

            window.entityWork = 1000;

            setInterval(() => {
                AiEntity("EntityTest-abc-000", "Block");
            }, window.entityWork);

            /*setInterval(() => {
                createCloud();
            }, 1000)*/

            var handCreated = false;
            let sun_moon_created = false;
            let sun_moon_class;

            function animateGame () {
                requestAnimationFrame((t) => {
                    animateGame();
                        //_Step(t - this._previousRAF);
                        //if (this._previousRAF === null) {
                            //this._previousRAF = t;
                        //}
                        //this._previousRAF = t;
                });

                render();

                //window.crouchY = window.group.position.y - 0.5;
                nameTag.setPosition({'x': window.group.position.x, 'y': window.group.position.y + 2.5, 'z': window.group.position.z});

                if (sun_moon_created === false) {
                    sun_moon_class = new sun_moon(false, null);
                    sun_moon_class.create();
                    sun_moon_created = true;
                }
                var hand = new LeftHand("Defualt", camera, "http://127.0.0.1:5500/textures/BedrockTexture.webp");

                //if (window.BeforeHp === window.Hp) {} else {hp.hpUpdate(window.Hp);hp.maxUpdate(window.HpMax);hp.initHp();window.BeforeHp = window.Hp};

                //if (window.HPE === 19) {hp.hpUpdate(20, 20); window.HPE = 20;};
                //window.sun.rotation.z += 0.005;
                //window.moon.rotation.z += 0.005;
                //window.sun.position.y += 0.1;
                //window.sun.position.x += 0.1;
                //window.moon.position.y -= 0.1;
                //window.moon.position.x -= 0.1;
                //window.moon.position.set(50 + window.group.position.x, window.group.position.y, window.group.position.z);
                //window.sun.position.set(-50 + window.group.position.x, window.group.position.y, window.group.position.z);
                //camera.fieldsOfView = window.FOV;

                //camera.fov = window.FOV;
                camera.updateProjectionMatrix();
                //frame.positon.x = window.group.position.x;
                //frame.positon.y = window.group.getObjectByName(PlayerID + " - Player Head").position.y + 1.5;
                //frame.positon.z = window.group.position.z;

                if (window.group) controls.update();

                if (F4Locked) {
                    camera.position.x = window.group.position.x;
                    camera.position.y = window.group.position.y + 1.5;
                    camera.position.z = window.group.position.z + 5;
                    window.group.getObjectByName('torso').material.forEach((mat) => {
                        mat.opacity = 1;
                    });
                    //window.group.rotation.y = camera.rotation.y;
                    var leftHand = scene.getObjectByName("PlayerPrivate-Hand_");
                    if (leftHand) {
                        if (hand) {
                            if (window.handShown === false) {
                                hand.hide();
                            } else {
                                hand.show();
                            }
                        }
                    }
                } else {
                    camera.position.x = window.group.position.x;
                    camera.position.y = window.group.position.y + 1.5;
                    camera.position.z = window.group.position.z;
                    window.group.getObjectByName('torso').material.forEach((mat) => {
                        mat.opacity = 0;
                    });
                    //window.group.rotation.y = camera.rotation.y;
                    var leftHand = scene.getObjectByName("PlayerPrivate-Hand_");
                    if (leftHand) {
                        if (hand) {
                            if (window.handShown === false) {
                                hand.hide();
                            } else {
                                hand.show();
                            }
                        }
                    }
                }

                if (!handCreated) {
                    hand.create();
                    handCreated = true;
                } else {
                    hand.update(false);
                    //hand.setRotation(window.group.getObjectByName(PlayerID + ' - Player Head').rotation.x, window.group.getObjectByName(PlayerID + ' - Player Head').rotation.y, window.group.getObjectByName(PlayerID + ' - Player Head').rotation.z);
                }

                //window.group.rotation.y = camera.rotation.y;
                //window.group.rotation.y = camera.rotation.y;

                /*if (beforeRoationY === 0) {
                    beforeRoationY = window.group.rotation.y;
                } else {
                    window.group.rotation.y = camera.rotation.y;
                    if (beforeRoationY === window.group.rotation.y) {

                    } else {
                        beforeRoationY = window.group.rotation.y;
                    }
                }*/
                
                var playerX = Math.trunc(player.group.position.x);
                var playerY = Math.trunc(player.group.position.y);
                var playerZ = Math.trunc(player.group.position.z);
                document.querySelector('.player-position').textContent = "X: " + playerX + ", Y: " + playerY + ", Z: " + playerZ;
            }

            const playerRaycaster = new Raycaster();
            const playerMouse = new Vector2();

            document.addEventListener('mousedown', (event) => {
                if (event.button === 0) {
                    //playerRemoveBlock();
                } else if (event.button === 2) {
                    //playerPlaceBlock();
                }
            });

            let focusedBlock;
            let breakPercent = 0;

            function facePointed (intersect) {
                if (intersect.face) {
                    if (intersect.face.normal) {
                        if (intersect.face.normal.x === 1) {
                            return "Right";
                        } else if (intersect.face.normal.x === -1) {
                            return "Left";
                        } else if (intersect.face.normal.y === 1) {
                            return "Top";
                        } else if (intersect.face.normal.y === -1) {
                            return "Bottom";
                        } else if (intersect.face.normal.z === -1) {
                            return "Front";
                        } else if (intersect.face.normal.z === 1) {
                            return "Back";
                        }
                    }
                }
            }

            let blockTypeSelected = "minecraft:oak_plank";

            setTimeout(() => {
                let blockSelectHighlightGroup = new Group();
                let lightFilterM = new MeshBasicMaterial({ color: 'white', transparent: true, opacity: 0.3 });
                let lightFilterG = new BoxGeometry(1.001, 1.001, 1.001);
                let lightFilter = new Mesh(lightFilterG, lightFilterM);
                let blockHighlightLine1M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine1G = new BoxGeometry(1.001, 0.001, 0.001);
                let blockHighlightLine1 = new Mesh(blockHighlightLine1G, blockHighlightLine1M);
                blockHighlightLine1.position.set(0, 0.5, 0.5);
                let blockHighlightLine2M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine2G = new BoxGeometry(1.001, 0.001, 0.001);
                let blockHighlightLine2 = new Mesh(blockHighlightLine2G, blockHighlightLine2M);
                blockHighlightLine2.position.set(0, 0.5, -0.5);
                let blockHighlightLine3M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine3G = new BoxGeometry(0.001, 0.001, 1.001);
                let blockHighlightLine3 = new Mesh(blockHighlightLine3G, blockHighlightLine3M);
                blockHighlightLine3.position.set(0.5, 0.5, 0);
                let blockHighlightLine4M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine4G = new BoxGeometry(0.001, 0.001, 1.001);
                let blockHighlightLine4 = new Mesh(blockHighlightLine4G, blockHighlightLine4M);
                blockHighlightLine4.position.set(-0.5, 0.5, 0);
                let blockHighlightLine5M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine5G = new BoxGeometry(1.001, 0.001, 0.001);
                let blockHighlightLine5 = new Mesh(blockHighlightLine5G, blockHighlightLine5M);
                blockHighlightLine5.position.set(0, -0.5, 0.5);
                let blockHighlightLine6M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine6G = new BoxGeometry(1.001, 0.001, 0.001);
                let blockHighlightLine6 = new Mesh(blockHighlightLine6G, blockHighlightLine6M);
                blockHighlightLine6.position.set(0, -0.5, -0.5);
                let blockHighlightLine7M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine7G = new BoxGeometry(0.001, 0.001, 1.001);
                let blockHighlightLine7 = new Mesh(blockHighlightLine7G, blockHighlightLine7M);
                blockHighlightLine7.position.set(0.5, -0.5, 0);
                let blockHighlightLine8M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine8G = new BoxGeometry(0.001, 0.001, 1.001);
                let blockHighlightLine8 = new Mesh(blockHighlightLine8G, blockHighlightLine8M);
                blockHighlightLine8.position.set(-0.5, -0.5, 0);
                let blockHighlightLine9M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine9G = new BoxGeometry(0.001, 1.001, 0.001);
                let blockHighlightLine9 = new Mesh(blockHighlightLine9G, blockHighlightLine9M);
                blockHighlightLine9.position.set(0.5, 0, 0.5);
                let blockHighlightLine10M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine10G = new BoxGeometry(0.001, 1.001, 0.001);
                let blockHighlightLine10 = new Mesh(blockHighlightLine10G, blockHighlightLine10M);
                blockHighlightLine10.position.set(-0.5, 0, 0.5);
                let blockHighlightLine11M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine11G = new BoxGeometry(0.001, 1.001, 0.001);
                let blockHighlightLine11 = new Mesh(blockHighlightLine11G, blockHighlightLine11M);
                blockHighlightLine11.position.set(0.5, 0, -0.5);
                let blockHighlightLine12M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockHighlightLine12G = new BoxGeometry(0.001, 1.001, 0.001);
                let blockHighlightLine12 = new Mesh(blockHighlightLine12G, blockHighlightLine12M);
                blockHighlightLine12.position.set(-0.5, 0, -0.5);
                let blockBreakProgress1 = new Group();
                let blockBreakProgress2 = new Group();
                let blockBreakProgress3 = new Group();
                let blockBreakProgress4 = new Group();
                let blockBreakProgress5 = new Group();
                let blockBreakProgress6 = new Group();
                let blockBreakProgress1_10P_M = new MeshBasicMaterial({ color: 'black', transparent: true, opacity: 1 });
                let blockBreakProgress1_10P_G = new BoxGeometry(0.5, 0.5, 0.5);
                scene.add(blockSelectHighlightGroup);
                blockSelectHighlightGroup.add(/*lightFilter, */blockHighlightLine1, blockHighlightLine2, blockHighlightLine3, blockHighlightLine4, blockHighlightLine5, blockHighlightLine6, blockHighlightLine7, blockHighlightLine8, blockHighlightLine9, blockHighlightLine10, blockHighlightLine11, blockHighlightLine12);
                //window.addEventListener('mousemove', () => {
                //let hold = false;
                //let lastIntersect;
                /*setInterval(() => {
                    if (hold === true) {
                        if (typeof focusedBlock === 'object') {
                            if (focusedBlock) {
                                if (focusedBlock.name) {
                                    if (focusedBlock.name === lastIntersect.object.name) {
                                        breakPercent += 0.01;
                                        console.log('Breaking... '+breakPercent);
                                    } else {
                                        focusedBlock = lastIntersect.object;
                                        breakPercent = 0;
                                    }
                                } else {
                                    focusedBlock = lastIntersect.object;
                                    breakPercent = 0;
                                }
                            } else {
                                focusedBlock = lastIntersect.object;
                                breakPercent = 0;
                            }
                        } else {
                            focusedBlock = lastIntersect.object;
                            breakPercent = 0;
                        }
                    }
                }, 1);
                window.addEventListener('mouseup', () => {
                    hold = false;
                });
                window.addEventListener('mousedown', () => {
                    if (playerRaycaster && playerMouse) {
                        playerRaycaster.setFromCamera(playerMouse, camera);
                        const playerIntersects = playerRaycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                if (intersect["distance"] < 5.1) {
                                    lastIntersect = intersect;
                                    //blockSelectHighlightGroup.position.set(intersect.object.position.x, intersect.object.position.y, intersect.object.position.z);
                                    if (intersect.object.isSelectable === true) {
                                        //console.log('Breaking... '+breakPercent);
                                        hold = true;
                                        //blockSelectHighlightGroup.visible = true;
                                    } else {
                                        console.log('Cant Break...');
                                        focusedBlock = null;
                                        breakPercent = 0;
                                        hold = false;
                                        //blockSelectHighlightGroup.visible = false;
                                    }
                                } else {
                                    console.log('Cant Break...');
                                    focusedBlock = null;
                                    breakPercent = 0;
                                    hold = false;
                                    //blockSelectHighlightGroup.visible = false;
                                }
                            } else {
                                console.log('Cant Break...');
                                focusedBlock = null;
                                breakPercent = 0;
                                hold = false;
                                //blockSelectHighlightGroup.visible = false;
                            }
                        } else {
                            console.log('Cant Break...');
                            focusedBlock = null;
                            breakPercent = 0;
                            hold = false;
                            //blockSelectHighlightGroup.visible = false;
                        }
                    }
                });*/
                let what = "break";
                let slotSelected = 0;
                let maxSlotsSelectable = 8;
                let totalSlotsSelectable = maxSlotsSelectable + 1;
                window.addEventListener('mousedown', (e) => {
                    //e.preventDefault();
                    if (playerRaycaster && playerMouse) {
                        playerRaycaster.setFromCamera(playerMouse, camera);
                        const playerIntersects = playerRaycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                if (intersect["distance"] < 5.1) {
                                    if (ws && serverInited) {
                                        if (intersect.object.isPlayer) {
                                            if (intersect.object.isPlayer === true) {
                                                ws.send(`Player Hit: {"uid": "${intersect.object.uid}"}`);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                window.addEventListener('keyup', (e) => {
                    if (e.key === "o") {
                        if (what === "break") {
                            what = "place";
                            document.querySelector('.placingORbreaking').textContent = `State: Placing [use "o" on keyboard to switch to Breaking]`;
                        } else {
                            what = "break";
                            document.querySelector('.placingORbreaking').textContent = `State: Breaking [use "o" on keyboard to switch to Placing]`;
                        }
                    }
                    if (e.key === "b") {
                        
                        if (blockTypeSelected === "minecraft:oak_plank") {
                            blockTypeSelected = "minecraft:dirt";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:dirt [use "b" on keyboard to switch to minecraft:bedrock]`;
                        } else if (blockTypeSelected === "minecraft:dirt") {
                            blockTypeSelected = "minecraft:bedrock";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:bedrock [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:bedrock") {
                            blockTypeSelected = "minecraft:wood";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:wood [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:wood") {
                            blockTypeSelected = "minecraft:glass_block";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:glass_block [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:glass_block") {
                            blockTypeSelected = "minecraft:oak_plank";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:oak_plank [use "b" on keyboard to switch to minecraft:dirt]`;
                        }
                       /*slotSelected += 1;
                       if (slotSelected > totalSlotsSelectable) {
                            slotSelected = 0;
                       }
                       if (slotSelected < 0) {
                            slotSelected = maxSlotsSelectable;
                       }
                       let item = itemsInInventory[slotSelected];
                       if (!item === null) {
                        if (item.amount > 0) {
                            if (!item.type === "minecraft:air") {
                                blockTypeSelected = item.type;
                            } else {
                                blockTypeSelected = "None";
                            }
                        } else {
                            blockTypeSelected = "None";
                        }
                       } else {
                        blockTypeSelected = "None";
                       }
                       document.querySelector('.blockSelected').textContent = `Block Selected: ${item.type} [Slot ${slotSelected + 1}]`;*/
                    } else if (e.key === "v") {
                        slotSelected -= 1;
                        if (slotSelected > totalSlotsSelectable) {
                            slotSelected = 0;
                        }
                        if (slotSelected < 0) {
                            slotSelected = maxSlotsSelectable;
                        }
                        if (item) {
                            if (item.amount > 0) {
                                if (!item.type === "minecraft:air") {
                                    blockTypeSelected = item.type;
                                } else {
                                    blockTypeSelected = "None";
                                }
                            } else {
                                blockTypeSelected = "None";
                            }
                           } else {
                            blockTypeSelected = "None";
                           }
                           document.querySelector('.blockSelected').textContent = `Block Selected: ${item.type} [Slot ${slotSelected + 1}]`;
                    }
                });
                window.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (playerRaycaster && playerMouse) {
                        playerRaycaster.setFromCamera(playerMouse, camera);
                        const playerIntersects = playerRaycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                if (intersect["distance"] < 5.1) {
                                    if (ws && serverInited) {
                                        if (what === "place") {
                                            if (!blockTypeSelected === "None") {
                                                let facePointedAt = facePointed(intersect);
                                                let M = getMaterials(blockTypeSelected);
                                                let G = new BoxGeometry(1, 1, 1);
                                                let Mesh = new InstancedMesh(G, M, 1);
                                                Mesh.position.set(intersect.object.position.x, intersect.object.position.y, intersect.object.position.z);
                                                if (facePointedAt === "Top") {
                                                    Mesh.position.y += 1;
                                                } else if (facePointedAt === "Bottom") {
                                                    Mesh.position.y -= 1;
                                                } else if (facePointedAt === "Left") {
                                                    Mesh.position.x -= 1;
                                                } else if (facePointedAt === "Right") {
                                                    Mesh.position.x += 1;
                                                } else if (facePointedAt === "Front") {
                                                    Mesh.position.z -= 1;
                                                } else if (facePointedAt === "Back") {
                                                    Mesh.position.z += 1;
                                                }
                                                terrainGroup.add(Mesh);
                                                ws.send(`Place Block At: {"uid": "${uid}", "type": "${blockTypeSelected}", "name": "oak_plank", "sizeX": 1, "sizeY": 1, "sizeZ": 1, "x": ${Mesh.position.x}, "y": ${Mesh.position.y}, "z": ${Mesh.position.z}}`);
                                            } else {
                                                let facePointedAt = facePointed(intersect);
                                                let M = getMaterials(blockTypeSelected);
                                                let G = new BoxGeometry(1, 1, 1);
                                                let Mesh = new InstancedMesh(G, M, 1);
                                                Mesh.position.set(intersect.object.position.x, intersect.object.position.y, intersect.object.position.z);
                                                if (facePointedAt === "Top") {
                                                    Mesh.position.y += 1;
                                                } else if (facePointedAt === "Bottom") {
                                                    Mesh.position.y -= 1;
                                                } else if (facePointedAt === "Left") {
                                                    Mesh.position.x -= 1;
                                                } else if (facePointedAt === "Right") {
                                                    Mesh.position.x += 1;
                                                } else if (facePointedAt === "Front") {
                                                    Mesh.position.z -= 1;
                                                } else if (facePointedAt === "Back") {
                                                    Mesh.position.z += 1;
                                                }
                                                terrainGroup.add(Mesh);
                                                ws.send(`Place Block At: {"uid": "${uid}", "type": "${blockTypeSelected}", "name": "oak_plank", "sizeX": 1, "sizeY": 1, "sizeZ": 1, "x": ${Mesh.position.x}, "y": ${Mesh.position.y}, "z": ${Mesh.position.z}}`);
                                            }
                                        } else {
                                            terrainGroup.remove(intersect.object);
                                            ws.send(`Break Block At: {"x": ${intersect.object.position.x}, "y": ${intersect.object.position.y}, "z": ${intersect.object.position.z}}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
                /*window.addEventListener('dbclick', (e) => {
                    e.preventDefault();
                    if (playerRaycaster && playerMouse) {
                        playerRaycaster.setFromCamera(playerMouse, camera);
                        const playerIntersects = playerRaycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                if (intersect["distance"] < 5.1) {
                                    if (ws && serverInited) {
                                        console.log(intersect);
                                    }
                                }
                            }
                        }
                    }
                });*/
                setInterval(() => {
                    if (playerRaycaster && playerMouse) {
                        playerRaycaster.setFromCamera(playerMouse, camera);
                        const playerIntersects = playerRaycaster.intersectObjects(terrainGroup.children);
                        
                        if (playerIntersects.length > 0) {
                            const intersect = playerIntersects[0];
                            if (intersect.object) {
                                if (intersect["distance"] < 5.1) {
                                    blockSelectHighlightGroup.position.set(intersect.object.position.x, intersect.object.position.y, intersect.object.position.z);
                                    if (intersect.object.isSelectable === true) {
                                        blockSelectHighlightGroup.visible = true;
                                        
                                    } else {
                                        blockSelectHighlightGroup.visible = false;
                                    }
                                } else {
                                    blockSelectHighlightGroup.visible = false;
                                }
                            } else {
                                blockSelectHighlightGroup.visible = false;
                            }
                        } else {
                            blockSelectHighlightGroup.visible = false;
                        }
                    }
                }, 125);
            });

            function playerPlaceBlock() {
                playerRaycaster.setFromCamera(playerMouse, camera);
                const playerIntersects = playerRaycaster.intersectObjects(scene.children);
            
                if (playerIntersects.length > 0) {
                    const intersect = playerIntersects[0];
                    if (intersect) {
                        if (intersect["distance"] > 5.1) {} else {
                            if (!intersect["object"].name === "PlayerPrivate-Hand_" || "Door") {
                                const newBlock = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }));
        
                                newBlock.position.copy(intersect.point).add(intersect.face.normal);
                                newBlock.position.floor().addScalar(0.5);

                                scene.add(newBlock);
                            } else {
                                if (intersect["object"].name === "Door") {
                                    interact(intersect["object"]);
                                }
                            }
                        }
                    }
                }
            }

            function playerRemoveBlock() {
                playerRaycaster.setFromCamera(playerMouse, camera);
                const playerIntersects = playerRaycaster.intersectObjects(scene.children);
            
                if (playerIntersects.length > 0) {
                    const intersect = playerIntersects[0];
                    if (intersect) {
                        if (intersect["distance"] > 5.1) {

                        } else {
                            if (!intersect["object"].name === "PlayerPrivate-Hand_") {
                                /*if (window.gamemode === "creative") {
                                    scene.remove(intersect.object);
                                }*/
                                scene.remove(intersect.object);
                            }
                        }
                    }
                }
            }

            var axesHelper = new AxesHelper(16);
            var chunksGeometry = new BoxGeometry(16, 16, 16, 16, 16, 16);
            var chunksMaterial = new MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true,
            });
            var chunks = new Mesh(chunksGeometry, chunksMaterial);
            setTimeout(() => {
                scene.add(axesHelper, chunks);
            }, 1000);

            //const particles = new BoxGeometry();
            //const particleMaterial = new PointsMaterial({
                //color: 0xffffff,
                //size: 0.1,
            //});

            function createParticleSystem() {
                for (let i = 0; i < 1000; i++) {
                    const x = Math.random() * 2 - 1;
                    const y = Math.random() * 2 - 1;
                    const z = Math.random() * 2 - 1;
                    //particles.vertices.push(new Vector3(x, y, z));
                }
                //return new Points(particles, particleMaterial);
            }

            function getMaterialFace (face, blockType) {
                if (blockType === "minecraft:dirt_lock") {
                    if (face === "top") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (face === "bottom") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (face === "left") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (face === "right") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (face === "front") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    }
                }
            }

            function getMaterials (blockType, position, isShading, fragment, vertex) {
                if (isShading) {
                    if (blockType === "minecraft:wood") {
                        return new ShaderMaterial({ color: 'black', fragmentShader: fragment, vertexShader: vertex, wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/Log.jpg')});
                    } else if (blockType === "minecraft:dirt") {
                        /*return [
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockBottom.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                        ];*/
                        /*let allowedMaterials = {
                            "x-positive": true,
                            "x-negitive": true,
                            "y-positive": true,
                            "y-negitive": true,
                            "z-positive": true,
                            "z-negitive": true
                        }
                        if (getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["x-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.x - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["x-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.y + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["y-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.y - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["y-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.z + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["z-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.z - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["z-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        let Materials = [];
                        let top;
                        let bottom;
                        let front;
                        let back;
                        let left;
                        let right;
                        if (allowedMaterials['y-positive']) {
                            top = getMaterialFace('top', blockType);
                        } else {
                            top = null;
                        }
                        if (allowedMaterials['y-negitive']) {
                            bottom = getMaterialFace('bottom', blockType);
                        } else {
                            bottom = null;
                        }
                        if (allowedMaterials['x-positive']) {
                            left = getMaterialFace('top', blockType);
                        } else {
                            left = null;
                        }
                        if (allowedMaterials['x-negitive']) {
                            right = getMaterialFace('bottom', blockType);
                        } else {
                            right = null;
                        }
                        if (allowedMaterials['z-positive']) {
                            front = getMaterialFace('top', blockType);
                        } else {
                            front = null;
                        }
                        if (allowedMaterials['z-negitive']) {
                            back = getMaterialFace('bottom', blockType);
                        } else {
                            back = null;
                        }
                        Materials.push(right, left, top, bottom, back, front);
                        return Materials;*/
                        return new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, wireframe: false, color: 'black', map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (blockType === "minecraft:oak_plank") {
                        return new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, wireframe: false, color: 'black', map: new TextureLoader().load('http://127.0.0.1:5500/textures/OakPlank.png')});
                    } else if (blockType === "minecraft:bedrock") {
                        return new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, wireframe: false, color: 'black', map: new TextureLoader().load('http://127.0.0.1:5500/textures/BedrockTexture.webp')});
                    } else if (blockType === "minecraft:glass_block") {
                        return new ShaderMaterial({ fragmentShader: fragment, vertexShader: vertex, transparent: true, color: 'black', wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGlass.png')});
                    }
                } else {
                    if (blockType === "minecraft:wood") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/Log.jpg')});
                    } else if (blockType === "minecraft:dirt") {
                        /*return [
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockBottom.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                            new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png')}),
                        ];*/
                        /*let allowedMaterials = {
                            "x-positive": true,
                            "x-negitive": true,
                            "y-positive": true,
                            "y-negitive": true,
                            "z-positive": true,
                            "z-negitive": true
                        }
                        if (getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["x-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.x - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["x-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.y + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["y-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.y - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["y-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.z + 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["z-positive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (getBlockByPosition(Math.trunc(position.z - 1), Math.round(position.y), Math.trunc(position.z))) {
                            let block = getBlockByPosition(Math.trunc(position.x + 1), Math.round(position.y), Math.trunc(position.z));
                            if (block) {
                                if (block.scale.x > 1) {
                                    if (block.scale.y > 1) {
                                        if (block.scale.z > 1) {
                                            allowedMaterials["z-negitive"] = false;
                                        }
                                    }
                                }
                            }
                        }
                        let Materials = [];
                        let top;
                        let bottom;
                        let front;
                        let back;
                        let left;
                        let right;
                        if (allowedMaterials['y-positive']) {
                            top = getMaterialFace('top', blockType);
                        } else {
                            top = null;
                        }
                        if (allowedMaterials['y-negitive']) {
                            bottom = getMaterialFace('bottom', blockType);
                        } else {
                            bottom = null;
                        }
                        if (allowedMaterials['x-positive']) {
                            left = getMaterialFace('top', blockType);
                        } else {
                            left = null;
                        }
                        if (allowedMaterials['x-negitive']) {
                            right = getMaterialFace('bottom', blockType);
                        } else {
                            right = null;
                        }
                        if (allowedMaterials['z-positive']) {
                            front = getMaterialFace('top', blockType);
                        } else {
                            front = null;
                        }
                        if (allowedMaterials['z-negitive']) {
                            back = getMaterialFace('bottom', blockType);
                        } else {
                            back = null;
                        }
                        Materials.push(right, left, top, bottom, back, front);
                        return Materials;*/
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png')});
                    } else if (blockType === "minecraft:oak_plank") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/OakPlank.png')});
                    } else if (blockType === "minecraft:bedrock") {
                        return new MeshStandardMaterial({ wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/BedrockTexture.webp')});
                    } else if (blockType === "minecraft:glass_block") {
                        return new MeshStandardMaterial({ transparent: true, wireframe: false, map: new TextureLoader().load('http://127.0.0.1:5500/textures/MinecraftGlass.png')});
                    }
                }
            }

            let Chunks = 1;
            let PerChunkSize = 5; // 7.5
            let chunkLimitedSize = PerChunkSize / 2 * Chunks;
            let chunkBlocks = 0;
            let junkBlocks = 0;
            var terrainGroup = new Group();
            var terrainBlocks = [];
            terrainGroup.name = "TerrainGroup";

            document.querySelector('.RenderDistance').addEventListener('change', (e) => {
                Chunks = document.querySelector('.RenderDistance').value;
                chunkLimitedSize = PerChunkSize / 2 * Chunks;
                getBlocks('http://127.0.0.1:5503/$Server_/Json/Terrain.json');
            });
            document.querySelector('.FOV').addEventListener('change', (e) => {
                window.FOV = Number(document.querySelector('.FOV').value);
                window.DefualtFOV = Number(document.querySelector('.FOV').value);
                window.SprintFOV = window.DefualtFOV + 5;
                camera.fov = window.FOV;
            });
            setInterval(() => {
                document.querySelector('.RenderDistanceValue').textContent = Chunks;
                if (document.querySelector('.FOV').value === "70") {
                    document.querySelector('.FOVValue').textContent = document.querySelector('.FOV').value + " (Normal)";
                } else if (document.querySelector('.FOV').value === "110") {
                    document.querySelector('.FOVValue').textContent = document.querySelector('.FOV').value + " (Quark Pro)";
                } else {
                    document.querySelector('.FOVValue').textContent = document.querySelector('.FOV').value;
                }
            }, 1);

            function loadGLSLShader (children, fragment) {
                children.forEach(child => {

                });
            }

            function initShader (type, fragment) {
                if (type === "GLSL") {
                    loadGLSLShader(scene.children, fragment);
                } else if (type === "Defualt") {
                    loadDefualtShader(scene.children);
                }
            }

            //initShader("Defualt", null);



            async function getBlocks (resource, reloadWS) {
                //console.log(scene.fog);
                //scene.fog.far = chunkLimitedSize - 1;
                //scene.fog.near = chunkLimitedSize - 1;
                junkBlocks = 0;
                chunkBlocks = 0;
                let counted = 0;
                const vertexShader = `
                    varying vec3 vNormal;
                    void main() {
                        vNormal = normalize(normalMatrix * normal);
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `;

                const fragmentShader = `
                    varying vec3 vNormal;
                    void main() {
                        float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
                        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0) * intensity;
                    }
                `;
                if (reloadWS) {
                    terrainBlocks = [];
                            terrainGroup.clear();
                            TerrainB.forEach((block) => {
                                if (Math.round(block.position.x) < Math.round((window.group.position.x/* - 1.5*/) + chunkLimitedSize)) {
                                    if (Math.round(block.position.x) > Math.round((window.group.position.x/* - 1.5*/) - chunkLimitedSize)) {
                                        if (Math.round(block.position.y) < Math.round((window.group.position.y/* - 1.5*/) + chunkLimitedSize)) {
                                            if (Math.round(block.position.y) > Math.round((window.group.position.y/* - 1.5*/) - chunkLimitedSize)) {
                                                if (Math.round(block.position.z) < Math.round((window.group.position.z/* - 1.5*/) + chunkLimitedSize)) {
                                                    if (Math.round(block.position.z) > Math.round((window.group.position.z/* - 1.5*/) - chunkLimitedSize)) {
                                                        var geometry = new BoxGeometry(block.scale.x, block.scale.y, block.scale.z);
                                                        var material = getMaterials(block.type, block.position, false, fragmentShader, vertexShader);
                                                        var mesh = new InstancedMesh(geometry, material, 1);
                                                        mesh.reciveShadow = true;
                                                        mesh.castShadow = true;
                                                        //mesh.count = count;
                                                        //let instanceID = mesh.count;
                                                        //var matrix = new Matrix4();
                                                        //if (block.id !== 0) {
                                                            //matrix.setPosition(block.position.x, block.position.y, block.position.z);
                                                            //mesh.setMatrixAt(mesh.count++, matrix);
                                                        //}
                                                        mesh.name = block.name;
                                                        if (block.type === "water") {
                                                            mesh.isSelectable = false;
                                                        } else if (block.type === "lava") {
                                                            mesh.isSelectable = false;
                                                        } else if (block.type === "milk") {
                                                            mesh.isSelectable = false;
                                                        } else {
                                                            mesh.isSelectable = true;
                                                        }
                                                        mesh.position.set(block.position.x, block.position.y, block.position.z);
                                                        terrainGroup.add(mesh);
                                                        terrainBlocks.push(block);
                                                        //chunkBlocks += 1;
                                                    } else {
                                                        //junkBlocks += 1;
                                                    }
                                                } else {
                                                    //junkBlocks += 1;
                                                }
                                            } else {
                                                //junkBlocks += 1;
                                            }
                                        } else {
                                            //junkBlocks += 1;
                                        }
                                    } else {
                                        //junkBlocks += 1;
                                    }
                                } else {
                                    //junkBlocks += 1;
                                }
                            })
                } else {
                    try {
                        var res = await fetch(resource);
                        let count = 0;
                        if (!res.ok) {} else {
                            terrainBlocks = [];
                            var json = await res.json();
                            terrainGroup.clear();
                            json.blocks.forEach((block) => {
                                if (Math.round(block.position.x) < Math.round((window.group.position.x/* - 1.5*/) + chunkLimitedSize)) {
                                    if (Math.round(block.position.x) > Math.round((window.group.position.x/* - 1.5*/) - chunkLimitedSize)) {
                                        if (Math.round(block.position.y) < Math.round((window.group.position.y/* - 1.5*/) + chunkLimitedSize)) {
                                            if (Math.round(block.position.y) > Math.round((window.group.position.y/* - 1.5*/) - chunkLimitedSize)) {
                                                if (Math.round(block.position.z) < Math.round((window.group.position.z/* - 1.5*/) + chunkLimitedSize)) {
                                                    if (Math.round(block.position.z) > Math.round((window.group.position.z/* - 1.5*/) - chunkLimitedSize)) {
                                                        var geometry = new BoxGeometry(block.scale.x, block.scale.y, block.scale.z);
                                                        var material = getMaterials(block.type, block.position);
                                                        var mesh = new InstancedMesh(geometry, material, 1);
                                                        mesh.reciveShadow = true;
                                                        mesh.castShadow = true;
                                                        //mesh.count = count;
                                                        //let instanceID = mesh.count;
                                                        //var matrix = new Matrix4();
                                                        //if (block.id !== 0) {
                                                            //matrix.setPosition(block.position.x, block.position.y, block.position.z);
                                                            //mesh.setMatrixAt(mesh.count++, matrix);
                                                        //}
                                                        mesh.name = block.name;
                                                        if (block.type === "water") {
                                                            mesh.isSelectable = false;
                                                        } else if (block.type === "lava") {
                                                            mesh.isSelectable = false;
                                                        } else if (block.type === "milk") {
                                                            mesh.isSelectable = false;
                                                        } else {
                                                            mesh.isSelectable = true;
                                                        }
                                                        mesh.position.set(block.position.x, block.position.y, block.position.z);
                                                        terrainGroup.add(mesh);
                                                        terrainBlocks.push(block);
                                                        //chunkBlocks += 1;
                                                    } else {
                                                        //junkBlocks += 1;
                                                    }
                                                } else {
                                                    //junkBlocks += 1;
                                                }
                                            } else {
                                                //junkBlocks += 1;
                                            }
                                        } else {
                                            //junkBlocks += 1;
                                        }
                                    } else {
                                        //junkBlocks += 1;
                                    }
                                } else {
                                    //junkBlocks += 1;
                                }
                            })
                        }
                    } catch (E) {
                        console.log(E);
                    }
                }
            };

            setInterval(() => {
                document.querySelector('.BlocksRead').textContent = `Blocks: ${Math.trunc(chunkBlocks)}/${Math.trunc(chunkBlocks + junkBlocks)} Shown, ${Math.trunc(junkBlocks)}/${Math.trunc(chunkBlocks + junkBlocks)} Hidden.`;
                document.querySelector('.ChunksRead').textContent = `Chunks: ${Math.trunc(chunkBlocks / (PerChunkSize * 8))}/${Math.trunc(chunkBlocks / (PerChunkSize * 8)) + Math.trunc(junkBlocks / (PerChunkSize * 8))} Shown, ${Math.trunc(junkBlocks / (PerChunkSize * 8))}/${Math.trunc(chunkBlocks / (PerChunkSize * 8)) + Math.trunc(junkBlocks / (PerChunkSize * 8))} Hidden.`;
            }, 1000);

            setTimeout(() => {
                //scene.add(terrainGroup);
            }, 900);

            setInterval(() => {
                getBlocks('http://127.0.0.1:5503/$Server_/Json/Terrain.json', true);
            }, 250); // 250

            function createBlock(x, y, z) {
                var blockGeometry = new BoxGeometry(1, 1, 1);
                var blockMaterial = new MeshBasicMaterial({ color: 'blue' });
                const block = new Mesh(blockGeometry, blockMaterial);
                block.position.set(x, y, z);
                scene.add(block);
                
                // Add particles on block placement
                //const particleSystem = createParticleSystem();
                //particleSystem.position.set(x, y, z);
                //scene.add(particleSystem);
                
                //setTimeout(() => scene.remove(particleSystem), 500); // Remove particles after some time
                return block;
              }   
              
              function removeBlock(intersectedBlock) {
                scene.remove(intersectedBlock);
                
                // Add particles on block removal
                //const particleSystem = createParticleSystem();
                //particleSystem.position.copy(intersectedBlock.position);
                //scene.add(particleSystem);
                
                //setTimeout(() => scene.remove(particleSystem), 500); // Remove particles after some time
              }

              setTimeout(() => {
                createBlock(1,0, 1);
              }, 5000);
              
              /*document.querySelector('.mobile-control-walkForward').addEventListener('mouseover', () => {
                keys.w = true;
              });

              document.querySelector('.mobile-control-walkForward').addEventListener('mouseleave', () => {
                keys.w = false;
              });*/

              let holdTimeout;

              document.querySelector('.mobile-control-walkForward').addEventListener('touchstart', () => {
                holdTimeout = setTimeout(() => {
                    console.log('Button is being held down');
                    keys.w = true;
                    // Add your logic here for when the button is held down
                }, 1000); // Adjust the time (in milliseconds) as needed
            });

            document.querySelector('.mobile-control-walkForward').addEventListener('touchend', () => {
                clearTimeout(holdTimeout);
                console.log('Button released');
                keys.w = false;
                // Add your logic here for when the button is released
            });

            document.querySelector('.mobile-control-walkForward').addEventListener('touchmove', () => {
                clearTimeout(holdTimeout);
                console.log('Touch moved, cancel hold');
                keys.w = false;
                // Add your logic here for when the touch moves away from the button
            });

            function render () {
                renderer.autoClear = false;
                renderer.clear();
                renderer.render( scene, camera );
                //window.composer.render();
            }

            function onWindowResize () {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            let wordsChoosable = ["HELLOO!!!", "Life."/*, "Another Day Playing BananaCraft."*/, "Not On Steam..."];

            function choose () {
                document.querySelector('.starterWords').textContent = wordsChoosable[Math.floor(Math.random() * wordsChoosable.length)];
            }

            choose();

            class NameTag {
                constructor (position, name) {
                    this.name = name;
                    this.position = position;
                }

                changeState (s) {
                    if (s === "hidden") {
                        if (this.text) {

                        }
                    } else {
                        if (this.text) {

                        }
                    }
                }

                init () {
                    this.g = new Group();
                    let backgroundScaleX = 0.1 * this.name.length;
                    let backgroundScaleY = 0.5;

                }
            }

            function Player ( playerID ) {
                this.radius = 0.5;
                this.height = 1.75;
                this.jumpSpeed = 10;
                this.onGround = false;

                this.playerID = playerID;
                this.isMainPlayer = false;
                this.mesh;

                var textureLoader = new TextureLoader();
                //var textureTop = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png");
                //var textureButtom = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png");
                var textureSide = textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png");
                var cube_geometry = new BoxGeometry( 0.85, 1.5, 0.5 );
                var cube_geometry3 = new BoxGeometry( 0.5, 1.5, 0.5 ); // leg
                var cube_geometry2 = new BoxGeometry( 1, 1, 1);
                var cube_material = [new MeshStandardMaterial( {wireframe: false, map: textureSide, transparent: true}), new MeshBasicMaterial( {wireframe: false, map: textureSide, transparent: true}), new MeshBasicMaterial( {wireframe: false, map: textureSide, transparent: true}),new MeshBasicMaterial( {wireframe: false, map: textureSide, transparent: true}),new MeshBasicMaterial( {wireframe: false, map: textureSide, transparent: true}),new MeshBasicMaterial( {wireframe: false, map: textureSide, transparent: true} )];

                var scope = this;
                this.jumping = false;
                this.falling = false;

                this.jump = function (group, goal) {
                    let gravity = 0.1;
                    if (this.jumping === false && this.falling === false) {
                        if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y + 2), Math.trunc(group.position.z))) {
                            this.jumping = false;
                        } else {
                            let cancelPoint = goal;
                            let jumpInterval = setInterval(() => {
                                if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y + 2), Math.trunc(group.position.z))) {
                                    clearInterval(jumpInterval);
                                    this.jumping = false;
                                } else {
                                    if (group.position.y > cancelPoint) {
                                        //clearInterval(jumpInterval);
                                        //this.jumping = false;
                                        group.position.y += gravity;
                                        camera.position.y += gravity;
                                        if (gravity > 0) {
                                            //clearInterval(jumpInterval);
                                            //this.jumping = false;
                                            gravity -= 0.002;
                                        }  else {
                                            clearInterval(jumpInterval);
                                            setTimeout(() => {
                                                this.jumping = false;
                                            }, 5);
                                        }
                                    } else {
                                        group.position.y += gravity;
                                        camera.position.y += gravity;
                                        if (gravity > 0) {
                                            //clearInterval(jumpInterval);
                                            //this.jumping = false;
                                            gravity -= 0.002;
                                        }  else {
                                            clearInterval(jumpInterval);
                                            setTimeout(() => {
                                                this.jumping = false;
                                            }, 5);
                                        }
                                    }
                                }
                            }, 10);
                            this.jumping = true;
                        }
                    }
                }

                this.physics = function (group, gravity) {
                    /*terrainBlocks.forEach((block) => {
                        if (block.position.x === Math.round(group.position.x - 1)) {
                            if (block.position.y === Math.round(group.position.y - 1)) {
                                if (block.position.z === Math.round(group.position.z - 1)) {
                                    
                                } else {
                                    var gravity = 0.1;
                                    group.position.y -= gravity;
                                }
                            } else {
                                var gravity = 0.1;
                                group.position.y -= gravity;
                            }
                        } else {
                            var gravity = 0.1;
                            group.position.y -= gravity;
                        }
                    })*/
                    
                    /*if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y - 3), Math.trunc(group.position.z))) {
                        this.falling = false;
                    } else {
                        if (this.jumping === false) {
                            var gravity = 0.1;
                            group.position.y -= gravity;
                            this.falling = true;
                        }
                    }*/
                   if (window.gamemode === "survival") {
                        if (getBlockByPosition(Math.trunc(window.group.position.x), Math.round(window.group.position.y - 3), Math.trunc(window.group.position.z))) {
                            this.falling = false;
                        } else {
                            if (this.jumping === false) {
                                this.falling = true;
                                window.group.position.y -= gravity;
                                camera.position.y -= gravity;
                            }
                        }
                    }
                }

                this.collisionDetection = function (group) {
                    let detectionNum = 0.15;
                    /*if (getBlockByPosition(Math.trunc(group.position.x - detectionNum), Math.round(group.position.y), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x - detectionNum), Math.round(group.position.y - 1), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x - detectionNum), Math.round(group.position.y + 1), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x - detectionNum), Math.round(group.position.y + 2), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x - detectionNum), Math.round(group.position.y - 2), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    }
                    if (getBlockByPosition(Math.trunc(group.position.x + detectionNum), Math.round(group.position.y), Math.trunc(group.position.z))) {
                        group.position.x -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x + detectionNum), Math.round(group.position.y - 1), Math.trunc(group.position.z))) {
                        group.position.x -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x + detectionNum), Math.round(group.position.y + 1), Math.trunc(group.position.z))) {
                        group.position.x -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x + detectionNum), Math.round(group.position.y + 2), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x + detectionNum), Math.round(group.position.y - 2), Math.trunc(group.position.z))) {
                        group.position.x += detectionNum;
                    }

                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y), Math.trunc(group.position.z - detectionNum))) {
                        group.position.z += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y - 1), Math.trunc(group.position.z - detectionNum))) {
                        group.position.z += detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y + 1), Math.trunc(group.position.z - detectionNum))) {
                        group.position.z += detectionNum;
                    }
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y), Math.trunc(group.position.z + detectionNum))) {
                        group.position.z -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y - 1), Math.trunc(group.position.z + detectionNum))) {
                        group.position.z -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y + 1), Math.trunc(group.position.z + detectionNum))) {
                        group.position.z -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y + 2), Math.trunc(group.position.z + detectionNum))) {
                        group.position.z -= detectionNum;
                    } else
                    if (getBlockByPosition(Math.trunc(group.position.x), Math.round(group.position.y - 2), Math.trunc(group.position.z + detectionNum))) {
                        group.position.z -= detectionNum;
                    }*/
                }

                this.update = function (scope) {
                    if (scope.head.rotation.y > 0.6) {
                        scope.group.rotation.y += 0.005;
                        additionalHeadRotation.y -= 0.005;
                    } else {
                        if (scope.head.rotation.y < -0.599) {
                            scope.group.rotation.y -= 0.005;
                            additionalHeadRotation.y += 0.005;
                        }
                    }
                }

                this.init = function() {
                    let gravity = 0;
                    setTimeout(() => {
                        setInterval(() => {
                            this.collisionDetection(window.group);
                            if (getBlockByPosition(Math.trunc(window.group.position.x), Math.round(window.group.position.y - 3), Math.trunc(window.group.position.z))) {
                                this.falling = false;
                                gravity = 0;
                            } else {
                                this.physics(window.group, gravity);
                                if (gravity < 0.1) {
                                    //gravity = gravity + 0.0005;
                                    gravity = gravity + 0.0002;
                                } else {
                                    
                                }
                            }
                        }, 2);
                    }, 1000);
                    window.gamemode = "spectator";
                    window.gamemodeState = "flying";
                    scope.group = new Group();
                    setInterval(() => {
                        this.update(scope);
                    }, 1);
                    if (window.gamemode === "spectator") {
                        cube_material.forEach(mat => {
                            mat.opacity = 0.5;
                        });
                    } else if (window.gamemode === "survival") {
                        cube_material.forEach(mat => {
                            mat.opacity = 1;
                        });
                    }
                    scope.torso = new Mesh( cube_geometry, cube_material );
                    scope.head = new Mesh( cube_geometry2, cube_material );
                    scope.head.castShadow = true;
                    scope.head.receiveShadow = true;
                    scope.leftArm = new Mesh( cube_geometry3, cube_material );
                    scope.leftArm.castShadow = true;
                    scope.leftArm.receiveShadow = true;
                    scope.leftArm.position.x = 0.65;
                    scope.rightArm = new Mesh( cube_geometry3, cube_material );
                    scope.rightArm.castShadow = true;
                    scope.rightArm.receiveShadow = true;
                    scope.rightArm.position.x = -0.65;
                    scope.leftLeg = new Mesh( cube_geometry3, cube_material );
                    scope.leftLeg.castShadow = true;
                    scope.leftLeg.receiveShadow = true;
                    scope.leftLeg.position.x = 0.25;
                    scope.leftLeg.position.y = -1.5;
                    scope.rightLeg = new Mesh( cube_geometry3, cube_material );
                    scope.rightLeg.castShadow = true;
                    scope.rightLeg.receiveShadow = true;
                    scope.rightLeg.position.x = -0.2;
                    scope.rightLeg.position.y = -1.5;
                    scope.head.position.y += 1;
                    PlayerID = this.playerID;
                    //scope.group.position.x += 1;
                    scope.torso.castShadow = true;
                    scope.torso.receiveShadow = true;
                    scope.group.position.x += 1;
                    scope.group.position.y += 10;
                    scope.head.position.y += 0.3;
                    camera.position.y += 4;
                    camera.position.z += 4;
                    scope.group.name = playerID;
                    scope.head.name = playerID + " - Player Head";
                    scope.torso.name = "torso";
                    scope.leftArm.name = "leftArm";
                    scope.rightArm.name = "rightArm";
                    scope.leftLeg.name = "leftLeg";
                    scope.rightLeg.name = "rightLeg";
                    window.group = scope.group;
                    scope.head.reciveShadow = true;
                    scope.torso.reciveShadow = true;
                    scope.leftArm.reciveShadow = true;
                    scope.rightArm.reciveShadow = true;
                    scope.leftLeg.reciveShadow = true;
                    scope.rightLeg.reciveShadow = true;
                    console.log("Y Tall: " + Number(scope.head.scale.y + scope.torso.scale.y + scope.leftLeg.scale.y) + ", X Tall: " + Number(scope.leftArm.scale.x + scope.torso.scale.x + scope.rightArm.scale.x))
                    scope.group.add( scope.torso, scope.head, scope.leftArm, scope.rightArm, scope.leftLeg, scope.rightLeg );
                    //scope.mesh.position.z += -10;
                    scene.add( scope.group );
                    //players.push( scope.group );

                    window.addEventListener("keydown", (e) => {
                        if (e.key === "p") {
                            scope.group.getObjectByName(playerID + " - Player Head").rotation.x = camera.rotation.x + scope.torso.rotation.x;
                            scope.group.getObjectByName(playerID + " - Player Head").rotation.y = camera.rotation.y + scope.torso.rotation.y;
                            scope.group.getObjectByName(playerID + " - Player Head").rotation.z = camera.rotation.z + scope.torso.rotation.z;
                        }
                    });

                    window.addEventListener("keydown", (e) => {
                        if (window.playerKeysEnabled === true) {
                            if (e.key === " ") {
                                this.jump(window.group, window.group.position.y + 1.5);
                            } else if (e.key === "Space") {
                                this.jump(window.group, window.group.position.y + 1.5);
                            }
                        }
                    })

                    window.addEventListener("mousemove", () => {
                        //scope.group.getObjectByName(playerID).rotation.x = camera.rotation.x - scope.torso.rotation.x;
                        //scope.group.getObjectByName(playerID).rotation.y = camera.rotation.y - scope.torso.rotation.y;
                        //scope.group.getObjectByName(playerID).rotation.z = camera.rotation.z - scope.torso.rotation.z;
                    });

                    setInterval(() => {
                        scope.group.getObjectByName(playerID + " - Player Head").rotation.x = camera.rotation.x + scope.torso.rotation.x;
                        scope.group.getObjectByName(playerID + " - Player Head").rotation.y = camera.rotation.y + scope.torso.rotation.y + additionalHeadRotation.y;
                        scope.group.getObjectByName(playerID + " - Player Head").rotation.z = camera.rotation.z + scope.torso.rotation.z;
                    }, 1);

                    window.fullturn = false
                    setInterval(() => {if (window.fullturn == false) {scope.leftArm.rotation.z += 0.01; if (scope.leftArm.rotation.z = 0.35) {window.fullturn = true}} else if (window.fullturn == true) {scope.leftArm.rotation.z -= 0.01; if (scope.leftArm.rotation.z = 0) {window.fullturn = false}}}, 100)

                    document.addEventListener("keydown", (e) => {
                        //if (e.key == " ") {
                            //scope.group.getObjectByName(playerID).position.y += 1;
                        //}
                        //if (e.ctrlKey) {
                            //scope.group.getObjectByName(playerID).position.y -= 1;
                        //}
                        //if (e.key == "KeyO") {
                            //camera.position.z -= 10;
                        //}
                    })

                    if ( scope.isMainPlayer ) {
                        //controls = new PlayerControls( camera , scope.group );
                        //controls.init();
                        //createNewControls( camera, scope.group );
                        window.collision = false;
                        if (window.gamemode === "creative") {
                            if (window.gamemodeState === "flying") {
                                window.collision = true;
                            } else if (window.gamemodeState === "ground") {
                                window.collision = true;
                            }
                        } else if (window.gamemode === "spectator") {
                            if (window.gamemodeState === "flying") {
                                window.collision = false;
                            } else if (window.gamemodeState === "inPlayer") {
                                window.collision = false;
                            }
                        }
                        controls = new CharacterControls(window.group, camera, 0.10000000149012);
                        scope.mainPlayerGamemode = "spectate";
                        if ( scope.mainPlayerGamemode === "survival" ) {
                            
                        } else if ( scope.mainPlayerGamemode === "spectate" ) {
                            scope.group.opacity = 0.5;
                        } else if ( scope.mainPlayerGamemode === "creative" ) {

                        } else if ( scope.mainPlayerGamemode === "aventer" ) {
                            scope.mainOtherPlayerFighting = false;
                            scope.mainPlayerGetAttacked = true;
                        }
                    }
                    //setInterval(() => {
                        //this.physics(window.group);
                    //}, 500);
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

            let BlockSize = 1;

            class PublicPlayer {
                constructor (PlayerName, PublicServer) {
                    this.Name = PlayerName;
                    this.Server = PublicServer;
                }

                Build (x, y, z) {
                    this.group = new Group();
                    this.group.position.set(x, y, z);
                    var Material = new MeshBasicMaterial({color: "black", wireframe: false});
                    var Geometry = new BoxGeometry(0, 0, 0);
                    var Head = new Mesh(Geometry, Material);
                    //var GUI = new GroundedSkybox();
                    var GUI = new Group();
                    var SizeX = /*this.Name.length * 2 + 10 / 2*/5;
                    var NameTagBase = new Mesh(Geometry, Material);
                    //NameTagBase.scale.set(SizeX, 5, 0.1);
                    NameTagBase.geometry.dispose();
                    NameTagBase.geometry = new BoxGeometry(SizeX, 0.8, 0.1);
                    //Head.scale.set(1, 1, 1);
                    Head.geometry.dispose();
                    Head.geometry = new BoxGeometry(1, 1, 1);
                    Head.name = "Head";
                    this.group.name = this.Name;
                    //this.Listen();
                    NameTagBase.position.y = Head.position.y + 1;
                    GUI.add(NameTagBase);
                    this.group.add(Head, GUI);
                    scene.add(this.group);
                }

                GetPlayer () {
                    return {
                        Model: this.group || scene.getObjectByName(this.Name),
                        Username: this.group.name || scene.getObjectByName(this.Name).name,
                        Edit: function (string, value) {
                            if (this.group) {
                                this.group[string] = value;
                            } else if (scene.getObjectByName(this.Name)) {
                                scene.getObjectByName(this.Name)[string] = value;
                            }
                        }
                    };
                }

                Listen () {
                    var ListeningSocket = new WebSocket(this.Server);
                    ListeningSocket.onerror = function (Error) {

                    };
                    ListeningSocket.onmessage = async function (Msg) {
                        var message = Msg.data;
                        var player = this.GetPlayer();
                        if (message.includes(this.Name || player.name + " has left the game.")) {
                            player.remove();
                        } else if (message.includes(this.name || player.name + " has been positioned/moved | ")) {
                            var playerJson = message.replace(this.name || player.name + " has been positioned/moved | ", "");
                            try {
                                var playerJsonResponse = await fetch(playerJson);

                                if (!playerJsonResponse.ok) {

                                } else {
                                    var Position = playerJsonResponse.json().Position;
                                    var Rotation = playerJsonResponse.json().Head.Rotation;
                                    if (this.group) {
                                        this.group.position.set(Position.x, Position.y, Position.z);
                                        this.group.getObjectByName('Head').rotation.set(Rotation.x, Rotation.y, Rotation.z);
                                    } else if (scene.getObjectByName(this.Name)) {
                                        scene.getObjectByName(this.Name).position.set(Position.x, Position.y, Position.z);
                                        scene.getObjectByName(this.Name).getObjectByName('Head').rotation.set(Rotation.x, Rotation.y, Rotation.z);
                                    }
                                }
                            } catch (Error) {

                            }
                        } else if (message.includes(this.Name || player.name + "'s Skin Has Been Set To An Offline Resource: ")) {
                            var OfflineResource = message.replace(this.Name || player.name + "'s Skin Has Been Set To An Offline Resource: ", "");
                        }
                    }
                }

                init (x, y, z) {
                    this.Build(x, y, z);
                }
            }

            
                setTimeout(() => {
                    var CurrentServer = "ws://127.0.0.1:5501/ws";
                    //var NewPublicPlayer = new PublicPlayer("BananaCool467", CurrentServer);
                    //NewPublicPlayer.init(0, 0, 0);
                }, 1000);
            

            window.senseitivity = 0.005;

            const controlledDiv = document.getElementById('controlledDiv');
          
            function buttonPressed(b) {
                if (typeof(b) == "object") {
                    return b.pressed;
                }
                return b == 1.0;
            }

            window.hpHit = false;
            window.selectedInventorySlot = 1;

            let L1Clicking = false;
            let R1Clicking = false;

            function updateGamepadStatus(x, y) {
              const gamepads = navigator.getGamepads();
              for (let i = 0; i < gamepads.length; i++) {
                const gp = gamepads[i];
                if (gp) {
                  // Use the left joystick (axes[0] and axes[1]) to move the div
                  controlledDiv.style.left = `${50 + gp.axes[2] * 25}%`;
                  controlledDiv.style.top = `${50 + gp.axes[3] * 25}%`;
                  const movementRX = gp.axes[2];
                    const movementRY = gp.axes[3];
                
                    camera.rotation.y -= movementRX * window.senseitivity;
                    camera.rotation.x -= movementRY * window.senseitivity;

                    const movementLX = gp.axes[0] / 25;
                    const movementLY = gp.axes[1] / 25;

                    if (movementLX > 2) {
                        //window.group.position.x += movementLX / 0.10000000149012;
                        window.group.position.x += 0.10;
                    } else if (movementLX < -1.9) {
                        window.group.position.x -= 0.10;
                    }
                    if (movementLY > 2) {
                        //window.group.position.y += movementLY / 0.10000000149012;
                        window.group.position.z += 0.10;
                    } else if (movementLY < -1.9) {
                        window.group.position.z -= 0.10;
                    }
                    camera.position.x -=  movementLX / 0.10000000149012;
                    camera.position.y -=  movementLY / 0.10000000149012;

                    //const R2Pressed = gp.buttons[7].pressed;
                    //const L2Pressed = gp.buttons[6].pressed;
                    //console.log(`R2 pressed: ${r2Pressed}, L2 pressed: ${l2Pressed}`);

                    if (buttonPressed(gp.buttons[2])) {
                        var chat = document.querySelector('.game .gamechat');
                        var msgInput = chat.querySelector('.mc-chat-input input');
                        chat.style.display = "block";
                        msgInput.removeAttribute('hidden');
                        msgInput.focus();
                    }
                    if (buttonPressed(gp.buttons[7])) {
                        var chat = document.querySelector('.game .gamechat');
                        var msgInput = chat.querySelector('.mc-chat-input input');
                        if (chat.style.display === "block") {
                            if (!msgInput.hasAttribute('hidden')) {
                                chat.style.display = "none";
                                sendChatMessage(msgInput.value);
                                msgInput.value = "";
                                msgInput.setAttribute('hidden', '');
                            }
                        }
                    }
                    if (buttonPressed(gp.buttons[0])) {
                        keys["space"] = true;
                    } else {
                        keys["space"] = false;
                    }
                    if (buttonPressed(gp.buttons[10])) {
                        keys["r"] = true;
                    } else {
                        keys["r"] = false;
                    }
                    if (buttonPressed(gp.buttons[11])) {
                        keys["Shift"] = true;
                    } else {
                        keys["Shift"] = false;
                    }
                    if (buttonPressed(gp.buttons[9])) {
                        // Options
                    }
                    if (buttonPressed(gp.buttons[8])) {
                        // Share
                    }
                    if (buttonPressed(gp.buttons[7])) {
                        window.selectedInventorySlot += 1;
                        changeItem(window.selectedInventorySlot);
                    }
                    if (buttonPressed(gp.buttons[6])) {
                        window.selectedInventorySlot -= 1;
                        changeItem(window.selectedInventorySlot);
                    }
                    if (buttonPressed(gp.buttons[12])) {
                        F4Locked = true;
                    } else {
                        F4Locked = false;
                    }
                    if (buttonPressed(gp.buttons[3])) {

                    }
                    if (buttonPressed(gp.buttons[4])) { // L1
                        if (blockTypeSelected === "minecraft:oak_plank") {
                            blockTypeSelected = "minecraft:glass_block";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:glass_block`;
                        } else if (blockTypeSelected === "minecraft:dirt") {
                            blockTypeSelected = "minecraft:oak_plank";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:oak_plank`;
                        } else if (blockTypeSelected === "minecraft:bedrock") {
                            blockTypeSelected = "minecraft:dirt";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:dirt`;
                        } else if (blockTypeSelected === "minecraft:wood") {
                            blockTypeSelected = "minecraft:bedrock";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:bedrock`;
                        } else if (blockTypeSelected === "minecraft:glass_block") {
                            blockTypeSelected = "minecraft:wood";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:wood`;
                        }
                    }
                    if (buttonPressed(gp.buttons[0])) { // X
                        player.jump(window.group, window.group.position.y + 1.5);
                    }
                    if (buttonPressed(gp.buttons[5])) { // R1
                        if (blockTypeSelected === "minecraft:oak_plank") {
                            blockTypeSelected = "minecraft:dirt";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:dirt [use "b" on keyboard to switch to minecraft:bedrock]`;
                        } else if (blockTypeSelected === "minecraft:dirt") {
                            blockTypeSelected = "minecraft:bedrock";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:bedrock [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:bedrock") {
                            blockTypeSelected = "minecraft:wood";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:wood [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:wood") {
                            blockTypeSelected = "minecraft:glass_block";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:glass_block [use "b" on keyboard to switch to minecraft:oak_plank]`;
                        } else if (blockTypeSelected === "minecraft:glass_block") {
                            blockTypeSelected = "minecraft:oak_plank";
                            document.querySelector('.blockSelected').textContent = `Block Selected: minecraft:oak_plank [use "b" on keyboard to switch to minecraft:dirt]`;
                        }
                    }
                    if (window.hpHit === true) {
                        if (gp.vibrationActuator) {
                            gp.vibrationActuator.playEffect("dual-rumble", {
                                startDelay: 0,
                                duration: 200,
                                weakMagnitude: 1.0,
                                strongMagnitude: 1.0
                            });
                        } else {
                            console.log("vibrationActuator Is Not Found On Controller.");
                        }
                    }
                }
              }
            }

            setTimeout(() => {
                window.hpHit = true;
                setTimeout(() => {
                    window.hpHit = false;
                }, 200)
            }, 5000)

export { current, container, controls, scene, renderer, Player, initGame, animateGame, player }