import './ConnectionTileRow.css'
import ConnectionWordTile from '../ConnectionWordTile/ConnectionWordTile'

export function ConnectionTileRow(words, setGuessArr, guessArr) {
    console.log('words', words)
    if (!words) return
    return (
        <div>
            {words?.map(word => (<ConnectionWordTile key={word} word={word} setGuessArr={setGuessArr} guessArr={guessArr} />))}
        </div>
    )
}

export default ConnectionTileRow
