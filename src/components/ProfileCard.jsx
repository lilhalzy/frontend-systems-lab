import { useState } from "react"

const ProfileCard = (name, role) => {
    const [followers, setFollowers] = useState(0)

    const handleFollow = () => {
        setFollowers(prev => prev + 1)
    }

    return (
        <section>
            <h2>{name}</h2>
            <p>{role}</p>

            <p>Followers: {followers}</p>

            <button onClick={handleFollow}>Follow</button>
        </section>
    )
}

export default ProfileCard