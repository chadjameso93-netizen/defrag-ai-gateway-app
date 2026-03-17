export default function AddPerson() {
  return (
    <div className="add-person">
      <button className="btn btn-primary">Add person</button>

      <div className="add-person-options">
        <button>Send invite link</button>
        <button>Enter manually</button>
      </div>
    </div>
  );
}
