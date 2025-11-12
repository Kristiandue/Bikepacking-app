import users from './users.json';
import "./css/Login.css"
export default Login;


function Login() {
  const handleLogin = () => {
    const usernameInput = (document.getElementById('username') as HTMLInputElement).value;
    const passwordInput = (document.getElementById('password') as HTMLInputElement).value;
    const user = users.find(user => user.username === usernameInput && user.password === passwordInput);
    if (user) {
      alert('Login successful!');
      document.querySelector(".hidden")!.classList.add("logged-in");
      document.querySelector(".log-in")!.classList.remove("hidden");
    } else {
      alert('Invalid username or password.');
    }
  };

  return (
    <div className="log-in">
      <input id="username" type="text" placeholder="Username"/>
      <input id="password" type="password" placeholder="Password"/>
      <button id="loginButton" onClick={handleLogin}>Log In</button>
    </div>
  );
}