function Paddle(x, y, width, height, color, index = -1, isObstacle = false, isPassable = false, isComputer = false, canOscillate = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 2.3;
    this.obstacleSpeed = 1;
    this.color = color;
    this.index = index;
    this.isComputer = isComputer;
    this.isObstacle = isObstacle;
    this.isPassable = isPassable;
    this.canOscillate = canOscillate;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.movePaddle = function(up, down) {
        if (up) {
            this.y -= this.speed;
            if (this.y < 0) {
                this.y = 0;
            }
        } else if (down) {
            this.y += this.speed;
            if (this.y + this.height > ctx.canvas.height) {
                this.y = ctx.canvas.height - this.height;
            }
        }
    }

    this.movePaddleWithMouse = function(mouseX, mouseY, canvas) {
        this.y = mouseY < 0 ? -this.height / 2 : ((mouseY) > ctx.canvas.height ? ctx.canvas.height - this.height / 2 : mouseY - this.height / 2);
    }

    this.oscillatePaddle = function(canvas) {
        if (this.isObstacle) {
            this.y += this.obstacleSpeed;
            if (this.y <= 0 || (this.y + this.height) >= ctx.canvas.height)
                this.obstacleSpeed = -this.obstacleSpeed;
        }
    }

    this.followBall = function(ball, randomYOffset) {
        let paddleCenterY = this.y + this.height / 2;
        if (randomYOffset == undefined) {
            randomYOffset = this.getRandomInteger(Math.floor(this.y - 1.5 * this.speed), Math.ceil(this.y + this.height + 1.5 * this.speed)) - paddleCenterY;
        }
        if (paddleCenterY + randomYOffset < ball.y) this.y += this.speed;
        else if (paddleCenterY + randomYOffset > ball.y) this.y -= this.speed;
        return randomYOffset;
    }

    this.getRandomInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}