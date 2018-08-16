/**
 *
 */
class Player extends Entity{
	constructor(x, y, o){
		super(x, y, o);
		this.c = "lime";
		this.canShoot = 1;
		
		this.c1 = setInterval(() => this.canShoot = 1, 200);
	}
	update() {
		/**
		 * Player input
		 */
		if (u) this.y -= 10;
		if (d) this.y += 10;
		if (l) this.x -= 10;
		if (r) this.x += 10;
		if (a && this.canShoot) {
			s.cg.add(Bullet, this.x, this.y, {tx: cv.width / 2, ty: cv.height / 2, speed: 0.5, master: this});
			this.canShoot = 0;
		}
	}
	collide(other){
		s.cg.kill(this);
		clearInterval(this.c1);
		alert("YOU DEAD!");
	}
}