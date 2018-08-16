class Entity{
	constructor(x, y, o = {}){
		this.hasCollision = 1;
		o = o || {};
		// X coordinate of this entity
		this.x = x;
		// Y coordinate of this entity
		this.y = y;
		// Width of this entity
		this.w = o.w || 1;
		// Height of this entity
		this.h = o.h || 1;
		// Options object for this entity
		this.o = o;
		// The name of this entity
		this.n = o.n;
		// The color (Testing mainly)
		this.c = o.c || "#000000";
	}
	collide(other){
	
	}
	draw(cx){
		ctx.fillStyle = this.c;
		ctx.fillRect(this.x, this.y, this.w, this.h);
	};
	update(){};
	end(){
		s.cg.kill(this);
	};
}