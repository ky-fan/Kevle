import './ConnectionsEndModal.css'

import { useModal } from '../../../context/Modal';
import { useNavigate } from 'react-router-dom';


export function ConnectionsEndModal({ numGuess, didWin }) {
    const { closeModal } = useModal();
    const navigate = useNavigate()


    const handleCancel = e => {
        e.preventDefault()
        closeModal()
    }

    const toIndex = e => {
        e.preventDefault()
        closeModal()
        navigate('/connections')
    }

    return (
        <div className="login-modal-container">
            <div className="login-header-div">
                {didWin && <h1>YOU WON</h1>}
                {!didWin && <h1>NEXT TIME</h1>}
            </div>
            <div className='connections-win-modal-body'>
                <p>

                    <span>
                        {didWin && <span>{`You won this game in ${numGuess} guesses!`}<br /><br /></span>}
                        Click on the reset button in the top right to play again, or click on the &quot;See More&quot; to see more Connections Games.<br /><br />
                    </span>
                </p>
            </div>
            <div className='modal-button-container'>
                <button className="modal-button" onClick={handleCancel}>Close</button>
                <button className='modal-button' onClick={toIndex}>See More</button>
            </div>
        </div>
    );
}

export default ConnectionsEndModal
