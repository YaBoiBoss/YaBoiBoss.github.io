
const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight-10;

var ctx = canvas.getContext("2d");


var balls = []
var start = 0;
var mouseX = 0;
var mouseY = 0;

var ballAngle = 0;

canvas.onmousedown = function(){start = 1;}
canvas.onmousemove = function(){ mouseX = event.clientX; mouseY = event.clientY;};
canvas.onmouseup = function(){start = 0;}
ctx.fillStyle = "white";


function addBalls(x,y,r){
	balls.push([x,y,Math.random()*10,x+Math.random()*400-200,Math.random()*-10,false,200,1,Math.random()*100+155,Math.random()*100+155,Math.random()*100+155]);
	if(r>0){
		balls[balls.length-1][2] = r;
		balls[balls.length-1][4] = -20;
	}
}

function move(){
	if(start==1){
		addBalls(mouseX,mouseY,0);
	}
	requestAnimationFrame(move);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	ctx.beginPath();
	ctx.fillStyle = "rgb(255,255,255,1)";
	ctx.arc(window.innerWidth/2-55+Math.sin(ballAngle)*50,window.innerHeight/2-35+Math.cos(ballAngle)*50,10,0,2*Math.PI,false);
	addBalls(window.innerWidth/2-55+Math.sin(ballAngle)*50,window.innerHeight/2-35+Math.cos(ballAngle)*50,0);
	ballAngle+=0.1;
	if(ballAngle >=2*Math.PI){ballAngle = 0;}
	ctx.fill();
	ctx.font = "100px Arial";
	ctx.fillStyle = "rgb(255,255,255,1)";
	ctx.fillText("MELO IS GAE",window.innerWidth/2-300,window.innerHeight/2);
	for(var i=0;i<balls.length;i++){
	ctx.beginPath();
	var num = balls[i][7]; 
	ctx.fillStyle = "rgba("+balls[i][8].toString()+","+balls[i][9].toString()+", "+balls[i][9].toString()+","+num.toString()+")";
	ctx.arc(balls[i][0],balls[i][1],balls[i][2],0,Math.PI*2,false);
	if(balls[i][0] != balls[i][3]){
		if(balls[i][0]>balls[i][3]){
			balls[i][0] = balls[i][0]-(balls[i][3]/1000+(balls[i][6])/500)
		}else{
			balls[i][0] = balls[i][0]+balls[i][3]/1000
		}
	}
	if (balls[i][5] == true){
	balls[i][1] = balls[i][1]+balls[i][4]
	if(balls[i][1] + balls[i][4] + 1 >! window.innerHeight){
	balls[i][4] = balls[i][4] + 1;}else{
	balls[i][4] = balls[i][4] + 1 - window.innerHeight;	
	}
	}else{
	balls[i][5] = true;	
	}
	if(balls[i][1] >= window.innerHeight-balls[i][2]){
		if(balls[i][4]< 2){ balls[i][4] = 0 }else{
		balls[i][4] = -Math.abs(balls[i][4]/2)
		balls[i][2] = balls[i][2]/2;
		balls[i][7] = 1;
		addBalls(balls[i][0],balls[i][1],balls[i][2]);
		}
	}
	if(balls[i][7] > 0){
		balls[i][7] = balls[i][7]-0.01;
	}
	balls[i][6] = balls[i][6]-1;
	if (balls[i][6] <= 0 ){
		balls.splice(i,1);
	}
	ctx.fill();
	}
}

move();

console.log("test");