import './CommentCard.css'

export function CommentCard({ comment }) {
    return (
        <div>
            <p>{comment.authorName}</p>
            <p>{comment.commentText}</p>
        </div>
    )
}

export default CommentCard
