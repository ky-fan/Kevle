import './ConnectionBoard.css'
import { useState, useEffect } from 'react'
import ConnectionAnswerBar from './ConnectionAnswerBar/ConnectionAnswerBar'
import ConnectionTileRow from './ConnectionTileRow/ConnectionTileRow'
import { VscDebugRestart } from "react-icons/vsc";
import { FaCircle } from "react-icons/fa";

import { useModal } from '../../../context/Modal';
import ConnectionsEndModal from '../../ModalComponents/ConnectionsWinModal/ConnectionsEndModal';

export function ConnectionBoard({ connection }) {

    const [livesLeft, setLivesLeft] = useState(4)

    // Tracks game state, gameState[0] represents first row. If gameState[i] === 0, row is unsolved.
    // If [2,4,0,0], shows incomplete game where 2nd category solved first, 4th category solved second.
    const [gameState, setGameState] = useState([0, 0, 0, 0])

    // Tracks whether the game is won, lost, or being played
    const [gameStatus, setGameStatus] = useState('playing')

    // Selected words for each guess, need four words to submit
    const [guessArr, setGuessArr] = useState([])

    // Tracks guess history to show at end of game
    const [guessHistory, setGuessHistory] = useState([])

    // Contains the randomized answers
    const [shuffledArr, setShuffledArr] = useState([])

    // Contains the unsolved words
    const [remainingWords, setRemainingWords] = useState([])

    // Contains answers for each category
    const [answerObj, setAnswerObj] = useState({})

    const [answerSetObj, setAnswerSetObj] = useState({})

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

    useEffect(() => {
        // Initialize a shuffled array to be stored in state
        setShuffledArr(shuffle(connection.answers))
        setAnswerObj(
            {
                1: connection.answers?.slice(0, 4),
                2: connection.answers?.slice(4, 8),
                3: connection.answers?.slice(8, 12),
                4: connection.answers?.slice(12, 16)
            }
        )

        // Stores sets containing each group of answers for comparison to guesses
        setAnswerSetObj(
            {
                1: new Set(connection.answers?.slice(0, 4)),
                2: new Set(connection.answers?.slice(4, 8)),
                3: new Set(connection.answers?.slice(8, 12)),
                4: new Set(connection.answers?.slice(12, 16))
            }
        )
    }, [connection])

    //  const answerSetObj = {}
    //  for (let i = 1; i < 5; i++) {
    //      answerSetObj[i] = new Set(answerObj[i])
    //  }

    // Updates the displayed words on re-render
    useEffect(() => {
        // Check the gameState to see which categories have been solved and thus which words to filter out of the display

        let filteredWordsArr = shuffledArr?.slice(0)
        for (let i = 1; i < 5; i++) {
            if (gameState.includes(i)) filteredWordsArr = filteredWordsArr.filter(word => !(answerSetObj[i].has(word)))
        }
        setRemainingWords(filteredWordsArr)
    }, [connection, shuffledArr, gameState, answerSetObj])

    // Display win/loss modals
    const { setModalContent } = useModal();
    useEffect(() => {
        if (gameStatus === "won") {
            setModalContent(<ConnectionsEndModal didWin={true} guessHistory={guessHistory} answerSetObj={answerSetObj} />)
        }

        if (gameStatus === "lost") {
            setModalContent(<ConnectionsEndModal didWin={false} guessHistory={guessHistory} answerSetObj={answerSetObj} />)
        }

    }, [gameStatus, setModalContent, livesLeft, guessHistory, answerSetObj])



    if (!connection.categories) return

    const connectionArr = connection.categories

    // Stores [categoryNumber, category, answer1, answer2, answer3, answer4] to pass into ConnectionAnswerBar
    const categoryObj = {}
    for (let i = 1; i < 5; i++) {
        categoryObj[`category${i}`] = [i, connectionArr[i - 1]].concat(answerObj[i])
    }



    const checkGuess = () => {
        if (!guessArr.length) return
        // Record guess in history
        setGuessHistory([...guessHistory, [...guessArr]])

        // Check logic: iterate through each of the 4 rows to check for completion
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

                        // Game is won once the final row is solved
                        if (i === 3) {
                            console.log('check guess', gameState)
                            setGameStatus('won')
                            return
                        }
                        return
                    }
                }
            }
        }

        // Handle incorrect guess (no match)
        let lives = livesLeft - 1
        setLivesLeft(lives)

        // Lose the game if 4 incorrect guesses
        if (lives === 0) {
            const unsolvedCategories = [4, 3, 2, 1].filter(num => !(gameState.includes(num)))
            // Iterate through each row in gameState
            const newGameState = [...gameState]
            for (let i = 0; i < gameState.length; i++) {
                // For each unsolved row, remove the next easiest category from the unsolved categories and update gameState to display that category in that row
                if (gameState[i] === 0) {
                    newGameState[i] = unsolvedCategories.pop()
                }
            }
            // Display the solved game state (user-solved categories in original places)
            setGameState(newGameState)

            // Clear guess, game is lost
            setGuessArr([])
            setGameStatus('lost')
            return
        }
    }

    const handleReset = e => {
        e.preventDefault
        setLivesLeft(4)
        setGameState([0, 0, 0, 0])
        setGameStatus('playing')
        setGuessArr([])
        setShuffledArr(shuffle(connection.answers))
        setGuessHistory([])
    }

    if (!(gameState.length)) return
    return (
        <div className='connection-board-outside-wrapper'>
            <div className='connection-board-restart-container'>
                <VscDebugRestart onClick={handleReset} className='connection-details-button' title='Restart' />
            </div>
            <div className='connection-board-container'>
                <div className='connection-board-row'>
                    {gameState[0] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[0]]} />}
                    {gameState[0] === 0 && <ConnectionTileRow remainingWords={remainingWords} setGuessArr={setGuessArr} guessArr={guessArr} rowIndex={0} />}
                </div>
                <div className='connection-board-row'>
                    {gameState[1] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[1]]} />}
                    {gameState[1] === 0 && <ConnectionTileRow remainingWords={remainingWords} setGuessArr={setGuessArr} guessArr={guessArr} rowIndex={1} />}
                </div>
                <div className='connection-board-row'>
                    {gameState[2] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[2]]} />}
                    {gameState[2] === 0 && <ConnectionTileRow remainingWords={remainingWords} setGuessArr={setGuessArr} guessArr={guessArr} rowIndex={2} />}
                </div>
                <div className='connection-board-row'>
                    {gameState[3] > 0 && <ConnectionAnswerBar category={categoryObj[`category` + gameState[3]]} />}
                    {gameState[3] === 0 && <ConnectionTileRow remainingWords={remainingWords} setGuessArr={setGuessArr} guessArr={guessArr} rowIndex={3} />}
                </div>

                <div className='connection-board-mistakes-container'>
                    <p>Mistakes Remaining:</p>
                    {/* Creating a array with livesLeft elements and mapping to repeat the life element*/}
                    {[...Array(livesLeft)].map((e, i) => <FaCircle key={i} className='connection-board-life-counter' />)}
                </div>

                <div className='connection-board-button-container'>
                    <button onClick={() => setShuffledArr(shuffle(connection.answers))} className={`connection-board-button click-swing`} id={gameStatus === 'playing' ? "" : "disabled-connection-button"}>Shuffle</button>
                    <button onClick={() => setGuessArr([])} className={`connection-board-button`} id={guessArr.length > 0 ? "" : "disabled-connection-button"}>Deselect All</button>
                    <button onClick={checkGuess} className={`connection-board-button`} id={guessArr.length === 4 ? "" : "disabled-connection-button"}>Submit</button>
                </div>
            </div >
        </div>
    )
}

export default ConnectionBoard
