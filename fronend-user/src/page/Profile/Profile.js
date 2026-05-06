const Profile = ({ user }) => {
  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body text-start d-flex align-items-center flex-column">
          <img
            alt=""
            src={`http://localhost:3002/${user.avatar}`}
            className="rounded-circle mb-2"
            style={{
              width: "70px",
              height: "70px",
              objectFit: "cover",
            }}
          />
          <h6>{user.user_name}</h6>
          <div>
            <p className="text-muted small">
              Position: {user.level === 1 ? "Admin" : "User"}
            </p>
            <p className="text-muted small">Email: {user.email}</p>
            <p className="text-muted small">Address: {user.address}</p>
            <p className="text-muted small">Phone: {user.phone}</p>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h6>Trending</h6>
          <ul className="list-unstyled">
            <li>#react</li>
            <li>#nodejs</li>
            <li>#life</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
