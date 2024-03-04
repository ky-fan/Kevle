import { useEffect, useState } from 'react'
import './ConnectionWordTile.css'

export function ConnectionWordTile({ word, setGuessArr, guessArr }) {


    const [isSelected, setIsSelected] = useState('')
    const [disableClick, setDisableClick] = useState('')

    function handleClick(e) {
        e.preventDefault()

        if ((guessArr.length <= 3) && !(guessArr.includes(word))) {
            setGuessArr(guessArr => [...guessArr, word])
            setIsSelected('connections-word-tile-selected')
            console.log('isSelected is', isSelected)
        } else {
            setGuessArr(guessArr.filter(ele => ele !== word))
            setIsSelected('')
        }
    }

    useEffect(() => {

        if (guessArr.length === 4 && !(guessArr.includes(word))) {
            setDisableClick('no-click')
        } else {
            setDisableClick('')
        }
    }, [guessArr, word])

    return (
        <div className='connections-word-tile-container' >
            <div className={`connections-word-tile ${isSelected} ${disableClick}`} onClick={handleClick}>
                <h2>{word}</h2>
            </div>
        </div>
    )
}

export default ConnectionWordTile
