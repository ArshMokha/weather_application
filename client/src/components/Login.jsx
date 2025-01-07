import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    }).then(async (response) => {
      const res = await response.json();
      if (res === "Success") {
        navigate("/home");
      } else {
        
      }
    }).catch((err) => {
      console.error("Error fetching data:", err);
    })
  }

  return (
    <>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  )
}

export default Login