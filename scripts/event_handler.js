function keyDownHandler(e) {
    if (e.code == "Right" || e.code == "ArrowRight") {
        interact.rightPressed = true;
    } else if (e.code == "Left" || e.code == "ArrowLeft") {
        interact.leftPressed = true;
    } else if (e.code == "Up" || e.code == "ArrowUp") {
        interact.upPressed = true;
    } else if (e.code == "Down" || e.code == "ArrowDown") {
        interact.downPressed = true;
    } else if (e.code == "KeyW") {
        interact.wPressed = true;
    } else if (e.code == "KeyX") {
        interact.xPressed = true;
    } else if (e.code == "Space") {
        gameStart();
    }
}

function keyUpHandler(e) {
    if (e.code == "Right" || e.code == "ArrowRight") {
        interact.rightPressed = false;
    } else if (e.code == "Left" || e.code == "ArrowLeft") {
        interact.leftPressed = false;
    } else if (e.code == "Up" || e.code == "ArrowUp") {
        interact.upPressed = false;
    } else if (e.code == "Down" || e.code == "ArrowDown") {
        interact.downPressed = false;
    } else if (e.code == "KeyW") {
        interact.wPressed = false;
    } else if (e.code == "KeyX") {
        interact.xPressed = false;
    } else if (e.code == "Space") {}
}

function mouseHandler(e) {
    interact.mouseX = e.clientX - canvas.offsetLeft;
    interact.mouseY = e.clientY - canvas.offsetTop;
}

function mouseClickHandler(e) {
    gameStart();
}

function gameStart() {
    interact.gameStart = !interact.gameStart;
}