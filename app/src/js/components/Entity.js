import Vector from './Vector';

export default class Entity {
    constructor(x, y) {
        this.pos = new Vector(0, 0);
        this.vel = new Vector(0, 0);
    }
}
