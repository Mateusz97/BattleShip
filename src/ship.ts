import { ShipStates } from './ship-states'
export class Ship {
    x: number;
    y: number;
    length: number;
    state = ShipStates.EMPTY;
    constructor(x: number, y: number, length: number) {
        this.x = x;
        this.y = y;
        this.length = length;
    }

    public isCellTaken(x: number, y: number): boolean {
        if (y === this.y) {
            for (let i = 0; i < this.length; i++) {
                if(x == this.x + +i || x == this.x - +i) return true;
            }
        }
        return false;
    }

}