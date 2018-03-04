import Vector from './Vector';

export class Trait {
    constructor(name) {
        this.name = name;
    }

    update() {
        console.warn('Unhandled update call!')
    }
}

export class Entity {
    constructor(x, y) {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);

        this.traits = [];
    }

    addTrait(trait) {
        this.traits.push(trait);
        this[trait.name] = trait;
    }

    update(deltaTime) {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        })
    }
}
