import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import { getCookie } from "../lib/getCookie";

type UserType = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
  role_id: string;
};

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState<UserType | null>(null);

  const [allUsers, setAllUsers] = useState<UserType[]>();

  useEffect(() => {
    const cookie = getCookie("crmCookie");

    if (!cookie) {
      toast.error("Please login first!");
      return navigate("/login");
    }

    async function fetchUserData() {
      const res = await fetch(`http://localhost:8080/acc/${id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      const { name, email, phone, address, photo, role_id, _id } = data;
      if (_id !== id) {
        toast.error("Please login first!");
        return navigate("/login");
      }
      setUser({ name, email, phone, address, photo, role_id });

      if (role_id !== "2") return;
      async function fetchAllUsersData() {
        const res = await fetch(`http://localhost:8080/users/`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        setAllUsers([...data]);
      }
      fetchAllUsersData();
    }
    fetchUserData();
  }, []);

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
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-8">
        Welcome back, <span className="text-sky-400">{user?.name}</span>
      </h1>
      <UserCard
        email={user?.email}
        name={user?.name}
        phone={user?.phone}
        photo={user?.photo}
        address={user?.address}
        role_id={user?.role_id}
      />
      <div className="flex justify-center items-center mb-10">
        <button
          className="disabled:text-slate-200 disabled:bg-red-700 disabled:scale-100 disabled:cursor-not-allowed border border-black py-2 px-5 text-xl rounded-xl bg-red-500 text-white hover:scale-105 hover:bg-red-600 active:scale-95 "
          onClick={handleClickLogOut}
        >
          Logout
        </button>
      </div>
      {allUsers && allUsers.length > 0 && (
        <>
          <hr />
          <p className="text-2xl text-center mt-8">All User lists</p>
          <div>
            {allUsers?.map((user) => (
              <UserCard
                key={user._id}
                name={user.name}
                email={user.email}
                address={user.address}
                phone={user.phone}
                photo={user.phone}
                role_id={user.role_id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
