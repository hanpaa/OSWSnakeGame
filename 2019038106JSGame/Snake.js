class Snake {
    snake;
    //초기 10으로 설
    snakeLength = 10;
    snakeColor = 'green';
    snakeBorder = 'black';
    context;

    constructor(context) {
        // 초기 뱀 모양 중앙에서 ㅁㅁㅁㅁ 로 시작
        this.snake = [
            {x: gridWidth/2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*2, y:gridHeight/2},
            {x: gridWidth/2 + snakeSize*3, y:gridHeight/2}
        ];
        this.context = context;
    }

    setLength(length){
        this.snakeLength = length;

    }

    getLength() {
        return this.snakeLength;
    }

    setCanvasSnakePart(){
        for(let i=0; i < snake.length; i++){
            let parts = snake[i];
            context.fillStyle = this.snakeColor;
            context.strokeStyle = this.snakeBorder;
            context.fillRect(parts.x, parts.y, this.snakeLength, this.snakeLength);
            context.strokeRect(parts.x, parts.y, this.snakeLength, this.snakeLength);
        }
        return context;

    }


}
