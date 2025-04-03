const Table = ({ children, className }) => {
    return (
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        {children}
      </table>
    );
  };
  export default Table;
  