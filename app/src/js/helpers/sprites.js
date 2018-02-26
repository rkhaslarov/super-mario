import { loadImage } from './utils';
import SpriteSheet from '../components/SpriteSheet';

export function loadBackgroundSprites() {
    return loadImage('/images/tiles.png')
        .then(image => {

            const sprites = new SpriteSheet(image, 16, 16);

            sprites.defineTile('ground', 0, 0);
            sprites.defineTile('sky', 3, 23);

            return sprites;
        })
}

export function loadCharacterSprite() {
    return loadImage('/images/characters.gif')
        .then(image => {

            const sprites = new SpriteSheet(image);

            sprites.define('idle', 276, 44, 16, 16)

            return sprites;
        })
}
