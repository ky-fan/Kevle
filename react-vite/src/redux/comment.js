// Action types
export const LOAD_COMMENTS = 'comments/loadComments'
export const LOAD_COMMENT_BY_ID = 'comments/loadCommentById'

// Action creators
export const loadComments = comments => ({
    type: LOAD_COMMENTS,
    payload: comments
})

// Thunk action creators
export const thunkFetchComments = () => async dispatch => {
    const res = await fetch('/api/comments')

    if (res.ok) {
        const comments = await res.json()
        dispatch(loadComments(comments))
    } else return { 'message': 'fetch comments thunk error' }
}

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newCommentState = { ...state }
            action.playload.comments.forEach(comment => { newCommentState[comment.id] = comment })
            return newCommentState
        }

        default:
            return state
    }
}

export default commentReducer
