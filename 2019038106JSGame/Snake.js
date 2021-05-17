/**
 * @title Snake.js
 * @date 2021/05/12
 * @author 2019038106 최제현
 *
 * Snake클래스.
 * snake의 몸통, 길이 색깔 등 snake 객체 자체의 제어를 위한 클래스
 */

class Snake {
    //뱀 몸통 배열이 들어갈 변수
    parts;
    //초기 10으로 설정
    snakeMaxLength = 10;
    snakeLength = 5;
    snakeColor = 'green';
    snakeBorder = 'black';

    //context에 반영을 위해 프로퍼티로 다시 설정.
    context = document.getElementById("js game").getContext("2d");

    //ms 단위 숫자가 낮을수록 속도가 빨라짐.
    moveSpeed = 500;
    //뱀 이동 초기값. 왼쪽으로 이동함.
    moveX = -10;
    moveY = 0;

    //생성자. class생성시 몸통 배정
    constructor() {
        // 초기 뱀 모양 중앙에서 ㅁㅁㅁㅁㅁ 로 시작
        this.parts = [
            {x: gridWidth/2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*3, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*4, y:gridHeight/2}
        ];
    }

    //setter: 현재 뱀 길이 설정
    setLength(){
        this.snakeLength = this.parts.length;

    }

    //getter: 현재 뱀 길이 return
    getLength() {
        return this.snakeLength;
    }

    //canvas에 뱀 몸통들을 그려주는 메서드.
    setCanvasSnakePart(){
        for(let i=0; i < this.snakeLength; i++){
            let parts = snake.parts[i];
            //뱀 색깔들 적용
            context.fillStyle = this.snakeColor;
            context.strokeStyle = this.snakeBorder;
            //그릴 차래대로 그릴 좌표, 너비 높이
            context.fillRect(parts.x, parts.y, 10, 10);
            context.strokeRect(parts.x, parts.y, 10, 10);
        }

    }

    //Getter 현재 canvas context return해주는 메서드.
    getContext(){
        return this.context;
    }

    //키보드 누름 이벤트를 감지하여 이동방향을 바꾸어 주는 메서드
    detectChangeDirection(){

        window.onkeydown = (ev => {
            //event에서 keycode를 불러옴.
                switch (ev.keyCode) {
                    case 37:
                        //왼쪽 방향키를 눌렀을 때
                        //만약 현재 진행방향 반대방향 키를 눌렀을때 반응을 하지 않게 처리해줌.
                        if(this.moveX == 10) break;
                        this.moveX = -10;
                        this.moveY = 0;
                        break;
                    case 38:
                        //아래쪽 방향키를 눌렀을 떄
                        if(this.moveY == 10) break;
                        this.moveX = 0;
                        this.moveY = -10;
                        break;
                    case 39:
                        //오른쪽 방향키를 눌렀을 때
                        if(this.moveX == -10) break;
                        this.moveX = 10;
                        this.moveY = 0;
                        break;
                    case 40:
                        //위쪽 방향키를 눌럿을
                        if(this.moveY == -10) break;
                        this.moveX = 0;
                        this.moveY = 10;
                        break;
                    default:

                        //그 외의키는 반응하지 않음.
                        console.log("some key");
                        break;
                }
            }
        );

    }

    //뱀을 움직이는 것 처럼 보이게 처리해주는 메서드.
    moveSnake(){


        //진행하는 방향에 새로운 몸통을 출력해주기 위해 좌표 설정
        const newParts = {x : this.parts[0].x + this.moveX, y: this.parts[0].y + this.moveY};


        //현재 배열에서 맨 앞 즉 index 0 부분에 새 몸통 삽입.
        this.parts.unshift(newParts);

        //아이탬에 닿았을때를 감지하면
        if(isItemDestroy()){
            //다시 새로운 item 생성을 위해 렌덤 좌표 생성
            itemCoordX = Math.round(Math.random() *100)*10%gridWidth;
            itemCoordY = Math.round(Math.random() *100)*10%gridHeight;
            //아이탬 출력
            getItem();

            //level별로 score 점수 다르게 처리
            score += (100*level);
            //길이 최신화
            this.setLength();
            //score DOM에 반영
            setScoreDOM();
        }else{
            //아이템에 닿지 않았을때는 그냥 맨 뒤의 몸통을 지워주면 됨.
            this.parts.pop();
        }

        //몸통을 출력하는 멤버함수 호출
        this.setCanvasSnakePart();
    }

    //setter: 움직이는 속도 조정
    setMoveSpeed(moveSpeed){
        this.moveSpeed = moveSpeed;
    }

    //getter 움직이는 속도 호출
    getMoveSpeed(){
        return this.moveSpeed;
    }

    //setter : 현재 레벨별 최대 길이 설정
    setMaxLength(){
        this.snakeMaxLength += 10;
    }

    //setter : 현재 레벨별 최대 길이 호출
    getMaxLength(){
        return this.snakeMaxLength;
    }



}
