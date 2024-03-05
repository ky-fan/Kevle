import ConnectionWordTile from './ConnectionWordTile/ConnectionWordTile'
import './ConnectionBoard.css'
import { useSelector } from 'react-redux'
import { useState, useEffect, useCallback } from 'react'
import ConnectionAnswerBar from './ConnectionAnswerBar/ConnectionAnswerBar'

export function ConnectionBoard({ connection }) {

    const [numWrongGuesses, setNumWrongGuesses] = useState(0)

    // Tracks game state, gameState[0] represents first row. If gameState[i] === 0, row is unsolved.
    // If [2,4,0,0], shows incomplete game where 2nd category solved first, 4th category solved second.
    const [gameState, setGameState] = useState([2, 0, 0, 0])

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
        function filteredWords() {
            const filteredWordsArr = []
            if (gameState.includes(1) && answerArr) filteredWordsArr.push(...answerArr.slice(0, 4))
            if (gameState.includes(2) && answerArr) filteredWordsArr.push(...answerArr.slice(4, 8))
            if (gameState.includes(3) && answerArr) filteredWordsArr.push(...answerArr.slice(8, 12))
            if (gameState.includes(4) && answerArr) filteredWordsArr.push(...answerArr.slice(12, 16))

            return filteredWordsArr
        }
        if (!shuffledArr) return
        setDisplayArr(shuffledArr.filter(word => !filteredWords().includes(word)))
    }, [connection, shuffledArr, gameState, answerArr, guessArr])

    // useEffect(() => {

    //     setDisplayArr(shuffledArr.filter(word => filteredWords().includes(word)))
    // }, [gameState, shuffledArr, filteredWords])


    if (!answerArr) return
    // console.log("this is shuffled ", shuffledArr)
    // console.log(connection.answers)

    if (!connection.categories) return

    const connectionArr = connection.categories

    // console.log('these are categories', connection.categories)

    // Stores [categoryNumber, category, answer1, answer2, answer3, answer4] to pass into ConnectionAnswerBar
    const categoryObj = {}
    categoryObj.category1 = [1, connectionArr[0]].concat(answerArr?.slice(0, 4))
    categoryObj.category2 = [2, connectionArr[1]].concat(answerArr?.slice(4, 8))
    categoryObj.category3 = [3, connectionArr[2]].concat(answerArr?.slice(8, 12))
    categoryObj.category4 = [4, connectionArr[3]].concat(answerArr?.slice(12, 16))

    const answerObj = {}
    answerObj[1] = new Set(answerArr.slice(0, 4))
    answerObj[2] = new Set(answerArr.slice(4, 8))
    answerObj[3] = new Set(answerArr.slice(8, 12))
    answerObj[4] = new Set(answerArr.slice(12, 16))

    const submitGuess = e => {
        e.preventDefault()

        const guessSet = new Set(guessArr)
        // if no solved rows
        if (gameState[0] === 0) {

            // check every answer set
            for (let answerSetNum in answerObj) {

                // check if guess set has every word in the answer set
                if ([...guessSet].every(word => answerObj[answerSetNum].has(word))) {

                    //if correct then updated gamestate
                    console.log(answerSetNum)
                    setGameState([answerSetNum, 0, 0, 0])
                    setDisplayArr(shuffledArr.filter(word => !(guessSet.has(word))))
                    console.log('filter?', shuffledArr.filter(word => !(guessSet.has(word))))
                    console.log(displayArr)
                    return
                }
            }
        }

        // if one solved row
        if (gameState[1] === 0) {

            // check every answer set
            for (let answerSetNum in answerObj) {

                // check if guess set has every word in the answer set
                if ([...guessSet].every(word => answerObj[answerSetNum].has(word))) {

                    //if correct then updated gamestate
                    console.log(answerSetNum)
                    const newGameState = [...gameState]
                    newGameState[1] = answerSetNum
                    setGameState(newGameState)
                    setDisplayArr(shuffledArr.filter(word => !(guessSet.has(word))))
                    console.log('filter?', shuffledArr.filter(word => !(guessSet.has(word))))
                    console.log(displayArr)
                }
            }
        }

    }


    if (!displayArr) return

    return (
        <div className='connection-board-container'>
            {/* {console.log('filtered', filteredWords())} */}
            {console.log('guessArr ', guessArr)}
            {/* {console.log('displayArr', displayArr)} */}
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
            {/* {answerArr?.map(word => (
                <ConnectionWordTile key={word} word={word} />
            ))} */}

            <div className='connection-board-button-container'>
                <button onClick={submitGuess} className={`connection-board-submit-button`} id={guessArr.length === 4 ? "" : "no-click"}>Submit</button>
            </div>
        </div>
    )
}

export default ConnectionBoard
