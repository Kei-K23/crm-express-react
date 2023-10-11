import axios, { AxiosError } from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordValidation } from "../lib/validation";
type INIT_STATEType = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
};

type ActionType = {
  type:
    | "ONCHANGE_EMAIL"
    | "ONCHANGE_NAME"
    | "ONCHANGE_PASSWORD"
    | "ONCHANGE_PHONE"
    | "ONCHANGE_ADDRESS";
  payload: string;
};

const INIT_STATE: INIT_STATEType = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const reducer = (state: INIT_STATEType, action: ActionType) => {
  switch (action.type) {
    case "ONCHANGE_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ONCHANGE_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "ONCHANGE_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "ONCHANGE_PHONE":
      return {
        ...state,
        phone: action.payload,
      };
    case "ONCHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const { name, email, password, phone, address } = state;
  const [isValidPassword, setIsValidPassword] = useState(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !name || !password || !phone || !address) return;
      await axios.post(
        "http://localhost:8080/auth/register",
        JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/login");
    } catch (e) {
      if (e instanceof AxiosError) return console.log(e);
    }
  };

  function check(state: INIT_STATEType) {
    return (
      state.name !== "" &&
      state.email !== "" &&
      state.password !== "" &&
      state.phone !== "" &&
      state.address !== "" &&
      isValidPassword === true
    );
  }
  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="rounded-2xl block mx-auto mt-10 mb-4 w-[95%] md:w-[70%] lg:w-[65%] xl:w-[50%] border-2 border-sky-400 py-4 px-8 bg-sky-400"
      >
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="name" className="text-lg">
            Name:
          </label>
          <input
            className="border-2 border-black py-2 px-4 text-lg"
            id="name"
            type="text"
            placeholder="foo"
            value={name}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_NAME", payload: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg" htmlFor="email">
            Email:
          </label>
          <input
            className="border-2 border-black py-2 px-4 text-lg"
            id="email"
            type="email"
            placeholder="e.g. foo@example.com"
            value={email}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_EMAIL", payload: e.target.value })
            }
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
            value={password}
            onChange={(e) => {
              setIsValidPassword(passwordValidation(e.target.value));
              dispatch({ type: "ONCHANGE_PASSWORD", payload: e.target.value });
            }}
            required
          />
          <span
            className={`${isValidPassword ? "hidden" : "block"} text-red-500`}
          >
            *password must be length 6 including 1 uppercase, 1 lowercase
          </span>
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg" htmlFor="phone">
            Phone:
          </label>
          <input
            className="border-2 border-black py-2 px-4 text-lg"
            id="phone"
            type="text"
            placeholder="e.g. 0787212190"
            value={phone}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_PHONE", payload: e.target.value })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2 my-4">
          <label className="text-lg" htmlFor="address">
            Address:
          </label>
          <textarea
            className="border-2 border-black py-2 px-4 text-lg"
            id="address"
            placeholder="e.g. no(10), Nice st, Cool Town..."
            value={address}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_ADDRESS", payload: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button
          disabled={check(state) ? false : true}
          className="disabled:text-slate-200 disabled:bg-sky-700 disabled:scale-100 disabled:cursor-not-allowed border border-black py-2 px-5 text-xl rounded-xl bg-sky-500 text-white hover:scale-105 hover:bg-sky-600 active:scale-95"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default Register;
