type Props = {
  _id?: string;
  name?: string;
  handleClickForDeletePopUp: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteUser: (_id: string) => void;
};

const DeletePopUp = ({
  _id,
  name,
  handleDeleteUser,
  handleClickForDeletePopUp,
}: Props) => {
  return (
    <div className="bg-slate-200 p-4">
      <h2 className="text-2xl lg:text-3xl text-red-600 font-bold">
        Are you sure?
      </h2>
      <h3 className="text-xl lg:text-2xl mt-2">Delete {name}?</h3>
      <div className="mt-4 flex justify-center items-center gap-4">
        <button
          className="p-2 bg-red-500 text-lg rounded-xl hover:bg-red-600"
          onClick={() => _id && handleDeleteUser(_id)}
        >
          Delete
        </button>
        <button
          className="p-2 bg-green-500 text-lg rounded-xl hover:bg-green-600"
          onClick={handleClickForDeletePopUp}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePopUp;
