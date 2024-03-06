import { useDispatch } from 'react-redux'
import './CommentCard.css'
import { thunkDeleteComment } from '../../../redux/comment'
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

export function CommentCard({ comment, currentUser, setIsUpdate, setCommentText, setUpdateCommentId }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isOwner = (currentUser?.id === comment?.userId)

    const handleDelete = e => {
        e.preventDefault()
        dispatch(thunkDeleteComment(comment?.id))
    }

    const handleUpdate = e => {
        e.preventDefault()

        window.scrollTo({
            top: 500,
            behavior: "smooth"
        })
        setIsUpdate(true)
        setUpdateCommentId(comment?.id)
        setCommentText(comment?.commentText)
    }
    return (
        <div className='comment-card-container'>
            <div className='comments-index-form-user-icon-container'>
                <FaUserCircle className='user-profile-button' onClick={() => navigate(`/users/${comment?.userId}`)} />
            </div>
            <div className='comment-card-content'>
                <h4>{comment?.authorName}</h4>
                <p>{comment?.commentText}</p>
            </div>

            <div>
                {isOwner && <button onClick={handleUpdate}>Update</button>}
                {isOwner && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    )
}

export default CommentCard
