function Paddle(x, y, width, height, color, index = -1, isObstacle = false, isPassable = false, isComputer = false) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 2.0;
    this.obstacleSpeed = 1;
    this.color = color;
    this.index = index;
    this.isComputer = isComputer;
    this.isObstacle = isObstacle;
    this.isPassable = isPassable;

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
            if (this.y + this.height > canvas.height) {
                this.y = canvas.height - this.height;
            }
        }
    }

    this.movePaddleWithMouse = function(mouseX, mouseY, canvas) {
        //this.y = mouseY < this.height / 2 ? 0 : ((mouseY + this.height / 2) > canvas.height ? canvas.height - this.height : mouseY - this.height / 2);
        this.y = mouseY < 0 ? -this.height / 2 : ((mouseY) > canvas.height ? canvas.height - this.height / 2 : mouseY - this.height / 2);
    }

    this.oscillatePaddle = function(canvas) {
        if (this.isObstacle) {
            this.y += this.obstacleSpeed;
            if (this.y <= 0 || (this.y + this.height) >= canvas.height)
                this.obstacleSpeed = -this.obstacleSpeed;
        }
    }

    this.followBall = function(ball, randomYOffset) {
        let paddleCenterY = this.y + this.height / 2;
        if (randomYOffset == undefined) {
            randomYOffset = this.getRandomInteger(Math.floor(this.y - 2 * this.speed), Math.ceil(this.y + this.height + 2 * this.speed)) - paddleCenterY;
        }
        if (paddleCenterY + randomYOffset < ball.y) this.y += this.speed;
        else if (paddleCenterY + randomYOffset > ball.y) this.y -= this.speed;
        return randomYOffset;
    }

    this.getRandomInteger = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}