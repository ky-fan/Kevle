import { useState } from 'react'
import CommentCard from '../CommentCard/CommentCard'
import './CommentsIndex.css'
import { useDispatch, useSelector } from 'react-redux'
import { thunkCreateComment, thunkUpdateComment } from '../../../redux/comment'

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

    return (
        <div className='comments-index-container'>
            <div className='comments-index-form-container' >
                <textarea placeholder='140 char limit' value={commentText} onChange={e => setCommentText(e.target.value)} />
                {!isUpdate && <button onClick={handleCreate}>Submit Comment</button>}
                {isUpdate && <button onClick={handleUpdate}>Update Comment</button>}
            </div>

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
