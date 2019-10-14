//#region global variables
var canvas;
var ctx;
var balls = [];
var paddles = [];
var interact;
var canvasHeight;
var canvasWidth;
var interval;
var controlMode;
var playerMode;

var game;
var interact;
var eventHandler;
//#endregion global variables

function setup() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    //resize canvas according to window height
    ctx.canvas.height = window.innerHeight / 1.4;
    ctx.canvas.width = window.innerHeight * 1.28;
    gameSetup(canvas, gameIdFromQueryString());
    interval = setInterval(runGame, 7);

    eventHandler = new EventHandler(interact);
    document.addEventListener("keydown", onKeyDownEvent, false);
    document.addEventListener("keyup", onKeyUpEvent, false);
}

function gameSetup(canvas, gameId) {
    game = new Game(canvas, gameId);
    game.loadGame();
    balls = game.balls;
    paddles = game.paddles;
    interact = new Interact(game.canvas, game.balls, game.paddles);
}

function setUserControl(mode) {
    switch (mode) {
        case "k":
            this.controlMode = 'k';
            break;
        default:
            this.controlMode = 'm';
            break;
    }
}

function setPlayerMode(mode) {
    switch (mode) {
        case "1":
            this.playerMode = 1;
            break;
        case "2":
            this.playerMode = 2;
            break;
        default:
            this.playerMode = 0;
            break;
    }
}

function gameIdFromQueryString() {
    var urlParams = new URLSearchParams(location.search);
    if (urlParams.has('g')) return urlParams.get('g');
    return;
}

function runGame() {
    assignPaddlesToUser();
    initiateInteractions();
    draw();
}

function assignPaddlesToUser() {
    paddles[0].isComputer = !(playerMode == 1 || playerMode == 2);
    paddles[1].isComputer = !(playerMode == 2);
}

function initiateInteractions() {
    if (!interact.gameStart) return;
    console.log('this - ', interact.gameStart);
    console.log('events - ', eventHandler.interact.gameStart);
    interact.moveBalls();
    draw();
    interact.controlPaddles(controlMode);
    draw();
    interact.checkWin();
}

//Start game
document.addEventListener('DOMContentLoaded', setup, false);

//#region event handlers proxy
function onMouseClick(e) {
    eventHandler.mouseClickHandler(e);
}

function onMouseMove(e) {
    eventHandler.mouseHandler(e);
}

function onKeyDownEvent(e) {
    eventHandler.keyDownHandler(e);
}

function onKeyUpEvent(e) {
    eventHandler.keyUpHandler(e);
}
//#endregion event handler proxy