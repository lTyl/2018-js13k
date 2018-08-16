/**
 * Create some globals because we're terrible people
 */
let cv = document.getElementById('g'); // Canvas reference
let ctx = cv.getContext('2d'); // Drawing context
/**
 * erase method on array for easier entity management
 * @param item
 * @returns {Array}
 */
Array.prototype.erase = function(item) {
	for(let i = this.length; i--;) {
		if( this[i] === item ) {
			this.splice(i, 1);
		}
	}
	return this;
};
/**
 * The System initializes our engine and manages our game state.
 * @param game Function for our Game state
 * @constructor
 */
class System{
	constructor(game){
		this.cg = 0;
		this.ci = 0;
		this._now(game);
	}
	/**
	 * Private method for creating a new setInterval
	 * @param game
	 */
	_now(game){
		this.cg = new game();
		this.ci = setInterval(() => this.cg.run(), 16);
	}
	/**
	 * Public method for setting the current game instance
	 * @param game
	 */
	setGame(game){
		this.cg.end();
		clearInterval(this.ci);
		this._now(game);
	};
}