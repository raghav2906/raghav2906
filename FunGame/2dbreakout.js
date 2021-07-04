const cvs = document.getElementById("breakout");
const ctx = cvs.getContext("2d");
cvs.style.border= " 1px solid #0ff";



ctx.lineWidth = 3;

const PADDLE_WIDTH=100;
const PADDLE_HEIGHT=20;
const PADDLE_MARGIN_BOTTOM=50;
const BALL_RADIUS = 8;
let LIFE=3;
let SCORE =0 ;
const SCORE_UNIT=10;
let LEVEL=1;

const MAX_LEVEL=3;
let GAME_OVER=false;


let leftArrow= false;
let rightArrow = false;

//CREAT PADDLE

const paddle={
    x:cvs.width/2 - PADDLE_WIDTH/2,
    y:cvs.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx : 5
}

//DRAW PADDLE

function drawPaddle(){

    ctx.fillStyle="#2e3548";
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);

    ctx.strokeStyle="#ffcd05";
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

// CONTROL THE PADDLE
document.getElementById("left").addEventListener("mousedown",function(){
    leftArrow=true;
});
document.getElementById("left").addEventListener("mouseup",function(){
    leftArrow=false;
});
document.getElementById("right").addEventListener("mousedown",function(){
    rightArrow=true;
});
document.getElementById("right").addEventListener("mouseup",function(){
    rightArrow=false;
});
document.addEventListener("keydown",function(event){
    if(event.keyCode == 37)
    {
        leftArrow=true;
    }
    else if(event.keyCode == 39){
        rightArrow=true;
    }
});
document.addEventListener("keyup",function(event){
    if(event.keyCode == 37)
    {
        leftArrow=false;
    }
    else if(event.keyCode == 39){
        rightArrow=false;
    }
});

// MOVE PADDLE

function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width)
    {
            paddle.x += paddle.dx;
    }
    else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// CREATE BALL

const ball={
    x : cvs.width/2,
    y : paddle.y - BALL_RADIUS,
    radius : BALL_RADIUS,
    speed : 4,
    dx : 3*(Math.random()*2 -1),
    dy : -3
}

//DRAW BALL

function drawBall(){
    ctx.beginPath();

    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="#ffcd05";
    ctx.fill();

    ctx.strokeStyle="#2e3548";
    ctx.stroke();

    ctx.closePath();
}

//MOVE THE BALL

function moveBall()
{
    ball.x += ball.dx;
    ball.y += ball.dy;
}

//BALL AND WALL COLLISION

function ballWallCollision(){
    if(ball.x + ball.radius > cvs.width || ball.x -ball.radius <0){
        ball.dx = -ball.dx;
        WALL_HIT.play();
    }
    if(ball.y - ball.radius <0){
        ball.dy = -ball.dy;
        WALL_HIT.play();
    }
    if(ball.y + ball.radius > cvs.height){
        LIFE--;
        LIFE_LOST.play();
        resetBall();
    }
}

//RESET THE BALL
function resetBall(){
    ball.x=cvs.width/2;
    ball.y=paddle.y-BALL_RADIUS;
    ball.dx= 3*(Math.random()*2 -1);
    ball.dy=-3;
}

//BAL AND PADDLE COLLISION

function ballPaddleCollision(){
    if(ball.y > paddle.y && ball.y < paddle.y + paddle.height   && ball.x > paddle.x && ball.x < paddle.x + paddle.width){
            let collidePoint = ball.x - (paddle.x + paddle.width/2);
            collidePoint = collidePoint /(paddle.width/2);

            let angle= collidePoint * (Math.PI/3);
            ball.dx=ball.speed * Math.sin(angle);
            ball.dy= -ball.speed * Math.cos(angle);
            PADDLE_HIT.play();
        }
}
// CREATE BRICKS
const brick={
    row : 1,
    column : 5,
    width : 55,
    height : 20,
    offSetLeft : 20,
    offSetTop : 20,
    margintop : 40,
    fillColor : "#2e3548",
    strokeColor : "#FFF",
}
let bricks=[];
function createBricks(){
    for(let i=0; i< brick.row;i++){
        bricks[i]=[];
        for(let j=0;j<brick.column;j++){
            bricks[i][j]={
                            x : j*(brick.offSetLeft + brick.width) +brick.offSetLeft,
                            y : i*(brick.offSetTop + brick.height) + brick.offSetTop + brick.margintop,
                            status : true
        
                        }
        }
    }
}
createBricks();
// DRAW BRICKS
function drawBricks(){
    for(let i=0;i<brick.row;i++){
        for(let j=0;j<brick.column;j++){
            if(bricks[i][j].status){
                ctx.fillStyle=brick.fillColor;
                ctx.fillRect(bricks[i][j].x,bricks[i][j].y,brick.width,brick.height);

                ctx.strokeStyle=brick.strokeColor;
                ctx.strokeRect(bricks[i][j].x,bricks[i][j].y,brick.width,brick.height);
            }
        }
    }
}

//BALL BRICK COLLISION
function ballBrickCollision(){
    for(let i=0;i<brick.row;i++){
        for(let j=0;j<brick.column;j++){
            let b=bricks[i][j];
            if(b.status){
                if(ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width
                    && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height ){

                    
                    b.status = false;
                    ball.dy = -ball.dy;
                    SCORE += SCORE_UNIT;
                    BRICK_HIT.play();
                }
            }
        }
    }
}

//SHOW GAME STATS
function showGamestats(text,textX,textY,img,imgX,imgY){
    ctx.fillStyle= "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text,textX,textY);
    ctx.drawImage(img,imgX,imgY,25,25);
}

//DRAW FUNCTION

function draw(){
    drawPaddle();
    drawBall();
    drawBricks();

    //SHOW SCORE
    showGamestats(SCORE, 35,25,SCORE_IMG , 5,5);
    //SHOW LIFE
    showGamestats(LIFE,cvs.width-25,25,LIFE_IMG,cvs.width-55,5);
    //SHOW LEVEL
    showGamestats(LEVEL,cvs.width/2,25,LEVEL_IMG,cvs.width/2-30,5);
}
// GAME OVER
function gameOver(){
    if(LIFE<=0){
        showGamestats(LIFE,cvs.width-25,25,LIFE_IMG,cvs.width-55,5);
        showyoulose();
        
        GAME_OVER=true;
    }
}
//LEVEL UP
function levelUp(){
    let isLevelDone=true;
    for(let i=0;i<brick.row;i++){
        for(let j=0;j<brick.column;j++){
            isLevelDone = isLevelDone && ! bricks[i][j].status;
        }
    }

    if(isLevelDone){
        WIN.play();
        if(LEVEL >= MAX_LEVEL){
            drawBricks();
            showyouwin();
            GAME_OVER=true;
            return;
        }

        brick.row++;
        createBricks();
        ball.speed+=0.5;
        resetBall();
        LEVEL++;
    }
}


// UPDATE GAME FUNCTION

function update(){
   
    movePaddle();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
    gameOver();
    levelUp();
}

function loop()
{
    //clear canvas;
    ctx.drawImage(BG_IMG,0,0);
    draw();
    update();
    if(!GAME_OVER){
        requestAnimationFrame(loop);
    }
}
loop();


// SELECT THE SOUND ELEMENT
 
let counter=0;

document.getElementById("sound").addEventListener("click",audioManager);

function audioManager(){

    counter++;
    if(counter%2 == 1)
    {
        document.getElementById("sound").src="img/SOUND_OFF.png";
    }
    else{
        document.getElementById("sound").src="img/SOUND_ON.png";
    }
    

    WALL_HIT.muted = WALL_HIT.muted ? false : true ;
    PADDLE_HIT.muted = PADDLE_HIT.muted ? false : true ;
    BRICK_HIT.muted = BRICK_HIT.muted ? false : true ;
    WIN.muted = WIN.muted ? false : true ;
    LIFE_LOST.muted = LIFE_LOST.muted ? false : true ;
}


// SHOW GAME OVER 

const gameover = document.getElementById("gameover");
const youwon = document.getElementById("youwon");
const youlose = document.getElementById("youlose");
const restart = document.getElementById("restart");

// CLICK ON PLAY AGAIN BUTTON

restart.addEventListener("click",function(){
    location.reload();
})

//SHOW YOU WIN
function showyouwin(){
    gameover.style.display="block";
    youwon.style.display="block";
}

//SHOW YOU LOSE 
function showyoulose(){
    gameover.style.display="block";
    youlose.style.display="block";
}
