import { useEffect, useState } from "react"
import _ from "lodash"
import {
  hasPlayerWon,
  initializeGrid,
  Mark,
  MarkType,
  TileType,
} from "../lib/game"
import styles from "../styles/Playground.module.css"

export default function Playground({ gridSize }: { gridSize: number }) {
  const [movesMade, setMovesMade] = useState<number>(0)
  const [currentMark, setCurrentMark] = useState<MarkType>(Mark.X)
  const [grid, setGrid] = useState<TileType[][]>(initializeGrid(gridSize))

  function restartGame() {
    setGrid(initializeGrid(gridSize))
    setMovesMade(0)
  }

  function concludeGame(msg: string) {
    setTimeout(() => {
      alert(msg)
      restartGame()
    }, 100)
  }

  function onTileClick(x: number, y: number) {
    if (grid[x][y] !== "") {
      return
    }

    // update grid
    const newGrid = _.cloneDeep(grid)
    newGrid[x][y] = currentMark
    setGrid(newGrid)
    setMovesMade((count) => count + 1)

    // check if game is over
    if (hasPlayerWon(x, y, currentMark, newGrid)) {
      return concludeGame(`Player ${currentMark} has won`)
    }
    if (movesMade >= Math.pow(gridSize, 2) - 1) {
      return concludeGame("The game has been drawn")
    }

    // continue game
    setCurrentMark((currentMark) => (currentMark === "X" ? "O" : "X"))
  }

  useEffect(() => {
    restartGame()
  }, [gridSize])

  return (
    <div className={styles.flexcentercol}>
      <div className={styles.nextmove}>Next Move: {currentMark}</div>

      {grid.map((cols, x) => (
        <div className={styles.gridcolumn} key={x}>
          {cols.map((tile, y) => (
            <Tile
              key={`${x}${y}`}
              type={tile}
              onClick={() => onTileClick(x, y)}
            />
          ))}
        </div>
      ))}

      <div className={styles.buttons}>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  )
}

function Tile({ type, onClick }: { type: TileType; onClick: any }) {
  return (
    <div className={styles.tile} onClick={onClick}>
      {type}
    </div>
  )
}
