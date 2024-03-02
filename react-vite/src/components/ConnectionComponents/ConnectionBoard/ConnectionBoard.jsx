import ConnectionWordTile from '../ConnectionWordTile/ConnectionWordTile'
import './ConnectionBoard.css'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export function ConnectionBoard({ connectionId }) {
    const connection = useSelector(state => state.connections[connectionId])

    const [randomRows, setRandomRows] = useState([])

    const category1 = connection?.categories[0]
    const category2 = connection?.categories[1]
    const category3 = connection?.categories[2]
    const category4 = connection?.categories[3]

    const answerArr = connection?.answers

    const category1Answers = answerArr?.slice(0, 4)
    const category2Answers = answerArr?.slice(4, 8)
    const category3Answers = answerArr?.slice(8, 12)
    const category4Answers = answerArr?.slice(12, 16)

    function shuffle(arr) {
        // for (i = arr.length - 1)

    }

    const randomAnswers = shuffle(answerArr)


    return (
        <div className='connection-board-container'>
            {answerArr?.map(word => (
                <ConnectionWordTile key={word} word={word} />
            ))}
        </div>
    )
}

export default ConnectionBoard
