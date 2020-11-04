import { Game } from './game';
import { Ship } from './ship';
import { ShipStates } from './ship-states';

export class Player {
    actualIndex: number = 0;
    ships: Ship[] = [];
    i: number;
    constructor() {
        this.i = 0;
    }

    placeShip(x: number, y: number): boolean {
        let canPlace: boolean = true;
        this.ships.forEach(element => {
            if (element.isCellTaken(x, y) || (x + Game.shipLengths[this.actualIndex]) >=10) {
                canPlace = false;
                return false;
            }
        });
        if (canPlace) {
            this.ships.push(new Ship(x, y, Game.shipLengths[this.actualIndex]));

            return true;
        } else return false;

    }

    public canPlaceShip(): boolean {
        if (this.actualIndex < Game.shipLengths.length) {

            return true;
        }

        return false;
    }

}