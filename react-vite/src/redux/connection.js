// action types
export const LOAD_CONNECTIONS = 'connections/loadConnections'
export const LOAD_CONNECTION_BY_ID = 'connections/loadConnectionById'
export const CREATE_CONNECTION = 'connections/createConnection'
export const UPDATE_CONNECTION = 'connections/updateConnection'

// action creators
export const loadConnections = connections => ({
    type: LOAD_CONNECTIONS,
    payload: connections
})

export const loadConnectionById = connection => ({
    type: LOAD_CONNECTION_BY_ID,
    connection
})

export const createConnection = connection => ({
    type: CREATE_CONNECTION,
    connection
})

export const updateConnection = connection => ({
    type: UPDATE_CONNECTION,
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

export const thunkCreateConnection = connection => async dispatch => {
    const res = await fetch('/api/connections/', {
        method: 'POST',
        body: connection
    })

    if (res.ok) {
        const newConnection = await res.json()
        dispatch(createConnection(newConnection))
        return newConnection
    } else return { 'message': 'new connections thunk error' }
}

export const thunkUpdateConnection = (connectionId, connection) => async dispatch => {
    const res = await fetch(`/api/connections/${connectionId}`, {
        method: 'PUT',
        body: connection
    })

    if (res.ok) {
        const updatedConnection = await res.json()
        dispatch(updateConnection(updatedConnection))
        return updatedConnection
    } else return { 'message': 'update connections thunk error' }
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

        case CREATE_CONNECTION: {
            const newConnectionState = { ...state }
            newConnectionState[action.connection.id] = action.connection
            return newConnectionState
        }

        case UPDATE_CONNECTION: {
            const newConnectionState = { ...state }
            newConnectionState[action.connection.id] = action.connection
            return newConnectionState
        }

        default:
            return state
    }
}

export default connectionReducer
