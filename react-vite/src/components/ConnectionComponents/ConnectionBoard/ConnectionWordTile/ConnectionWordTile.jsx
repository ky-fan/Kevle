import { useEffect, useState } from 'react'
import './ConnectionWordTile.css'

export function ConnectionWordTile({ word, setGuessArr, guessArr }) {

    const [isSelected, setIsSelected] = useState(guessArr.includes(word))
    const [disableClick, setDisableClick] = useState('')



    const handleClick = e => {
        e.preventDefault()

        if (isSelected) {
            const newGuessArr = (guessArr.filter(ele => ele !== word))
            setGuessArr(newGuessArr)
            setIsSelected(false)
        } else {
            if (guessArr.length !== 4) {
                setGuessArr(guessArr => [...guessArr, word])
                setIsSelected(true)
            }
        }

        // if ((guessArr.length <= 3) && !(guessArr.includes(word))) {
        //     setGuessArr(guessArr => [...guessArr, word])
        //     setIsSelected('connections-word-tile-selected')
        // } else {
        //     setGuessArr(guessArr.filter(ele => ele !== word))
        //     setIsSelected('')
        // }
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
            <div className={`connections-word-tile ${disableClick}`} onClick={handleClick}>
                <h2>{word}</h2>
            </div>
        </div>
    )
}

export default ConnectionWordTile
