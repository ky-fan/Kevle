import { useDispatch } from 'react-redux'
import './CommentCard.css'
import { thunkDeleteComment } from '../../../redux/comment'
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";


export function CommentCard({ comment, currentUser, setIsUpdate, setCommentText, setUpdateCommentId, setValErrors }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isOwner = (currentUser?.id === comment?.userId)

    const handleDelete = e => {
        e.preventDefault()
        dispatch(thunkDeleteComment(comment?.id))
        setValErrors({})
    }

    const handleUpdate = e => {
        e.preventDefault()

        window.scrollTo({
            top: 500,
            behavior: "smooth"
        })
        setValErrors({})
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

            <div className="comment-card-button-container">
                {isOwner && <FaRegEdit className='comment-card-button' onClick={handleUpdate} title='Update' />}
                {isOwner && <MdDeleteOutline className='comment-card-button' onClick={handleDelete} title='Delete' />}
            </div>
        </div>
    )
}

export default CommentCard
