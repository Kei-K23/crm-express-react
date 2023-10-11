import { Link, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { useEffect } from "react";
import { getCookie } from "../lib/getCookie";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("crmCookie");

    if (!cookie) return;

    async function fetchData() {
      const res = await fetch(`http://localhost:8080/acc`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const { _id } = data;

      if (_id) {
        return navigate(`/acc/${_id}`);
      } else {
        return navigate("/");
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Login to our CRM</h1>
      <h2 className="text-center text-xl text-slate-700 font-bold">
        CRM = Customer Relationship Model
      </h2>
      <Login />

      <div className="flex justify-center items-center">
        <Link to={"/register"}>
          <span className="hover:underline hover:text-blue-400 text-lg md:text-xl">
            If you don't have an account! Register first
          </span>
        </Link>
      </div>
    </>
  );
};

export default LoginPage;
