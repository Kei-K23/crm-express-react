import { Link } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  return (
    <>
      <h1>RegisterPage</h1>
      <Register />
      <Link to={"/login"}>
        <p>If you already register! Please login </p>
      </Link>
    </>
  );
};

export default RegisterPage;
