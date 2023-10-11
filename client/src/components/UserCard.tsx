type Props = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  photo?: string;
  role_id?: string;
};

const UserCard = ({ name, email, address, phone, role_id }: Props) => {
  return (
    <div className="relative rounded-2xl block mx-auto mt-10 mb-4 w-[95%] md:w-[70%] lg:w-[65%] xl:w-[50%] border-2 border-sky-400 py-4 px-8 bg-sky-400">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        width={100}
        height={100}
        className="mb-4"
      >
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
      </svg>
      <h3 className="text-xl my-2">
        Name: <span className="font-bold">{name}</span>
      </h3>
      <h3 className="text-xl my-2">
        Email: <span className="font-bold">{email}</span>
      </h3>
      <h3 className="text-xl my-2">
        Phone: <span className="font-bold">{phone}</span>
      </h3>
      <h3 className="text-xl my-2">
        Address: <span className="font-bold">{address}</span>
      </h3>
      <h3
        className={`absolute right-3 top-3 font-bold text-2xl ${
          role_id === "1" ? "text-green-400" : "text-red-500"
        } `}
      >
        {role_id === "1" ? "User" : "Admin"}
      </h3>
    </div>
  );
};

export default UserCard;
