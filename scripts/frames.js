function drawBoard1() {
    ctx.beginPath();
    ctx.rect(0, canvas.height / 2 - 4, canvas.width, 8)
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
    ctx.closePath();
}

function drawBoard2() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.strokeStyle = "#AAA";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#AAA";
    ctx.stroke();
    ctx.closePath();
}

function drawBalls() {
    balls.forEach(ball => ball.draw(ctx));
}

function drawPaddles() {
    paddles.forEach(paddle => paddle.draw(ctx));
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawBoard2();
    drawBalls();
    drawPaddles();
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