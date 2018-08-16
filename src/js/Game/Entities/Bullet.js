/**
 * TESTING CLASS
 */
class Bullet extends Entity{
	constructor(x, y, o = {}){
		super(x, y, o);
		
		this.w = 10;
		this.h = 10;
		this.master = o.master;
		
		this.endX = o.tx;
		this.endY = o.ty;
		this.startX = x;
		this.startY = y;
		
		this.sDistance = Math.sqrt(Math.pow(this.endX - x, 2) + Math.pow(this.endY - y,2));
		this.directionX = (this.endX - x) / this.sDistance;
		this.directionY = (this.endY - y) / this.sDistance;
		this.speed = o.speed || 0.5; // 50-pixels per second
	}
	update(elapsed){
		this.x += this.directionX * this.speed * elapsed;
		this.y += this.directionY * this.speed * elapsed;
		
		if (this.x <= 0 || this.y <= 0 || this.x >= cv.width || this.y >= cv.height){
			this.end();
		}
	}
	collide(other){
		s.cg.kill(this);
	}
}