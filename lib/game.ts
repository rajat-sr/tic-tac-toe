export const Mark = {
  X: "X",
  O: "O",
} as const

export type MarkType = keyof typeof Mark
export type TileType = MarkType | ""

export function initializeGrid(gridSize: number) {
  return [...Array(gridSize)].map(() => Array(gridSize).fill(""))
}

export function hasPlayerWon(
  x: number,
  y: number,
  mark: MarkType,
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
