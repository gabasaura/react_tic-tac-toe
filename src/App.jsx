import { useState } from 'react'

const turns = {
  x: '×',
  o: '●'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  //cuando hace clic
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

//combos
const winMixer = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(turns.x)

  // null no hay winner, false es empate
  const [winner, setWinner] = useState(null)

  const checkWinner = (boardCheck) => {
    for (const mix of winMixer) {
      const [a, b, c] = mix
      // verifica mix if iguales (x u o)
      if (
        boardCheck[a] && // ? x u o
        boardCheck[a] === boardCheck[b] && // ?? x -> x u o -> o
        boardCheck[a] === boardCheck[c] // ??? === 
      ) {
        return boardCheck[a] // win x u o
      }
    }
      return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(turns.x)
    setWinner(null)
  }
  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square !== null)
  }
  const updateBoard = (index) => {
    if (board[index] || winner) return
    //actualiza tablero
    const newBoard = [...board] //copia tablero
    newBoard[index] = turn
    setBoard(newBoard)
    //cambiar turno
    const newTurn = turn === turns.x ? turns.o : turns.x
    setTurn(newTurn)
    
    //revisar winner
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) //empate
    }
      
    }
  


  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>RESET</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }

      </section>
      <section className='turns-selection'>
        <Square isSelected={turn === turns.x}>
          {turns.x}
        </Square>
        <Square isSelected={turn === turns.o}>
          {turns.o}
        </Square>
      </section>

        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
              <h2>
                {
                  winner === false
                  ? 'Empate'
                  : 'Gano: '
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>RESET</button>
              </footer>
              </div>
            </section>
          ) 
        }
      
    </main>
  )
}

export default App

