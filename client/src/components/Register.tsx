import axios, { AxiosError } from "axios";
import { useReducer } from "react";

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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!email || !name || !password || !phone || !address) return;
      const res = await axios.post(
        "http://localhost:8080/auth/register",
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res.data);
    } catch (e) {
      if (e instanceof AxiosError) return console.log(e.message);
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
            value={name}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_NAME", payload: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
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
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="password..."
            value={password}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_PASSWORD", payload: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
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
        <div>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            placeholder="e.g. no(10), Nice st, Cool Town..."
            value={address}
            onChange={(e) =>
              dispatch({ type: "ONCHANGE_ADDRESS", payload: e.target.value })
            }
            required
          ></textarea>
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
