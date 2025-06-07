import {
    MinecraftGrassBlockTopImg,
    LogImg
} from 'http://127.0.0.1:5500/textures/images.js';

const grassTexture = new TextureLoader(MinecraftGrassBlockTopImg);
const logTexture = new TextureLoader(LogImg);

export {
    grassTexture,
    logTexture
}