function Game(canvas, gameId) {
    this.gameId = gameId;
    this.balls = [];
    this.paddles = [];
    this.interact;
    this.canvas = canvas;

    this.loadGame = function() {
        switch (this.gameId) {
            case "0":
                this.game0();
                break;
            case "1":
                this.game1();
                break;
            case "2":
                this.game2();
                break;
            case "3":
                this.game3();
                break;
            case "4":
                this.game4();
                break;
            default:
                this.game0();
                break;
        }
    }

    this.game0 = function() {
        this.balls.push(new Ball(this.canvas.width / 2, this.canvas.height / 2, 10, 3, 0, 1, 1));
        this.addControlPaddles();
    }

    this.game1 = function() {
        this.balls.push(new Ball(this.canvas.width / 2 - 40, this.canvas.height / 2, 10, 3, 0, 1, 1));
        this.balls.push(new Ball(ctx.canvas.width / 2, 10, 10, 0, 3, -1, 1));
        this.balls[0].paddleIndex = 100;
        this.addControlPaddles();
        this.paddles.push(new Paddle(this.canvas.width / 2 - 7.5, this.canvas.height / 2 - 60, 15, 120, "#555", 2, true));
        this.paddles[2].canOscillate = true;
    }

    this.game2 = function() {
        this.balls.push(new Ball(this.canvas.width / 2 - 140, this.canvas.height / 2, 10, 3, 0, 1, 1));
        this.addControlPaddles(this.paddles);
        this.paddles.push(new Paddle(this.canvas.width / 2 - 15, this.canvas.height / 2 - 100, 30, 200, "#555", 2, true, true));
        this.paddles[2].canOscillate = true;
    }

    this.game3 = function() {
        this.balls.push(new Ball(this.canvas.width / 2 - 40, this.canvas.height / 2, 10, 3, 0, 1, 1));
        this.addControlPaddles();
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, this.canvas.height / 4 - 50, 10, 100, "#555", 2, true, true));
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, this.canvas.height / 2 - 50, 10, 100, "#555", 2, true, true));
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, 3 * this.canvas.height / 4 - 50, 10, 100, "#555", 3, true, true));
    }

    this.game4 = function() {
        this.balls.push(new Ball(this.canvas.width / 2, this.canvas.height / 2, 10, 3, 0, 1, 1));
        this.balls.push(new Ball(this.canvas.width / 2, this.canvas.height / 2, 10, 3, 0, -1, 1));
        this.addControlPaddles();
    }

    this.addControlPaddles = function() {
        let paddle1 = new Paddle(0, this.canvas.height / 2 - 50, 10, 100, "#F8A51B", 0, false);
        paddle1.isComputer = false;
        this.paddles.push(paddle1);

        let paddle2 = new Paddle(this.canvas.width - 10, this.canvas.height / 2 - 50, 10, 100, "#0095DD", 1, false);
        paddle2.isComputer = false;
        this.paddles.push(paddle2);
    }
}