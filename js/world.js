import { GUI } from 'https://cdn.jsdelivr.net/npm/lil-gui@0.19/+esm';
//import { textureLoader } from './game.js';
import { scene } from './main.js';
import { RNG } from './rng.js';
import { blocks } from './blocks.js';
import { light, camera } from './main.js';
import { light2 } from './main.js';
//import * as Simplex from 'http://127.0.0.1:5500/node_modules/simplex-noise/dist/cjs/simplex-noise.js';
import { createNoise3D } from 'http://127.0.0.1:5500/node_modules/simplex-noise/dist/esm/simplex-noise.js';
const textureCube = [
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
    //}),
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
    //}),
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockTop.png")
    //}),
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockButtom.png")
    //}),
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
    //}),
    //new MeshStandardMaterial({
        //uniforms: {
            //sphereColour: {
                //value: new Vector3(0, 0, 1)
            //}
        //},
        //vertexShader: _VS,
        //fragmentShader: _FS
        //map: textureLoader.load("textures/MinecraftGrassBlockSide.png")
    //}),
]
//var stats = new Stats();
//document.body.querySelector('.game').append(stats.dom);
//const textureLoader = new TextureLoader();
const geometry = new BoxGeometry();
//const material = new MeshLambertMaterial({ color: 0x00d000 });
const textureLoader = new TextureLoader();
const material = [
    new MeshStandardMaterial({ /*color: 0x00d000*/map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png") }),
    new MeshStandardMaterial({ /*color: 0x00d000*/map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png") }),
    new MeshStandardMaterial({ /*color: 0x00d000*/ map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockTop.png") }),
    new MeshStandardMaterial({ /*color: 0x00d000*/ map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockButtom.png") }),
    new MeshStandardMaterial({ /*color: 0x00d000*/ map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png") }),
    new MeshStandardMaterial({ /*color: 0x00d000*/ map: textureLoader.load("http://127.0.0.1:5500/textures/MinecraftGrassBlockSide.png") })
]
window.sizeWidth = 30;
window.sizeHeight = 30;
window.threshold = 0.5;

export class World extends Group {
    /**
     * @type {{
     * id: number,
     * instanceID: number
     * }[][][]}
     */
    data = [];

    params = {
        seed: 0,
        terrain: {
            scale: 30,
            magnitude: 0.5,
            offset: 0.2
        }
    }

    constructor(size = { width: 30, height: 30 }) {
        super();
        //this.generate();
        //this.size = size;
        window.sizeWidth = size.width;
        window.sizeHeight = size.height;
    }

    generateTerrain() {
        this.data = [];
        for (let x = 0; x < window.sizeWidth; x++) {
            const slice = [];
            for (let y = 0; y < window.sizeHeight; y++) {
                const row = [];
                for (let z = 0; z < window.sizeWidth; z++) {
                    row.push({
                        id: 0,
                        instanceID: null
                    });
                }
                slice.push(row);
            }
            this.data.push(slice);
        }
    }

    initializeTerrain() {
        const rng = new RNG(this.params.seed);
        //const simplex = new createNoise3D(rng);
        for (let x = 0; x < window.sizeWidth; x++) {
            for (let z = 0; z < window.sizeHeight; z++) {
                //const value = noise(x / this.params.terrain.scale, z / this.params.terrain.scale);
                //const scaledNoise = this.params.terrain.offset + this.params.terrain.magnitude * value;

                let height = 60;
                height = Math.max(0, Math.min(height, window.sizeHeight));

                for (let y = 0; y <= window.sizeHeight; y++) {
                    if (y < height) {
                        this.setBlockId(x, y, z, blocks.dirt.id);
                    } else if (y === height) {
                        this.setBlockId(x, y, z, blocks.grass.id);
                    } else {
                        this.setBlockId(x, y, z, blocks.empty.id);
                    }
                }
            }
        }
    }

    generateMeshes() {
        //window.sizeWidth = size.width;
        //window.sizeHeight = size.height;

        setTimeout(()=>{
            //scene.remove('MinecraftBlock');
            scene.clear();
            const maxCount = window.sizeWidth * window.sizeWidth * window.sizeHeight;
            const mesh = new InstancedMesh(geometry, material, maxCount);
            mesh.count = 0;
            const matrix = new Matrix4();
            for (let x = 0; x < window.sizeWidth; x++) {
                for (let y = 0; y < window.sizeHeight; y++) {
                    for (let z = 0; z < window.sizeWidth; z++) {
                        const blockId = this.getBlock(x, y, z).id;
                        const blockType = Object.values(blocks).find(x => x.id === blockId);
                        const instanceID = mesh.count;
                        
                        if (blockId == 0) {
                            matrix.setPosition(x, y, z);
                            mesh.setMatrixAt(instanceID, matrix);
                            mesh.setColorAt(instanceID, new Color());
                            this.setBlockInstanceID(x, y, z, instanceID);
                            mesh.count++;
                        }
                    }
                }
            }

            //mesh.name = "MinecraftBlock";
            scene.add(mesh, light, light2);
        }, 1);
    }

    generate () {
        this.generateTerrain();
        this.initializeTerrain();
        this.generateMeshes();
    };

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {{id: number, instanceID: number}}
     */
    getBlock (x, y, z) {
        if (this.inBounds(x, y, z)) {
            return this.data[x][y][z];
        } else {
            return null;
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} id
     */
    setBlockId(x, y, z, id) {
        if (this.inBounds(x, y, z)) {
            this.data[x][y][z].id = id;
        }
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} instanceID
     */
    setBlockInstanceID(x, y, z, instanceID) {
        if (this.inBounds(x, y, z)) {
            this.data[x][y][z].instanceID = instanceID;
        }
    }

    /**
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @returns {boolean}
     */
    inBounds(x, y, z) {
        if (x >= 0 && x < window.sizeWidth && y >= 0 && y < window.sizeHeight && z >= 0 && z < 60) {
            return true;
        } else {
            return false;
        }
    }
}
//import { minecraftWorld } from './main.js';
//var newWorld = new World({width: 60, height: 30});

//minecraftWorld.generateMeshes();

export function createUI (world) {
    var newMinecraftWorld = new World({width: 60, height: 30});
    newMinecraftWorld.generate();
    var gui = new GUI();

    const playerFolder = gui.addFolder('Player').close();
    const physicsFolder = gui.addFolder('Physics').close();
    const worldFolder = gui.addFolder('World').open();
    worldFolder.add(window, 'sizeWidth', 8, 30, 1).name('Width');
    worldFolder.add(window, 'sizeHeight', 8, 30, 1).name('Height');
    worldFolder.add(window, 'threshold', 0, 1).name('Noise');
    worldFolder.onChange(() => {
        //var newMinecraftWorld = new World();
        newMinecraftWorld.generate();
    })
    const terrainFolder = worldFolder.addFolder('Terrain').close();
    terrainFolder.add(world.params, 'seed', 0, 10000).name('Seed');
    terrainFolder.add(world.params.terrain, 'scale', 10, 100).name('Scale');
    terrainFolder.add(world.params.terrain, 'magnitude', 0, 1).name('Magnitude');
    terrainFolder.add(world.params.terrain, 'offset', 0, 1).name('Offset');
    const biomesFolder = gui.addFolder('Biomes').close();
    const resourcesFolder = worldFolder.addFolder('Resources').close();
    const treesFolder = terrainFolder.addFolder('Trees').close();
    const cloudsFolder = worldFolder.addFolder('Clouds').close();
    playerFolder.add(camera, "fov", 10, 100).name('FOV');

    worldFolder.onFinishChange((event) => {
        //var newMinecraftWorld = new World();
        newMinecraftWorld.generate();
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyU') {
          if (gui._hidden) {
            gui.show();
          } else {
            gui.hide();
          }
        }
      })
}