import ConnectionWordTile from './ConnectionWordTile/ConnectionWordTile'
import './ConnectionBoard.css'
import { useState, useEffect } from 'react'
import ConnectionAnswerBar from './ConnectionAnswerBar/ConnectionAnswerBar'


export function ConnectionBoard({ connection }) {

    const [numWrongGuesses, setNumWrongGuesses] = useState(0)

    // Tracks game state, gameState[0] represents first row. If gameState[i] === 0, row is unsolved.
    // If [2,4,0,0], shows incomplete game where 2nd category solved first, 4th category solved second.
    const [gameState, setGameState] = useState([0, 0, 0, 0])

    // Tracks whether the game is won, lost, or being played
    const [gameStatus, setGameStatus] = useState('playing')

    // Selected words for each guess, need four words to submit
    const [guessArr, setGuessArr] = useState([])

    // Contains the randomized answers
    const [shuffledArr, setShuffledArr] = useState([])

    // Copy of shuffledArr to be mutated for display
    const [displayArr, setDisplayArr] = useState([])

    const [answerObj, setAnswerObj] = useState({})

    // Returns a randomized copy of the input array
    function shuffle(arr) {
        if (arr) {
            const returnArr = arr.slice(0)
            for (let i = returnArr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                let temp = returnArr[i]
                returnArr[i] = returnArr[j]
                returnArr[j] = temp
            }
            return returnArr
        }
    }

    // Initialize a shuffled array to be stored in state
    useEffect(() => {
        setShuffledArr(shuffle(connection.answers))
        setAnswerObj(
            {
                1: connection.answers.slice(0, 4),
                2: connection.answers.slice(4, 8),
                3: connection.answers.slice(8, 12),
                4: connection.answers.slice(12, 16)
            }
        )
    }, [connection])

    // Updates the displayed elements on re-render
    const answerArr = connection.answers
    useEffect(() => {
        // Check the gameState to see which categories have been solved and thus which words to filter out of the display
        let filteredWordsArr = []
        function filteredWords() {
            for (let i = 1; i < 5; i++) {
                if (gameState.includes(i)) filteredWordsArr.push(...answerObj[i])
            }
            return filteredWordsArr
        }
        filteredWords()

        // Sets the display array to only contain words from unsolved categories
        if (!shuffledArr) return
        setDisplayArr(shuffledArr.filter(word => !(filteredWordsArr.includes(word))))
    }, [connection, shuffledArr, gameState, guessArr, numWrongGuesses, answerObj])

    // Check game status
    useEffect(() => {
        // Game is won once the final row is solved
        if (gameState[3] > 0) {
            setGameStatus('won')
            alert('YOU WON (This will be replaced by a modal)')
        }

        // Game is lost when the number of incorrect guesses reaches 4
        if (numWrongGuesses >= 4) {
            const unsolvedCategories = [4, 3, 2, 1].filter(num => !(gameState.includes(num)))

            // Iterate through each row in gameState
            for (let i = 0; i < gameState.length; i++) {
                // For each unsolved row, remove the next easiest category from the unsolved categories and update gameState to display that category in that row
                if (gameState[i] === 0) {
                    const newGameState = gameState
                    newGameState[i] = unsolvedCategories.pop()
                    setGameState[newGameState]
                }
            }
            // Clear guess, set game status to lost
            setGuessArr([])
            setGameStatus('lost')
            alert('NEXT TIME (This will be replaced by a modal)')
            return
        }
    }, [gameState, numWrongGuesses])

    // Win/loss modals
    // how to play modal

    if (!answerArr) return

    if (!connection.categories) return

    const connectionArr = connection.categories

    // Stores [categoryNumber, category, answer1, answer2, answer3, answer4] to pass into ConnectionAnswerBar
    const categoryObj = {}
    for (let i = 1; i < 5; i++) {
        categoryObj[`category${i}`] = [i, connectionArr[i - 1]].concat(answerObj[i])
    }

    const submitGuess = e => {
        e.preventDefault()
        // Stores sets containing each group of answers for comparison to guesses
        const answerSetObj = {}
        for (let i = 1; i < 5; i++) {
            answerSetObj[i] = new Set(answerObj[i])
        }

        // Iterate through each of the 4 rows to check for completion
        for (let i = 0; i < 4; i++) {
            // If the current row is incomplete
            if (gameState[i] === 0) {
                // Iterate through each of the 4 sets of answers
                for (let answerSetNum in answerSetObj) {
                    // Check if the guess matches any of the answer sets
                    if (guessArr.every(word => answerSetObj[answerSetNum].has(word))) {
                        // Update gamestate if there's a match
                        const newGameState = [...gameState]
                        newGameState[i] = parseInt(answerSetNum)
                        setGameState(newGameState)

                        // Clear the guess
                        setGuessArr([])
                        return
                    }
                }
            }
        }
        // Increment the number of incorrect guesses if there's no match
        let guesses = numWrongGuesses + 1
        setNumWrongGuesses(guesses)
    }

    if (!(gameState.length)) return
    return (
        <div className='connection-board-container'>
            <div className='connection-board-row'>
                {gameState[0] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[0]]} />}
                {gameState[0] === 0 && displayArr?.splice(0, 4)?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
            </div>
            <div className='connection-board-row'>
                {gameState[1] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[1]]} />}
                {gameState[1] === 0 && displayArr?.splice(0, 4)?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
            </div>
            <div className='connection-board-row'>
                {gameState[2] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[2]]} />}
                {gameState[2] === 0 && displayArr?.splice(0, 4)?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
            </div>
            <div className='connection-board-row'>
                {gameState[3] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[3]]} />}
                {gameState[3] === 0 && displayArr?.splice(0, 4)?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
            </div>

            <div className='connection-board-mistakes-container'>
                <p>Mistakes Remaining: {4 - numWrongGuesses} </p>
            </div>

            <div className='connection-board-button-container'>
                <button onClick={() => setShuffledArr(shuffle(connection.answers))} className={`connection-board-button`} id={gameStatus === 'playing' ? "" : "disabled-connection-button"}>Shuffle</button>
                <button onClick={() => setGuessArr([])} className={`connection-board-button`} id={guessArr.length > 0 ? "" : "disabled-connection-button"}>Deselect All</button>
                <button onClick={submitGuess} className={`connection-board-button`} id={guessArr.length === 4 ? "" : "disabled-connection-button"}>Submit</button>
            </div>
        </div>
    )
}

export default ConnectionBoard
