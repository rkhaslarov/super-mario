import { Entity, Trait } from '../components/Entity';
import Velocity from '../components/traits/Velocity';
import Jump from '../components/traits/Jump';
import { loadCharacterSprite } from './sprites';


export function createMario() {

    return loadCharacterSprite()
        .then((sprite) => {
            const mario = new Entity();

            mario.addTrait(new Velocity());
            mario.addTrait(new Jump());

            mario.draw = function(context) {
                sprite.draw('idle', context, this.pos.x, this.pos.y);
            }

            return mario;
        });
};
