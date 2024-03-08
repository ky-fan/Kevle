import { useEffect, useState } from 'react'
import './ConnectionWordTile.css'

export function ConnectionWordTile({ word, setGuessArr, guessArr }) {
    const [disableClick, setDisableClick] = useState('')

    let isSelected = guessArr.includes(word)

    const handleClick = e => {
        e.preventDefault()

        if (isSelected) {
            const newGuessArr = (guessArr.filter(ele => ele !== word))
            setGuessArr(newGuessArr)
        } else {
            if (guessArr.length !== 4) {
                setGuessArr(guessArr => [...guessArr, word])
            }
        }
    }

    useEffect(() => {
        if (guessArr.length === 4 && !(isSelected)) {
            setDisableClick('no-click')
        } else {
            setDisableClick('')
        }
    }, [guessArr, word, isSelected])

    return (
        <div className='connections-word-tile-container' >
            <div className={`connections-word-tile ${disableClick}`} id={isSelected ? 'connections-word-tile-selected' : ''} onClick={handleClick}>
                <h2>{word.toUpperCase()}</h2>
            </div>
        </div>
    )
}

export default ConnectionWordTile
