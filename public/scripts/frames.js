function Frames(ctx, balls, paddles) {
    this.ctx = ctx;
    this.balls = balls;
    this.paddles = paddles;

    this.drawBoard1 = function() {
        this.ctx.beginPath();
        this.ctx.rect(0, this.ctx.canvas.height / 2 - 4, this.ctx.canvas.width, 8)
        this.ctx.fillStyle = "#FFF";
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
        this.ctx.lineTo(this.ctx.canvas.width / 2, this.ctx.canvas.height);
        this.ctx.strokeStyle = "#FFF";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawBoard2 = function() {
        let centerRadius = 150 * this.ctx.canvas.height / 550;

        this.ctx.beginPath();
        this.ctx.arc(this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, centerRadius, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#AAA";
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.ctx.canvas.width / 2, 0);
        this.ctx.lineTo(this.ctx.canvas.width / 2, this.ctx.canvas.height);
        this.ctx.strokeStyle = "#AAA";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.drawBalls = function() {
        this.balls.forEach(ball => ball.draw(this.ctx));
    }

    this.drawPaddles = function() {
        this.paddles.forEach(paddle => paddle.draw(this.ctx));
    }

    this.clearCanvas = function() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    this.drawFrame = function() {
        this.clearCanvas();
        this.drawBoard2();
        this.drawBalls();
        this.drawPaddles();
    }
}