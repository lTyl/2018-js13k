class Enemy extends Entity{
	constructor(x, y, o){
		super(x, y, o);
		
		this.target = o.target;
		this.c = "red";
		this._updateMove();
		// Update enemy movement
		this.c1 = setInterval(() => this._updateMove(), 3000);
		// Make enemy shoot
		this.c2 = setInterval(() => {
			s.cg.add(Bullet, this.x, this.y, {tx: this.target.x, ty: this.target.y, c: "#ff0000", master: this});
		}, 1000);
	}
	update(elapsed) {
		/**
		 * Apply enemy AI logic
		 */
		this.x += this.directionX * this.speed * elapsed;
		this.y += this.directionY * this.speed * elapsed;
	}
	_updateMove(){
		this.target = this.target || {x:0, y:0};
		this.endX = this.target.x;
		this.endY = this.target.y;
		
		this.sDistance = Math.sqrt(Math.pow(this.endX - this.x, 2) + Math.pow(this.endY - this.y,2));
		this.directionX = (this.endX - this.x) / this.sDistance;
		this.directionY = (this.endY - this.y) / this.sDistance;
		this.speed = 0.10; // 10-pixels per second
	}
	collide(other){
		s.cg.kill(this);
		clearInterval(this.c1);
		clearInterval(this.c2);
		s.cg.thingsKilled++;
		console.log("THINGS KILLED:", s.cg.thingsKilled);
	}
}