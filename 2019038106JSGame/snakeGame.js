/**
 * @title snakeGame.js
 * @date 2021/05/12
 * @author 2019038106 최제현
 *
 * snake game main 자바스크립트 파일.
 * 게임 실행 및 종료, Html조작 등 핵심기능
 */

// canvas 객체 및 Context
let canvas = document.getElementById("js game");
let context = canvas.getContext("2d");

const frame = 60;

//캔버스 길이, 높이
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

//목표 점수설정 게임을 더 길게 하고싶을때 설정.
let endLevel = 7;

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

    //방향키 입력감지
    snake.detectChangeDirection();

    //interval 초기화
    clearInterval(intervalId);

    //GAME OVER 글씨 지우기.
    overDiv.style.visibility = "hidden";


    game();
}

function game() {
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

//뱀이 아이템에 접근하였는지 감지하는 함수
function isItemDestroy() {
    //예외처리 : 뱀의 머리가 아이템의 좌표에 닿으면 TRUE return!
    if (itemCoordX === snake.parts[0].x
        && snake.parts[0].y === itemCoordY)
        return true;
    else return false;
}

//게임이 끝나는 것을 감지하는 함수
function isGameEnd() {

    //뱀의 머리 설정
    const snakeHead = snake.parts[0];

    // 자신의 몸에 닿으면 게임 끝!
    for (let i = 1; i < snake.getLength(); i++) {
        if (snake.parts[i].x === snakeHead.x && snake.parts[i].y === snakeHead.y) return gameEnd;
    }

    //화면 바깥 좌표에에 나간다면 게임 끝!
    if(snakeHead.x < 0
        || snakeHead.y < 0
        || snakeHead.x >= gridWidth
        || snakeHead.y >= gridHeight) gameEnd();


}

//게임이 끝났을때 초기화해 주는 코드
function gameEnd() {
    // 탈락시 출력!
    gameoverP.innerText = "GAME OVER!";
    gameoverP.style.color = "red";
    overDiv.style.visibility = "visible";
    //interval 중단.
    clearInterval(intervalId);

    //html DOM 초기화.
    level = 1;
    score = 0;
    scoreDOM.innerText = score;
    levelDOM.innerText = level;

    //메모리 관리는 jc가 해주므로, null로 처리.
    snake = null;
}

//레벨업시
function levelUp() {
    //뱀의 최대길이 증가.
         snake.setMaxLength();
        console.log("level UP");
        //레벨업시 속도 증가 해주는 코드.
        snake.setMoveSpeed(snake.getMoveSpeed()*0.9);
        level++;

        //레벨업시 인터벌 속도 증가하여 다시생성
        clearInterval(intervalId);
        game();

    if(level === endLevel){
        // 게임 승리! 10 * (endLevel-1)이 초하였을때. 예) endlevel 4일 때, 몸통 길이가 31이면 종료!

        gameEnd();
        gameoverP.style.color = "blue"
        gameoverP.innerText = "you Win!";


    }
    // html 로 현재레벨 표시
        setScoreDOM();
        }

function setScoreDOM() {

//마지막 Level 도달시 MAX로 표시.
    scoreDOM.innerText = score;
    if(level > endLevel-2) levelDOM.innerText = "MAX";
        else levelDOM.innerText = level;

}


