const canvas = document.getElementById("canvassss");
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const drawBall = function(radius, x, y) {
    c.fillStyle = "#99FF33";
    c.beginPath();
    c.arc(x, y, radius, 0,2*Math.PI);
    c.fill();
};


const rand = function(num, leftOrUpperBound , rightOrLowerBound) {
	const result = Math.floor(Math.random() * num);
        if(!(result >= leftOrUpperBound && result <= rightOrLowerBound)){
            
            rand(num, leftOrUpperBound , rightOrLowerBound);
            
        } 
        
        return result;
};

const rand2 = function(num) {
	return Math.floor(Math.random() * num) + 1;
};

const sgn = [0, -1, 1];


let count1 = 0;
let count2 = 0;

const ball = {
    move: true,
    r: 10,
    x: rand(window.innerWidth, window.innerWidth/4, 3 * window.innerWidth/4),
    y: rand(window.innerHeight, 20, window.innerHeight - 20),
    xd: sgn[rand2(2)] * 4,
    yd: sgn[rand2(2)] * rand2(10)
    
};

const player1 = {
    x: 0,
    y: window.innerHeight/2,
    move: 50,
    width: 10,
    height: 100,
    color: "#DC00FF"
    
};

const player2 = {
    x: window.innerWidth - 10,
    y: window.innerHeight/2,
    move: 50,
    width: 10,
    height: 100,
    color: "#0012FF"
};

const counter = function() {
    
    const writeCount = function() {
    
        c.fillStyle = "#00E6F0";
        c.fillText(count1, window.innerWidth/4, 50);
        c.fillText(count2, 3 * window.innerWidth/4, 50);
    
    };
    
    if(ball.x + ball.r < 0) {
        
        count2 ++;
        
        ball.x = player1.x + player1.width + 2 * ball.r;
        
        ball.y = player1.y + player1.height/2;
        
        ball.xd = 7;
        
        ball.yd = sgn[rand2(2)] * rand2(10);
        
    } else if(ball.x - ball.r > window.innerWidth) {
        
        count1 ++;
      
        ball.x = player2.x - 2 * ball.r;
        
        ball.y = player2.y + player2.height/2;
        
        ball.xd = -7;
        
        ball.yd = sgn[rand2(2)] * rand2(10);
        
    };
    
    writeCount();
    
};

const findWinner = function() {
    
    c.font = "60px Arial";
    
    
    if(count1 === 10) {
        
        c.fillStyle = player1.color;
        
        c.fillText("<---- THIS GUY WON!!", window.innerWidth/4, 
        window.innerHeight/2);
        
        c.fillStyle = "#00FF00";
        
        c.fillText("Press SPACE to Play Again", window.innerWidth/4, 
        window.innerHeight/2 + 70);
        
        ball.move = false;
        
        ball.xd = ball.yd = 0;
        
    };
    
    if(count2 === 10) {
        
        c.fillStyle = player2.color;
        
        c.fillText("THIS GUY WON!! ---->", window.innerWidth/4, 
        window.innerHeight/2);
        
        c.fillStyle = "#00FF00";
        
        c.fillText("Press SPACE to Play Again", window.innerWidth/4, 
        window.innerHeight/2 + 70);
        
        ball.move = false;
        
        ball.xd = ball.yd = 0;
        
    };
    
}; 


/////////^SUPPLY^///////////


const update = function() {
    
    c.fillStyle = "black";
    c.strokeStyle = "white";
    c.fillRect(0, 0, window.innerWidth, window.innerHeight);
    c.beginPath();
    c.setLineDash([10, 15]);
    c.moveTo(window.innerWidth/2, 0);
    c.lineTo(window.innerWidth/2, window.innerHeight);
    c.stroke();
    c.fillStyle = "#DC00FF";
    c.fillRect(player1.x, player1.y, player1.width, player1.height);
    c.fillStyle = "#0012FF";
    c.fillRect(player2.x, player2.y, player2.width, player2.height);
    ball.x += ball.xd;
    ball.y += ball.yd;
    if(ball.y - ball.r < 0 || ball.y + ball.r > window.innerHeight ) {
        
      ball.yd = -ball.yd;
        
    };
    
    if((ball.x - ball.r <= player1.width 
            && ball.y - ball.r >= player1.y
            && ball.y + ball.r <= player1.y + player1.height) 
            || (ball.x + ball.r >= player2.x - player2.width 
            && ball.y + ball.r <= player2.y + player2.height 
            && ball.y - ball.r >= player2.y)) {
        
        ball.xd = -ball.xd;
        
    };
    
    drawBall(ball.r, ball.x, ball.y);
    
};



const w = 87;
const upKey = 38;
const s = 83;
const downKey = 40;
const space = 32;

document.addEventListener('keydown', function(event) {
    
	if(event.keyCode === upKey) {
            
            player2.y -= player2.move;
            
            if(player2.y < 0) {
                
                player2.y = 0;
                
            }
  	};
        
        if(event.keyCode === w) {
            
            player1.y -= player1.move;
            if(player1.y < 0) {
                
                player1.y = 0;
                
            }
        };
        
        if(event.keyCode === s) {
            
            player1.y += player1.move;
            
            if(player1.y > window.innerHeight - player1.height) {
                
                player1.y = window.innerHeight - player1.height;
                
            }
            
        };
        
        if(event.keyCode === downKey) {
            
            player2.y += player2.move;
            
            if(player2.y > window.innerHeight - player2.height) {
                
                player2.y = window.innerHeight - player2.height;
                
            }
            
        };
        
        if(event.keyCode === space && !ball.move) {
            
            location.reload();
            
        } else if(event.keyCode === space && ball.move) {
            
            ball.move = false;
        
            ball.xd = ball.yd = 0;
            
        };
       
}, false);



const gameLoop = function() {
    
    update();
    counter();
    findWinner();
    requestAnimationFrame(gameLoop);
    
};

gameLoop();