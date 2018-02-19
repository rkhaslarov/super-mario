import { loadImage } from './helpers/utils';
import { drawBackground, loadLevel } from './helpers/level';
import SpriteSheet from './components/SpriteSheet';
import Composer from './components/Composer';

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

function loadBackgroundSprites() {
    return loadImage('/images/tiles.png')
        .then(image => {

            const sprites = new SpriteSheet(image, 16, 16);

            sprites.defineTile('ground', 0, 0);
            sprites.defineTile('sky', 3, 23);

            return sprites;
        })
}

function loadCharacterSprite() {
    return loadImage('/images/characters.gif')
        .then(image => {

            const sprites = new SpriteSheet(image, 16, 16);

            sprites.define('idle', 276, 44, 16, 16)

            return sprites;
        })
}

function createBackgroundLayer(backgrounds, sprites) {
    const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    backgrounds.forEach(background => {
        drawBackground(background, buffer.getContext('2d'), sprites);
    });

    return function drawBackgroundLayer(context) {
        context.drawImage(buffer, 0, 0);
    };
}

function createSpriteLayer(sprite, pos) {
    return function drawSpriteLayer(context) {
        sprite.draw('idle', context, pos.x, pos.y);
    };
}

Promise.all([
    loadBackgroundSprites(),
    loadCharacterSprite(),
    loadLevel('1-1')
])
.then(([background, mario, level]) => {

    const composer = new Composer();
    const backgroundLayer = createBackgroundLayer(level.backgrounds, background);

    composer.layers.push(backgroundLayer);

    const pos = {
        x: 64,
        y: 64
    }
    const marioLayer = createSpriteLayer(mario, pos);

    composer.layers.push(marioLayer);

    function update() {
        composer.draw(context);
        mario.draw('idle', context, pos.x, pos.y);
        pos.x += 2;
        pos.y += 2;

        requestAnimationFrame(update);
    }

    update();
})
.catch((e) => {
    console.error(e)
});
