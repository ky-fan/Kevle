// action types
export const LOAD_CONNECTIONS = 'connections/loadConnections'

// action creators
export const loadConnections = connections => ({
    type: LOAD_CONNECTIONS,
    payload: connections
})

// thunk action creators
export const thunkFetchConnections = () => async dispatch => {
    const res = await fetch('/api/connections')

    if (res.ok) {
        const connections = await res.json()
        dispatch(loadConnections(connections))
    } else return { 'message': 'fetch connections thunk error' }
}

const connectionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CONNECTIONS: {
            const newConnectionState = { ...state }
            action.payload.connections.forEach(connection => { newConnectionState[connection.id] = connection })
            return newConnectionState
        }

        default:
            return state
    }
}

export default connectionReducer
