const Input = ({ label, type, id, name, error, ...rest }) => {
  return (
    <div className="mb-4 flex flex-col w-full">
      <label htmlFor={id} className="mb-1 font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        // highlight border red when there's an error
        className={`border p-2 rounded-md w-full focus:outline-none focus:ring-2 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-amber-50  ${
          error
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-indigo-500"
        }`}
        {...rest} // allows react-hook-form's {...register()} to pass ref & onChange
      />

      {/* Error message */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
