import './ConnectionTileRow.css'
import ConnectionWordTile from '../ConnectionWordTile/ConnectionWordTile'

export function ConnectionTileRow({ remainingWords, setGuessArr, guessArr, rowIndex }) {
    if (!remainingWords) return
    let words = []

    switch (rowIndex) {
        case 0:
            words = remainingWords.slice(0, 4)
            break
        case 1:
            if (remainingWords.length === 16) words = remainingWords.slice(4, 8)
            if (remainingWords.length === 12) words = remainingWords.slice(0, 4)
            break
        case 2:
            if (remainingWords.length === 16) words = remainingWords.slice(8, 12)
            if (remainingWords.length === 12) words = remainingWords.slice(4, 8)
            if (remainingWords.length === 8) words = remainingWords.slice(0, 4)
            break
        case 3:
            if (remainingWords.length === 16) words = remainingWords.slice(12, 16)
            if (remainingWords.length === 12) words = remainingWords.slice(8, 12)
            if (remainingWords.length === 8) words = remainingWords.slice(4, 8)
            if (remainingWords.length === 4) words = remainingWords.slice(0, 4)
            break
    }

    return (
        <>
            {words?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
        </>
    )
}

export default ConnectionTileRow
