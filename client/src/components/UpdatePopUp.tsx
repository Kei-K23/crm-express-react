import axios, { AxiosError } from "axios";
import { useEffect, useReducer } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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

type Props = {
  handleClickForUpdatePopUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  prop_name?: string;
  prop_email?: string;
  prop_phone?: string;
  prop_address?: string;
  prop_photo?: string;
  prop_role_id?: string;
  _id?: string;
};

const UpdatePopUp = ({
  handleClickForUpdatePopUp,
  prop_address,
  prop_email,
  prop_name,
  prop_phone,
  _id,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  useEffect(() => {
    dispatch({ type: "ONCHANGE_NAME", payload: prop_name as string });
    dispatch({ type: "ONCHANGE_EMAIL", payload: prop_email as string });
    dispatch({ type: "ONCHANGE_PHONE", payload: prop_phone as string });
    dispatch({ type: "ONCHANGE_ADDRESS", payload: prop_address as string });
  }, []);
  const { address, email, name, phone } = state;

  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !name || !phone || !address) return;

      await axios.put(
        `http://localhost:8080/users/${_id}`,
        JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(`Updated user with ID ${_id}`);
      navigate("/login");
    } catch (e) {
      if (e instanceof AxiosError) return console.log(e);
    }
  };

  function check(state: INIT_STATEType) {
    return (
      state.name !== prop_name ||
      state.email !== prop_email ||
      state.phone !== prop_phone ||
      state.address !== prop_address
    );
  }

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="rounded-2xl block mx-auto mt-10 mb-4 w-[95%] md:w-[70%] lg:w-[65%] xl:w-[50%] border-2 border-slate-400 py-4 px-8 bg-slate-400"
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
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={check(state) ? false : true}
            className="disabled:text-slate-200 disabled:bg-sky-700 disabled:scale-100 disabled:cursor-not-allowed border border-black py-2 px-5 text-xl rounded-xl bg-sky-500 text-white hover:scale-105 hover:bg-sky-600 active:scale-95"
            type="submit"
          >
            Update
          </button>
          <button
            className=" border border-black py-2 px-5 text-xl rounded-xl bg-green-500 text-white hover:scale-105 hover:bg-green-600 active:scale-95"
            onClick={handleClickForUpdatePopUp}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdatePopUp;
