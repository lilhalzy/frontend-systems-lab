const ProfileCard = (props) => {
  return (
    <section>
        <h2>{props.name}</h2>
        <p>{props.role}</p>
    </section>
  )
}

export default ProfileCard