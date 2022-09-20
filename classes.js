class EnemyShot {
	constructor(x, y){
		this.radius = 5;
		this.color = "green";
		this.speed = 2;
		this.posX = x;
		this.posY = y;
	}
	move(){
		this.posY += this.speed;
	}
	hitTest(playerPosX, playerPosY){
		let distance = Math.sqrt(Math.pow(this.posX - playerPosX, 2) + Math.pow(this.posY - playerPosY, 2));
		if(distance < 30)
			return true;
		else
			return false;
	}
	outScreenTest(canvasHeight){
		if(this.posY > canvasHeight)
			return true;
		else
			return false;
	}
}