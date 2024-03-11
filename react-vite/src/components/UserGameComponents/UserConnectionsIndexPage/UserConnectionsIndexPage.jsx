import './UserConnectionsIndexPage'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { clearConnections } from '../../../redux/connection'
import { thunkFetchUserConnections } from '../../../redux/connection'
import ConnectionCard from '../../ConnectionComponents/ConnectionCard/ConnectionCard'
import { useParams, NavLink } from 'react-router-dom'

export function UserConnectionsIndexPage() {
    const dispatch = useDispatch()
    const { userId } = useParams()

    const connections = useSelector(state => Object.values(state.connections))
    useEffect(() => {
        dispatch(clearConnections())
        dispatch(thunkFetchUserConnections(userId))
    }, [dispatch, userId])

    if (!connections[0]?.authorName) return
    const username = connections[0]?.authorName

    console.log(connections[0])


    return (
        <div className='connections-index-container'>
            <div className='connections-index-body'>
                <div>
                    <NavLink to={`/users/${userId}`}>Back</NavLink>
                </div>
                <div className='connections-index-title-container'>
                    <h1>{`${username}'s Connections`}</h1>
                </div>
                <div>
                    <div className='connections-index-cards-container'>
                        {connections.map(connection => <ConnectionCard connection={connection} key={connection.id} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserConnectionsIndexPage
