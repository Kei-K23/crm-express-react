import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../lib/getCookie";

const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("crmCookie");

    if (!cookie) {
      toast.error("Please login first!");
      return navigate("/login");
    }

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

  return <div>Main</div>;
};

export default Main;
