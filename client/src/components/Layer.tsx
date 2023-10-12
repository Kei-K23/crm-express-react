type Props = {
  handleClosePopUp: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Layer = ({ children, handleClosePopUp }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-10"
      onClick={handleClosePopUp}
    >
      {children}
    </div>
  );
};

export default Layer;
