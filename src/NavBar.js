const Navabar = () => {
  return (
    <nav className="navbar">
      <h1>The Dojo Blog</h1>
      <div className="links">
        <a href="/">Home</a>
        <a
          href="/create"
          style={{
            color: "white",
            backgrundColor: "grey"
          }}
        >
          New Blog
        </a>
      </div>
    </nav>
  );
};

export default Navabar;
