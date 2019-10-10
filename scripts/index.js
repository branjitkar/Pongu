//canvas variables
var canvas;
var ctx;
var balls = [];
var paddles = [];
var interact;
var moveObstacles = true;
var canvasHeight;
var canvasWidth;
var interval;
var controlMode;
var playerMode;

function setup() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    gameSetup();
    interval = setInterval(runGame, 7);
}

function gameSetup() {
    switch (gameIdFromQueryString()) {
        case "0":
            game0();
            break;
        case "1":
            game1();
            break;
        case "2":
            game2();
            break;
        case "3":
            game3();
            break;
        case "4":
            game4();
            break;
        default:
            game0();
            break;
    }
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
    draw();
    initiateInteractions();
}

//Start game
document.addEventListener('DOMContentLoaded', setup, false);