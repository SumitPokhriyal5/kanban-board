
function Home(userDetails) {
  const user = userDetails.user;
  const logout = () => {
    window.open(`http://localhost:8080/auth/logout`, "_self");
  };
  console.log("user:", user)
  return (
    <div>
      <h1>Home</h1>

      <button onClick={logout}>Log Out</button>
    </div>
  );
}

export default Home;
