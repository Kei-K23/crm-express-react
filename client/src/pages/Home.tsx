import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = getCookie("crmCookie");

    if (!cookie) navigate("/login");
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

  return <div>Home</div>;
};

export default Home;
