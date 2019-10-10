function Ball(x, y, r, dx = 3, dy = 0, xdirection = 1, ydirection = 1) {
    //ball parameters
    this.x = x;
    this.y = y;
    this.radius = r;
    this.dx = dx * xdirection;
    this.dy = dy * ydirection;
    this.dSpeed = 3.5;
    this.color = "#444";
    this.paddleIndex = -1;

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    this.moveBall = function() {
        this.updateDifflection();
        this.x += this.dx;
        this.y += this.dy;
    }

    this.updateDifflection = function() {
        this.dx = Math.sign(this.dx) * Math.sqrt(this.dSpeed * this.dSpeed - this.dy * this.dy);
    }
}