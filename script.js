var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const FPS = 20;
var angle = 0;
var player = new Image();
player.src = "assets/ship_1.png";
var playerPosX = 180;
var playerPosY = 250;
var playerSpeed = 3;
var isPlayerMovingLeft = false;
var isPlayerMovingRight = false;
var isPlayerMovingUp = false;
var isPlayerMovingDown = false;
var shotPosX = 50;
var shotPosY = 200;
var shotSpeed = 5;
var enemyPosX = [20, 30, 95, 50, 200, 300, 225, 400, 320, 250];
var enemyPosY = [100, 80, 20, 40, 40, 33, 27, 120, 52, 114];
var enemyShip1 = new Image();
enemyShip1.src = "assets/enemyship.png";
var enemySpeed = -1;
var background = new Image();
background.src = "assets/space.jpg";
var backgroundSpeed = 1;
var backgroundPosY1 = 0;
var backgroundPosY2 = 300;
var score = 0;
var enemyShots = [];
var enemyShotTimer = 5;

document.addEventListener("keydown", function(event){
	if(event.keyCode == 37){
		isPlayerMovingLeft = true;
	}
	if(event.keyCode == 39){
		isPlayerMovingRight = true;
	}
	if(event.keyCode == 38){
		isPlayerMovingUp = true;
	}
	if(event.keyCode == 40){
		isPlayerMovingDown = true;
	}
});

document.addEventListener("keyup", function(event){
	if(event.keyCode == 37){
		isPlayerMovingLeft = false;
	}
	if(event.keyCode == 39){
		isPlayerMovingRight = false;
	}
	if(event.keyCode == 38){
		isPlayerMovingUp = false;
	}
	if(event.keyCode == 40){
		isPlayerMovingDown = false;
	}
});

document.addEventListener("keypress", function(event){
	if(event.keyCode == 32 && shotPosY < -2.5){
		shotPosX = playerPosX + 20;
		shotPosY = playerPosY;
	}
});

function DrawClock(){
	angle += 0.1;
	ctx.beginPath();
	ctx.fillStyle = "purple";
	ctx.arc(200, 150, 30, 0, 2 * Math.PI);
	ctx.fill();

	ctx.strokeStyle = "orange";
	ctx.moveTo(200, 150);
	ctx.lineTo(200 + Math.cos(angle) * 50, 150 + Math.sin(angle) * 50);
	ctx.stroke();
}

function DrawEnemyShots(){
	enemyShotTimer -= FPS / 1000;
	if(enemyShotTimer <= 0){
		enemyShotTimer = Math.random() * 4 + 1;
		enemyShots[enemyShots.length] = new EnemyShot(Math.random() * 400, 0);
	}
	if(enemyShots.length > 0){
		for(i=0; i < enemyShots.length; i++){
			enemyShots[i].move();
			enemyShots[i].outScreenTest(canvas.height);
			ctx.beginPath();
			ctx.fillStyle = enemyShots[i].color;
			ctx.arc(
				enemyShots[i].posX, 
				enemyShots[i].posY,
				enemyShots[i].radius,
				0,
				2 * Math.PI
			);
			ctx.fill();
		}
	}
}

function DrawShot(){
	shotPosY -= shotSpeed;
	ctx.fillStyle = "red";
	ctx.beginPath();
	ctx.arc(shotPosX, shotPosY, 5, 0, 2 * Math.PI);
	ctx.fill();
}

function RespawnEnemy(indice){
	enemyPosX[indice] = 400 + Math.random() * 150;
	enemyPosY[indice] = Math.random() * 100;
	shotPosY = -100;
}

function DrawEnemies(){
	for(i=0; i<10; i++){
		enemyPosX[i] += enemySpeed;
		if(enemyPosX[i] < -60)
			RespawnEnemy(i);
		var d = Math.sqrt(Math.pow(enemyPosX[i]-shotPosX + 30, 2) + Math.pow(enemyPosY[i]-shotPosY+20, 2));
		if(d < 30){
			RespawnEnemy(i);
			score += 1;
		}
		ctx.drawImage(enemyShip1, enemyPosX[i], enemyPosY[i], 60, 40);
	}
}

function DrawBackground(){
	//backgroundPosY1 += backgroundSpeed;
	if(backgroundPosY1 > 300)
		backgroundPosY1 -= 600;
	//backgroundPosY2 += backgroundSpeed;
	if(backgroundPosY2 > 300)
		backgroundPosY2 -= 600;
	ctx.drawImage(background, 0, backgroundPosY1, 400, 300);
	ctx.drawImage(background, 0, backgroundPosY2, 400, 300);
}

function DrawUI(){
	ctx.font = "30px Comic Sans";
	ctx.fillStyle = "yellow";
	// escreve a pontuação do player:
	ctx.fillText("Score: ".concat(score), 10, 30);
}

function Draw(){
	ctx.clearRect(0, 0, 400, 300); //apaga o canvas todo
	DrawBackground();

	if(isPlayerMovingLeft && playerPosX >= 0){
		playerPosX -= playerSpeed;
	}
	if(isPlayerMovingRight && playerPosX <= 360){
		playerPosX += playerSpeed;
	}
	if(isPlayerMovingUp && playerPosY >= 150){
		playerPosY -= playerSpeed;
	}
	if(isPlayerMovingDown && playerPosY <= 250){
		playerPosY += playerSpeed;
	}
	ctx.drawImage(player, playerPosX, playerPosY, 40, 40);
	DrawShot();
	DrawEnemies();
	DrawEnemyShots();
	DrawUI();
}

setInterval(Draw, FPS);