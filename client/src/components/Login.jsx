import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const rawResponse = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })

      const response = await response.json();

      if (res.message === "Success") {
        localStorage.setItem("token", res.token);
        navigate("/home");
      } else {
        console.log("No Success");
      }
    } catch (err) {
      console.err("Error Fetching Data:", err)
    }
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