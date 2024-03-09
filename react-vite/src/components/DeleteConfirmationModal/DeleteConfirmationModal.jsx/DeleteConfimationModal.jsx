import './DeleteConfirmationModal.css'
import { useModal } from '../../../context/Modal';

export function DeleteConfirmationModal({ handleDelete, gameId }) {
    const { closeModal } = useModal();

    const deleteWrapper = async e => {
        e.preventDefault()
        await closeModal()
        await handleDelete(gameId)
    }

    const handleCancel = e => {
        e.preventDefault()
        closeModal()
    }

    return (
        <div className="login-modal-container">
            <div className="login-header-div">
                <h1>Are you sure you want to delete?</h1>
            </div>
            <div className='modal-button-container'>
                <button className="modal-button" onClick={handleCancel}>Cancel</button>
                <button className="modal-button" onClick={deleteWrapper}>Delete</button>
            </div>
        </div>
    );
}

export default DeleteConfirmationModal
