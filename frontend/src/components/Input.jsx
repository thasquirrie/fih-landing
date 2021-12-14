const Input = ({ name, labelName, type, ...props }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className='block text-sm font-medium text-gray-700 mb-5'
      >
        {labelName}
      </label>
      <div className='mt-1'>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={name}
          required
          {...props}
          className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
        />
      </div>
    </div>
  );
};

export default Input;
