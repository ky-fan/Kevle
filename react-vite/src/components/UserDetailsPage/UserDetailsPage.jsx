import './UserDetailsPage.css'
import { NavLink, useParams } from 'react-router-dom'

export function UserDetailsPage() {

    const { userId } = useParams()

    return (
        <div className='connections-index-container'>
            <div className='connections-index-body'>
                <div className='connections-index-title-container'>
                    <h1>{`User Page WIP (This may hold more games)`}</h1>
                </div>
                <NavLink to={`/connections/users/${userId}`}>Click here to see user connections</NavLink>
            </div>
        </div>
    )
}

export default UserDetailsPage
