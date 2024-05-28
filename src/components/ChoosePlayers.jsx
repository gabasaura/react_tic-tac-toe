import { useState } from 'react'


const PlayerSelection = ({ onPlayerSelect }) => {
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (player1 && player2) {
            onPlayerSelect(player1, player2)
        } else {
            alert('Please enter both player names.')
        }
    }

    return (
        <form className='start-players' onSubmit={handleSubmit}>
            <div>
                <label>Player 1</label>
                <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
            </div>
            <div>
                <label>Player 2</label>
                <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
            </div>
            <button type="submit">Start Game</button>
        </form>
    )
}

export default PlayerSelection