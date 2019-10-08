function drawBoard1() {
    ctx.beginPath();
    ctx.rect(0, canvas.height / 2 - 4, canvas.width, 8)
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "#AAA";
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard1();
    ball.draw(ctx);
    paddles[0].isComputer = !(playerMode == 1 || playerMode == 2);
    paddles[1].isComputer = !(playerMode == 2);
    paddles.forEach((paddle) => {
        paddle.draw(ctx);
    });

    if (!interact.gameStart) return;

    checkWin(interact.detectCollision());
    interact.controlPaddles(controlMode);
    //interact.controlPaddlesWithMouse();
    ball.moveBall();
}

function checkWin(result) {
    switch (result) {
        case 1:
            console.log(ball.y + '-p2:' + paddles[1].y + ' - ' + (paddles[1].y + paddles[1].height))
            alert("Orange Wins!");
            document.location.reload();
            clearInterval(interval);
            break;
        case 2:
            console.log(ball.y + '-p2:' + paddles[0].y + ' - ' + (paddles[0].y + paddles[0].height))
            alert("Blue Wins!");
            document.location.reload();
            clearInterval(interval);
            break;
        default:
            break;
    }
}
1