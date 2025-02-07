class DirectionInput {
    constructor() {
        this.heldDirections = [];

        this.directionKeyCodes = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }
    get direction() {
        return this.heldDirections[0];
    }
    init() {
        // Prevent 2 keys from being pressed at the same time
        document.addEventListener("keydown", e => {
            const dir = this.directionKeyCodes[e.code];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        });
        document.addEventListener("keyup", e => {
            const dir = this.directionKeyCodes[e.code];
            const index = this.heldDirections.indexOf(dir);
            if (index > -1) {
                this.heldDirections.splice(index, 1);
            }
         });
    }
}