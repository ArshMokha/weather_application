import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    }).then((response) => {
      console.log(response);
      navigate("/login");
    }).catch((err) => {
      console.error("Error fetching data:", err);
    })
  }

  return (
    <>
      <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter Name" onChange={(e) => setName(e.target.value)}/>
          <input type="email" name="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit">Register</button>
        </form>
        <Link to="/">
          <button>Login</button>
        </Link>
      </div>
    </>
  )
}

export default Signup