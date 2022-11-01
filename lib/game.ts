export type Mark = "X" | "O"
export type TileType = Mark | ""

export function initializeGrid(gridSize: number) {
  return [...Array(gridSize)].map(() => Array(gridSize).fill(""))
}

export function hasPlayerWon(
  x: number,
  y: number,
  mark: Mark,
  grid: TileType[][]
) {
  const gridSize = grid.length

  // check vertical
  for (let i = 0; i < gridSize; i++) {
    if (grid[x][i] != mark) {
      break
    }
    if (i == gridSize - 1) {
      return true
    }
  }

  // check horizontal
  for (let i = 0; i < gridSize; i++) {
    if (grid[i][y] != mark) {
      break
    }
    if (i == gridSize - 1) {
      return true
    }
  }

  // check diagonal
  if (x == y) {
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][i] != mark) {
        break
      }
      if (i == gridSize - 1) {
        return true
      }
    }
  }

  // check other diagonal
  if (x + y == gridSize - 1) {
    for (let i = 0; i < gridSize; i++) {
      if (grid[i][gridSize - 1 - i] != mark) {
        break
      }
      if (i == gridSize - 1) {
        return true
      }
    }
  }

  return false
}
