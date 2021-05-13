class Snake {
    parts;
    //초기 10으로 설
    snakeMaxLength = 10;
    snakeLength = 5;
    snakeColor = 'green';
    snakeBorder = 'black';
    context = document.getElementById("js game").getContext("2d");
    //ms
    moveSpeed = 200;
    moveX = -10;
    moveY = 0;

    constructor() {
        // 초기 뱀 모양 중앙에서 ㅁㅁㅁㅁ 로 시작
        this.parts = [
            {x: gridWidth/2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*3, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*4, y:gridHeight/2}
        ];
    }

    setLength(){
        this.snakeLength = this.parts.length;

    }

    getLength() {
        return this.snakeLength;
    }

    setCanvasSnakePart(){
        for(let i=0; i < this.snakeLength; i++){
            let parts = snake.parts[i];
            context.fillStyle = this.snakeColor;
            context.strokeStyle = this.snakeBorder;
            context.fillRect(parts.x, parts.y, 10, 10);
            context.strokeRect(parts.x, parts.y, 10, 10);
        }

    }

    getContext(){
        return this.context;
    }

    detectChangeDirection(){

        window.onkeydown = (ev => {
                switch (ev.keyCode) {
                    case 37:
                        //press left key
                        if(this.moveX == 10) break;
                        this.moveX = -10;
                        this.moveY = 0;
                        break;
                    case 38:
                        //press down key
                        if(this.moveY == 10) break;
                        this.moveX = 0;
                        this.moveY = -10;
                        break;
                    case 39:
                        //press right key
                        if(this.moveX == -10) break;
                        this.moveX = 10;
                        this.moveY = 0;
                        break;
                    case 40:
                        //down key
                        if(this.moveY == -10) break;
                        this.moveX = 0;
                        this.moveY = 10;
                        break;
                    default:
                        console.log("some key");
                        break;
                }
            }
        );

    }

    moveSnake(){


        const newParts = {x : this.parts[0].x + this.moveX, y: this.parts[0].y + this.moveY};

        this.parts.unshift(newParts);

        if(isItemDestroy()){
            itemCoordX = Math.round(Math.random() *100)*10%gridWidth;
            itemCoordY = Math.round(Math.random() *100)*10%gridHeight;
            getItem();
            score += (100*level);
            this.setLength();
            setScoreDOM();
        }else{
            this.parts.pop();
        }

        this.setCanvasSnakePart();
    }

    setMoveSpeed(moveSpeed){
        this.moveSpeed = moveSpeed;
    }

    getMoveSpeed(){
        return this.moveSpeed;
    }

    setMaxLength(){
        this.snakeMaxLength += 10;
    }

    getMaxLength(){
        return this.snakeMaxLength;
    }



}
