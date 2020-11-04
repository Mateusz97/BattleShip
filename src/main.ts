import { Computer } from './computer';
import { Game } from './game';
import { Human } from './human';
import { ShipStates } from './ship-states'
let human: Human = new Human();
let computer: Computer = new Computer();
let tableHuman: HTMLTableElement;
let tableComputer: HTMLTableElement;




function createDiv(id: string): HTMLDivElement {
    let div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}

function createTable(id: string): HTMLTableElement {
    let table = document.createElement("table");
    table.setAttribute("id", id);
    for (let i = 0; i < 10; i++) {
        let tempRow = document.createElement("tr");
        for (let j = 0; j < 10; j++) {
            let tempTd = document.createElement("td");
            tempTd.setAttribute("id", id + j + "" + i);
            tempTd.setAttribute("x", j.toString());
            tempTd.setAttribute("y", i.toString());
            tempRow.appendChild(tempTd);
        }
        table.appendChild(tempRow);
    }
    return table;
}



function initHtml() {
    let app = document.getElementById("app");
    tableHuman = createTable("human");
    let boards = createDiv("boards");
    tableComputer = createTable("computer");

    boards.appendChild(tableHuman);
    boards.appendChild(tableComputer);
    app?.appendChild(boards);
    addHumanEventListeners();
}


function placeComputerShips() {

    while (computer.actualIndex < Game.shipLengths.length) {
        let tempX: number = getRandomInt();
        let tempY: number = getRandomInt();

        if (computer.canPlaceShip()) {
            if (computer.placeShip(tempX, tempY)) {
                for (let z = 0; z < Game.shipLengths[computer.actualIndex]; z++) {
                    document.getElementById("computer" + (tempX + +z) + tempY)?.setAttribute("class", ShipStates.SHIP_C);
                }
                computer.actualIndex++;
            }
        }
    }
}

function getRandomInt() {
    return Math.floor(Math.random() * 10);
}

function addComputerEventListeners() {
    let collection = tableComputer.children;
    for (let i = 0; i < collection.length; i++) {
        let tr = collection[i];
        let td: HTMLCollection = tr.children;
        for (let j = 0; j < 10; j++) {
            td[j].addEventListener("click", function (this: HTMLElement) {
                if (Game.isHumanMove && Game.shipsPlaced) {
                    let isShip: boolean = this.getAttribute("class") == ShipStates.SHIP_C;

                    isShip ? this.setAttribute("class", ShipStates.MARKED) : this.setAttribute("class", ShipStates.MISS);
                    if (!isShip) {

                        Game.isHumanMove = false;
                        computerShoot();
                    }
                }
            })
        }
    }
}
function computerShoot() {
    let randX = getRandomInt();
    let randY = getRandomInt();
    let cell = document.getElementById("human" + randX + randY);
    let isShip: boolean = cell?.getAttribute("class") == ShipStates.SHIP;
    if (isShip) {
        cell?.setAttribute("class", ShipStates.MARKED);
        setTimeout(() => { computerShoot(); }, 1000);

    }
    else {
        cell?.setAttribute("class", ShipStates.MISS);
    }
    Game.isHumanMove = true;

}
function addHumanEventListeners() {
    let collection = tableHuman.children;
    cell: Element;
    for (let i = 0; i < collection.length; i++) {
        let tr = collection[i];
        let td: HTMLCollection = tr.children;
        for (let j = 0; j < 10; j++) {
            td[j].addEventListener("click", function (this: HTMLElement, event) {
                if (human.canPlaceShip()) {
                    human.placeShip(j, i);
                    for (let z = 0; z < Game.shipLengths[human.actualIndex]; z++) {
                        document.getElementById("human" + (j + +z) + i)?.setAttribute("class", ShipStates.SHIP);
                    }
                    human.actualIndex++;
                    if (human.actualIndex >= Game.shipLengths.length) Game.shipsPlaced = true;

                }
                else {
                    human.ships.forEach(ship => {
                        console.log("CORDS: " + ship.x + ":" + ship.y);
                    })
                }

            })
        }
    }
}



initHtml();
placeComputerShips();

addComputerEventListeners();