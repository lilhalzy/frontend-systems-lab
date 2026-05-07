const ProfileCard = ({name, role, online, followers, onFollow}) => {
    return (
        <section>
            <h2>{name}</h2>
            <p>{role}</p>

            <p>Followers: {followers}</p>
            {
                online
                ? <p>Status: online 🟢</p>
                : <p>Status: offline ⚫</p>
            }

            <button onClick={onFollow}>Follow</button>
        </section>
    )
}

export default ProfileCard