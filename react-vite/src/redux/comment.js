// Action types
export const LOAD_COMMENTS = 'comments/loadComments'
export const LOAD_COMMENT_BY_ID = 'comments/loadCommentById'
export const CREATE_COMMENT = 'comments/createComment'
export const UPDATE_COMMENT = 'comments/updateComment'
export const DELETE_COMMENT = 'comments/deleteComment'
export const CLEAR_COMMENTS = 'comments/clearComments'

// Action creators
export const loadComments = comments => ({
    type: LOAD_COMMENTS,
    payload: comments
})

export const loadCommentById = comment => ({
    type: LOAD_COMMENTS,
    comment
})

export const createComment = comment => ({
    type: CREATE_COMMENT,
    comment
})

export const updateComment = comment => ({
    type: UPDATE_COMMENT,
    comment
})

export const deleteComment = commentId => ({
    type: DELETE_COMMENT,
    commentId
})

export const clearComments = () => ({
    type: CLEAR_COMMENTS
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

export const thunkCreateComment = comment => async dispatch => {
    const res = await fetch('/api/comments/', {
        method: 'POST',
        body: comment
    })

    if (res.ok) {
        const newComment = await res.json()
        dispatch(createComment(newComment))
        return newComment
    } else return { 'message': 'new comments thunk error' }
}

export const thunkUpdateComment = (commentId, comment) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        body: comment
    })

    if (res.ok) {
        const updatedComment = await res.json()
        dispatch(updateComment(updatedComment))
        return updatedComment
    } else return { 'message': 'update comments thunk error' }
}

export const thunkDeleteComment = commentId => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const deleteConfirmation = await res.json()
        dispatch(deleteComment(commentId))
        return deleteConfirmation
    } else return { 'message': 'delete comments thunk error' }
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

        case CREATE_COMMENT: {
            const newCommentState = { ...state }
            newCommentState[action.comment.id] = action.comment
            return newCommentState
        }

        case UPDATE_COMMENT: {
            const newCommentState = { ...state }
            newCommentState[action.comment.id] = action.comment
            return newCommentState
        }

        case DELETE_COMMENT: {
            const newCommentState = { ...state }
            delete newCommentState[action.commentId]
            return newCommentState
        }

        case CLEAR_COMMENTS: {
            return {}
        }

        default:
            return state
    }
}

export default commentReducer
