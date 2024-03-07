import './ConnectionButtons.css'

// No need to use
export function ConnectionButtons({ setShuffledArr, setGuessArr, guessArr, submitGuess, shuffle, answers, gameStatus }) {

    return (
        <div className='connection-board-button-container'>
            <button onClick={() => setShuffledArr(shuffle(answers))} className={`connection-board-button click-swing`} id={gameStatus === 'playing' ? "" : "disabled-connection-button"}>Shuffle</button>
            <button onClick={() => setGuessArr([])} className={`connection-board-button`} id={guessArr.length > 0 ? "" : "disabled-connection-button"}>Deselect All</button>
            <button onClick={submitGuess} className={`connection-board-button`} id={guessArr.length === 4 ? "" : "disabled-connection-button"}>Submit</button>
        </div>
    )

}

export default ConnectionButtons
