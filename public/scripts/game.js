function Game(canvas, gameId, scale = 1) {
    this.gameId = gameId;
    this.balls = [];
    this.paddles = [];
    this.interact;
    this.canvas = canvas;
    this.scale = scale;

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
    this.getDefaultBall = function(x_offset = 0, y_offset = 0) {
        let ball_x = this.canvas.width / 2 + x_offset;
        let ball_y = this.canvas.height / 2 + y_offset;
        let ball_radius = 10 * this.scale;
        let ball_dx = 3 * this.scale;
        let ball_dy = 0 * this.scale;
        let ball_speed = 3 * this.scale;

        return new Ball(ball_x, ball_y, ball_radius, ball_dx, ball_dy, ball_speed);
    }

    this.addControlPaddles = function() {
        let paddleHeight = 100 * this.scale;
        let paddleWidth = 10 * this.scale;

        let paddle1 = new Paddle(0, this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "#F8A51B", 0, false);
        paddle1.isComputer = false;
        this.paddles.push(paddle1);

        let paddle2 = new Paddle(this.canvas.width - paddleWidth, this.canvas.height / 2 - paddleHeight / 2, paddleWidth, paddleHeight, "#0095DD", 1, false);
        paddle2.isComputer = false;
        this.paddles.push(paddle2);
    }

    this.game0 = function() {
        this.balls.push(this.getDefaultBall());
        this.addControlPaddles();
    }

    this.game1 = function() {
        this.balls.push(this.getDefaultBall(-40 * this.scale));
        this.balls.push(this.getDefaultBall());
        this.balls[1].y = this.balls[1].radius;
        this.balls[1].dx = 0;
        this.balls[1].dy = 3;

        this.addControlPaddles();
        this.paddles.push(new Paddle(this.canvas.width / 2 - 7.5, this.canvas.height / 2 - 60, 15, 120, "#555", 2, true));
        this.paddles[2].canOscillate = true;
    }

    this.game2 = function() {
        this.balls.push(this.getDefaultBall(-40 * this.scale));

        this.addControlPaddles(this.paddles);
        this.paddles.push(new Paddle(this.canvas.width / 2 - 15, this.canvas.height / 2 - 100, 30, 200, "#555", 2, true, true));
        this.paddles[2].canOscillate = true;
    }

    this.game3 = function() {
        this.balls.push(this.getDefaultBall(40 * this.scale));

        this.addControlPaddles();
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, this.canvas.height / 4 - 50, 10, 100, "#555", 2, true, true));
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, this.canvas.height / 2 - 50, 10, 100, "#555", 2, true, true));
        this.paddles.push(new Paddle(this.canvas.width / 2 - 5, 3 * this.canvas.height / 4 - 50, 10, 100, "#555", 3, true, true));
    }

    this.game4 = function() {
        this.balls.push(this.getDefaultBall());
        this.balls.push(this.getDefaultBall());
        this.balls[1].dx *= -1;

        this.addControlPaddles();
    }
}