import Button from "./ui/Button"

const ProfileCard = ({name, role, online, followers, onFollow, onDelete}) => {
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

            <Button onClick={onFollow}>Follow</Button>
            <Button onClick={onDelete}>Delete</Button>
        </section>
    )
}

export default ProfileCard