// action types
export const LOAD_CONNECTIONS = 'connections/loadConnections'
export const LOAD_CONNECTION_BY_ID = 'connections/loadConnectionById'

// action creators
export const loadConnections = connections => ({
    type: LOAD_CONNECTIONS,
    payload: connections
})

export const loadConnectionById = connection => ({
    type: LOAD_CONNECTION_BY_ID,
    connection
})

// thunk action creators
export const thunkFetchConnections = () => async dispatch => {
    const res = await fetch('/api/connections')

    if (res.ok) {
        const connections = await res.json()
        dispatch(loadConnections(connections))
    } else return { 'message': 'fetch connections thunk error' }
}

export const thunkFetchConnectionById = connectionId => async dispatch => {
    const res = await fetch(`/api/connections/${connectionId}`)
    if (res.ok) {
        const connection = await res.json()
        dispatch(loadConnectionById(connection))
        return connection
    } else return { 'message': 'fetch connections by id thunk error' }
}

const connectionReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_CONNECTIONS: {
            const newConnectionState = { ...state }
            action.payload.connections.forEach(connection => { newConnectionState[connection.id] = connection })
            return newConnectionState
        }

        case LOAD_CONNECTION_BY_ID: {
            const newConnectionState = { ...state }
            newConnectionState[action.connection.id] = action.connection
            return newConnectionState
        }

        default:
            return state
    }
}

export default connectionReducer
