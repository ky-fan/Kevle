import { useSelector, useDispatch } from 'react-redux'
import './ConnectionsIndex.css'
import { useEffect } from 'react'
import { thunkFetchConnections } from '../../../redux/connection'
import { ConnectionCard } from '../ConnectionCard/ConnectionCard'

export function ConnectionsIndex() {
    const dispatch = useDispatch()

    const connections = useSelector(state => Object.values(state.connections))

    useEffect(() => {
        dispatch(thunkFetchConnections())
    }, [dispatch, connections.length])
    return (
        <div className='connections-index-container'>
            <h1>Connections</h1>
            <div>
                <div className='connections-index-cards-container'>
                    {connections.map(connection => <ConnectionCard connection={connection} key={connection.id} />)}
                </div>
            </div>
        </div>
    )
}

export default ConnectionsIndex
