import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: "",
  });
  useEffect(() => {
    const cookie = getCookie("crmCookie");

    if (!cookie) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    async function fetchData() {
      const res = await fetch(`http://localhost:8080/acc/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const { name, email, phone, address, photo, _id } = data;
      if (_id !== id) {
        toast.error("Please login first!");
        return navigate("/login");
      }

      setUser({ name, email, phone, address, photo });
    }
    fetchData();
  }, []);

  function getCookie(n: string) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");

      if (name === n) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  async function handleClickLogOut() {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      toast.success("Successfully logout");
      return navigate("/login");
    } catch (e) {
      console.error(e);
      return toast.error("Something went wrong!");
    }
  }

  return (
    <div>
      <h2>Name: {user.name}</h2>
      <h2>Name: {user.email}</h2>
      <h2>Name: {user.phone}</h2>
      <h2>Name: {user.address}</h2>
      <h2>Name: {user.photo}</h2>
      <button onClick={handleClickLogOut}>Logout</button>
    </div>
  );
};

export default Home;
