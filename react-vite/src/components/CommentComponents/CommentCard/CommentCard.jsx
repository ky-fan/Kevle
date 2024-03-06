import { useDispatch } from 'react-redux'
import './CommentCard.css'
import { thunkDeleteComment } from '../../../redux/comment'

export function CommentCard({ comment, isOwner, setIsUpdate, setCommentText, setUpdateCommentId }) {
    const dispatch = useDispatch()

    const handleDelete = e => {
        e.preventDefault()
        dispatch(thunkDeleteComment(comment.id))
    }

    const handleUpdate = e => {
        e.preventDefault()
        setIsUpdate(true)
        setUpdateCommentId(comment.id)
        setCommentText(comment.commentText)
    }
    return (
        <div>
            <p>{comment.authorName}</p>
            <p>{comment.commentText}</p>

            <div>
                {isOwner && <button onClick={handleUpdate}>Update</button>}
                {isOwner && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
    )
}

export default CommentCard
