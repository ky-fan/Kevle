import './ConnectionWordTile.css'

export function ConnectionWordTile({ word, setGuessArr }) {

    function handleClick(e) {
        e.preventDefault()
        setGuessArr(guessArr => [...guessArr, word])
    }

    return (
        <div className='connections-word-tile-container' onClick={handleClick}>
            <div className='connections-word-tile'>
                <h2>{word}</h2>
            </div>
        </div>
    )
}

export default ConnectionWordTile
