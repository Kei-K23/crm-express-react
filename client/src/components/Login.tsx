import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
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
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      if (response.ok) {
        const { data } = await response.json();
        toast.success("Successfully login");
        navigate(`/acc/${data._id}`);
      } else {
        return toast.error("Invalid credentials!");
      }
    } catch (e) {
      console.log(e);
      return toast.error("Something went wrong!");
    }
  };

  function check(email: string, password: string) {
    return email !== "" && password !== "";
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="rounded-2xl block mx-auto mt-10 mb-4 w-[95%] md:w-[70%] lg:w-[65%] xl:w-[50%] border-2 border-sky-400 py-4 px-8 bg-sky-400"
      >
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 border-black py-2 px-4 text-lg"
            id="email"
            type="email"
            placeholder="foo@example.com"
            value={loginData.email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg" htmlFor="password">
            Password:
          </label>
          <input
            className="border-2 border-black py-2 px-4 text-lg"
            id="password"
            type="password"
            placeholder="password..."
            value={loginData.password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button
          disabled={check(loginData.email, loginData.password) ? false : true}
          type="submit"
          className="disabled:text-slate-200 disabled:bg-sky-700 disabled:scale-100 disabled:cursor-not-allowed border border-black py-2 px-5 text-xl rounded-xl bg-sky-500 text-white hover:scale-105 hover:bg-sky-600 active:scale-95"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
