import axios, { AxiosError } from "axios";
import { useState } from "react";

const Register = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => {
      return {
        ...prev,
        email: e.target.value,
      };
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => {
      return {
        ...prev,
        password: e.target.value,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;
    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res);
    } catch (e) {
      if (e instanceof AxiosError) console.log(e.message);
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            placeholder="foo"
            value={loginData.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="e.g. foo@example.com"
            value={loginData.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="password..."
            value={loginData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            placeholder="e.g. 0787212190"
            value={loginData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            placeholder="e.g. no(10), Nice st, Cool Town..."
            value={loginData.password}
            required
          ></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
