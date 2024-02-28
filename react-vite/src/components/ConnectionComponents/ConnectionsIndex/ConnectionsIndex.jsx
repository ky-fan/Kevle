import { useSelector, useDispatch } from 'react-redux'
import './ConnectionsIndex.css'
import { useEffect } from 'react'
import { thunkFetchConnections } from '../../../redux/connection'


export function ConnectionsIndex() {
    const dispatch = useDispatch()

    const connections = useSelector(state => Object.values(state.connections))

    useEffect(() => {
        dispatch(thunkFetchConnections())
    }, [dispatch, connections.length])
    return (
        <div>
            <h1>Connections</h1>
            <div>
                <div>
                    {connections[0]?.title}
                </div>
            </div>
        </div>
    )
}

export default ConnectionsIndex
