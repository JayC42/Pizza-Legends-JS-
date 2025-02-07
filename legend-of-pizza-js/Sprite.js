class Sprite {
    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Shadow
        this.shadow = new Image();
        this.useShadow = true; //config.useShadow || false
        if (this.useShadow) {
            this.shadow.src = "/images/characters/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true; 
        }

        // Configure Animation & Intitial State
        this.animations = config.animations || { 
            'idle-down': [ [0,0] ],
            'idle-right': [ [0,1] ],
            'idle-up': [ [0,2] ],
            'idle-left': [ [0,3] ],
            'walk-down': [ [1,0], [0,0], [3,0], [0,0] ],
            'walk-right': [ [1,1], [0,1], [3,1], [0,1] ],
            'walk-up': [ [1,2], [0,2], [3,2], [0,2] ],
            'walk-left': [ [1,3], [0,3], [3,3], [0,3] ],
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        // How many game loop frames to show in spritesheet
        this.animationFrameLimit = config.animationFrameLimit || 12;
        this.animationFrameProgress = this.animationFrameLimit;

        // Reference the game object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }
    updateAnimationProgress() {
        // Downtick frame progress
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }
        // Reset the counter
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        // Halt if frame out of bounds
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx) {
        const x = this.gameObject.x - 8; 
        const y = this.gameObject.y - 18;
        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);    // drawn at floor level

        const [frameX, frameY] = this.frame;    

        this.isLoaded && ctx.drawImage(this.image, // drawn at a higher level than shadow
            // sprite configs
            frameX * 32, frameY * 32,    // left and top cut 
            32,32, //width and height of cut
            x,y, 
            32,32
        )

        this.updateAnimationProgress();
    }

}