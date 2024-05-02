import { useEffect, useRef, useState } from "react";
import { Direction, LinkedList, SnakePosition } from "../utils";

export function useSnake(board: number[][], snakeSpeed: number) {
    const [isRunning, setIsRunning] = useState(false);
    const [gameStatus, setGameStatus] = useState({ score: 0, isGameOver: false });

    const [snake, setSnake] = useState(new LinkedList(getStartedSnakePosition(board)));
    const [snakeCells, setSnakeCells] = useState(new Set([snake.head.value.cell]));
    const [foodCell, setFoodCell] = useState(getNewAppleCell(board, snakeCells));
    const [direction, setDirection] = useState<Direction>('RIGHT');
    const [directionChanged, setDirectionChanged] = useState<boolean>(false);
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

    function handlerStart() {
        setIsRunning(true);
        console.log('start game');
    }

    function handlerStop() {
        setIsRunning(false);
        console.log('stop game');
    }

    function handlerRestart() {
        const newSnake = new LinkedList(getStartedSnakePosition(board)); // Создание нового экземпляра змейки
        const newSnakeCells = new Set([newSnake.head.value.cell]); // Обновление ячеек змейки
        setSnake(newSnake);
        setSnakeCells(newSnakeCells);
        setFoodCell(getNewAppleCell(board, newSnakeCells));
        setDirection('RIGHT');
        setDirectionChanged(false);
        setGameStatus({ score: 0, isGameOver: false });
        handlerStart();
    }

    // moves snake
    function moveSnake() {
        const currentPosition = snake.head.value;
        const nextPosition = getNextSnakePosition(currentPosition, direction, board);
        if (nextPosition === null || snakeCells.has(nextPosition.cell)) {
            handlerStop();
            setGameStatus({ ...gameStatus, isGameOver: true });
            return;
        }
        snake.add(nextPosition);
        const newSnakeCells = new Set(snakeCells);
        newSnakeCells.add(nextPosition.cell)

        // check Apple
        if (nextPosition.cell === foodCell) {
            setFoodCell(getNewAppleCell(board, newSnakeCells))
            setGameStatus({ ...gameStatus, score: gameStatus.score + 1 });
        } else {
            newSnakeCells.delete(snake.tail.value.cell);
            snake.remove();
        }

        setSnakeCells(newSnakeCells);
        setDirectionChanged(false);
    }

    // hundler keydowns
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            e.preventDefault();
            if (!directionChanged) {
                const newDirection = getDirectionFromKey(e.key);
                if (newDirection && !isOppositeDirection(direction, newDirection)) {
                    setDirection(newDirection);
                    setDirectionChanged(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);

    }, [directionChanged]);


    // timer go
    useEffect(() => {
        if (isRunning) {
            const tick = () => {
                moveSnake();
                timer.current = setTimeout(tick, snakeSpeed);
            };
            timer.current = setTimeout(tick, snakeSpeed);
        } else {
            timer?.current && clearTimeout(timer.current);
        }

        return () => { timer?.current && clearTimeout(timer.current) };
    }, [isRunning, snakeCells, direction]);


    // start game
    useEffect(() => {
        handlerStart();
    }, []);

    return { foodCell, snakeCells, gameStatus, handlerRestart };
}





// functions
function getRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getStartedSnakePosition(board: number[][]): SnakePosition {
    const lastIndx = board.length - 1;
    const leftPoint = Math.ceil(lastIndx / 3);
    const rightPoint = Math.floor(lastIndx * 2 / 3);
    const startRow = getRandomInteger(leftPoint, rightPoint);
    const startCol = getRandomInteger(leftPoint, rightPoint);
    const startCell = board[startRow][startCol];
    return {
        row: startRow,
        col: startCol,
        cell: startCell
    }
}


function getNewAppleCell(board: number[][], snakeCells: Set<number>) {
    const lastIndx = board.length - 1;
    const boardLastIndx = board[lastIndx][lastIndx];

    if (snakeCells.size === boardLastIndx + 1) return null;

    // for mini snake random cell
    if (snakeCells.size < boardLastIndx / 2) {
        let foodCell;
        while (true) {
            foodCell = getRandomInteger(0, boardLastIndx);
            if (!snakeCells.has(foodCell)) return foodCell;
        }
    }

    // alternate random cell
    let freeCells = [];
    for (let i = 0; i <= boardLastIndx; i++) {
        if (!snakeCells.has(i)) freeCells.push(i);
    }
    return freeCells[getRandomInteger(0, freeCells.length - 1)];
}


function getNextSnakePosition(
    currentPosition: SnakePosition,
    direction: Direction,
    board: number[][],
): SnakePosition | null {
    const nextPosition = { ...currentPosition };
    switch (direction) {
        case 'UP':
            nextPosition.row--;
            break;
        case 'DOWN':
            nextPosition.row++;
            break;
        case 'LEFT':
            nextPosition.col--;
            break;
        case 'RIGHT':
            nextPosition.col++;
            break;
    }
    if (nextPosition.row < 0 || nextPosition.col < 0) return null;
    if (nextPosition.row >= board.length || nextPosition.col >= board[0].length) return null;
    nextPosition.cell = board[nextPosition.row][nextPosition.col];
    return nextPosition;
}


function isOppositeDirection(dir1: Direction, dir2: Direction): boolean {
    return (
        (dir1 === 'UP' && dir2 === 'DOWN') ||
        (dir1 === 'DOWN' && dir2 === 'UP') ||
        (dir1 === 'LEFT' && dir2 === 'RIGHT') ||
        (dir1 === 'RIGHT' && dir2 === 'LEFT')
    );
}


function getDirectionFromKey(key: string): null | Direction {
    if (key === 'ArrowUp') return 'UP';
    if (key === 'ArrowRight') return 'RIGHT';
    if (key === 'ArrowDown') return 'DOWN';
    if (key === 'ArrowLeft') return 'LEFT';
    return null;
}
