const Input = ({ label, type, id, name, required }) => {
  return (
    <div className="mb-4 flex flex-col w-full">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default Input;
