let direction = {x:0,y:0};
let speed = 5;
let prev_time=0;
let mini = 1,maxi=25;
let size=25;
const foodAudio = new Audio("./musics/food.mp3");
const moveAudio = new Audio("./musics/move.mp3");
const gameoverAudio = new Audio("./musics/gameover.mp3");
let endElement = document.getElementById('endlinediv');
let snake = [
    {x:12,y:12}
];
let rightside = document.getElementById('rightside');
let anykeydiv = document.getElementById('anykey');
let score=0;
let highScore =0;
let scorediv = document.getElementById('scorediv');
let finalscore = document.getElementById('finalscore');
let food = {x:20,y:16}
let board = document.getElementById('board');
let speedDiv= document.getElementById('speedDiv');
let highscoreDiv= document.getElementById('highscorediv');
let gridSize1 = document.getElementById('gridSize1');
let gridSize2 = document.getElementById('gridSize2');
let gridSize3 = document.getElementById('gridSize3');
let gridSize4 = document.getElementById('gridSize4');
let upbtn = document.getElementById('up');
let downbtn = document.getElementById('down');
let leftbtn = document.getElementById('left');
let rightbtn = document.getElementById('right');

    let restartbtn = document.getElementById('restartbtn');
 let s = document.getElementById('speed').value ;
speed = s + s/2;
        document.getElementById('speed').addEventListener('change', function() {
            speed = this.value+0.5*this.value;
            // console.log('Speed updated to:', speed);
        });  
restartbtn.addEventListener('click',restartgame);
function getrandom()
{
    let ans = ((mini+(size-mini)*Math.random()));
    return Math.ceil(ans);
}
gridSize1.addEventListener('click',(e)=>{
        board.style.gridTemplateColumns = `repeat(${36}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${36}, 1fr)`;
        size=36;
})
gridSize2.addEventListener('click',(e)=>{
    board.style.gridTemplateColumns = `repeat(${30}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${30}, 1fr)`;
        size=30;
})
gridSize3.addEventListener('click',(e)=>{
     board.style.gridTemplateColumns = `repeat(${26}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${26}, 1fr)`;
        size=26;
})
gridSize4.addEventListener('click',(e)=>{
     board.style.gridTemplateColumns = `repeat(${20}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${20}, 1fr)`;
        size=20;
})
function isCollide(snakeBody)
{   
    // if(!snakeBody) return true; 
    for(let i=1;i<snakeBody.length;i++)
    {
        if(snakeBody[i].x===snakeBody[0].x && snakeBody[i].y===snakeBody[0].y)
        return true;
    }
    let xx = snakeBody[0].x;
    let yy = snakeBody[0].y;
    if(xx<=0 || yy<=0 || xx>size || yy>size)
    return true;
    return false;
}
function resetScore()
{
    score=0;
    scorediv.classList.add('displaynone');
}
function updateScore()
{
    score++;
        if(score==1)
        {
            scorediv.classList.remove('displaynone');
        }
    scorediv.innerHTML=`SCORE : ${score}`;
}
 function restartgame(){
    direction={x:0,y:0};
        snake=[{x:12,y:12}];
        board.classList.remove('displaynone');
        // speedDiv.classList.remove('displaynone');
        // highscoreDiv.classList.remove('displaynone');
        endElement.classList.add('displaynone');
        stopGame=0;
        resetScore();
        rightside.classList.remove('displaynone');
            // anykeydiv.classList.remove('displaynone');
}
// let break=0;
let stopGame=0;

function gameEngine()
{
    // collid with myself or corners
    if(isCollide(snake))
    {
        if(score>highScore)
        {
            highScore=score;
            highscoreDiv.innerHTML=`Highest Score: ${highScore}`
            localStorage.setItem("highScore",score);
        }
        finalscore.innerHTML=`FINAL SCORE : ${score}`;
        board.classList.add('displaynone');
        endElement.classList.remove('displaynone');
                scorediv.classList.add('displaynone');
                        rightside.classList.add('displaynone');

        // speedDiv.classList.add('displaynone');
        // highscoreDiv.classList.add('displaynone');
        
    }
    // food eating
    if(snake[0].x==food.x && snake[0].y== food.y)
    {
        snake.unshift({x:snake[0].x+direction.x , y: snake[0].y+direction.y});
        food.x= getrandom();
        food.y= getrandom();
        foodAudio.play();
        updateScore();
    }
    // snake moving logic
    for(let i=snake.length-2;i>=0;i--){
        snake[i+1]={...snake[i]};
    }
    snake[0].x+=direction.x;
    snake[0].y+=direction.y;

    // displaying logic 
    board.innerHTML="";
    snake.forEach((position,index)=>{
        let snakeElemnet = document.createElement('div');
        snakeElemnet.style.gridRowStart=position.y;
        snakeElemnet.style.gridColumnStart=position.x;
        if(index==0)
        snakeElemnet.classList.add('head');
        else
        snakeElemnet.classList.add('body');

        board.appendChild(snakeElemnet);
    })

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    // alert("foof is displayed");
}

function main(curr_time){
    window.requestAnimationFrame(main);
    if((curr_time-prev_time)/1000  < 1/speed)
    return;
    prev_time=curr_time;
    gameEngine();
}
document.addEventListener('DOMContentLoaded',()=>{
    highScore = localStorage.getItem('highScore')?localStorage.getItem('highScore'):0;
highscoreDiv.innerHTML=`Highest Score : ${highScore}`;

})




function moveUp()
{
 if(direction.y!=1)
            {
                direction.x=0;
                direction.y=-1;
                moveAudio.play();
            }   
}
function moveDown()
{
if(direction.y!=-1)
            {
                direction.x=0;
                direction.y=1;
                moveAudio.play();

            }
}
function moveLeft()
{
    if(direction.x!=1)
            {
                direction.x=-1;
                direction.y=0;
                moveAudio.play();

            }
}
function moveRight()
{
 if(direction.x!=-1)
            {
                direction.x=1;
                direction.y=0;
                moveAudio.play();
            }
}
upbtn.addEventListener('click',moveUp);
downbtn.addEventListener('click',moveDown);
leftbtn.addEventListener('click',moveLeft);
rightbtn.addEventListener('click',moveRight);
window.requestAnimationFrame(main);
window.addEventListener('keydown',(e)=>{
    // console.log(e.key);
    anykeydiv.classList.add('displaynone');
    // console.log(e);
    switch (e.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'w':
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "s":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "a":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "d":
           moveRight();
            break;
        default:
            break;
    }
})