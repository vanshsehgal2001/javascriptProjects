window.onload=function(){
	var canv=document.getElementById('canvas')
	var c=canv.getContext("2d")

	var width=canv.width
	var height=canv.height

	var snakeW=15
	var snakeH=15


	var score=0;

	function drawSnake(x,y){

		c.fillStyle='white'
		c.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)

		c.fillStyle="black"
		c.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
	}

	var len=4;
	var snake=[]

	for(var i=len-1;i>=0;i--){
		snake.push(
		{
			x:i,
			y:0	
		});
	}

	food={
		x:Math.round(Math.random()*(width/snakeW -4) +1),
		y:Math.round(Math.random()*(height/snakeH -4) +1)
	}

	function drawFood(x,y){
		c.fillStyle='yellow'
		c.fillRect(x*snakeW,y*snakeH,snakeW,snakeH)

		c.fillStyle="yellow"
		c.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH)
	}

	var direction="right";

	document.addEventListener("keydown",addDirection)

	function addDirection(e){
		if(e.keyCode === 37 && direction!="right"){
			direction="left";
		}
		else if(e.keyCode===38 && direction!="up"){
			direction="down";
		}
		else if(e.keyCode===39 && direction!="left"){
			direction="right";
		}
		else if(e.keyCode===40 && direction!="down"){
			direction="up"
		}
	}

	function collisionCheck(x,y,snake){
		for(var i=0;i<snake.length;i++){
			if(x === snake[i].x && y === snake[i].y){
				return true;
			}
		}
		return false;
	}

	
	function drawScore(score){
		c.fillStyle="yellow"
		c.font="20px Verdana"
		c.fillText("Score: " + score , 5 , height-5)
	}



	function draw(){
		c.clearRect(0,0,width,height)
		for(var i=0;i<snake.length;i++){
			var x=snake[i].x;
			var y=snake[i].y;
			drawSnake(x,y);
		}

		drawFood(food.x,food.y)

		var headX=snake[0].x;
		var headY=snake[0].y;


		if(direction==="right"){
			headX++;
		}else if(direction==="left"){
			headX--;
		}else if(direction==="up"){
			headY++;
		}else if(direction==="down"){
			headY--;
		}

		if(headX < 0 || headY < 0 || headX >= width/snakeW || headY >= height/snakeH || collisionCheck(headX,headY,snake)){
			location.reload()
		}

		if(headX === food.x && headY === food.y){
			food={
				x:Math.round(Math.random()*(width/snakeW -4) +1),
				y:Math.round(Math.random()*(height/snakeH -4) +1)
			}
			var newHead={
				x:headX,
				y:headY
			}			
			score+=10;
		}
		else{
			snake.pop()
			var newHead={
				x:headX,
				y:headY
			}
		}

		snake.unshift(newHead)
		drawScore(score)
	}
	setInterval(draw,60);
}



















