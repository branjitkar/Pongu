function drawBoard1() {
    ctx.beginPath();
    ctx.rect(0, ctx.canvas.height / 2 - 4, ctx.canvas.width, 8)
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
    ctx.strokeStyle = "#FFF";
    ctx.stroke();
    ctx.closePath();
}

function drawBoard2() {
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.strokeStyle = "#AAA";
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width / 2, 0);
    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height);
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
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
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