import { Link } from "react-router-dom"
import { GameBoard } from "../../components/GameBoard/GameBoard"

const Game = () => {
  return (
    <div className="section">
      <div className="box box_center">
        <GameBoard />
      </div>
    </div>
  )
}

export default Game