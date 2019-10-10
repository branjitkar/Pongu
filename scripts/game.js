function game0() {
    balls.push(new Ball(canvas.width / 2, canvas.height / 2, 10, 1));
    addControlPaddles(paddles);
    interact = new Interact(canvas, balls, paddles);
}

function game1() {
    balls.push(new Ball(canvas.width / 2 - 40, canvas.height / 2, 10, 1));
    addControlPaddles(paddles);
    paddles.push(new Paddle(canvas.width / 2 - 7.5, canvas.height / 2 - 60, 15, 120, "#555", 2, true));
    interact = new Interact(canvas, balls, paddles);
}

function game2() {
    balls.push(new Ball(canvas.width / 2 - 40, canvas.height / 2, 10, 1));
    addControlPaddles(paddles);
    paddles.push(new Paddle(canvas.width / 2 - 7.5, canvas.height / 2 - 100, 15, 200, "#555", 2, true, true));
    interact = new Interact(canvas, balls, paddles);
}

function game3() {
    balls.push(new Ball(canvas.width / 2 - 40, canvas.height / 2, 10, 1));
    addControlPaddles(paddles);
    paddles.push(new Paddle(canvas.width / 2 - 5, canvas.height / 4 - 50, 10, 100, "#555", 2, true, true));
    paddles.push(new Paddle(canvas.width / 2 - 5, canvas.height / 2 - 50, 10, 100, "#555", 2, true, true));
    paddles.push(new Paddle(canvas.width / 2 - 5, 3 * canvas.height / 4 - 50, 10, 100, "#555", 3, true, true));
    interact = new Interact(canvas, balls, paddles);
    moveObstacles = false;
}

function game4() {
    balls.push(new Ball(canvas.width / 2 - 40, canvas.height / 2, 10, 1));
    balls.push(new Ball(canvas.width / 2 + 40, canvas.height / 2, 10, -1));
    addControlPaddles(paddles);
    // paddles.push(new Paddle(canvas.width / 2 - 5, canvas.height / 4 - 50, 10, 100, "#555", 2, true, true));
    // paddles.push(new Paddle(canvas.width / 2 - 5, canvas.height / 2 - 50, 10, 100, "#555", 2, true, true));
    // paddles.push(new Paddle(canvas.width / 2 - 5, 3 * canvas.height / 4 - 50, 10, 100, "#555", 3, true, true));
    interact = new Interact(canvas, balls, paddles);
    moveObstacles = false;
}

function addControlPaddles(paddles) {
    let paddle1 = new Paddle(0, canvas.height / 2 - 50, 10, 100, "#F8A51B", 0, false);
    paddle1.isComputer = false;
    paddles.push(paddle1);

    let paddle2 = new Paddle(canvas.width - 10, canvas.height / 2 - 50, 10, 100, "#0095DD", 1, false);
    paddle2.isComputer = false;
    paddles.push(paddle2);
}