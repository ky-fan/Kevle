import ConnectionWordTile from './ConnectionWordTile/ConnectionWordTile'
import './ConnectionBoard.css'
import { useSelector } from 'react-redux'
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
    const answerArr = connection.answers


    useEffect(() => {
        setShuffledArr(shuffle(connection.answers))
    }, [connection])

    useEffect(() => {
        let filteredWordsArr = []
        function filteredWords() {
            if (gameState.includes(1)) filteredWordsArr.push(...answerArr.slice(0, 4))
            if (gameState.includes(2)) filteredWordsArr.push(...answerArr.slice(4, 8))
            if (gameState.includes(3)) filteredWordsArr.push(...answerArr.slice(8, 12))
            if (gameState.includes(4)) filteredWordsArr.push(...answerArr.slice(12, 16))

            return filteredWordsArr
        }
        filteredWords()

        if (!shuffledArr) return
        setDisplayArr(shuffledArr.filter(word => !(filteredWordsArr.includes(word))))
    }, [connection, shuffledArr, gameState, answerArr, guessArr, numWrongGuesses])

    // Implement useEffect to check game status
    useEffect(() => {
        if (gameState[3] > 0) {
            setGameStatus('won')
            alert('YOU WON (This will be replaced by a modal)')
        }


        if (numWrongGuesses >= 4) {
            const unsolvedCategories = [1, 2, 3, 4].filter(num => !(gameState.includes(num)))
            console.log('unsolvedCatgories', unsolvedCategories)
            for (let i = 0; i < gameState.length; i++) {
                if (gameState[i] === 0) {
                    const newGameState = gameState
                    newGameState[i] = unsolvedCategories.splice(0, 1)
                    setGameState[newGameState]
                }
            }
            setGuessArr([])
            setGameStatus('lost')
            alert('UH OH, YOU LOST (This will be replaced by a modal)')
            return
        }

    }, [gameState, numWrongGuesses])

    // Style answer bar
    // Win/loss modals
    // how to play modal

    if (!answerArr) return

    if (!connection.categories) return

    const connectionArr = connection.categories

    // Stores [categoryNumber, category, answer1, answer2, answer3, answer4] to pass into ConnectionAnswerBar
    const categoryObj = {}
    categoryObj.category1 = [1, connectionArr[0]].concat(answerArr?.slice(0, 4))
    categoryObj.category2 = [2, connectionArr[1]].concat(answerArr?.slice(4, 8))
    categoryObj.category3 = [3, connectionArr[2]].concat(answerArr?.slice(8, 12))
    categoryObj.category4 = [4, connectionArr[3]].concat(answerArr?.slice(12, 16))

    // Stores sets containing each set of answers for comparison to guesses
    const answerObj = {}
    answerObj[1] = new Set(answerArr.slice(0, 4))
    answerObj[2] = new Set(answerArr.slice(4, 8))
    answerObj[3] = new Set(answerArr.slice(8, 12))
    answerObj[4] = new Set(answerArr.slice(12, 16))

    const submitGuess = e => {
        e.preventDefault()
        // iterate through each of the 4 rows to check for completion
        for (let i = 0; i < 4; i++) {
            // if the current row is incomplete
            if (gameState[i] === 0) {
                // iter through each of the 4 sets of answers
                for (let answerSetNum in answerObj) {
                    // check if the guess matches any of the answer sets
                    if (guessArr.every(word => answerObj[answerSetNum].has(word))) {
                        // update gamestate if there's a match
                        const newGameState = [...gameState]
                        newGameState[i] = parseInt(answerSetNum)
                        setGameState(newGameState)

                        // empty the guess
                        setGuessArr([])
                        return
                    }
                }
            }
        }
        let guesses = numWrongGuesses + 1
        setNumWrongGuesses(guesses)
    }

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

            <div className='connection-board-button-container'>
                <p>{4 - numWrongGuesses} Lives Remaining</p>
                <button onClick={() => setShuffledArr(shuffle(connection.answers))} className={`connection-board-submit-button`} id={gameStatus === 'playing' ? "" : "no-click"}>Shuffle</button>
                <button onClick={() => setGuessArr([])} className={`connection-board-submit-button`} id={guessArr.length > 0 ? "" : "no-click"}>Deselect All</button>
                <button onClick={submitGuess} className={`connection-board-submit-button`} id={guessArr.length === 4 ? "" : "no-click"}>Submit</button>
            </div>
        </div>
    )
}

export default ConnectionBoard
