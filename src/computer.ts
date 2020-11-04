import {Player} from './player';


export class Computer extends Player{
     triedX: number[] = [];
     triedY: number[] = [];
    constructor(){
        super();
    }
}