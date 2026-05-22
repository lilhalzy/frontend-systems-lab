import Button from "../../../components/ui/Button";

const ProfileCard = ({
  name,
  role,
  online,
  followers,
  onFollow,
  onDelete,
  pending,
  }) => {
  return (
    <section>
      <h2>{name}</h2>
      <p>{role}</p>

      <p>Followers: {followers}</p>
      {online ? <p>Status: online 🟢</p> : <p>Status: offline ⚫</p>}
      {pending && <p>Saving</p>}

      <Button onClick={onFollow}>Follow</Button>
      <Button onClick={onDelete}>Delete</Button>
    </section>
  );
};

export default ProfileCard;
