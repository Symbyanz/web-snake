import { useSnake } from '../../hooks/useSnake';
import './GameBoard.scss'
import { useState } from "react"
import { Snake } from './Snake/Snake';
import { Apple } from './Apple/Apple';


const BOARD_SIZE = 10;
const SNAKE_MOVEMENT_INTERVAL_MS = 100;

function createBoard(boardSize: number) {
  return new Array(boardSize).fill(null).map((_, rowIndex) => (
    new Array(boardSize).fill(null).map((_, colIndex) => (
      rowIndex * boardSize + colIndex
    ))
  ));
};


export const GameBoard = () => {
  const [board, setBoard] = useState(createBoard(BOARD_SIZE));
  const { foodCell, snakeCells, gameStatus, handlerRestart } = useSnake(board, SNAKE_MOVEMENT_INTERVAL_MS);

  return (
    <>

      <h3>Текущий счет: {gameStatus.score} {gameStatus.isGameOver && '| Игра окончена'}</h3>
      <br />
      <div className="game-board">
        {board.map((row, rowIndx) => (
          <div key={rowIndx} className="game-board__row">{
            row.map((cellNum, cellIndx) => (
              <div key={cellIndx} className="game-board__cell">
                {snakeCells.has(cellNum) ? <Snake /> : foodCell === cellNum && <Apple />}
              </div>
            ))
          }</div>
        ))}
      </div>
      <br />
      <button className='link link_underline' onClick={handlerRestart}>Начать заново</button>
    </>
  )
}
