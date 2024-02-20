import { useState } from "react";

function Login({ setJwt, jwt, setUser }) {
  const [userData, setUserData] = useState({});

  const submit = (e) => {
    e.preventDefault();
    console.log("Getting here");

    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          setJwt(data.token);
          setUser(
            JSON.parse(
              Buffer.from(data.token.split(".")[1], "base64").toString()
            )
          );
        }
      });
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit} onChange={handleChange}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Login;
