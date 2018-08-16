class StartState extends Game{
	constructor(){
		super();
		
		this.thingsKilled = 0;
		this._lastKilled = 0;
		this.currentDifficulty = 3000;
		
		this.add(Player, 0, 0, {n: 'p', w: 100, h: 100});
		this.add(Text, 0, 20, {size: 12, text: "You can only shoot towards the middle!"});
		
		this.clear = setInterval(() => this._spawnEnemy(), this.currentDifficulty);
		
		setInterval(() => {
			if (this.thingsKilled <= 0 || this._lastKilled % 10 && this.thingsKilled !== this._lastKilled) return;
			let difficulty = this.thingsKilled % 10;
			if (difficulty === 0 && this.currentDifficulty >= 500){
				this.currentDifficulty -= 500;
				console.log("INCREASING DIFFICULTY!", this.currentDifficulty);
				clearInterval(this.clear);
				this.clear = setInterval(() => this._spawnEnemy(), this.currentDifficulty);
			}
		}, 5000);
	}
	
	update(){
		this.e.forEach((e1) => {
			if (!e1.hasCollision) return;
			this.e.forEach((e2) => {
				
				if (e2 === e1 || !e2.hasCollision || (e1 instanceof Bullet && e2 instanceof Bullet)) return
				if (e2 instanceof Bullet && e2.master === e1 || e1 instanceof Bullet && e1.master === e2) return
				if (this._check(e1, e2)){
					e1.collide(e2);
					e2.collide(e1);
				}
			})
		})
	}
	
	_check(first, second){
		return first.x + first.w > second.x && first.x < second.x + second.w && first.y + first.h > second.y && first.y < second.y + second.h;
	}
	
	_spawnEnemy(){
		// The side of the screen the enemy will spawn from
		let side = this.getRandomArbitrary(1, 4);
		let x, y;
		if (side === 1){ // Left side
			x = -5;
			y = this.getRandomArbitrary(-5, cv.height);
		} else if (side === 2) {
			x = this.getRandomArbitrary(-5, cv.width);
			y = -5;
		} else if (side === 3){
			x = cv.width + 5;
			y = this.getRandomArbitrary(-5, cv.height);
		} else{
			x = this.getRandomArbitrary(-5, cv.width);
			y = cv.height + 5;
		}
		this.add(Enemy, x, y, {w: 50, h: 50, target: this.getE('p')});
	}
	
	getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
}
cv.width = window.innerWidth;
cv.height = window.innerHeight;
let s = new System(StartState); // System instance