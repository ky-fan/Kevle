import ConnectionWordTile from './ConnectionWordTile/ConnectionWordTile'
import './ConnectionBoard.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import ConnectionAnswerBar from './ConnectionAnswerBar/ConnectionAnswerBar'

export function ConnectionBoard({ connectionId }) {
    const connection = useSelector(state => state.connections[connectionId])

    const [numGuesses, setNumGuesses] = useState(0)

    // Tracks game state, gameState[0] represents first row. If gameState[i] === 0, row is unsolved.
    // If [2,4,0,0], shows incomplete game where 2nd category solved first, 4th category solved second.
    const [gameState, setGameState] = useState([0, 0, 0, 0])

    const [guess, setGuess] = useState([])

    // Contains the randomized answers
    const [shuffledArr, setShuffledArr] = useState([])

    // function shuffle(arr) {
    //     for (let i = arr.length - 1; i < 0; i--) {
    //         let j = Math.floor(Math.random() * (i + 1))
    //         let temp = arr[i]
    //         arr[i] = arr[j]
    //         arr[j] = temp
    //     }
    //     return arr
    // }

    const answerArr = connection?.answers

    console.log("this is shuffled ", shuffledArr)

    // Stores [categoryNumber, category, answer1, answer2, answer3, answer4] to pass into ConnectionAnswerBar
    const categoryObj = {}
    categoryObj.category1 = [1, connection?.categories[0]].concat(answerArr?.slice(0, 4))
    categoryObj.category2 = [2, connection?.categories[1]].concat(answerArr?.slice(4, 8))
    categoryObj.category3 = [3, connection?.categories[2]].concat(answerArr?.slice(8, 12))
    categoryObj.category4 = [4, connection?.categories[3]].concat(answerArr?.slice(12, 16))

    const shuffledFirstRow = answerArr?.slice(0, 4)

    // const randomAnswers = shuffle(answerArr)


    return (
        <div className='connection-board-container'>
            <div className='connection-board-row'>
                {gameState[0] > 0 && <ConnectionAnswerBar category={categoryObj[`category${gameState[0]}`]} />}
                {gameState[0] === 0 && shuffledFirstRow?.map(word => (<ConnectionWordTile key={word} word={word} />))}
            </div>
            <div className='connection-board-row'>
                {gameState[1] > 0 && <ConnectionAnswerBar category={categoryObj[`category${gameState[1]}`]} />}
            </div>
            <div className='connection-board-row'>
                {gameState[2] > 0 && <ConnectionAnswerBar category={categoryObj[`category${gameState[2]}`]} />}
            </div>
            <div className='connection-board-row'>
                {gameState[3] > 0 && <ConnectionAnswerBar category={categoryObj[`category${gameState[3]}`]} />}
            </div>
            {/* {answerArr?.map(word => (
                <ConnectionWordTile key={word} word={word} />
            ))} */}
        </div>
    )
}

export default ConnectionBoard
