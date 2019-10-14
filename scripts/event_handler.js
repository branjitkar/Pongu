function EventHandler(interact) {
    this.interact = interact;

    this.keyDownHandler = function(e) {
        if (e.code == "Right" || e.code == "ArrowRight") {
            this.interact.rightPressed = true;
        } else if (e.code == "Left" || e.code == "ArrowLeft") {
            this.interact.leftPressed = true;
        } else if (e.code == "Up" || e.code == "ArrowUp") {
            this.interact.upPressed = true;
        } else if (e.code == "Down" || e.code == "ArrowDown") {
            this.interact.downPressed = true;
        } else if (e.code == "KeyW") {
            this.interact.wPressed = true;
        } else if (e.code == "KeyX") {
            this.interact.xPressed = true;
        } else if (e.code == "Space") {
            this.interact.gameStart = !this.interact.gameStart;
        }
    }

    this.keyUpHandler = function(e) {
        if (e.code == "Right" || e.code == "ArrowRight") {
            this.interact.rightPressed = false;
        } else if (e.code == "Left" || e.code == "ArrowLeft") {
            this.interact.leftPressed = false;
        } else if (e.code == "Up" || e.code == "ArrowUp") {
            this.interact.upPressed = false;
        } else if (e.code == "Down" || e.code == "ArrowDown") {
            this.interact.downPressed = false;
        } else if (e.code == "KeyW") {
            this.interact.wPressed = false;
        } else if (e.code == "KeyX") {
            this.interact.xPressed = false;
        } else if (e.code == "Space") {}
    }

    this.mouseHandler = function(e) {
        this.interact.mouseX = e.clientX - canvas.offsetLeft;
        this.interact.mouseY = e.clientY - canvas.offsetTop;
    }

    this.mouseClickHandler = function(e) {
        this.interact.gameStart = !this.interact.gameStart;
    }
}