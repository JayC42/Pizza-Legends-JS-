class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
 }
 startGameLoop() {
   const step = () => {

    // clear off cavnas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Establish the camera person 
    const cameraPerson = this.map.gameObjects.hero;

    // Update all objects
    Object.values(this.map.gameObjects).forEach(object => {
      object.update({
        arrow: this.directionInput.direction,
        map: this.map,
        }); 
      })

    // Draw Lower layer
    this.map.drawLowerImage(this.ctx, cameraPerson);

    // Draw game objects
    Object.values(this.map.gameObjects).forEach(object => {
      object.sprite.draw(this.ctx, cameraPerson);
    })

    // Draw Higher layer
    this.map.drawUpperImage(this.ctx, cameraPerson);

    requestAnimationFrame(() => {
      step();
    })
  }
  step();
}
 init() {
  this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
  console.log(this.map.walls);

  this.directionInput = new DirectionInput();
  this.directionInput.init();
  //this.directionInput.direction;
  this.startGameLoop();
 }
//   const image = new Image();
//   image.onload = () => {
//     this.ctx.drawImage(image,0,0)
//   };
//   image.src = "/images/maps/DemoLower.png";


//    // Place some Game Objects! 
//    const hero = new GameObject({
//     x: 5, 
//     y: 6,
//    })
//    const npc1 = new GameObject({
//     x: 7, 
//     y: 9,
//     src: "/images/characters/people/npc1.png"
//    })
   
//    setTimeout(() => { 
//     hero.sprite.draw(this.ctx);
//     npc1.sprite.draw(this.ctx);
//    }, 1000)
//  }

}

