function Ball(x, y, r, dx = 3, dy = 0, speed = 3) {
    //ball parameters
    this.x = x;
    this.y = y;
    this.radius = r;
    this.dx = dx;
    this.dy = dy;
    this.speed = speed;
    this.color = "#555";
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
        this.dx = Math.sign(this.dx) * Math.sqrt(this.speed * this.speed - this.dy * this.dy);
    }
}