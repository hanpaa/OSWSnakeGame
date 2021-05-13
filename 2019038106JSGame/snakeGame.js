/**
 * @title snakeGame.js
 * @date 2021/05/12
 * @author 2019038106 최제현
 */


let canvas = document.getElementById("js game");
let context = canvas.getContext("2d");

const frame = 60;

let gridHeight = canvas.width;
let gridWidth = canvas.height;
let snake;
let itemCoordX = Math.round(Math.random() *100)*10%gridWidth;
let itemCoordY = Math.round(Math.random() *100)*10%gridHeight;
let score = 0;
let level = 1;
let timer = 50;
let GameEnd = false;
let itemNumber = 0;
let intervalId;
const gridSize = gridHeight * gridWidth;
const canvasBackground = 'gray';
const snakeSize = 10;




/**
 * @date 2021/05/12
 */
function gameInit(){
    let gridHeight = canvas.width;
    let gridWidth = canvas.height;
    console.log("game init gridHeight : " + gridHeight + "grid Width" + gridWidth);
    clearCanvas();
    snake = new Snake();
    snake.setCanvasSnakePart();
    snake.detectChangeDirection();
    clearInterval(intervalId);

    intervalId = setInterval(()=>{

        if(isGameEnd()){
            gameEnd();
            return;
        }else{
            clearCanvas();
            getItem();
            snake.moveSnake();
        }

    },snake.getMoveSpeed())
}

function clearCanvas() {

    context.fillStyle = canvasBackground;
    context.strokeStyle = canvasBackground;
    context.fillRect(0, 0, gridWidth, gridHeight);
    context.strokeRect(0, 0, gridWidth, gridHeight);


}

function getItem() {

    context.fillStyle = 'yellow';
    context.strokeStyle = 'red';
    context.fillRect(itemCoordX, itemCoordY, 5, 5);
    context.fillRect(itemCoordX, itemCoordY, 5, 5);
}

function isItemDestroy() {
    if (itemCoordX === snake.parts[0].x
        && snake.parts[0].y === itemCoordY)
        return true;
    else return false;
}

function isGameEnd() {

    // 자신의 몸에 닿으면 게임 끝!
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }

}

function gameEnd() {
    clearCanvas();
    clearInterval(intervalId);
}







