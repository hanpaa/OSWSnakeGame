/**
 * @title snakeGame.js
 * @date 2021/05/12
 * @author 2019038106 최제현
 */


let canvas = document.getElementById("js game");
let context = canvas.getContext("2d");

const frame = 60;

//캔버스 길이
let gridHeight = canvas.width;
let gridWidth = canvas.height;

//뱀 객체가 들어갈 변수
let snake;

//아이탬의 좌표 랜덤설정
let itemCoordX = Math.round(Math.random() *100)*10%gridWidth;
let itemCoordY = Math.round(Math.random() *100)*10%gridHeight;

// 점수, 레벨 초기값
let score = 0;
let level = 1;

// interval 들어갈 자리
let intervalId;
const gridSize = gridHeight * gridWidth;
const canvasBackground = 'gray';
const snakeSize = 10;


// 글씨 수정을 위한 DOM 객체 할
let overDiv = document.getElementById("over-hidden");
let gameoverP = document.getElementById("game-over");
let scoreDOM = document.getElementById("score");
let levelDOM = document.getElementById("level");


/**
 * @date 2021/05/12당
 * 게임을 시작하는 함수
 */
function gameInit(){
    let gridHeight = canvas.width;
    let gridWidth = canvas.height;
    console.log("game init gridHeight : " + gridHeight + " grid Width : " + gridWidth);
    //캔버스 초기화
    clearCanvas();
    //snake 객체 생성
    snake = new Snake();

    //snake 렌더링
    snake.setCanvasSnakePart();

    //방향키 입력감
    snake.detectChangeDirection();

    //interval 초기화
    clearInterval(intervalId);

    //GAME OVER 글씨 지우기.
    overDiv.style.visibility = "hidden";


    // 실질적으로 게임을 실행하는 부분.
    // Snake 클래스의 movespeed 속도로, 계속해서 뱀을 움직여줌.
    intervalId = setInterval(()=>{

        //충돌이 감지 되었을 때
        if(isGameEnd()){
            //게임 종료
            gameEnd();
            return;
        }else{
            //지속적이전에 그려진 뱀 몸통 지우기.
            clearCanvas();
            //아이탬은 계속해서 그려져야함.
            getItem();
            snake.moveSnake();
        }

        // 한 레벨 최대 길이 도달시 레벨 증가
        if(snake.getMaxLength() === snake.getLength()){
            levelUp();
        }

    },snake.getMoveSpeed())
}

//캔버스를 초기화 하는 함수
function clearCanvas() {


    //처음부터 끝까지 rect로 덮어 씌워버림.
    context.fillStyle = canvasBackground;
    context.strokeStyle = canvasBackground;
    context.fillRect(0, 0, gridWidth, gridHeight);
    context.strokeRect(0, 0, gridWidth, gridHeight);


}

// 아이탬을 출력해주는 함수
function getItem() {

    context.fillStyle = 'yellow';
    context.strokeStyle = 'red';
    context.fillRect(itemCoordX, itemCoordY, 5, 5);
    context.fillRect(itemCoordX, itemCoordY, 5, 5);
}

//뱀이 아이템에 접근하였는지 감지하는
function isItemDestroy() {
    if (itemCoordX === snake.parts[0].x
        && snake.parts[0].y === itemCoordY)
        return true;
    else return false;
}

function isGameEnd() {

    const snakeHead = snake.parts[0];
    // 자신의 몸에 닿으면 게임 끝!
    for (let i = 3; i < snake.getLength(); i++) {
        if (snake.parts[i].x === snakeHead.x && snake.parts[i].y === snakeHead.y) return true
    }

    if(snakeHead.x < 0
        || snakeHead.y < 0
        || snakeHead.x >= gridWidth
        || snakeHead.y >= gridHeight) gameEnd();


}

function gameEnd() {
    gameoverP.innerText = "GAME OVER!";
    gameoverP.style.color = "red";
    overDiv.style.visibility = "visible";
    clearInterval(intervalId);
    level = 1;
    score = 0;
    scoreDOM.innerText = score;
    levelDOM.innerText = level;
    snake = null;
}

function levelUp() {
         snake.setMaxLength();
        console.log("level UP");
        //레벨업시 속도 20프로 증

            snake.setMoveSpeed(snake.getMoveSpeed()-40);
        level++;
    if(level === 4){
        // 게임 승리! 30개 먹었을때.

        gameEnd();
        gameoverP.style.color = "blue"
        gameoverP.innerText = "you Win!";


    }
        setScoreDOM();
        }

function setScoreDOM() {


    scoreDOM.innerText = score;
    if(level > 2) levelDOM.innerText = "MAX";
        else levelDOM.innerText = level;






}


