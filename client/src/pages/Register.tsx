import { Link } from "react-router-dom";
import Register from "../components/Register";

const RegisterPage = () => {
  return (
    <>
      <h1 className="text-center text-2xl md:text-3xl mt-8">RegisterPage</h1>
      <Register />
      <div className="flex justify-center items-center">
        <Link to={"/login"}>
          <span className="hover:underline hover:text-blue-400 text-lg md:text-xl">
            If you already register! Please login{" "}
          </span>
        </Link>
      </div>
    </>
  );
};

export default RegisterPage;
