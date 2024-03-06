import { useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import './CommentsIndex.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment, thunkUpdateComment } from '../../../redux/comment'
import { FaUserCircle } from 'react-icons/fa';

export function CommentsIndex({ commentsArr, connectionId }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const [commentText, setCommentText] = useState("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [updateCommentId, setUpdateCommentId] = useState(0)
    const [valErrors, setValErrors] = useState("")

    const handleSubmit = e => {
        e.preventDefault
        const errObj = {}
        if (commentText.length > 140 && commentText.length !== 0) errObj.commentText = "Comment must be less than 140 characters"

        if (Object.values(errObj).length) {
            setValErrors(errObj)
        } else {
            const formData = new FormData()
            formData.append('connection_id', connectionId)
            formData.append('comment_text', commentText)

            if (updateCommentId) {
                dispatch(thunkUpdateComment(updateCommentId, formData))
                setIsUpdate(false)
                setUpdateCommentId(0)
            } else {
                dispatch(thunkCreateComment(formData))
            }
            setCommentText("")
        }
    }

    const handleCancel = e => {
        e.preventDefault()

        setValErrors({})
        setCommentText("")
        setIsUpdate(false)
        setUpdateCommentId(0)
    }


    return (
        <div className='comments-index-container'>
            {user &&
                <div className='comments-index-form-container' >
                    <div className='comments-index-form-user-icon-container'>
                        <FaUserCircle className='user-profile-button no-click' />
                    </div>
                    <div className='comments-index-form-user-input-container'>
                        <h4>{user.username}</h4>
                        <textarea placeholder='Add a comment... (140 character limit)' value={commentText} onChange={e => setCommentText(e.target.value)} />
                        <div className='comments-index-form-button-container'>

                            {valErrors.commentText && <p>{valErrors.commentText}</p>}
                            {isUpdate && <button onClick={handleCancel}>Cancel Update</button>}
                            <button className={` ${commentText ? "" : "disabled-comment-submit-button"}`} onClick={handleSubmit}>{isUpdate ? 'Update Comment' : 'Comment'}</button>
                            <div className='comments-index-form-error-container'>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='comments-index-card-container'>
                {commentsArr.map(comment => <CommentCard comment={comment} key={comment.id} currentUser={user} setIsUpdate={setIsUpdate} setCommentText={setCommentText} setUpdateCommentId={setUpdateCommentId} setValErrors={setValErrors} />)}
            </div>
        </div>
    )
}

export default CommentsIndex
