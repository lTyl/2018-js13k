/**
 * Extend this function for different game states
 * @constructor
 */
class Game {
	constructor(){
		this.e = [];
	}
	/**
	 * Called once every 16ms~. Invokes the update() and draw() methods on all game objects
	 */
	run(){
		// Clear the canvas element.
		ctx.clearRect(0, 0, cv.width, cv.height);
		// Call child update
		this.update();
		// Update all entities
		this.e.forEach((e) => e.update(16));
		this.e.forEach((e) => e.draw(ctx));
		// Call child draw
		this.draw();
	};
	
	/**
	 * Stubbed out update method so child game states can hook into the main game loop.
	 *
	 * Saves us a super.run() call if we do it in run...
	 */
	update(){};
	/**
	 * Stubbed out draw method so child game states can hook into the drawing loop
	 */
	draw(){};
	/**
	 * Destroys all entities and cleans up references.
	 */
	end(){
		this.e.forEach((e) => e.end());
		this.e = null;
	};
	/**
	 * Adds a new GameObject to the game world
	 * @param type The type of gameobject to add
	 * @param x The X position of the game object
	 * @param y The Y position of the game object
	 * @param o The options for the game object
	 * @param n The name of the new entity
	 */
	add(type, x, y, o){
		o = o || {};
		this.e.push(new type(x, y, o));
	};
	/**
	 * Used to destroy a game object from the world.
	 * @param e The entity to destroy
	 */
	kill(e) {
		this.e.erase(e);
	};
	/**
	 * Returns the Entity that matches the name {n}
	 * @param n The name of the entity to get.
	 */
	getE(n){
		return this.e[Object.keys(this.e).find(key => this.e[key].n === n)];
	}
}