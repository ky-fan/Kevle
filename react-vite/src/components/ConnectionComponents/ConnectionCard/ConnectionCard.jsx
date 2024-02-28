import './ConnectionCard.css'
import { NavLink } from 'react-router-dom'

export function ConnectionCard({ connection }) {

    return (
        <div title={connection?.title} className='connection-card-container'>
            <div>
                <NavLink to={`/connections/${connection.id}`}>
                    <p>{connection?.title}</p>
                </NavLink>
                <NavLink to={`/users/${connection.userId}`}>
                    <p>{connection?.authorName}</p>
                </NavLink>
            </div>
        </div>
    )
}

export default ConnectionCard
