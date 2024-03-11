import './ConnectionsInfoModal.css'
import { useModal } from '../../../context/Modal';

export function ConnectionsInfoModal() {
    const { closeModal } = useModal();


    const handleCancel = e => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="login-modal-container">
            <div className="login-header-div">
                <h2>How to Play - from NYT Connections</h2>
            </div>
            <div className='connections-info-modal-body'>
                <p>
                    <span>
                        Find groups of four items that share something in common. <br /><br />

                        Select four items and tap &apos;<b>Submit</b>&apos; to check if your guess is correct.<br />
                        Find the groups without making 4 mistakes! <br /><br />

                        <b>Category Examples:</b><br />
                        FISH: Bass, Flounder, Salmon, Trout<br />
                        FIRE ___: Ant, Drill, Island, Opal<br /><br />

                        Categories should be more specific than &quot;5-LETTER-WORD,&quot; &quot;NAMES,&quot; or &quot;VERBS.&quot;<br /><br />

                        Each puzzle has exactly one solution. Watch out for words that seem to belong to multiple categories!<br />
                    </span>
                </p>
            </div>
            <div className='modal-button-container'>
                <button className="modal-button" onClick={handleCancel}>Close</button>
            </div>
        </div>
    );
}

export default ConnectionsInfoModal
