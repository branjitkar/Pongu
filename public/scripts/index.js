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
var frames;
//#endregion global variables


function setup() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();
    gameSetup(canvas, gameIdFromQueryString());
    interval = setInterval(runGame, 7);
    eventHandler = new EventHandler(interact);
    document.addEventListener("keydown", onKeyDownEvent, false);
    document.addEventListener("keyup", onKeyUpEvent, false);
}

function resizeCanvas() {
    //resize canvas according to window height
    ctx.canvas.height = window.innerHeight * 0.8;
    ctx.canvas.width = ctx.canvas.height * 1.6;

    if (ctx.canvas.width > window.innerWidth * 0.8) {
        ctx.canvas.width = window.innerWidth * 0.8;
        ctx.canvas.height = ctx.canvas.width / 1.6;
    }
}

function gameSetup(canvas, gameId) {
    let scale = canvas.height / 550;
    game = new Game(canvas, gameId, scale);
    game.loadGame();
    balls = game.balls;
    paddles = game.paddles;
    interact = new Interact(canvas, balls, paddles);
    frames = new Frames(ctx, balls, paddles);
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
    frames.drawFrame();
}

function assignPaddlesToUser() {
    paddles[0].isComputer = !(playerMode == 1 || playerMode == 2);
    paddles[1].isComputer = !(playerMode == 2);
}

function initiateInteractions() {
    if (!interact.gameStart) return;
    interact.moveBalls();
    interact.controlPaddles(controlMode);
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