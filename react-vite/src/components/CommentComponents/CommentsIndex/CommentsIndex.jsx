import CommentCard from '../CommentCard/CommentCard'
import './CommentsIndex.css'

export function CommentsIndex({ commentsArr }) {



    return (
        <div className='comments-index-container'>
            {commentsArr.map(comment => <CommentCard comment={comment} key={comment.id} />)}
        </div>
    )
}

export default CommentsIndex
