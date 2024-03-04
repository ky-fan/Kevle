import './ConnectionWordTile.css'

export function ConnectionWordTile({ word }) {



    return (
        <div className='connections-word-tile-container'>
            <div className='connections-word-tile'>
                <h2>{word}</h2>
            </div>
        </div>
    )
}

export default ConnectionWordTile
