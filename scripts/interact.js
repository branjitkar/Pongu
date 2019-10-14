function Interact(canvas, balls, paddles) {
    this.canvas = canvas;
    this.paddles = paddles;
    this.balls = balls;
    this.rightPressed = false;
    this.leftPressed = false;
    this.upPressed = false;
    this.downPressed = false;
    this.wPressed = false;
    this.xPressed = false;
    this.gameStart = false;
    this.mouseX = -1;
    this.mouseY = -1;
    this.bricks = [];
    this.compPaddleYOffset = -1;

    this.moveBalls = function() {
        this.balls.forEach(ball => ball.moveBall());
    }

    this.controlPaddles = function(controlMode) {
        if (controlMode == 'k') this.controlPaddlesWithKeyboard();
        else this.controlPaddlesWithMouse();
        this.controlPaddlesWithKeyboard();
        this.autoControlPaddles();
    }

    this.controlPaddlesWithKeyboard = function() {
        if (!paddles[0].isComputer) this.paddles[0].movePaddle(this.wPressed, this.xPressed);
        if (!paddles[1].isComputer) this.paddles[1].movePaddle(this.upPressed, this.downPressed);
    }

    this.controlPaddlesWithMouse = function() {
        if (!paddles[0].isComputer) this.paddles[0].movePaddleWithMouse(this.mouseX, this.mouseY, canvas);
        if (!paddles[1].isComputer) this.paddles[1].movePaddleWithMouse(this.mouseX, this.mouseY, canvas);
    }

    this.autoControlPaddles = function() {
        this.paddles.forEach((paddle) => {
            var ball = this.balls.reduce((acc, ball, index) => {
                if (index == 0 || (Math.abs(acc.x - (paddle.x + paddle.width / 2)) > Math.abs(ball.x - (paddle.x + paddle.width / 2))))
                    acc = ball;
                return acc;
            }, {});
            if (paddle.isComputer && ball.paddleIndex != paddle.index) this.compPaddleYOffset = paddle.followBall(ball, this.compPaddleYOffset);
            if (paddle.canOscillate) paddle.oscillatePaddle(canvas);
        });
    }

    this.isCollision = function(ball, obj, isObjCanvas) {
        if (isObjCanvas) return this.detectCanvasCollision(ball, canvas) != 'x';
        else return this.detectBallCollision(ball, obj) != 'x';
    }

    this.detectBallCollision = function(ball, obj) {
        let objLeft = obj.x;
        let objRight = obj.x + obj.width;
        let objTop = obj.y;
        let objBottom = obj.y + obj.height;
        let objMinX = ball.x;
        let objMinY = ball.y;
        let side = 'x';

        let ballLeft = ball.x - ball.radius;
        let ballRight = ball.x + ball.radius;
        let ballTop = ball.y - ball.radius;
        let ballBottom = ball.y + ball.radius;

        let ballTopHit = (ball.x >= objLeft && ball.x <= objRight) && (objBottom >= ballTop && objBottom <= ballTop + Math.abs(ball.dy));
        let ballBottomHit = (ball.x >= objLeft && ball.x <= objRight) && (ballBottom >= objTop && ballBottom <= objTop + Math.abs(ball.dy));
        let ballLeftHit = (ball.y >= objTop && ball.y <= objBottom) && (objRight >= ballLeft && objRight <= ballLeft + Math.abs(ball.dx));
        let ballRightHit = (ball.y >= objTop && ball.y <= objBottom) && (ballRight >= objLeft && ballRight <= objLeft + Math.abs(ball.dx));

        if (ballTopHit) {
            return 't';
        }
        if (ballBottomHit) {
            return 'b';
        }
        if (ballLeftHit)
            return 'l';
        if (ballRightHit)
            return 'r';

        //corner cases
        if (ball.y <= objTop) {
            side = 't';
            objMinY = objTop;
        } else if (ball.y >= objBottom) {
            side = 'b';
            objMinY = objBottom;
        }
        if (ball.x <= objLeft) {
            side = 'l';
            objMinX = objLeft;
        } else if (ball.x >= objRight) {
            side = 'r';
            objMinX = objRight;
        }

        let xDist = ball.x - objMinX;
        let yDist = ball.y - objMinY;
        let dist = Math.sqrt(xDist * xDist + yDist * yDist);

        if (dist < ball.radius) {
            return side;
        }
        return 'x';
    }

    //Detects Ball and Canvas Collision
    this.detectCanvasCollision = function(ball, canvas) {
        let topBoundaryCollision = ball.y <= ball.radius;
        let bottomBoundaryCollision = ball.y + ball.radius >= ctx.canvas.height;
        let rightBoundaryCollision = ball.x <= ball.radius;
        let leftBoundaryCollision = ball.x + ball.radius >= ctx.canvas.width;

        if (topBoundaryCollision)
            return 't';
        if (bottomBoundaryCollision)
            return 'b';
        if (rightBoundaryCollision)
            return 'r';
        if (leftBoundaryCollision)
            return 'l';
        return 'x';
    }

    //Detects Ball and Bricks Collision
    this.detectBrickCollision = function(ball, bricks) {
        for (let i = 0; i < bricks.length; i++) {
            if (!bricks[i].isHit) {
                if (this.isCollision(ball, bricks[i], false)) {
                    bricks[i].isHit = true;
                    return true;
                }
            }
        }
        return false;
    }

    //Detects Ball and Paddles Collision
    this.detectPaddleCollision = function(ball, paddles) {
        for (let i = 0; i < paddles.length; i++) {
            let collision = this.detectBallCollision(ball, paddles[i]);
            if (collision != 'x') {
                this.compPaddleYOffset = undefined;
                //check if ball should pass
                if (paddles[i].isPassable) {
                    if (ball.paddleIndex == paddles[i].index)
                        continue;
                    else {
                        //swap color
                        let tempColor = paddles[i].color;
                        paddles[i].color = ball.color;
                        ball.color = tempColor;
                        //swap index
                        let tempIndex = paddles[i].index;
                        paddles[i].index = ball.paddleIndex;
                        ball.paddleIndex = tempIndex;
                    }
                } else {
                    ball.paddleIndex = paddles[i].index;
                }

                //reflect ball
                switch (collision) {
                    case 't':
                        ball.y = paddles[i].y + paddles[i].height + ball.radius;
                        ball.dy = -ball.dy;
                        break;
                    case 'b':
                        ball.y = paddles[i].y - ball.radius;
                        ball.dy = -ball.dy;
                        break;
                    case 'l':
                        //ball.x = paddles[i].x + paddles[i].width + ball.radius;
                        ball.dx = -ball.dx;
                        break;
                    case 'r':
                        //ball.x = paddles[i].x - ball.radius;
                        ball.dx = -ball.dx;
                        break;
                    default:
                        ball.dx = -ball.dx;
                        break;
                }

                //change ball color and y deflection if control paddles
                if (!paddles[i].isObstacle) {
                    ball.dy = (ball.y - paddles[i].y - paddles[i].height / 2) / paddles[i].height * 4;
                    ball.color = paddles[i].color
                }
            }
        }
    }

    //Contains Combined Object Collision Logics
    this.detectCollision = function(ball) {
        this.detectPaddleCollision(ball, this.paddles);
        //this.detectBrickCollision(this.ball, this.bricks);
        switch (this.detectCanvasCollision(ball, this.canvas)) {
            case 't':
            case 'b':
                ball.dy = -ball.dy;
                break;
            case 'r':
                return 2;
                break;
            case 'l':
                return 1;
                break;
            default:
                break;
        }
        return 0;
    }

    this.checkWin = function() {
        this.balls.forEach(ball => {
            switch (this.detectCollision(ball)) {
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
        });
    }
}