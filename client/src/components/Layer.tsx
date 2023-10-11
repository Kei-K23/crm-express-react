const Layer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-10">
      {children}
    </div>
  );
};

export default Layer;
