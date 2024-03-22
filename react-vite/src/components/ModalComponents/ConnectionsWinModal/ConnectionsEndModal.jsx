import './ConnectionsEndModal.css'

import { useModal } from '../../../context/Modal';
import { useNavigate } from 'react-router-dom';


export function ConnectionsEndModal({ didWin, guessHistory, answerSetObj }) {
    const { closeModal } = useModal();
    const navigate = useNavigate()

    const guessTiles = guessHistory.slice(0)

    for (const guessArr of guessTiles) {
        for (let i = 0; i < guessArr.length; i++) {

            if (answerSetObj[1].has(guessArr[i])) {
                guessArr[i] = "🟨"
            } else if (answerSetObj[2].has(guessArr[i])) {
                guessArr[i] = "🟩"
            } else if (answerSetObj[3].has(guessArr[i])) {
                guessArr[i] = "🟦"
            } else if (answerSetObj[4].has(guessArr[i])) {
                guessArr[i] = "🟪"
            }
        }
        guessArr.join("")
    }

    const handleCancel = e => {
        e.preventDefault()
        closeModal()
    }

    const toIndex = e => {
        e.preventDefault()
        closeModal()
        navigate('/connections')
    }

    // const handleShare = e => {
    //     e.preventDefault()
    //     const guessStr = guessTiles.slice(0).join(" ")

    // }

    return (
        <div className="login-modal-container">
            <div className="login-header-div">
                {didWin && <h1>YOU WON</h1>}
                {!didWin && <h1>NEXT TIME</h1>}
            </div>
            <div className='connections-win-modal-body'>
                <div className="connections-win-modal-guesses">
                    {guessTiles?.map((guess, i) => <span key={i} > {guess} </span>)}
                </div>
                <p>
                    <span>
                        {/* {didWin && <span>{`You won this game in ${numGuess} guesses!`}<br /><br /></span>} */}
                        Click on the reset button in the top right to play again, the share button to copy your guesses into your clipboard, or click on the &quot;See More&quot; to see more Connections Games.<br /><br />
                    </span>
                </p>
            </div>
            <div className='modal-button-container'>
                <button className="modal-button" onClick={handleCancel}>Close</button>
                {/* <button className='modal-button' onClick={handleShare}>Share</button> */}
                <button className='modal-button' onClick={toIndex}>See More</button>
            </div>
        </div>
    );
}

export default ConnectionsEndModal
