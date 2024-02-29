import './ConnectionCard.css'
import { NavLink } from 'react-router-dom'

export function ConnectionCard({ connection }) {

    return (
        <div title={connection?.title} className='connection-card-container'>
            <div className='connection-card-id-container'>
                <NavLink to={`/connections/${connection.id}`} className="connection-card-link">
                    <p>#{connection?.id}</p>
                </NavLink>
            </div>
            <div className='connection-card-header'>
                <NavLink to={`/connections/${connection.id}`} className="connection-card-link">
                    <p className='connection-card-title'>{connection?.title}</p>
                </NavLink>
                <NavLink to={`/users/${connection.userId}`} className="connection-card-link">
                    <p className='connection-card-author'>{connection?.authorName}</p>
                </NavLink>
            </div>
        </div >
    )
}

export default ConnectionCard
