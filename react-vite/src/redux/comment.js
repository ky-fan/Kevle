// Action types
export const LOAD_COMMENTS = 'comments/loadComments'
export const LOAD_COMMENT_BY_ID = 'comments/loadCommentById'

// Action creators
export const loadComments = comments => ({
    type: LOAD_COMMENTS,
    payload: comments
})

export const loadCommentById = comment => ({
    type: LOAD_COMMENTS,
    comment
})

// Thunk action creators
export const thunkFetchComments = () => async dispatch => {
    const res = await fetch('/api/comments')

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
    } else return { 'message': 'fetch comments thunk error' }
}

export const thunkFetchCommentById = commentId => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`)
    if (res.ok) {
        const comment = await res.json()
        dispatch(loadCommentById(comment))
        return comment
    } else return { 'message': 'fetch comment by id thunk error' }
}

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newCommentState = { ...state }
            action.playload.comments.forEach(comment => { newCommentState[comment.id] = comment })
            return newCommentState
        }

        case LOAD_COMMENT_BY_ID: {
            const newCommentState = { ...state }
            newCommentState[action.comment.id] = action.comment
            return newCommentState
        }

        default:
            return state
    }
}

export default commentReducer
