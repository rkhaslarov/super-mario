import Entity from '../components/Entity';
import { loadCharacterSprite } from './sprites';

export function createMario() {

    return loadCharacterSprite()
        .then((sprite) => {
            const mario = new Entity();

            mario.update = function(deltaTime) {
                this.pos.x += this.vel.x * deltaTime;
                this.pos.y += this.vel.y * deltaTime;
            }

            mario.draw = function(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            }

            return mario;
        });
};
