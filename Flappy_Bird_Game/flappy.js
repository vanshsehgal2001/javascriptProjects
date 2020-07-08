//DEFINING AREA TO BE NEEDED

var canvas=document.getElementById("canvas")
var req=canvas.getContext("2d")

//IMPORTING IMAGES(DECLARING VARIABLES FOR IMAGES THAT ARE REQUIRED)


var bird=new Image();
var upPipe=new Image();
var belowPipe=new Image();
var ground=new Image();
var background=new Image();

var gap=320
var extra=upPipe.height+gap;

var birdX=10;
var birdY=180

var score=0;
var maxScore=0
var gravity=1;

//ADD EVENT LISTENERS

document.addEventListener('keydown',movement)

function movement(e){
	if(e.keyCode=== 38){
		birdY-=30;
	}
	else if(e.keyCode===40){
		birdY+=20
	}
}

var pipe=[]

pipe[0]={
	x:canvas.width,
	y:0
}

bird.src="images/bird1.png"
upPipe.src="images/upPipe.png"
belowPipe.src="images/belowPipe.png"
ground.src="images/ground.png"
background.src="images/bg.png"


window.onload=function(){
	req.drawImage(background,0,0)
	
	for(var i=0;i<pipe.length;i++){
		req.drawImage(upPipe,pipe[i].x,pipe[i].y)
		req.drawImage(belowPipe,pipe[i].x,pipe[i].y+extra)

		pipe[i].x-=2;

		if(pipe[i].x===50){
			pipe.push({
				x:canvas.width,
				y:Math.floor(Math.random()*upPipe.height)-upPipe.height
			});
		}

		if(birdX+bird.width >= pipe[i].x && birdX <= pipe[i].x + upPipe.width && (birdY<=pipe[i].y + upPipe.height || birdY+bird.height >= pipe[i].y+extra) ||  birdY+bird.height>=canvas.height-ground.height){
			location.reload();
		}
		if(pipe[i].x===30){
			score+=10;
		}
	}

	req.drawImage(ground,0,canvas.height-ground.height)
	req.drawImage(bird,birdX,birdY);

	birdY+=gravity;

	req.fillStyle="black"
	req.font="30px Arial"
	req.fillText("Score: " + score,10,canvas.height-20)

	requestAnimationFrame(onload)
}
