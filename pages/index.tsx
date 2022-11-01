import Head from "next/head"
import { useState } from "react"
import Playground from "../components/Playground"
import styles from "../styles/Home.module.css"

const MIN_GRID_SIZE = 3
const MAX_GRID_SIZE = 6

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>React Tac Toe</title>
        <meta name="description" content="Tic Tac Toe on React" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>React Tac Toe</h1>
        <Game />
      </main>
    </div>
  )
}

function Game() {
  const [gridSize, setGridSize] = useState<number>(MIN_GRID_SIZE)

  function increaseGridSize() {
    if (gridSize < MAX_GRID_SIZE) {
      setGridSize(gridSize + 1)
    }
  }

  function decreaseGridSize() {
    if (gridSize > MIN_GRID_SIZE) {
      setGridSize(gridSize - 1)
    }
  }

  return (
    <>
      <Playground gridSize={gridSize} />
      <div className={styles.gridbuttons}>
        <button
          onClick={decreaseGridSize}
          disabled={gridSize === MIN_GRID_SIZE}
        >
          Grid -
        </button>

        <button
          onClick={increaseGridSize}
          disabled={gridSize === MAX_GRID_SIZE}
        >
          Grid +
        </button>
      </div>
    </>
  )
}
