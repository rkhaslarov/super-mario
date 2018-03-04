import { loadLevel } from './helpers/level';
import { createMario } from './helpers/entities';
import { loadBackgroundSprites } from './helpers/sprites';
import { createBackgroundLayer, createSpriteLayer } from './helpers/layers';
import Composer from './components/Composer';
import Entity from './components/Entity';
import Timer from './components/Timer';
import Keyboard from './components/KeyboardState';

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

Promise.all([
    createMario(),
    loadBackgroundSprites(),
    loadLevel('1-1')
])
.then(([mario, background, level]) => {

    const composer = new Composer();
    const timer = new Timer();
    const gravity = 2000;

    mario.pos.set(64, 180);
    // mario.vel.set(200, -600);

    const input = new Keyboard();
    const SPACE = 32;
    input.addMapping(SPACE, keyState => {

        if(keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });
    input.listenTo(window);


    const backgroundLayer = createBackgroundLayer(level.backgrounds, background);
    composer.layers.push(backgroundLayer);

    const marioLayer = createSpriteLayer(mario);
    composer.layers.push(marioLayer);

    timer.update = function(deltaTime) {
        mario.update(deltaTime);
        composer.draw(context);
        mario.vel.y += gravity * deltaTime;
    }

    timer.start();
})
.catch((e) => {
    console.error(e)
});
