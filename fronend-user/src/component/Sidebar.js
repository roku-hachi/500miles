const Sidebar = () => {
  return (
    <>
      <div className="card mb-4 shadow-sm">
        <div className="card-body text-center">
          <img
            src="https://i.pravatar.cc/100"
            className="rounded-circle mb-2"
          />
          <h6>Quang Huy</h6>
          <p className="text-muted small">Web Developer</p>
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

export default Sidebar;
