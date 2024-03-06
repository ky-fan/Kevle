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


    const handleCreate = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('connection_id', connectionId)
        formData.append('comment_text', commentText)

        dispatch(thunkCreateComment(formData))
        setCommentText("")
    }

    const handleUpdate = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('connection_id', connectionId)
        formData.append('comment_text', commentText)

        dispatch(thunkUpdateComment(updateCommentId, formData))
        setCommentText("")
        setIsUpdate(false)
        setUpdateCommentId(0)
    }

    const handleCancel = e => {
        e.preventDefault()

        setCommentText("")
        setIsUpdate(false)
        setUpdateCommentId(0)
    }

    return (
        <div className='comments-index-container'>
            {user &&
                <div className='comments-index-form-container' >
                    <div className='comments-index-form-user-icon-container'>
                        <FaUserCircle className='user-profile-button' />
                    </div>
                    <div className='comments-index-form-user-input-container'>
                        <h4>{user.username}</h4>
                        <textarea placeholder='Add a comment... (140 character limit)' value={commentText} onChange={e => setCommentText(e.target.value)} />
                        <div className='comments-index-form-button-container'>
                            {isUpdate && <button onClick={handleCancel}>Cancel Update</button>}
                            {!isUpdate && <button onClick={handleCreate}>Submit Comment</button>}
                            {isUpdate && <button onClick={handleUpdate}>Update Comment</button>}
                        </div>
                    </div>
                </div>
            }

            {/* {
                isUpdate &&
                <div>
                    <textarea placeholder='140 char limit' value={commentText} onChange={e => setCommentText(e.target.value)} />
                    <button onClick={handleUpdate}>Update Comment</button>
                </div>
            } */}


            {commentsArr.map(comment => <CommentCard comment={comment} key={comment.id} isOwner={parseInt(user?.id) === comment.userId} setIsUpdate={setIsUpdate} setCommentText={setCommentText} setUpdateCommentId={setUpdateCommentId} />)}
        </div>
    )
}

export default CommentsIndex
