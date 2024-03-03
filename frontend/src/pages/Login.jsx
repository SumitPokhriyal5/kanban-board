function Login() {
  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };
  return (
    <div>
      <button onClick={googleAuth}>
        <span>Sing in with Google</span>
      </button>
    </div>
  );
}

export default Login;
