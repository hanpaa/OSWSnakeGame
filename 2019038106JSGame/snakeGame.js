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
const gridSize = gridHeight * gridWidth;
const canvasBackground = 'gray';
const snakeSize = 10;


/**
 * @date 2021/05/12
 */
function gameInit(){
    let gridHeight = canvas.width;
    let gridWidth = canvas.height;
    console.log("game init");
    snake = new Snake();
    snake.setCanvasSnakePart();
}

function clearCanvas() {

    context.fillStyle = canvasBackground;
    context.strokeStyle = canvasBackground;
    context.fillRect(0, 0, gridWidth, gridHeight);
    context.strokeRect(0, 0, gridWidth, gridHeight);

}




