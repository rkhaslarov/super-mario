import { loadLevel } from './helpers/level';
import { createMario } from './helpers/entities';
import { loadBackgroundSprites } from './helpers/sprites';
import { createBackgroundLayer, createSpriteLayer } from './helpers/layers';
import Composer from './components/Composer';
import Entity from './components/Entity';
import Timer from './components/Timer';

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([mario, background, level]) => {

    const composer = new Composer();
    const gravity = 30;

    const backgroundLayer = createBackgroundLayer(level.backgrounds, background);
    composer.layers.push(backgroundLayer);

    mario.pos.set(64, 180);
    mario.vel.set(200, -600);

    const marioLayer = createSpriteLayer(mario);
    composer.layers.push(marioLayer);

    const timer = new Timer();

    timer.update = function(deltaTime) {
        composer.draw(context);
        mario.update(deltaTime);
        mario.vel.y += gravity;
    }

    timer.start();
})
.catch((e) => {
    console.error(e)
});
