import { loadImage } from './helpers/utils';
import { drawBackground, loadLevel } from './helpers/level';
import SpriteSheet from './components/SpriteSheet';

const canvas = document.querySelector('#main');
const context = canvas.getContext('2d');

loadImage('/images/tiles.png')
    .then(image => {

        const sprites = new SpriteSheet(image, 16, 16);

        sprites.define('ground', 0, 0)
        sprites.define('sky', 3, 23)

        loadLevel('1-1')
            .then(level => {
                level.backgrounds.forEach(bg => {
                    drawBackground(bg, context, sprites);
                });
            })
    })
    .catch((e) => {
        console.error(e)
    });
